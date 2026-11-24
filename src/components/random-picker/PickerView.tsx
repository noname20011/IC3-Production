import { useEffect, useRef, type CSSProperties } from 'react';
import './picker.css';

export interface PickerViewProps {
  screen: 'setup' | 'game';
  namesText: string;
  onNamesTextChange(value: string): void;
  category: 'cute' | 'buildings' | 'food' | 'objects' | 'nature' | 'mixed';
  onCategoryChange(value: 'cute' | 'buildings' | 'food' | 'objects' | 'nature' | 'mixed'): void;
  movementMode: 'floating' | 'bouncing' | 'static';
  onMovementModeChange(value: 'floating' | 'bouncing' | 'static'): void;
  onStart(): void;
  startDisabled: boolean;
  validationMessage: string;
  items: Array<{
    id: string;
    name: string;
    emoji: string;
    x: number;
    y: number;
    duration: number;
    delay: number;
    path: Array<{ x: number; y: number }>;
    revealed: boolean;
    disappearing: boolean;
    held: boolean;
  }>;
  onReveal(id: string): void;
  activeItemId: string | null;
  onHold(id: string): void;
  onRemove(id: string): void;
  onDismissReveal(): void;
  totalCount: number;
  resolvedCount: number;
  remainingCount: number;
  paused: boolean;
  soundEnabled: boolean;
  fullscreen: boolean;
  complete: boolean;
  onReset(): void;
  onToggleSound(): void;
  onTogglePause(): void;
  onToggleFullscreen(): void;
  onPlayAgain(): void;
}

const categoryOptions = [
  { value: 'mixed', emoji: '🎲', label: 'Mixed emojis' },
] as const;

const movementOptions = [
  { value: 'floating', emoji: '☁️🏀📌', label: 'Wander' },
] as const;

function Brand() {
  return (
    <div className="picker-brand" aria-label="Emoji Picker">
      <span className="picker-brand-mark" aria-hidden="true">🎲</span>
      <span className="picker-logo">Random Emoji Picker</span>
    </div>
  );
}

function SetupView(props: PickerViewProps) {
  const parsedCount = props.namesText
    .split(/\r?\n/)
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => name.normalize('NFC').replace(/\s+/g, ' ').toLocaleLowerCase('vi'))
    .filter((name, index, names) => names.indexOf(name) === index).length;

  return (
    <main className={`picker-app${props.fullscreen ? ' is-fullscreen-fallback' : ''}`}>
      <div className="picker-shell">
        <header className="picker-topbar">
          <Brand />
          <span className="picker-top-note">A tiny game of surprise ✨</span>
        </header>

        <section className="picker-setup" aria-labelledby="picker-title">
          <div className="picker-hero">
            <span className="picker-hero-doodle" aria-hidden="true">✳</span>
            <h1 className="picker-heading" id="picker-title">
              Who’s behind<br /><span>the mask?</span>
            </h1>
          </div>

          <div className="picker-setup-grid">
            <section className="picker-panel picker-panel-names" aria-labelledby="names-title">
              <h2 className="picker-section-title" id="names-title">
                <span className="picker-step">1</span> Add the players
              </h2>
              <p className="picker-section-hint">One name on each line. No peeking once the game starts!</p>
              <label className="picker-sr-only" htmlFor="picker-names">Participant names, one name per line</label>
              <div className="picker-textarea-wrap">
                <textarea
                  id="picker-names"
                  className="picker-textarea"
                  data-testid="input-participant-names"
                  aria-describedby={props.validationMessage ? 'picker-validation' : undefined}
                  placeholder={'Mia\nTheo\nAvery\nJun'}
                  value={props.namesText}
                  onChange={(event) => props.onNamesTextChange(event.target.value)}
                />
                <span className="picker-count-pill" data-testid="text-player-count" aria-live="polite">
                  <span aria-hidden="true">👥</span> {parsedCount} {parsedCount === 1 ? 'player' : 'players'}
                </span>
              </div>
              {props.validationMessage && (
                <p className="picker-validation" id="picker-validation" role="alert" data-testid="status-validation">
                  {props.validationMessage}
                </p>
              )}
            </section>

            <section className="picker-panel picker-panel-settings" aria-label="Game settings">
              <h2 className="picker-section-title"><span className="picker-step">2</span> Set the vibe</h2>

              <fieldset className="picker-option-group" style={{ border: 0, padding: 0, marginInline: 0 }}>
                <legend className="picker-option-label">Emoji world</legend>
                <div className="w-full">
                  {categoryOptions.map((option) => (
                    <button
                      className="picker-choice"
                      type="button"
                      key={option.value}
                      aria-pressed={props.category === option.value}
                      data-testid={`button-category-${option.value}`}
                      onClick={() => props.onCategoryChange(option.value)}
                    >
                      <span className="picker-choice-emoji" aria-hidden="true">{option.emoji}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="picker-option-group" style={{ border: 0, padding: 0, marginInline: 0 }}>
                <legend className="picker-option-label">Emoji movement</legend>
                <div className="">
                  {movementOptions.map((option) => (
                    <button
                      className="picker-choice picker-mode-choice"
                      type="button"
                      key={option.value}
                      aria-pressed={props.movementMode === option.value}
                      data-testid={`button-movement-${option.value}`}
                      onClick={() => props.onMovementModeChange(option.value)}
                    >
                      <span aria-hidden="true">{option.emoji}</span>{option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="picker-start-row">
                <span className="picker-start-note">Ready when you are.<br />The names stay secret.</span>
                <button
                  className="picker-primary-button"
                  type="button"
                  data-testid="button-start-game"
                  onClick={props.onStart}
                  disabled={props.startDisabled}
                >
                  START RANDOM <span aria-hidden="true">→</span>
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function GameView(props: PickerViewProps) {
  const holdButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (props.activeItemId) holdButtonRef.current?.focus({ preventScroll: true });
  }, [props.activeItemId]);

  useEffect(() => {
    if (!props.activeItemId) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') props.onDismissReveal();
    };
    window.addEventListener('keydown', closeWithEscape);
    return () => window.removeEventListener('keydown', closeWithEscape);
  }, [props.activeItemId, props.onDismissReveal]);

  const progress = props.totalCount > 0
    ? Math.min(100, Math.max(0, (props.resolvedCount / props.totalCount) * 100))
    : 0;
  const columns = Math.ceil(Math.sqrt(Math.max(props.totalCount, 1) * 1.45));
  const rows = Math.ceil(Math.max(props.totalCount, 1) / columns);
  const density = props.totalCount > 24 ? 'packed' : props.totalCount > 10 ? 'dense' : 'normal';
  const playfieldStyle = {
    minHeight: `${Math.max(570, rows * 92)}px`,
  } as CSSProperties;
  const driftPaths = [
    ['-7px -4px', '7px 8px'],
    ['6px -6px', '-8px 7px'],
    ['-5px 7px', '8px -5px'],
    ['8px 4px', '-6px -8px'],
    ['-8px -2px', '5px 9px'],
    ['5px 8px', '-7px -4px'],
  ] as const;

  return (
    <main className={`picker-app picker-game${props.fullscreen ? ' is-fullscreen-fallback' : ''}`}>
      <header className="picker-game-top">
        <Brand />
        <div className="picker-game-tools" aria-label="Game controls">
          <button className="picker-icon-button" type="button" onClick={props.onToggleSound} data-testid="button-toggle-sound" aria-label={props.soundEnabled ? 'Mute sound' : 'Turn sound on'} aria-pressed={props.soundEnabled}>
            {props.soundEnabled ? '🔊' : '🔇'} <span className="picker-control-word">{props.soundEnabled ? 'Sound on' : 'Sound off'}</span>
          </button>
          <button className="picker-icon-button" type="button" onClick={props.onTogglePause} data-testid="button-toggle-pause" aria-label={props.paused ? 'Resume movement' : 'Pause movement'} aria-pressed={props.paused}>
            {props.paused ? '▶️' : '⏸️'} <span className="picker-control-word">{props.paused ? 'Resume' : 'Pause'}</span>
          </button>
          <button className="picker-icon-button" type="button" onClick={props.onToggleFullscreen} data-testid="button-toggle-fullscreen" aria-label={props.fullscreen ? 'Exit full screen' : 'Toggle fullscreen'} aria-pressed={props.fullscreen}>
            ⛶ <span className="picker-control-word">{props.fullscreen ? 'Exit full screen' : 'Full screen'}</span>
          </button>
          <button className="picker-secondary-button" type="button" onClick={props.onReset} data-testid="button-reset-game">
            ↺ Reset all
          </button>
        </div>
      </header>

      <section className="picker-game-heading" aria-label="Picker progress">
        <p className="picker-eyebrow">Tap an emoji to find out</p>
        <h1 className="picker-heading">Who will it be? <span>✨</span></h1>
        <p className="picker-intro">
          {props.remainingCount > 0
        ? 'Pick a wandering emoji, then hold it or send it away.'
            : 'Every player has been found!'}
        </p>
        <div className="picker-progress-row">
          <div
            className="picker-progress-track"
            role="progressbar"
            aria-label="Players revealed"
            aria-valuemin={0}
            aria-valuemax={props.totalCount}
            aria-valuenow={props.resolvedCount}
            data-testid="progress-revealed"
          >
            <div className="picker-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="picker-progress-label" data-testid="text-reveal-count">
            {props.resolvedCount} / {props.totalCount} decided
          </span>
        </div>
      </section>

      <section
        className={`picker-playfield${props.paused ? ' is-paused' : ''}`}
        data-movement={props.movementMode}
        data-density={density}
        data-testid="game-playfield"
        aria-label="Emoji players"
        style={playfieldStyle}
      >
        {props.paused && !props.complete && (
          <span className="picker-paused-badge" data-testid="status-paused">⏸ Movement paused</span>
        )}
        {props.items.map((item, index) => {
          const style = {
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: '64px',
            height: '64px',
            minWidth: '64px',
            minHeight: '64px',
            fontSize: '48px',
            flexShrink: 0,
            '--item-duration': `${item.duration}s`,
            '--item-delay': `${item.delay}s`,
            ...Object.fromEntries(item.path.flatMap((point, pathIndex) => [
              [`--wander-x${pathIndex}`, `${point.x}%`],
              [`--wander-y${pathIndex}`, `${point.y}%`],
            ])),
            '--drift-from': driftPaths[index % driftPaths.length][0],
            '--drift-to': driftPaths[index % driftPaths.length][1],
          } as CSSProperties;
          const revealedLabel = item.revealed ? `${item.emoji} ${item.name}` : `Mystery emoji ${index + 1}`;
          return (
            <button
              type="button"
              className={`picker-item${item.revealed ? ' is-revealed' : ''}${item.disappearing ? ' is-disappearing' : ''}`}
              key={item.id}
              style={style}
              onClick={() => props.onReveal(item.id)}
              disabled={item.held || item.disappearing || props.complete}
              aria-label={item.held ? `${revealedLabel}, held` : revealedLabel}
              data-testid={`button-emoji-${item.id}`}
              data-revealed={item.revealed}
              data-disappearing={item.disappearing}
              data-held={item.held}
            >
              <span className="picker-item-emoji" aria-hidden="true">{item.emoji}</span>
              {item.held && (
                <span className="picker-item-name" data-testid={`text-name-${item.id}`}>{item.name}</span>
              )}
            </button>
          );
        })}
        {props.complete && (
          <div className="picker-complete-overlay" data-testid="status-game-complete">
            <div className="picker-complete-card" role="dialog" aria-modal="true" aria-labelledby="picker-complete-title">
              <span className="picker-complete-emoji" aria-hidden="true">🎉</span>
              <p className="picker-eyebrow">All the surprises are out</p>
            <h2 className="picker-complete-title" id="picker-complete-title">🎉 All Done!</h2>
              <p className="picker-complete-copy">
                You uncovered all {props.totalCount} {props.totalCount === 1 ? 'player' : 'players'}. That was a very good little game.
              </p>
              <div className="picker-complete-actions">
                <button className="picker-primary-button" type="button" onClick={props.onPlayAgain} data-testid="button-play-again">
                  Play again <span aria-hidden="true">↻</span>
                </button>
                <button className="picker-secondary-button" type="button" onClick={props.onReset} data-testid="button-complete-setup">
                  Reset all
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {props.activeItemId && (() => {
        const activeItem = props.items.find((item) => item.id === props.activeItemId);
        if (!activeItem) return null;
        return (
          <div className="picker-reveal-backdrop" role="presentation" onClick={props.onDismissReveal}>
            <div
              className="picker-reveal-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="picker-reveal-name"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="picker-eyebrow">You found</p>
              <span className="picker-reveal-emoji" aria-hidden="true">{activeItem.emoji}</span>
              <h2 className="picker-reveal-name" id="picker-reveal-name" data-testid="text-active-player">
                {activeItem.name}
              </h2>
              <p className="picker-reveal-copy">Keep this one here, or remove it?</p>
              <div className="picker-reveal-actions">
                <button
                  className="picker-primary-button picker-hold-button"
                  type="button"
                  ref={holdButtonRef}
                  onClick={() => props.onHold(activeItem.id)}
                  data-testid="button-hold-emoji"
                >
                  Hold
                </button>
                <button
                  className="picker-secondary-button picker-remove-button"
                  type="button"
                  onClick={() => props.onRemove(activeItem.id)}
                  data-testid="button-remove-emoji"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <footer className="picker-game-footer">
        <span aria-hidden="true" className="picker-footer-dot">✦</span>
        <span data-testid="text-remaining-count">
          {props.remainingCount} {props.remainingCount === 1 ? 'mystery left' : 'mysteries left'}
        </span>
        <span className="picker-footer-dot" aria-hidden="true">✦</span>
        <span>Every emoji is someone</span>
      </footer>
    </main>
  );
}

export function PickerView(props: PickerViewProps) {
  return props.screen === 'setup' ? <SetupView {...props} /> : <GameView {...props} />;
}

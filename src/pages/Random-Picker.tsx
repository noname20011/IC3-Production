import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PickerView,
  type PickerViewProps,
} from "@/components/random-picker/PickerView";
import { getEmojiAssignments, shuffleArray } from "@/lib/emoji-library";

export default function RandomPickerPage() {
  type EmojiCategory = PickerViewProps["category"];
  type MovementMode = PickerViewProps["movementMode"];
  type PickerSettings = {
    category: EmojiCategory;
    movementMode: MovementMode;
    soundEnabled: boolean;
  };
  type GameItem = PickerViewProps["items"][number];
  type StoredGameItem = Omit<GameItem, "revealed" | "disappearing" | "held">;

  const DEFAULT_NAMES = [
    "Nguyễn An",
    "Trần Bình",
    "Lê Minh",
    "Phạm Huy",
    "Hoàng Nam",
  ];
  const DEFAULT_SETTINGS: PickerSettings = {
    category: "mixed",
    movementMode: "floating",
    soundEnabled: true,
  };
  const SETTINGS_STORAGE_KEY = "random-emoji-picker-settings-v1";

  function isCategory(value: unknown): value is EmojiCategory {
    return ["cute", "buildings", "food", "objects", "nature", "mixed"].includes(
      String(value),
    );
  }

  function isMovementMode(value: unknown): value is MovementMode {
    return value === "floating" || value === "bouncing" || value === "static";
  }

  function readSettings(): PickerSettings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const saved = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!saved) return DEFAULT_SETTINGS;
      const value: unknown = JSON.parse(saved);
      if (!value || typeof value !== "object") return DEFAULT_SETTINGS;
      const settings = value as Partial<PickerSettings>;
      return {
        category: isCategory(settings.category)
          ? settings.category
          : DEFAULT_SETTINGS.category,
        movementMode: isMovementMode(settings.movementMode)
          ? settings.movementMode
          : DEFAULT_SETTINGS.movementMode,
        soundEnabled:
          typeof settings.soundEnabled === "boolean"
            ? settings.soundEnabled
            : DEFAULT_SETTINGS.soundEnabled,
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  function parseNames(value: string) {
    const participants: string[] = [];
    const seen = new Set<string>();
    let duplicateCount = 0;

    for (const line of value.split(/\r?\n/)) {
      const name = line.trim().normalize("NFC").replace(/\s+/g, " ");
      if (!name) continue;
      const key = name.toLocaleLowerCase("vi");
      if (seen.has(key)) {
        duplicateCount += 1;
        continue;
      }
      seen.add(key);
      participants.push(name);
    }

    return { participants, duplicateCount };
  }

  function createGame(
    names: string[],
    category: EmojiCategory,
  ): StoredGameItem[] {
    const count = names.length;
    if (!count) return [];

    const columns = Math.ceil(Math.sqrt(count * 1.45));
    const rows = Math.ceil(count / columns);
    const cells = shuffleArray(
      Array.from({ length: count }, (_, index) => index),
    );
    const selectedEmojis = getEmojiAssignments(category, count);

    return names.map((name, index) => {
      const cell = cells[index];
      const column = cell % columns;
      const row = Math.floor(cell / columns);
      const cellWidth = 80 / columns;
      const cellHeight = 72 / rows;
      const jitterX = (Math.random() - 0.5) * Math.min(5, cellWidth * 0.12);
      const jitterY = (Math.random() - 0.5) * Math.min(5, cellHeight * 0.12);
      const x = 10 + (column + 0.5) * cellWidth + jitterX;
      const y = 14 + (row + 0.5) * cellHeight + jitterY;
      const path = [
        { x, y },
        ...Array.from({ length: 4 }, () => ({
          x: 12 + Math.random() * 76,
          y: 16 + Math.random() * 68,
        })),
        { x, y },
      ];
      return {
        id: `player-${index}-${crypto.randomUUID()}`,
        name,
        emoji: selectedEmojis[index],
        x,
        y,
        path,
        duration: Number((13 + Math.random() * 11).toFixed(2)),
        delay: Number((-Math.random() * 20).toFixed(2)),
      };
    });
  }

  //   Main
  const [screen, setScreen] = useState<"setup" | "game">("setup");
  const [namesText, setNamesText] = useState(DEFAULT_NAMES.join("\n"));
  const [settings, setSettings] = useState<PickerSettings>(readSettings);
  const [items, setItems] = useState<StoredGameItem[]>([]);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
  const [heldIds, setHeldIds] = useState<Set<string>>(new Set());
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [disappearingIds, setDisappearingIds] = useState<Set<string>>(
    new Set(),
  );
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [complete, setComplete] = useState(false);
  const timers = useRef<Set<number>>(new Set());
  const revealedRef = useRef<Set<string>>(new Set());
  const resolvedRef = useRef<Set<string>>(new Set());
  const audioContext = useRef<AudioContext | null>(null);

  const { participants, duplicateCount } = useMemo(
    () => parseNames(namesText),
    [namesText],
  );
  const resolvedCount = resolvedIds.size;
  const remainingCount = Math.max(0, items.length - resolvedCount);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(settings),
      );
    } catch {
      // The game remains usable when browser storage is unavailable.
    }
  }, [settings]);

  const clearTimers = useCallback(() => {
    for (const timer of timers.current) window.clearTimeout(timer);
    timers.current.clear();
  }, []);

  useEffect(
    () => () => {
      clearTimers();
      void audioContext.current?.close();
    },
    [clearTimers],
  );

  useEffect(() => {
    const syncFullscreen = () =>
      setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () =>
      document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.current.delete(timer);
      callback();
    }, delay);
    timers.current.add(timer);
  }, []);

  const resetRoundState = useCallback(() => {
    clearTimers();
    revealedRef.current = new Set();
    resolvedRef.current = new Set();
    setRevealedIds(new Set());
    setResolvedIds(new Set());
    setHeldIds(new Set());
    setActiveItemId(null);
    setDisappearingIds(new Set());
    setRemovedIds(new Set());
    setPaused(false);
    setComplete(false);
  }, [clearTimers]);

  const beginGame = useCallback(
    (names: string[], freshAssignment: boolean) => {
      if (freshAssignment) {
        setItems(createGame(names, settings.category));
      }
      resetRoundState();
      setScreen("game");
    },
    [resetRoundState, settings.category],
  );

  const playRevealSound = useCallback(() => {
    if (!settings.soundEnabled) return;
    try {
      const context = audioContext.current ?? new AudioContext();
      audioContext.current = context;
      if (context.state === "suspended") void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(660, now);
      oscillator.frequency.exponentialRampToValueAtTime(990, now + 0.12);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.25);
    } catch {
      // Audio is optional; revealing still works if the browser blocks it.
    }
  }, [settings.soundEnabled]);

  const handleReveal = useCallback(
    (id: string) => {
      if (resolvedRef.current.has(id)) return;
      setActiveItemId(id);
      if (revealedRef.current.has(id)) return;
      revealedRef.current.add(id);
      setRevealedIds(new Set(revealedRef.current));
      playRevealSound();
    },
    [playRevealSound],
  );

  const handleHold = useCallback(
    (id: string) => {
      if (resolvedRef.current.has(id)) return;
      resolvedRef.current.add(id);
      const nextResolvedCount = resolvedRef.current.size;
      setResolvedIds(new Set(resolvedRef.current));
      setHeldIds((current) => new Set(current).add(id));
      setActiveItemId(null);
      if (nextResolvedCount === items.length)
        schedule(() => setComplete(true), 360);
    },
    [items.length, schedule],
  );

  const handleRemove = useCallback(
    (id: string) => {
      if (resolvedRef.current.has(id)) return;
      resolvedRef.current.add(id);
      const nextResolvedCount = resolvedRef.current.size;
      setResolvedIds(new Set(resolvedRef.current));
      setActiveItemId(null);
      setDisappearingIds((current) => new Set(current).add(id));
      schedule(() => {
        setRemovedIds((current) => new Set(current).add(id));
        setDisappearingIds((current) => {
          const next = new Set(current);
          next.delete(id);
          return next;
        });
      }, 430);
      if (nextResolvedCount === items.length)
        schedule(() => setComplete(true), 470);
    },
    [items.length, schedule],
  );

  const start = () => {
    if (!participants.length) return;
    setItems(createGame(participants, settings.category));
    resetRoundState();
    setScreen("game");
  };

  const resetAll = () => {
    resetRoundState();
    setItems([]);
    setScreen("setup");
    setNamesText(DEFAULT_NAMES.join("\n"));
    setSettings(DEFAULT_SETTINGS);
  };

  const playAgain = () => {
    if (!items.length) {
      setScreen("setup");
      return;
    }
    beginGame(
      items.map((item) => item.name),
      true,
    );
  };

  const toggleFullscreen = () => {
    if (fullscreen && !document.fullscreenElement) {
      setFullscreen(false);
      return;
    }
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => setFullscreen(false));
      return;
    }
    void document.documentElement
      .requestFullscreen()
      .catch(() => setFullscreen(true));
  };

  const validationMessage =
    participants.length === 0
      ? "Add at least one name to start the game."
      : duplicateCount > 0
        ? `${duplicateCount} repeated ${duplicateCount === 1 ? "name is" : "names are"} ignored. Each participant needs one emoji.`
        : "";

  const viewItems: GameItem[] = items
    .filter((item) => !removedIds.has(item.id))
    .map((item) => ({
      ...item,
      revealed: revealedIds.has(item.id),
      disappearing: disappearingIds.has(item.id),
      held: heldIds.has(item.id),
    }));

  return (
    <PickerView
      screen={screen}
      namesText={namesText}
      onNamesTextChange={setNamesText}
      category={settings.category}
      onCategoryChange={(category) =>
        setSettings((current) => ({ ...current, category }))
      }
      movementMode={settings.movementMode}
      onMovementModeChange={(movementMode) =>
        setSettings((current) => ({ ...current, movementMode }))
      }
      onStart={start}
      startDisabled={participants.length === 0}
      validationMessage={validationMessage}
      items={viewItems}
      onReveal={handleReveal}
      activeItemId={activeItemId}
      onHold={handleHold}
      onRemove={handleRemove}
      onDismissReveal={() => setActiveItemId(null)}
      totalCount={items.length}
      resolvedCount={resolvedCount}
      remainingCount={remainingCount}
      paused={paused}
      soundEnabled={settings.soundEnabled}
      fullscreen={fullscreen}
      complete={complete}
      onReset={resetAll}
      onToggleSound={() =>
        setSettings((current) => ({
          ...current,
          soundEnabled: !current.soundEnabled,
        }))
      }
      onTogglePause={() => setPaused((current) => !current)}
      onToggleFullscreen={toggleFullscreen}
      onPlayAgain={playAgain}
    />
  );
}

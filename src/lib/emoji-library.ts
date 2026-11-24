import type { PickerViewProps } from '@/components/random-picker/PickerView';

type EmojiCategory = PickerViewProps['category'];
type EmojiGroup = 'cute' | 'buildings' | 'food' | 'objects' | 'nature' | 'faces' | 'sports' | 'travel' | 'music';

const emojiLibrary: Record<EmojiGroup, string[]> = {
  cute: [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
    '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆',
    '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🦋', '🐌', '🐞',
    '🐢', '🐍', '🦎', '🐙', '🦑', '🦀', '🐠', '🐬', '🐳', '🦭',
    '🦦', '🦥', '🦔', '🐿️', '🦜', '🦩', '🦚', '🦢', '🐈‍⬛', '🐕',
  ],
  buildings: [
    '🏠', '🏡', '🏘️', '🏚️', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦',
    '🏨', '🏩', '🏪', '🏫', '🏛️', '⛪', '🕌', '🛕', '🕍', '⛩️',
    '🏰', '🏯', '🗼', '🗽', '🌉', '🌃', '🏟️', '🎪', '⛺', '🛖',
  ],
  food: [
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈',
    '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🥦', '🥕',
    '🌽', '🌶️', '🥒', '🥬', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯',
    '🍞', '🧀', '🥚', '🍳', '🥞', '🧇', '🥓', '🍔', '🍟', '🍕',
    '🌭', '🥪', '🌮', '🌯', '🥗', '🍜', '🍝', '🍣', '🍙', '🍡',
    '🍦', '🍩', '🍪', '🎂', '🍰', '🧁', '🍫', '🍬', '🍭', '🧋',
  ],
  objects: [
    '🎈', '🎀', '🎁', '🧸', '🪀', '🪁', '🎨', '🎭', '🎤', '🎧',
    '📚', '📖', '✏️', '🖍️', '🖌️', '📎', '🧷', '✂️', '🪡', '🧵',
    '🧶', '🪞', '🪄', '🔮', '🕯️', '💡', '🔑', '🗝️', '🧭', '⌚',
    '📷', '📻', '🎹', '🎸', '🥁', '🪇', '⚽', '🏀', '🛼', '🛹',
    '🪑', '🛋️', '🛏️', '🪴', '🧺', '🧼', '🪥', '🧴', '🧢', '👒',
  ],
  nature: [
    '🌱', '🌿', '☘️', '🍀', '🌵', '🌴', '🌳', '🌲', '🪵', '🌾',
    '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🪻', '🪷', '💐',
    '🍄', '🪺', '🪹', '🌎', '🌙', '⭐', '🌟', '✨', '☀️', '🌤️',
    '🌈', '☁️', '❄️', '🌊', '💧', '🔥', '🪨', '🌋', '🏔️', '🌅',
  ],
  faces: [
    '😀', '😎', '🥳', '🤩', '😴', '🥰', '🤗', '😇', '🤠', '🥸',
    '🤖', '👻', '👽', '💩', '👑', '🧑‍🚀', '🧑‍🎨', '🧑‍🍳', '🧙', '🧚',
  ],
  sports: [
    '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱',
    '🏓', '🏸', '🥊', '🥋', '⛳', '🏹', '🎣', '🤿', '🛹', '🏆',
  ],
  travel: [
    '🚗', '🚕', '🚌', '🚎', '🚑', '🚒', '🚜', '🚲', '🛵', '🏍️',
    '🚂', '🚆', '🚇', '✈️', '🚁', '🚀', '🛸', '⛵', '🚢', '🗺️',
  ],
  music: [
    '🎼', '🎵', '🎶', '🎙️', '🎤', '🎧', '🎷', '🎺', '🪈', '🎸',
    '🪕', '🎻', '🪘', '🥁', '🪇', '📻', '🎹', '🕺', '💃', '🎛️',
  ],
};

export function getEmojiPool(category: EmojiCategory): string[] {
  if (category === 'mixed') {
    return [...new Set(Object.values(emojiLibrary).flat())];
  }
  return emojiLibrary[category];
}

export function getEmojiAssignments(category: EmojiCategory, count: number): string[] {
  if (count <= 0) return [];

  if (category !== 'mixed') {
    const selectedGroup = shuffleArray(emojiLibrary[category]);
    const remainingGroups = shuffleArray(Object.entries(emojiLibrary)
      .filter(([name]) => name !== category)
      .map(([, emojis]) => emojis)).flat();
    const expandedPool = [...new Set([...selectedGroup, ...remainingGroups])];
    return Array.from({ length: count }, (_, index) => expandedPool[index % expandedPool.length]);
  }

  const shuffledGroups = Object.values(emojiLibrary).map((group) => shuffleArray(group));
  const result: string[] = [];
  const assigned = new Set<string>();

  while (result.length < count && shuffledGroups.some((group) => group.length > 0)) {
    const groupOrder = shuffleArray(shuffledGroups.map((_, index) => index));
    for (const groupIndex of groupOrder) {
      const nextEmoji = shuffledGroups[groupIndex].shift();
      if (nextEmoji && !assigned.has(nextEmoji)) {
        result.push(nextEmoji);
        assigned.add(nextEmoji);
      }
      if (result.length === count) break;
    }
  }

  const completePool = shuffleArray(getEmojiPool('mixed'));
  while (result.length < count && completePool.length > 0) {
    result.push(completePool[result.length % completePool.length]);
  }

  return result;
}

export function shuffleArray<T>(values: T[]): T[] {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}
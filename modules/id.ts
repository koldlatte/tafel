export function randomCharacter(): string {
  const chars: string = "abcdefghijklmnopqrstuvwxyz";
  const index: number = Math.floor(Math.random() * chars.length);
  return chars[index];
}

export function randomString(length: number = 5): string {
  let str: string = "";
  for (let i: number = 0; i < length; i++) {
    str += randomCharacter();
  }
  return str;
}

export function randomHexCharacter(): string {
  const chars: string = "abcdef0123456789";
  const index: number = Math.floor(Math.random() * chars.length);
  return chars[index];
}

export function randomHexString(length: number = 5): string {
  let str: string = "";
  for (let i: number = 0; i < length; i++) {
    str += randomHexCharacter();
  }
  return str;
}

export function createId(): string {
  const parts: string[] = [
    randomHexString(8),
    randomHexString(4),
    randomHexString(4),
    randomHexString(4),
    randomHexString(12),
  ];
  return parts.join("-");
}

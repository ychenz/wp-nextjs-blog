export default function pluralize(n: number, str: string): string {
  if (n === 1) {
    return str;
  }

  if (str.slice(-1) === "s") {
    return str;
  }

  return `${str}s`;
}
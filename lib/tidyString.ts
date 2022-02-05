export default function tidyString(str: string): string {
  return str.replace(/\s+/g, ' ').trim().toLowerCase();
}

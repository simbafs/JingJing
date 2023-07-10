export default function tidyString(str: string) {
  return str.replace(/\s+/g, ' ').trim().toLowerCase()
}

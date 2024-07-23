export function dateGetter(value: string | Date | null | undefined) {
  return value ? new Date(value) : null;
}

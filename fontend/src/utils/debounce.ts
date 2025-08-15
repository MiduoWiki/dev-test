// Debounce function
export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
  let timeoutId: number
  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}
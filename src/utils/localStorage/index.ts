const APP_KEY = 'WONGAMES'

export function getStorageItem(key: string) {
  // no Next via Server/Static não tem window
  /* istanbul ignore next */
  if (typeof window === 'undefined') return

  const data = window.localStorage.getItem(`${APP_KEY}_${key}`)
  return JSON.parse(data!)
}

export function setStorageItem(key: string, value: string[]) {
  /* istanbul ignore next */
  if (typeof window === 'undefined') return

  return window.localStorage.setItem(`${APP_KEY}_${key}`, JSON.stringify(value))
}

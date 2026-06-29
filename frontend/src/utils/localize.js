export function localizedText(obj, locale) {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[locale] || obj.en || ''
}

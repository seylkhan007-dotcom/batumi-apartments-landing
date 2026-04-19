import type {LocalizedString, LocalizedText} from '@/types/sanity'

export type Language = 'ru' | 'en'

export function getLanguageFromSearchParams(
  searchParams?: Record<string, string | string[] | undefined>
): Language {
  const langParam = searchParams?.lang

  if (Array.isArray(langParam)) {
    return langParam[0] === 'en' ? 'en' : 'ru'
  }

  return langParam === 'en' ? 'en' : 'ru'
}

export function getLocalizedValue(
  value: LocalizedString | LocalizedText | undefined,
  language: Language
): string {
  if (!value) return ''

  if (language === 'en') {
    return value.en || value.ru || ''
  }

  return value.ru || value.en || ''
}

export function buildLanguageHref(language: Language): string {
  return language === 'en' ? '/?lang=en' : '/?lang=ru'
}
import type {Language} from './localization'

const apartmentTypeLabels: Record<string, Record<Language, string>> = {
  studio: {
    ru: 'Студия',
    en: 'Studio',
  },
  'one-bedroom': {
    ru: '1+1',
    en: '1-bedroom',
  },
  'two-bedroom': {
    ru: '2+1',
    en: '2-bedroom',
  },
}

const viewTypeLabels: Record<string, Record<Language, string>> = {
  'sea-view': {
    ru: 'Вид на море',
    en: 'Sea view',
  },
  'city-view': {
    ru: 'Вид на город',
    en: 'City view',
  },
  'mountain-view': {
    ru: 'Вид на горы',
    en: 'Mountain view',
  },
  'no-specific-view': {
    ru: 'Без конкретного вида',
    en: 'No specific view',
  },
}

const bedTypeLabels: Record<string, Record<Language, string>> = {
  'double-bed': {
    ru: 'Двуспальная кровать',
    en: 'Double bed',
  },
  'queen-bed': {
    ru: 'Queen bed',
    en: 'Queen bed',
  },
  'king-bed': {
    ru: 'King bed',
    en: 'King bed',
  },
  'sofa-bed': {
    ru: 'Диван-кровать',
    en: 'Sofa bed',
  },
  'double-bed-and-sofa': {
    ru: 'Кровать + диван',
    en: 'Double bed + sofa',
  },
}

const rentalFormatLabels: Record<string, Record<Language, string>> = {
  'short-term': {
    ru: 'Посуточно',
    en: 'Short-term',
  },
  'long-term': {
    ru: 'Долгосрок',
    en: 'Long-term',
  },
}

const amenityLabels: Record<string, Record<Language, string>> = {
  wifi: {
    ru: 'Wi-Fi',
    en: 'Wi-Fi',
  },
  'air-conditioning': {
    ru: 'Кондиционер',
    en: 'Air conditioning',
  },
  kitchen: {
    ru: 'Кухня',
    en: 'Kitchen',
  },
  'washing-machine': {
    ru: 'Стиральная машина',
    en: 'Washing machine',
  },
  tv: {
    ru: 'Телевизор',
    en: 'TV',
  },
  balcony: {
    ru: 'Балкон',
    en: 'Balcony',
  },
  elevator: {
    ru: 'Лифт',
    en: 'Elevator',
  },
  'parking-nearby': {
    ru: 'Парковка рядом',
    en: 'Parking nearby',
  },
  'bed-linen': {
    ru: 'Постельное бельё',
    en: 'Bed linen',
  },
  towels: {
    ru: 'Полотенца',
    en: 'Towels',
  },
  refrigerator: {
    ru: 'Холодильник',
    en: 'Refrigerator',
  },
  kettle: {
    ru: 'Чайник',
    en: 'Kettle',
  },
}

function getLabel(
  labels: Record<string, Record<Language, string>>,
  value: string | undefined,
  language: Language
) {
  if (!value) return ''

  return labels[value]?.[language] || value
}

export function getApartmentTypeLabel(
  value: string | undefined,
  language: Language
) {
  return getLabel(apartmentTypeLabels, value, language)
}

export function getViewTypeLabel(value: string | undefined, language: Language) {
  return getLabel(viewTypeLabels, value, language)
}

export function getBedTypeLabel(value: string | undefined, language: Language) {
  return getLabel(bedTypeLabels, value, language)
}

export function getRentalFormatLabel(
  value: string | undefined,
  language: Language
) {
  return getLabel(rentalFormatLabels, value, language)
}

export function getAmenityLabel(value: string | undefined, language: Language) {
  return getLabel(amenityLabels, value, language)
}

export function getCapacityLabel(
  capacity: number | undefined,
  language: Language
) {
  if (!capacity) return ''

  return language === 'ru' ? `До ${capacity} гостей` : `Up to ${capacity} guests`
}

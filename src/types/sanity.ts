export type LocalizedString = {
  ru: string
  en: string
}

export type LocalizedText = {
  ru: string
  en: string
}

export type Apartment = {
  _id: string
  title?: LocalizedString
  slug?: string
  shortDescription?: LocalizedText
  apartmentType?: string
  complexName?: string
  district?: LocalizedString
  viewType?: string
  capacity?: number
  bedType?: string
  rentalFormats?: string[]
  amenities?: Array<LocalizedString | string>
  priceFrom?: number
  currency?: string
  coverImageUrl?: string
  galleryUrls?: string[]
  isFeatured?: boolean
  orderRank?: string
  bookingUrl?: string
}

export type Advantage = {
  _id: string
  title: LocalizedString
  description: LocalizedText
  iconKey: string
  orderRank: number
}

export type Review = {
  _id: string
  guestName: string
  country?: string
  rating: number
  text: LocalizedText
  stayType?: string
  orderRank: number
}

export type Contact = {
  _id: string
  title: LocalizedString
  whatsapp: string
  telegram?: string
  phone?: string
  email?: string
  instagram?: string
  address: LocalizedString
  workingHours: LocalizedString
}

export type HomepageSettings = {
  _id: string
  navigationAdvantages: LocalizedString
  navigationApartments: LocalizedString
  navigationReviews: LocalizedString
  navigationContacts: LocalizedString

  heroBadge: LocalizedString
  heroTitle: LocalizedText
  heroDescription: LocalizedText
  heroPrimaryButton: LocalizedString
  heroSecondaryButton: LocalizedString

  advantagesBadge: LocalizedString
  advantagesTitle: LocalizedString
  advantagesDescription: LocalizedText

  apartmentsBadge: LocalizedString
  apartmentsTitle: LocalizedString
  apartmentsDescription: LocalizedText

  reviewsBadge: LocalizedString
  reviewsTitle: LocalizedString
  reviewsDescription: LocalizedText

  contactsBadge: LocalizedString
  contactsTitle: LocalizedString
  contactsDescription: LocalizedText
}

export type SeoSettings = {
  _id: string
  metaTitle: LocalizedString
  metaDescription: LocalizedText
  ogTitle: LocalizedString
  ogDescription: LocalizedText
  ogImageUrl?: string
}

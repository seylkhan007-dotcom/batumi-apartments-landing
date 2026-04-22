export const apartmentsQuery = `
  *[_type == "apartment" && isFeatured == true] | order(orderRank asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    apartmentType,
    complexName,
    district,
    viewType,
    capacity,
    bedType,
    rentalFormats,
    amenities,
    priceFrom,
    currency,
    "coverImageUrl": coverImage.asset->url,
    "galleryUrls": gallery[].asset->url,
    isFeatured,
    orderRank,
    bookingUrl
  }
`

export const advantagesQuery = `
  *[_type == "advantage"] | order(orderRank asc) {
    _id,
    title,
    description,
    iconKey,
    orderRank
  }
`

export const reviewsQuery = `
  *[_type == "review" && isFeatured == true] | order(orderRank asc) {
    _id,
    guestName,
    country,
    rating,
    text,
    stayType,
    orderRank
  }
`

export const contactsQuery = `
  *[_type == "contact"][0] {
    _id,
    title,
    whatsapp,
    telegram,
    phone,
    email,
    instagram,
    address,
    workingHours
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    brandName,
    brandSubtitle,
    phone,
    whatsapp,
    telegram,
    instagram,
    email,
    address,
    workingHours,
    defaultWhatsappMessageGuest,
    defaultWhatsappMessageOwner
  }
`

export const navigationQuery = `
  coalesce(
    *[_type == "navigation" && title == "Главное меню"][0],
    *[_type == "navigation"][0]
  ) {
    _id,
    title,
    "items": items[isVisible != false] | order(order asc) {
      label,
      href,
      order,
      isVisible
    }
  }
`

export const footerSettingsQuery = `
  *[_type == "footerSettings"][0] {
    _id,
    description,
    copyrightText,
    showDeveloperCredit,
    developerCreditText,
    "quickLinks": quickLinks[isVisible != false] | order(order asc) {
      label,
      href,
      order,
      isVisible
    }
  }
`

export const homepageQuery = `
  *[_type == "homepageSettings"][0] {
    _id,
    navigationAdvantages,
    navigationApartments,
    navigationReviews,
    navigationContacts,

    heroBadge,
    heroTitle,
    heroDescription,
    heroPrimaryButton,
    heroSecondaryButton,

    advantagesBadge,
    advantagesTitle,
    advantagesDescription,

    apartmentsBadge,
    apartmentsTitle,
    apartmentsDescription,

    reviewsBadge,
    reviewsTitle,
    reviewsDescription,

    contactsBadge,
    contactsTitle,
    contactsDescription
  }
`

export const seoQuery = `
  *[_type == "seoSettings"][0] {
    _id,
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    "ogImageUrl": ogImage.asset->url
  }
`

export const apartmentsQuery = `
  *[_type == "apartment" && isFeatured == true] | order(orderRank asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    capacity,
    district,
    viewType,
    priceFrom,
    currency,
    amenities,
    "coverImageUrl": coverImage.asset->url,
    "galleryUrls": gallery[].asset->url
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
import Image from 'next/image'
import {
  getAmenityLabel,
  getApartmentTypeLabel,
  getBedTypeLabel,
  getCapacityLabel,
  getRentalFormatLabel,
  getViewTypeLabel,
} from '@/utils/apartment-labels'
import type {Language} from '@/utils/localization'

type ApartmentItem = {
  _id: string
  title: string
  slug?: string
  shortDescription: string
  apartmentType?: string
  complexName?: string
  capacity?: number
  bedType?: string
  rentalFormats: string[]
  district: string
  viewType?: string
  viewLabel: string
  priceLabel: string
  amenities: string[]
  coverImageUrl?: string
  galleryUrls: string[]
  isFeatured?: boolean
  orderRank?: string
  bookingUrl?: string
}

type ApartmentsSectionProps = {
  badge: string
  title: string
  description: string
  apartmentCardNoImage: string
  apartments: ApartmentItem[]
  language: Language
}

const whatsappAvailabilityBaseUrl = 'https://wa.me/995558209739'
const maxVisibleAmenities = 6

function getAvailabilityWhatsappUrl(title: string, language: Language) {
  const message =
    language === 'ru'
      ? `Здравствуйте! Хочу уточнить доступность апартамента: ${title}`
      : `Hello! I would like to check availability for: ${title}`

  return `${whatsappAvailabilityBaseUrl}?text=${encodeURIComponent(message)}`
}

export function ApartmentsSection({
  badge,
  title,
  description,
  apartmentCardNoImage,
  apartments,
  language,
}: ApartmentsSectionProps) {
  const bookButtonText = language === 'ru' ? 'Забронировать' : 'Book now'
  const availabilityButtonText =
    language === 'ru' ? 'Уточнить доступность' : 'Check availability'

  return (
    <section id="apartments" className="border-y border-[#E7DED2] bg-[#F1ECE4]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-[#A88A5D]">
            {badge}
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-8 text-[#5C544B]">{description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {apartments.map((apartment) => {
            const availabilityWhatsappUrl = getAvailabilityWhatsappUrl(
              apartment.title,
              language
            )
            const bookUrl = apartment.bookingUrl || availabilityWhatsappUrl
            const apartmentTypeLabel = getApartmentTypeLabel(
              apartment.apartmentType,
              language
            )
            const viewTypeLabel =
              getViewTypeLabel(apartment.viewType, language) ||
              apartment.viewLabel
            const capacityLabel = getCapacityLabel(apartment.capacity, language)
            const bedTypeLabel = getBedTypeLabel(apartment.bedType, language)
            const rentalFormatLabels = apartment.rentalFormats
              .map((rentalFormat) =>
                getRentalFormatLabel(rentalFormat, language)
              )
              .filter(Boolean)
            const amenityLabels = apartment.amenities
              .map((amenity) => getAmenityLabel(amenity, language))
              .filter(Boolean)
              .slice(0, maxVisibleAmenities)
            const detailBadges = [
              apartment.district,
              apartmentTypeLabel,
              viewTypeLabel,
              capacityLabel,
              bedTypeLabel,
              ...rentalFormatLabels,
            ].filter(Boolean)

            return (
              <article
                key={apartment._id}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#E2D7C8] bg-white shadow-[0_16px_40px_rgba(31,31,31,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(31,31,31,0.14)]"
              >
                {apartment.coverImageUrl ? (
                  <div className="relative h-72 w-full overflow-hidden bg-[#ECE6DD]">
                    <Image
                      src={apartment.coverImageUrl}
                      alt={apartment.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    {apartment.priceLabel && (
                      <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#1F1F1F] shadow-sm backdrop-blur">
                        {apartment.priceLabel}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-72 w-full items-center justify-center bg-[#ECE6DD] px-6 text-center text-sm font-medium text-[#7B7166]">
                    {apartmentCardNoImage}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div>
                    {apartment.complexName && (
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A88A5D]">
                        {apartment.complexName}
                      </p>
                    )}
                    <h3 className="mt-2 text-2xl font-semibold leading-tight text-[#1F1F1F]">
                      {apartment.title}
                    </h3>
                    {apartment.shortDescription && (
                      <p className="mt-3 text-sm leading-7 text-[#5C544B]">
                        {apartment.shortDescription}
                      </p>
                    )}
                  </div>

                  {detailBadges.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {detailBadges.map((detail) => (
                        <span
                          key={`${apartment._id}-${detail}`}
                          className="rounded-full border border-[#E7DED2] bg-[#FBF8F3] px-3 py-1.5 text-xs font-medium text-[#5C544B]"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  )}

                  {amenityLabels.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {amenityLabels.map((amenity) => (
                        <span
                          key={`${apartment._id}-${amenity}`}
                          className="rounded-full bg-[#F3EDE4] px-3 py-1.5 text-xs text-[#6B6258]"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">
                    <a
                      href={bookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F1F1F] px-5 py-3 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#2F2A25]"
                    >
                      {bookButtonText}
                    </a>
                    <a
                      href={availabilityWhatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#1F1F1F] bg-white px-5 py-3 text-center text-sm font-semibold text-[#1F1F1F] transition duration-300 hover:-translate-y-0.5 hover:bg-[#F3EDE4]"
                    >
                      {availabilityButtonText}
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

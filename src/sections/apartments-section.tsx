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
const maxVisibleMobileAmenities = 4

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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#A88A5D] sm:text-sm sm:tracking-[0.3em]">
            {badge}
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#5C544B] sm:mt-4 sm:text-base sm:leading-8">
            {description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
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
                className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#E2D7C8] bg-white shadow-[0_12px_32px_rgba(31,31,31,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(31,31,31,0.14)] sm:rounded-[28px] sm:shadow-[0_16px_40px_rgba(31,31,31,0.08)]"
              >
                {apartment.coverImageUrl ? (
                  <div className="relative h-56 w-full overflow-hidden bg-[#ECE6DD] sm:h-72">
                    <Image
                      src={apartment.coverImageUrl}
                      alt={apartment.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    {apartment.priceLabel && (
                      <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-[#1F1F1F] shadow-sm backdrop-blur sm:bottom-4 sm:left-4 sm:px-4 sm:py-2">
                        {apartment.priceLabel}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-56 w-full items-center justify-center bg-[#ECE6DD] px-6 text-center text-sm font-medium text-[#7B7166] sm:h-72">
                    {apartmentCardNoImage}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <div>
                    {apartment.complexName && (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A88A5D] sm:text-xs sm:tracking-[0.2em]">
                        {apartment.complexName}
                      </p>
                    )}
                    <h3 className="mt-1.5 text-xl font-semibold leading-tight text-[#1F1F1F] sm:mt-2 sm:text-2xl">
                      {apartment.title}
                    </h3>
                    {apartment.shortDescription && (
                      <p className="mt-2.5 text-sm leading-6 text-[#5C544B] sm:mt-3 sm:leading-7">
                        {apartment.shortDescription}
                      </p>
                    )}
                  </div>

                  {detailBadges.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                      {detailBadges.map((detail) => (
                        <span
                          key={`${apartment._id}-${detail}`}
                          className="rounded-full border border-[#E7DED2] bg-[#FBF8F3] px-2.5 py-1 text-[11px] font-medium leading-4 text-[#5C544B] sm:px-3 sm:py-1.5 sm:text-xs"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  )}

                  {amenityLabels.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                      {amenityLabels.map((amenity, index) => (
                        <span
                          key={`${apartment._id}-${amenity}`}
                          className={`rounded-full bg-[#F3EDE4] px-2.5 py-1 text-[11px] leading-4 text-[#6B6258] sm:px-3 sm:py-1.5 sm:text-xs ${
                            index >= maxVisibleMobileAmenities
                              ? 'hidden sm:inline-flex'
                              : ''
                          }`}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto grid gap-2.5 pt-5 sm:grid-cols-2 sm:gap-3 sm:pt-7">
                    <a
                      href={bookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#1F1F1F] px-5 py-3 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#2F2A25] sm:min-h-12"
                    >
                      {bookButtonText}
                    </a>
                    <a
                      href={availabilityWhatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#1F1F1F] bg-white px-5 py-3 text-center text-sm font-semibold text-[#1F1F1F] transition duration-300 hover:-translate-y-0.5 hover:bg-[#F3EDE4] sm:min-h-12"
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

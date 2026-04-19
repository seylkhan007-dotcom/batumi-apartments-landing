import Image from 'next/image'

type ApartmentItem = {
  _id: string
  title: string
  shortDescription: string
  capacity: number
  district: string
  viewLabel: string
  priceLabel: string
  amenities: string[]
  coverImageUrl?: string
}

type ApartmentsSectionProps = {
  badge: string
  title: string
  description: string
  apartmentGuestsLabel: string
  apartmentButton: string
  apartmentCardNoImage: string
  apartments: ApartmentItem[]
  whatsappLink: string
}

export function ApartmentsSection({
  badge,
  title,
  description,
  apartmentGuestsLabel,
  apartmentButton,
  apartmentCardNoImage,
  apartments,
  whatsappLink,
}: ApartmentsSectionProps) {
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
          {apartments.map((apartment) => (
            <article
              key={apartment._id}
              className="overflow-hidden rounded-[28px] border border-[#E2D7C8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(31,31,31,0.12)]"
            >
              {apartment.coverImageUrl ? (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={apartment.coverImageUrl}
                    alt={apartment.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="flex h-64 w-full items-center justify-center bg-[#ECE6DD] text-[#7B7166]">
                  {apartmentCardNoImage}
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{apartment.title}</h3>
                  <span className="rounded-full bg-[#F3EDE4] px-3 py-1 text-xs font-medium text-[#7A6543]">
                    {apartment.priceLabel}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-[#5C544B]">
                  {apartment.shortDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#E7DED2] px-3 py-1 text-xs text-[#5C544B]">
                    {apartment.capacity} {apartmentGuestsLabel}
                  </span>
                  <span className="rounded-full border border-[#E7DED2] px-3 py-1 text-xs text-[#5C544B]">
                    {apartment.district}
                  </span>
                  <span className="rounded-full border border-[#E7DED2] px-3 py-1 text-xs text-[#5C544B]">
                    {apartment.viewLabel}
                  </span>
                </div>

                {apartment.amenities.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {apartment.amenities.map((amenity, index) => (
                      <span
                        key={`${apartment._id}-${index}`}
                        className="rounded-full bg-[#F7F3ED] px-3 py-1 text-xs text-[#6B6258]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#1F1F1F] px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
                  >
                    {apartmentButton}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
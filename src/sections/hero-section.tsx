import Image from 'next/image'

type HeroSectionProps = {
  navAdvantages: string
  navApartments: string
  navReviews: string
  navContacts: string
  heroBadge: string
  heroTitle: string
  heroDescription: string
  heroPrimaryButton: string
  heroSecondaryButton: string
  statsApartments: string
  statsReviews: string
  statsSupport: string
  apartmentsCount: number
  reviewsCount: number
  whatsappLink: string
  heroImageUrl?: string
  heroImageAlt: string
  heroFallbackImage: string
  languageSwitcher: React.ReactNode
}

export function HeroSection({
  navAdvantages,
  navApartments,
  navReviews,
  navContacts,
  heroBadge,
  heroTitle,
  heroDescription,
  heroPrimaryButton,
  heroSecondaryButton,
  statsApartments,
  statsReviews,
  statsSupport,
  apartmentsCount,
  reviewsCount,
  whatsappLink,
  heroImageUrl,
  heroImageAlt,
  heroFallbackImage,
  languageSwitcher,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#F6F3EF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(198,169,122,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(31,31,31,0.06),_transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <header className="rounded-[28px] border border-[#E6DBCD] bg-white/80 px-4 py-4 shadow-[0_10px_30px_rgba(31,31,31,0.06)] backdrop-blur sm:rounded-full sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-4">
              <a href="#top" className="shrink-0">
                <p className="text-xl font-semibold tracking-[0.18em] text-[#1F1F1F] sm:text-2xl sm:tracking-[0.24em]">
                  NESTRO
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.35em] text-[#8A7A67] sm:text-[10px] sm:tracking-[0.45em]">
                  Living Group
                </p>
              </a>

              <div className="sm:hidden">{languageSwitcher}</div>
              <div className="hidden sm:block lg:hidden">{languageSwitcher}</div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-[#5F564D] md:flex">
              <a href="#advantages" className="transition hover:text-[#1F1F1F]">
                {navAdvantages}
              </a>
              <a href="#apartments" className="transition hover:text-[#1F1F1F]">
                {navApartments}
              </a>
              <a href="#reviews" className="transition hover:text-[#1F1F1F]">
                {navReviews}
              </a>
              <a href="#contacts" className="transition hover:text-[#1F1F1F]">
                {navContacts}
              </a>
            </nav>

            <div className="hidden lg:block">{languageSwitcher}</div>
          </div>
        </header>
      </div>

      <div
        id="top"
        className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:pb-24 lg:pt-14"
      >
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center rounded-full border border-[#E2D5C5] bg-white/85 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[#A88A5D] shadow-sm sm:px-4 sm:text-xs sm:tracking-[0.28em]">
            {heroBadge}
          </div>

          <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#1F1F1F] sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5C544B] sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            {heroDescription}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <a
              href="#apartments"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#1F1F1F] px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(31,31,31,0.18)] transition hover:-translate-y-0.5 hover:opacity-95 sm:px-7"
            >
              {heroPrimaryButton}
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C6A97A] bg-white/75 px-6 py-3.5 text-sm font-medium text-[#1F1F1F] transition hover:-translate-y-0.5 hover:bg-[#EFE7DC] sm:px-7"
            >
              {heroSecondaryButton}
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-[22px] border border-[#E7DED2] bg-white/85 p-4 shadow-[0_10px_30px_rgba(31,31,31,0.04)] backdrop-blur sm:rounded-[24px] sm:p-5">
              <p className="text-2xl font-semibold text-[#1F1F1F] sm:text-3xl">
                {apartmentsCount}+
              </p>
              <p className="mt-2 text-sm text-[#6B6258]">{statsApartments}</p>
            </div>

            <div className="rounded-[22px] border border-[#E7DED2] bg-white/85 p-4 shadow-[0_10px_30px_rgba(31,31,31,0.04)] backdrop-blur sm:rounded-[24px] sm:p-5">
              <p className="text-2xl font-semibold text-[#1F1F1F] sm:text-3xl">
                {reviewsCount}+
              </p>
              <p className="mt-2 text-sm text-[#6B6258]">{statsReviews}</p>
            </div>

            <div className="rounded-[22px] border border-[#E7DED2] bg-white/85 p-4 shadow-[0_10px_30px_rgba(31,31,31,0.04)] backdrop-blur sm:rounded-[24px] sm:p-5">
              <p className="text-2xl font-semibold text-[#1F1F1F] sm:text-3xl">
                24/7
              </p>
              <p className="mt-2 text-sm text-[#6B6258]">{statsSupport}</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 hidden h-28 w-28 rounded-full border border-[#E4D5C4] bg-white/50 blur-[1px] lg:block" />
          <div className="absolute -bottom-8 -right-6 hidden h-36 w-36 rounded-full border border-[#E4D5C4] bg-[#EDE3D6]/70 blur-[1px] lg:block" />

          <div className="relative overflow-hidden rounded-[28px] border border-[#E7DED2] bg-white p-2.5 shadow-[0_24px_60px_rgba(31,31,31,0.12)] sm:rounded-[36px] sm:p-3">
            {heroImageUrl ? (
              <div className="relative h-[320px] w-full sm:h-[420px] md:h-[520px] lg:h-[620px]">
                <Image
                  src={heroImageUrl}
                  alt={heroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="rounded-[22px] object-cover sm:rounded-[28px]"
                />
              </div>
            ) : (
              <div className="flex h-[320px] w-full items-center justify-center rounded-[22px] bg-[#ECE6DD] px-6 text-center text-[#7B7166] sm:h-[420px] sm:rounded-[28px] md:h-[520px] lg:h-[620px]">
                {heroFallbackImage}
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 rounded-[20px] border border-white/25 bg-[#1F1F1F]/70 p-4 text-white backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8 sm:rounded-[24px] sm:p-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/70 sm:text-xs sm:tracking-[0.3em]">
                NESTRO Living Group
              </p>
              <p className="mt-2 text-sm font-medium leading-6 sm:text-lg sm:leading-7">
                {heroDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
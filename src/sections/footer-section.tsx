type FooterSectionProps = {
  brandTitle: string
  brandSubtitle: string
  description: string
  phone?: string
  whatsapp?: string
  telegram?: string
  email?: string
  address?: string
  workingHours?: string
  navAdvantages: string
  navApartments: string
  navReviews: string
  navContacts: string
}

export function FooterSection({
  brandTitle,
  brandSubtitle,
  description,
  phone,
  whatsapp,
  telegram,
  email,
  address,
  workingHours,
  navAdvantages,
  navApartments,
  navReviews,
  navContacts,
}: FooterSectionProps) {
  return (
    <footer className="border-t border-[#E7DED2] bg-[#EFE9E0] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xl font-semibold tracking-[0.18em] text-[#1F1F1F] sm:text-2xl sm:tracking-[0.24em]">
            {brandTitle}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.32em] text-[#8A7A67] sm:text-xs sm:tracking-[0.42em]">
            {brandSubtitle}
          </p>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#5C544B] sm:mt-6">
            {description}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A7A67] sm:text-sm sm:tracking-[0.2em]">
            Navigation
          </p>

          <div className="mt-4 flex flex-col gap-3 text-sm text-[#3F3932] sm:mt-5">
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
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A7A67] sm:text-sm sm:tracking-[0.2em]">
            Contact
          </p>

          <div className="mt-4 flex flex-col gap-2.5 text-sm leading-7 text-[#3F3932] sm:mt-5 sm:gap-3">
            <p>{whatsapp || '—'}</p>
            <p>{phone || '—'}</p>
            <p>{telegram || '—'}</p>
            <p>{email || '—'}</p>
            <p>{address || '—'}</p>
            <p>{workingHours || '—'}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-[#DDD2C4] pt-5 sm:mt-10 sm:pt-6">
        <p className="text-[11px] tracking-[0.14em] text-[#8A7A67] sm:text-xs sm:tracking-[0.18em]">
          © NESTRO Living Group. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
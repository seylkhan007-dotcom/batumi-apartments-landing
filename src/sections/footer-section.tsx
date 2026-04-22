type FooterSectionProps = {
  brandTitle: string
  brandSubtitle: string
  description: string
  copyrightText?: string
  showDeveloperCredit?: boolean
  developerCreditText?: string
  navigationItems?: Array<{href: string; label: string}>
  quickLinks?: Array<{href: string; label: string}>
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
  copyrightText,
  showDeveloperCredit,
  developerCreditText,
  navigationItems,
  quickLinks,
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
  const fallbackNavigation = [
    {href: '#advantages', label: navAdvantages},
    {href: '#apartments', label: navApartments},
    {href: '#reviews', label: navReviews},
    {href: '#contacts', label: navContacts},
  ]
  const footerNavigation = navigationItems?.length
    ? navigationItems
    : fallbackNavigation
  const footerLinks = quickLinks?.length ? quickLinks : footerNavigation

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
            {footerLinks.map((item) => (
              <a
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="transition hover:text-[#1F1F1F]"
              >
                {item.label}
              </a>
            ))}
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
          {copyrightText || '© NESTRO Living Group. All rights reserved.'}
        </p>
        {showDeveloperCredit && developerCreditText ? (
          <p className="mt-2 text-[11px] tracking-[0.12em] text-[#8A7A67] sm:text-xs">
            {developerCreditText}
          </p>
        ) : null}
      </div>
    </footer>
  )
}

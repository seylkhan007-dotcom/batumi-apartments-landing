type ContactsSectionProps = {
  badge: string
  title: string
  description: string
  whatsappLabel: string
  telegramLabel: string
  phoneLabel: string
  emailLabel: string
  addressLabel: string
  hoursLabel: string
  whatsappButton: string
  telegramButton: string
  whatsappLink: string
  telegramLink: string
  whatsappValue?: string
  phoneValue?: string
  telegramValue?: string
  emailValue?: string
  addressValue?: string
  workingHoursValue?: string
}

export function ContactsSection({
  badge,
  title,
  description,
  whatsappLabel,
  telegramLabel,
  phoneLabel,
  emailLabel,
  addressLabel,
  hoursLabel,
  whatsappButton,
  telegramButton,
  whatsappLink,
  telegramLink,
  whatsappValue,
  phoneValue,
  telegramValue,
  emailValue,
  addressValue,
  workingHoursValue,
}: ContactsSectionProps) {
  return (
    <section id="contacts" className="bg-[#1F1F1F] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#C6A97A]">
            {badge}
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-white/75">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#C6A97A] px-6 py-3 text-sm font-medium text-[#1F1F1F] transition hover:opacity-90"
            >
              {whatsappButton}
            </a>

            <a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              {telegramButton}
            </a>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-white/50">{whatsappLabel}</p>
              <p className="mt-2 text-base font-medium">{whatsappValue || '—'}</p>
            </div>

            <div>
              <p className="text-sm text-white/50">{phoneLabel}</p>
              <p className="mt-2 text-base font-medium">{phoneValue || '—'}</p>
            </div>

            <div>
              <p className="text-sm text-white/50">{telegramLabel}</p>
              <p className="mt-2 text-base font-medium">{telegramValue || '—'}</p>
            </div>

            <div>
              <p className="text-sm text-white/50">{emailLabel}</p>
              <p className="mt-2 text-base font-medium">{emailValue || '—'}</p>
            </div>

            <div>
              <p className="text-sm text-white/50">{addressLabel}</p>
              <p className="mt-2 text-base font-medium">{addressValue || '—'}</p>
            </div>

            <div>
              <p className="text-sm text-white/50">{hoursLabel}</p>
              <p className="mt-2 text-base font-medium">
                {workingHoursValue || '—'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
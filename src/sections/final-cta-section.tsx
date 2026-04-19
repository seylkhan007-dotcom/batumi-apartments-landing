type FinalCtaSectionProps = {
  badge: string
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
  whatsappLink: string
  telegramLink: string
}

export function FinalCtaSection({
  badge,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  whatsappLink,
  telegramLink,
}: FinalCtaSectionProps) {
  return (
    <section className="bg-[#F6F3EF] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#E7DED2] bg-[#1F1F1F] px-5 py-8 text-white shadow-[0_24px_60px_rgba(31,31,31,0.16)] transition duration-300 hover:shadow-[0_28px_70px_rgba(31,31,31,0.22)] sm:rounded-[36px] sm:px-8 sm:py-12 md:px-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#C6A97A] sm:text-sm sm:tracking-[0.3em]">
              {badge}
            </p>

            <h2 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl">
              {title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:mt-5 sm:text-base sm:leading-8 md:text-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 lg:items-end">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#C6A97A] px-6 py-3.5 text-sm font-medium text-[#1F1F1F] transition duration-300 hover:-translate-y-0.5 hover:opacity-95 sm:w-auto sm:px-7 sm:py-4"
            >
              {primaryButtonText}
            </a>

            <a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto sm:px-7 sm:py-4"
            >
              {secondaryButtonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
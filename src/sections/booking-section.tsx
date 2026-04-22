import type {Language} from '@/utils/localization'

type BookingSectionProps = {
  language: Language
  whatsappPhone?: string
  whatsappMessage?: string
}

const whatsappBaseUrl = 'https://wa.me/995558209739'

function getBookingContent(language: Language) {
  if (language === 'en') {
    return {
      badge: 'Booking',
      title: 'Book an apartment in Batumi',
      description:
        'Contact us directly to check availability, price and stay conditions. We will respond quickly and suggest the best option.',
      primaryButton: 'Check availability',
      secondaryButton: 'Book via WhatsApp',
      whatsappText:
        'Hello! I would like to check apartment availability in Batumi.',
      steps: [
        {
          title: 'Contact us',
          description:
            'Send your dates, number of guests and apartment preferences.',
        },
        {
          title: 'Get available options',
          description:
            'We will suggest apartments that match your dates and stay format.',
        },
        {
          title: 'Confirm your booking',
          description:
            'After confirming the details, we will reserve the selected apartment for you.',
        },
      ],
    }
  }

  return {
    badge: 'Бронирование',
    title: 'Забронировать апартамент в Батуми',
    description:
      'Напишите нам напрямую, чтобы уточнить доступность, цену и условия проживания. Мы быстро ответим и предложим подходящий вариант.',
    primaryButton: 'Уточнить доступность',
    secondaryButton: 'Забронировать через WhatsApp',
    whatsappText:
      'Здравствуйте! Хочу уточнить доступность апартаментов в Батуми.',
    steps: [
      {
        title: 'Напишите нам',
        description:
          'Уточните даты, количество гостей и предпочтения по апартаменту.',
      },
      {
        title: 'Получите варианты',
        description:
          'Мы предложим доступные апартаменты под ваши даты и формат проживания.',
      },
      {
        title: 'Подтвердите бронирование',
        description:
          'После согласования условий мы закрепим выбранный вариант за вами.',
      },
    ],
  }
}

export function BookingSection({
  language,
  whatsappPhone,
  whatsappMessage,
}: BookingSectionProps) {
  const content = getBookingContent(language)
  const normalizedPhone = whatsappPhone?.replace(/[^\d]/g, '')
  const whatsappUrl = `${normalizedPhone ? `https://wa.me/${normalizedPhone}` : whatsappBaseUrl}?text=${encodeURIComponent(
    whatsappMessage || content.whatsappText
  )}`

  return (
    <section className="border-y border-[#E7DED2] bg-[#F6F3EF]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#A88A5D] sm:text-sm sm:tracking-[0.3em]">
              {content.badge}
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#5C544B] sm:mt-4 sm:text-base sm:leading-8">
              {content.description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1F1F1F] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(31,31,31,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2F2A25] sm:w-auto"
              >
                {content.primaryButton}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#1F1F1F] bg-white/80 px-6 py-3 text-sm font-semibold text-[#1F1F1F] transition duration-300 hover:-translate-y-0.5 hover:bg-[#EFE7DC] sm:w-auto"
              >
                {content.secondaryButton}
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {content.steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[24px] border border-[#E5DBCE] bg-white p-5 shadow-[0_12px_30px_rgba(31,31,31,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(31,31,31,0.09)] sm:rounded-[28px] sm:p-6"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F3EDE4] text-sm font-semibold text-[#8A6B3F]">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-[#1F1F1F]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5C544B]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

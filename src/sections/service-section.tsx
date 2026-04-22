import type {Language} from '@/utils/localization'

type ServiceSectionProps = {
  language: Language
}

function getServiceContent(language: Language) {
  if (language === 'en') {
    return {
      badge: 'Service',
      title: 'Everything for a comfortable stay',
      description:
        'We support guests at every stage, from check-in to check-out. Fast communication, prepared apartments and help during the stay.',
      cards: [
        {
          title: 'Check-in assistance',
          description: 'We explain arrival details quickly and stay in touch.',
        },
        {
          title: 'Prepared apartments',
          description:
            'Before check-in, we check cleanliness, basic amenities and apartment condition.',
        },
        {
          title: 'Fast communication',
          description:
            'We answer guest questions and help with everyday situations.',
        },
        {
          title: 'Stay support',
          description:
            'Guests are not left alone after check-in — we remain available.',
        },
      ],
    }
  }

  return {
    badge: 'Сервис',
    title: 'Всё для комфортного проживания',
    description:
      'Мы сопровождаем гостей на всех этапах: от заселения до выезда. Быстрая связь, подготовленные апартаменты и помощь во время проживания.',
    cards: [
      {
        title: 'Помощь при заселении',
        description:
          'Быстро объясняем детали заезда и остаёмся на связи.',
      },
      {
        title: 'Подготовленные апартаменты',
        description:
          'Перед заездом проверяем чистоту, базовые удобства и состояние объекта.',
      },
      {
        title: 'Быстрая коммуникация',
        description:
          'Отвечаем на вопросы гостей и помогаем решить бытовые ситуации.',
      },
      {
        title: 'Поддержка во время проживания',
        description:
          'Гость не остаётся один после заселения — мы остаёмся на связи.',
      },
    ],
  }
}

export function ServiceSection({language}: ServiceSectionProps) {
  const content = getServiceContent(language)

  return (
    <section className="border-y border-[#E7DED2] bg-[#F6F3EF]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#A88A5D] sm:text-sm sm:tracking-[0.3em]">
            {content.badge}
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#5C544B] sm:mt-4 sm:text-base sm:leading-8">
            {content.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {content.cards.map((card, index) => (
            <article
              key={card.title}
              className="group rounded-[24px] border border-[#E7DED2] bg-white p-5 shadow-[0_12px_32px_rgba(31,31,31,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(31,31,31,0.10)] sm:rounded-[28px] sm:p-6"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#F3EDE4] text-sm font-semibold text-[#8A6B3F] transition duration-300 group-hover:bg-[#E8DBC8] sm:h-12 sm:w-12">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-semibold text-[#1F1F1F] sm:text-xl">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5C544B]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import type {Language} from '@/utils/localization'

type PartnersSectionProps = {
  language: Language
}

const whatsappBaseUrl = 'https://wa.me/995558209739'

function getPartnersContent(language: Language) {
  if (language === 'en') {
    return {
      badge: 'For property owners',
      title: 'Want to list your apartment with NESTRO?',
      description:
        'NESTRO helps property owners rent apartments short-term and long-term. We handle guests, check-in, communication and property control.',
      button: 'Discuss partnership',
      whatsappText:
        'Hello! I would like to discuss listing my apartment with NESTRO.',
      points: ['Guest communication', 'Check-in support', 'Property control'],
    }
  }

  return {
    badge: 'Для собственников',
    title: 'Хотите передать апартамент в управление?',
    description:
      'NESTRO помогает собственникам сдавать апартаменты посуточно и на длительный срок. Берём на себя гостей, заселение, коммуникацию и контроль объекта.',
    button: 'Обсудить сотрудничество',
    whatsappText:
      'Здравствуйте! Хочу обсудить передачу апартамента в управление.',
    points: ['Коммуникация с гостями', 'Заселение', 'Контроль объекта'],
  }
}

export function PartnersSection({language}: PartnersSectionProps) {
  const content = getPartnersContent(language)
  const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(
    content.whatsappText
  )}`

  return (
    <section className="bg-[#F6F3EF]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[28px] border border-[#2F2A25]/10 bg-[#1F1F1F] shadow-[0_24px_60px_rgba(31,31,31,0.14)]">
          <div className="grid gap-8 p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#D9C7AE] sm:text-sm sm:tracking-[0.3em]">
                {content.badge}
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold sm:text-3xl md:text-4xl">
                {content.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/74 sm:text-base sm:leading-8">
                {content.description}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/7 p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {content.points.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs text-white/78"
                  >
                    {point}
                  </span>
                ))}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1F1F1F] transition duration-300 hover:-translate-y-0.5 hover:bg-[#EFE7DC]"
              >
                {content.button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import type {Language} from '@/utils/localization'

type LocationSectionProps = {
  language: Language
}

function getLocationContent(language: Language) {
  if (language === 'en') {
    return {
      badge: 'Location',
      title: 'Apartments in convenient areas of Batumi',
      description:
        'Our apartments are located near the sea, boulevard, restaurants and city infrastructure.',
      bullets: [
        'Sea and boulevard nearby',
        'Restaurants, shops and cafés close by',
        'Suitable for holidays and long stays',
        'Popular Batumi complexes and areas',
      ],
      panelTitle: 'Batumi stay',
      panelText:
        'Convenient locations for guests who want the sea, city life and everyday comfort close at hand.',
    }
  }

  return {
    badge: 'Локация',
    title: 'Апартаменты в удобных районах Батуми',
    description:
      'Наши объекты расположены рядом с морем, набережной, ресторанами и городской инфраструктурой.',
    bullets: [
      'Рядом море и набережная',
      'Рестораны, магазины и кафе поблизости',
      'Удобно для отдыха и длительного проживания',
      'Популярные комплексы и районы Батуми',
    ],
    panelTitle: 'Проживание в Батуми',
    panelText:
      'Удобные локации для гостей, которым важно быть рядом с морем, городом и повседневной инфраструктурой.',
  }
}

export function LocationSection({language}: LocationSectionProps) {
  const content = getLocationContent(language)

  return (
    <section className="bg-[#F1ECE4]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-8 lg:py-18">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.24em] text-[#A88A5D] sm:text-sm sm:tracking-[0.3em]">
            {content.badge}
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5C544B] sm:mt-4 sm:text-base sm:leading-8">
            {content.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {content.bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-3 rounded-[18px] border border-[#E5DBCE] bg-white/82 p-4 shadow-[0_10px_26px_rgba(31,31,31,0.045)]"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#A88A5D]" />
                <span className="text-sm leading-6 text-[#3F3932]">
                  {bullet}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-[#E2D7C8] bg-[#1F1F1F] p-5 text-white shadow-[0_22px_54px_rgba(31,31,31,0.13)] sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(198,169,122,0.30),_transparent_30%),linear-gradient(135deg,_rgba(255,255,255,0.08),_transparent_45%)]" />
          <div className="relative min-h-[260px] rounded-[22px] border border-white/15 bg-white/8 p-5 sm:min-h-[320px] sm:p-6">
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                  NESTRO Living Group
                </p>
                <h3 className="mt-4 max-w-sm text-3xl font-semibold leading-tight sm:text-4xl">
                  {content.panelTitle}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/74 sm:text-base">
                  {content.panelText}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-[18px] border border-white/12 bg-white/10 p-4">
                  <p className="text-2xl font-semibold">Sea</p>
                  <p className="mt-1 text-white/62">nearby</p>
                </div>
                <div className="rounded-[18px] border border-white/12 bg-white/10 p-4">
                  <p className="text-2xl font-semibold">City</p>
                  <p className="mt-1 text-white/62">close</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

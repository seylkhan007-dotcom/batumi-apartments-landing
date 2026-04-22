import Image from 'next/image'
import type {Language} from '@/utils/localization'

type HeroSectionProps = {
  navAdvantages: string
  navApartments: string
  navReviews: string
  navContacts: string
  heroImageUrl?: string
  heroImageAlt: string
  heroFallbackImage: string
  languageSwitcher: React.ReactNode
  language: Language
}

const whatsappBaseUrl = 'https://wa.me/995558209739'

function getHeroContent(language: Language) {
  if (language === 'en') {
    return {
      badge: 'Apartments in Batumi',
      title: 'Apartments in Batumi near the sea and city center',
      description:
        'Comfortable stay, clean apartments and easy check-in. Guest support at every stage — from arrival to check-out.',
      bullets: [
        'Sea view and convenient locations',
        'Short-term and long-term stays',
        'Fast communication and guest support',
      ],
      bookButton: 'Book now',
      availabilityButton: 'Check availability',
      whatsappText:
        'Hello! I would like to check apartment availability in Batumi.',
      stats: [
        {
          value: '5+',
          label: 'years of experience',
        },
        {
          value: '100+',
          label: 'Hundreds of guests',
        },
        {
          value: '24/7',
          label: 'Guest support',
        },
      ],
      imageCaption: 'Clean apartments, easy check-in and direct guest support.',
    }
  }

  return {
    badge: 'Апартаменты в Батуми',
    title: 'Апартаменты в Батуми у моря и в центре',
    description:
      'Комфортное проживание, чистые апартаменты и удобное заселение. Поддержка гостей на всех этапах — от заезда до выезда.',
    bullets: [
      'Вид на море и удобные локации',
      'Краткосрочное и долгосрочное проживание',
      'Быстрая связь и поддержка гостей',
    ],
    bookButton: 'Забронировать',
    availabilityButton: 'Уточнить доступность',
    whatsappText:
      'Здравствуйте! Хочу уточнить доступность апартаментов в Батуми.',
    stats: [
      {
        value: '5+',
        label: 'лет опыта',
      },
      {
        value: '100+',
        label: 'Сотни гостей',
      },
      {
        value: '24/7',
        label: 'Поддержка гостей',
      },
    ],
    imageCaption: 'Чистые апартаменты, удобное заселение и поддержка гостей.',
  }
}

export function HeroSection({
  navAdvantages,
  navApartments,
  navReviews,
  navContacts,
  heroImageUrl,
  heroImageAlt,
  heroFallbackImage,
  languageSwitcher,
  language,
}: HeroSectionProps) {
  const content = getHeroContent(language)
  const whatsappLink = `${whatsappBaseUrl}?text=${encodeURIComponent(
    content.whatsappText
  )}`

  return (
    <section className="relative overflow-hidden bg-[#F6F3EF]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.76),_rgba(241,236,228,0.9)),radial-gradient(circle_at_top_left,_rgba(198,169,122,0.18),_transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-3 sm:px-6 sm:pt-6 lg:px-8">
        <header className="rounded-[22px] border border-[#E6DBCD] bg-white/85 px-3 py-3 shadow-[0_10px_30px_rgba(31,31,31,0.06)] backdrop-blur sm:rounded-full sm:px-5 sm:py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-4">
              <a href="#top" className="shrink-0">
                <p className="text-lg font-semibold tracking-[0.16em] text-[#1F1F1F] sm:text-2xl sm:tracking-[0.24em]">
                  NESTRO
                </p>
                <p className="mt-0.5 text-[8px] uppercase tracking-[0.28em] text-[#8A7A67] sm:mt-1 sm:text-[10px] sm:tracking-[0.45em]">
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
        className="relative mx-auto grid max-w-7xl gap-6 px-4 pb-10 pt-6 sm:gap-8 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-12"
      >
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center rounded-full border border-[#D7C2A2] bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A0783F] shadow-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]">
            {content.badge}
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] text-[#1F1F1F] sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
            {content.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5C544B] sm:mt-6 sm:text-base sm:leading-8 md:text-lg md:leading-9">
            {content.description}
          </p>

          <div className="mt-5 grid gap-2 text-xs font-medium text-[#3F3932] sm:mt-6 sm:grid-cols-3 sm:gap-4 sm:text-sm">
            {content.bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-2.5 rounded-[16px] border border-[#E7DED2] bg-white/75 p-2.5 shadow-[0_8px_24px_rgba(31,31,31,0.04)] sm:gap-3 sm:rounded-[18px] sm:p-3"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A88A5D] sm:h-2 sm:w-2" />
                <span className="leading-5 sm:leading-6">{bullet}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#1F1F1F] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(31,31,31,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2F2A25] sm:min-h-[52px] sm:w-auto sm:px-8 sm:py-3.5"
            >
              {content.bookButton}
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-[#1F1F1F] bg-white/80 px-6 py-3 text-sm font-semibold text-[#1F1F1F] transition duration-300 hover:-translate-y-0.5 hover:bg-[#EFE7DC] sm:min-h-[52px] sm:w-auto sm:px-8 sm:py-3.5"
            >
              {content.availabilityButton}
            </a>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-4">
            {content.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[18px] border border-[#E7DED2] bg-white/85 p-3 shadow-[0_10px_30px_rgba(31,31,31,0.04)] backdrop-blur sm:rounded-[24px] sm:p-5"
              >
                <p className="text-xl font-semibold text-[#1F1F1F] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] leading-4 text-[#6B6258] sm:mt-2 sm:text-sm sm:leading-5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-5 top-8 hidden h-24 w-24 rounded-full border border-[#E4D5C4] bg-white/45 lg:block" />
          <div className="absolute -bottom-6 -right-5 hidden h-32 w-32 rounded-full border border-[#E4D5C4] bg-[#EDE3D6]/65 lg:block" />

          <div className="relative overflow-hidden rounded-[28px] border border-[#E7DED2] bg-white p-2.5 shadow-[0_24px_60px_rgba(31,31,31,0.12)] sm:rounded-[36px] sm:p-3">
            {heroImageUrl ? (
              <div className="relative h-[240px] w-full sm:h-[420px] md:h-[520px] lg:h-[620px]">
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
              <div className="flex h-[240px] w-full items-center justify-center rounded-[22px] bg-[#ECE6DD] px-6 text-center text-[#7B7166] sm:h-[420px] sm:rounded-[28px] md:h-[520px] lg:h-[620px]">
                {heroFallbackImage}
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 rounded-[16px] border border-white/20 bg-[#1F1F1F]/58 p-3 text-white backdrop-blur-sm sm:bottom-8 sm:left-8 sm:right-8 sm:rounded-[24px] sm:bg-[#1F1F1F]/70 sm:p-5 sm:backdrop-blur-md">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/70 sm:text-xs sm:tracking-[0.3em]">
                NESTRO Living Group
              </p>
              <p className="mt-1.5 text-xs font-medium leading-5 sm:mt-2 sm:text-lg sm:leading-7">
                {content.imageCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'
import type {Language} from '@/utils/localization'

type HeroSectionProps = {
  navAdvantages: string
  navApartments: string
  navReviews: string
  navContacts: string
  navigationItems?: Array<{href: string; label: string}>
  brandTitle?: string
  brandSubtitle?: string
  whatsappPhone?: string
  whatsappMessage?: string
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
      navigation: [
        {href: '#advantages', label: 'Advantages'},
        {href: '#apartments', label: 'Apartments'},
        {href: '#reviews', label: 'Reviews'},
        {href: '#contacts', label: 'Contacts'},
      ],
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
    navigation: [
      {href: '#advantages', label: 'Преимущества'},
      {href: '#apartments', label: 'Апартаменты'},
      {href: '#reviews', label: 'Отзывы'},
      {href: '#contacts', label: 'Контакты'},
    ],
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
  navigationItems,
  brandTitle = 'NESTRO',
  brandSubtitle = 'Living Group',
  whatsappPhone,
  whatsappMessage,
}: HeroSectionProps) {
  const content = getHeroContent(language)
  const normalizedPhone = whatsappPhone?.replace(/[^\d]/g, '')
  const whatsappLink = `${normalizedPhone ? `https://wa.me/${normalizedPhone}` : whatsappBaseUrl}?text=${encodeURIComponent(
    whatsappMessage || content.whatsappText
  )}`
  const fallbackNavigation = [
    {href: '#advantages', label: navAdvantages},
    {href: '#apartments', label: navApartments},
    {href: '#reviews', label: navReviews},
    {href: '#contacts', label: navContacts},
  ]
  const headerNavigation = navigationItems?.length
    ? navigationItems
    : fallbackNavigation

  return (
    <section className="relative overflow-hidden bg-[#F6F3EF]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.76),_rgba(241,236,228,0.9)),radial-gradient(circle_at_top_left,_rgba(198,169,122,0.18),_transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-3 sm:px-6 sm:pt-6 lg:px-8">
        <header className="rounded-[24px] border border-[#E3D7C8] bg-white/86 px-3 py-2.5 shadow-[0_16px_42px_rgba(31,31,31,0.075)] backdrop-blur-md sm:rounded-full sm:px-4 lg:px-5 lg:py-3">
          <div className="flex items-center gap-3">
            <div className="flex min-w-0 shrink-0 items-center">
              <a href="#top" className="shrink-0">
                <p className="text-base font-semibold tracking-[0.14em] text-[#1F1F1F] sm:text-xl sm:tracking-[0.22em] lg:text-[1.35rem]">
                  {brandTitle}
                </p>
                <p className="mt-0.5 text-[7px] uppercase tracking-[0.24em] text-[#8A7A67] sm:text-[9px] sm:tracking-[0.4em]">
                  {brandSubtitle}
                </p>
              </a>
            </div>

            <nav className="ml-5 hidden shrink-0 items-center justify-center gap-5 rounded-full border border-[#E9DFD3] bg-[#F8F4EE]/78 px-5 py-1.5 text-sm text-[#5F564D] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_22px_rgba(31,31,31,0.045)] lg:flex xl:ml-7 xl:gap-7 xl:px-6">
              {headerNavigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2.5 transition hover:bg-white hover:text-[#1F1F1F] hover:shadow-sm xl:px-5"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden flex-1 lg:block" />

            <div className="ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:ml-8 lg:gap-4">
              <div className="scale-[0.88] sm:scale-100">{languageSwitcher}</div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-9 items-center justify-center rounded-full bg-[#1F1F1F] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(31,31,31,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2F2A25] sm:min-h-10 sm:px-5 sm:text-sm lg:min-h-11 lg:px-6"
              >
                {content.bookButton}
              </a>
            </div>
          </div>
        </header>
      </div>

      <div
        id="top"
        className="relative mx-auto grid max-w-7xl gap-6 px-4 pb-10 pt-5 sm:gap-8 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-12"
      >
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center rounded-full border border-[#D7C2A2] bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A0783F] shadow-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]">
            {content.badge}
          </div>

          <h1 className="mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.05] text-[#1F1F1F] sm:mt-6 sm:text-5xl sm:leading-[1.04] md:text-[3.45rem] lg:text-[3.85rem] xl:text-[4.35rem]">
            {content.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5C544B] sm:mt-5 sm:text-base sm:leading-8 md:text-lg md:leading-8">
            {content.description}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:gap-4">
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

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-[#3F3932] sm:mt-7 sm:gap-2.5 sm:text-sm">
            {content.bullets.map((bullet) => (
              <div
                key={bullet}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E4D8C9] bg-white/68 px-3 py-2 shadow-[0_8px_20px_rgba(31,31,31,0.035)] sm:px-3.5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A88A5D]" />
                <span className="leading-5">{bullet}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
            {content.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[16px] border border-[#E9E0D5] bg-white/70 p-2.5 shadow-[0_8px_24px_rgba(31,31,31,0.035)] backdrop-blur sm:rounded-[20px] sm:p-4"
              >
                <p className="text-lg font-semibold text-[#1F1F1F] sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[10px] leading-4 text-[#6B6258] sm:mt-1.5 sm:text-sm sm:leading-5">
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

            <div className="absolute bottom-3 left-3 right-3 rounded-[16px] border border-white/18 bg-[#1F1F1F]/48 p-3 text-white backdrop-blur-sm sm:bottom-7 sm:left-7 sm:right-7 sm:rounded-[22px] sm:bg-[#1F1F1F]/58 sm:p-4">
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/68 sm:text-[11px] sm:tracking-[0.26em]">
                NESTRO Living Group
              </p>
              <p className="mt-1.5 text-xs font-medium leading-5 sm:mt-2 sm:text-base sm:leading-7">
                {content.imageCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

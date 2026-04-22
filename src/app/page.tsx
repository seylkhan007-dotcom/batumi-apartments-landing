import type {Metadata} from 'next'
import {existsSync} from 'node:fs'
import {join} from 'node:path'
import {FadeIn} from '@/components/common/fade-in'
import {FloatingWhatsAppButton} from '@/components/floating-whatsapp-button'
import {AdvantagesSection} from '@/sections/advantages-section'
import {ApartmentsSection} from '@/sections/apartments-section'
import {BookingSection} from '@/sections/booking-section'
import {ContactsSection} from '@/sections/contacts-section'
import {FinalCtaSection} from '@/sections/final-cta-section'
import {FooterSection} from '@/sections/footer-section'
import {HeroSection} from '@/sections/hero-section'
import {InstagramSection} from '@/sections/instagram-section'
import {LocationSection} from '@/sections/location-section'
import {PartnersSection} from '@/sections/partners-section'
import {ReviewsSection} from '@/sections/reviews-section'
import {ServiceSection} from '@/sections/service-section'
import {
  getAdvantages,
  getApartments,
  getContacts,
  getHomepageSettings,
  getReviews,
  getSeoSettings,
} from '@/lib/content'
import {
  buildLanguageHref,
  getLanguageFromSearchParams,
  getLocalizedValue,
  type Language,
} from '@/utils/localization'

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

const siteUrl = 'https://nestroapartments.com'
const fallbackOgImagePath = '/og-image.png'
const hasFallbackOgImage = existsSync(
  join(process.cwd(), 'public', 'og-image.png')
)

function getWhatsAppLink(phone?: string) {
  if (!phone) return '#'
  const normalizedPhone = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${normalizedPhone}`
}

function getTelegramLink(telegram?: string) {
  if (!telegram) return '#'

  if (telegram.startsWith('@')) {
    return `https://t.me/${telegram.slice(1)}`
  }

  return `https://t.me/${telegram}`
}

function formatPrice(
  priceFrom: number | undefined,
  currency: string | undefined,
  language: Language
) {
  if (!priceFrom) return language === 'ru' ? 'Цена по запросу' : 'Price on request'

  const priceCurrency = currency || 'USD'

  return language === 'ru'
    ? `от ${priceFrom} ${priceCurrency}`
    : `from ${priceFrom} ${priceCurrency}`
}

function getViewLabel(viewType: string | undefined, language: Language) {
  if (!viewType) return ''

  const ruMap: Record<string, string> = {
    'sea-view': 'Вид на море',
    'city-view': 'Вид на город',
    'mountain-view': 'Вид на горы',
    'mixed-view': 'Смешанный вид',
    'no-specific-view': 'Комфортное размещение',
  }

  const enMap: Record<string, string> = {
    'sea-view': 'Sea view',
    'city-view': 'City view',
    'mountain-view': 'Mountain view',
    'mixed-view': 'Mixed view',
    'no-specific-view': 'Comfortable stay',
  }

  return language === 'ru'
    ? ruMap[viewType] ?? viewType
    : enMap[viewType] ?? viewType
}

function getAmenityLabel(
  amenity: string | {ru?: string; en?: string},
  language: Language
) {
  if (typeof amenity === 'string') return amenity

  if (language === 'en') {
    return amenity.en || amenity.ru || ''
  }

  return amenity.ru || amenity.en || ''
}

function getStayTypeLabel(stayType?: string, language: Language = 'ru') {
  const ruMap: Record<string, string> = {
    tourist: 'Турист',
    family: 'Семья',
    business: 'Бизнес',
    couple: 'Пара',
    'long-stay': 'Долгое проживание',
  }

  const enMap: Record<string, string> = {
    tourist: 'Tourist',
    family: 'Family',
    business: 'Business',
    couple: 'Couple',
    'long-stay': 'Long stay',
  }

  if (!stayType) {
    return language === 'ru' ? 'Гость' : 'Guest'
  }

  return language === 'ru'
    ? ruMap[stayType] ?? stayType
    : enMap[stayType] ?? stayType
}

function getFallbackTexts(language: Language) {
  if (language === 'en') {
    return {
      navAdvantages: 'Advantages',
      navApartments: 'Apartments',
      navReviews: 'Reviews',
      navContacts: 'Contacts',
      heroBadge: 'Premium stay in Batumi',
      heroTitle: 'Comfortable and secure stay with direct booking support',
      heroDescription:
        'Stylish apartments, calm hospitality, clear communication and a premium stay experience in trusted Batumi locations.',
      heroPrimaryButton: 'View apartments',
      heroSecondaryButton: 'Write on WhatsApp',
      statsApartments: 'stay options',
      statsReviews: 'reviews in CMS',
      statsSupport: 'guest support',
      advantagesBadge: 'Why guests choose NESTRO',
      advantagesTitle: 'Clear service without chaos',
      advantagesDescription:
        'We do not just rent apartments. We create a calm and organized stay experience from the first message to check-out.',
      apartmentsBadge: 'Our apartments',
      apartmentsTitle: 'Stay options in Batumi',
      apartmentsDescription:
        'Real apartments prepared for comfortable vacations, work trips and peaceful stays by the sea.',
      apartmentGuests: 'guests',
      apartmentButton: 'Check availability',
      apartmentCardNoImage: 'No photo available',
      reviewsBadge: 'Guest reviews',
      reviewsTitle: 'What guests say',
      reviewsDescription:
        'Guests value real experience: cleanliness, comfort, communication and confidence that everything is organized properly.',
      contactsBadge: 'Contacts',
      contactsTitle: 'Contact us directly',
      contactsDescription:
        'Fast communication, clear support and direct contact without unnecessary intermediaries.',
      contactsWhatsapp: 'WhatsApp',
      contactsTelegram: 'Telegram',
      contactsPhone: 'Phone',
      contactsEmail: 'Email',
      contactsAddress: 'Location',
      contactsHours: 'Working hours',
      contactsSectionButtonWhatsapp: 'WhatsApp',
      contactsSectionButtonTelegram: 'Telegram',
      heroFallbackImage: 'Apartment image will appear here',
      seoTitle: 'NESTRO Apartments — apartments in Batumi',
      seoDescription:
        'Apartments in Batumi near the sea and city center. Studios and 1-bedroom apartments for short-term and long-term stays, easy check-in and guest support.',
      ogTitle: 'NESTRO Apartments — apartments in Batumi',
      ogDescription:
        'Apartments in Batumi near the sea and city center. Studios and 1-bedroom apartments for short-term and long-term stays, easy check-in and guest support.',
      finalCtaBadge: 'Direct booking',
      finalCtaTitle: 'Ready to choose your apartment in Batumi?',
      finalCtaDescription:
        'Write directly to us to check current availability, prices and the best option for your stay.',
      finalCtaPrimaryButton: 'Write on WhatsApp',
      finalCtaSecondaryButton: 'Open Telegram',
      footerDescription:
        'Direct booking, calm communication and carefully prepared apartments in Batumi for short and comfortable stays.',
    }
  }

  return {
    navAdvantages: 'Преимущества',
    navApartments: 'Апартаменты',
    navReviews: 'Отзывы',
    navContacts: 'Контакты',
    heroBadge: 'Премиальное проживание в Батуми',
    heroTitle: 'Комфортное и безопасное проживание с прямой связью и поддержкой',
    heroDescription:
      'Стильные апартаменты, спокойный hospitality-подход, понятная коммуникация и аккуратно организованный сервис в проверенных локациях Батуми.',
    heroPrimaryButton: 'Смотреть апартаменты',
    heroSecondaryButton: 'Написать в WhatsApp',
    statsApartments: 'вариантов проживания',
    statsReviews: 'отзывов в CMS',
    statsSupport: 'поддержка гостей',
    advantagesBadge: 'Почему выбирают NESTRO',
    advantagesTitle: 'Понятный сервис без хаоса',
    advantagesDescription:
      'Мы не просто сдаём апартаменты. Мы выстраиваем спокойный и аккуратный опыт проживания: от первого сообщения до выезда гостя.',
    apartmentsBadge: 'Наши апартаменты',
    apartmentsTitle: 'Варианты проживания в Батуми',
    apartmentsDescription:
      'Реальные объекты, аккуратно подготовленные для комфортного отдыха, деловой поездки или спокойного проживания у моря.',
    apartmentGuests: 'гостя',
    apartmentButton: 'Уточнить доступность',
    apartmentCardNoImage: 'Фото отсутствует',
    reviewsBadge: 'Отзывы гостей',
    reviewsTitle: 'Что говорят о проживании',
    reviewsDescription:
      'Для гостя важны не обещания, а реальный опыт: чистота, комфорт, коммуникация и уверенность, что всё будет организовано нормально.',
    contactsBadge: 'Контакты',
    contactsTitle: 'Свяжитесь с нами напрямую',
    contactsDescription:
      'Быстрый контакт, понятная коммуникация и прямое обращение без лишних посредников.',
    contactsWhatsapp: 'WhatsApp',
    contactsTelegram: 'Telegram',
    contactsPhone: 'Телефон',
    contactsEmail: 'Email',
    contactsAddress: 'Локация',
    contactsHours: 'Часы связи',
    contactsSectionButtonWhatsapp: 'WhatsApp',
    contactsSectionButtonTelegram: 'Telegram',
    heroFallbackImage: 'Фото апартаментов появится здесь',
    seoTitle: 'NESTRO Apartments — апартаменты в Батуми',
    seoDescription:
      'Апартаменты в Батуми у моря и в центре. Студии и 1+1 для краткосрочного и долгосрочного проживания, удобное заселение и поддержка гостей.',
    ogTitle: 'NESTRO Apartments — апартаменты в Батуми',
    ogDescription:
      'Апартаменты в Батуми у моря и в центре. Студии и 1+1 для краткосрочного и долгосрочного проживания, удобное заселение и поддержка гостей.',
    finalCtaBadge: 'Прямое бронирование',
    finalCtaTitle: 'Готовы выбрать апартаменты в Батуми?',
    finalCtaDescription:
      'Напишите нам напрямую, чтобы уточнить актуальную доступность, цены и лучший вариант под ваш формат проживания.',
    finalCtaPrimaryButton: 'Написать в WhatsApp',
    finalCtaSecondaryButton: 'Открыть Telegram',
    footerDescription:
      'Прямое бронирование, спокойная коммуникация и аккуратно подготовленные апартаменты в Батуми для короткого и комфортного проживания.',
  }
}

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const language = getLanguageFromSearchParams(resolvedSearchParams)
  const fallback = getFallbackTexts(language)
  const seoSettings = await getSeoSettings()

  const title = seoSettings
    ? getLocalizedValue(seoSettings.metaTitle, language) || fallback.seoTitle
    : fallback.seoTitle

  const description = seoSettings
    ? getLocalizedValue(seoSettings.metaDescription, language) ||
      fallback.seoDescription
    : fallback.seoDescription

  const ogTitle = seoSettings
    ? getLocalizedValue(seoSettings.ogTitle, language) || fallback.ogTitle
    : fallback.ogTitle

  const ogDescription = seoSettings
    ? getLocalizedValue(seoSettings.ogDescription, language) ||
      fallback.ogDescription
    : fallback.ogDescription
  const ogImages = seoSettings?.ogImageUrl
    ? [seoSettings.ogImageUrl]
    : hasFallbackOgImage
      ? [fallbackOgImagePath]
      : []

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: language === 'en' ? '/?lang=en' : '/?lang=ru',
      languages: {
        ru: '/?lang=ru',
        en: '/?lang=en',
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: language === 'en' ? '/?lang=en' : '/?lang=ru',
      siteName: 'NESTRO Apartments',
      locale: language === 'en' ? 'en_US' : 'ru_RU',
      type: 'website',
      images: ogImages,
    },
    twitter: {
      card: ogImages.length > 0 ? 'summary_large_image' : 'summary',
      title: ogTitle,
      description: ogDescription,
      images: ogImages,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },
  }
}

export default async function HomePage({searchParams}: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const language = getLanguageFromSearchParams(resolvedSearchParams)
  const fallback = getFallbackTexts(language)

  const [apartments, advantages, reviews, contacts, homepageSettings] =
    await Promise.all([
      getApartments(),
      getAdvantages(),
      getReviews(),
      getContacts(),
      getHomepageSettings(),
    ])

  const whatsappLink = getWhatsAppLink(contacts?.whatsapp)
  const telegramLink = getTelegramLink(contacts?.telegram)

  const mappedAdvantages = advantages.map((advantage) => ({
    _id: advantage._id,
    title: getLocalizedValue(advantage.title, language),
    description: getLocalizedValue(advantage.description, language),
  }))

  const mappedApartments = apartments.map((apartment) => ({
    _id: apartment._id,
    title: getLocalizedValue(apartment.title, language) || fallback.navApartments,
    slug: apartment.slug,
    shortDescription: getLocalizedValue(apartment.shortDescription, language),
    apartmentType: apartment.apartmentType,
    complexName: apartment.complexName,
    capacity: apartment.capacity,
    bedType: apartment.bedType,
    rentalFormats: apartment.rentalFormats ?? [],
    district: getLocalizedValue(apartment.district, language),
    viewType: apartment.viewType,
    viewLabel: getViewLabel(apartment.viewType, language),
    priceLabel: formatPrice(apartment.priceFrom, apartment.currency, language),
    amenities: (apartment.amenities ?? [])
      .map((amenity) => getAmenityLabel(amenity, language))
      .filter(Boolean),
    coverImageUrl: apartment.coverImageUrl,
    galleryUrls: apartment.galleryUrls ?? [],
    isFeatured: apartment.isFeatured,
    orderRank: apartment.orderRank,
    bookingUrl: apartment.bookingUrl,
  }))

  const instagramImageUrls = Array.from(
    new Set(
      apartments.flatMap((apartment) => [
        apartment.coverImageUrl,
        ...(apartment.galleryUrls ?? []),
      ])
    )
  ).filter((imageUrl): imageUrl is string => Boolean(imageUrl))

  const mappedReviews = reviews.map((review) => ({
    _id: review._id,
    guestName: review.guestName,
    country: review.country,
    rating: review.rating,
    text: getLocalizedValue(review.text, language),
    stayTypeLabel: getStayTypeLabel(review.stayType, language),
  }))

  const navAdvantages = homepageSettings
    ? getLocalizedValue(homepageSettings.navigationAdvantages, language)
    : fallback.navAdvantages

  const navApartments = homepageSettings
    ? getLocalizedValue(homepageSettings.navigationApartments, language)
    : fallback.navApartments

  const navReviews = homepageSettings
    ? getLocalizedValue(homepageSettings.navigationReviews, language)
    : fallback.navReviews

  const navContacts = homepageSettings
    ? getLocalizedValue(homepageSettings.navigationContacts, language)
    : fallback.navContacts

  const advantagesBadge = homepageSettings
    ? getLocalizedValue(homepageSettings.advantagesBadge, language)
    : fallback.advantagesBadge

  const advantagesTitle = homepageSettings
    ? getLocalizedValue(homepageSettings.advantagesTitle, language)
    : fallback.advantagesTitle

  const advantagesDescription = homepageSettings
    ? getLocalizedValue(homepageSettings.advantagesDescription, language)
    : fallback.advantagesDescription

  const apartmentsBadge = homepageSettings
    ? getLocalizedValue(homepageSettings.apartmentsBadge, language)
    : fallback.apartmentsBadge

  const apartmentsTitle = homepageSettings
    ? getLocalizedValue(homepageSettings.apartmentsTitle, language)
    : fallback.apartmentsTitle

  const apartmentsDescription = homepageSettings
    ? getLocalizedValue(homepageSettings.apartmentsDescription, language)
    : fallback.apartmentsDescription

  const reviewsBadge = homepageSettings
    ? getLocalizedValue(homepageSettings.reviewsBadge, language)
    : fallback.reviewsBadge

  const reviewsTitle = homepageSettings
    ? getLocalizedValue(homepageSettings.reviewsTitle, language)
    : fallback.reviewsTitle

  const reviewsDescription = homepageSettings
    ? getLocalizedValue(homepageSettings.reviewsDescription, language)
    : fallback.reviewsDescription

  const contactsBadge = homepageSettings
    ? getLocalizedValue(homepageSettings.contactsBadge, language)
    : fallback.contactsBadge

  const contactsTitle = homepageSettings
    ? getLocalizedValue(homepageSettings.contactsTitle, language)
    : fallback.contactsTitle

  const contactsDescription = homepageSettings
    ? getLocalizedValue(homepageSettings.contactsDescription, language)
    : fallback.contactsDescription

  const languageSwitcher = (
    <div className="flex items-center gap-2">
      <a
        href={buildLanguageHref('ru')}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          language === 'ru'
            ? 'bg-[#1F1F1F] text-white'
            : 'border border-[#D8CEC2] bg-white/80 text-[#5C544B] hover:bg-[#EFE7DC]'
        }`}
      >
        RU
      </a>
      <a
        href={buildLanguageHref('en')}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          language === 'en'
            ? 'bg-[#1F1F1F] text-white'
            : 'border border-[#D8CEC2] bg-white/80 text-[#5C544B] hover:bg-[#EFE7DC]'
        }`}
      >
        EN
      </a>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#F6F3EF] text-[#1F1F1F]">
      <HeroSection
        navAdvantages={navAdvantages}
        navApartments={navApartments}
        navReviews={navReviews}
        navContacts={navContacts}
        heroImageUrl={apartments[0]?.coverImageUrl}
        heroImageAlt={
          apartments[0] ? getLocalizedValue(apartments[0].title, language) : 'NESTRO'
        }
        heroFallbackImage={fallback.heroFallbackImage}
        languageSwitcher={languageSwitcher}
        language={language}
      />

      <FadeIn>
        <AdvantagesSection
          badge={advantagesBadge}
          title={advantagesTitle}
          description={advantagesDescription}
          advantages={mappedAdvantages}
        />
      </FadeIn>

      <FadeIn>
        <ApartmentsSection
          badge={apartmentsBadge}
          title={apartmentsTitle}
          description={apartmentsDescription}
          apartmentCardNoImage={fallback.apartmentCardNoImage}
          apartments={mappedApartments}
          language={language}
        />
      </FadeIn>

      <FadeIn>
        <ServiceSection language={language} />
      </FadeIn>

      <FadeIn>
        <LocationSection language={language} />
      </FadeIn>

      <FadeIn>
        <ReviewsSection
          badge={reviewsBadge}
          title={reviewsTitle}
          description={reviewsDescription}
          reviews={mappedReviews}
        />
      </FadeIn>

      <FadeIn>
        <BookingSection language={language} />
      </FadeIn>

      <FadeIn>
        <InstagramSection
          imageUrls={instagramImageUrls}
          instagramUrl={contacts?.instagram}
          language={language}
        />
      </FadeIn>

      <FadeIn>
        <PartnersSection language={language} />
      </FadeIn>

      <FadeIn>
        <ContactsSection
          badge={contactsBadge}
          title={contactsTitle}
          description={contactsDescription}
          whatsappLabel={fallback.contactsWhatsapp}
          telegramLabel={fallback.contactsTelegram}
          phoneLabel={fallback.contactsPhone}
          emailLabel={fallback.contactsEmail}
          addressLabel={fallback.contactsAddress}
          hoursLabel={fallback.contactsHours}
          whatsappButton={fallback.contactsSectionButtonWhatsapp}
          telegramButton={fallback.contactsSectionButtonTelegram}
          whatsappLink={whatsappLink}
          telegramLink={telegramLink}
          whatsappValue={contacts?.whatsapp}
          phoneValue={contacts?.phone}
          telegramValue={contacts?.telegram}
          emailValue={contacts?.email}
          addressValue={
            contacts ? getLocalizedValue(contacts.address, language) : undefined
          }
          workingHoursValue={
            contacts ? getLocalizedValue(contacts.workingHours, language) : undefined
          }
        />
      </FadeIn>

      <FadeIn>
        <FinalCtaSection
          badge={fallback.finalCtaBadge}
          title={fallback.finalCtaTitle}
          description={fallback.finalCtaDescription}
          primaryButtonText={fallback.finalCtaPrimaryButton}
          secondaryButtonText={fallback.finalCtaSecondaryButton}
          whatsappLink={whatsappLink}
          telegramLink={telegramLink}
        />
      </FadeIn>

      <FadeIn>
        <FooterSection
          brandTitle="NESTRO"
          brandSubtitle="Living Group"
          description={fallback.footerDescription}
          phone={contacts?.phone}
          whatsapp={contacts?.whatsapp}
          telegram={contacts?.telegram}
          email={contacts?.email}
          address={
            contacts ? getLocalizedValue(contacts.address, language) : undefined
          }
          workingHours={
            contacts ? getLocalizedValue(contacts.workingHours, language) : undefined
          }
          navAdvantages={navAdvantages}
          navApartments={navApartments}
          navReviews={navReviews}
          navContacts={navContacts}
        />
      </FadeIn>

      <FloatingWhatsAppButton language={language} />
    </main>
  )
}

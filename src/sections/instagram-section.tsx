import Image from 'next/image'
import type {Language} from '@/utils/localization'

type InstagramSectionProps = {
  imageUrls: string[]
  instagramUrl?: string
  language: Language
}

function getInstagramContent(language: Language) {
  if (language === 'en') {
    return {
      badge: 'Instagram',
      title: 'More photos and atmosphere on Instagram',
      description:
        'See real apartment photos, views, complexes and updates on our Instagram.',
      button: 'Open Instagram',
    }
  }

  return {
    badge: 'Instagram',
    title: 'Больше фото и атмосферы в Instagram',
    description:
      'Смотрите реальные фото апартаментов, виды, комплексы и обновления в нашем Instagram.',
    button: 'Открыть Instagram',
  }
}

export function InstagramSection({
  imageUrls,
  instagramUrl,
  language,
}: InstagramSectionProps) {
  const content = getInstagramContent(language)
  const displayImages = imageUrls.slice(0, 6)
  const placeholders = Array.from({length: Math.max(0, 6 - displayImages.length)})
  const link = instagramUrl || '#'

  return (
    <section className="bg-[#F1ECE4]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
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

          <a
            href={link}
            target={instagramUrl ? '_blank' : undefined}
            rel={instagramUrl ? 'noreferrer' : undefined}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1F1F1F] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(31,31,31,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2F2A25] sm:w-auto"
          >
            {content.button}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {displayImages.map((imageUrl, index) => (
            <div
              key={`${imageUrl}-${index}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-[0_12px_32px_rgba(31,31,31,0.08)] sm:rounded-[26px]"
            >
              <Image
                src={imageUrl}
                alt="NESTRO Instagram"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/24 to-transparent opacity-70" />
            </div>
          ))}

          {placeholders.map((_, index) => (
            <div
              key={`instagram-placeholder-${index}`}
              className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-[#E2D7C8] bg-[linear-gradient(135deg,_#EFE7DC,_#FFFFFF_45%,_#D9C7AE)] shadow-[0_12px_32px_rgba(31,31,31,0.06)] sm:rounded-[26px]"
            >
              <div className="absolute inset-x-4 bottom-4 rounded-[18px] bg-white/55 p-3 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6B3F]">
                  NESTRO
                </p>
                <p className="mt-1 text-xs text-[#5C544B]">Batumi</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

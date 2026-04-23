import type {Language} from '@/utils/localization'

type FloatingWhatsAppButtonProps = {
  language: Language
  whatsappPhone?: string
  whatsappMessage?: string
}

const whatsappBaseUrl = 'https://wa.me/995558209739'

function getWhatsAppText(language: Language) {
  return language === 'ru'
    ? 'Здравствуйте! Хочу уточнить доступность апартаментов в Батуми.'
    : 'Hello! I would like to check apartment availability in Batumi.'
}

export function FloatingWhatsAppButton({
  language,
  whatsappPhone,
  whatsappMessage,
}: FloatingWhatsAppButtonProps) {
  const normalizedPhone = whatsappPhone?.replace(/[^\d]/g, '')
  const whatsappUrl = `${normalizedPhone ? `https://wa.me/${normalizedPhone}` : whatsappBaseUrl}?text=${encodeURIComponent(
    whatsappMessage || getWhatsAppText(language)
  )}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#1F3F32] text-white shadow-[0_14px_34px_rgba(31,63,50,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#18352A] sm:bottom-5 sm:right-5 sm:h-14 sm:w-auto sm:px-5 lg:bottom-6 lg:right-6 lg:h-12 lg:px-4 lg:shadow-[0_10px_24px_rgba(31,63,50,0.18)] xl:right-8"
    >
      <span className="text-lg font-semibold leading-none">W</span>
      <span className="ml-2 hidden text-sm font-semibold sm:inline lg:text-[13px]">
        WhatsApp
      </span>
    </a>
  )
}

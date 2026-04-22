import type {Language} from '@/utils/localization'

type FloatingWhatsAppButtonProps = {
  language: Language
}

const whatsappBaseUrl = 'https://wa.me/995558209739'

function getWhatsAppText(language: Language) {
  return language === 'ru'
    ? 'Здравствуйте! Хочу уточнить доступность апартаментов в Батуми.'
    : 'Hello! I would like to check apartment availability in Batumi.'
}

export function FloatingWhatsAppButton({
  language,
}: FloatingWhatsAppButtonProps) {
  const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(
    getWhatsAppText(language)
  )}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#1F3F32] text-white shadow-[0_18px_40px_rgba(31,63,50,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#18352A] sm:w-auto sm:px-5"
    >
      <span className="text-lg font-semibold leading-none">W</span>
      <span className="ml-2 hidden text-sm font-semibold sm:inline">
        WhatsApp
      </span>
    </a>
  )
}

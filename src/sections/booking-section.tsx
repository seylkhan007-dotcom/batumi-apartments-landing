'use client'

import {useState, type FormEvent} from 'react'
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
      formTitle: 'Send a stay request',
      formDescription:
        'Leave your contacts and preferred dates. We will check availability and get back to you shortly.',
      fields: {
        name: 'Name',
        phone: 'Phone / WhatsApp',
        checkinDate: 'Check-in date',
        checkoutDate: 'Check-out date',
        guestsCount: 'Number of guests',
        message: 'Message',
      },
      submitButton: 'Send request',
      sendingButton: 'Sending...',
      successMessage: 'Request sent. We will contact you soon.',
      errorMessage:
        'Could not send the request. Please contact us on WhatsApp.',
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
    formTitle: 'Оставить заявку на проживание',
    formDescription:
      'Оставьте контакты и желаемые даты. Мы проверим доступность и скоро свяжемся с вами.',
    fields: {
      name: 'Имя',
      phone: 'Телефон / WhatsApp',
      checkinDate: 'Дата заезда',
      checkoutDate: 'Дата выезда',
      guestsCount: 'Количество гостей',
      message: 'Комментарий',
    },
    submitButton: 'Отправить заявку',
    sendingButton: 'Отправляем...',
    successMessage: 'Заявка отправлена. Мы скоро свяжемся с вами.',
    errorMessage:
      'Не удалось отправить заявку. Попробуйте написать нам в WhatsApp.',
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

type GuestLeadFormState = {
  name: string
  phone: string
  checkinDate: string
  checkoutDate: string
  guestsCount: string
  message: string
}

const emptyGuestLeadForm: GuestLeadFormState = {
  name: '',
  phone: '',
  checkinDate: '',
  checkoutDate: '',
  guestsCount: '',
  message: '',
}

export function BookingSection({
  language,
  whatsappPhone,
  whatsappMessage,
}: BookingSectionProps) {
  const content = getBookingContent(language)
  const [form, setForm] = useState<GuestLeadFormState>(emptyGuestLeadForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const normalizedPhone = whatsappPhone?.replace(/[^\d]/g, '')
  const whatsappUrl = `${normalizedPhone ? `https://wa.me/${normalizedPhone}` : whatsappBaseUrl}?text=${encodeURIComponent(
    whatsappMessage || content.whatsappText
  )}`
  const inputClass =
    'mt-2 min-h-12 w-full rounded-2xl border border-[#E3D8C9] bg-white px-4 text-sm text-[#1F1F1F] outline-none transition duration-200 placeholder:text-[#A69A8D] focus:border-[#A88A5D] focus:ring-4 focus:ring-[#A88A5D]/10'
  const labelClass = 'text-sm font-medium text-[#3E3933]'

  function updateField(field: keyof GuestLeadFormState, value: string) {
    setForm((currentForm) => ({...currentForm, [field]: value}))
    if (status !== 'idle') {
      setStatus('idle')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.phone.trim()) {
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/leads/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          checkinDate: form.checkinDate,
          checkoutDate: form.checkoutDate,
          guestsCount: form.guestsCount ? Number(form.guestsCount) : undefined,
          message: form.message,
          source: 'website',
        }),
      })

      if (!response.ok) {
        throw new Error('Guest lead request failed')
      }

      setForm(emptyGuestLeadForm)
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="border-y border-[#E7DED2] bg-[#F6F3EF]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-12">
          <div className="lg:pt-4">
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

          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-[#D8C5A8] bg-white p-5 shadow-[0_24px_60px_rgba(31,31,31,0.11)] sm:p-7"
          >
            <div className="mb-5 border-b border-[#EFE7DC] pb-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[#A88A5D]">
                {content.badge}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[#1F1F1F] sm:text-2xl">
                {content.formTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5C544B]">
                {content.formDescription}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                {content.fields.name}
                <input
                  className={inputClass}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                />
              </label>

              <label className={labelClass}>
                {content.fields.phone}
                <input
                  className={inputClass}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                />
              </label>

              <label className={labelClass}>
                {content.fields.checkinDate}
                <input
                  className={inputClass}
                  type="date"
                  name="checkinDate"
                  value={form.checkinDate}
                  onChange={(event) =>
                    updateField('checkinDate', event.target.value)
                  }
                />
              </label>

              <label className={labelClass}>
                {content.fields.checkoutDate}
                <input
                  className={inputClass}
                  type="date"
                  name="checkoutDate"
                  value={form.checkoutDate}
                  onChange={(event) =>
                    updateField('checkoutDate', event.target.value)
                  }
                />
              </label>

              <label className={labelClass}>
                {content.fields.guestsCount}
                <input
                  className={inputClass}
                  type="number"
                  name="guestsCount"
                  min={1}
                  max={20}
                  value={form.guestsCount}
                  onChange={(event) =>
                    updateField('guestsCount', event.target.value)
                  }
                />
              </label>

              <label className={`${labelClass} sm:col-span-2`}>
                {content.fields.message}
                <textarea
                  className={`${inputClass} min-h-28 resize-none py-3 leading-6`}
                  name="message"
                  value={form.message}
                  onChange={(event) =>
                    updateField('message', event.target.value)
                  }
                />
              </label>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#A88A5D] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(168,138,93,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#8F7349] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                >
                  {isSubmitting ? content.sendingButton : content.submitButton}
                </button>

                <p
                  className={`text-sm leading-6 ${
                    status === 'success'
                      ? 'text-[#3F7A4D]'
                      : status === 'error'
                        ? 'text-[#A04436]'
                        : 'text-transparent'
                  }`}
                  aria-live="polite"
                >
                  {status === 'success'
                    ? content.successMessage
                    : status === 'error'
                      ? content.errorMessage
                      : ' '}
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
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
    </section>
  )
}

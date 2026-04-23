'use client'

import {useState, type FormEvent} from 'react'
import type {Language} from '@/utils/localization'

type PartnersSectionProps = {
  language: Language
  whatsappPhone?: string
  whatsappMessage?: string
}

type OwnerPropertyType = 'studio' | 'one-bedroom' | 'two-bedroom' | 'other'

type OwnerLeadFormState = {
  name: string
  phone: string
  propertyType: OwnerPropertyType
  complexName: string
  message: string
}

const whatsappBaseUrl = 'https://wa.me/995558209739'

const emptyOwnerLeadForm: OwnerLeadFormState = {
  name: '',
  phone: '',
  propertyType: 'studio',
  complexName: '',
  message: '',
}

function normalizePhoneNumber(value: string) {
  const trimmed = value.trim()
  const digits = trimmed.replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  return trimmed.startsWith('+') ? `+${digits}` : digits
}

function isValidPhoneNumber(value: string) {
  return /^\+?\d{7,20}$/.test(value)
}

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
      formTitle: 'Send an owner request',
      formDescription:
        'Leave your contact details and apartment info. We will review the request and get in touch shortly.',
      fields: {
        name: 'Name',
        phone: 'Phone / WhatsApp',
        propertyType: 'Property type',
        complexName: 'Complex',
        message: 'Message',
      },
      propertyTypes: {
        studio: 'Studio',
        'one-bedroom': '1-bedroom',
        'two-bedroom': '2-bedroom',
        other: 'Other',
      },
      submitButton: 'Send request',
      sendingButton: 'Sending...',
      successMessage: 'Request sent. We will contact you soon.',
      errorMessage:
        'Could not send the request. Please contact us on WhatsApp.',
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
    formTitle: 'Оставить заявку собственника',
    formDescription:
      'Оставьте контакты и информацию об объекте. Мы рассмотрим заявку и скоро свяжемся с вами.',
    fields: {
      name: 'Имя',
      phone: 'Телефон / WhatsApp',
      propertyType: 'Тип объекта',
      complexName: 'Комплекс',
      message: 'Комментарий',
    },
    propertyTypes: {
      studio: 'Студия',
      'one-bedroom': '1+1',
      'two-bedroom': '2+1',
      other: 'Другое',
    },
    submitButton: 'Отправить заявку',
    sendingButton: 'Отправляем...',
    successMessage: 'Заявка отправлена. Мы скоро свяжемся с вами.',
    errorMessage:
      'Не удалось отправить заявку. Попробуйте написать нам в WhatsApp.',
  }
}

export function PartnersSection({
  language,
  whatsappPhone,
  whatsappMessage,
}: PartnersSectionProps) {
  const content = getPartnersContent(language)
  const phonePlaceholder =
    language === 'en'
      ? 'For example: +123 456 789 000'
      : 'Например: +123 456 789 000'
  const phoneHelper =
    language === 'en'
      ? 'Enter your number in international format'
      : 'Введите номер в международном формате'
  const phoneRequiredError =
    language === 'en'
      ? 'Please enter your phone or WhatsApp number'
      : 'Укажите телефон или WhatsApp'
  const phoneInvalidError =
    language === 'en'
      ? 'Please check your phone number'
      : 'Проверьте номер телефона'
  const [form, setForm] = useState<OwnerLeadFormState>(emptyOwnerLeadForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState('')
  const normalizedPhone = whatsappPhone?.replace(/[^\d]/g, '')
  const whatsappUrl = `${normalizedPhone ? `https://wa.me/${normalizedPhone}` : whatsappBaseUrl}?text=${encodeURIComponent(
    whatsappMessage || content.whatsappText
  )}`
  const inputClass =
    'mt-2 min-h-11 w-full rounded-2xl border border-white/12 bg-white/10 px-4 text-sm text-white outline-none transition duration-200 placeholder:text-white/42 focus:border-[#D9C7AE] focus:bg-white/12 focus:ring-4 focus:ring-[#D9C7AE]/12'
  const labelClass = 'text-sm font-medium text-white/84'

  function updateField(field: keyof OwnerLeadFormState, value: string) {
    setForm((currentForm) => ({...currentForm, [field]: value}))

    if (status !== 'idle') {
      setStatus('idle')
    }

    if (field === 'phone' && phoneError) {
      setPhoneError('')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedPhoneValue = normalizePhoneNumber(form.phone)

    if (!normalizedPhoneValue) {
      setPhoneError(phoneRequiredError)
      return
    }

    if (!isValidPhoneNumber(normalizedPhoneValue)) {
      setPhoneError(phoneInvalidError)
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setPhoneError('')

    try {
      const response = await fetch('/api/leads/owner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          phone: normalizedPhoneValue,
          propertyType: form.propertyType,
          complexName: form.complexName,
          message: form.message,
        }),
      })

      if (!response.ok) {
        throw new Error('Owner lead request failed')
      }

      setForm(emptyOwnerLeadForm)
      setStatus('success')
      setPhoneError('')
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#F6F3EF]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
        <div className="overflow-hidden rounded-[28px] border border-[#2F2A25]/10 bg-[#26231F] shadow-[0_20px_50px_rgba(31,31,31,0.12)]">
          <div className="grid gap-7 p-6 text-white sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:p-9">
            <div className="lg:pt-2">
              <p className="text-xs uppercase tracking-[0.24em] text-[#D9C7AE] sm:text-sm sm:tracking-[0.3em]">
                {content.badge}
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold sm:text-3xl md:text-4xl">
                {content.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/74 sm:text-base sm:leading-8">
                {content.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
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
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white/92 px-6 py-3 text-sm font-semibold text-[#1F1F1F] transition duration-300 hover:-translate-y-0.5 hover:bg-[#EFE7DC] sm:w-auto"
              >
                {content.button}
              </a>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur-[2px] sm:p-6"
            >
              <div className="mb-5 border-b border-white/10 pb-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[#D9C7AE]">
                  {content.badge}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                  {content.formTitle}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/68">
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
                    className={`${inputClass} ${
                      phoneError
                        ? 'border-[#D88676] focus:border-[#D88676] focus:ring-[#D88676]/12'
                        : ''
                    }`}
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={phonePlaceholder}
                    aria-invalid={phoneError ? 'true' : 'false'}
                    aria-describedby="owner-phone-note owner-phone-error"
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                  />
                  <span
                    id="owner-phone-note"
                    className="mt-2 block text-xs font-normal leading-5 text-white/56"
                  >
                    {phoneHelper}
                  </span>
                  <span
                    id="owner-phone-error"
                    className={`mt-1 block text-xs font-normal leading-5 ${
                      phoneError ? 'text-[#F1B0A4]' : 'text-transparent'
                    }`}
                    aria-live="polite"
                  >
                    {phoneError || ' '}
                  </span>
                </label>

                <label className={labelClass}>
                  {content.fields.propertyType}
                  <select
                    className={`${inputClass} appearance-none pr-10`}
                    name="propertyType"
                    value={form.propertyType}
                    onChange={(event) =>
                      updateField(
                        'propertyType',
                        event.target.value as OwnerPropertyType
                      )
                    }
                  >
                    <option className="text-[#1F1F1F]" value="studio">
                      {content.propertyTypes.studio}
                    </option>
                    <option className="text-[#1F1F1F]" value="one-bedroom">
                      {content.propertyTypes['one-bedroom']}
                    </option>
                    <option className="text-[#1F1F1F]" value="two-bedroom">
                      {content.propertyTypes['two-bedroom']}
                    </option>
                    <option className="text-[#1F1F1F]" value="other">
                      {content.propertyTypes.other}
                    </option>
                  </select>
                </label>

                <label className={labelClass}>
                  {content.fields.complexName}
                  <input
                    className={inputClass}
                    type="text"
                    name="complexName"
                    value={form.complexName}
                    onChange={(event) =>
                      updateField('complexName', event.target.value)
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

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D9C7AE] px-6 py-3 text-sm font-semibold text-[#1F1F1F] shadow-[0_16px_34px_rgba(17,17,17,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E6D6C2] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                  >
                    {isSubmitting ? content.sendingButton : content.submitButton}
                  </button>

                  <p
                    className={`text-sm leading-6 ${
                      status === 'success'
                        ? 'text-[#B7E2BF]'
                        : status === 'error'
                          ? 'text-[#F1B0A4]'
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
        </div>
      </div>
    </section>
  )
}

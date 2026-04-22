import {NextResponse} from 'next/server'
import {getSanityWriteClient} from '@/lib/sanity-write'

type GuestLeadBody = {
  name?: unknown
  phone?: unknown
  message?: unknown
  apartmentId?: unknown
  checkinDate?: unknown
  checkoutDate?: unknown
  guestsCount?: unknown
  source?: unknown
}

const allowedSources = new Set(['website', 'whatsapp', 'booking', 'manual'])

function optionalString(value: unknown, maxLength: number) {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string') return undefined

  const trimmed = value.trim()
  if (!trimmed) return undefined

  return trimmed.slice(0, maxLength)
}

function validationError(message: string) {
  return NextResponse.json({success: false, error: message}, {status: 400})
}

export async function POST(request: Request) {
  let body: GuestLeadBody

  try {
    body = (await request.json()) as GuestLeadBody
  } catch {
    return validationError('Некорректный JSON в теле запроса.')
  }

  const phone = optionalString(body.phone, 80)
  if (!phone) {
    return validationError('Поле phone обязательно.')
  }

  const guestsCount =
    typeof body.guestsCount === 'number' ? body.guestsCount : undefined

  if (
    guestsCount !== undefined &&
    (!Number.isInteger(guestsCount) || guestsCount < 1 || guestsCount > 20)
  ) {
    return validationError('guestsCount должен быть целым числом от 1 до 20.')
  }

  const sourceValue = optionalString(body.source, 40)
  const source = sourceValue && allowedSources.has(sourceValue) ? sourceValue : 'website'
  const apartmentId = optionalString(body.apartmentId, 120)

  const document = {
    _type: 'guestLead',
    name: optionalString(body.name, 120),
    phone,
    message: optionalString(body.message, 2000),
    apartment: apartmentId ? {_type: 'reference', _ref: apartmentId} : undefined,
    checkinDate: optionalString(body.checkinDate, 40),
    checkoutDate: optionalString(body.checkoutDate, 40),
    guestsCount,
    source,
    status: 'new',
    createdAt: new Date().toISOString(),
  }

  try {
    const client = getSanityWriteClient()
    const created = await client.create(document)

    return NextResponse.json({success: true, id: created._id})
  } catch (error) {
    const message =
      error instanceof Error && error.message === 'SANITY_WRITE_TOKEN is not configured'
        ? 'SANITY_WRITE_TOKEN не настроен на сервере.'
        : 'Не удалось создать заявку гостя.'

    return NextResponse.json({success: false, error: message}, {status: 500})
  }
}

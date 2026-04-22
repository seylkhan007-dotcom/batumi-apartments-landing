import {NextResponse} from 'next/server'
import {getSanityWriteClient} from '@/lib/sanity-write'

type OwnerLeadBody = {
  name?: unknown
  phone?: unknown
  message?: unknown
  propertyType?: unknown
  complexName?: unknown
}

const allowedPropertyTypes = new Set(['studio', 'one-bedroom', 'two-bedroom', 'other'])

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
  let body: OwnerLeadBody

  try {
    body = (await request.json()) as OwnerLeadBody
  } catch {
    return validationError('Некорректный JSON в теле запроса.')
  }

  const phone = optionalString(body.phone, 80)
  if (!phone) {
    return validationError('Поле phone обязательно.')
  }

  const propertyType = optionalString(body.propertyType, 40)
  if (propertyType && !allowedPropertyTypes.has(propertyType)) {
    return validationError('Некорректный propertyType.')
  }

  const document = {
    _type: 'ownerLead',
    name: optionalString(body.name, 120),
    phone,
    message: optionalString(body.message, 2000),
    propertyType,
    complexName: optionalString(body.complexName, 200),
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
        : 'Не удалось создать заявку собственника.'

    return NextResponse.json({success: false, error: message}, {status: 500})
  }
}

import {createClient} from '@sanity/client'

export function getSanityWriteClient() {
  const token = process.env.SANITY_WRITE_TOKEN

  if (!token) {
    throw new Error('SANITY_WRITE_TOKEN is not configured')
  }

  return createClient({
    projectId: 'tsqh1ba0',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })
}

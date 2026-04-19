import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'tsqh1ba0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'sh3idnp7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
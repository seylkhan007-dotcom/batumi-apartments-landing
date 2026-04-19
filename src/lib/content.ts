import {client} from './sanity'
import {
  apartmentsQuery,
  advantagesQuery,
  reviewsQuery,
  contactsQuery,
  homepageQuery,
  seoQuery,
} from './queries'
import type {
  Apartment,
  Advantage,
  Review,
  Contact,
  HomepageSettings,
  SeoSettings,
} from '@/types/sanity'

export async function getApartments(): Promise<Apartment[]> {
  return client.fetch<Apartment[]>(apartmentsQuery)
}

export async function getAdvantages(): Promise<Advantage[]> {
  return client.fetch<Advantage[]>(advantagesQuery)
}

export async function getReviews(): Promise<Review[]> {
  return client.fetch<Review[]>(reviewsQuery)
}

export async function getContacts(): Promise<Contact | null> {
  return client.fetch<Contact | null>(contactsQuery)
}

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  return client.fetch<HomepageSettings | null>(homepageQuery)
}

export async function getSeoSettings(): Promise<SeoSettings | null> {
  return client.fetch<SeoSettings | null>(seoQuery)
}
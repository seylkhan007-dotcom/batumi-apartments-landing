import {client} from './sanity'
import {
  apartmentsQuery,
  advantagesQuery,
  reviewsQuery,
  contactsQuery,
  siteSettingsQuery,
  navigationQuery,
  footerSettingsQuery,
  homepageQuery,
  seoQuery,
} from './queries'
import type {
  Apartment,
  Advantage,
  Review,
  Contact,
  SiteSettings,
  Navigation,
  FooterSettings,
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

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(siteSettingsQuery)
}

export async function getNavigation(): Promise<Navigation | null> {
  return client.fetch<Navigation | null>(navigationQuery)
}

export async function getFooterSettings(): Promise<FooterSettings | null> {
  return client.fetch<FooterSettings | null>(footerSettingsQuery)
}

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  return client.fetch<HomepageSettings | null>(homepageQuery)
}

export async function getSeoSettings(): Promise<SeoSettings | null> {
  return client.fetch<SeoSettings | null>(seoQuery)
}

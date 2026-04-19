type ReviewItem = {
  _id: string
  guestName: string
  country?: string
  rating: number
  text: string
  stayTypeLabel: string
}

type ReviewsSectionProps = {
  badge: string
  title: string
  description: string
  reviews: ReviewItem[]
}

export function ReviewsSection({
  badge,
  title,
  description,
  reviews,
}: ReviewsSectionProps) {
  return (
    <section
      id="reviews"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20"
    >
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A88A5D]">
          {badge}
        </p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-8 text-[#5C544B]">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review._id}
            className="rounded-[28px] border border-[#E7DED2] bg-white p-6 shadow-sm"
          >
            <div className="mb-4 text-[#C6A97A]">{'★'.repeat(review.rating)}</div>

            <p className="text-sm leading-7 text-[#4F473E]">“{review.text}”</p>

            <div className="mt-6 border-t border-[#EEE5DA] pt-4">
              <p className="font-semibold">{review.guestName}</p>
              <p className="mt-1 text-sm text-[#6B6258]">
                {review.country ? `${review.country} · ` : ''}
                {review.stayTypeLabel}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
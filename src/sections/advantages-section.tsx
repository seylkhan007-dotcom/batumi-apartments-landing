type AdvantageItem = {
  _id: string
  title: string
  description: string
}

type AdvantagesSectionProps = {
  badge: string
  title: string
  description: string
  advantages: AdvantageItem[]
}

export function AdvantagesSection({
  badge,
  title,
  description,
  advantages,
}: AdvantagesSectionProps) {
  return (
    <section
      id="advantages"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20"
    >
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A88A5D]">
          {badge}
        </p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-8 text-[#5C544B]">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {advantages.map((advantage) => (
          <article
            key={advantage._id}
            className="rounded-[28px] border border-[#E7DED2] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(31,31,31,0.10)]"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F3EDE4] text-xl transition duration-300 group-hover:scale-105">
              ✦
            </div>

            <h3 className="text-xl font-semibold">{advantage.title}</h3>

            <p className="mt-3 text-sm leading-7 text-[#5C544B]">
              {advantage.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
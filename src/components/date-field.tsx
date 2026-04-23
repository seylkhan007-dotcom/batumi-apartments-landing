'use client'

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import type {Language} from '@/utils/localization'

type DateFieldProps = {
  label: string
  language: Language
  name: string
  value: string
  onChange: (value: string) => void
  minValue?: string
  className?: string
  labelClassName?: string
}

type CalendarDay = {
  iso: string
  dayNumber: number
  isCurrentMonth: boolean
}

const englishMonthFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
})

const russianMonthFormatter = new Intl.DateTimeFormat('ru-RU', {
  month: 'long',
  year: 'numeric',
})

const englishDateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const russianDateFormatter = new Intl.DateTimeFormat('ru-RU', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

function parseIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null

  const year = Number(match[1])
  const monthIndex = Number(match[2]) - 1
  const day = Number(match[3])

  const date = new Date(year, monthIndex, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== monthIndex ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getMonthName(date: Date, language: Language) {
  return language === 'en'
    ? englishMonthFormatter.format(date)
    : russianMonthFormatter.format(date)
}

function formatDisplayDate(date: Date, language: Language) {
  return language === 'en'
    ? englishDateFormatter.format(date)
    : russianDateFormatter.format(date)
}

function getWeekdayLabels(language: Language) {
  return language === 'en'
    ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    : ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
}

function getPlaceholder(language: Language) {
  return language === 'en' ? 'Select date' : 'Выберите дату'
}

function getNavLabels(language: Language) {
  return language === 'en'
    ? {
        previous: 'Previous month',
        next: 'Next month',
      }
    : {
        previous: 'Предыдущий месяц',
        next: 'Следующий месяц',
      }
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear()
  const monthIndex = monthDate.getMonth()
  const firstDay = new Date(year, monthIndex, 1)
  const offset = (firstDay.getDay() + 6) % 7
  const gridStart = new Date(year, monthIndex, 1 - offset)
  const days: CalendarDay[] = []

  for (let index = 0; index < 42; index += 1) {
    const currentDate = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index
    )

    days.push({
      iso: toIsoDate(currentDate),
      dayNumber: currentDate.getDate(),
      isCurrentMonth: currentDate.getMonth() === monthIndex,
    })
  }

  return days
}

export function DateField({
  label,
  language,
  name,
  value,
  onChange,
  minValue,
  className = '',
  labelClassName = '',
}: DateFieldProps) {
  const id = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const selectedDate = parseIsoDate(value)
  const initialMonth = selectedDate ?? parseIsoDate(minValue ?? '') ?? new Date()
  const [isOpen, setIsOpen] = useState(false)
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
  )
  const weekdayLabels = getWeekdayLabels(language)
  const navLabels = getNavLabels(language)
  const calendarDays = getCalendarDays(visibleMonth)

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  function openCalendar() {
    if (selectedDate) {
      setVisibleMonth(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      )
    }

    setIsOpen(true)
  }

  function changeMonth(direction: -1 | 1) {
    setVisibleMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + direction,
          1
        )
    )
  }

  function selectDay(iso: string) {
    onChange(iso)
    setIsOpen(false)
  }

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openCalendar()
    }
  }

  return (
    <div className={labelClassName}>
      <span className="block">{label}</span>
      <div ref={rootRef} className="relative">
        <input type="hidden" name={name} value={value} />
        <button
          id={id}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={`${id}-calendar`}
          onClick={() => (isOpen ? setIsOpen(false) : openCalendar())}
          onKeyDown={handleTriggerKeyDown}
          className={`${className} flex items-center justify-between gap-3 text-left ${
            value ? 'text-[#1F1F1F]' : 'text-[#A69A8D]'
          }`}
        >
          <span className="truncate">
            {selectedDate
              ? formatDisplayDate(selectedDate, language)
              : getPlaceholder(language)}
          </span>
          <span
            aria-hidden="true"
            className="text-base leading-none text-[#8A6B3F]"
          >
            {isOpen ? '−' : '+'}
          </span>
        </button>

        {isOpen ? (
          <div
            id={`${id}-calendar`}
            role="dialog"
            aria-modal="false"
            className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-30 rounded-[24px] border border-[#D8C5A8] bg-white p-4 shadow-[0_22px_46px_rgba(31,31,31,0.16)] sm:w-[20rem] sm:min-w-[20rem] sm:right-auto"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6DBCF] bg-[#FBF8F4] text-[#5C544B] transition duration-200 hover:bg-[#F2E9DE]"
                aria-label={navLabels.previous}
              >
                ‹
              </button>
              <p className="text-sm font-semibold capitalize text-[#1F1F1F]">
                {getMonthName(visibleMonth, language)}
              </p>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6DBCF] bg-[#FBF8F4] text-[#5C544B] transition duration-200 hover:bg-[#F2E9DE]"
                aria-label={navLabels.next}
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {weekdayLabels.map((weekday) => (
                <span
                  key={weekday}
                  className="pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8177]"
                >
                  {weekday}
                </span>
              ))}

              {calendarDays.map((day) => {
                const isDisabled = Boolean(minValue && day.iso < minValue)
                const isSelected = day.iso === value

                return (
                  <button
                    key={day.iso}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => selectDay(day.iso)}
                    className={`inline-flex h-10 items-center justify-center rounded-2xl text-sm transition duration-200 ${
                      isSelected
                        ? 'bg-[#A88A5D] font-semibold text-white shadow-[0_12px_24px_rgba(168,138,93,0.22)]'
                        : day.isCurrentMonth
                          ? 'text-[#2F2A25] hover:bg-[#F4EDE4]'
                          : 'text-[#B2A79A] hover:bg-[#F8F3ED]'
                    } ${
                      isDisabled
                        ? 'cursor-not-allowed text-[#D2C8BC] hover:bg-transparent'
                        : ''
                    }`}
                  >
                    {day.dayNumber}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

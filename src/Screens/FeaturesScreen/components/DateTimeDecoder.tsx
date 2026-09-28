import { useState } from 'react'

type DateTimeSummary = {
  label: string
  dateText: string
  timeText: string
  daysFromNow: string
  weeksFromNow: string
}

const DateTimeDecoder = () => {
  const [input, setInput] = useState('2026-08-03 15:30:00')
  const [summary, setSummary] = useState<DateTimeSummary | null>(null)

  const decodeDateTime = () => {
    const trimmed = input.trim()
    const isoMatch = trimmed.match(
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,6}))?(Z|[+-]\d{2}:?\d{2})?$/,
    )
    const simpleMatch = trimmed.match(
      /^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/,
    )

    const match = isoMatch ?? simpleMatch

    if (!match) {
      setSummary({
        label: 'Invalid input',
        dateText: '-',
        timeText: '-',
        daysFromNow: '-',
        weeksFromNow: '-',
      })
      return
    }

    const [, year, month, day, hour = '00', minute = '00', second = '00'] = match
    const parsed = new Date(trimmed)

    if (Number.isNaN(parsed.getTime()) && simpleMatch) {
      const fallbackDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second),
      )
      parsed.setTime(fallbackDate.getTime())
    }

    const now = new Date()
    const diffMs = parsed.getTime() - now.getTime()
    const diffDays = Math.round(diffMs / 86_400_000)
    const diffWeeks = (diffDays / 7).toFixed(1)

    const formatRelative = (value: number, unit: 'day' | 'week') => {
      if (value === 0) {
        return 'Today'
      }

      const absValue = Math.abs(value)
      const plural = absValue === 1 ? '' : 's'
      return value > 0
        ? `${absValue} ${unit}${plural} from now`
        : `${absValue} ${unit}${plural} ago`
    }

    setSummary({
      label: 'Parsed value',
      dateText: `${year}-${month}-${day}`,
      timeText: `${hour}:${minute}:${second}`,
      daysFromNow: formatRelative(diffDays, 'day'),
      weeksFromNow: formatRelative(Number(diffWeeks), 'week'),
    })
  }

  return (
    <div className="tool-card">
      <h2>Date / Time Decoder</h2>
      <p>
        Enter a date in YYYY-MM-DD, YYYY-MM-DD HH:mm:ss, or ISO 8601 format like
        2026-07-13T10:47:44.409890+00:00.
      </p>
      <input value={input} onChange={(event) => setInput(event.target.value)} />
      <button type="button" onClick={decodeDateTime}>
        Decode date
      </button>
      {summary && (
        <pre>
          {`Date: ${summary.dateText}\nTime: ${summary.timeText}\nDays: ${summary.daysFromNow}\nWeeks: ${summary.weeksFromNow}`}
        </pre>
      )}
    </div>
  )
}

export default DateTimeDecoder

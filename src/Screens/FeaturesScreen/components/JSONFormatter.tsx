import { useState } from 'react'

const JSONFormatter = () => {
  const [jsonInput, setJsonInput] = useState('{"name":"Sample","age":36}')
  const [jsonOutput, setJsonOutput] = useState('')
  const [rawInput, setRawInput] = useState('{name: "Ada", age: 36}')
  const [convertedOutput, setConvertedOutput] = useState('')

  const formatJson = () => {
    const normalizedInput = jsonInput.trim().replace(/\s+/g, ' ')

    try {
      const parsed = JSON.parse(normalizedInput)
      setJsonOutput(JSON.stringify(parsed, null, 2))
    } catch {
      setJsonOutput('Invalid JSON input')
    }
  }
  console.log('JSONFormatter rendered')
  const convertToJson = () => {
    const trimmed = rawInput.trim().replace(/\s+/g, ' ')

    if (!trimmed) {
      setConvertedOutput('')
      return
    }

    try {
      const parsed = JSON.parse(trimmed)
      setConvertedOutput(JSON.stringify(parsed, null, 2))
      return
    } catch {
      // continue with a lightweight fallback for object-like strings
    }

    const lines = trimmed
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)

    const objectEntries = lines.reduce<Record<string, string | number | boolean | null>>(
      (acc, line) => {
        const keyValueMatch = line.match(/^([A-Za-z0-9_.-]+)\s*[:=]\s*(.+)$/)
        if (!keyValueMatch) {
          return acc
        }

        const [, rawKey, rawValue] = keyValueMatch
        const normalizedValue = rawValue.trim()
        const quotedValue = normalizedValue.match(/^".*"$/) || normalizedValue.match(/^'.*'$/)
        const booleanValue = normalizedValue === 'true' || normalizedValue === 'false'
        const numericValue = /^-?\d+(\.\d+)?$/.test(normalizedValue)

        let parsedValue: string | number | boolean | null = normalizedValue
        if (quotedValue) {
          parsedValue = normalizedValue.slice(1, -1)
        } else if (booleanValue) {
          parsedValue = normalizedValue === 'true'
        } else if (numericValue) {
          parsedValue = Number(normalizedValue)
        } else if (normalizedValue === 'null') {
          parsedValue = null
        }

        acc[rawKey] = parsedValue
        return acc
      },
      {},
    )

    if (Object.keys(objectEntries).length > 0) {
      setConvertedOutput(JSON.stringify(objectEntries, null, 2))
      return
    }

    const normalized = trimmed
      .replace(/'/g, '"')
      .replace(/([{,]\s*)([A-Za-z0-9_$]+)\s*:/g, '$1"$2":')

    try {
      const parsed = JSON.parse(normalized)
      setConvertedOutput(JSON.stringify(parsed, null, 2))
    } catch {
      setConvertedOutput(JSON.stringify(trimmed, null, 2))
    }
  }

  return (
    <div className="tool-card">
      <h2>JSON Formatter</h2>
      <label>
        JSON input
        <textarea value={jsonInput} onChange={(event) => setJsonInput(event.target.value)} />
      </label>
      <button type="button" onClick={formatJson}>
        Format JSON
      </button>
      <pre>{jsonOutput}</pre>

      <h3>Convert raw text or object-like input</h3>
      <label>
        Raw value
        <textarea value={rawInput} onChange={(event) => setRawInput(event.target.value)} />
      </label>
      <button type="button" onClick={convertToJson}>
        Convert to JSON
      </button>
      <pre>{convertedOutput}</pre>
    </div>
  )
}

export default JSONFormatter

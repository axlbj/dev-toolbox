import { useState } from 'react'

const RegexTester = () => {
  const [pattern, setPattern] = useState('\\d+')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('Hello 123 world')
  const [matches, setMatches] = useState<string[]>([])

  const runRegex = () => {
    try {
      const regex = new RegExp(pattern, flags)
      const result = Array.from(text.matchAll(regex), (match) => match[0])
      setMatches(result)
    } catch {
      setMatches([])
    }
  }

  return (
    <div className="tool-card">
      <h2>Regex Tester</h2>
      <label>
        Pattern
        <input value={pattern} onChange={(event) => setPattern(event.target.value)} />
      </label>
      <label>
        Flags
        <input value={flags} onChange={(event) => setFlags(event.target.value)} />
      </label>
      <label>
        Text
        <textarea value={text} onChange={(event) => setText(event.target.value)} />
      </label>
      <button type="button" onClick={runRegex}>
        Test Regex
      </button>
      <pre>{matches.length ? matches.join('\n') : 'No matches'}</pre>
    </div>
  )
}

export default RegexTester

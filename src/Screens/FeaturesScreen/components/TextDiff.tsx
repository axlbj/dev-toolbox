import { useState } from 'react'

const TextDiff = () => {
  const [leftText, setLeftText] = useState('apple\nbanana\ncherry')
  const [rightText, setRightText] = useState('apple\norange\ncherry')
  const [diffOutput, setDiffOutput] = useState('')

  const compareText = () => {
    const leftLines = leftText.split('\n')
    const rightLines = rightText.split('\n')
    const lines: string[] = []

    const maxLength = Math.max(leftLines.length, rightLines.length)
    for (let index = 0; index < maxLength; index += 1) {
      const leftLine = leftLines[index] ?? ''
      const rightLine = rightLines[index] ?? ''
      if (leftLine === rightLine) {
        lines.push(`  ${leftLine}`)
      } else {
        lines.push(`- ${leftLine}`)
        lines.push(`+ ${rightLine}`)
      }
    }

    setDiffOutput(lines.join('\n'))
  }

  return (
    <div className="tool-card">
      <h2>Text Diff</h2>
      <div className="split-grid">
        <label>
          Left text
          <textarea value={leftText} onChange={(event) => setLeftText(event.target.value)} />
        </label>
        <label>
          Right text
          <textarea value={rightText} onChange={(event) => setRightText(event.target.value)} />
        </label>
      </div>
      <button type="button" onClick={compareText}>
        Compare text
      </button>
      <pre>{diffOutput || 'No differences yet'}</pre>
    </div>
  )
}

export default TextDiff

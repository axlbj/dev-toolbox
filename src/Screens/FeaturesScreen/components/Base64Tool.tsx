import { useState } from 'react'

const Base64Tool = () => {
  const [input, setInput] = useState('Hello Dev Toolbox')
  const [output, setOutput] = useState('')

  const encodeValue = () => {
    setOutput(btoa(unescape(encodeURIComponent(input))))
  }

  const decodeValue = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))))
    } catch {
      setOutput('Invalid base64 input')
    }
  }

  return (
    <div className="tool-card">
      <h2>Base64 Encode / Decode</h2>
      <textarea value={input} onChange={(event) => setInput(event.target.value)} />
      <div className="button-row">
        <button type="button" onClick={encodeValue}>
          Encode
        </button>
        <button type="button" onClick={decodeValue}>
          Decode
        </button>
      </div>
      <pre>{output}</pre>
    </div>
  )
}

export default Base64Tool

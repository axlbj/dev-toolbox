import { useState } from 'react'

const UrlEncoderDecoder = () => {
  const [input, setInput] = useState('https://example.com?q=hello world')
  const [output, setOutput] = useState('')

  const encodeValue = () => {
    setOutput(encodeURIComponent(input))
  }

  const decodeValue = () => {
    try {
      setOutput(decodeURIComponent(input))
    } catch {
      setOutput('Invalid URL-encoded input')
    }
  }

  return (
    <div className="tool-card">
      <h2>URL Encoder / Decoder</h2>
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

export default UrlEncoderDecoder

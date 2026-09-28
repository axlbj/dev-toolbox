import { useState } from 'react'

const JwtDecoder = () => {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Rflpq2gHf5VEb1fH5w8pHj8g6vZs0fKz8M2n4iQ7l9Y',
  )
  const [decodedPayload, setDecodedPayload] = useState('')

  const decodeValue = () => {
    try {
      const [header, payload] = token.split('.')
      const decodeSegment = (segment: string) => {
        const normalized = segment.replace(/-/g, '+').replace(/_/g, '/')
        const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
        const binary = atob(padded)
        return decodeURIComponent(
          binary
            .split('')
            .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
            .join(''),
        )
      }

      const decoded = `Header: ${decodeSegment(header)}\nPayload: ${decodeSegment(payload)}`
      setDecodedPayload(decoded)
    } catch {
      setDecodedPayload('Invalid JWT token')
    }
  }

  return (
    <div className="tool-card">
      <h2>JWT Decoder</h2>
      <textarea value={token} onChange={(event) => setToken(event.target.value)} />
      <button type="button" onClick={decodeValue}>
        Decode token
      </button>
      <pre>{decodedPayload}</pre>
    </div>
  )
}

export default JwtDecoder

export type FeatureKey =
  | 'json-formatter'
  | 'base64'
  | 'regex-tester'
  | 'datetime-decoder'
  | 'jwt-decoder'
  | 'url-encoder-decoder'
  | 'text-diff'

export const featureOptions = [
  { id: 'json-formatter' as const, label: 'JSON Formatter' },
  { id: 'base64' as const, label: 'Base64 Encode / Decode' },
  { id: 'regex-tester' as const, label: 'Regex Tester' },
  { id: 'datetime-decoder' as const, label: 'Date / Time Decoder' },
  { id: 'jwt-decoder' as const, label: 'JWT Decoder' },
  { id: 'url-encoder-decoder' as const, label: 'URL Encoder / Decoder' },
  { id: 'text-diff' as const, label: 'Text Diff' },
]

export const buildFeaturePath = (feature: FeatureKey) => {
  const params = new URLSearchParams({ feature })
  return `/features?${params.toString()}`
}

export const navigateToFeature = (feature: FeatureKey) => {
  window.history.pushState({}, '', buildFeaturePath(feature))
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export const navigateToHome = () => {
  window.history.pushState({}, '', '/')
  window.dispatchEvent(new PopStateEvent('popstate'))
}

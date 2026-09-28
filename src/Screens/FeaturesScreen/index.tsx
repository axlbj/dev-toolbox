import { useMemo } from 'react'
import { featureOptions, type FeatureKey } from '../../navigation'
import JSONFormatter from './components/JSONFormatter'
import Base64Tool from './components/Base64Tool'
import RegexTester from './components/RegexTester'
import DateTimeDecoder from './components/DateTimeDecoder'
import JwtDecoder from './components/JwtDecoder'
import UrlEncoderDecoder from './components/UrlEncoderDecoder'
import TextDiff from './components/TextDiff'

type FeatureScreenProps = {
  feature: FeatureKey | null
}

const FeatureScreen = ({ feature }: FeatureScreenProps) => {
  const selectedFeature = useMemo(() => feature ?? 'json-formatter', [feature])

  return (
    <section className="tool-screen">
      <header className="screen-header">
        <div>
          <p className="eyebrow">Feature Workspace</p>
          <h1>{featureOptions.find((item) => item.id === selectedFeature)?.label ?? 'Feature'}</h1>
        </div>
        <a className="back-link" href="/">
          Back home
        </a>
      </header>

      <div className="tool-card">
        <h2>Open feature</h2>
        <div className="pill-row">
          {featureOptions.map((item) => (
            <a
              key={item.id}
              className={`pill ${selectedFeature === item.id ? 'active' : ''}`}
              href={`/features?feature=${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {selectedFeature === 'json-formatter' && <JSONFormatter />}
      {selectedFeature === 'base64' && <Base64Tool />}
      {selectedFeature === 'regex-tester' && <RegexTester />}
      {selectedFeature === 'datetime-decoder' && <DateTimeDecoder />}
      {selectedFeature === 'jwt-decoder' && <JwtDecoder />}
      {selectedFeature === 'url-encoder-decoder' && <UrlEncoderDecoder />}
      {selectedFeature === 'text-diff' && <TextDiff />}
    </section>
  )
}

export default FeatureScreen

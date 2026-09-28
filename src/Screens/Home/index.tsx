import { useMemo } from 'react'
import {
  buildFeaturePath,
  featureOptions,
  navigateToFeature,
  type FeatureKey,
} from '../../navigation'

type HomeProps = {
  currentFeature: FeatureKey | null
}

const Home = ({ currentFeature }: HomeProps) => {
  const activeFeature = useMemo(() => currentFeature ?? 'json-formatter', [currentFeature])

  return (
    <section className="home-screen">
      <header className="top-nav">
        <div className="brand">
          <div className="brand-mark">D</div>
          <div>
            <p className="brand-title">Dev Toolbox</p>
            <p className="brand-subtitle">Quick utilities for everyday coding</p>
          </div>
        </div>

        <div className="nav-actions">
          <details className="dropdown">
            <summary>Features</summary>
            <div className="dropdown-menu">
              {featureOptions.map((item) => (
                <a
                  key={item.id}
                  href={buildFeaturePath(item.id)}
                  onClick={(event) => {
                    event.preventDefault()
                    navigateToFeature(item.id)
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </header>

      <main className="hero-panel">
        <p className="eyebrow">Starter workspace</p>
        <h1>Build faster with a compact toolkit.</h1>
        <p className="hero-copy">
          Pick a utility from the navigation menu to jump into the feature screen and test the
          sample tools.
        </p>
        <div className="feature-preview">
          <h2>Current feature</h2>
          <p>
            {featureOptions.find((item) => item.id === activeFeature)?.label ?? 'JSON Formatter'}
          </p>
        </div>
      </main>
    </section>
  )
}

export default Home

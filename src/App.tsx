import { useEffect, useState } from 'react'
import Home from './Screens/Home'
import FeatureScreen from './Screens/FeaturesScreen'
import { featureOptions, type FeatureKey } from './navigation'
import './App.css'

type RouteState = {
  screen: 'home' | 'features'
  feature: FeatureKey | null
}

const getRouteState = (): RouteState => {
  const path = window.location.pathname
  const params = new URLSearchParams(window.location.search)
  const featureParam = params.get('feature')
  const isFeaturesRoute = path === '/features'
  const feature =
    featureParam && featureOptions.some((item) => item.id === featureParam)
      ? (featureParam as FeatureKey)
      : 'json-formatter'

  return isFeaturesRoute ? { screen: 'features', feature } : { screen: 'home', feature: null }
}

function App() {
  const [route, setRoute] = useState<RouteState>(getRouteState)

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(getRouteState())
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  if (route.screen === 'features') {
    return <FeatureScreen feature={route.feature} />
  }

  return <Home currentFeature={route.feature} />
}

export default App

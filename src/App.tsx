
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Controls from './components/Controls'
import Map, { Earthquake } from './components/Map'

type TimeRange = 'hour' | 'day' | 'week'
type Magnitude = 'all' | 'small' | 'medium' | 'large'

export default function App() {
  const [timeRange, setTimeRange] = useState<TimeRange>('day')
  const [magnitude, setMagnitude] = useState<Magnitude>('all')
  const [darkMode, setDarkMode] = useState(false)

  const [data, setData] = useState<Earthquake[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // const [country, setCountry] = useState('')
  const [countrySearch, setCountrySearch] = useState<string>("")

  // const [countries, setCountries] = useState<string[]>([])

  const endpoint = useMemo(() => {
    return `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timeRange}.geojson`
  }, [timeRange])

  const fetchData = useCallback(async () => {
  setLoading(true)
  setError(null)
  try {
    const res = await axios.get(endpoint, { timeout: 15000 })
    const features = res.data.features

    // Use reverse geocoding to get country names
    const seen: Record<string, string> = {}
    const enriched: Earthquake[] = await Promise.all(
      features.map(async (eq: any) => {
        const [lng, lat] = eq.geometry.coordinates
        const key = `${lat},${lng}`

        if (!seen[key]) {
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3`
            )
            const geoData = await geoRes.json()
            console.log("geoData:", geoData)
            seen[key] = geoData.address?.country || 'Unknown'
          } catch {
            seen[key] = 'Unknown'
          }
        }

        // return { ...eq, country: seen[key] }
        return {
          id: eq.id,
          properties: eq.properties,
          geometry: eq.geometry,
          country: seen[key],
        } as Earthquake
      })
    )

    // setCountries([...new Set(enriched.map((e) => e.country).filter(Boolean))])
    setData(enriched)
  } catch (e) {
    setError('Failed to fetch earthquake data. Please try again.')
  } finally {
    setLoading(false)
  }
}, [endpoint])


  useEffect(() => { fetchData() }, [fetchData])

  const filtered = useMemo(() => {
  return data.filter((eq) => {
    const mag = eq.properties.mag ?? 0
    if (magnitude === 'small') return mag < 3
    if (magnitude === 'medium') return mag >= 3 && mag < 5
    if (magnitude === 'large') return mag >= 5

if (countrySearch.trim() !== "") {
      return eq.country?.toLowerCase().includes(countrySearch.toLowerCase())
    }
    return true
  })
}, [data, magnitude, countrySearch])


  return (
    <div className={darkMode ? 'bg-zinc-950 text-white h-full flex flex-col' : 'bg-white text-zinc-900 h-full flex flex-col'}>
      <Header darkMode={darkMode} />
      <Controls
  timeRange={timeRange}
  setTimeRange={setTimeRange}
  magnitude={magnitude}
  setMagnitude={setMagnitude}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  onRefresh={fetchData}
  // country={country}
  // setCountry={setCountry}
  // countries={countries}
  countrySearch={countrySearch}
  setCountrySearch={setCountrySearch}
/>


      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-4 py-2 rounded bg-black/70 text-white">Loading earthquakes…</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-4 py-2 rounded bg-red-600 text-white">{error}</div>
          </div>
        )}
        {!loading && !error && <Map earthquakes={filtered} darkMode={darkMode} />}
      </div>

      <footer className="text-xs opacity-70 text-center py-2">
        Data: USGS • Built with React, Tailwind, Leaflet
      </footer>
    </div>
  )
}

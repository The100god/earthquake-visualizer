
import { MapContainer, TileLayer, Popup, CircleMarker, ScaleControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export interface Earthquake {
  id: string
  properties: {
    mag: number | null
    place: string
    time: number
  }
  geometry: {
    coordinates: [number, number, number] // [lon, lat, depth]
  }
  country?: string 
}

type Props = {
  earthquakes: Earthquake[]
  darkMode: boolean
  
}

export default function Map({ earthquakes, darkMode }: Props) {
  const tileUrl = darkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  const attribution = darkMode
    ? '&copy; <a href="https://carto.com/">CARTO</a> | &copy; OpenStreetMap contributors'
    : '&copy; OpenStreetMap contributors'

  return (
    <MapContainer center={[20, 0]} zoom={2} className="h-full w-full" scrollWheelZoom>
      <TileLayer url={tileUrl} attribution={attribution} />
      <ScaleControl position="bottomleft" />
      {earthquakes.map(eq => {
        const [lon, lat] = eq.geometry.coordinates
        const mag = eq.properties.mag ?? 0
        const radius = Math.max(4, mag * 3) // px radius scaled
        const color = mag >= 5 ? '#ef4444' : mag >= 3 ? '#f59e0b' : '#22c55e'

        return (
          <CircleMarker
            key={eq.id}
            center={[lat, lon]}
            radius={radius}
            pathOptions={{ color, fillOpacity: 0.5 }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="font-semibold">Magnitude: {mag.toFixed(1)}</div>
                <div className="text-sm">{eq.properties.place}</div>
                <div className="text-xs mt-1 opacity-80">{new Date(eq.properties.time).toLocaleString()}</div>
                <div className="text-xs opacity-70">Depth: {eq.geometry.coordinates[2]} km</div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

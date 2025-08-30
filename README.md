
# 🌍 Earthquake Visualizer (React + Tailwind + Leaflet)

An interactive map that displays recent earthquakes from the USGS API with filters for **time range** and **magnitude**, plus a **dark mode** map.

## Features
- Live data from USGS (`all_hour`, `all_day`, `all_week`)
- Magnitude filter: Small (<3.0), Medium (3.0–4.9), Large (>=5.0)
- Dark/Light map tiles
- Responsive layout, loading & error states

## Getting Started
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Tech
- React + Vite + TypeScript
- Tailwind CSS
- Leaflet + react-leaflet
- Axios

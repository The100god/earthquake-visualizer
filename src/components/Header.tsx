
type HeaderProps = { darkMode: boolean }

export default function Header({ darkMode }: HeaderProps) {
  return (
    <header className={`p-4 shadow-md ${darkMode ? 'bg-zinc-900 text-white' : 'bg-indigo-600 text-white'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span role="img" aria-label="earth">🌍</span> Earthquake Visualizer
        </h1>
        <p className="text-sm opacity-90">Recent seismic activity powered by USGS</p>
      </div>
    </header>
  )
}

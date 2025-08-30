
interface ControlsProps {
  timeRange: 'hour' | 'day' | 'week'
  setTimeRange: (v: 'hour' | 'day' | 'week') => void
  magnitude: 'all' | 'small' | 'medium' | 'large'
  setMagnitude: (v: 'all' | 'small' | 'medium' | 'large') => void
  darkMode: boolean
  setDarkMode: (v: boolean) => void
  onRefresh: () => void
  // country: string
  // setCountry: (v: string) => void
  // countries: string[]
  countrySearch: string
  setCountrySearch: (c: string) => void
}

export default function Controls({
  timeRange, setTimeRange,
  magnitude, setMagnitude,
  darkMode, setDarkMode,
  onRefresh,
  // country, setCountry, countries,
  countrySearch, setCountrySearch,
}: ControlsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Time Range</label>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={timeRange}
          onChange={e => setTimeRange(e.target.value as any)}
        >
          <option value="hour">Past Hour</option>
          <option value="day">Past Day</option>
          <option value="week">Past Week</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Magnitude</label>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={magnitude}
          onChange={e => setMagnitude(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="small">Small (&lt; 3.0)</option>
          <option value="medium">Medium (3.0 - 4.9)</option>
          <option value="large">Large (≥ 5.0)</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        {/* <label className="text-sm font-medium">Select Country</label> */}
        {/* <select
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  className="border p-2 rounded"
>
  <option value="">All Countries</option>
  {countries.map((c) => (
    <option key={c} value={c}>{c}</option>
  ))}
</select> */}
{/* <div> */}
  <label className="mr-2">Search Country:</label>
  <input
    type="text"
    placeholder="Type country name..."
    value={countrySearch}
    onChange={(e) => setCountrySearch(e.target.value)}
    className="border px-2 py-1 rounded w-48"
  />
{/* </div> */}
      </div>

      <button
        onClick={onRefresh}
        className="px-3 py-1.5 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
      >
        Refresh
      </button>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm">Dark Mode</span>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-zinc-800 relative transition">
            <div className={`absolute top-0.5 ${darkMode ? 'left-5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5`}></div>
          </div>
        </label>
      </div>
    </div>
  )
}

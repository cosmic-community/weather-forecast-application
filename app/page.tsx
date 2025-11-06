import { getCurrentWeather, getForecast } from '@/lib/weather'
import SearchForm from '@/components/SearchForm'
import CurrentWeather from '@/components/CurrentWeather'
import ForecastList from '@/components/ForecastList'

interface PageProps {
  searchParams: Promise<{ city?: string }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams
  const city = params.city || 'London'

  const [currentWeather, forecast] = await Promise.all([
    getCurrentWeather(city),
    getForecast(city),
  ])

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Weather Forecast
          </h1>
          <p className="text-white/90 text-lg">
            Current conditions and 5-day forecast
          </p>
        </header>

        <SearchForm initialCity={city} />

        {!currentWeather && (
          <div className="weather-card text-center py-12 max-w-2xl mx-auto">
            <p className="text-gray-600 text-lg">
              City not found. Please try another location.
            </p>
          </div>
        )}

        {currentWeather && (
          <>
            <CurrentWeather weather={currentWeather} />
            
            {forecast && forecast.length > 0 && (
              <ForecastList forecasts={forecast} />
            )}
          </>
        )}
      </div>
    </main>
  )
}
import { WeatherData } from '@/types'
import { formatTemperature, getWeatherIconUrl } from '@/lib/weather'
import WeatherDetails from '@/components/WeatherDetails'

interface CurrentWeatherProps {
  weather: WeatherData
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
  const mainWeather = weather.weather[0]
  
  if (!mainWeather) {
    return null
  }

  return (
    <div className="weather-card max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-1">
            {weather.name}
          </h2>
          <p className="text-gray-600 text-lg">
            {weather.sys.country}
          </p>
        </div>
        <img
          src={getWeatherIconUrl(mainWeather.icon)}
          alt={mainWeather.description}
          width={100}
          height={100}
          className="w-24 h-24"
        />
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-6xl font-bold text-gray-900">
          {formatTemperature(weather.main.temp)}
        </span>
        <span className="text-2xl text-gray-600">
          Feels like {formatTemperature(weather.main.feels_like)}
        </span>
      </div>

      <p className="text-xl text-gray-700 capitalize mb-6">
        {mainWeather.description}
      </p>

      <WeatherDetails weather={weather} />
    </div>
  )
}
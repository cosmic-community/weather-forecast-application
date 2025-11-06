import { DailyForecast } from '@/types'
import { formatDate, formatTemperature, getWeatherIconUrl } from '@/lib/weather'

interface ForecastCardProps {
  forecast: DailyForecast
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="forecast-card text-center">
      <p className="text-gray-700 font-semibold mb-3">
        {formatDate(forecast.date)}
      </p>
      
      <img
        src={getWeatherIconUrl(forecast.icon)}
        alt={forecast.description}
        width={80}
        height={80}
        className="w-20 h-20 mx-auto mb-2"
      />
      
      <p className="text-sm text-gray-600 capitalize mb-3">
        {forecast.description}
      </p>
      
      <div className="flex justify-center gap-3 mb-2">
        <div>
          <p className="text-xs text-gray-500">High</p>
          <p className="text-lg font-bold text-red-600">
            {formatTemperature(forecast.temp_max)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Low</p>
          <p className="text-lg font-bold text-blue-600">
            {formatTemperature(forecast.temp_min)}
          </p>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 text-xs text-gray-600 pt-2 border-t border-gray-200">
        <span>💧 {forecast.humidity}%</span>
        <span>💨 {Math.round(forecast.wind_speed)} m/s</span>
      </div>
    </div>
  )
}
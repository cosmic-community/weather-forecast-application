import { DailyForecast } from '@/types'
import ForecastCard from '@/components/ForecastCard'

interface ForecastListProps {
  forecasts: DailyForecast[]
}

export default function ForecastList({ forecasts }: ForecastListProps) {
  if (!forecasts || forecasts.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
        5-Day Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecasts.map((forecast) => (
          <ForecastCard key={forecast.date} forecast={forecast} />
        ))}
      </div>
    </div>
  )
}
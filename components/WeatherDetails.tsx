import { WeatherData } from '@/types'

interface WeatherDetailsProps {
  weather: WeatherData
}

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  const details = [
    {
      label: 'High / Low',
      value: `${Math.round(weather.main.temp_max)}° / ${Math.round(weather.main.temp_min)}°`,
      icon: '🌡️',
    },
    {
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
      icon: '💧',
    },
    {
      label: 'Wind Speed',
      value: `${Math.round(weather.wind.speed)} m/s`,
      icon: '💨',
    },
    {
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`,
      icon: '🔽',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {details.map((detail) => (
        <div
          key={detail.label}
          className="bg-blue-50 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{detail.icon}</span>
            <span className="text-gray-600 text-sm">{detail.label}</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">
            {detail.value}
          </p>
        </div>
      ))}
    </div>
  )
}
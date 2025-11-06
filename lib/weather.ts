import { WeatherData, ForecastData, DailyForecast } from '@/types'

const API_KEY = process.env.OPENWEATHER_API_KEY as string
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function getCurrentWeather(city: string): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 600 } } // Cache for 10 minutes
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch weather data')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching current weather:', error)
    return null
  }
}

export async function getForecast(city: string): Promise<DailyForecast[] | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 600 } } // Cache for 10 minutes
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch forecast data')
    }

    const data: ForecastData = await response.json()
    
    // Process forecast data to get daily summaries
    const dailyForecasts = processForecastData(data)
    return dailyForecasts
  } catch (error) {
    console.error('Error fetching forecast:', error)
    return null
  }
}

function processForecastData(data: ForecastData): DailyForecast[] {
  const dailyData: Record<string, DailyForecast> = {}

  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]
    
    if (!date) {
      return
    }

    if (!dailyData[date]) {
      dailyData[date] = {
        date: date,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        description: item.weather[0]?.description || '',
        icon: item.weather[0]?.icon || '',
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
      }
    } else {
      // Update min/max temperatures
      dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min)
      dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max)
      
      // Use midday weather for description/icon (around 12:00)
      if (item.dt_txt.includes('12:00:00')) {
        dailyData[date].description = item.weather[0]?.description || dailyData[date].description
        dailyData[date].icon = item.weather[0]?.icon || dailyData[date].icon
      }
    }
  })

  // Convert to array and take first 5 days
  return Object.values(dailyData).slice(0, 5)
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}
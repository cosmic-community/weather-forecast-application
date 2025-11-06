// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Weather Location object type
interface WeatherLocation extends CosmicObject {
  type: 'weather-locations';
  metadata: {
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
    is_favorite?: boolean;
  };
}

// App Settings object type
interface AppSettings extends CosmicObject {
  type: 'app-settings';
  metadata: {
    default_city?: string;
    temperature_unit?: 'celsius' | 'fahrenheit';
    api_key?: string;
  };
}

// OpenWeatherMap API response types
interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

interface DailyForecast {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
}

// Cosmic API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
function isWeatherLocation(obj: CosmicObject): obj is WeatherLocation {
  return obj.type === 'weather-locations';
}

function isAppSettings(obj: CosmicObject): obj is AppSettings {
  return obj.type === 'app-settings';
}

// Export all types
export type {
  CosmicObject,
  WeatherLocation,
  AppSettings,
  WeatherData,
  ForecastData,
  DailyForecast,
  CosmicResponse,
};

export {
  isWeatherLocation,
  isAppSettings,
};
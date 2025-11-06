# 🌤️ Weather Forecast Application

A modern, feature-rich weather application built with Next.js 16 and Cosmic CMS that provides real-time current conditions and a detailed 5-day forecast for any location worldwide.

![Weather App](https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200&h=300&fit=crop&auto=format)

## ✨ Features

- **Real-time Weather Data** - Current conditions updated live from OpenWeatherMap API
- **5-Day Forecast** - Detailed daily weather forecasts with high/low temperatures
- **Global Search** - Search for weather in any city around the world
- **Detailed Metrics** - Temperature, humidity, wind speed, pressure, and "feels like" temperature
- **Weather Icons** - Visual representation of weather conditions
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Error Handling** - Graceful error states for invalid locations or API issues
- **Cosmic CMS Integration** - Manage favorite locations and app settings through Cosmic

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=690c4014fb7423bbdde4ba95&clone_repository=690c4102fb7423bbdde4baa1)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Create a weather app that shows current conditions and 5-day forecast with location search

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic SDK** - Content management
- **OpenWeatherMap API** - Weather data provider
- **Bun** - Fast package manager and runtime

## 📋 Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account and bucket
- OpenWeatherMap API key (free tier available at https://openweathermap.org/api)

## 🛠️ Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
OPENWEATHER_API_KEY=your-openweathermap-api-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Cosmic SDK Examples

### Fetching Weather Locations

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all saved weather locations
const { objects: locations } = await cosmic.objects
  .find({ type: 'weather-locations' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a specific location by slug
const { object: location } = await cosmic.objects
  .findOne({
    type: 'weather-locations',
    slug: 'new-york'
  })
  .props(['id', 'title', 'metadata'])
```

### Managing Favorite Locations

```typescript
// Add a new favorite location
await cosmic.objects.insertOne({
  title: 'San Francisco',
  type: 'weather-locations',
  metadata: {
    city: 'San Francisco',
    country: 'US',
    latitude: 37.7749,
    longitude: -122.4194,
    is_favorite: true
  }
})

// Update location preferences
await cosmic.objects.updateOne(locationId, {
  metadata: {
    is_favorite: false
  }
})
```

## 🔧 Cosmic CMS Integration

This application uses Cosmic CMS to store and manage:

1. **Weather Locations** (`weather-locations` object type)
   - City name and country
   - Geographic coordinates
   - Favorite status
   - Custom display settings

2. **App Settings** (`app-settings` object type)
   - Default location
   - Temperature unit preference
   - API configuration
   - Display preferences

3. **User Preferences** (`user-preferences` object type)
   - Recently searched locations
   - Saved favorite cities
   - Custom weather alerts

All weather data is fetched in real-time from the OpenWeatherMap API, while Cosmic CMS manages the application configuration and user preferences.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
   - `OPENWEATHER_API_KEY`
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Add environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy

## 📝 Environment Variables

Required environment variables:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Cosmic read key for fetching content
- `COSMIC_WRITE_KEY` - Cosmic write key for updating content
- `OPENWEATHER_API_KEY` - Your OpenWeatherMap API key

## 🎨 Customization

- Modify temperature units in `lib/weather.ts`
- Customize weather icons in `components/WeatherIcon.tsx`
- Adjust styling in Tailwind classes
- Add more weather metrics in `components/WeatherDetails.tsx`
- Configure forecast display in `components/ForecastCard.tsx`

<!-- README_END -->
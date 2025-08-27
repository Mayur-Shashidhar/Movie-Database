# Futuristic Movie Database App

A visually stunning, interactive Movie Database app built with ReactJS, featuring:
- Live search and details using the TMDb API (The Movie Database)
- Automatic YouTube trailer embedding
- Futuristic neon/glassmorphic UI
- Pagination for browsing all results

## Features
- 🔍 **Search** for any movie (Hollywood, Bollywood, international)
- 🎬 **Movie Details**: View poster, plot, genre, cast, and more
- ▶️ **YouTube Trailer**: Auto-embedded for each movie
- 🏠 **Home Navigation**: Seamless routing with React Router
- 🌌 **Modern UI**: Neon, glassmorphic, and responsive design

## Getting Started

### 1. Clone the Repository
```sh
cd /path/to/your/projects
# (or use your existing folder structure)
```

### 2. Install Dependencies
```sh
cd movies/frontend
npm install
```

### 3. Get API Keys
- **TMDb API Key:** [Get one here](https://www.themoviedb.org/settings/api)
- **YouTube Data API Key:** [Get one here](https://console.cloud.google.com/apis/library/youtube.googleapis.com)

### 4. Configure Environment Variables
- Copy `.env.example` to `.env`:
  ```sh
  cp .env.example .env
  ```
- Open `.env` file and replace the placeholder values with your actual API keys:
  ```
  REACT_APP_TMDB_API_KEY=your_actual_tmdb_api_key
  REACT_APP_YOUTUBE_API_KEY=your_actual_youtube_api_key
  ```

### 5. Run the App
```sh
npm start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Customization
- **UI:** Edit `App.css` for colors, fonts, and layout.
- **APIs:** Switch between OMDb, TMDb, or others by updating API calls in the code.
- **Features:** Add favorites, user authentication, or more advanced filters as you wish!

## Credits
- [TMDb API](https://www.themoviedb.org/documentation/api)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- ReactJS, Axios, React Router

---

**Enjoy your futuristic Movie Database!**

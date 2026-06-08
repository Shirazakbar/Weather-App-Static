# Simple Weather App

Small vanilla HTML/CSS/JS app that shows current weather and local time for a city using Open-Meteo APIs.

## Files
- `index.html` — main page
- `css.css` — styles
- `js.js` — application logic (geocoding + weather requests)

## How to run
1. Open `index.html` in your browser (double-click the file).
2. Or run a simple static server from the project folder:

```bash
# from the project directory
npx http-server -c-1
```

Then open the provided `http://localhost:8080` URL.

## Usage
- Type a city name in the input and press **Get Weather** or Enter.
- The app uses Open-Meteo's Geocoding API and Forecast API (no API key required).

## Notes
- This is a minimal demo intended for learning and quick testing.
- If you plan to publish on GitHub Pages, this workspace is ready to push as-is.

## License
This project is unlicensed — add a license if you plan to publish it.

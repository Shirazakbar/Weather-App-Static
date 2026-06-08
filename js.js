const el = id => document.getElementById(id);

const searchBtn = el('searchBtn');
const cityInput = el('cityInput');
const message = el('message');
const result = el('result');

function setMessage(text, isError = false){
  message.textContent = text;
  message.style.color = isError ? '#b00020' : '';
}

function showResult(){ result.classList.remove('hidden'); }
function hideResult(){ result.classList.add('hidden'); }

const weatherCodes = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  71: 'Light snow',
  80: 'Rain showers',
  95: 'Thunderstorm'
};

async function fetchJSON(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function getWeatherForCity(city){
  setMessage('Looking up location...');
  hideResult();

  // Geocoding (Open-Meteo)
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const geo = await fetchJSON(geoUrl);
  if(!geo || !geo.results || geo.results.length === 0) {
    throw new Error('Location not found');
  }
  const place = geo.results[0];
  const lat = place.latitude;
  const lon = place.longitude;
  const displayName = `${place.name}${place.admin1 ? ', '+place.admin1 : ''}${place.country ? ', '+place.country : ''}`;

  setMessage('Fetching weather...');

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
  const w = await fetchJSON(weatherUrl);
  if(!w || !w.current_weather) throw new Error('Weather data unavailable');

  const cw = w.current_weather;

  el('location').textContent = displayName;
  el('time').textContent = cw.time || '';
  el('temperature').textContent = (cw.temperature != null) ? `${cw.temperature} °C` : '—';
  const desc = weatherCodes[cw.weathercode] || 'Weather';
  el('description').textContent = desc;
  el('details').textContent = `Wind: ${cw.windspeed ?? '—'} km/h`;

  setMessage('');
  showResult();
}

searchBtn.addEventListener('click', async ()=>{
  const city = cityInput.value.trim();
  if(!city){ setMessage('Please enter a city name', true); return; }
  try{
    searchBtn.disabled = true;
    await getWeatherForCity(city);
  }catch(err){
    setMessage(err.message || 'Error', true);
    hideResult();
  }finally{ searchBtn.disabled = false; }
});

cityInput.addEventListener('keydown', e=>{ if(e.key === 'Enter') searchBtn.click(); });

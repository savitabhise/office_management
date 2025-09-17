document.addEventListener('DOMContentLoaded', () => {
  const countryEl = document.getElementById('country');
  const stateEl = document.getElementById('state');
  const cityEl = document.getElementById('city');

  // 1) fetch countries
  fetch('https://countriesnow.space/api/v0.1/countries')
    .then(r => r.json())
    .then(data => {
      const countries = data.data; // array of {country: 'India', ...}
      countries.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.country;
        opt.textContent = c.country;
        countryEl.appendChild(opt);
      });
      // optionally pre-select if form has value
      if (countryEl.dataset.selected) countryEl.value = countryEl.dataset.selected;
      countryEl.dispatchEvent(new Event('change'));
    });

  countryEl.addEventListener('change', () => {
    const country = countryEl.value;
    stateEl.innerHTML = '<option>Loading...</option>';
    cityEl.innerHTML = '<option>--select state first--</option>';

    fetch('https://countriesnow.space/api/v0.1/countries/states', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country })
    })
    .then(r => r.json())
    .then(res => {
      stateEl.innerHTML = '';
      const states = res.data.states || [];
      states.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.name;
        opt.textContent = s.name;
        stateEl.appendChild(opt);
      });
      if (stateEl.dataset.selected) stateEl.value = stateEl.dataset.selected;
      stateEl.dispatchEvent(new Event('change'));
    });
  });

  stateEl.addEventListener('change', () => {
    const country = countryEl.value;
    const state = stateEl.value;
    cityEl.innerHTML = '<option>Loading...</option>';
    fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country, state })
    })
    .then(r => r.json())
    .then(res => {
      cityEl.innerHTML = '';
      const cities = res.data || [];
      cities.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        cityEl.appendChild(opt);
      });
      if (cityEl.dataset.selected) cityEl.value = cityEl.dataset.selected;
    });
  });
});

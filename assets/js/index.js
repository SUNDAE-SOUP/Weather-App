const sendCityBtn = document.getElementById('sendCityBtn');
const weatherContainer = document.getElementById('weather-info-grid');

async function getCityCoordinates(city) {
    try {
        weatherContainer.innerHTML = ""
        const geoLoc = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const locs = await geoLoc.json();
        const locDatas = locs.results;
        if (locDatas && locDatas.length > 0) {
            locDatas?.forEach(async (loc) => {

                const cityName = loc.name;
                const country = loc.country;
                const region = loc.admin1;
                const region2 = loc?.admin2 ? "(" + loc.admin2 + ")" : "";
                const weatherInfo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,visibility,wind_speed_10m,relative_humidity_2m,apparent_temperature,weather_code,pressure_msl,is_day`);
                const weatherOutput = await weatherInfo.json();

                const wc = iconIdentifier(weatherOutput.current.weather_code, weatherOutput.current.is_day);
                const cardInfo = `
                                <div class="weather-card animate__animated animate__fadeIn animate__faster">
                                    <div class="location-name">
                                        <h4>${cityName}</h4>
                                        <p class="subChar">${region}, ${country} ${region2}</p>
                                    </div>
                                    <div class="weather-items">
                                        <div>
                                            <div class="i-w">
                                                <div class="center">
                                                    <div class="icon">
                                                        ${wc}
                                                    </div>
                                                    <p class="dgr">${Math.round(weatherOutput.current.temperature_2m)}<span class="celsius">&deg;C</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="sub-icon tooltip">
                                                <svg height="20px" version="1.1" viewBox="0 0 32 32" width="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Windy" stroke="none" stroke-linecap="round" stroke-width="1"><g stroke="#979797" stroke-width="2" transform="translate(3.000000, 3.000000)"><g id="Group-2" transform="translate(2.000000, 0.000000)"><g id="Group" transform="translate(5.000000, 0.000000)"><path d="M5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,0 5,0 C2.23857625,0 0,2.23857625 0,5" id="Oval-6"/></g><path d="M0,10 L10,10" id="Path-9"/></g><g id="Group-3" transform="translate(3.000000, 17.000000)"><path d="M0,1 L14,1" id="Path-10"/><path d="M11,4 C11,5.65685425 12.3431458,7 14,7 C15.6568542,7 17,5.65685425 17,4 C17,2.34314575 15.6568542,1 14,1" id="Oval-7"/></g><g id="Group-4" transform="translate(0.000000, 4.000000)"><path d="M21,10 C23.7614237,10 26,7.76142375 26,5 C26,2.23857625 23.7614237,0 21,0 C20.7036941,0 20.4134082,0.0257742635 20.1312618,0.075203111" id="Oval-8"/><path d="M0,10 L21,10" id="Path-11"/></g></g></g></svg>
                                                <small class="subChar">${Math.round(weatherOutput.current.wind_speed_10m)} km/h</small>
                                                <span class="tooltiptext">Wind Speed</span>
                                            </div>
                                            <div class="sub-icon tooltip">
                                                <svg style="enable-background:new 0 0 64 64;" version="1.1" viewBox="0 0 64 64" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="#979797" stroke-width="2"><path d="M49.7,35.9C47.3,21.2,29.5,4,28.7,3.3c-0.4-0.4-1-0.4-1.4,0C26.4,4.1,6,23.7,6,39c0,12.1,9.9,22,22,22    c3.4,0,6.7-0.8,9.7-2.3c2.1,1.4,4.6,2.3,7.3,2.3c7.2,0,13-5.8,13-13C58,42.5,54.6,37.8,49.7,35.9z M28,59C17,59,8,50,8,39    C8,26.1,24.4,9,28,5.4C31.3,8.7,45,23,47.6,35.3C46.7,35.1,45.9,35,45,35c-7.2,0-13,5.8-13,13c0,3.7,1.5,7,4,9.3    C33.5,58.4,30.8,59,28,59z M45,59c-6.1,0-11-4.9-11-11s4.9-11,11-11s11,4.9,11,11S51.1,59,45,59z"/><path d="M28,54c-8.3,0-15-6.7-15-15c0-0.6-0.4-1-1-1s-1,0.4-1,1c0,9.4,7.6,17,17,17c0.6,0,1-0.4,1-1S28.6,54,28,54z"/><path d="M48.4,40.1c-0.5-0.2-1.1,0-1.3,0.5l-6,14c-0.2,0.5,0,1.1,0.5,1.3C41.7,56,41.9,56,42,56c0.4,0,0.8-0.2,0.9-0.6l6-14    C49.1,40.9,48.9,40.3,48.4,40.1z"/><path d="M44,44c0-1.7-1.3-3-3-3s-3,1.3-3,3s1.3,3,3,3S44,45.7,44,44z M40,44c0-0.6,0.4-1,1-1s1,0.4,1,1s-0.4,1-1,1S40,44.6,40,44z    "/><path d="M49,49c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S50.7,49,49,49z M49,53c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S49.6,53,49,53z"/></g></svg>
                                                <small class="subChar">${weatherOutput.current.relative_humidity_2m}%</small>
                                                <span class="tooltiptext">Humidity</span>
                                            </div>
                                            <div class="sub-icon tooltip">
                                                <svg id="Layer_1" style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <style type="text/css">
                                                        .st0{fill:none;stroke:#979797;stroke-width:1.6724;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                                                        .st1{fill:none;stroke:#979797;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                                                        .st2{fill:none;stroke:#979797;stroke-width:1.5;stroke-linejoin:round;stroke-miterlimit:10;}
                                                    </style><g><path class="st1" d="M12,18.5c-3.6,0-6.5-2.9-6.5-6.5c0-3.6,2.9-6.5,6.5-6.5c3.6,0,6.5,2.9,6.5,6.5C18.5,15.6,15.6,18.5,12,18.5z"/><path class="st1" d="M12,14.2c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C14.2,13.2,13.2,14.2,12,14.2z"/><g><path class="st1" d="M22.9,13c-6.2,7.3-15.5,7.3-21.7,0c-0.5-0.6-0.5-1.5,0-2.1c6.2-7.3,15.5-7.3,21.7,0    C23.4,11.5,23.4,12.4,22.9,13z"/></g></g></svg>
                                                <small class="subChar">${Math.round(weatherOutput.current.visibility / 1000)} km</small>
                                                <span class="tooltiptext">Visibility</span>
                                            </div>
                                            <div class="sub-icon tooltip">
                                                <svg height="20px" version="1.1" viewBox="0 0 32 32" width="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Thermometer-Hot" stroke="none" stroke-width="1"><g id="Group" stroke="#979797" stroke-width="2" transform="translate(7.000000, 2.000000)"><path d="M3,16.8026932 L3,3 C3,1.34314575 4.34314575,3.04359188e-16 6,0 C7.65685425,-3.04359188e-16 9,1.34314575 9,3 L9,16.8026932 C10.7934041,17.8401214 12,19.7791529 12,22 C12,25.3137085 9.3137085,28 6,28 C2.6862915,28 0,25.3137085 0,22 C0,19.7791529 1.20659589,17.8401214 3,16.8026932 Z" id="Combined-Shape"/><path d="M13,5 L18,5" id="Path-19" stroke-linecap="round"/><path d="M13,9 L18,9" id="Path-20" stroke-linecap="round"/><path d="M13,13 L18,13" id="Path-21" stroke-linecap="round"/></g><g fill="#CCCCCC" id="Group-2" transform="translate(10.000000, 12.000000)"><circle cx="3" cy="12" id="Oval" r="3"/><rect height="11" id="Rectangle-2" rx="1" width="2" x="2" y="0"/></g></g></svg>
                                                <small class="subChar">${Math.round(weatherOutput.current.apparent_temperature)}&deg;C</small>
                                                <span class="tooltiptext">Feels Like</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tooltip">
                                        <small class="subChar">Pressure: ${Math.round(weatherOutput.current.pressure_msl)} hPa</small>
                                        <span class="tooltiptext">Air Pressure</span>
                                    </div>
                                </div>
                            `;
                weatherContainer.insertAdjacentHTML("beforeend", cardInfo);

            });
        } else {
            const noData = document.createElement('h3');
            noData.classList.add('no-data-found');
            noData.innerText = "No Data Found. Please Try Again.";
            weatherContainer.appendChild(noData);
        }
    } catch (error) {
        alert("Network Error: ", error.message);
        console.error("Something went wrong: ", error);
    }
}

const iconIdentifier = (wsm_code, is_day) => {
    // console.log("wsm_code: ", wsm_code, "is_day: ", is_day);

    const rainCodes = [51, 53, 55, 61, 63, 65, 80, 81, 82];
    const thunderCodes = [95, 96, 99];
    const cloudyCodes = [1, 2, 3];
    let icons = '';

    //cloudy, rain
    if (cloudyCodes.includes(wsm_code) && rainCodes.includes(wsm_code)) {
        if (!is_day) {
            icons = `<img class="icon" src="/images/night_little_rain.png" alt="night_little_rain">`;
        } else {
            icons = `<img class="icon" src="/images/day_little_rain.png" alt="day_little_rain">`;
        }
    }

    //strong rain
    if ([63, 65, 80, 81, 82].includes(wsm_code)) {
        if (!is_day) {
            icons = `<img class="icon" src="/images/night_strong_rain.png" alt="night_strong_rain">`;
        } else {
            icons = `<img class="icon" src="/images/day_strong_rain.png" alt="day_strong_rain">`;
        }
    }

    //strong rain with thunder
    if (thunderCodes.includes(wsm_code)) {
        if (!is_day) {
            icons = `<img class="icon" src="/images/night_rain_thunder.png" alt="night_rain_thunder">`;
        } else {
            icons = `<img class="icon" src="/images/day_rain_thunder.png" alt="day_rain_thunder">`;
        }
    }
    //night/day and cloudy
    if ([0, 1, 2, 3].includes(wsm_code)) {
        if (!is_day) {
            icons = `<img class="icon" src="/images/night.png" alt="night">`;
        } else {
            icons = `<img class="icon" src="/images/day.png" alt="day">`;
        }
    }
    //cloudy only
    // if (wsm_code == 3) {
    //     icons = `<svg data-name="Layer 1" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{fill:url(#linear-gradient-2);}</style><linearGradient gradientUnits="userSpaceOnUse" id="linear-gradient" x1="45.72" x2="24.63" y1="55.39" y2="28.08"><stop offset="0" stop-color="#f2f2f2"/><stop offset="1" stop-color="#cfcfcf"/></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="linear-gradient-2" x1="14.82" x2="26.43" y1="33.86" y2="51.51"><stop offset="0.02" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><title/><path class="cls-1" d="M41.3,18.9a17.49,17.49,0,0,0-15.47,9.32,13.75,13.75,0,1,0-6.92,25.62l22.39.06a17.5,17.5,0,0,0,0-35Z"/><circle class="cls-2" cx="18.92" cy="40.09" r="13.75" transform="translate(-10.09 6.57) rotate(-15.61)"/></svg>`;
    // }

    return icons;
}



sendCityBtn.addEventListener("click", () => {
    const inputData = document.getElementById("cityVal").value.trim();

    const city = inputData.replace(/[^\w\s-]/gi, '');
    if (!city) {
        alert("Please Enter A City Name.");
        return;
    }

    getCityCoordinates(city);
});
//https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json
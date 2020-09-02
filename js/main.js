const menuIcon = document.querySelector('.hamburger-menu');

const navbar = document.querySelector(".navbar");

menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('change');
});






fetch('https://api.covid19api.com/summary')
  .then(response => response.json())
  .then(data => {


    let countries = data.Countries;


    let nameInput = document.getElementById('input-value');
    document.querySelector('form.find-country').addEventListener('submit', function (e) {
      e.preventDefault();
      let addExample = document.getElementById('example');
      addText = document.createElement('p');
      let CountryName = '';
      let OneCountryData = [];
      addText.add;
      addExample.innerHTML = CountryName
      addExample.appendChild(addText)
      for(i in countries){
        if (nameInput.value.toUpperCase() === countries[i].Country.toUpperCase()) {
          OneCountryData.push("Country : " + countries[i].Country + '</br>')
          OneCountryData.push('New confirmed cases : ' + countries[i].NewConfirmed + '</br>')
          OneCountryData.push('Total confirmed cases : ' + countries[i].TotalConfirmed + '</br>')
          OneCountryData.push('New Deaths : ' + countries[i].NewDeaths + '</br>')
          OneCountryData.push('Total Deaths : ' + countries[i].TotalDeaths + '</br>')
          OneCountryData.push("New recovered cases : " + countries[i].NewRecovered + '</br>')
          OneCountryData.push("Total recovered cases : " + countries[i].TotalRecovered + '</br>')
          addText.innerHTML = OneCountryData.join("");
        }
        

      }
    })






    /* Counter  */
    let totalConfirmedCasesWorld = data.Global.TotalConfirmed;
    let totalDeathsWorld = data.Global.TotalDeaths;
    let TotalRecoveredWorld = data.Global.TotalRecovered;

    let confirmed = document.getElementById('confirmed');
    confirmed.setAttribute('data-target', totalConfirmedCasesWorld)
    confirmed.textContent = 0


    let deaths = document.getElementById('deaths');
    deaths.setAttribute('data-target', totalDeathsWorld)
    deaths.textContent = 0

    let recovered = document.getElementById('recovered');
    recovered.setAttribute('data-target', TotalRecoveredWorld)
    recovered.textContent = 0

    const counters = document.querySelectorAll('.counter');
    const speed = 500;


    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;


        if (count < target) {
          counter.innerText = Math.round(count + inc);
          setTimeout(updateCount, 1);
        } else {
          count.innerText = target;
        }
      }
      updateCount();
    })


    /* Chart 1 */
    let dataConfirmed = [];
    let labelConfirmed = [];

    for (i in countries) {
      if (countries[i].TotalConfirmed > 5000) {
        dataConfirmed.push(countries[i].TotalConfirmed);
        labelConfirmed.push(countries[i].Country);
      };
    };



    let chart1 = document.getElementById('myChartCases').getContext('2d');
    let config1 = {
      type: 'bar',
      data: {
        labels: labelConfirmed,
        datasets: [{
          label: 'COVID-19 Total confirmed cases on the World',
          backgroundColor: 'yellow',
          borderColor: '',
          data: dataConfirmed
        }]
      }
    };

    let chartConfirmed = new Chart(chart1, config1);


    /* chart2 */



    let dataDeaths = [];
    let labelDeaths = [];

    for (i in countries) {
      if (countries[i].TotalDeaths > 100) {
        dataDeaths.push(countries[i].TotalDeaths);
        labelDeaths.push(countries[i].Country);
      };
    };




    let chart2 = document.getElementById('myChartDeaths').getContext('2d');
    let config2 = {
      type: 'bar',
      data: {
        labels: labelDeaths,
        datasets: [{
          label: 'COVID-19 Deaths on the World',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: dataDeaths
        }]
      }
    };
    let chartDeaths = new Chart(chart2, config2);



    /* CHART 1 */

    let dataRecovered = [];
    let labelRecovered = [];

    for (i in countries) {
      if (countries[i].TotalRecovered > 1000) {
        dataRecovered.push(countries[i].TotalRecovered);
        labelRecovered.push(countries[i].Country)
      }


    };

    let chart3 = document.getElementById('myChartRecovered').getContext('2d');
    let config3 = {
      type: 'bar',
      data: {
        labels: labelRecovered,
        datasets: [{
          label: 'COVID-19 Recovered cases on the World',
          backgroundColor: 'green',
          borderColor: 'green',
          data: dataRecovered
        }]
      }
    };

    let chartRecovered = new Chart(chart3, config3);
  })



/* Chart 4 */


fetch('https://api.covid19api.com/dayone/country/poland')
  .then(response => response.json())
  .then(data => {


    let datesPoland = [];
    let casesPoland = [];

    for (i in data) {
      datesPoland.push(data[i].Date);
      casesPoland.push(data[i].Confirmed);
    };

    let chart4 = document.getElementById('myChartCasesPoland').getContext('2d');
    let config4 = {
      type: 'line',
      data: {
        labels: datesPoland,
        datasets: [{
          label: 'COVID-19 Cases in Poland',
          backgroundColor: 'yellow',
          borderColor: '',
          data: casesPoland
        }]
      }
    };
    let chartPoland1 = new Chart(chart4, config4);

    let deathsPoland = [];

    for (i in data) {
      deathsPoland.push(data[i].Deaths);
    };

    let chart5 = document.getElementById('myChartDeathsPoland').getContext('2d');
    let config5 = {
      type: 'line',
      data: {
        labels: datesPoland,
        datasets: [{
          label: 'COVID-19 Deaths in Poland',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: '',
          data: deathsPoland
        }]
      }
    };
    let chartPoland2 = new Chart(chart5, config5);

    /* CHART 6 */
    let recoveredPoland = [];

    for (i in data) {
      recoveredPoland.push(data[i].Recovered);
    };

    let chart6 = document.getElementById('myChartRecoveredPoland').getContext('2d');
    let config6 = {
      type: 'line',
      data: {
        labels: datesPoland,
        datasets: [{
          label: 'COVID-19 Recovered in Poland',
          backgroundColor: 'greenyellow',
          borderColor: '',
          data: recoveredPoland
        }]
      }
    };
    let chartPoland3 = new Chart(chart6, config6);

    /* CHART 7 */

    let chart7 = document.getElementById('myChartPiePoland').getContext('2d');
    let config7 = {
      type: 'pie',
      data: {
        labels: ['Recovered cases in Poland', 'Deaths in Poland', 'Confirmed cases in Poland'],
        datasets: [{
          label: 'COVID-19 all statistics in Poland',
          backgroundColor: ['green', 'red', 'yellow'],
          borderColor: '',
          data: [recoveredPoland[recoveredPoland.length - 2], deathsPoland[deathsPoland.length - 2], casesPoland[casesPoland.length - 2]]
        }]
      }
    };
    let chartPoland4 = new Chart(chart7, config7);
  });

const myApp = {};

myApp.getCity = () => {
  $('form').on('submit', function(e){
    e.preventDefault();

    myApp.city = $('#city').val();
    myApp.province = $('#province').val();
    myApp.weatherAPICall();
  });
}

myApp.weatherAPICall = () => {
  $.ajax({
    url: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${myApp.city}%2C%20${province}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,

    method: 'GET',
    dataType: 'json'
  }).then(function(info){
      let forecast = info.query.results.channel.item.forecast
    myApp.makeChart(forecast);
  })
}

myApp.makeChart = (data) => {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [`${data[0].day}`, `${data[1].day}`, `${data[2].day}`, `${data[3].day}`, `${data[4].day}`, `${data[5].day}`, `${data[6].day}`, `${data[7].day}`, `${data[8].day}`, `${data[9].day}`],
      datasets: [{
        fill: false,
        label: 'Forecast High',
        data: [`${data[0].high}`, `${data[1].high}`, `${data[2].high}`, `${data[3].high}`, `${data[4].high}`, `${data[5].high}`, `${data[6].high}`, `${data[7].high}`, `${data[8].high}`, `${data[9].high}`],
        borderColor: [
          'rgba(255,0,0,1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  var myChart2 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [`${data[0].day}`, `${data[1].day}`, `${data[2].day}`, `${data[3].day}`, `${data[4].day}`, `${data[5].day}`, `${data[6].day}`, `${data[7].day}`, `${data[8].day}`, `${data[9].day}`],
      datasets: [{
        fill: false,
        label: 'Forecast Low',
        data: [`${data[0].low}`, `${data[1].low}`, `${data[2].low}`, `${data[3].low}`, `${data[4].low}`, `${data[5].low}`, `${data[6].low}`, `${data[7].low}`, `${data[8].low}`, `${data[9].low}`],
        backgroundColor: [
          'rgba(0, 0, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)'
        ],
        borderColor: [
          'rgba(0,0,255,1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  });
}

myApp.init = () => {
  myApp.getCity();
  myApp.makeChart();
}

$(function() {
  myApp.init();
})
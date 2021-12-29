const ctx = document.getElementById('myChart').getContext("2d");

let delayed;

// Gradient fill
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(55, 75, 100, 0.6)');
gradient.addColorStop(1, 'rgba(238, 130, 238, 1)');

const labels = [
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018'
];

const data = {
  labels, 
  datasets: [{
    data: [72, 125, 150, 168, 231, 211, 216, 217],
    label: "Unit sales of the Apple iPhone worldwide",
    fill: true,
    backgroundColor: gradient,
    borderColor: 'rgba(238, 130, 238, 1)',
    tension: 0.4,

  }]
}

const config = {
  type: 'line',
  data: data,
  options: {
    radius: 4,
    hitRadius: 30,
    hoverRadius: 6,
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;

        if(context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return "$" + value + "m";
          }
        }
      }
    }
  }
};

const myChart = new Chart(ctx, config);
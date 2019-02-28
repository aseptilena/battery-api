(function() {
    'use strict';
  
    var battery;
  
    function toTime(sec) {
      sec = parseInt(sec, 10);
  
      var hours = Math.floor(sec / 3600),
          minutes = Math.floor((sec - (hours * 3600)) / 60),
          seconds = sec - (hours * 3600) - (minutes * 60);
  
      if (hours < 10) { hours   = '0' + hours; }
      if (minutes < 10) { minutes = '0' + minutes; }
      if (seconds < 10) { seconds = '0' + seconds; }
  
      return hours + ':' + minutes;
    }
  
    function readBattery(b) {
      battery = b || battery;
  
      var percentage = parseFloat((battery.level * 100).toFixed(2)) + '%',
          fully,
          remaining;
  
      if (battery.charging && battery.chargingTime === Infinity) {
        fully = 'Calculating...';
      } else if (battery.chargingTime !== Infinity) {
        fully = toTime(battery.chargingTime);
      } else {
        fully = '---';
      }
  
      if (!battery.charging && battery.dischargingTime === Infinity) {
        remaining = 'Calculating...';
      } else if (battery.dischargingTime !== Infinity) {
        remaining = toTime(battery.dischargingTime);
      } else {
        remaining = '---';
      }
  
      document.styleSheets[0].insertRule('.battery:before{width:' + percentage + '}', 0);
      document.querySelector('.battery-percentage').innerHTML = percentage;
      document.querySelector('.battery-status').innerHTML = battery.charging ? 'Adapter' : 'Battery';
      document.querySelector('.battery-level').innerHTML = percentage;
      document.querySelector('.battery-fully').innerHTML = fully;
      document.querySelector('.battery-remaining').innerHTML = remaining;
  
    }
  
    if (navigator.battery) {
      readBattery(navigator.battery);
  
    } else if (navigator.getBattery) {
      navigator.getBattery().then(readBattery);
  
    } else {
      document.querySelector('.not-support').removeAttribute('hidden');
    }
  
    window.onload = function () {
      battery.addEventListener('chargingchange', function() {
        readBattery();
      });
  
      battery.addEventListener("levelchange", function() {
        readBattery();
      });
    };
  }());
// var chargingStateEl = document.getElementById('chargingState');
// var chargingTimeEl = document.getElementById('chargingTime');
// var dichargeTimeEl = document.getElementById('dischargeTime');
// var levelEl = document.getElementById('level');

// function updateBatteryUI(battery) {
//   levelEl.textContent = (battery.level * 100) + '%';
//   chargingTimeEl.textContent = battery.chargingTime + ' Seconds';
//   dichargeTimeEl.textContent = battery.dischargingTime + ' Seconds';

//   if (battery.charging === true) {
//     chargingStateEl.textContent = 'Charging';
//   } else if (battery.charging === false) {
//     chargingStateEl.textContent = 'Discharging';
//   }
// }

// function monitorBattery(battery) {
//   // Update the initial UI.
//   updateBatteryUI(battery);

//   // Monitor for futher updates.
//   battery.addEventListener('levelchange',
//     updateBatteryUI.bind(null, battery));
//   battery.addEventListener('chargingchange',
//     updateBatteryUI.bind(null, battery));
//   battery.addEventListener('dischargingtimechange',
//     updateBatteryUI.bind(null, battery));
//   battery.addEventListener('chargingtimechange',
//     updateBatteryUI.bind(null, battery));
// }

// if ('getBattery' in navigator) {
//   navigator.getBattery().then(monitorBattery);
// } else {
//   ChromeSamples.setStatus('The Battery Status API is not supported on ' +
//     'this platform.');
// }
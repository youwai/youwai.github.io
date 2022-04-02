// import firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js'
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyD-I9pi3Yz5YJKZZbB4tMYYU0Kw5CYIG3A",
    authDomain: "pet-automated-feeding.firebaseapp.com",
    databaseURL: "https://pet-automated-feeding-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pet-automated-feeding",
    storageBucket: "pet-automated-feeding.appspot.com",
    messagingSenderId: "565589198545",
    appId: "1:565589198545:web:588aafe7ccbeea6e8327f0",
    measurementId: "G-4SHNRSB0L5"
  };

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const recordRef = ref(database, 'Records/');

onValue(recordRef, (snapshot) => {
    const data = snapshot.val();

    const table = document.getElementById("table-list");

    if (table.rows.length > 2) {
      location.reload()
    }

    for (let i in data) {
        addRow(data[i], table);
    }

    doughnutChart(data, 100, 'Storage Remaining (%)', 'doug-chart');
    doughnutChart(data, 100, 'Food Remaining in Plate (%)', 'doug-chart1');
});

function addRow(data, table) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    var table = document.getElementById("table-list");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = weekday[new Date(data.Date).getDay()];
    cell2.innerHTML = data.Date;
    cell3.innerHTML = data.Time;
    cell4.innerHTML = data['Storage Remaining (%)'].toFixed(2);
    cell5.innerHTML = data['Food Remaining in Plate (%)'].toFixed(2);
    cell6.innerHTML = data['Remarks'];
}

function doughnutChart(data, max, type, chartID) {
    let current = data[Object.keys(data)[Object.keys(data).length-1]][type];

    const ctx = document.getElementById(chartID).getContext('2d');
    const dougChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [
              'Occupied',
              'Empty'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [current, (max-current)],
              backgroundColor: [
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)'
              ],
              hoverOffset: 4
            }]
          }
    });
}
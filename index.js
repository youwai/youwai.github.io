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

    for (let i in data) {
        addRow(data[i]);
    }

    createDoughnutChart(data, 1, 'Storage Remaining (ml)', 'doug-chart');
    createDoughnutChart(data, 5, 'Food Remaining in Plate (ml)', 'doug-chart1');
});

function addRow(data) {
    var table = document.getElementById("table-list");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = data.Date;
    cell2.innerHTML = data.Time;
    cell3.innerHTML = data['Storage Remaining (ml)'];
    cell4.innerHTML = data['Food Remaining in Plate (ml)'];
    cell5.innerHTML = data.Remark;
}

function createDoughnutChart(data, max, type, chartID) {
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
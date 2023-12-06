const ctx = document.getElementById('InfoChart');


const InfoChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '綠電',
      data: [],
      borderWidth: 1,
      backgroundColor: 'rgba(0, 128, 0, 0.2)',
      borderColor: 'rgba(0, 128, 0, 1)',
      cubicInterpolationMode: 'monotone'
    }, {
      label: '一樓',
      data: [],
      borderWidth: 1,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      cubicInterpolationMode: 'monotone'
    }],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

var ConnectionState = false;

document.getElementById("connectButton").addEventListener("click", function () {
  if (ConnectionState) {
    // 如果已連線，則進行斷線處理，並將按鈕文字還原為 "Connect"
    client.disconnect();
    ConnectionState = false;
    connectButton.textContent = 'Connect';
  }
  else {
    var brokerUrl = document.getElementById("brokerUrl").value;
    var brokerPort = Number(document.getElementById("brokerPort").value);

    client = new Paho.MQTT.Client(brokerUrl, brokerPort, "HTML");

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
      onSuccess: onConnect,
      onFailure: onFail,
    });

    connectButton.textContent = 'Connecting...';
    connectButton.disabled = true;
  }

});

function onConnect() {
  client.subscribe("MQTT/RS485");
  ConnectionState = true;
  connectButton.disabled = false;
  connectButton.textContent = 'Disconnect';
};

function onFail() {
  alert("Connect Failed.");
  ConnectionState = false;
  connectButton.disabled = false;
  connectButton.textContent = 'Connect';
}

function onConnectionLost(responseObject) {
  alert("Connection lost.");
  ConnectionState = false;
  connectButton.disabled = false;
  connectButton.textContent = 'Connect';
};

function onMessageArrived(message) {
  var payload = message.payloadString;
  parsedData = JSON.parse(payload);

  if (parsedData.Type == '001') { //太陽能
    SolarWatt1 = parsedData['1Watt1'];
    SolarWatt2 = parsedData['1Watt2'];
    SolarWatt3 = parsedData['1Watt3'];
    SolarVoltage1 = parsedData['1Voltage1'];
    SolarVoltage2 = parsedData['1Voltage2'];
    SolarVoltage3 = parsedData['1Voltage3'];
    SolarCurrent1 = parsedData['1Current1'];
    SolarCurrent2 = parsedData['1Current2'];
    SolarCurrent3 = parsedData['1Current3'];

    document.getElementById('SolarWatt1').textContent = SolarWatt1 + ' W /';
    document.getElementById('SolarWatt2').textContent = SolarWatt2 + ' W /';
    document.getElementById('SolarWatt3').textContent = SolarWatt3 + ' W /';
    document.getElementById('SolarVoltage1').textContent = SolarVoltage1 + ' V /';
    document.getElementById('SolarVoltage2').textContent = SolarVoltage2 + ' V /';
    document.getElementById('SolarVoltage3').textContent = SolarVoltage3 + ' V /';
    document.getElementById('SolarCurrent1').textContent = SolarCurrent1 + ' A';
    document.getElementById('SolarCurrent2').textContent = SolarCurrent2 + ' A';
    document.getElementById('SolarCurrent3').textContent = SolarCurrent3 + ' A';

  }
  else if (parsedData.Type == '002') { //一樓第一組
    FF1Watt1 = parsedData['2Watt1'];
    FF1Watt2 = parsedData['2Watt2'];
    FF1Watt3 = parsedData['2Watt3'];
    FF1Voltage1 = parsedData['2Voltage1'];
    FF1Voltage2 = parsedData['2Voltage2'];
    FF1Voltage3 = parsedData['2Voltage3'];
    FF1Current1 = parsedData['2Current1'];
    FF1Current2 = parsedData['2Current2'];
    FF1Current3 = parsedData['2Current3'];

    document.getElementById('FF1Watt1').textContent = FF1Watt1 + ' W /';
    document.getElementById('FF1Watt2').textContent = FF1Watt2 + ' W /';
    document.getElementById('FF1Watt3').textContent = FF1Watt3 + ' W /';
    document.getElementById('FF1Voltage1').textContent = FF1Voltage1 + ' V /';
    document.getElementById('FF1Voltage2').textContent = FF1Voltage2 + ' V /';
    document.getElementById('FF1Voltage3').textContent = FF1Voltage3 + ' V /';
    document.getElementById('FF1Current1').textContent = FF1Current1 + ' A';
    document.getElementById('FF1Current2').textContent = FF1Current2 + ' A';
    document.getElementById('FF1Current3').textContent = FF1Current3 + ' A';
  }
  else if (parsedData.Type == '003') { //一樓第二組
    FF2Watt1 = parsedData['3Watt1'];
    FF2Watt2 = parsedData['3Watt2'];
    FF2Watt3 = parsedData['3Watt3'];
    FF2Voltage1 = parsedData['3Voltage1'];
    FF2Voltage2 = parsedData['3Voltage2'];
    FF2Voltage3 = parsedData['3Voltage3'];
    FF2Current1 = parsedData['3Current1'];
    FF2Current2 = parsedData['3Current2'];
    FF2Current3 = parsedData['3Current3'];

    document.getElementById('FF2Watt1').textContent = FF2Watt1 + ' W /';
    document.getElementById('FF2Watt2').textContent = FF2Watt2 + ' W /';
    document.getElementById('FF2Watt3').textContent = FF2Watt3 + ' W /';
    document.getElementById('FF2Voltage1').textContent = FF2Voltage1 + ' V /';
    document.getElementById('FF2Voltage2').textContent = FF2Voltage2 + ' V /';
    document.getElementById('FF2Voltage3').textContent = FF2Voltage3 + ' V /';
    document.getElementById('FF2Current1').textContent = FF2Current1 + ' A';
    document.getElementById('FF2Current2').textContent = FF2Current2 + ' A';
    document.getElementById('FF2Current3').textContent = FF2Current3 + ' A';
  }
  else if (parsedData.Type == '004') { //一樓、綠電比、圖表
    SolarWatt = parsedData['green'];
    FFAWatt = parsedData['firstfloor'];
    Green_percentage = parsedData['green_percentage'];

    document.getElementById('FFAWatt').textContent = FFAWatt + ' W';
    document.getElementById('GreenPercentage').textContent = Green_percentage + ' %';
    document.getElementById('GreenWatt').textContent = SolarWatt + ' W';

    InfoChart.data.labels.push(new Date().toLocaleTimeString());
    InfoChart.data.datasets[0].data.push(SolarWatt);
    InfoChart.data.datasets[1].data.push(FFAWatt);
    InfoChart.update();

    if (InfoChart.data.labels.length >= 24) {
      // 刪除第一筆
      InfoChart.data.labels.shift();

      // 將所有筆數向左移
      InfoChart.data.datasets[0].data.shift();
      InfoChart.data.datasets[1].data.shift();

      // 更新圖表
      InfoChart.update();
    }

  }
};
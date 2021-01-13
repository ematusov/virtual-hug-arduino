import React, { useState, useEffect } from 'react';
import Slider, { Range } from 'rc-slider';
import './App.css';
import WriteValue from './WriteValue/WriteValue';

function App() {
  const [supportsBluetooth, setSupportsBluetooth] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);
  const [deviceName, setDeviceName] = useState(null);
  const [hexValue, setHexValue] = useState(0);
  const [motorCharacteristicService, setMotorCharacteristicService] = useState(null);

  const SEND_SERVICE_LIZZIE = "251fb674-1665-40e4-8bf0-24a97efba116";
  const SEND_SERVICE_CHARACTERISTIC_LIZZIE = "6e260f41-5fee-424a-879d-0e28aa8b7136";
  const DEVICE_NAME_LIZZIE = "Wifi Arduino Friend";
  
  const SEND_SERVICE_TOSIN = "251fb675-1665-40e4-8bf0-24a97efba116"
  const SEND_SERVICE_CHARACTERISTIC_TOSIN = "6e260f41-5fee-424a-879e-0e28aa8b7136"
  const DEVICE_NAME_TOSIN = "Tosins Soln Code NANO BLE 33 SENSE"

  const bytesArray = (n) => {
    if (!n) return new ArrayBuffer(0)
    const a = []
    a.unshift(n & 255)
    while (n >= 256) {
      n = n >>> 8
      a.unshift(n & 255)
    }
    return new Uint8Array(a).buffer
  }

  // When the component mounts, check that the browser supports Bluetooth
  useEffect(() => {
    if (navigator.bluetooth) {
      setSupportsBluetooth(true);
    }
  }, []);

  /**
   * Let the user know when their device has been disconnected.
   */
  const onDisconnected = (event) => {
    alert(`The device ${event.target} is disconnected`);
    setIsDisconnected(true);
  }

  /**
   * Attempts to connect to a Bluetooth device and subscribe to
   * battery level readings using the battery service.
   */
  const connectToDeviceAndSubscribeToUpdates = async () => { 
    try {
      // Search for Bluetooth device to connect to the browser
      const device = await navigator.bluetooth
        // .requestDevice({
        //   acceptAllDevices: true
        // });
      .requestDevice({
      acceptAllDevices: true,
      optionalServices: [SEND_SERVICE_TOSIN]
    });

      setDeviceName(device.name);
      setIsDisconnected(false);

      // Add an event listener to detect when a device disconnects
      device.addEventListener('gattserverdisconnected', onDisconnected);

      // Try to connect to the remote GATT Server running on the Bluetooth device
      const server = await device.gatt.connect()

      const primaryService = await server.getPrimaryService(SEND_SERVICE_TOSIN);
      console.log(primaryService)
      
      const motorCharacteristic = await primaryService.getCharacteristic(SEND_SERVICE_CHARACTERISTIC_TOSIN);
      console.log(motorCharacteristic);
      setMotorCharacteristicService(motorCharacteristic);
      
      
    } catch(error) {
      console.log(`There was an error: ${error}`);
    }
  };

const handleSubmit = async () => {
  console.log(motorCharacteristicService)
  const reading = await motorCharacteristicService.writeValue(bytesArray(50));

}

// this is broken!
const handleChange =(event) => {
  this.setState({hexValue: event.target.value});
}

  return (
    <div className="App">
      <h1>Hello! Send a virtual pulse hug to a friend :-)</h1>
      {supportsBluetooth && !isDisconnected && 
      <WriteValue characteristic={motorCharacteristicService}></WriteValue>
        //<button onClick={handleSubmit}>Send pulse</button>
      
      }
      {supportsBluetooth && isDisconnected &&
        <button onClick={connectToDeviceAndSubscribeToUpdates}>Connect to a Bluetooth device</button>
      }
      {!supportsBluetooth &&
        <p>This browser doesn't support the Web Bluetooth API</p>
      }
    </div>
  );
}

export default App;


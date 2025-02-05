import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import './App.css';
import WriteValue from './WriteValue/WriteValue';
import Background from './assets/vh_background.png';
import Logo from './assets/logo.png';

function App() {
  const [supportsBluetooth, setSupportsBluetooth] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);
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
      .requestDevice({
      acceptAllDevices: true,
      optionalServices: [SEND_SERVICE_TOSIN]
    });

      setIsDisconnected(false);

      // Add an event listener to detect when a device disconnects
      device.addEventListener('gattserverdisconnected', onDisconnected);

      // Try to connect to the remote GATT Server running on the Bluetooth device
      const server = await device.gatt.connect()

      const primaryService = await server.getPrimaryService(SEND_SERVICE_TOSIN);
      
      const motorCharacteristic = await primaryService.getCharacteristic(SEND_SERVICE_CHARACTERISTIC_TOSIN);
      setMotorCharacteristicService(motorCharacteristic);
      
      
    } catch(error) {
      console.log(`There was an error: ${error}`);
    }
  };

  return (
    <div className="App">
    <div className="container">
    {supportsBluetooth && !isDisconnected && 
    <WriteValue characteristic={motorCharacteristicService}></WriteValue>     
    }
    {supportsBluetooth && isDisconnected &&
    <>
    <img src={Logo}/>
    <h4>We know being apart is harder than ever. Let's fight isolation, one vibe at a time.</h4>
    <Button
      variant="contained" 
      color="primary" 
      onClick={connectToDeviceAndSubscribeToUpdates}>Send a Vibe</Button>
      </>
    }
    {!supportsBluetooth &&
      <p>Sorry, your browser does not support this feature :-(</p>
    }
    </div>
  </div>
  );
}

export default App;


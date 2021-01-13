import React, { useState, useEffect } from 'react';
import  WriteValue from './WriteValue/WriteValue.js';
import './App.css';

function App() {
  const [supportsBluetooth, setSupportsBluetooth] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);
  const [deviceName, setDeviceName] = useState(null);
  const [hexValue, setHexValue] = useState(0);

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
        acceptAllDevices: true
      });

      setDeviceName(device.name);
      setIsDisconnected(false);

      // Add an event listener to detect when a device disconnects
      device.addEventListener('gattserverdisconnected', onDisconnected);
      console.log(device.name)

      // Try to connect to the remote GATT Server running on the Bluetooth device
      const server = await device.gatt.connect();
      
    } catch(error) {
      console.log(`There was an error: ${error}`);
    }
  };

const handleSubmit = async () => {
  console.log('hi')
}

// this is broken!
const handleChange =(event) => {
  this.setState({hexValue: event.target.value});
}

  return (
    <div className="App">
      <h1>Hello! Send a virtual pulse hug to a friend :-)</h1>
      {supportsBluetooth && !isDisconnected && 
            <form onSubmit={handleSubmit}>
            <label>Enter Value: 
                <input type="text" value={hexValue} onChange={handleChange}/>
                <input type="submit" value="Submit" />
            </label>
        </form>
      
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


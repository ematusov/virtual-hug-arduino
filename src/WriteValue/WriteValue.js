import React from 'react';
import './WriteValue.css';
import { Button } from '@material-ui/core';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

class WriteValue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stop = this.stop.bind(this);
        this.writeNewValue = this.writeNewValue.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    // converts an int into a bytearray for the arduino to read
    bytesArray = (n) => {
        if (!n) return new ArrayBuffer(0)
        const a = []
        a.unshift(n & 255)
        while (n >= 256) {
          n = n >>> 8
          a.unshift(n & 255)
        }
        return new Uint8Array(a).buffer
      }

    handleSubmit(event) {
        this.writeNewValue(this.state.value)
        event.preventDefault();
    }

    stop(event) {
        this.setState({value: 0});
        this.writeNewValue(this.state.value)
    }

    writeNewValue(value) {
        this.props.characteristic.writeValue(this.bytesArray(value))
    }


    render() {
      return (
        <>
        <h3>Enter a value from 1-100 to represent the vibe you want to send.</h3>
        <h3>When you're done, submit a '0'.</h3>
        <form onSubmit={this.handleSubmit}>
            <InputLabel>
                <Input type="text" value={this.state.value} onChange={this.handleChange}/>
                <br></br>
                <br></br>
                <Button type="submit" variant="contained" color="primary" >Send a vibe</Button>
            </InputLabel>
        </form>  
        </>
      );
    }
  }

  export default WriteValue;
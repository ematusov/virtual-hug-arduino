import React from 'react';
import Slider, { Range } from 'rc-slider';


class WriteValue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

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
        this.props.characteristic.writeValue(this.bytesArray(this.state.value))
        event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <label>Enter Value: 
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <input type="submit" value="Submit" />
            </label>
        </form>
        //   <Slider color="red"/>
    
      );
    }
  }

  export default WriteValue;
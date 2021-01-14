import React from 'react';
import './WriteValue.css';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


class WriteValue extends React.Component {
 
    constructor(props) {
        super(props);
        console.log("HELLO")
        console.log(this.props)
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

    sendLove(value, duration) {
        console.log(this.props)
        if (duration == "SHORT") {
            this.writeValue(value)
            setTimeout(function() { this.writeValue(0); }, 1000);
        }
        else if (duration == "LONG") {
            this.writeValue(value)
            setTimeout(function() { this.writeValue(0); }, 5000);
        }
    }

    writeValue(value) {
        console.log("HELLO")
        console.log(this.props)
        this.props.characteristic.writeValue(this.bytesArray(value))
    }

    render() {
      return (
        <div className="root">
        {/* <Grid container spacing={2}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
              <Paper>
                <Button onClick={this.sendLove(100, "SHORT")}>Light, Short Hug</Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
              <Button onClick={this.sendLove(200, "SHORT")}>Intense, Short Hug</Button>
              </Paper>
            </Grid>
            
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
              <Paper>
                <Button onClick={this.sendLove(100, "LONG")}>Light, Long Hug</Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Button onClick={this.sendLove(200, "LONG")}>Big, Long Hug</Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid> */}
      </div>
        // <form onSubmit={this.handleSubmit}>
        //     <label>Enter Value: 
        //         <input type="text" value={this.state.value} onChange={this.handleChange}/>
        //         <input type="submit" value="Submit" />
        //     </label>
        // </form>    
      )
    }
  }

  export default WriteValue;
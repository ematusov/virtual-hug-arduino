import React from 'react';
import './WriteValue.css';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


class WriteValue extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            characteristic: null
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("into should component update")
        console.log(nextProps);
        return true;
    }

    componentWillMount() {
        console.log('inside componentdidmount')
        console.log(this.props)
        this.loadData();
    }

    loadData() {
            this.setState({
                characteristic: this.props.characteristic
            });
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
        if (duration === "SHORT") {
            this.writeNewValue(value)
            setTimeout(() => this.writeNewValue(0), 2000);
        }
        else if (duration === "LONG") {
            this.writeNewValue(value)
            setTimeout(() => this.writeNewValue(0), 5000);
        }
    }

    writeNewValue(value) {
        if (this.props.characteristic) {
            console.log("do you get here?!?!")
            this.props.characteristic.writeValue(this.bytesArray(value))
        }
    }

    render() {
      return (
        <div className="root">
        <Grid container spacing={2}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
              <Paper>
                <Button onClick={() => this.sendLove(100, "SHORT")}>Light, Short Hug</Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
              <Button onClick={() => this.sendLove(250, "SHORT")}>Intense, Short Hug</Button>
              </Paper>
            </Grid>
            
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
              <Paper>
                <Button onClick={() => this.sendLove(100, "LONG")}>Light, Long Hug</Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Button onClick={() => this.sendLove(250, "LONG")}>Big, Long Hug</Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>   
      )
    }
  }

  export default WriteValue;
import React from 'react';

class WriteValue extends React.Component {
    constructor() {
        this.state = {value: ''};
    }
    writeValue() {

    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <label>Enter Value: 
                <input type="text" value={this.state.value} />
                <input type="submit" value="Submit" />
            </label>
        </form>
      );
    }
  }

  export default WriteValue;
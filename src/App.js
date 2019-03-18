import React, { Component } from 'react';
import './App.css';
import CandleStickChart from './chart/CandleStickChart';
import { getData } from "./utils/utils";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currency: 'eur-usd',
      timeInterval: 'MIN_1'
    }
  }

  componentDidMount() {
    const {timeInterval} = this.state;
    this.setData(timeInterval);
  }

  setData = (timeInterval) => {
    const { currency} = this.state;
    getData(timeInterval, currency).then(data => {
      this.setState({ data, 
      selectedTimeInterval: timeInterval })
		})
  }
  
  render() {
    const { classes } = this.props;
    const { selectedTimeInterval, currency } = this.state;
    const timeIntervalOptions = [
      {value: 'MIN_1',
      label: '1 Minute'}, 
      {value: 'MIN_5',
      label: '5 Minutes'}, 
      {value: 'HOUR_1',
      label: '1 Hour'}, 
      {value: 'WEEK_1',
      label: '1 Week'}];
    if (this.state.data == null) {
			return <div>Loading...</div>
		} else return (
      <div className="App">
        <header className="App-header">
          Currency Chart : {currency}
        </header>
        <div>
          <span>Time Interval: </span>
          {timeIntervalOptions.map((option)=>{
            return (<Button variant="contained" color="primary" className={classes.button +  (option.value === selectedTimeInterval ? ' selected': '')}
            onClick={()=>this.setData(option.value)}>{option.label}</Button>)
          })}
        </div>
        <CandleStickChart chartTitle={''} data={this.state.data} />
      </div>
    );
  }
}

// export default App;

export default withStyles(styles)(App);


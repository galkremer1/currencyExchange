import React, { Component } from 'react';
import CandleStickChart from './chart/CandleStickChart';
import { getData } from "./utils/utils";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dropdown from 'react-dropdown';
import './App.css';
import './loader.css';
import 'react-dropdown/style.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

const timeIntervalOptions = [
  {value: 'MIN_1',
  label: '1 Minute'}, 
  {value: 'MIN_5',
  label: '5 Minutes'}, 
  {value: 'HOUR_1',
  label: '1 Hour'}, 
  {value: 'WEEK_1',
  label: '1 Week'}];

  const currencyOptions = [
     'eur-usd', 'usd-eur', 'usd-nzd'
  ];
  const defaultCurrencyOption = currencyOptions[0];


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currency: defaultCurrencyOption,
      timeInterval: 'MIN_1'
    }
  }

  componentDidMount() {
    this.setData({});
  }

  setData = ({currency: newCurrency, timeInterval: newTimeInterval }) => {
    const { currency, timeInterval} = this.state;
    this.setState({loading: true});
    const time = newTimeInterval || timeInterval;
    const cur = newCurrency || currency; 
    getData(time, cur).then(data => {
      this.setState(
        { data,
          selectedTimeInterval: time,
          loading: false,
          currency: cur,
          timeInterval: time
         })
		});
  }

  setTimeInterval = (selectedTimeInterval) => {
    const {timeInterval} = this.state;
    if (selectedTimeInterval !== timeInterval )  {
      this.setData({
        timeInterval: selectedTimeInterval
      })
    }
  }
  
  setCurrency = (selectedCurrency) => {
    const {currency} = this.state;
    if (selectedCurrency.value !== currency )  {
      this.setData({
        currency: selectedCurrency.value
      })
    }

  }
  render() {
    const { classes } = this.props;
    const { selectedTimeInterval } = this.state;

    if (this.state.data == null ) {
			return <div className="loading">Loading&#8230;</div>;
		} else return (
      <div className="App">
        <header className="App-header"><h1>Currency Chart :</h1> 
        <Dropdown options={currencyOptions} onChange={this.setCurrency} value={defaultCurrencyOption}  />
        </header>
        <div>
          <span>Time Interval: </span>
          {timeIntervalOptions.map((option)=>{
            return (<Button key={option.value} variant="contained" color="primary" className={classes.button +  (option.value === selectedTimeInterval ? ' selected': '')}
            onClick={()=>this.setTimeInterval(option.value)}>{option.label}</Button>)
          })}
        </div>
        { this.state.loading &&  
         (<div className="loading">Loading&#8230;</div>)
        }
        <CandleStickChart chartTitle={''} data={this.state.data} />
      </div>
    );
  }
}

export default withStyles(styles)(App);


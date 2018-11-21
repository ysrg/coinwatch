import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { ResponsiveTreeMap } from '@nivo/treemap';
import './App.css';
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.baseState = this.state;
    this.state = {
      isActive: true,
      tvol: 0,
      selected: false,
      isLive: false
    };
  }

  componentDidMount() {
    // console.log('cdm called')
    const setState = this.setState.bind(this);

    axios
    .post('/', {
      timestamp: '4h'
    })
    .then(function(response) {
      setState({ selected: { '4h': 'active' } });
    })
    .catch(function(error) {});

    this.connectSocket('4h')
  }

  shouldComponentUpdate(nextProps, nextState) {
    var j = Object.keys(nextState)
    var x = Object.keys(this.state)
    var xj = j.indexOf("BTCUSDT")
    var xx = x.indexOf("BTCUSDT")

    if (
      Object.keys(this.state).length === 111 &&
      Object.keys(this.state).length === Object.keys(nextState).length &&
      this.state.tvol === nextState.tvol &&
      this.state.isActive === nextState.isActive
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    var keys = Object.keys(this.state)
    var dates = Object.keys(this.state[keys[keys.length-1]])
    if(keys.length === 110) {
      // console.log(dates[dates.length-5])
    }
    var date1 = new Date(1542286800000);
    var date2 = new Date(1542283200000);
    var hours = Math.abs(date1 - date2) / 36e5;

    let totalVol = Object.keys(this.state).reduce((acc, curr, i) => {
      if (this.state[curr].hasOwnProperty('currVol')) {
        acc += this.state[curr].currVol;
      }
      return acc;
    }, 0);
    if (this.state.tvol !== totalVol) {
      this.setState({ tvol: totalVol });
    }
  }

  connectSocket = (t) => {

    // console.log('tttt', t.target.value || t)
    const socket = io('/');
    if(typeof t !== 'string') this.setState({isLive: !this.state.isLive})
    socket.on('retrieve', res => {
      this.handleRes(res, this.state.isLive);
    });
  }

  handleRes = (res, live) => {
    console.log('live', live)
    var keys = Object.keys(res[res.symbol]).slice(-3);
    var last_ten = keys.reduce((acc, curr, i) => {
      acc[curr] = res[res.symbol][curr];
      return acc;
    }, {});
    if (Object.keys(last_ten).length > 2) {
      let period = Math.abs(keys[keys.length-1] - keys[keys.length-2]) / 36e5
      let currVol = +last_ten[keys[keys.length - (live ? 1 : 2)]].volume;
      let prevVol = +last_ten[keys[keys.length - (live ? 2 : 3)]].volume;
      let open = +last_ten[keys[keys.length - (live ? 1 : 2)]].open;
      let close = +last_ten[keys[keys.length - (live ? 1 : 2)]].close;
      let prch =
        open < close ? (close / open) * 100 - 100 : 100 - (open / close) * 100;

      let time = Math.abs(keys[keys.length-1] - keys[keys.length-2]) / 36e5
      let change = currVol && prevVol ? (currVol / prevVol).toFixed(3) : 0;

      this.setState({
        period,
        [res.symbol]: {
          ...last_ten,
          time,
          currVol,
          prevVol,
          change,
          prch: prch.toFixed(2)
        }
      });
    }
    if(!live) return
  };

  computeColor = ticker => {
    if (this.state[ticker].prch < 0) {
      return this.state[ticker].prch < -3
        ? this.state[ticker].prch < -6
          ? this.state[ticker].prch < -15
            ? '#DB4B38'
            : '#E97253'
          : '#EE9778'
        : '#fcd3bf';
    }
    return this.state[ticker].prch > 3
      ? this.state[ticker].prch > 10
        ? this.state[ticker].prch > 15
          ? '#5FA964'
          : '#ACD6A0'
        : '#CDE7C2'
      : '#e4efdc';
  };

  handleClick = e => {
    this.setState(this.baseState, () => {
      // console.log('yes')
    })
    this.setState({
      selected: { [e.target.value]: 'active' },
      isActive: false,
    });
    setTimeout(() => {
      this.setState({ isActive: true });
    }, 1500);
    axios
      .post('/', {
        timestamp: e.target.value
      })
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        // console.log(error);
      });
  };

  render() {
    const ar = Object.keys(this.state).map(i => {
      let color = this.computeColor(i);
      //Math.round on loc is used to round to the decimals eg 1,188 => 1.19
      return {
        name: i.slice(-4) == 'USDT' ? i.slice(0, -4) : i.slice(0, -3),
        color: color,
        loc:
          +this.state[i].change > 0
            ? Math.round(this.state[i].change * 100) / 100
            : 0,
        prch: this.state[i].prch,
        time: this.state[i].time,
        o: function() {
          return <h1>{i}</h1>;
        }
      };
    });
    var newArr = ar.filter(i => i.time == this.state.period)
    // console.log(this.state.isLive, 'live')
    return (
      <div className="App">
        <header className="App-header">
          <div className="btn-group" data-toggle="buttons" role="group">
        <button
          onClick={this.connectSocket}
          value="Live"
          className={`btn btn-danger ${this.state.isLive ? 'active' : null}`}
        >Live
          <div style={{"color": "#ffffff"}} class="la-ball-scale-multiple la-dark la-sm">
              <div></div>
              <div></div>
              <div></div>
          </div>
          </button>
            <button
              disabled={!this.state.isActive}
              value="5m"
              onClick={this.handleClick}
              type="button"
              className={`btn btn-secondary ${this.state.selected['5m']}`}
            >
              5m
            </button>
            <button
              disabled={!this.state.isActive}
              value="15m"
              onClick={this.handleClick}
              type="button"
              className={`btn btn-secondary ${this.state.selected['15m']}`}
            >
              15m
            </button>
            <button
              disabled={!this.state.isActive}
              value="30m"
              onClick={this.handleClick}
              type="button"
              className={`btn btn-secondary ${this.state.selected['30m']}`}
            >
              30m
            </button>
            <button
              disabled={!this.state.isActive}
              value="1h"
              onClick={this.handleClick}
              type="button"
              className={`btn btn-secondary ${this.state.selected['1h']}`}
            >
              1H
            </button>
            <button
              disabled={!this.state.isActive}
              value="4h"
              onClick={this.handleClick}
              type="button"
              className={`btn btn-secondary ${this.state.selected['4h']}`}
            >
              4H
            </button>
            <button
              disabled={!this.state.isActive}
              value="8h"
              onClick={this.handleClick}
              type="button"
              className={`btn btn-secondary ${this.state.selected['8h']}`}
            >
              8H
            </button>
            <button
              disabled={!this.state.isActive}
              value="1d"
              onClick={this.handleClick}
              type="button"
              className={`btn btn-secondary ${this.state.selected['1d']}`}
            >
              1D
            </button>
            <button
              disabled={!this.state.isActive}
              value="1w"
              onClick={this.handleClick}
              type="button"
              className={`btn btn-secondary ${this.state.selected['1w']}`}
            >
              1W
            </button>
            <button
              disabled={!this.state.isActive}
              value="1M"
              onClick={this.handleClick}
              type="button"
              className={`btn btn-secondary ${this.state.selected['1M']}`}
            >
              1M
            </button>
          </div>
        </header>
        {Object.keys(this.state).length > 100 ? (
          <ResponsiveTreeMap
            root={{
              name: 'crypto-signal',
              color: '#f3f9ef',
              children: newArr
            }}
            identity="name"
            value="loc"
            innerPadding={3}
            outerPadding={4}
            label={d => `${d.name} ${d.prch ? d.prch + '%' : ''}`}
            labelSkipSize={8}
            labelTextColor="inherit:darker(3.2)"
            colorBy={d => d.color}
            borderWidth={1}
            borderColor="inherit:darker(2.3)"
            motionDamping={35}
            motionStiffness={300}
            animate={false}
            tooltip={props => {
              return (
                <p style={{ color: props.data.color }}>
                  {' '}
                  {`${props.data.name} ${
                    props.data.loc ? props.data.loc + 'x' : ''
                  }`}{' '}
                </p>
              );
            }}
            theme={{
              tooltip: { container: { color: '#fff', background: '#333' } }
            }}
          />
        ) : (
          'Loading'
        )}
      </div>
    );
  }
}

export default App;

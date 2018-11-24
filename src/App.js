import React, { Component } from 'react';
import Treemap from './components/Treemap';
import io from 'socket.io-client';
import axios from 'axios';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import _live from './utils';
import Spinner from 'react-spinkit';
import Header from './components/Header';
import './App.css';
// import logo from './logo.svg';

let initialState = {
  isActive: true,
  selected: { '4h': 'active' },
  isLive: false,
  socket: null,
  nr: '',
  period: '',
  periodFormatted: '',
  totalCoins: 0,
  data: {},
  _liveData: []
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const setState = this.setState.bind(this);
    let self = this;
    axios
      .get('/', {
        params: {
          timestamp: '4h'
        }
      })
      .then(function(response) {
        let res = response.data.result.reduce((acc, curr, i) => {
          acc[curr['symbol']] = curr[curr['symbol']];
          return acc;
        }, {});
        setState({ data: res });
      })
      .catch(function(error) {});
  }

  connectSocket = t => {
    // console.log('connect socket', t, typeof t)
    const socket = io('http://localhost:3231');
    this.setState({ socket });
    if (typeof t !== 'string') this.setState({ isLive: !this.state.isLive });

    socket.on('retrieve', res => {
      const { symbol } = res;
      // let x = this.state.data[res['symbol']][1].volume
      let k = Object.keys(res[res['symbol']]);
      // console.log(res['symbol'],res[res['symbol']], k, res[res['symbol']][k[1]])
      if (k[1] in res[res['symbol']]) {
        const newData = update(this.state, {
          data: {
            [res['symbol']]: {
              1: { volume: { $set: res[res['symbol']][k[1]].volume } }
            }
          }
        });
        // console.log('===',this.state.data[res['symbol']][0], Object.keys(res[res['symbol']])[1], res[res['symbol']][k[0]])
        this.setState({ data: newData.data });
      }
    });

    const interval = Object.keys(this.state.selected)[0];

    axios
      .post('http://localhost:3231', {
        timestamp: t || interval
      })
      .then(function(response) {})
      .catch(function(error) {});
  };

  getTreemapData = () => {
    const { data } = this.state;
    const dataKeys = Object.keys(data);

    if (dataKeys.length) {
      const coins = dataKeys.map(i => {
        let name = i;
        let last_tick = data[i][1];
        let pre_last_tick = data[i][0];
        let change =
          +pre_last_tick.volume !== 0
            ? (last_tick.volume / pre_last_tick.volume).toFixed(3)
            : 0;
        let loc = change > 0 ? Math.round(change * 100) / 100 : 0;
        let open = last_tick.open;
        let close = last_tick.close;
        let time = Math.abs(last_tick.time - pre_last_tick.time) / 36e5;
        let prch =
          open < close
            ? (close / open) * 100 - 100
            : 100 - (open / close) * 100;
        let color = this.computeColor(prch);

        return {
          time,
          open,
          name:
            name.slice(-4) == 'USDT' ? name.slice(0, -4) : name.slice(0, -3),
          loc,
          prch: prch.toFixed(2),
          color
        };
      });
      return coins;
    }
    return { name: 'g', loc: 32, prch: 3, color: 'red' };
  };

  computeColor = prch => {
    if (prch < 0) {
      return prch < -3
        ? prch < -6
          ? prch < -15
            ? '#DB4B38'
            : '#E97253'
          : '#EE9778'
        : '#fcd3bf';
    }
    return prch > 3
      ? prch > 10
        ? prch > 15
          ? '#5FA964'
          : '#ACD6A0'
        : '#CDE7C2'
      : '#e4efdc';
  };

  handleLiveClick = e => {
    if (this.state.isLive) {
      this.state.socket.disconnect();
      this.setState({ isLive: false });
      return;
    }
    this.connectSocket();
  };

  handleClick = e => {
    let self = this;
    this.setState({
      selected: { [e.target.value]: 'active' },
      isActive: false
    });
    if (this.state.isLive) this.connectSocket(e.target.value);
    axios
      .get('/', {
        params: {
          timestamp: e.target.value
        }
      })
      .then(function(response) {
        let res = response.data.result.reduce((acc, curr, i) => {
          acc[curr['symbol']] = curr[curr['symbol']];
          return acc;
        }, {});
        self.setState({ data: res, isActive: true });
      })
      .catch(function(error) {})
  };

  render() {
    const { isLive, isActive, selected } = this.state;
    let data = this.getTreemapData();
    return (
      <div className="App">
        <Header
          isLive={isLive}
          isActive={isActive}
          selected={selected}
          handleClick={this.handleClick}
          handleLiveClick={this.handleLiveClick}
        />
        {data.length > 90 && isActive ? (
          <Treemap data={data} />
        ) : (
          <Spinner fadeIn="none" className="spinner" />
        )}
      </div>
    );
  }
}

export default App;

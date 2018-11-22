import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { isEqual } from 'lodash';
import { ResponsiveTreeMap } from '@nivo/treemap';
import Spinner from 'react-spinkit';
import './App.css';
// import logo from './logo.svg';
let initialState = {
  isActive: true,
  tvol: 0,
  selected: { '4h': 'active' },
  isLive: false,
  socket: null,
  nr: '',
  period: '',
  periodFormatted: '',
  totalCoins: 0
};
class App extends Component {
  constructor(props) {
    super(props);
    this.baseState = this.state;
    this.state = initialState;
  }

  getClearState() {
    return {
      foo: undefined
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

    this.connectSocket('4h');
  }

  shouldComponentUpdate(nextProps, nextState) {
    var j = Object.keys(nextState);
    var x = Object.keys(this.state);
    var xj = j.indexOf('BTCUSDT');
    var xx = x.indexOf('BTCUSDT');

    // if (
    //   Object.keys(this.state).length === 111 &&
    //   Object.keys(this.state).length === Object.keys(nextState).length &&
    //   this.state.tvol === nextState.tvol &&
    //   this.state.isActive === nextState.isActive
    // ) {
    //   return false;
    // }
    return true;
  }

  // filterState = () => {
  //   let  {period, nr, isActive, selected, socket, isLive, tvol, ...state} = this.state
  //   return state;
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(Object.keys(this.state.selected)[0] ===
    this.state.periodFormatted && !this.state.socket.connected) {
      // console.log('cdu conect')
      this.connectSocket()
    }
    // console.log(Object.keys(prevState).length,Object.keys(this.state).length)
    let {
      period,
      nr,
      isActive,
      selected,
      socket,
      isLive,
      tvol,
      ...state
    } = prevState;

    let f = Object.keys(state).filter(
      (i, arr) => state[i].time !== this.state.period
    );
    // console.log(f)
    // console.log(Object.keys(this.state).length, Object.keys(prevState.selected)[0], Object.keys(this.state.selected)[0] )
    // if(Object.keys(this.state).length >= this.state.nr + Object.keys(initialState).length && Object.keys(prevState.selected)[0] != Object.keys(this.state.selected)[0]) {
      // console.log('lol')
    //   if(f.length) this.state.socket.disconnect()
    // }
    if(this.state.totalCoins > 100 && isEqual(prevState, this.state)) {
      // console.log('!!!!!!!!!!!')
      this.state.socket.disconnect()
    }
    var keys = Object.keys(this.state);
    var dates = Object.keys(this.state[keys[keys.length - 1]]);
    if (keys.length === 110) {
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

  connectSocket = t => {
    // console.log('tttt', t);
    const socket = io('/');
    this.setState({ socket });
    if (typeof t !== 'string') this.setState({ isLive: !this.state.isLive });
    socket.on('retrieve', res => {
      this.handleRes(res, this.state.isLive);
    });
  };

  handleRes = (res, live) => {
    // this.setState({loading: true})
    // console.log(res[res.nr])
    if (Object.keys(res[res.symbol]).length > 3) {
      var keys = Object.keys(res[res.symbol]).slice(-3);
      // console.log(res.symbol, Object.keys(res[res.symbol]).length)
      var last_ten = keys.reduce((acc, curr, i) => {
        acc[curr] = res[res.symbol][curr];
        return acc;
      }, {});
      if (Object.keys(last_ten).length > 2) {
        // console.log(keys[keys.length - 1],keys[keys.length - 2])
        let period =
          Math.abs(keys[keys.length - 1] - keys[keys.length - 2]) / 36e5;
        let periodFormatted;
        if(period == 0.08333333333333333) periodFormatted = '5m'
        if(period == 0.25) periodFormatted = '15m'
        if(period == 0.5) periodFormatted = '30m'
        if(period == 1) periodFormatted = '1h'
        if(period == 4) periodFormatted = '4h'
        if(period == 8) periodFormatted = '8h'
        if(period == 24) periodFormatted = '1d'
        if(period == 168) periodFormatted = '1w'
        if(period == 744) periodFormatted = '1M'
        // console.log('===',periodFormatted)
        let currVol = +last_ten[keys[keys.length - (live ? 1 : 2)]].volume;
        let prevVol = +last_ten[keys[keys.length - (live ? 2 : 3)]].volume;
        let open = +last_ten[keys[keys.length - (live ? 1 : 2)]].open;
        let close = +last_ten[keys[keys.length - (live ? 1 : 2)]].close;
        let prch =
          open < close
            ? (close / open) * 100 - 100
            : 100 - (open / close) * 100;

        let time =
          Math.abs(keys[keys.length - 1] - keys[keys.length - 2]) / 36e5;
        let change = currVol && prevVol ? (currVol / prevVol).toFixed(3) : 0;
        let totalCoins = Object.keys(this.state).filter(x => !Object.keys(initialState).includes(x));
        // console.log('ddddd',difference)
        this.setState({
          nr: res.nr,
          totalCoins: totalCoins.length,
          period,
          periodFormatted,
          [res.symbol]: {
            ...last_ten,
            time,
            currVol,
            prevVol,
            change,
            prch: prch.toFixed(2)
          }
        });
        let f = Object.keys(this.state).filter(
          (i, arr) => this.state[i].time != this.state.period && Object.keys(initialState).indexOf(i) == -1
        )
        let h = f.filter(i => Object.keys(initialState).indexOf(i) == -1)
        let g = Object.keys(this.state).filter(i => f.includes(i));

        // if(f.length == 7)
        // console.log(f,Object.keys(this.state).length >= this.state.nr + Object.keys(initialState).length)
        // this.setState({loading: false})
        // console.log(Object.keys(this.state).length,this.state.nr + Object.keys(initialState).length)
        // console.log(
        //   '----',
        //   Object.keys(this.state).length,
        //   this.state.nr,
        //   Object.keys(initialState).length,
        //   f,
        //   this.state.isActive,
        //   Object.keys(this.state.selected)[0],
        //   this.state.periodFormatted
        // );
        if (
          Object.keys(this.state).length >=
            this.state.nr + Object.keys(initialState).length &&
          !f.length && Object.keys(this.state.selected)[0]===this.state.periodFormatted
        ) {
          this.setState({ isActive: true });
          this.state.socket.disconnect();
          // console.log('if1', this.state.socket.connected);
        }
        if (
          Object.keys(this.state).length >=
            this.state.nr + Object.keys(initialState).length &&
          this.state.period == '744' &&
          f.length == 4 && Object.keys(this.state.selected)[0]===this.state.periodFormatted
        ) {
          console.log('if2');
          this.setState({ isActive: true });
          this.state.socket.disconnect();
        }

      }
    }
    // if(!live) return
  };

  computeColor = ticker => {
    if (this.state[ticker] && this.state[ticker].prch < 0) {
      return this.state[ticker].prch < -3
        ? this.state[ticker].prch < -6
          ? this.state[ticker].prch < -15
            ? '#DB4B38'
            : '#E97253'
          : '#EE9778'
        : '#fcd3bf';
    }
    return this.state[ticker] && this.state[ticker].prch > 3
      ? this.state[ticker].prch > 10
        ? this.state[ticker].prch > 15
          ? '#5FA964'
          : '#ACD6A0'
        : '#CDE7C2'
      : '#e4efdc';
  };

  handleClick = e => {
    // console.log(e.target.value);
    this.connectSocket(e.target.value);
    this.setState({
      selected: { [e.target.value]: 'active' },
      isActive: false
    });
    // this.setState({ isActive: true });
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
          this.state[i] && +this.state[i].change > 0
            ? Math.round(this.state[i].change * 100) / 100
            : 0,
        prch: this.state[i] && this.state[i].prch,
        time: this.state[i] && this.state[i].time,
      };
    });
    var newArr = ar.filter(i => i.time == this.state.period);
    // console.log('render', this.state.isActive)
    return (
      <div className="App">
        <header className="App-header">
          <div className="btn-group" data-toggle="buttons" role="group">
            <button
              value="Live"
              className={`btn btn-danger ${
                this.state.isLive ? 'active' : null
              }`}
            >
              Live
              <div
                style={{ color: '#ffffff' }}
                className="la-ball-scale-multiple la-dark la-sm"
              >
                <div />
                <div />
                <div />
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
        {this.state.isActive ? null :
        <Spinner fadeIn="quarter" className="spinner"/>
        }

        {Object.keys(this.state).length > 110 ? (
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
            label={d => `${d.name} ${d.prch ? d.prch + '% ' + d.time : ''}`}
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
          <Spinner fadeIn="quarter" className="spinner"/>
        )}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { ResponsiveTreeMap } from '@nivo/treemap';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      tvol: 0,
      selected: false
    };
  }

  componentDidMount() {
    const socket = io('192.168.100.3:3231');
    const setState = this.setState.bind(this)
    const state = this.state
    axios.post('/', {
      timestamp: '4h'
    })
    .then(function (response) {
      setState({selected: {'4h': 'active'}})
    })
    .catch(function (error) {
    });
    // socket.on('BNBBTC', () => {
    //   socket.emit('retrieve', (res) => {
    //   })
    // });
    // socket.on('daily', (res) => {
    // })
    socket.on('retrieve', res => {
      this.handleRes(res);
    });

    // this.setState({
    //   socket
    // });
    // socket.on('update', (res) => this.setState({res}))
  }
  shouldComponentUpdate(nextProps, nextState) {
    // var keys = Object.keys(this.state);
    // var keys1 = Object.keys(nextState);
    // if(this.state.isActive === nextState.isActive && keys1.length === 22 && this.state[keys[keys.length -1]] && this.state[keys[keys.length -1]] && this.state[keys[keys.length -1]].currVol === nextState[keys[keys.length -1]].currVol) {
    //   return false
    // }

    if(Object.keys(this.state).length === 110 && Object.keys(this.state).length === Object.keys(nextState).length && this.state.tvol === nextState.tvol && this.state.isActive === nextState.isActive) {

      // console.log('🤦‍♂️',this.state['BTCUSDT'].prevVol, nextState['BTCUSDT'].currVol)
      return false
    }
    return true
    // var elms = document.getElementsByTagName('rect');
    // var e = Array.from(elms);
    // var m = e.map(i => {
    //   return {
    //     width: i.width.baseVal.value,
    //     height: i.height.baseVal.value,
    //     sibl: i.nextSibling
    //   };
    // });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    let totalVol = Object.keys(this.state).reduce((acc, curr, i) => {
      if(this.state[curr].hasOwnProperty('currVol')) {
        acc += this.state[curr].currVol
      }
      return acc
    }, 0)
    // if(prevState['BTCUSDT']) { console.log( this.state['BTCUSDT'].prevVol, prevState['BTCUSDT'].prevVol) }
    if(Object.keys(this.state).length == Object.keys(prevState).length && Object.keys(prevState).length == 23 && totalVol === this.state.tvol) {

      // this.setState({isActive: true})
    }

    if(this.state.tvol !== totalVol) {
      this.setState({tvol: totalVol})
    }
    // var keys = Object.keys(this.state);
    // var keys1 = Object.keys(prevState);
  //   if(keys.length === 22 && keys1.length === 22 && this.state[keys[keys.length-1]].hasOwnProperty('currVol')) {
  //     if(this.state[keys[keys.length - 1]].currVol !== prevState[keys[keys.length - 1]].currVol && !prevState.isActive) {
  //       this.setState({isActive: true})
  //     }
  // }
  }

  handleRes = res => {
    for (let key in res[res.symbol])
      res[res.symbol][key]['date'] = new Date(+key).toTimeString();
    // var arr = Object.entries(res[res.symbol]).slice(-3);
    var keys = Object.keys(res[res.symbol]).slice(-10);
    var last_ten = keys.reduce((acc, curr, i) => {
      acc[curr] = res[res.symbol][curr];
      return acc;
    }, {});
    if(Object.keys(last_ten).length > 9) {
    let currVol = +last_ten[keys[keys.length - 2]].volume;
    let prevVol = +last_ten[keys[keys.length - 3]].volume;
    let open = +last_ten[keys[keys.length - 2]].open;
    let close = +last_ten[keys[keys.length - 2]].close;
    let prch =
    open < close ? (close / open) * 100 - 100 : 100 - (open / close) * 100;

    let changeFunc = function() {
      let change;
      if (+currVol < +prevVol) {
        change = (currVol / prevVol) * 100;
        return change.toFixed(0);
      }
      return change;
    };

    let change = currVol && prevVol ? (currVol / prevVol).toFixed(3) : 0;

    this.setState({
      ...this.state,
      // arr: [...new Set(this.state.arr), res.symbol],
      coinsNr: res.nr,
      [res.symbol]: {
        ...last_ten,
        currVol,
        prevVol,
        change,
        prch: prch.toFixed(2),
      },
    });}
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

  handleClick = (e) => {
    // const self = this
    this.setState({selected: {[e.target.value]:'active'}, isActive: false})
    setTimeout(() => {
      this.setState({ isActive: true})
    }, 1500);
    axios.post('/', {
      timestamp: e.target.value
    })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
    });
  };

  render() {
    // this.state.coinsNr.length && this.state.coinsNr.length - 1 === 20,
    // console.log('render called', Object.keys(this.state).length)
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
        o: function() {
          return <h1>{i}</h1>;
        }
      };
    });
    return (
      <div className="App">
        <header className="App-header">
          <div className="btn-group" data-toggle="buttons" role="group">
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
            type="button" className={`btn btn-secondary ${this.state.selected['1h']}`}>
              1H
            </button>
            <button
              disabled={!this.state.isActive}
            value="4h"
              onClick={this.handleClick}
            type="button" className={`btn btn-secondary ${this.state.selected['4h']}`}>
              4H
            </button>
            <button
              disabled={!this.state.isActive}
            value="8h"
              onClick={this.handleClick}
            type="button" className={`btn btn-secondary ${this.state.selected['8h']}`}>
              8H
            </button>
            <button
              disabled={!this.state.isActive}
            value="1d"
              onClick={this.handleClick}
            type="button" className={`btn btn-secondary ${this.state.selected['1d']}`}>
              1D
            </button>
            <button
              disabled={!this.state.isActive}
            value="1w"
              onClick={this.handleClick}
            type="button" className={`btn btn-secondary ${this.state.selected['1w']}`}>
              1W
            </button>
            <button
              disabled={!this.state.isActive}
            value="1M"
              onClick={this.handleClick}
            type="button" className={`btn btn-secondary ${this.state.selected['1M']}`}>
              1M
            </button>
          </div>
        </header>
        {
          Object.keys(this.state).length === 110 ?
            <ResponsiveTreeMap
              root={{
                name: 'crypto-signal',
                color: '#f3f9ef',
                children: ar
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
              animate={false}
              motionStiffness={210}
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
              motionDamping={29}
              theme={{
                tooltip: { container: { color: '#fff', background: '#333' } }
              }}
            />
            : 'Loading'

        }
      </div>
    );
  }
}

export default App;

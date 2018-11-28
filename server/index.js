const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const binance = require('node-binance-api')().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET,
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
  // reconnect: false
});

let topByVol = [
  'BTCUSDT',
  'GVTBTC',
  'QSPBTC',
  'MODBTC',
  'ONTBTC',
  'GOBTC',
  'LINKBTC',
  'BCCBTC',
  'XRPBTC',
  'XLMBTC',
  'XEMBTC',
  'ETHBTC',
  'ZECBTC',
  'MDABTC',
  'QKCBTC',
  'BATBTC',
  'PHXBTC',
  'ADABTC',
  'EOSBTC',
  'TRXBTC'
];

/**
 * `coins` array was computed using current (11/15/2018) top200 coinmarketcap.com coin list
 * from wich were retrieved the coins that are currently trading on Binance
 * https://jsbin.com/tolureluhe/edit?html,js,output
 */
let coins = [
  'ETHBTC',
  'LTCBTC',
  'BNBBTC',
  'NEOBTC',
  'GASBTC',
  'BTCUSDT',
  'MCOBTC',
  'WTCBTC',
  'LRCBTC',
  'QTUMBTC',
  'OMGBTC',
  'ZRXBTC',
  'STRATBTC',
  'KNCBTC',
  'FUNBTC',
  'LINKBTC',
  'XVGBTC',
  'SALTBTC',
  'MDABTC',
  'SUBBTC',
  'EOSBTC',
  'SNTBTC',
  'ETCBTC',
  'ENGBTC',
  'ZECBTC',
  'BNTBTC',
  'DASHBTC',
  'BTGBTC',
  'REQBTC',
  'TRXBTC',
  'POWRBTC',
  'ARKBTC',
  'XRPBTC',
  'ENJBTC',
  'STORJBTC',
  'KMDBTC',
  'NULSBTC',
  'RDNBTC',
  'XMRBTC',
  'AMBBTC',
  'BATBTC',
  'GVTBTC',
  'GXSBTC',
  'POEBTC',
  'BTSBTC',
  'XZCBTC',
  'LSKBTC',
  'MANABTC',
  'BCDBTC',
  'DGDBTC',
  'ADABTC',
  'PPTBTC',
  'CMTBTC',
  'XLMBTC',
  'CNDBTC',
  'WAVESBTC',
  'GTOBTC',
  'ICXBTC',
  'ELFBTC',
  'AIONBTC',
  'NEBLBTC',
  'BRDBTC',
  'EDOBTC',
  'RLCBTC',
  'PIVXBTC',
  'IOSTBTC',
  'STEEMBTC',
  'NANOBTC',
  'BLZBTC',
  'AEBTC',
  'NCASHBTC',
  'ZILBTC',
  'ONTBTC',
  'STORMBTC',
  'XEMBTC',
  'WANBTC',
  'SYSBTC',
  'GRSBTC',
  'GNTBTC',
  'LOOMBTC',
  'REPBTC',
  'MODBTC',
  'ZENBTC',
  'SKYBTC',
  'CVCBTC',
  'THETABTC',
  'QKCBTC',
  'AGIBTC',
  'NXSBTC',
  'DATABTC',
  'SCBTC',
  'NPXSBTC',
  'NASBTC',
  'MFTBTC',
  'DENTBTC',
  'ARDRBTC',
  'HOTBTC',
  'VETBTC',
  'POLYBTC',
  'HCBTC',
  'GOBTC',
  'PAXBTC',
  'RVNBTC',
  'DCRBTC'
];

const isIterable = function(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

const app = express();
const server = require('http').Server(app);
const io = (module.exports.io = require('socket.io')(server));
const PORT = process.env.PORT || 3231;

app.use(express.static(`build`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/coins',  async (req, res) => {
  function computeLimit(time) {
    let minDiff = new Date().getTime() - new Date().setHours(0,0,0,0)
    let mins = Math.floor(minDiff / 60000)
    switch (time) {
      case '5m': return 10
      case '15m': return 8
      case '30m': return 6
      case '1h': return 5
      case '4h': return 5
      case '8h': return 4
      case '1d': return 4
      case '1w': return 2
      case '1M': return 2
      default:
        break;
    }
  }
  let promisesArray = coins.map((i, index,arr) => {

    return new Promise((resolve,reject) => binance.candlesticks(i, req.query.timestamp, (error, ticks, symbol) => {
      if(isIterable(ticks)) {

        let dayData = ticks.reduce((acc, curr, i, ar) => {
            acc[i] = {
              'time': ar[i][0],
              'open': ar[i][1],
              'high': ar[i][2],
              'low': ar[i][3],
              'close': ar[i][4],
              'volume': ar[i][5],
              'closeTime': ar[i][6],
              'assetVolume': ar[i][7],
              'trades': ar[i][8],
              'buyBaseVolume': ar[i][9],
              'buyAssetVolume': ar[i][10],
              'ignored': ar[i][11],
            }
          return acc
        }, [])


        // let last_tick_array = ticks[ticks.length - 1];
        // let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick_array;
        // let last_tick = {time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored}
        // let keys = Object.keys(last_tick)
        // let pre_last_tick = ticks[ticks.length - 2].reduce((acc, curr, i) => {
          // acc[keys[i]] = curr;
          // return acc;
        // }, {})
        resolve({ticks: dayData, st: req.query.timestamp, t:ticks.slice(-10), [i]: dayData, symbol})
      }
    }, {limit: computeLimit(req.query.timestamp), endTime: new Date().getTime()}));
  })
  const result = await Promise.all(promisesArray)
  res.send({result})
})

app.post('/', async (req, res) => {

  let endpoints = binance.websockets.subscriptions();
  for (let endpoint in endpoints) {
    binance.websockets.terminate(endpoint);
  }
  initBinanceSocket(req.body.timestamp);
  res.sendStatus(200);
});

function initBinanceSocket(tstamp) {
  return binance.websockets.chart(coins, tstamp, (symbol, interval, chart) => {
    io.emit('retrieve', {
      nr: coins.length,
      interval,
      symbol,
      [symbol]: chart
    });
  }, 2);
}

server.listen(PORT);

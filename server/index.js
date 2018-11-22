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
  let promisesArray = coins.map((i, index,arr) => {
    return new Promise((reso,rej) => binance.candlesticks(i, "1h", (error, ticks, symbol) => {
      if(isIterable(ticks)) {
        // console.log("candlesticks()", ticks);
        let last_tick = ticks[ticks.length - 1];
        let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
        // console.log(symbol+" last close: "+close);
        reso({[i]: {time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored}})
      }
    }, {limit: 1, endTime: new Date().getTime()}));
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
    if(tstamp == '1M' && symbol == 'GOBTC') console.log(symbol,interval, chart)
    io.emit('retrieve', {
      nr: coins.length,
      interval,
      symbol,
      [symbol]: chart
    });
  }, 10);
}

server.listen(PORT);

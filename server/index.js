const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const binance = require('node-binance-api')().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET,
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
});

/**
 * `coins` array was computed using current (11/15/2018) top200 coinmarketcap.com coin list
 * from wich were retrieved the coins that are currently trading on Binance
 * https://jsbin.com/tolureluhe/edit?html,js,output
 */
const coins = [
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


const app = express();
const server = require('http').Server(app);
const io = (module.exports.io = require('socket.io')(server));
const PORT = process.env.PORT || 3231;

app.use(express.static(`build`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const isIterable = function(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

app.get('/api/coins',  async (req, res) => {
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
        resolve({[i]: dayData, symbol})
      }
    }, {limit: req.query.limit, endTime: new Date().getTime()}));
  })
  const result = await Promise.all(promisesArray)
  res.send({result})
})

app.post('/', async (req, res) => {

  let endpoints = binance.websockets.subscriptions();
  for (let endpoint in endpoints) {
    binance.websockets.terminate(endpoint);
  }
  initBinanceSocket(req.body.timestamp, req.body.limit);
  res.sendStatus(200);
});

function initBinanceSocket(tstamp,limit) {
  return binance.websockets.chart(coins, tstamp, (symbol, interval, chart) => {
    io.emit('retrieve', {
      nr: coins.length,
      interval,
      symbol,
      [symbol]: chart
    });
  }, limit);
}

server.listen(PORT);

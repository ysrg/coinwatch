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
  'ICNBTC',
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
  'MOD',
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
    // console.log(tstamp)
    io.emit('retrieve', {
      nr: coins.length,
      interval,
      symbol,
      [symbol]: chart
    });
  });
}

server.listen(PORT);

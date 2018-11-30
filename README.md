
# [Live app](https://binancevol.herokuapp.com/)

![demo](/src/img/layout.png)

Application for tracking volume and price changes for cryptocurrencies. It was built with volume first approach in mind, as there is a saying in financial sector [that price usually follows volume or volume preceds price](https://www.investopedia.com/articles/technical/02/010702.asp). and i didnt find this kind of aplications that are traking volume changes on all timeframes. This type of services are usually used for building trading bots, but not many people can do that so this is more a user friendly app built on top of the the aforementioned tech.

You will need your own api keys from binance to make this work on your machine. The app so far uses just the Binance data, as it is the most liquid crypto exchange in the space at the moment, and most recent price changes occur here and then other exchanges follow, due mostly to bot trading.

To run the app, start the server and build your app:

#### `npm server`

#### `npm react`

```json
  "dependencies": {
    "@nivo/treemap": "^0.51.0",
    "axios": "^0.18.0",
    "body-parser": "^1.18.3",
    "cors": "^2.8.5",
    "dotenv": "^6.1.0",
    "express": "^4.16.4",
    "immutability-helper": "^2.8.1",
    "lodash": "^4.17.11",
    "node-binance-api": "^0.8.7",
    "nodemon": "^1.18.6",
    "react": "^16.6.1",
    "react-dom": "^16.6.1",
    "react-spinkit": "^3.0.0",
    "socket.io": "^2.1.1"
  }
```

### Live tracking

The app makes use of socket.io for live volume and price updates on all timeframes. It has the option to turn it on and off. The treemap graph updates accordingly.

### Cell block sizes

The block sizes have nothing to do with the price changes per se, but rather with the pct change in volume, calculated as the average of the last `n` ticks volumes divided by the current tick volume on any specific timeframe according to the schema below. Bigger blocks saw bigger spikes in volume. Tooltip show the multiples in volume change.

```json
'5m': 48
'15m': 16
'30m': 8
'1h': 5
'4h': 5
'8h': 4
'1d': 4
'1w': 2
'1M': 2
```

### Colors

Colors are specific to price pct changes from previous close

___

Still in plan to implement

- [ ] Add the option to see the volume change in relation to the circulating supply
- [ ] Add data from more exchanges
- [ ] Add a signaling service to the app, so you can be notified live for specific price and volume changes you're subscribed to
- [ ] Add checkbox options to select what coins to build the treemap

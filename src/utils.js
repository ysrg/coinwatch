export default function(state) {
    console.log('utils arr', state)
    const { symbol, interval, nr } = state
    const coinData = state[symbol]
    // console.log(symbol)
    return {[state.symbol]: coinData, nr, interval, symbol}
  }

export default function(state) {
    const { symbol, interval, nr } = state
    const coinData = state[symbol]
    return {[state.symbol]: coinData, nr, interval, symbol}
  }

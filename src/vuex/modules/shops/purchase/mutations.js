export default {
    setLast30DayChart(state, chart) {
        state.last30DayGraph = {
           ...chart
        }
    }
}
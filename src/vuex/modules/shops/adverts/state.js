const initialState = {
    allAdverts: {
        page: 0,
        limit: 25,
        list: [],
        fetchedCount: 0,
        countOfAll: 0,
        loading: true
    }
}

export default () => ({
    ...initialState,
    selectedStatus: "allAdverts"
})
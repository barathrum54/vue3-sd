export default {

    setAllLoading(state) {
        state.allAdverts.loading = true;
    },

    setAllAdverts(state, data) {
        if(data.page === 1) {
            state.allAdverts = {
                page: data.page,
                limit: data.limit,
                list: data.result,
                fetchedCount: data.count,
                countOfAll: data.countOfAll,
                loading: false
            }
        }else {
            state.allAdverts = {
                page: data.page,
                limit: data.limit,
                list: [...state.allAdverts.list, ...data.result],
                fetchedCount: state.allAdverts.fetchedCount + data.count,
                countOfAll: data.countOfAll,
                loading: false
            }
        }
    }
}
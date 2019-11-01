import stocksData from '@/data/stocks'

export default {
    state: {
        stocks: []
    },
    mutations: {
        setStocks (state, stocksParam) {
            // eslint-disable-next-line
            // console.log('mutation...setStocks...')
            state.stocks = stocksParam
        }
    },
    actions: {
        buyStock ({ commit}, order) {
            commit('buyStock', order)      // chama a mutation em portfolio.js
        },
        initStocks ({ commit }) {

            //--- aqui você poderia fazer acesso à base de dados via API

            // eslint-disable-next-line
            // console.log('initStocks...', stocksData)
            // chamar a mutation acima
            commit('setStocks', stocksData)
        }
    },
    getters: {
        stocks(state) {
            return state.stocks
        }
    }
}
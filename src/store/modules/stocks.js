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
        },
        radomizeStocks (state) {
            // eslint-disable-next-line
            console.log('entrou em stocks.js radomizeStocks')
            state.stocks.forEach(stock => {
                stock.price = Math.round(stock.price * (1 + Math.random() - 0.42))
            })
        }
    },
    actions: {
        AtualizaSaldoProjetado({ commit }, valor) {
            commit('AtualizaSaldoProjetado', valor)      // chama a mutation em portfolio.js
        },
        buyStock ({ commit}, order) {
            commit('buyStock', order)      // chama a mutation em portfolio.js
        },
        initStocks ({ commit }) {

            //--- aqui você poderia fazer acesso à base de dados via API

            // eslint-disable-next-line
            // console.log('initStocks...', stocksData)
            // chamar a mutation acima
            commit('setStocks', stocksData)
        },
        radomizeStocks ({ commit }) {
            commit('radomizeStocks')
        }
    },
    getters: {
        stocks(state) {
            return state.stocks
        }
    }
}
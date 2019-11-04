export default {
    state: {
        funds: 10000,
        fundsProjetado: 10000,
        stocks: []
    },
    mutations: {
        AtualizaSaldoProjetado(state, valor) {
            state.fundsProjetado -= valor
        },
        buyStock(state, {stockId, quantity, stockPrice}) {
            // vefrificar se existe a ação já exstente no estoque do portfolio.
            // Caso exista, adicionar, senão incluir a ação.
            const record = state.stocks.find( elemento => elemento.id == stockId)
            if (record) {
                record.quantity += quantity
            } else {
                state.stocks.push ({
                    id: stockId,
                    quantity: quantity
                })
            }
            state.funds -= quantity * stockPrice
            state.fundsProjetado = state.funds
            // eslint-disable-next-line
            // console.log('Atualizando saldo...', state.funds, state.fundsProjetado)
        },
        sellStock(state, {stockId, quantity, stockPrice}) {
            const record = state.stocks.find( elemento => elemento.id == stockId)
            if (record.quantity > quantity) {
                record.quantity -= quantity
            } else {
                const indice = state.stocks.indexOf(record) // índice do elemento a ser excluído
                state.stocks.splice(indice, 1)
            }
            state.funds += quantity * stockPrice
            state.fundsProjetado = state.funds
        },
        alterarSaldo(state, valor) {
            state.funds = valor
            state.fundsProjetado = valor
        },
        setPortfolio(state, portfolio) {
            state.funds = portfolio.funds
            state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : []
            state.fundsProjetado = state.funds
        }
    },
    actions: {
        sellStock({ commit }, order) {
            commit('sellStock', order)
        },
        alterarSaldo({ commit }, saldo) {
            commit('alterarSaldo', saldo)
        }
    },
    getters: { 
        // o segundo parâmetro, getters, equivale à lista de TODOS os getters, inclusive os definidos
        // em stocks.js. Logo, teremos acesso ao array das ações cadastradas. Com isso podemos acessar
        // o nome da ação para o preenchimento do portfólio, uma vez que o portfólio só guarda os 
        // dados ID e quantidade.
        stockPortfolio(state, getters) {
            return state.stocks.map( e => {
                // o parâmetro .stocks abaixo equivale a lista de ações cadastradas
                const record = getters.stocks.find(element => element.id == e.id)
                return {
                    id: e.id,
                    quantity: e.quantity,
                    name: record.name,
                    price: record.price
                }
            })
        },
        funds(state) {
            return state.funds
        },
        fundsProjetado(state) {
            return state.fundsProjetado
        }
    }
}
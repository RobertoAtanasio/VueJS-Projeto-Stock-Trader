<template>
    <v-layout row wrap>
        <Stock v-for="stock in stocks" :key="stock.id" :stock="stock"/>
    </v-layout>
</template>

<script>
import Stock from './Stock'
export default {
    components: { Stock },
    computed: {
        stocks() {
            // a inicialização está sendo feita quando do created do componente App.vue
            // Inicializar as ações:
            // this.$store.dispatch('initStocks')

            // eslint-disable-next-line
            // console.log('Stocks.vue...computed...stocks')
            return this.$store.getters.stocks2
        }
    },
    // data() {
    //     return {
    //         stocks: [
    //             { id: 1, name: 'BMW', price: 110},
    //             { id: 2, name: 'Google', price: 200},
    //             { id: 3, name: 'Apple', price: 280},
    //             { id: 4, name: 'Twitter', price: 83}
    //         ]
    //     }
    // }
}
</script>

<style>
    
</style>
<template>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase mr-4">
            <span>Stock</span>
            <span class="font-weight-light">Trader</span>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn flat to="/">Início</v-btn>
            <v-btn flat to="/portfolio">Portfólio</v-btn>
            <v-btn flat to="/stocks">Ações</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn flat @click="endDay">Finalizar Dia</v-btn>
            <v-menu offset-y>
                <v-btn flat slot="activator">Salvar & Carregar</v-btn>
                <v-list>
                    <v-list-tile @click="saveData">
                        <v-list-tile-title>Salvar Dados</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="loadDataLocal">
                        <v-list-tile-title>Carregar Dados</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-layout align-center>
                <span class="text-uppercase grey--text text-darken-2">
                    Saldo: {{ funds | currency }} Projetado: {{ fundsProjetado | currency}}
                </span>
            </v-layout>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
// loadData está em actions.js
// radomizeStocks está em stocks.js
// Utilizando o ...mapActions este componente terá acesso direto a essas actions
import { mapActions} from 'vuex'
export default {
    computed: {
        funds() {
            return this.$store.getters.funds
        },
        fundsProjetado() {
            return this.$store.getters.fundsProjetado
        }
    },
    methods: {
        ...mapActions(['radomizeStocks', 'loadData']),
        endDay() {
            this.radomizeStocks()
        },
        saveData() {
            const { funds, stockPortfolio, stocks2 } = this.$store.getters
            const stocks = {...stocks2}
            // atualizar o banco de dados firebase
            this.$http.put('data.json', { funds, stockPortfolio, stocks })
        },
        loadDataLocal() {
            this.loadData()
        }
    },
}
</script>

<style>
    
</style>
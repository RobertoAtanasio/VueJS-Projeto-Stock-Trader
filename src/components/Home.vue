<template>
    <div>
        <h1 class="display-3 font-weight-light mb-4">Negocie e Consulte suas Ações</h1>
        <!-- pa-2 ==> padding all de 2. Pode-se colocar a cor em color="primary" -->
        <v-sheet :elevation="10" class="pa-2 primary">
            <v-icon class="white--text mr-3">info</v-icon>
            <span class="headline white--text font-weight-light">
                Você pode Salvar & Carregar os Dados
            </span>
        </v-sheet>
        <v-sheet :elevation="10" class="pa-2 success darken-3 mt-2">
            <v-icon class="white--text mr-3">info</v-icon>
            <span class="headline white--text font-weight-light">
                Click em 'Finalizar Dia' para inciar um novo dia!
            </span>
        </v-sheet>
        <!-- margem no eixo Y, tanto top como bottom -->
        <v-divider class="my-4"></v-divider>
        <p class="display-1"><strong class="mr-2">Seu Saldo:</strong> {{ funds | currency}} </p>

        <v-card>
            <v-container fill-height>
                <v-text-field label="Saldo" type="number" v-model.number="quantity"/>
                <v-btn class="green darken-3 white--text"
                    @click="alterarSaldo">
                    Alterar Saldo
                </v-btn>
            </v-container>
        </v-card>

        <!-- <v-card>
            <v-container fill-height>
                <Stocks />
            </v-container>
        </v-card>

        <v-card>
            <v-container fill-height>
                <Portfolio />
            </v-container>
        </v-card> -->
        
    </div>
</template>

<script>
// import Stocks from '@/components/stocks/Stocks'
// import Portfolio from '@/components/portfolio/Portfolio'
export default {
    // components: { Stocks, Portfolio },
    data() {
        return {
            quantity: this.$store.getters.funds
        }
    },
    computed: {
        funds() {
            return this.$store.getters.funds
        }
    },
    methods: {
        alterarSaldo() {
            this.$store.dispatch('alterarSaldo', this.quantity)  // dispara a ação em portfolio.js
        }
    }
}
</script>

<style>
    
</style>
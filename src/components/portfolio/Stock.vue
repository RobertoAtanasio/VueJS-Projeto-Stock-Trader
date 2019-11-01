<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card class="blue darken-3 white--text">
            <v-card-title class="headline">
                <strong>
                    {{ stock.name }} 
                    <small>
                        (Preço: {{ stock.price }} | Qtde: {{ stock.quantity }})
                    </small>
                </strong>
            </v-card-title>
        </v-card>
        <v-card>
            <v-container fill-height>
                <v-text-field label="Quantidade" type="number" v-model.number="quantity"/>
                <v-btn class="blue darken-3 white--text"
                    @click="sellStock"
                    :disabled="quantity <= 0 || !Number.isInteger(quantity)">Vender</v-btn>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0
        }
    },
    methods: {
        ...mapActions({sellStockAction: 'sellStock'}),
        sellStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity
            }
            this.sellStockAction(order)                     // dispara a ação de portfolio.js
            // this.$store.dispatch('sellStock', order)     // dispara a ação de portfolio.js
            this.quantity = 0
        }
    },
}
</script>

<style>
    
</style>
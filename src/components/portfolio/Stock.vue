<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card class="blue darken-3 white--text">
            <v-card-title class="headline">
                <strong>
                    {{ stockLido.name }} 
                    <small>
                        (Preço: {{ stockLido.price | currency }} | Qtde: {{ stockLido.quantity }})
                    </small>
                </strong>
            </v-card-title>
        </v-card>
        <v-card>
            <v-container fill-height>
                <v-text-field label="Quantidade" type="number" 
                    :error="insufficientQuatity"    
                    v-model.number="quantity"/>
                <v-btn class="blue darken-3 white--text"
                    @click="sellStock"
                    :disabled="insufficientQuatity">
                    {{ quantity > stockLido.quantity ? 'Insuficiente' : 'Vender'}} </v-btn>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['stockLido'],
    data() {
        return {
            quantity: 0
        }
    },
    methods: {
        ...mapActions({sellStockAction: 'sellStock'}),
        sellStock() {
            const order = {
                stockId: this.stockLido.id,
                stockPrice: this.stockLido.price,
                quantity: this.quantity
            }
            this.sellStockAction(order)                     // dispara a ação de portfolio.js
            // this.$store.dispatch('sellStock', order)     // dispara a ação de portfolio.js
            this.quantity = 0
        }
    },
    computed: {
        insufficientQuatity() {
            return this.quantity <= 0 
                || !Number.isInteger(this.quantity) 
                || this.quantity > this.stockLido.quantity
        }
    },
}
</script>

<style>
    
</style>
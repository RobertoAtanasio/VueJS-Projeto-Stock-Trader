<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card class="green darken-3 white--text">
            <v-card-title class="headline">
                <strong>{{ stock.name }} 
                    <small>
                        (Preço: {{ stock.price | currency }} | Qtde: {{ qtdMax }})
                    </small>
                </strong>
            </v-card-title>
        </v-card>
        <v-card>
            <v-container fill-height>
                <v-text-field label="Quantidade" type="number" 
                    :error="quantity < 0 || !Number.isInteger(quantity) || insufficientFounds"
                    v-model.number="quantity"/>
                <v-btn class="green darken-3 white--text"
                    @click="buyStock"
                    :disabled="quantity <= 0 || !Number.isInteger(quantity) || insufficientFounds">
                    {{ insufficientFounds ? 'Insuficiente' : 'Comprar'}}
                </v-btn>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0,
            valorCompraAnterior: 0
        }
    },
    watch: {
        quantity(to) {
            if (to == 0) {
                const valor = this.getValorCompraAnterior()
                this.setValorCompraAnterior(0)
                this.$store.dispatch('AtualizaSaldoProjetado', -valor)      // chama action em stocks.js
                // eslint-disable-next-line
                // console.log("to before ...", to, before, valor)
            }
        }
    },
    computed: {
        qtdMax() {
            // return this.calcularQtdMaximaPermitida()
            let qtde = 1
            while (!(qtde * this.stock.price > this.funds)) {
                qtde++
            }
            qtde -= 1
            return qtde
        },
        funds() {
            return this.$store.getters.funds
        },
        fundsProjetado() {
            return this.$store.getters.fundsProjetado
        },
        insufficientFounds() {

            // eslint-disable-next-line
            // console.log("Testando insufficientFounds...")

            if (this.quantity > this.qtdMax) {
                // alert("Quantidade máxima permitida: " + this.qtdMax)
                return true
            } else {
                
                const valorCompra = this.quantity * this.stock.price 
                const compraPendenteAnt = this.getValorCompraAnterior()
                this.setValorCompraAnterior(valorCompra)
                let valorcalc = valorCompra - compraPendenteAnt

                // if (valorcalc === 0 && compraPendenteAnt > 0 ) {
                //     // valorcalc = compraPendenteAnt
                //     // eslint-disable-next-line
                //     console.log("Saldo projetado deve ser alterado...")
                // }

                // --- atualizar o saldo projetado antes de salvar
                this.$store.dispatch('AtualizaSaldoProjetado', valorcalc)   // dispara a ação em stocks.js

                // eslint-disable-next-line
                // console.log("valorcalc:", valorcalc, valorCompra, compraPendenteAnt)

                // let saldoAtual = this.funds
                // let compraPendente = this.$store.getters.valorCompra
                // if (saldoAtual !== (saldoAtual - compraPendente)) {
                //     // eslint-disable-next-line
                //     console.log("Saldo comprometido...", saldoAtual, compraPendente)
                // }

                return false
            }

            // const valorCompra = this.quantity * this.stock.price
            // const insuficiente = valorCompra > this.funds
            // if (!insuficiente) {
            //     this.$store.dispatch('atualizarSaldo', valorCompra)
            // } else {
            //     alert("Quantidade máxima permitida: " + this.qtdMax)
            // }
            // return insuficiente
            // // return valorCompra > this.funds
        }
    },
    methods: {
        buyStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity
            }
            this.$store.dispatch('buyStock', order)  // dispara a ação em stocks.js
            this.quantity = 0
            this.valorCompraAnterior = 0
        },
        setValorCompraAnterior(valor) {
            this.valorCompraAnterior = valor
        },
        getValorCompraAnterior() {
            return this.valorCompraAnterior
        }
        // calcularQtdMaximaPermitida() {
        //     let qtde = 1
        //     while (!(qtde * this.stock.price > this.funds)) {
        //         qtde++
        //     }
        //     qtde -= 1
        //     // /* eslint-disable-next-line */
        //     // console.log("Qtde Máxima:", qtde)
        //     return qtde
        // }
    },
}
</script>

<style>
</style>
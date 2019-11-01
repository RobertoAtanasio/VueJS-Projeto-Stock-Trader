<template>
    <v-app>
      <Header />
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: { Header },
  created() {
    // inicializar as ações
    this.$store.dispatch('initStocks')
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style></style>

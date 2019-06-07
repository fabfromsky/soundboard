<template>
  <div id="app">
    <Board/>
  </div>
</template>

<script>
import Board from './pages/Board.vue'

export default {
  name: 'app',
  components: {
    Board
  }
}
</script>

<style lang="scss">
html {
  background: #f2f5f7;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

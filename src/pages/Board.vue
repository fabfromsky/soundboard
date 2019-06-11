<template>
<div class="grid">
  <bouton
    v-for="(sound, i) in sounds"
    :key="i"
    :sound="sound"
    :index="i"/>
</div>
</template>

<script>
import { get as _get } from 'lodash'
import bouton from '../components/bouton'
import { orderBy as _orderBy } from 'lodash'
export default {
  name: 'Board',
  components: {bouton},
  data() {
    return {
      sounds: [],
      isPlaying: false
    }
  },
  mounted () {
    fetch('../sounds.json')
      .then(function(res) {
        return res.json().then(function(data) {
          this.sounds = _orderBy(data, 'label')
        }.bind(this))
      }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
  .grid {
    text-align: left;
  }
</style>



<template>
<div v-if="sound" >
  <div> {{ sound.label }}</div>
  <audio controls>
    <source :src="`/sounds/${sound.src}`" />
  </audio>
</div>
</template>

<script>
import _orderBy from 'lodash/orderBy'
import _find from 'lodash/find'

export default {
  name: 'Sound',
  props: {
    soundId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      allSounds: []
    }
  },
  mounted () {
    fetch('../sounds.json')
      .then(function (res) {
        res.json().then(function (data) {
          this.allSounds = _orderBy(data, 'label')
        }.bind(this))
      }.bind(this))
  },
  computed: {
    sound () {
      return _find(this.allSounds, (sound) => {
        return sound.id.toString() === this.soundId
      })
    }
  }
}
</script>

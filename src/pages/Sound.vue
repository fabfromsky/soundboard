<template>
  <div v-if="sound">
    <div> {{ sound.label }}</div>
    <audio controls>
      <source :src="`/sounds/${sound.src}`">
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
      required: true,
    },
  },
  data() {
    return {
      allSounds: [],
    }
  },
  computed: {
    sound() {
      return _find(this.allSounds, (sound) => {
        return sound.id.toString() === this.soundId
      })
    },
  },
  mounted() {
    fetch('../sounds.json')
      .then((res) => {
        res.json().then((data) => {
          this.allSounds = _orderBy(data, 'label')
        })
      })
  },
}
</script>

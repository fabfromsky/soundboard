<template>
  <div class="sound">
    <audio controls :id="index" @play="isPlaying = true" @pause="isPlaying = false">
      <source :src="`/sounds/${sound.src}`" />
    </audio>
    <button @click="toggle(index)">
      {{ sound.label }}
    </button>
    <div
      class="stop"
      @click="toggle(index)">
      <div :class="{ 'is-playing': isPlaying }" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'bouton',
  props: {
    sound: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isPlaying: false
    }
  },
  methods: {
    play(id) {
      document.getElementById(id).play()
    },
    stop(id) {
      document.getElementById(id).pause()
      document.getElementById(id).currentTime = 0
    },
    toggle(id) {
      this.isPlaying ? this.stop(id) : this.play(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.sound {
  display: inline-block;
  vertical-align: middle;
  margin: 20px 20px;
}
button {
  color: white;
  font-weight: bold;
  text-transform: capitalize;
  height: 60px;
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: #555;
  border: none;
  padding-left: 20px;
}

.stop {
  width: 60px;
  height: 60px;
  background: #555;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding: 20px;

  > div {
    width: 0;
    height: 0;
    border-left: 10px solid white;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    display: block;
    transition: all 0.5s;

    &.is-playing {
      border-bottom: 10px solid white;
      border-top: 10px solid white;
      border-right: 10px solid white;
      transition: all 0.5s;
    }
  }
}

audio {
  display: none;
}
</style>


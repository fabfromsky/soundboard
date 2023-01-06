<template>
  <div class="sound">
    <button @click="toggle(props.index)">
      {{ props.sound.label }}
    </button>
    <div
      class="stop"
      @click="toggle(props.index)"
    >
      <div :class="{ 'is-playing': isPlaying }" />
    </div>
    <audio
      :id="props.index"
      controls
      :class="{ 'is-playing': isPlaying }"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    >
      <source :src="`/sounds/${props.sound.src}`">
    </audio>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sound: Object
  index: Number
}>()

const isPlaying = $ref(false)

function play(id) {
  document.getElementById(id).play()
}

function stop(id) {
  document.getElementById(id).pause()
  document.getElementById(id).currentTime = 0
}

function toggle(id) {
  isPlaying ? stop(id) : play(id)
}
</script>

<style lang="scss" scoped>
.sound {
  display: inline-block;
  vertical-align: middle;
  margin: 30px 20px;
  position: relative;
  border-radius: 5px;
  border: 2px solid white;

  &:hover, &:focus {
    border-color: #0e1e24;
    cursor: pointer;
  }
}

button {
  color: #0e1e24;
  font-weight: bold;
  text-transform: capitalize;
  height: 60px;
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: white;
  border: none;
  padding-left: 20px;

  &:focus {
    outline: none;
  }

}

.stop {
  width: 60px;
  height: 60px;
  background: white;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding: 20px;
  border-left: 1px solid #0e1e24;

  > div {
    width: 0;
    height: 0;
    border-left: 10px solid #0e1e24;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    display: block;
    transition: all 0.5s;

    &.is-playing {
      border-bottom: 10px solid #0e1e24;
      border-top: 10px solid #0e1e24;
      border-right: 10px solid #0e1e24;
      transition: all 0.5s;
    }
  }
}

audio {
  visibility: hidden;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;

  &.is-playing {
    visibility: visible;
  }
}
</style>

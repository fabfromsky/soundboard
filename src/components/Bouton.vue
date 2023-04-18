<template>
  <div class="sound">
    <button style="width: 60px; border-right: 1px solid;" @click="copyURL(props.sound.src)">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
      </svg>
    </button>
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
import type { MySound } from '~/types/MySound'

const props = defineProps<{
  sound: MySound
  index: number
}>()

const isPlaying = ref(false)

function play(id) {
  document.getElementById(id).play()
}

function stop(id) {
  document.getElementById(id).pause()
  document.getElementById(id).currentTime = 0
}

function toggle(id) {
  isPlaying.value ? stop(id) : play(id)
}

async function copyURL(mytext) {
  try {
    const url = `/sounds/${mytext}`
    const imageUrl = new URL(url, import.meta.url)
    await navigator.clipboard.writeText(imageUrl).href
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<style lang="scss" scoped>
.sound {
  background-color: white;
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
  top: 65px;
  left: 0;
  width: 100%;

  &.is-playing {
    visibility: visible;
  }
}
</style>

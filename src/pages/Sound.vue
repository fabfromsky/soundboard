<template>
  <div v-if="sound">
    <div> {{ sound.label }}</div>
    <audio controls>
      <source :src="`/sounds/${sound.src}`">
    </audio>
  </div>
</template>

<script setup lang="ts">
import _orderBy from 'lodash/orderBy'
import _find from 'lodash/find'
import { onMounted } from 'vue'

const props = defineProps<{
  soundId: String
}>()

let allSounds = $ref([])

const sound = $computed(() => {
  return _find(allSounds, (oneSound) => {
    return oneSound.id.toString() === props.soundId
  })
})

onMounted(() => {
  fetch('../sounds.json')
    .then((res) => {
      res.json().then((data) => {
        allSounds = _orderBy(data, 'label')
      })
    })
})
</script>

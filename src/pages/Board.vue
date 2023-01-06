<template>
  <div class="search-tools">
    <input v-model="search" type="text" placeholder="rechercher">
    <select v-model="selectedCategory">
      <option value="null">
        tous
      </option>
      <option
        v-for="(category, i) in categories"
        :key="i"
        :value="categories[i]"
      >
        {{ categories[i] }}
      </option>
    </select>
  </div>
  <div class="grid">
    <Bouton
      v-for="(sound, j) in allSounds"
      v-show="showSoundOnSelect(sound)"
      :key="j"
      :sound="sound"
      :index="j"
    />
  </div>
</template>

<script setup lang="ts">
import _uniq from 'lodash/uniq'
import _orderBy from 'lodash/orderBy'
import _concat from 'lodash/concat'
import _includes from 'lodash/includes'
import { onMounted } from 'vue'

let allSounds = $ref([])
let categories = $ref([])
const selectedCategory = $ref(null)
const search = $ref(null)
function getCategories(data) {
  let categories = []
  data.forEach((datum) => {
    categories = _concat(categories, ...datum.categories)
  })
  return _uniq(categories)
}

function showSoundOnSelect(sound) {
  if ((search !== null && search !== ''))
    return inputIntoSelectOrNot(sound)
  else if ((selectedCategory === 'null' || selectedCategory === null))
    return true
  else return _includes(sound.categories, selectedCategory)
}

function inputIntoSelectOrNot(sound) {
  if (selectedCategory !== 'null' && selectedCategory !== null)
    return (_includes(sound.categories, selectedCategory) && (_includes(sound.label, search.toLowerCase()) || _includes(sound.src, search.toLowerCase())))
  else
    return _includes(sound.label, search.toLowerCase()) || _includes(sound.src, search.toLowerCase())
}

onMounted(() => {
  fetch('../sounds.json')
    .then((res) => {
      res.json().then((data) => {
        allSounds = _orderBy(data, 'label')
        categories = getCategories(data)
      })
    })
})
</script>

<style lang="scss" scoped>
.search-tools {
  text-align: center;

  select {
    color: #0e1e24;
    font-weight: bold;
    text-transform: capitalize;
    height: 60px;
    width: 200px;
    background: white;
    border: 2px solid white;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 5px;
    margin-left: 20px;
    box-sizing: border-box;

    &:hover,
    &:focus {
      outline: none;
      border: 2px solid #0e1e24;
      cursor: pointer;
    }
  }

  input {
    margin-right: 20px;
    color: #0e1e24;
    font-weight: bold;
    text-transform: capitalize;
    height: 60px;
    width: 200px;
    background: white;
    border: 2px solid white;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 5px;
    box-sizing: border-box;

    &:hover,
    &:focus {
      outline: none;
      border: 2px solid #0e1e24;
      cursor: text;
    }
  }
}

.grid {
  text-align: center;
}
</style>

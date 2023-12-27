<template>
  <div class="search-tools">
    <input v-model="search" type="search" placeholder="rechercher">
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
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import type { MySound } from '~/types/MySound'

const allSounds: Ref<MySound[]> = ref([])
const categories: Ref<string[]> = ref([])
const selectedCategory = ref(null)
const search = ref(null)
function getCategories(data: MySound[]): string[] {
  let categories: string[] = []
  data.forEach((datum) => {
    categories = _concat(categories, ...datum.categories)
  })
  return _uniq(categories)
}

function showSoundOnSelect(sound: MySound) {
  if ((search.value !== null && search.value !== ''))
    return inputIntoSelectOrNot(sound)
  else if ((selectedCategory.value === 'null' || selectedCategory.value === null))
    return true
  else return _includes(sound.categories, selectedCategory.value)
}

function inputIntoSelectOrNot(sound: MySound) {
  if (selectedCategory.value !== 'null' && selectedCategory.value !== null)
    return (_includes(sound.categories, selectedCategory.value) && (_includes(sound.label, search.value.toLowerCase()) || _includes(sound.src, search.value.toLowerCase())))
  else
    return _includes(sound.label, search.value.toLowerCase()) || _includes(sound.src, search.value.toLowerCase())
}

function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(response.statusText)

      return response.json() as Promise<T>
    })
}

onMounted(() => {
  api<MySound[]>('../sounds.json')
    .then((res) => {
      allSounds.value = _orderBy<MySound>(res, 'label')
      categories.value = getCategories(res)
    })
})
</script>

<style scoped>
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

  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    margin-left: .4em;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
    cursor: pointer;
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

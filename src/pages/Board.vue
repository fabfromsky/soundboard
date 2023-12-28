<template>
  <div class="search-tools">
    <input v-model="search" type="search" placeholder="rechercher">
    <select v-model="selectedCategory">
      <option value="tous">
        tous
      </option>
      <option
        v-for="category in categories"
        :key="category"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
  </div>
  <div class="grid">
    <template
      v-for="(sound) in allSounds"
      :key="sound.id"
    >
      <Bouton
        v-show="showSoundOnSelect(sound)"
        :sound="sound"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { MySound } from '~/types/MySound'

const allSounds = ref<MySound[]>([])
const categories = ref<string[]>([])

const selectedCategory = ref('tous')
const search = ref('')

function getCategories(data: MySound[]): string[] {
  let categories: string[] = []
  data.forEach((datum) => {
    categories = [...categories, ...datum.categories]
  })
  return Array.from(new Set(categories))
}

function showSoundOnSelect(sound: MySound) {
  if (search.value !== '')
    return inputIntoSelectOrNot(sound)
  else if (selectedCategory.value === 'tous')
    return true
  else
    return sound.categories.includes(selectedCategory.value)
}

function inputIntoSelectOrNot(sound: MySound) {
  const isSearchMatch = (field: string) => field.toLowerCase().includes(search.value.toLowerCase())
  const isCategoryMatch = () => sound.categories.includes(selectedCategory.value)

  if (selectedCategory.value !== 'tous')
    return isCategoryMatch() && (isSearchMatch(sound.label) || isSearchMatch(sound.src))
  else
    return isSearchMatch(sound.label) || isSearchMatch(sound.src)
}

async function api<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok)
    throw new Error(`HTTP error! status: ${response.status}`)

  const data = await response.json()
  return data as T
}

function sortArrayByField<T>(array: T[], fieldName: keyof T): T[] {
  return array.slice().sort((a, b) => {
    const fieldA = String(a[fieldName]).toLowerCase()
    const fieldB = String(b[fieldName]).toLowerCase()

    if (fieldA < fieldB)
      return -1

    if (fieldA > fieldB)
      return 1

    return 0
  })
}

onMounted(() => {
  api<MySound[]>('/sounds.json')
    .then((res) => {
      allSounds.value = sortArrayByField(res, 'label')
      categories.value = getCategories(res)
    })
    .catch((error) => {
      console.error('Error fetching sounds:', error)
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

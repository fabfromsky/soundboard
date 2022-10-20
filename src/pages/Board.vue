<template>
  <div>
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
  </div>
</template>

<script>
import _uniq from 'lodash/uniq'
import _orderBy from 'lodash/orderBy'
import _concat from 'lodash/concat'
import _includes from 'lodash/includes'
import Bouton from '@/components/Bouton.vue'

export default {
  name: 'Board',
  components: { Bouton },
  data() {
    return {
      allSounds: [],
      categories: [],
      selectedCategory: null,
      search: null,
    }
  },
  mounted() {
    fetch('../sounds.json')
      .then((res) => {
        res.json().then((data) => {
          this.allSounds = _orderBy(data, 'label')
          this.categories = this.getCategories(data)
        })
      })
  },
  methods: {
    getCategories(data) {
      let categories = []
      data.forEach((datum) => {
        categories = _concat(categories, ...datum.categories)
      })
      return _uniq(categories)
    },
    showSoundOnSelect(sound) {
      if ((this.search !== null && this.search !== ''))
        return this.inputIntoSelectOrNot(sound)
      else if ((this.selectedCategory === 'null' || this.selectedCategory === null))
        return true
      else return _includes(sound.categories, this.selectedCategory)
    },
    inputIntoSelectOrNot(sound) {
      if (this.selectedCategory !== 'null' && this.selectedCategory !== null)
        return (_includes(sound.categories, this.selectedCategory) && (_includes(sound.label, this.search.toLowerCase()) || _includes(sound.src, this.search.toLowerCase())))
      else
        return _includes(sound.label, this.search.toLowerCase()) || _includes(sound.src, this.search.toLowerCase())
    },
  },
}
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

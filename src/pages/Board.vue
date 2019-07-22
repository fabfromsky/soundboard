<template>
<div>
  <div class="search-tools" v-on:change="filter">
    <input type="text" v-model="search" placeholder="rechercher" />
    <select v-model="selectedCategory">
      <option value='null'>
        tous
      </option>
      <option
        v-for="(category, i) in categories"
        :key="i"
        :value="categories[i]">
        {{ categories[i] }}
      </option>
    </select>
  </div>
  <div class="grid">
    <bouton
      v-for="(sound, i) in allSounds"
      v-show="filteredSounds.includes(sound)"
      :key="i"
      :index="i"
      :sound="sound" />
  </div>
</div>
</template>

<script>
import { get as _get, uniq as _uniq, concat as _concat, filter as _filter, includes as _includes } from 'lodash'
import bouton from '../components/bouton'
import { orderBy as _orderBy } from 'lodash'
export default {
  name: 'Board',
  components: {bouton},
  data() {
    return {
      allSounds: [],
      filteredSounds: [],
      isPlaying: false,
      categories: [],
      selectedCategory: null,
      search: null
    }
  },
  mounted () {
    fetch('../sounds.json')
      .then(function(res) {
        res.json().then(function(data) {
          this.filteredSounds = this.allSounds = _orderBy(data, 'label')
          this.categories = this.getCategories(data)
        }.bind(this))
      }.bind(this))
  },
  methods: {
    getCategories (data) {
      let categories = []
      data.forEach((datum) => {
        categories = _concat(categories, ...datum.categories)
      })
      return _uniq(categories)
    },
    filter (val) {
      return _filter(this.allSounds, (sound) => {
        let filteredCategories = []
        sound.categories.forEach((categorie) => {
          if (categorie.includes(val)) {
            filteredCategories.push(categorie)
          }
        })
        return sound.label.includes(val) || sound.src.includes(val) || filteredCategories.length > 0
      })

    }
  },
  watch: {
    selectedCategory(val) {
      this.filteredSounds = val !== 'null' ? _filter(this.allSounds, (sound) => _includes(sound.categories, this.selectedCategory)) : this.allSounds
    },
    search(val) {
      if(val !== null && val !== "") {
        this.filteredSounds = this.filter(val)
      } else {
        this.filteredSounds = this.allSounds
      }
    }
  }
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
    border: none;
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
    border: none;
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



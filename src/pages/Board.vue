<template>
<div>
  <div class="search-tools">
    <!-- <input type="text" placeholder="rechercher" /> -->
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
      v-for="(sound, i) in filteredSounds"
      :key="i"
      :sound="sound"
      :index="i"/>
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
      selectedCategory: null
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
    }
  },
  watch: {
    selectedCategory(val) {
      this.filteredSounds = val !== 'null' ? _filter(this.allSounds, (sound) => _includes(sound.categories, this.selectedCategory)) : this.allSounds
    }
  }
}
</script>

<style lang="scss" scoped>
.search-tools {
  margin-left: 20px;

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

    &:hover,
    &:focus {
      outline: none;
      border: 2px solid #0e1e24;
      cursor: pointer;
    }
  }
}
.grid {
  text-align: left;
}
</style>



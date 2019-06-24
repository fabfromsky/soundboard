<template>
<div>
  <div class="search-tools">
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
      v-for="(sound, j) in allSounds"
      v-show="showSoundOnSelect(sound)"
      :key="j"
      :sound="sound"
      :index="j"/>
  </div>
</div>
</template>

<script>
import { get as _get, uniq as _uniq, concat as _concat, filter as _filter, includes as _includes, orderBy as _orderBy } from 'lodash'
import bouton from '../components/bouton'

export default {
  name: 'Board',
  components: { bouton },
  data () {
    return {
      allSounds: [],
      categories: [],
      selectedCategory: null,
      search: null
    }
  },
  mounted () {
    fetch('../sounds.json')
      .then(function (res) {
        res.json().then(function (data) {
          this.allSounds = _orderBy(data, 'label')
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
    showSoundOnSelect (sound) {
      if ((this.search !== null && this.search !== '')) {
        return this.inputIntoSelectOrNot(sound)
      } else if ((this.selectedCategory === 'null' || this.selectedCategory === null)) {
        return true
      } else return _includes(sound.categories, this.selectedCategory)
    },
    inputIntoSelectOrNot (sound) {
      if (this.selectedCategory !== 'null' && this.selectedCategory !== null) {
        return (_includes(sound.categories, this.selectedCategory) && (sound.label.includes(this.search.toLowerCase()) || sound.src.includes(this.search.toLowerCase())))
      } else {
        return sound.label.includes(this.search.toLowerCase()) || sound.src.includes(this.search.toLowerCase())
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
    background: white;
    border: 2px solid white;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 5px;
    margin-left: 30px;
    box-sizing: border-box;

    &:hover,
    &:focus {
      outline: none;
      border: 2px solid #0e1e24;
      cursor: pointer;
    }
  }

  input {
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
  text-align: left;
}
</style>

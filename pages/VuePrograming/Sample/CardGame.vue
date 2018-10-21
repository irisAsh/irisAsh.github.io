<template>
  <div>
    <h1>カードゲーム</h1>
    <button @click='start'>start</button>
    <div>
      <div class="row">
        <card v-for="type in display.slice(0, 4)" :key="type.mark + '_' + type.number" :type="type" :ref="'card_' + type.mark + '_' + type.number" @check="checkCards"/>
      </div>
      <div class="row">
        <card v-for="type in display.slice(4, 8)" :key="type.mark + '_' + type.number" :type="type" :ref="'card_' + type.mark + '_' + type.number" @check="checkCards"/>
      </div>
      <div class="row">
        <card v-for="type in display.slice(8, 12)" :key="type.mark + '_' + type.number" :type="type" :ref="'card_' + type.mark + '_' + type.number" @check="checkCards"/>
      </div>
      <div class="row">
        <card v-for="type in display.slice(12, 16)" :key="type.mark + '_' + type.number" :type="type" :ref="'card_' + type.mark + '_' + type.number" @check="checkCards"/>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/CardGame/Card'

export default {
  components: {
    Card
  },
  data: function () {
    return {
      cards: [
        { number: 1, mark: 1 },
        { number: 2, mark: 1 },
        { number: 3, mark: 1 },
        { number: 4, mark: 1 },
        { number: 5, mark: 1 },
        { number: 6, mark: 1 },
        { number: 7, mark: 1 },
        { number: 8, mark: 1 },
        { number: 1, mark: 2 },
        { number: 2, mark: 2 },
        { number: 3, mark: 2 },
        { number: 4, mark: 2 },
        { number: 5, mark: 2 },
        { number: 6, mark: 2 },
        { number: 7, mark: 2 },
        { number: 8, mark: 2 }
      ],
      display: [],
      showedCards: []
    }
  },
  methods: {
    start: function () {
      var shuffle = this.cards.concat()
      for (var i = shuffle.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1))
        var tmp = shuffle[i]
        shuffle[i] = shuffle[r]
        shuffle[r] = tmp
      }
      this.display = shuffle
      for (var type of shuffle) {
        var child = this.getCardRef(type)
        if (child) {
          child[0].close()
        }
      }
    },
    checkCards: function (type) {
      if (this.showedCards.length === 0) {
        this.showedCards = [type]
      } else if (this.showedCards.length === 1) {
        if (this.showedCards[0].number === type.number) {
          this.showedCards = []
        } else {
          this.showedCards.push(type)
        }
      } else {
        for (var card of this.showedCards) {
          this.getCardRef(card)[0].close()
        }
        this.showedCards = [type]
      }
    },
    getCardRef: function (type) {
      return this.$refs['card_' + type.mark + '_' + type.number]
    }
  }
}
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
}
</style>

<template>
  <div>
    <div v-if="opened" class="front">
      <i :class="[cardMark, cardColor]"/>
      <p :class="cardColor">{{ type.number }}</p>
    </div>
    <div v-else class="back" @click="open()">
      <div class="pattern">
        <i class="fab fa-vuejs pattern-mark"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['type'],
  data: function () {
    return {
      opened: false,
      fixed: false
    }
  },
  computed: {
    cardMark: function () {
      if (this.type.mark === 1) {
        return 'fab fa-pagelines'
      } else {
        return 'fas fa-leaf'
      }
    },
    cardColor: function () {
      if (this.type.mark === 1) {
        return 'black-mark'
      } else {
        return 'red-mark'
      }
    }
  },
  methods: {
    open () {
      this.opened = true
      this.$emit('check', this.type)
    },
    close () {
      this.opened = false
    }
  }
}
</script>

<style>
.front {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  border: .5px solid darkslateblue;
  border-radius: 10px;
  width: 50px;
  height: 80px;
}
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  margin: 10px;
  border: .5px solid darkslateblue;
  border-radius: 10px;
  width: 50px;
  height: 80px;
}
.pattern {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkslateblue;
  border-radius: 8px;
  width: 100%;
  height: 100%;
}
.black-mark {
  color: midnightblue;
  font-size: 20px;
}
.red-mark {
  color: crimson;
  font-size: 20px;
}
.pattern-mark {
  color: white;
  font-size: 30px;
}
</style>

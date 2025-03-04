<template>
<div class="countbox">
 <button @click="handleSub" class="mius">-</button>
 <input type="text" @change="handleChange" class="inp" :value="value">
 <button @click="handleAdd" class="add">+</button>
</div>
</template>

<script>
export default {
  name: 'CountBox',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.countbox{
  width: 110px;
  height: 30px;
  display: flex;
  .mius,.add{
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    margin: 0 5px;
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    text-align: center;
    background-color: #efefef;
  }
}
</style>

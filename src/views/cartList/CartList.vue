<template>
  <div class="title">我的全部购物车（2）</div>
  <ShoppingContent />
  <Docker :currentIndex="1" />
</template>

<script>
import Docker from '../../components/Docker.vue'
import ShoppingContent from './ShoppingContent.vue'

export default {
  name: 'CartList',
  components: { Docker, ShoppingContent },
  setup() {}
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 0.16rem;
  color: #333;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
}
</style>

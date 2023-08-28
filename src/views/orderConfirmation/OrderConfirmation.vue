<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import Order from './Order.vue'
import ProductList from './ProductList.vue'
import TopArea from './TopArea.vue'

export default {
  name: 'OrderConfirmation',
  components: { Order, ProductList, TopArea },
  setup() {}
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f8f8f8;
}
</style>

<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="index"
      :class="{
        docker__item: true,
        'docker__item--active': index === currentIndex
      }"
    >
      <router-link :to="item.to">
        <div class="docker__icon">
          <span class="iconfont" v-html="item.icon"></span>
        </div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup() {
    const dockerList = [
      { icon: '&#xe600;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe63c;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe605;', text: '订单', to: { name: 'Home' } },
      { icon: '&#xe660;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
.docker {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 0.49rem;
  display: flex;
  border-top: 0.01rem solid #f1f1f1;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: #333;
      text-decoration: none;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__icon {
    margin: 0.07rem 0 0.02rem 0;
    .iconfont {
      font-size: 0.2rem;
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>

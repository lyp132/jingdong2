<template>
  <div class="shop">
    <img class="shop__img" :src="item.imgUrl" alt="" />
    <div class="shop__content">
      <div class="shop__content__shopname">{{ item.name }}</div>
      <div class="shop__content__tags">
        <div class="shop__content__tags__tag">月售{{ item.sales }}+</div>
        <div class="shop__content__tags__tag">起送¥{{ item.expressLimit }}</div>
        <div class="shop__content__tags__tag">
          基础运费¥{{ item.expressPrice }}
        </div>
      </div>
      <p class="shop__content__highlight">
        {{ item.slogan }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item'],
  setup() {}
}
</script>

<style lang="scss" scoped>
.shop {
  display: flex;
  margin-top: 0.12rem;
  &__img {
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    flex: 1;
    margin-left: 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    color: #333;
    &__shopname {
      font-size: 0.16rem;
      line-height: 0.22rem;
    }
    &__tags {
      margin: 0.08rem 0.5rem 0 0.08rem;
      display: flex;
      &__tag {
        flex: 1;
      }
    }
    &__highlight {
      font-size: 0.13rem;
      line-height: 0.18rem;
      color: #e93b3b;
    }
  }
}
</style>

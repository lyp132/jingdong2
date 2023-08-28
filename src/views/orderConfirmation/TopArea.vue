<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleBackClick">
        &#xe601;
      </div>
      确认订单
    </div>
    <div class="top__content">
      <div class="top__content__title">收货地址</div>
      <div class="top__content__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__content__info">
        <div class="top__content__info__name">瑶妹（先生）</div>
        <div class="top__content__info__phone">18911024266</div>
      </div>
      <div class="top__content__icon iconfont">&#xe601;</div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'

// 点击事件方法
const useClickEffect = (shopId) => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back(shopId)
  }
  return { handleBackClick }
}

export default {
  name: 'TopArea',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { handleBackClick } = useClickEffect(shopId)

    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    font-size: 0.16rem;
    line-height: 0.22rem;
    padding-top: 0.26rem;
    text-align: center;
    color: #fff;
    &__back {
      position: absolute;
      font-size: 0.24rem;
      left: 0.18rem;
    }
  }
  &__content {
    position: absolute;
    top: 0.7rem;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0.16rem;
    padding: 0.16rem;
    color: #333;
    background: #fff;
    border-radius: 0.04rem;
    &__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
    }
    &__address {
      margin: 0.14rem 0 0.06rem 0;
      font-size: 0.14rem;
      line-height: 0.2rem;
    }
    &__info {
      display: flex;
      color: #666;
      font-size: 0.12rem;
      line-height: 0.17rem;
      &__name {
        margin-right: 0.06rem;
      }
    }
    &__icon {
      position: absolute;
      top: 0.48rem;
      right: 0.18rem;
      font-size: 0.24rem;
      transform: rotate(180deg);
    }
  }
}
</style>

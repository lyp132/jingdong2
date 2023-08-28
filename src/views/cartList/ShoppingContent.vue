<template>
  <div class="border">
    <div class="border__item" v-for="item in cartList" :key="item.shopId">
      <div class="border__item__title">{{ item.shopName }}</div>
      <template v-for="contentItem in item.productList" :key="contentItem._id">
        <div
          class="border__item__content"
          v-if="
            contentItem.count > 0 &&
            contentItem.select &&
            contentItem.number <= item.showhidden
          "
        >
          <img
            :src="contentItem.imgUrl"
            alt=""
            class="border__item__content__img"
          />
          <div class="border__item__content__detail">
            <div class="border__item__content__detail__name">
              {{ contentItem.name }}
            </div>
            <div class="border__item__content__detail__price">
              <div class="border__item__content__detail__price__left">
                ¥{{ contentItem.price }} x {{ contentItem.count }}
              </div>
              <div class="border__item__content__detail__price__right">
                ¥{{ contentItem.price * contentItem.count }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- show大于showhidden时显示、 -->
      <div class="border__item__fold" v-if="item.show > item.showhidden">
        共计3件/1.4kg
        <span
          class="border__item__fold__icon iconfont"
          @click="
            () => {
              clickShowAllProduct(item.shopId)
            }
          "
          >&#xe65e;</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

const useCartListEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  const setShowHidden = (shopId, showhidden) => {
    store.commit('setShowHidden', { shopId, showhidden })
  }
  // 初始化边界值为
  for (const i in cartList) {
    if (cartList[i].show > 2) {
      setShowHidden(i, 2)
    } else {
      setShowHidden(i, cartList[i].show)
    }
  }
  // 点击更改边界条件、设置边界值showhidden大于show
  const clickShowAllProduct = (shopId) => {
    setShowHidden(shopId, cartList[shopId].show)
  }

  return { cartList, clickShowAllProduct }
}

export default {
  name: 'ShoppingContent',
  setup() {
    const { cartList, clickShowAllProduct } = useCartListEffect()

    return { cartList, clickShowAllProduct }
  }
}
</script>

<style lang="scss" scoped>
.border {
  position: absolute;
  top: 0.44rem;
  right: 0;
  bottom: 0.5rem;
  left: 0;
  background-color: #f8f8f8;
  &__item {
    margin: 0.16rem 0.18rem;
    padding: 0.16rem;
    background-color: #fff;
    &__title {
      font-size: 0.16rem;
      color: #333;
      line-height: 0.22rem;
      font-weight: bold;
    }
    &__content {
      display: flex;
      margin: 0.16rem 0;
      &__img {
        width: 0.46rem;
      }
      &__detail {
        flex: 1;
        margin-left: 0.16rem;
        font-size: 0.14rem;
        line-height: 0.2rem;
        &__price {
          margin-top: 0.06rem;
          display: flex;
          justify-content: space-between;
          &__left {
            color: #e93b3b;
          }
        }
      }
    }
    &__fold {
      height: 0.28rem;
      color: #999;
      background-color: #f5f5f5;
      text-align: center;
      font-size: 0.14rem;
      line-height: 0.28rem;
    }
  }
}
</style>

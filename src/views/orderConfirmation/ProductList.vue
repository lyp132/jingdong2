<template>
  <div class="content">
    <div class="content__shopnames">沃尔玛</div>
    <div class="content__products">
      <div class="content__products__list">
        <template v-for="item in productList" :key="item._id">
          <!-- {{ item.count }}-{{ item.select }}-{{ item.number }}-{{
            item.showhidden
          }} -->
          <div
            class="content__products__list__item"
            v-if="item.number <= shopIdInfo.showhidden"
          >
            <img
              :src="item.imgUrl"
              alt=""
              class="content__products__list__item__img"
            />
            <div class="content__products__list__item__detail">
              <div class="content__products__list__item__detail__name">
                {{ item.name }}
              </div>
              <div class="content__products__list__item__detail__price">
                <div class="content__products__list__item__detail__price__left">
                  ¥{{ item.price }} x {{ item.count }}
                </div>
                <div
                  class="content__products__list__item__detail__price__right"
                >
                  ¥{{ item.price * item.count }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- show大于showhidden时显示、 -->
        <div
          class="content__products__list__fold"
          v-if="shopIdInfo.show > shopIdInfo.showhidden"
        >
          共计{{ caculations.total }}件
          <span
            class="content__products__list__fold__icon iconfont"
            @click="clickShowAllProduct"
            >&#xe65e;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from '@/effects/cartEffects'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const useCartListEffect = (shopId) => {
  const store = useStore()
  const shopIdInfo = store.state.cartList[shopId]

  const setShowHidden = (shopId, showhidden) => {
    store.commit('setShowHidden', { shopId, showhidden })
  }

  // 初始化边界值为
  if (shopIdInfo.show > 2) {
    setShowHidden(shopId, 2)
  } else {
    setShowHidden(shopId, shopIdInfo.show)
  }

  // 点击更改边界条件、设置边界值showhidden大于show
  const clickShowAllProduct = () => {
    console.log(shopIdInfo.show, shopIdInfo.showhidden)
    setShowHidden(shopId, shopIdInfo.show)
    console.log(shopIdInfo.show, shopIdInfo.showhidden)
  }

  return { shopIdInfo, clickShowAllProduct }
}
export default {
  name: 'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { shopIdInfo, clickShowAllProduct } = useCartListEffect(shopId)
    const { productList, caculations } = useCommonCartEffect(shopId)
    // console.log(productList)

    return { productList, caculations, shopIdInfo, clickShowAllProduct }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 1.96rem;
  bottom: 0.5rem;
  left: 0.18rem;
  right: 0.18rem;
  &__shopnames {
    padding: 0.16rem;
    font-size: 0.16rem;
    line-height: 0.22rem;
    font-weight: bold;
    background-color: #fff;
  }
  &__products {
    position: absolute;
    top: 0.38rem;
    right: 0;
    left: 0;
    bottom: 0;
    &__list {
      background-color: #fff;
      padding-bottom: 0.16rem;
      &__item {
        display: flex;
        margin: 0 0.18rem;
        padding-top: 0.16rem;
        &__img {
          height: 0.46rem;
          margin-right: 0.16rem;
        }
        &__detail {
          flex: 1;
          &__name {
            font-size: 0.14rem;
            line-height: 0.2rem;
            color: #333;
          }
          &__price {
            font-size: 0.12rem;
            line-height: 0.14rem;
            display: flex;
            justify-content: space-between;
            margin-top: 0.06rem;
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
        margin: 0.16rem 0.18rem 0 0.18rem;
      }
    }
  }
}
</style>

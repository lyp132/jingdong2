<template>
  <div class="mask" v-show="showCart" @click="handleCartShowChange"></div>
  <div class="cart">
    <!-- 购物车展开后内容 -->
    <div class="product" v-show="showCart">
      <div class="product__header">
        <div
          class="product__header__allcheck"
          @click="
            () => {
              changeAllSelect(shopId, caculations.allSelect)
            }
          "
        >
          <span
            class="product__header__allcheck__icon iconfont"
            v-html="caculations.allSelect ? '&#xe652;' : '&#xe66c;'"
          ></span>
          全选
        </div>
        <div class="product__header__center"></div>
        <div
          class="product__header__clean"
          @click="
            () => {
              cleanCartProducts(shopId)
            }
          "
        >
          清空购物车
        </div>
      </div>
      <!-- 每一项商品 -->
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__icon iconfont"
            v-html="item.select ? '&#xe652;' : '&#xe66c;'"
            @click="() => changeCartItemSelect(shopId, item._id)"
          ></div>
          <img :src="item.imgUrl" alt="" class="product__item__img" />
          <div class="product__item__detail">
            <p class="product__item__detail__title">{{ item.name }}</p>
            <p class="product__item__detail__price">
              <span class="product__item__detail__price__left"
                >¥{{ item.price }}</span
              >
              <span class="product__item__detail__price__right"
                >¥{{ item.oldprice }}</span
              >
            </p>
          </div>

          <div class="product__item__number">
            <div
              class="product__item__number__left iconfont"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, -1, shopName)
                }
              "
            >
              &#xe8b1;
            </div>
            <div class="product__item__number__center">
              {{ item.count || 0 }}
            </div>
            <div
              class="product__item__number__right iconfont"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, 1, shopName)
                }
              "
            >
              &#xe602;
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 底部 -->
    <div class="commodity">
      <div class="commodity__icon" @click="handleCartShowChange">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
          class="commodity__icon__img"
        />
        <div class="commodity__icon__tag">{{ caculations.total }}</div>
      </div>
      <div class="commodity__center">
        总计：<span class="commodity__center__price"
          >¥{{ caculations.price }}</span
        >
      </div>
      <router-link
        :to="{ path: `/orderConfirmation/${shopId}` }"
        v-show="caculations.price > 0"
      >
        <div class="commodity__btn">去结算</div>
      </router-link>
      <div class="commodity__btn" v-show="caculations.price <= 0">去结算</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 购物车方法
const useCartEffect = () => {
  const store = useStore()
  const showCart = ref(false)
  // 控制商品显示隐藏
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }

  // 更改购物车中商品选中状态
  const changeCartItemSelect = (shopId, productId) => {
    store.commit('changeCartItemSelect', { shopId, productId })
  }

  // 更改全选状态
  const changeAllSelect = (shopId, ifAllselect) => {
    const choose = !ifAllselect
    store.commit('changeAllSelect', { shopId, choose })
  }

  // 清空购物车
  const cleanCartProducts = (shopId) => {
    showCart.value = !showCart.value
    store.commit('cleanCartProducts', { shopId })
  }
  // // 获取商品列表
  // const productList = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   return productList
  // })
  // // 是否全选
  // const allSelect = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let result = true
  //   if (typeof productList === 'undefined') {
  //     result = false
  //   } else if (Object.keys(productList).length === 0) {
  //     result = false
  //   }
  //   for (const i in productList) {
  //     const product = productList[i]
  //     if (product.count > 0 && !product.select) {
  //       result = false
  //     }
  //   }
  //   return result
  // })
  // // 计算购物车总数量
  // const total = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let count = 0
  //   if (productList) {
  //     for (const i in productList) {
  //       const product = productList[i]
  //       if (product.count > 0 && product.select) {
  //         count += productList[i].count
  //       }
  //     }
  //   }
  //   // console.log(count)
  //   return count
  // })
  // // 计算总价
  // const price = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let result = 0
  //   if (productList) {
  //     for (const i in productList) {
  //       const product = productList[i]
  //       if (product.count > 0 && product.select) {
  //         result += product.price * product.count
  //       }
  //     }
  //   }
  //   return result.toFixed(2)
  // })

  // // 获取计算属性，总数、总价、是否选中
  // const caculations = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   const result = { total: 0, price: 0, allSelect: true }
  //   let mark = 1

  //   if (
  //     typeof productList === 'undefined' ||
  //     Object.keys(productList).length === 0
  //   ) {
  //     result.allSelect = false
  //     result.price = result.price.toFixed(2)

  //     return result
  //   }

  //   for (const i in productList) {
  //     const product = productList[i]
  //     if (product.select) {
  //       result.total += productList[i].count
  //       result.price += product.price * product.count
  //       mark++
  //     }
  //     if (product.count > 0 && !product.select) {
  //       result.allSelect = false
  //     }
  //   }
  //   if (mark === 1) {
  //     result.allSelect = false
  //   }
  //   result.price = result.price.toFixed(2)
  //   return result
  // })

  return {
    showCart,
    handleCartShowChange,
    changeCartItemSelect,
    changeAllSelect,
    cleanCartProducts
  }
}
export default {
  name: 'Cart',
  props: ['shopName'],
  setup() {
    const route = useRoute()
    const shopId = route.params.id

    const { productList, caculations, changeCartItemInfo } =
      useCommonCartEffect(shopId)
    const {
      showCart,
      handleCartShowChange,
      changeCartItemSelect,
      changeAllSelect,
      cleanCartProducts
    } = useCartEffect()

    return {
      showCart,
      handleCartShowChange,
      changeCartItemSelect,
      changeAllSelect,
      cleanCartProducts,
      caculations,
      shopId,
      productList,
      changeCartItemInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.52rem;
  background: rgba(0, 0, 0, 0.5);
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.product {
  background-color: #fff;
  &__header {
    display: flex;
    height: 0.52rem;
    line-height: 0.52rem;
    font-size: 0.14rem;
    color: #333;
    margin-bottom: 0.01rem solid #f1f1f1;

    &__allcheck {
      &__icon {
        vertical-align: top;
        margin: 0 0.08rem 0 0.18rem;
        font-size: 0.2rem;
        color: #0091ff;
      }
    }
    &__center {
      flex: 1;
    }
    &__clean {
      margin-right: 0.18rem;
    }
  }
  &__item {
    height: 0.46rem;
    display: flex;
    position: relative;
    padding-bottom: 0.16rem;
    &__icon {
      margin: 0 0.18rem;
      font-size: 0.2rem;
      line-height: 0.46rem;
      color: #0091ff;
    }
    &__detail {
      flex: 1;
      margin-left: 0.16rem;

      &__title {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #333;
        margin: 0;
        margin-bottom: 0.06rem;
      }
      &__price {
        font-size: 0.12rem;
        margin: 0;
        &__left {
          color: #e93b3b;
          margin-block: 0.06rem;
        }
        &__right {
          color: #999;
        }
      }
    }
    &__number {
      width: 0.8rem;
      height: 0.22rem;
      font-size: 0.14rem;
      line-height: 0.2rem;
      position: absolute;
      bottom: 0.2rem;
      right: 0;
      display: flex;
      justify-content: space-between;
      &__left {
        font-size: 0.2rem;
        color: #666;
      }
      &__center {
        color: #333;
      }
      &__right {
        font-size: 0.2rem;
        color: #0091ff;
      }
    }
  }
}
.commodity {
  height: 0.49rem;
  border-top: 0.01rem solid #f1f1f1;
  display: flex;
  line-height: 0.49rem;
  a {
    text-decoration: none;
  }
  &__icon {
    position: relative;
    width: 0.76rem;
    &__img {
      display: block;
      width: 0.28rem;
      height: 0.26rem;
      margin: auto;
      margin-top: 0.1rem;
    }
    &__tag {
      position: absolute;
      top: 0.07rem;
      left: 0.44rem;
      height: 0.2rem;
      line-height: 0.2rem;
      color: #fff;
      font-size: 0.16rem;
      transform: scale(0.5, 0.5);
      transform-origin: center top;
      background-color: #e93b3b;
      border-radius: 0.1rem;
    }
  }
  &__center {
    flex: 1;
    margin-left: 0.08rem;
    color: #333;
    font-size: 0.12rem;
    &__price {
      font-size: 0.18rem;
      color: #e93b3b;
    }
  }
  &__btn {
    width: 0.98rem;
    font-size: 0.14rem;
    text-align: center;
    color: #fff;
    background-color: #4fb0f9;
  }
}
</style>

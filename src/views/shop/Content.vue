<template>
  <div class="content">
    <div class="category">
      <div
        v-for="(item, index) in categories"
        :key="index"
        :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab
        }"
        @click="handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="product__item"
        v-show="item.imgUrl"
      >
        <img :src="item.imgUrl" alt="" class="product__item__img" />
        <div class="product__item__content">
          <div class="product__item__content__title">{{ item.name }}</div>
          <div class="product__item__content__sale">月售{{ item.sales }}件</div>
          <div class="product__item__content__price">
            <span class="product__item__content__price__left"
              >¥{{ item.price }}</span
            >
            <span class="product__item__content__price__right"
              >¥{{ item.oldprice }}</span
            >
          </div>
          <div class="product__item__content__btn">
            <div
              class="product__item__content__btn__left iconfont"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, -1, shopName)
                }
              "
            >
              &#xe8b1;
            </div>
            <div class="product__item__content__btn__center">
              {{ getProductCount(shopId, item._id) }}
            </div>
            <div
              class="product__item__content__btn__right iconfont"
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
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request'
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// 列表求换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关逻辑
const useCurrentListEffect = (shopId, currentTab) => {
  const ContentData = reactive({ list: [] })
  // 获取商品数据
  const getContentData = async () => {
    try {
      const result = await get(`/api/shop/${shopId}/products`, {
        tab: currentTab.value
      })
      if (result?.errno === 0) {
        ContentData.list = result.data
      } else {
        console.log('获取商品数据失败')
      }
    } catch (error) {
      console.log(error)
    }
  }
  watchEffect(() => {
    getContentData()
  })

  const { list } = toRefs(ContentData)
  return { list }
}

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  // 获取商品数量
  const getProductCount = (shopId, productId) => {
    return store.state.cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { getProductCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup() {
    const route = useRoute()
    const shopId = route.params.id

    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(shopId, currentTab)
    const { getProductCount } = useCartEffect()
    const { changeCartItemInfo } = useCommonCartEffect(shopId)
    return {
      shopId,
      categories,
      currentTab,
      list,
      handleTabClick,
      changeCartItemInfo,
      getProductCount
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 1.6rem;
  bottom: 0.5rem;
  right: 0;
  left: 0;
  display: flex;
  .category {
    width: 0.76rem;
    font-size: 0.14rem;
    line-height: 0.4rem;
    color: #333;
    background-color: #f5f5f5;
    border-radius: 0.02rem;
    &__item {
      height: 0.4rem;
      text-align: center;
      &--active {
        background: #fff;
      }
    }
  }
  .product {
    flex: 1;
    margin-left: 0.16rem;
    margin-right: 0.18rem;
    &__item {
      display: flex;
      padding: 0.12rem 0;
      border-bottom: 0.01rem solid #f1f1f1;
      &__img {
        display: block;
        width: 0.68rem;
        height: 0.68rem;
      }
      &__content {
        flex: 1;
        margin-left: 0.16rem;
        position: relative;
        &__title {
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: #333;
        }
        &__sale {
          margin: 0.06rem 0;
          font-size: 0.12rem;
          color: #333;
          line-height: 0.16rem;
        }
        &__price {
          &__left {
            font-size: 0.14rem;
            color: #e93b3b;
            margin-right: 0.12rem;
          }
          &__right {
            color: #999;
            line-height: 0.2rem;
            text-decoration: line-through;
          }
        }
        &__btn {
          width: 0.8rem;
          height: 0.22rem;
          font-size: 0.14rem;
          line-height: 0.2rem;
          position: absolute;
          bottom: 0.06rem;
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
  }
}
</style>

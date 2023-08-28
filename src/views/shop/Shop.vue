<template>
  <div class="top">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe601;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe65c;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <ShopInfo :item="shopInfo" v-show="shopInfo.imgUrl" />
  </div>
  <Content :shopName="shopInfo.name" />
  <Cart :shopName="shopInfo.name" />
</template>

<script>
import ShopInfo from '@/components/ShopInfo.vue'
import { get } from '@/utils/request'
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Cart from './Cart.vue'
import Content from './Content.vue'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ shopInfo: {} })

  const getShopData = async () => {
    try {
      const result = await get(`/api/shop/${route.params.id}`)
      if (result?.errno === 0) {
        data.shopInfo = result.data
      }
    } catch (error) {
      console.log(error)
    }
  }
  getShopData()
  const { shopInfo } = toRefs(data)
  return { shopInfo }
}
// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
export default {
  name: 'Shop',
  components: { ShopInfo, Cart, Content },
  setup() {
    const { shopInfo } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    return { shopInfo, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.top {
  margin: 0.16rem 0.18rem 0 0.18rem;
  .search {
    display: flex;
    margin-bottom: 0.16rem;
    line-height: 0.32rem;
    &__back {
      font-size: 0.24rem;
      color: #b6b6b6;
      margin-right: 0.1rem;
    }
    &__content {
      background-color: #f5f5f5;
      border-radius: 0.16rem;
      display: flex;
      flex: 1;
      &__icon {
        font-size: 0.16rem;
        color: #b7b7b7;
        margin-right: 0.16rem;
        margin-left: 0.16rem;
      }
      &__input {
        flex: 1;
        font-size: 0.16rem;
        color: #333;
        background-color: #f5f5f5;
        line-height: 0.32rem;
        border: none;
        outline: none;
        &::placeholder {
          color: #333;
        }
      }
    }
  }
}
</style>

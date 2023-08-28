<template>
  <!-- 附近店铺 -->
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div class="nearby__items">
      <router-link
        v-for="(item, index) in nearbyList"
        :key="index"
        :to="`/shop/${item._id}`"
      >
        <ShopInfo :item="item" />
      </router-link>
    </div>
  </div>
</template>

<script>
import ShopInfo from '@/components/ShopInfo.vue'
import { get } from '@/utils/request'
import { ref } from 'vue'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    try {
      const result = await get('/api/shop/hot-list')
      if (result?.errno === 0) {
        nearbyList.value = result.data
      }
    } catch (error) {
      console.log(error)
    }
  }
  getNearbyList()
  return { nearbyList }
}
export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup() {
    const { nearbyList } = useNearbyListEffect()

    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
.nearby {
  &__title {
    margin: 0.16rem 0 0.14rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    line-height: 0.25rem;
    color: #333;
  }
  &__items {
    overflow-y: scroll;
    // height: 100%;
    position: absolute;
    top: 4.08rem;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    a {
      text-decoration: none;
    }
  }
}
</style>

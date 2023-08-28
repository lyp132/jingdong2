import { computed } from 'vue'
import { useStore } from 'vuex'

export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList

  // 获取商品列表
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0 && product.select) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  // 获取选中的商品列表
  const allSelectProductList = () => {
    const notEmptyProductList = {}
    // 店铺所选商品信息
    // let num = 0
    for (const i in cartList) {
      const shopId = cartList[i].shopId
      const productList = cartList[i].productList
      let number = 0
      for (const j in productList) {
        if (productList[j].select && productList[j].count > 0) {
          const productId = productList[j]._id
          number++
          store.commit('setnumber', { shopId, productId, number })
        }
      }
    }

    console.log(33, notEmptyProductList)
    return notEmptyProductList
  }

  // 获取计算属性，总数、总价、是否选中
  const caculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { total: 0, price: 0, allSelect: true }
    let mark = 1

    if (
      typeof productList === 'undefined' ||
      Object.keys(productList).length === 0
    ) {
      result.allSelect = false
      result.price = result.price.toFixed(2)
      return result
    }

    for (const i in productList) {
      const product = productList[i]
      if (product.select) {
        result.total += productList[i].count
        result.price += product.price * product.count
        mark++
      }
      if (product.count > 0 && !product.select) {
        result.allSelect = false
      }
    }
    if (mark === 1) {
      result.allSelect = false
    }
    result.price = result.price.toFixed(2)
    return result
  })
  // 更改商品数量
  const changeCartItemInfo = (shopId, productId, item, num, shopname) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      item,
      num,
      shopname
    })
  }
  return { productList, allSelectProductList, caculations, changeCartItemInfo }
}

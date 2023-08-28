import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
const getLocalCartList = () => {
  console.log(1111)
  try {
    return JSON.parse(localStorage.cartList) || {}
  } catch (error) {
    return {}
  }
}

export default createStore({
  state: {
    // cartList: {
    //   // // 第一层为店铺ID
    //   // shopId: {
    //   //   // 商品id
    //   //   productId: {
    //   //     // 商品信息
    //   //   },
    //   //   // 存储店铺id
    //   //   'shopId': shopId
    //   // }
    // }
    cartList: getLocalCartList()
  },
  getters: {
  },
  mutations: {
    // 增加、减少商品
    changeCartItemInfo(state, payload) {
      const { shopId, productId, item, num, shopname } = payload

      // 店铺所选商品信息
      const shopInfo = state.cartList[shopId] || {
        shopName: '', shopId: '', productList: {}, showhidden: 0, show: 0
      }
      // 每项商品信息product
      let product = shopInfo.productList[productId]

      if (!product) {
        item.count = 0
        item.number = 1
        product = item
      }
      // 计算所选商品数量
      product.count = product.count + num
      if (num > 0) { product.select = true }
      // 边界判断
      if (product.count < 0) { product.count = 0 }
      if (!shopInfo.shopName) { shopInfo.shopName = shopname }

      shopInfo.productList[productId] = product
      // 商品排序
      let number = 0
      for (const i in shopInfo.productList) {
        if (shopInfo.productList[i].count > 0 && shopInfo.productList[i].select) {
          number++
          shopInfo.productList[i].number = number
        }
      }
      console.log(number)
      shopInfo.show = number
      if (product.count === 0) {
        product.select = false
        product.number = 0
      }
      shopInfo.shopId = shopId
      state.cartList[shopId] = shopInfo
      // console.log(state.cartList)
      setLocalCartList(state)
    },
    // 更改购物车中商品选中状态
    changeCartItemSelect(state, payload) {
      const { shopId, productId } = payload
      const shopInfo = state.cartList[shopId]
      const productItem = state.cartList[shopId].productList[productId]
      productItem.select = !productItem.select
      // 商品排序
      let number = 0
      for (const i in shopInfo.productList) {
        if (shopInfo.productList[i].count > 0 && shopInfo.productList[i].select) {
          number++
          shopInfo.productList[i].number = number
        }
      }
      console.log(number)
      shopInfo.show = number
      setLocalCartList(state)
    },
    // 更改全选状态
    changeAllSelect(state, payload) {
      const { shopId, choose } = payload
      const shopInfo = state.cartList[shopId]
      const productList = state.cartList[shopId]?.productList
      for (const i in productList) {
        productList[i].select = choose
      }
      // 商品排序
      let number = 0
      for (const i in shopInfo.productList) {
        if (shopInfo.productList[i].count > 0 && shopInfo.productList[i].select) {
          number++
          shopInfo.productList[i].number = number
        }
      }
      console.log(number)
      shopInfo.show = number
      setLocalCartList(state)
    },
    // 清空购物车
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    // 设置点击展开边界
    setShowHidden(state, payload) {
      const { shopId, showhidden } = payload
      state.cartList[shopId].showhidden = showhidden
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})

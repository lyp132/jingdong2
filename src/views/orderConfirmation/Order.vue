<template>
  <div class="order">
    <div class="order__left">
      实付金额 <span class="order__left__price">¥{{ caculations.price }}</span>
    </div>
    <div
      class="order__right"
      @click="
        () => {
          handleSubmitOrderClick(true)
        }
      "
    >
      提交订单
    </div>
  </div>
  <!-- 确认订单弹窗 -->
  <div
    class="mask"
    v-show="showMask"
    @click="
      () => {
        handleSubmitOrderClick(false)
      }
    "
  >
    <div class="mask__content">
      <div class="mask__content__title">确认要离开收银台？</div>
      <div class="mask__content__desc">请尽快完成支付，否则将被取消</div>
      <div class="mask__content__btns">
        <div
          class="mask__content__btns__btn mask__content__btns__btn__left"
          @click="
            () => {
              handleConfirmBtnsClick(true)
            }
          "
        >
          取消订单
        </div>
        <div
          class="mask__content__btns__btn mask__content__btns__btn__right"
          @click="
            () => {
              handleConfirmBtnsClick(false)
            }
          "
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
  <!-- 支付成功弹窗 -->
  <div class="mask" v-show="showSuccessmask">
    <div class="mask__content">
      <div class="mask__content__cancle iconfont">&#xe61d;</div>
      <div class="mask__content__icon iconfont">&#xe614;</div>
      <div class="mask__content__success">支付成功，等待配送</div>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from '@/effects/cartEffects'
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

const useMaskOrderEffect = () => {
  // 设置展示和隐藏的数据
  const maskdata = reactive({ showMask: false, showSuccessmask: false })
  // 点击提交订单
  const handleSubmitOrderClick = (choose) => {
    // console.log(11)
    maskdata.showMask = choose
  }
  //   取消订单按钮或者确认支付按钮点击
  const handleConfirmBtnsClick = (iscancle) => {}

  const { showMask, showSuccessmask } = toRefs(maskdata)
  return {
    showMask,
    showSuccessmask,
    handleSubmitOrderClick,
    handleConfirmBtnsClick
  }
}

export default {
  name: 'Order',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { caculations } = useCommonCartEffect(shopId)
    const {
      showMask,
      showSuccessmask,
      handleSubmitOrderClick,
      handleConfirmBtnsClick
    } = useMaskOrderEffect()
    return {
      caculations,
      showMask,
      showSuccessmask,
      handleSubmitOrderClick,
      handleConfirmBtnsClick
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 0.14rem;
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: #fff;
  display: flex;
  &__left {
    flex: 1;
    margin-left: 0.24rem;
    &__price {
      font-size: 0.16rem;
      color: #151515;
    }
  }
  &__right {
    width: 0.98rem;
    text-align: center;
    color: #fff;
    background-color: #4fb0f9;
  }
}
.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3rem;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      font-size: 0.18rem;
      font-weight: bold;
      color: #333;
      line-height: 0.25rem;
      margin: 0.24rem 0 0.08rem 0;
    }
    &__desc {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #666;
    }
    &__btns {
      display: flex;
      justify-content: center;
      margin: 0.24rem 0;
      &__btn {
        width: 0.8rem;
        font-size: 0.14rem;
        line-height: 0.32rem;
        border-radius: 0.16rem;
        &__left {
          color: #0091ff;
          border: 0.01rem solid #4fb0f9;
          margin-right: 0.12rem;
        }
        &__right {
          color: #fff;
          background-color: #4fb0f9;
          margin-left: 0.12rem;
        }
      }
    }
    &__cancle {
      margin-top: 0.12rem;
      margin-right: 0.12rem;
      text-align: right;
      color: #666;
    }
    &__icon {
      font-size: 0.4rem;
      font-weight: bold;
      margin-top: 0.16rem;
      margin-bottom: 0.24rem;
    }
    &__success {
      font-size: 0.18rem;
      line-height: 0.25rem;
      color: #333;
      margin-bottom: 0.32rem;
    }
  }
}
</style>

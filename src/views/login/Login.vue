<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input type="text" placeholder="请输入用户名" v-model="username" />
    </div>
    <div class="wrapper__input">
      <input type="password" placeholder="请输入密码" v-model="password" />
    </div>
    <div class="wrapper__login" @click="handleLoginClick">登录</div>
    <div class="wrapper__link">
      <span class="wrapper__link--left" @click="handleRegisterClick"
        >立即注册</span
      >
      |
      <span class="wrapper__link--right">忘记密码</span>
    </div>
    <Toast :message="toastMessage" v-show="show" />
  </div>
</template>

<script>
import Toast, { useToastEffect } from '@/components/Toast.vue'
import { post } from '@/utils/request'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

// 登录方法
const useLoginEffect = (router, showToast) => {
  const data = reactive({
    username: '',
    password: ''
  })
  // 点击登录
  const handleLoginClick = async () => {
    try {
      if (data.username === '' || data.password === '') {
        // console.log('请重新输入')
        showToast('请重新输入')
      } else {
        // 发送post请求验证登录
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password
        })
        // console.log(result)
        if (result?.errno === 0) {
          // console.log('登录成功')
          localStorage.isLogin = true
          showToast('登录成功')
          router.push({ name: 'Home' })
        } else {
          console.log('登录失败')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const { username, password } = toRefs(data)
  return { username, password, handleLoginClick }
}

// 注册方法
const useRegisterEffect = (router) => {
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Template',
  components: { Toast },
  setup() {
    const router = useRouter()

    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLoginClick } = useLoginEffect(
      router,
      showToast
    )
    const { handleRegisterClick } = useRegisterEffect(router)

    return {
      username,
      password,
      handleLoginClick,
      handleRegisterClick,
      show,
      toastMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 50%;
  right: 0.4rem;
  left: 0.4rem;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: 0.48rem;
    background-color: #f9f9f9;
    padding: 0 0.16rem;
    margin-bottom: 0.16rem;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    input {
      margin: 0.12rem 0;
      width: 100%;
      border: none;
      font-size: 0.16rem;
      line-height: 0.24rem;
      color: rgba(0, 0, 0, 0.5);
      background-color: #f9f9f9;
    }
  }
  &__login {
    margin: 0.32rem 0 0.16rem 0;
    height: 0.48rem;
    font-size: 0.16rem;
    line-height: 0.48rem;
    color: #fff;
    text-align: center;
    background-color: #0091ff;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
  }
  &__link {
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #898989;
    text-align: center;
    &--left {
      margin-right: 0.12rem;
    }
    &--right {
      margin-left: 0.12rem;
    }
  }
}
</style>

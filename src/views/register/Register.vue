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
    <div class="wrapper__input">
      <input type="password" placeholder="确认密码" v-model="ensurement" />
    </div>
    <div class="wrapper__login" @click="handleRegisterClick">注册</div>
    <div class="wrapper__link" @click="handleLoginClick">已有账号去登录</div>
  </div>
  <Toast :message="toastMessage" v-show="show" />
</template>

<script>
import Toast, { useToastEffect } from '@/components/Toast.vue'
import { post } from '@/utils/request'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

// 注册方法
const useRegisterEffect = (router, showToast) => {
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })
  // 点击注册
  const handleRegisterClick = async () => {
    try {
      if (
        data.username === '' ||
        data.password === '' ||
        data.ensurement === ''
      ) {
        showToast('输入内容不能为空')
      } else if (data.password === data.ensurement) {
        const result = await post('/api/user/register', {
          username: data.username,
          password: data.password
        })
        if (result?.errno === 0) {
          showToast('注册成功')
          router.push({ name: 'Login' })
        }
      } else {
        showToast('密码不一致')
      }
    } catch (error) {
      showToast('请求失败')
    }
  }

  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegisterClick }
}

// 登录方法
const useLoginEffect = (router) => {
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Template',
  components: { Toast },
  setup() {
    const router = useRouter()

    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegisterClick } =
      useRegisterEffect(router, showToast)
    const { handleLoginClick } = useLoginEffect(router)

    return {
      username,
      password,
      ensurement,
      handleRegisterClick,
      handleLoginClick,
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
  }
}
</style>

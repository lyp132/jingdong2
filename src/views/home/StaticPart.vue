<template>
  <!-- 顶部地址栏 -->
  <div class="position">
    <span class="position__left iconfont">&#xe630;</span>
    北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层
    <span class="position__right iconfont">&#xe7e5;</span>
  </div>
  <!-- 搜索框 -->
  <div class="search">
    <label for="prodectSearch">
      <span class="iconfont">&#xe65c;</span>
    </label>
    <input type="text" placeholder="山姆会员商店优惠商品" id="prodectSearch" />
  </div>
  <!-- banner图片 -->
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt=""
    />
  </div>
  <!-- icon图片列表 -->
  <div class="icons">
    <div v-for="(item, index) in iconsList" :key="index" class="icons__item">
      <img
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imagename}.png`"
        alt=""
        class="icons__item__img"
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconsList = [
      { imagename: '超市', desc: '超市便利' },
      { imagename: '菜市场', desc: '菜市场' },
      { imagename: '水果店', desc: '水果店' },
      { imagename: '鲜花', desc: '鲜花绿植' },
      { imagename: '医药健康', desc: '医药健康' },
      { imagename: '家居', desc: '家居时尚' },
      { imagename: '蛋糕', desc: '烘培蛋糕' },
      { imagename: '签到', desc: '签到' },
      { imagename: '大牌免运', desc: '大牌免运' },
      { imagename: '红包', desc: '红包套餐' }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  font-size: 0.16rem;
  line-height: 0.22rem;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &__left {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  &__right {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}
.search {
  height: 0.32rem;
  margin-bottom: 0.12rem;
  background-color: #f5f5f5;
  color: #bababa;
  border-radius: 0.16rem;
  display: flex;
  .iconfont {
    display: inline-block;
    margin: 0.08rem 0.12rem 0.08rem 0.16rem;
    font-size: 0.16rem;
  }
  input {
    flex: 1;
    background: #f5f5f5;
    font-size: 0.14rem;
    line-height: 0.16rem;
    border-radius: 0.16rem;
    border: 0;
    padding: 0.08rem 0.1rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      height: 0.4rem;
      width: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      color: #333;
      text-align: center;
      margin: 0.06rem 0 0.16rem 0;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: #f1f1f1;
}
</style>

<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex="0" />
</template>

<script>
import Docker from '../../components/Docker.vue'
import Nearby from './Nearby.vue'
import StaticPart from './StaticPart.vue'
export default {
  name: 'Template',
  components: { Docker, Nearby, StaticPart }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  left: 0;
  padding: 0 0.18rem;
}
</style>

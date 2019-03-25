<template>
  <div class="app-container">
    <keep-alive>
      <router-view class="app-wrapper" />
    </keep-alive>
  </div>
</template>

<script>
import 'normalize.css';
export default {};
</script>

<style lang="sass">

.app-container
  min-height: 100%
  font-size: 14px
  line-height: 1.428571429
  color: #333

.app-wrapper
  min-height: 100%

[v-cloak]
  display: none

</style>

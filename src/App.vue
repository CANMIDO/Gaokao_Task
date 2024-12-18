<template>
  <div id="app">
    <UserHeader/>
    <router-view></router-view>
  </div>
</template>

<script>
import UserHeader from './components/UserHeader.vue'
export default {
  name: 'App',
  components: {
    UserHeader,
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
}
</style>

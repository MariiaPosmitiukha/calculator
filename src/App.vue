<template lang="pug">
.mx-auto.width-block
  .container
    .py-4
      app-header
    router-view(:key="$route.fullPath")
app-footer
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="sass" scoped>
@media (min-width: 768px)
  .width-block
    width: 70vw
</style>

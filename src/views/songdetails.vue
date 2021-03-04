<template>
  <div class="recommend">
    <songdetails></songdetails>
    <router-view></router-view>
  </div>
</template>
<script>
import songdetails from "@/components/songsdetails/songdetails.vue";
export default {
  components: {
    songdetails,
  },
};
</script>
<style></style>

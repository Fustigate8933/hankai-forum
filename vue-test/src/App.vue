<script setup>
  import { useRouter, useRoute } from "vue-router"

  const router = useRouter()
  const route = useRoute()

</script>


<template>
  <div id="wrapper">
    <router-view></router-view>
  </div>
</template>


<style>
#wrapper {
  font-family: Trispace, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.grid-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px 0 20px;
}

.left-column {
  grid-column: 1;
}

.middle-column {
  grid-column: 2;
}

.right-column {
  grid-column: 3;
}

.main-body {
  display: grid;
  grid-template-columns: 300px auto 300px;
}
</style>

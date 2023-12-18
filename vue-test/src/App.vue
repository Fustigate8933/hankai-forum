<script setup>
  import { useRouter, useRoute } from "vue-router"

  const router = useRouter()
  const route = useRoute()
</script>


<template>
  <div id="wrapper">
    <div class="main-body">
      <router-view></router-view>
    </div>
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

.side-button {
  font-size: small;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 1px white solid;
  border-radius: 4px;
  padding: 10px 15px 10px 15px;
  margin-top: 25px;
}

.side-button:hover{
  cursor: pointer;
}

.title-text{
  font-size: x-large;
  text-decoration: white;
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
  height: 100vh;
}
</style>

<script setup>
  const props = defineProps({
    question: String,
    description: String,
    postUrl: String
  })
</script>


<template>
    <div class="card-wrapper">
      <router-link :to="postUrl">
        <p class="question-title">
          {{ question }}
        </p>
        <p>
          {{ description }}
        </p>
      </router-link>
    </div>
</template>


<style scoped>
.question-title {
  font-size: x-large;
  font-weight: 500;
}

a,
a:active,
a:visited {
  color: white;
  text-decoration: none;
}

.card-wrapper {
  margin-bottom: 15px;
  width: 100%;
  border: 2px white solid;
  border-radius: 10px;
}
</style>

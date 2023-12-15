<script setup>
  import Card from "./Card.vue"
  import { ref, onMounted } from "vue"
  import { useRouter, useRoute } from "vue-router"

  const router = useRouter()
  const route = useRoute()

  const cards = ref([])

  async function getPosts(){
    const response = await fetch("http://localhost:3000/api/posts");
    const posts = await response.json();
    for (const post of posts.reverse()){
      console.log(post)
      const title = post.q
      const description = post.d
      cards.value.push({q: title, d: description, to: `/post/${post._id}`})
    }
    console.log(cards)
  }

  onMounted(() => {
    getPosts()
  })
</script>


<template>
  <header id="page-title">
    <p class="title-text">
      Forum
    </p>
    <router-link to="/addpost">
      <button id="add-post-button">Add Post</button>
    </router-link>
  </header>

  <div class="main-body">
    <div class="left-column grid-column">
      <p>

      </p>
    </div>

    <div class="middle-column grid-column">
      <Card v-for="item in cards" :question="item.q" :description="item.d" :postUrl="item.to" />
    </div>

    <div class="right-column grid-column">
      <p>

      </p>
    </div>
  </div>
</template>


<style>
#page-title {
  display: flex;
  flex-direction: row;
  padding: 20px 0 0 0;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: space-around;
}

#add-post-button{
  font-size: large;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  padding: 10px;
  border: 2px white solid;
  border-radius: 10px;
}

.title-text{
  font-size: x-large;
  text-decoration: white;
}

*, *:before, *:after {
  box-sizing: border-box;
}
</style>
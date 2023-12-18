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
  <div class="middle-column">
    <div id="page-title">
      <p class="title-text">
        Forum
      </p>
      <router-link to="/addpost">
        <button class="side-button" style="margin-top: 0">Add Post</button>
      </router-link>
    </div>
    <Card v-for="item in cards" :question="item.q" :description="item.d" :postUrl="item.to" />
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
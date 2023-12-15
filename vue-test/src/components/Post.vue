<script setup>
  import { onMounted, ref } from "vue"
  import { useRoute, useRouter } from "vue-router";
  import CommentCard from "./CommentCard.vue";

  const route = useRoute()
  const router = useRouter()
  const postId = route.params.postId
  const title = ref("")
  const description = ref("")
  const postComments = ref([])
  const newComment = ref("")

  async function getPost(){
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`)
    const post = (await response.json())[0]
    title.value = post.q
    description.value = post.d
  }

  async function getPostComments(){
    const response = await fetch(`http://localhost:3000/api/posts/comments/${postId}`)
    postComments.value = await response.json()
  }

  async function deleteComment(commentId){
    const response = await fetch(`http://localhost:3000/api/posts/comments/del/${commentId}`, {
      method: "DELETE",
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      }
    })
  }

  async function submit(){
    const response = await fetch("http://localhost:3000/api/posts/comments/add", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentId: postId,
          parentPost: true,
          content: newComment.value
        }),
      });
    router.go()
  }

  async function deletePost() {
    for (const comment of postComments.value) {
      await deleteComment(comment._id)
    }

    const response = await fetch(`http://localhost:3000/api/posts/del/${postId}`, {
      method: "DELETE",
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    await router.replace("/")
  }

  onMounted(() => {
    getPost()
    getPostComments()
  })
</script>

<template>
  <div class="main-body">
    <div class="middle-column">
      <div class="post-data">
        <h1>
          {{ title }}
        </h1>
        <p class="question-description">
          {{ description }}
        </p>
      </div>
      <div class="post-comments">
        <div class="add-comment">
          <textarea class="input-area" rows="2" v-model="newComment" placeholder="Add a comment!" />
          <button class="submit-button" @click="submit">Submit!</button>
        </div>
        <CommentCard v-for="comment in postComments" :comment="comment" />
      </div>
    </div>
    <div class="right-column">
      <button class="delete-button" @click="deletePost">Delete Post</button>
    </div>
  </div>
</template>

<style scoped>
.add-comment {
  display: flex;
  align-items: center;
  height: 100%;
  margin-bottom: 25px;
  gap: 10px;
}

.submit-button {
  font-size: large;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  padding: 10px;
  border: 2px white solid;
  border-radius: 10px;
  height: 3.4rem;
}

.delete-button {
  font-size: x-small;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 1px white solid;
  border-radius: 4px;
  margin-top: 25px;
}

.input-area {
  font-size: large;
  width: 100%;
  resize: vertical;
  min-height: 1.6em;
  padding: 3px 5px 3px 5px;
}

.question-description{
  font-size: large;
  font-weight: 400;
}

.post-data{
  //border-bottom: 1px white solid;
  //margin-bottom: 40px;
}
</style>

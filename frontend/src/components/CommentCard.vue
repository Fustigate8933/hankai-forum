<script setup>
  import { useRouter } from "vue-router"
  import { onMounted, ref } from "vue"

  const router = useRouter()

  const props = defineProps({
    comment: Object,
    userId: String,
  })

  const commentId = props.comment._id

  const isOP = ref(false)

  async function deleteComment(){
    const response = await fetch(`http://localhost:3000/api/posts/comments/del/${commentId}`, {
      method: "DELETE",
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    await router.go()
  }

  onMounted(() => {
    if (props.comment.userId === props.userId){
      isOP.value = true
    }
  })
</script>


<template>
    <div class="card-wrapper">
      <p class="">
        {{ props.comment.content }}
      </p>
      <button v-if="isOP" class="delete-button" @click="deleteComment">Delete</button>
    </div>
</template>


<style scoped>
.delete-button{
  font-size: medium;
  margin-right: 9px;
}

a,
a:active,
a:visited {
  color: white;
  text-decoration: none;
}

p {
  text-align: left;
  padding: 0 8px 0 8px
}

.card-wrapper {
  margin-bottom: 15px;
  width: 100%;
  border: 1px indianred solid;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

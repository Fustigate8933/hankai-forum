<script setup>
  import { ref, onMounted } from "vue"
  import { useRouter } from "vue-router"

  const title = ref("")
  const description = ref("")
  const userId = ref("")

  const router = useRouter()

  async function submit(){
    const response = await fetch("http://localhost:3000/api/posts/add", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: title.value,
          d: description.value,
          userId: userId.value
        }),
      });
    console.log(await response.json())
    await router.push("/")
  }

  onMounted(async () => {
    const token = localStorage.getItem('token')
    const response = await fetch("http://localhost:3000/api/auth/user/details", {
      method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "token": token
        }),
    });
    const data = await response.json()
    userId.value = data.userId
  })
</script>

<template>
  <div class="middle-column" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%">
    <div class="new-obj">
      <p>
        Post title:
      </p>
      <textarea class="input-area" rows="1" v-model="title" placeholder="What topic do you want to post about?" />
    </div>
    <div class="new-obj">
      <p>
        Post description:
      </p>
      <textarea class="input-area" rows="1" v-model="description" placeholder="Elaborate on your topic!" />
    </div>
    <button class="side-button" @click="submit">Submit!</button>
  </div>
</template>

<style scoped>
p {
  text-align: left;
  font-size: large;
  margin-right: 10px;
  min-width: 230px
}

.new-obj {
  display: flex;
  align-items: center;
  width: 100%
}

.input-area {
  font-size: large;
  width: 100%;
  resize: vertical;
  min-height: 1.6em;
  flex-grow: 2;
}

#post-submit-button {
  font-size: large;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  padding: 10px;
  border: 2px white solid;
  border-radius: 10px;
  margin-top: 15px;
}
</style>

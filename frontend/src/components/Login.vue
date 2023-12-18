<script setup>
  import { ref, watch } from "vue"
  import { useRouter } from "vue-router"

  const router = useRouter()

  const username = ref("")
  const password = ref("")
  const wrong = ref(false)

  function signUpClick(){
    router.push("/signup")
  }

  watch(username, async (newUsername, oldUsername) => {
    wrong.value = false
  })

  async function loginSubmit(){
    const response = await fetch("http://localhost:3000/api/auth/user/signin", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      }),
    });
    const data = await response.json()
    if (data === false){
      console.log("Username or password incorrect")
      wrong.value = true
    }else{
      wrong.value = false
      const token = data.token
      localStorage.setItem("token", token)
      localStorage.setItem("username", username.value)
      await router.push("/")
    }
  }
</script>


<template>
  <div class="middle-column">
    <div style="display: flex; flex-direction: row;  justify-content: space-between; align-items: center; gap: 40px;">
      <h1>
        Login
      </h1>
      <button @click="signUpClick" class="side-button" style="margin-top: 0">No account? <span style="color: yellow; text-decoration: underline">Sign Up</span> here! 🖐️</button>
    </div>
    <div class="input-block">
      <h1>
        Username:
      </h1>
      <input class="input-area" v-model="username" placeholder="Your username 🧑🏻‍🦱" />
    </div>
    <div class="input-block">
      <h1>
        Password:
      </h1>
      <input class="input-area" v-model="password" placeholder="Your password 🔑" type="password" />
    </div>
    <p v-if="wrong" style="color: red; margin-top: -5px">Username or password incorrect</p>
    <button @click="loginSubmit" class="side-button" style="margin-top: 0">Submit!</button>
  </div>
</template>


<style scoped>
.input-block{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-area {
  font-size: large;
  min-height: 1.4em;
  margin-left: 9px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 1px white solid;
  border-radius: 10px;
  padding: 6px 8px 6px 8px;
}

.input-area:focus{
  outline: none;
  border-color: yellow;
  caret-color: lightyellow;
}

.middle-column {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
<script setup>
  import { ref, watch } from "vue"
  import { useRouter } from "vue-router"

  const router = useRouter()

  const username = ref("")
  const password = ref("")
  const userExists = ref(false)

  function loginClick(){
    router.push("/login")
  }

  watch(username, async (newUsername, oldUsername) => {
    const response = await fetch(`http://localhost:3000/api/auth/user/exists/${newUsername}`)
    const exists = await response.json()
    if (exists){
      userExists.value = true
      console.log("exists")
    }else{
      userExists.value = false
    }
  })

  async function signupSubmit(){
    const response = await fetch("http://localhost:3000/api/auth/user/signup", {
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
    console.log(await response.json())

    // login after sign up
    const response2 = await fetch("http://localhost:3000/api/auth/user/signin", {
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
    const data = await response2.json()
    const token = data.token
    localStorage.setItem("token", token)
    localStorage.setItem("username", username.value)
    await router.push("/")
  }
</script>


<template>
  <div class="middle-column">
    <div style="display: flex; flex-direction: row;  justify-content: space-between; align-items: center; gap: 20px;">
      <h1>
        Sign Up
      </h1>
      <button @click="loginClick" class="side-button" style="margin-top: 0">Registered? <span style="color: yellow; text-decoration: underline">Login</span> here! 🖐️</button>
    </div>
    <div class="input-block">
      <h1>
        Username:
      </h1>
      <input :class="userExists ? 'input-area-red' : 'input-area'" v-model="username" placeholder="Your username 🧑🏻‍🦱" />
    </div>
    <div class="input-block">
      <h1>
        Password:
      </h1>
      <input class="input-area" v-model="password" placeholder="Your password 🔑" type="password" />
    </div>
    <button v-if="!userExists" @click="signupSubmit" class="side-button" style="margin-top: 0">Submit!</button>
    <p class="user-exists-text" v-else>Username already exists, pick another one!</p>
  </div>
</template>


<style scoped>
.user-exists-text {
  color: red;
}

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

.input-area-red {
  font-size: large;
  min-height: 1.4em;
  margin-left: 9px;
  color: red;
}

.middle-column {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

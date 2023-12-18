import { createRouter, createWebHistory } from 'vue-router';
import Post from "./components/Post.vue"
import Home from "./components/Home.vue"
import AddPost from "./components/AddPost.vue"
import Login from "./components/Login.vue"
import SignUp from "./components/SignUp.vue"

const routes = [
    {
        path: '/post/:postId',
        name: "Post-Page",
        component: Post,
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/addpost",
        name: "Add-Post",
        component: AddPost
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/signup",
        name: "Sign Up",
        component: SignUp
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

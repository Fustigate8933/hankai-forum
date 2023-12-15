import { createRouter, createWebHistory } from 'vue-router';
import Post from "./components/Post.vue"
import Home from "./components/Home.vue"
import AddPost from "./components/AddPost.vue"

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
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

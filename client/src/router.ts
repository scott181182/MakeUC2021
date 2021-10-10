import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import Home from "./views/Home.vue"
import Profile from "./views/Profile.vue"
import Catalog from "./views/Catalog.vue"
import About from "./views/About.vue"
import Contact from "./views/Contact.vue"



export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/profile",
        name: "My Profile",
        component: Profile
    },
    {
        path: "/catalog",
        name: "Catalog",
        component: Catalog
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
        component: About
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router
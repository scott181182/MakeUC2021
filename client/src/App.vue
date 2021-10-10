<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="nav-wrapper">
            <ul>
                <router-link
                    v-for="route in routes.slice(0, 2)"
                    :key="route.name"
                    :to="route.path"
                    custom
                    v-slot="{ href, navigate, isActive }"
                >
                    <li class="hide-on-med-and-down" :class="{ active: isActive }" @click="navigate">
                        <a :href="href" v-text="route.name"></a>
                    </li>
                </router-link>

                <img src="/bookcap.png" class="brand-image"/>

                <router-link
                    v-for="route in routes.slice(2, 4)"
                    :key="route.name"
                    :to="route.path"
                    custom
                    v-slot="{ href, navigate, isActive }"
                >
                    <li class="hide-on-med-and-down" :class="{ active: isActive }" @click="navigate">
                        <a :href="href" v-text="route.name"></a>
                    </li>
                </router-link>
            </ul>
            <!-- <div class="navbar-menu" :class="{ 'is-active': mobileNavActive }">
                <div class="navbar-stretch">
                    <router-link
                        v-for="route in routes"
                        :key="route.name"
                        :to="route.path"
                        custom
                        v-slot="{ href, navigate, isActive }"
                    >
                        <div class="navbar-item" :class="{ active: isActive }" @click="navigate">
                            <a :href="href" v-text="route.name"></a>
                        </div>
                    </router-link>
                </div>
            </div> -->
        </div>
    </nav>
    <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { navRoutes } from "./router";


@Options({  })
export default class NavBar extends Vue
{
    public routes = navRoutes;

    public mobileNavActive = false;
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: #e0e0e0;
}

nav {
    margin-bottom: 1rem;
}
.nav-wrapper>ul {
    display: flex;
    flex-flow: row;
    justify-content: space-around;

    &>.brand-image {
        height: 62px;
    }
    &>li {
        text-align: center;
        flex-grow: 1;
        font-weight: bold;
    }
}

// .navbar {
//     flex-direction: column;
//     justify-content: center;
//     border-bottom: 2px solid gray;

//     .navbar-brand {
//         flex-grow: 1;
//         justify-content: center;
//     }
// }
// .navbar-stretch {
//     display: flex;
//     flex-grow: 1;
//     align-content: stretch;
//     justify-content: space-around;

//     .navbar-item {
//         flex-grow: 1;
//         justify-content: center;

//         cursor: pointer;

//         border: 2px solid gray;
//         border-top-left-radius: 8px;
//         border-top-right-radius: 8px;
//         border-bottom: none;

//         background-color: white;
//         &:hover { background-color: #ccc; }

//         &.active {
//             // text-decoration: underline;
//             background-color: orange;
//         }

//         a {
//             font-weight: bold;
//             color: #2c3e50;
//         }
//     }
// }
</style>

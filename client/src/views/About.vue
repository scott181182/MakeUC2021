<template>
    <div class="container">
        <div class="row">
            <div
                v-for="person of people"
                :key="person.name"
                class="col s6 l3"
            >
                <div class="card">
                    <div class="card-image">
                        <img :src="person.image" class="person-image"/>
                    </div>
                    <div class="card-content">
                        <span class="card-title" v-text="person.name"></span>
                        <p v-text="person.title"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";



export default class AboutPage extends Vue
{
    public people = [
        {
            name: "Nicole Carver",
            title: "UC Gradute Student - Psychology",
            image: "/about/ncarver.jpg"
        },
        {
            name: "Dalton Cooper",
            title: "UC Gradute Student - Psychology",
            image: "/about/dcooper.jpg"
        },
        {
            name: "Scott Fasone",
            title: "UC Gradute Student - EECS",
            image: "/about/sfasone.jpg"
        },
        {
            name: "Emily Wang",
            title: "UC Gradute Student - Psychology",
            image: "/about/ewang.jpg"
        },
    ]
}
</script>

<style lang="scss">
.person-image {
    // height: 20vh;
}
</style>

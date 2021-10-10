<template>
    <div class="container">
        <div class="row" id="article-grid">
            <div v-for="article in articles" :key="article.title" class="col s12">
                <div class="card article-card" @click="navigate">
                    <div class="card-content card-header">
                        <div>
                            <router-link class="card-title" :to="'/catalog/' + article.directory">
                                {{ article.title }}
                            </router-link>
                            <p v-text="article.authors"></p>
                        </div>
                        <button class="btn btn-flat" area-label="show abstract" @click="article.show = !article.show">
                            <span class="icon">
                                <i :class="[ 'fas', 'fa-2x', article.show ? 'fa-angle-up' : 'fa-angle-down' ]" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div class="card-content" v-if="article.show">
                        <p v-text="article.abstract"></p>
                    </div>
                    <div class="card-action" v-if="article.show">
                        <router-link class="btn" :to="'/catalog/' + article.directory">
                            <i class="fas fa-book-open"></i>
                            Read Now!
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { CatalogObject } from "@/common/Catalog";
import { Vue } from "vue-class-component"

import { fetchCatalog } from "../api";



export default class CatalogPage extends Vue
{
    public articles: CatalogObject["articles"] = [  ];



    public mounted(): void {
        fetchCatalog().then((catalog) => {
            this.articles = catalog.articles
        });
    }
}
</script>

<style lang="scss">
@import "../assets/variables.scss";

#article-grid {
    flex-direction: column;
}

.article-card {
    // cursor: pointer;

    .card-header {
        display: flex;
        flex-flow: row;

        &>div {
            flex-grow: 1;
        }
    }

    // &:hover {
    //     background-color: #eaeaea;
    // }

    a { color: black; }
    a:hover { text-decoration: underline; }

    .card-action {
        text-align: right;

        .btn {
            color: white;
            background-color: $primary-color;
        }
    }
}
</style>

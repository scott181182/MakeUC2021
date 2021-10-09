<template>
    <section class="section">
        <div class="container">
            <div class="columns" id="article-grid">
                <div v-for="article in articles" :key="article.title" class="column is-12">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>{{ article.title }}</strong>
                                            <br/>
                                            {{ article.authors }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component"



export default class CatalogPage extends Vue
{
    public articles = [
        {
            title: "A critical review on the moderating role of contextual factors in the associations between video gaming and well-being",
            authors: "Andree Hartanto, Verity Y.Q. Lua, Frosch Y.X. Quek, Jose C.Yong, Matthew H.S.Ng"
        },
        {
            title: "It's in your hands: How variable perception affects grasping estimates in virtual reality",
            authors: "Megan Rose Readman, Dalton Cooper, Sally A. Linkenauger"
        },
        {
            title: "If Looks Could Kill: Anger Attributions Are Intensified by Affordances for Doing Harm",
            authors: "Colin Holbrook, Andrew Galperin, Daniel M.T. Fessler, Kerri L. Johnson, Gregory A. Bryant, & Martie G. Haselton"
        }
    ];
}
</script>

<style lang="scss">
#article-grid {
    flex-direction: column;
}
</style>

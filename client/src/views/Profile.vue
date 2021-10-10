<template>
    <div class="sidebar">
        <i class="fas fa-user fa-10x"></i>
        <span>User Name</span>
        <span>This is a test/example page,</span>
        <span>User functionality to-be-implemented.</span>
        <div class="spacer"></div>
        <ul>
            <li><a href="#">Favorites</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Messages</a></li>
        </ul>
        <div class="spacer"></div>
        <div class="divider"></div>
        <div class="spacer"></div>
        <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Settings</a></li>
        </ul>
        <div class="spacer"></div>
    </div>

    <div class="article-container">
        <div id="recent-row" class="row">
            <div class="col s12">
                <h5>Recent Articles</h5>
            </div>
            <div
                v-for="ex in recentExamples"
                :key="ex.title"
                class="col s12 m6 l4 xl3 article-preview"
            >
                <i class="fas fa-book fa-10x"></i>
            </div>
        </div>
        <div class="divider"></div>
        <div id="favorite-row" class="row">
            <div class="col s12">
                <h5>Favorites</h5>
            </div>
            <div
                v-for="ex in favoriteExamples"
                :key="ex.title"
                class="col s12 m6 l4 xl3 article-preview"
            >
                <i class="fas fa-book fa-10x"></i>
            </div>
        </div>
        <div class="divider"></div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class ProfilePage extends Vue
{
    public recentExamples = [
        { title: "1" },
        { title: "2" },
        { title: "3" },
        { title: "4" },
        { title: "5" },
        { title: "6" },
    ];

    public favoriteExamples = [
        { title: "1" },
        { title: "2" },
        { title: "3" },
        { title: "4" },
        { title: "5" },
    ];
}
</script>

<style lang="scss">
@import "../assets/variables.scss";

.sidebar {
    position: absolute;
    margin-top: 1px;
    top: $navbar-height;
    left: 0;
    bottom: 0;
    width: 300px;

    padding: 1rem;
    background-color: white;
    opacity: 0.75;

    display: flex;
    flex-flow: column;
    text-align: center;

    i {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    li {
        font-size: 1.25rem;
        line-height: 2.5rem;

        &:hover { background-color: #e0e0e0; }

        a { color: black; }
    }
}

.spacer {
    flex-grow: 1;
}

.article-container {
    position: absolute;
    top: $navbar-height;
    right: 0;
    bottom: 0;
    left: 300px;
    padding: 2rem;

    overflow-y: auto;

    .article-preview {
        text-align: center;
        padding: 0.5rem !important;
    }
}
</style>

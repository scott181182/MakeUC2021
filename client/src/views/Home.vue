<template>
    <div class="container">
        <div class="row">
            <div class="col s12">
                <section id="billboard" class="card">
                    <div class="card-content">
                        <span class="card-title">
                            Academ-eReader
                        </span>
                        <p>
                            Welcome to this prototype website!
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";



export default class Home extends Vue {  }
</script>

<style lang="scss">
#billboard {
    .card-title {
        font-size: 4rem;
        line-height: 6rem;
    }
}
</style>

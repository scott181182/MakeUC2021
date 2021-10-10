<template>
    <div class="container">
        <div class="row">
            <div class="col s12">
                <section id="billboard" class="card">
                    <div class="card-content">
                        <span class="card-title">
                            Academ-eReader
                        </span>
                        <span class="card-subtitle">Creating steps up the Ivory Tower</span>
                        <p>
                            Academ-eReader strives to provide readers user-friendly, tailored audio recordings of academic articles. We seek to support multiple forms of access to the scholarly community.
                        </p>
                        <p>
                            Reading academic articles is tiring for most, and inaccessible for many. It is our goal to ensure that academic material is accessible to all who wish to engage with it. By offering multiple methods of engagement, we are actively promoting the implementation of universal design in various academic environments. Whether your time is constrained by collecting your kids from school every day, or reading articles is impeded by neurodiversity - we seek to remove barriers to learning.
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
        margin-bottom: 0;
    }
    .card-subtitle {
        color: #333;
        font-size: 1.25rem;
    }
    p { margin-top: 1.5rem; }
}
</style>

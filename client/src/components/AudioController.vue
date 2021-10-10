<template>
    <div id="control-panel" class="col s12">
        <audio
            style="display: hidden;"
            ref="audio"
        >
            <source :src="src" type="audio/ogg"/>
            Sorry, your browser does not support the audio element.
        </audio>
        <div class="controls">
            <button class="btn btn-flat" aria-label="play pause toggle" @click="togglePlay">
                <i :class="[ 'fas', playing ? 'fa-pause' : 'fa-play' ]"></i>
            </button>
            <div class="timer">
                <span aria-label="timer" v-text="elapsedTime"></span>
                <div class="progress">
                    <div class="determinate" :style="{ width: audioProgress }"></div>
                </div>
                <span v-text="endTime"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";



@Options({
    props: {
        src: String
    }
})
export default class AudioController extends Vue
{
    // @Prop(String) readonly src!: string;

    public playing = false;
    public elapsedTime = "00:00";
    public endTime = "00:00";
    public audioProgress = "0%";

    private get audio() { return this.$refs.audio as HTMLAudioElement; }

    public mounted(): void {
        this.audio.addEventListener("timeupdate", () => this.updateTime("elapsedTime", this.audio.currentTime));
        this.audio.addEventListener("loadeddata", () => this.updateTime("endTime",     this.audio.duration));
        this.audio.addEventListener("ended", () => this.playing = false);
    }


    public togglePlay(): void {
        if(this.audio.paused) {
            this.audio.play();
            this.playing = true;
        } else {
            this.audio.pause();
            this.playing = false;
        }
    }
    public moveTo(millis: number): void {
        // console.log(`Moving to ${millis} = ${millis/1000}`);
        if(this.audio.paused) {
            this.audio.currentTime = millis / 1000;
        } else {
            this.audio.pause();
            this.audio.currentTime = millis / 1000;
            this.audio.play();
        }
    }

    private updateTime(key: "elapsedTime" | "endTime", time: number) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);

        const minuteValue = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondValue = seconds < 10 ? `0${seconds}` : `${seconds}`;

        this[key] = `${minuteValue}:${secondValue}`;
        this.audioProgress = (this.audio.currentTime * 100 / this.audio.duration).toPrecision(4) + "%";
    }
}
</script>

<style scoped lang="scss">
.controls {
    display: flex;
    flex-flow: row;
    padding: 0.5rem;
    align-content: center;

    .timer {
        display: flex;
        flex-flow: row;
        align-items: center;

        flex-grow: 1;
        margin-left: 1rem;

        div.progress {
            flex-grow: 1;
            margin: .5rem 1rem;
        }
    }
}
</style>

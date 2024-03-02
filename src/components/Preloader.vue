<template>
  <div class="prel" v-show="!showContent" ref="preloader">
    <div class="preloader">
      <div class="loader">{{ counter }}</div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  data() {
    return {
      counter: 0,
      targetNumbers: [12, 24, 48, 56, 64, 76, 82, 98, 100],
      currentIndex: 0,
      intervalId: null,
      showContent: false
    };
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.counter = this.targetNumbers[this.currentIndex];
      if (this.currentIndex < this.targetNumbers.length - 1) {
        this.currentIndex++;
      } else {
        clearInterval(this.intervalId);
          gsap.to(this.$refs.preloader, {
            duration: 0.5,
            y: "-100%",
            onComplete: () => {
              this.showContent = true;
              document.body.style.overflow = '';
            }
          });
      }
    }, 1000);

    document.body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>

<style scoped>
.prel {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background: #101820;
  overflow: hidden;
}

.preloader {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.loader {
  color: #E63E3A;
  text-align: right;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: #000;
  font-size: 230px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 504px;
  height: 266px;
  margin: 0 20px 20px 20px;
  right: 0;
  bottom: 0;
  transition: opacity 0.5s ease;
  align-self: flex-end;
}
</style>
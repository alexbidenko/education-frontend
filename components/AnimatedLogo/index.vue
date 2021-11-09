<template>
  <transition name="fade">
    <v-card v-if="show" tile class="logoContainer">
      <img class="logo" src="/icons/logo.svg" />
    </v-card>
  </transition>
</template>

<script>
export default {
  name: 'AnimatedLogo',
  data: () => ({
    show: true,
  }),

  mounted() {
    setTimeout(() => {
      this.show = false
    }, 1000)
  },
}
</script>

<style scoped lang="scss">
.logoContainer {
  display: flex;
  align-content: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000000;
  flex-direction: column;
}

.logo {
  animation: animated-logo 1.5s ease forwards;
  width: 240px;
  height: 240px;
  margin: auto;

  @keyframes animated-logo {
    0% {
      opacity: 0;
      transform: scale(0.7) rotate(45deg);
    }

    30% {
      opacity: 1;
      transform: rotate(45deg);
    }

    70% {
      transform: rotate(-15deg);
    }

    80% {
      transform: rotate(0);
    }

    90% {
      transform: scale(1.3) rotate(0);
      opacity: 1;
    }

    100% {
      transform: scale(1.1) rotate(0);
      opacity: 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

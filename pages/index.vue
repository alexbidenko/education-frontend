<template>
  <UserPage :user="user" :user-id="user.id" owner />
</template>

<script>
import UserPage from '../components/UserPage'

export default {
  components: {
    UserPage,
  },
  computed: {
    user() {
      return this.$store.state.UserModule.user
    },
  },
}
</script>

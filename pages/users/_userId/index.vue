<template>
  <UserPage :user="user" :user-id="+$route.params.userId" />
</template>

<script>
import UserPage from '~/components/UserPage'

export default {
  components: {
    UserPage,
  },
  async asyncData(ctx) {
    return {
      user: await ctx.$axios.$get('get_user/' + ctx.route.params.userId),
    }
  },
  data: () => ({
    user: null,
  }),
}
</script>

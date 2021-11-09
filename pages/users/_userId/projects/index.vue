<template>
  <PreviewProjects :projects="projects" />
</template>

<script>
import PreviewProjects from '~/components/PreviewProjects'
export default {
  name: 'Index',
  components: { PreviewProjects },
  data: () => ({
    projects: [],
  }),
  async fetch() {
    const data = await this.$axios.$get(
      `projects/?creator=${this.$route.params.userId}`
    )
    this.projects = data.result
  },
}
</script>

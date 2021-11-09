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
      'projects/'
    )
    this.projects = data.result
  },
}
</script>

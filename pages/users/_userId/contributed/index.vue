<template>
  <PreviewProjects :projects="projects" contribute full />
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
    const contributedProjects = await this.$axios.$get(
      'get_user_status/' + this.$route.params.userId + '/'
    )
    this.projects = contributedProjects.statuses.map((el) => ({
      ...el.project,
      statusName: el.name,
    }))
  },
}
</script>

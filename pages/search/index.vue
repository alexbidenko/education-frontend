<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text class="py-0">
            <v-text-field placeholder="Поиск" />
          </v-card-text>
        </v-card>
      </v-col>
      <PreviewProjects connect />
    </v-row>
  </v-container>
</template>

<script>
import PreviewProjects from '~/components/PreviewProjects'
export default {
  name: 'Index',
  components: { PreviewProjects },
}
</script>

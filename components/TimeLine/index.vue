<template>
  <v-card class="py-0 mt-4">
    <v-timeline align-top dense>
      <v-timeline-item color="pink" small>
        <v-row class="pt-1">
          <v-col>
            <strong>New Icon</strong>
            <div class="caption">Mobile App</div>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item color="teal lighten-3" small>
        <v-row class="pt-1">
          <v-col>
            <strong>Design Stand Up</strong>
            <div class="caption mb-2">Hangouts</div>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item color="pink" small>
        <v-row class="pt-1">
          <v-col>
            <strong>Lunch break</strong>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item color="teal lighten-3" small>
        <v-row class="pt-1">
          <v-col>
            <strong>Finish Home Screen</strong>
            <div class="caption">Web App</div>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script>
export default {
  name: 'TimeLine',
}
</script>

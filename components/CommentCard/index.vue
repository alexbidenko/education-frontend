<template>
  <div class="mx-auto">
    <v-list subheader two-line>
      <v-list-item v-for="file in files" :key="file.title">
        <v-list-item-avatar>
          <v-icon :class="file.color" dark v-text="file.icon"></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            style="white-space: pre-wrap !important"
            v-text="file.title"
          ></v-list-item-title>
          <v-list-item-subtitle
            style="white-space: pre-wrap !important"
            v-text="file.subtitle"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'CommentCard',
  data: () => ({
    files: [
      {
        color: 'blue',
        icon: 'mdi-clipboard-text',
        title: 'Test title',
        subtitle: 'Test text',
      },
      {
        color: 'amber',
        icon: 'mdi-gesture-tap-button',
        title: 'Test title',
        subtitle: 'Test text',
      },
    ],
  }),
}
</script>

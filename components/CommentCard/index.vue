<template>
  <div class="mx-auto">
    <v-list subheader two-line>
      <v-list-item v-for="item in comments" :key="item.date">
        <v-list-item-avatar>
          <v-img
            :src="`${baseURL}posts/media/avatars/${item.user.avatar_image}`"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            style="white-space: pre-wrap !important"
            v-text="`${item.user.name} ${item.user.last_name}`"
          ></v-list-item-title>
          <v-list-item-subtitle
            style="white-space: pre-wrap !important"
            v-text="item.description"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'CommentCard',
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    baseURL: process.env.BASE_URL,
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

<template>
  <div>
    <v-menu
      v-model="menu"
      bottom
      right
      transition="scale-transition"
      origin="top left"
    >
      <template #activator="{ on }">
        <v-chip pill v-on="on">
          <v-avatar left>
            <v-img
              :src="
                item.creator[0].avatar_image
                  ? `${baseURL}posts/media/avatars/${item.creator[0].avatar_image}`
                  : '/assets/substrate.jpg'
              "
            ></v-img>
          </v-avatar>
          {{ item.creator[0].name }} {{ item.creator[0].last_name }}
        </v-chip>
      </template>
      <v-card width="300">
        <v-list dark>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="
                  item.creator[0].avatar_image
                    ? `${baseURL}posts/media/avatars/${item.creator[0].avatar_image}`
                    : '/assets/substrate.jpg'
                "
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                >{{ item.creator[0].name }}
                {{ item.creator[0].last_name }}</v-list-item-title
              >
              <v-list-item-subtitle>{{
                item.creator[0].email
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="menu = false">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-list v-if="item.creator[0].organization">
          <v-list-item @click="() => {}">
            <v-list-item-action>
              <v-icon>mdi-briefcase</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle>{{
              item.creator[0].organization
            }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'PreviewMenu',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    menu: false,
    baseURL: process.env.BASE_URL,
  }),
}
</script>

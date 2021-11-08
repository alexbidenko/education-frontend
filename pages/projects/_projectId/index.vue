<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3">
        <v-card class="mb-4">
          <img
            style="width: 100%; display: block"
            src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/01/08/avatar-sigourney-weaver.jpg?width=1200&auto=webp&quality=75"
          />
        </v-card>
        <v-card class="mb-4 p-1">
          <v-chip class="ma-1">Default</v-chip>
          <v-chip class="ma-1">Default</v-chip>
          <v-chip class="ma-1">Default</v-chip>
          <v-chip class="ma-1">Default</v-chip>
          <v-chip class="ma-1">Default</v-chip>
        </v-card>

        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-btn :to="`/projects/${$route.params.projectId}/board`"
            >Доска</v-btn
          >
        </v-card>

        <ContributeCard v-for="i in 5" :key="i" />
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="mb-4">
          <div v-for="i in 5" :key="i">
            <v-card-title>Загружен файл</v-card-title>
            <v-card-text>Загружен файл, который все сломал</v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ContributeCard from '~/components/ContributeCard'
export default {
  components: { ContributeCard },

  data: () => ({
    items: [
      { header: 'Контрибьюторы' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
}
</script>

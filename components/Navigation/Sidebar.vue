<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
      <v-subheader>Recently Visited</v-subheader>

      <v-list-item
        v-for="post in recentPosts"
        :key="post.id"
        :to="post.link"
        link
      >
        <v-list-item-content>
          <v-list-item-title text-truncate>{{ post.title }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      posts: [],
    }
  },
  computed: {
    ...mapGetters(['recentPosts']),
  },
}
</script>

<template>
  <v-main class="grey lighten-3">
    <v-dialog width="500px" v-model="dialog" scrollable>
      <PostCard
        :id="clickedPost.id"
        :title="clickedPost.attributes.title"
        :body="clickedPost.attributes.body"
        :thumbnail="thumbnail"
        :ownerID="clickedPost.relationships.owner.data.id"
        @closeDialog="dialog = false"
      />
    </v-dialog>
    <v-container>
      <v-row>
        <v-col cols="3">
          <Sidebar />
        </v-col>

        <v-col>
          <v-btn
            v-if="$auth.loggedIn"
            to="/posts/new"
            class="mx-auto"
            elevation="2"
            icon
            ><v-icon>mdi-plus</v-icon></v-btn
          >
          <PostList @showPostDialog="dialogHandler" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      clickedPost: {
        id: '',
        attributes: {
          title: '',
          body: '',
          thumb_image: '',
        },
        relationships: {
          owner: {
            data: {
              id: '',
            },
          },
        },
      },

      dialog: false,
    }
  },
  computed: {
    thumbnail() {
      if (this.clickedPost.attributes.thumb_image) {
        return 'http://127.0.0.1:8000' + this.clickedPost.attributes.thumb_image
      } else return ''
    },
  },
  methods: {
    dialogHandler(post) {
      this.clickedPost = post
      this.dialog = true
      this.$store.dispatch('addRecentPost', this.clickedPost.id)
    },
  },
}
</script>

<template>
  <v-main class="grey lighten-3">
    <v-dialog width="500px" v-model="dialog" scrollable>
      <PostCard
        :id="clickedPost.attributes.id"
        :title="clickedPost.attributes.title"
        :body="clickedPost.attributes.body"
        :thumbnail="thumbnail"
      />
    </v-dialog>
    <v-container>
      <v-row>
        <v-col cols="3">
          <Sidebar />
        </v-col>

        <v-col>
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
        attributes: {
          title: '',
          body: '',
          thumb_image: '',
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
      console.log(post)
      this.dialog = true
      this.clickedPost = post
    },
  },
}
</script>

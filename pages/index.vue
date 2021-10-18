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
        <v-col cols="3" v-if="!mobile">
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
      <v-row>
        <v-col>
          <v-pagination
            @input="updatePage"
            :value="pagination.current_page"
            :length="pagination.last_page"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['pagination']),
    thumbnail() {
      if (this.clickedPost.attributes.thumb_image) {
        return 'http://127.0.0.1:8000' + this.clickedPost.attributes.thumb_image
      } else return ''
    },
    mobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        case 'md':
          return false
        case 'lg':
          return false
        case 'xl':
          return false
      }
    },
  },
  methods: {
    dialogHandler(post) {
      this.clickedPost = post
      this.dialog = true
      this.$store.dispatch('addRecentPost', this.clickedPost.id)
    },
    async updatePage(value) {
      await this.$store.dispatch('updatePage', value)
      this.$vuetify.goTo(0, {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',
      })
    },
  },
}
</script>

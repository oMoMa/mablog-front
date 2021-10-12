<template>
  <div>
    <v-card width="500px" class="mx-auto">
      <v-img v-if="thumbnail" :src="thumbnail"></v-img>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        {{ body }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          text
          @click="toggleFavorite"
          class="red--text ml-10"
          v-if="$auth.loggedIn"
          ><v-icon class="mr-1">{{
            favorited ? 'mdi-heart' : 'mdi-heart-outline'
          }}</v-icon
          >Favorite</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          elevation="false"
          text
          v-if="$auth.loggedIn && ownerID == $auth.user.id"
          :to="editLink"
          ><v-icon class="mr-1">mdi-pencil</v-icon>Edit</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          elevation="false"
          text
          v-if="$auth.loggedIn && ownerID == $auth.user.id"
          class="mr-10"
          @click="deleteDialog = true"
          ><v-icon class="mr-1">mdi-delete</v-icon>Delete</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog width="300px" v-model="deleteDialog">
      <v-card>
        <v-card-title>Are you sure?</v-card-title>
        <v-card-actions
          ><v-btn text color="red" @click="deletePost">Yes</v-btn
          ><v-spacer></v-spacer
          ><v-btn text @click="deleteDialog = false">No</v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    ownerID: {
      type: String,
    },
  },
  data() {
    return {
      favorited: false,
      deleteDialog: false,
    }
  },
  computed: {
    editLink() {
      return '/posts/' + this.id + '/edit'
    },
  },
  methods: {
    async toggleFavorite() {
      const url = '/api/posts/' + this.id + '/favorites'
      if (this.favorited) {
        try {
          const res = await this.$axios.delete(url)
          if ((res.code = '202')) {
            this.favorited = false
          }
        } catch (e) {
          console.error(e)
        }
      } else {
        try {
          const res = await this.$axios.post(url)
          if ((res.code = '201')) {
            this.favorited = true
          }
        } catch (e) {
          console.error(e)
        }
      }
    },
    async deletePost() {
      const url = '/api/posts/' + this.id
      try {
        const res = await this.$axios.delete(url)
        if ((res.code = '202')) {
          this.$store.dispatch('deletePost', this.id)
          this.deleteDialog = false
          this.$emit('closeDialog')
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
  mounted() {
    this.$axios
      .get('/api/posts/' + this.id + '/favorites')
      .then((res) => {
        if ((res.code = '200')) {
          if (res.data == '1') {
            this.favorited = true
          } else this.favorited = false
        }
      })
      .catch((e) => console.error(e))
  },
}
</script>

<style scoped></style>

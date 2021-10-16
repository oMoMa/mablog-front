<template>
  <v-main class="grey lighten-3">
    <PostEditCard
      :loadedPost="emptyPost"
      :editing="false"
      @uploadPost="uploadPost"
    />
  </v-main>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      emptyPost: {
        attributes: {
          title: '',
          body: '',
          thumb_image: '',
        },
      },
    }
  },
  methods: {
    async uploadPost(post) {
      let formData = new FormData()
      formData.append('cover', post.attributes.thumb_image)
      formData.append('title', post.attributes.title)
      formData.append('body', post.attributes.body)
      formData.append('published', '1')
      try {
        await this.$axios.post('/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.$store.dispatch('updatePage', 1)
      } catch (error) {
        console.error(error)
      }
      this.$router.back()
    },
  },
}
</script>

<style></style>

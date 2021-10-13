<template>
  <v-main class="grey lighten-3">
    <PostEditCard
      :loadedPost="loadedPost"
      :editing="true"
      @uploadPost="uploadPost"
    />
  </v-main>
</template>

<script>
export default {
  middleware: ['auth', 'check-owner'],
  async fetch() {
    const res = await this.$axios.get(`/api/posts/${this.$route.params.id}`)
    this.loadedPost = res.data.data
  },
  data() {
    return {
      loadedPost: {
        attributes: {
          title: '',
          body: '',
          thumb_image: '',
        },
      },
    }
  },
  computed: {
    thumbnail() {
      if (this.loadedPost.attributes.thumb_image) {
        return this.loadedPost.attributes.thumb_image
      } else return ''
    },
  },
  methods: {
    async uploadPost(post) {
      let formData = new FormData()
      // formData.append('cover', post.attributes.thumb_image)
      formData.append('title', post.attributes.title)
      formData.append('body', post.attributes.body)
      formData.append('published', 'true')

      try {
        const response = await this.$axios.put(
          `/api/posts/${this.$route.params.id}`,
          {
            title: post.attributes.title,
            body: post.attributes.body,
            published: true,
          }
          // formData,
          // {
          //   headers: {
          //     'Content-Type': 'multipart/form-data',
          //   },
          // }
        )
        this.$store.dispatch('editPost', response.data.data)
      } catch (error) {
        console.error(error)
      }
      this.$router.push('/')
    },
  },
}
</script>

<style></style>

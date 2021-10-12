<template>
  <v-main class="grey lighten-3">
    <PostEditCard
      :titleProp="loadedPost.attributes.title"
      :bodyProp="loadedPost.attributes.body"
      :thumbnailProp="thumbnail"
      :editing="true"
    />
  </v-main>
</template>

<script>
export default {
  middleware: ['auth', 'check-owner'],
  async fetch() {
    const res = await this.$axios.get(`/api/posts/${this.$route.params.id}`)

    this.loadedPost = res.data.data
    // this.$axios
    //   .get(`/api/posts/${this.$route.params.id}`)
    //   .then((res) => {
    //     console.log(res.data.data)
    //     this.loadedPost = res.data.data
    //   })
    //   .catch((e) => console.error(e))
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
  mounted() {
    console.log(this.loadedPost)
  },
}
</script>

<style></style>

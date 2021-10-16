<template>
  <section>
    <PostPreviewCard
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.attributes.title"
      :body="post.attributes.body"
      :thumbnail="'http://127.0.0.1:8000' + post.attributes.thumb_image"
      @clicked="$emit('showPostDialog', post)"
    />
    <div class="text-center">
      <v-pagination
        @input="updatePage"
        :value="pagination.current_page"
        :length="pagination.last_page"
      ></v-pagination>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showDialog: false,
    }
  },
  computed: {
    ...mapGetters(['posts', 'pagination']),
  },
  methods: {
    updatePage(value) {
      this.$store.dispatch('updatePage', value)
    },
  },
  mounted() {},
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>

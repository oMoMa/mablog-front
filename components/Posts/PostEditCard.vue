<template>
  <v-card width="500px" class="mx-auto my-10">
    <v-form v-model="valid" @submit.prevent="uploadPost">
      <v-card-text>
        <v-text-field
          v-model="data.title"
          :rules="titleRules"
          :counter="50"
          placeholder="Title"
          label="Title"
          outlined
          required
        ></v-text-field>
        <v-textarea
          v-model="data.body"
          :rules="bodyRules"
          placeholder="Body"
          name="postBody"
          outlined
          label="Body"
          auto-grow
        ></v-textarea>
        Cover:
        <v-file-input
          :rules="fileRules"
          accept="image/*"
          label="File input"
          required
          v-model="data.cover"
        ></v-file-input>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn type="submit" color="info">Post</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  data() {
    return {
      data: {
        title: '',
        body: '',
        published: '1',
        cover: '',
      },

      valid: false,
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => v.length <= 50 || 'Title must be less than 50 characters',
      ],
      bodyRules: [
        (v) => !!v || 'Body is required',
        (v) => v.length >= 5 || 'Body must have at least 5 characters',
      ],
      fileRules: [(v) => !!v || !v],
    }
  },
  methods: {
    async uploadPost() {
      let formData = new FormData()
      formData.append('cover', this.data.cover)
      formData.append('title', this.data.title)
      formData.append('body', this.data.body)
      formData.append('published', this.data.published)

      if (this.valid) {
        try {
          const response = await this.$axios.post('/api/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          this.$store.dispatch('addPost', response)
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
}
</script>

<style></style>

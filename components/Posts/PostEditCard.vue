<template>
  <v-card width="500px" class="mx-auto my-10">
    <v-form
      v-model="valid"
      @submit.prevent="uploadPost(editing)"
      lazy-validation
    >
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
        <v-file-input
          accept="image/*"
          label="Cover"
          required
          v-model="data.cover"
          :rules="fileRules"
        ></v-file-input>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn type="submit" color="info">{{
          editing ? 'Update' : 'Post'
        }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    titleProp: {
      type: String,
    },
    bodyProp: {
      type: String,
    },
    thumbnailProp: {
      type: String,
    },
    editing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      data: {
        title: this.titleProp,
        body: this.bodyProp,
        published: '1',
        cover: this.thumbnailProp,
      },

      valid: true,
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
    async uploadPost({ redirect }, editing) {
      let formData = new FormData()
      formData.append('cover', this.data.cover)
      formData.append('title', this.data.title)
      formData.append('body', this.data.body)
      formData.append('published', this.data.published)

      if (this.valid) {
        try {
          if (editing) {
            const response = await this.$axios.put(
              '/api/posts/' + this.$route.params.id,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            )
            this.$store.dispatch('editPost', response.data)
          } else {
            const response = await this.$axios.post('/api/posts', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            this.$store.dispatch('addPost', response.data)
          }
        } catch (error) {
          console.error(error)
        }
        redirect('/')
      }
    },
  },
  created() {
    console.log(this.data)
  },
}
</script>

<style></style>

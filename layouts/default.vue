<template>
  <v-app>
    <v-container :width="width" class="pa-0">
      <TheHeader />
      <Nuxt />
      <TheFooter />
    </v-container>
  </v-app>
</template>

<script>
export default {
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%'
        case 'sm':
          return '100%'
        case 'md':
          return '80%'
        case 'lg':
          return '80%'
        case 'xl':
          return '80%'
      }
    },
  },
}
</script>

<style scoped></style>

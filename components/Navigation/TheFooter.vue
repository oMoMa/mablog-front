<template>
  <v-footer width="100%">
    <v-card flat tile width="100%" class="white text-center">
      <!-- <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text> -->
      <!-- 
        <v-divider></v-divider> -->

      <v-card-text class="text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

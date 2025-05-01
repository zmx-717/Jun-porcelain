<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
      <DeepSeekBall></DeepSeekBall>
    </v-main>
  
  </v-app>
</template>


<script setup>
import Header from './layouts/Header.vue';
import DeepSeekBall from './components/DeepSeekBall.vue';
</script>
<script setup>
  //USE https://www.netlify.com/ to PUBLISH YOUR WEB APP.
import Navbar from "@/components/Navbar.vue";

import { RouterView } from "vue-router";


/**
   * import Hero from "@/components/Hero.vue";
  import HomeCards from "@/components/HomeCards.vue";
  import JobsListings from "@/components/JobsListings.vue";
 */

</script>

<template>
  <Navbar />
  <RouterView />
  <!--
  <Hero />
  <HomeCards />
  <JobsListings :limit="3" :showButton="true" />
  -->
</template>

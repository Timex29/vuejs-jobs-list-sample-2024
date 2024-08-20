<script setup>
// The line `import { RouterLink } from 'vue-router';` is importing the `RouterLink` component from the
// `vue-router` package. This component is typically used in Vue.js applications to create links that
// navigate to different routes defined in the Vue Router. In the provided code snippet, the
// `RouterLink` component is used to create a link that navigates the user back to the "/jobs" route
// when clicked.
import { RouterLink } from 'vue-router';
</script>

<template>
   <!-- Go Back -->
    <section>
      <div class="container m-auto py-6 px-6">
        <!--<a
          href="jobs.html"
          class="text-green-500 hover:text-green-600 flex items-center"
        >
          <i class="fas fa-arrow-left mr-2"></i> Back to Job Listings
        </a>-->
        <RouterLink
          to="/jobs"
          class="text-green-500 hover:text-green-600 flex items-center">
          <i class="pi pi-arrow-circle-left mr-3"></i> Back to Job Listings
        </RouterLink>
      </div>
    </section>
</template>
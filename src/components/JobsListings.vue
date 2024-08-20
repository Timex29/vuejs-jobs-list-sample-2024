<script setup>
import { RouterLink } from "vue-router";
import Joblisting from "./Joblisting.vue";
//import jobData from "@/jobs.json";
import { reactive, onMounted } from "vue";

//install sppiner for loading desing
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import axios from "axios";

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

// ref vs reactive = reactive is for single object that has  each field inside of it(name, object, etc.) that we should use reactive and reactive is no '.value' while ref have it.  But using reactive is optional.

/* 
* const jobs = ref(jobData);
  console.log(jobs.value);
*/

//const jobs = ref([]);

const state = reactive({
  jobs: [],
  isLoading: true,
});

/**
 * onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/jobs');
    jobs.value = response.data;
  } catch (error) {
    console.error('Error fetching jobs', error);
  }
});
 */
onMounted(async () => {
  try {
    const response = await axios.get(
      //('http://localhost:5000/jobs')
      "/api/jobs"
    );
    state.jobs = response.data;
  } catch (error) {
    console.error("Error fetching jobs", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <!--Show loading spinner while loading is true-->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!--Show job listing when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!--<div v-for="job in jobs" :key="job.id">
          {{ job.title }} 
          
        </div>-->
        <Joblisting
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
        <!--for ref() is like this '
        <Joblisting
        v-for="job in jobs.slice(0, limit || jobs.length)"
          :key="job.id"
          :job="job" /> '-->
      </div>
    </div>
  </section>

  <!--Only show if the button is true-->
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <!--<a
        href="jobs.html"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</a
      >-->
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import BackButton from "@/components/BackButton.vue";
import { reactive, onMounted } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const jobId = route.params.id;

//you can use too a ref() if you like it.
const state = reactive({
  job: {},
  isLoading: true,
});

//use async becuase we use axios
const deleteJob = async () => {
  try {
      const confirm = window.confirm("Are you sure you want to delete this job?");
    if(confirm){
      await axios.delete(`/api/jobs/${jobId}`);
      toast.success("Job Deleted Successfully");
      router.push("/jobs");
    }
    
  } catch (error) {
    console.error("Error deleting job", error);
    toast.error("Job Not Deleted");
  }
};

/**
 * for localhost
 * onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:5000/jobs/${jobId}`);
    state.job = response.data;
  } catch (error) {
    console.error("Error fetching job", error);
  } finally {
    state.isLoading = false;
  }
});
 */

//for /api
onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${jobId}`);
    state.job = response.data;
  } catch (error) {
    console.error("Error fetching job", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <!--<div class="text-gray-500 mb-4">Full-Time</div>-->
            <div class="text-gray-500 mb-4">{{ state.job.type }}</div>

            <!--<h1 class="text-3xl font-bold mb-4">Front-End Engineer (Vue)</h1>-->
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <!--<p class="text-orange-700">Boston, MA</p>-->
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>
            <!--<p class="mb-4">
              We are seeking a talented Front-End Developer to join our team in
              Boston, MA. The ideal candidate will have strong skills in HTML,
              CSS, and JavaScript, with experience working with modern
              JavaScript frameworks such as Vue or Angular.
            </p>-->
            <p class="mb-4">
              {{ state.job.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <!--<p class="mb-4">$70k - $80K / Year</p>-->
            <p class="mb-4">{{ state.job.salary }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <!--<h2 class="text-2xl">NewTek Solutions</h2>-->
            <h2 class="text-2xl">{{ state.job.company.name }}</h2>

            <!--<p class="my-2">
              NewTek Solutions is a leading technology company specializing in
              web development and digital solutions. We pride ourselves on
              delivering high-quality products and services to our clients while
              fostering a collaborative and innovative work environment.
            </p>-->
            <p class="my-2">
              {{ state.job.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>
            <!--<p class="my-2 bg-green-100 p-2 font-bold">
              contact@newteksolutions.com
            </p>-->
            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <!--<p class="my-2 bg-green-100 p-2 font-bold">555-555-5555</p>-->
            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactPhone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <!--<a
              href="add-job.html"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</a-->
            <RouterLink
              :to="`/jobs/edit/${state.job.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink
            >
            <button
              @click="deleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
  <!--Show loading spinner while loading is true-->
  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>

<script>
//using Options API
export default {
  data() {
    return {
      name: "Asta!",
      //status: true,
      status: "pending",
      tasks: ["Task One", "Task Two", "Task Three"], //this is an array.
      link: "https://google.com",
    };
  },
  methods: {
    // methods is handle the data
    toggleStatus() {
      if (this.status === "active") {
        this.status = "pending";
      } else if (this.status === "pending") {
        this.status = "inactive";
      } else {
        this.status = "active";
      }
    },
  },
};
</script>

<template>
  <!--<h1>Vue Jobs</h1>-->
  <h1>{{ name }}</h1>
  <!--using interpolation -->

  <!--<p v-if="status">User is active</p>-->
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else>User is inactive</p>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>
  <!--a v-bind:href="link">Click for Google</a>-->
  <a :href="link">Click for Google</a>
  <!-- short of v-bind -->
  <br />

  <!-- <button v-on:click="toggleStatus">Change status</button> -->

  <button @click="toggleStatus">Change ,status</button
  ><!-- short of v-on -->

</template>


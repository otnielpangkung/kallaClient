<template>
  <div class="app">
    <Navbar />

    <div class="main">
      <Sidebar />
      <div class="mainPage row justify-content-center">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar
  },
  data: () => ({
    //
  })
};
</script>
<style>
.app {
  /* min-height: 100vh; */
  font-family: "Roboto Condensed", sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  font-family: "Roboto";
}
.mainPage {
  display: flex;

  padding: 0 10px;
}
.main {
  display: flex;
}
@media screen and(max-width: 800px) {
  * {
    display: none;
  }
}
</style>

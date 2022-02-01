<template>
  <div v-if="userLogin" class="sidebar">
    <header>
      <nav class="menu">
        <p>Menu</p>
        <ul>
          <li>
            <router-link to="/">
              <i class="fas fa-home"></i> HOME
            </router-link>
          </li>
          <li v-if="this.role == 'staff'">
            <router-link to="/addpage">
              <i class="fas fa-plus"></i> AddPage
            </router-link>
          </li>
          <li v-if="this.role == 'staff'">
            <router-link to="/schedule">
              <i class="fas fa-tasks"></i> Schedule
            </router-link>
          </li>
          <li v-if="this.role == 'staff'">
            <router-link to="/produksi">
              <i class="fas fa-file-word"></i> Laporan Produksi
            </router-link>
          </li>
          <li v-if="this.role == 'staff'">
            <router-link to="/realisasi">
              <i class="fas fa-truck"></i> Data BP
            </router-link>
          </li>

          <li v-if="this.role == 'staff'">
            <router-link to="/relasi">
              <i class="fas fa-user-friends"></i> Daftar Relasi
            </router-link>
          </li>
          <li v-if="this.role == 'staff'">
            <router-link to="/items">
              <i class="fas fa-truck-loading"></i>Daftar Item
            </router-link>
          </li>
          <li v-if="this.role == 'staff'">
            <router-link to="/solar">
              <i class="fas fa-gas-pump"></i> Daftar Solar
            </router-link>
          </li>
          <li v-if="this.role !== 'staff'">
            <router-link to="/allschedule">
              <i class="fas fa-tasks"></i>Seluruh Schedule
            </router-link>
          </li>
          <li v-if="this.role !== 'staff'">
            <router-link to="/allproduksi">
              <i class="fas fa-file-word"></i>Seluruh Produksi
            </router-link>
          </li>
          <li v-if="this.role !== 'staff'">
            <router-link to="/allrealisasi">
              <i class="fas fa-truck"></i> Seluruh Realisasi
            </router-link>
          </li>
          <li v-if="this.role !== 'staff'">
            <router-link to="/allrelasi">
              <i class="fas fa-user-friends"></i> Daftar Relasi
            </router-link>
          </li>
          <li v-if="this.role !== 'staff'">
            <router-link to="/allsolar">
              <i class="fas fa-oil-can"></i> Daftar Solar
            </router-link>
          </li>
          <li v-if="this.role !== 'staff'">
            <router-link to="/allkendala">
              <i class="fas fa-exclamation"></i> Daftar Kendala
            </router-link>
          </li>
          <li v-if="this.role == 'admin'">
            <router-link to="/alluser">
              <i class="fas fa-users-cog"></i> Daftar User
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  methods: {},
  computed: {
    namaCabang() {
      return localStorage.getItem("cabang");
    },
    userLogin() {
      return this.$store.state.isLogin;
    },
    role() {
      return localStorage.getItem("role");
    }
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.$store.commit("setUserLogin", true);
    }
    localStorage.getItem("role");
  }
};
</script>

<style scoped>
* {
  background-color: lavender;
  box-sizing: border-box;
  user-select: none;
  margin: 0;
  padding: 0;
  color: #038c3e;
}
.sidebar {
  min-height: 85vh;
  width: 12vw;
  max-width: 200px;
  margin-left: 3px;
}
p {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}
.menu {
  font-size: 14px;
}
nav ul {
  height: 100%;
  width: 100%;
  list-style: none;
}
nav ul li {
  line-height: 50px;
  /* border-bottom: 1px solid black; */
}
nav ul li {
  display: block;
  width: 100%;
  text-decoration: none;
  font-weight: bolder;
}

nav ul li a:hover {
  color: whitesmoke;
  background: #038c3e;
  /* border-left: springgreen; */
}
nav ul ul {
  position: static;
}
nav ul ul li {
  line-height: 40px;
  border-bottom: none;
}
@media screen and (max-width: 800px) {
  .sidebar {
    display: none;
  }
}
</style>
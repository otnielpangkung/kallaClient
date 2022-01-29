<template>
  <div class="container-fluid" id="nav">
    <nav v-if="userLogin" class="navbar navbar-expand-lg">
      <img src="../assets/mix1.png" id="gambar2" alt />
      <img src="../assets/KallaBeton.png" alt />
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>

          <li v-if="this.role == 'staff' " class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Menu</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/schedule">Schedule</a>
              <a class="dropdown-item" href="/realisasi">Realisasi</a>
              <a class="dropdown-item" href="/relasi">Relasi</a>
              <a class="dropdown-item" href="/items">Items</a>
              <a class="dropdown-item" href="/solar">Solar</a>
            </div>
          </li>
          <li v-if="this.role !== 'staff' " class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Menu</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="nav-link" href="/allschedule">Schedule</a>
              <a class="nav-link" href="/allrealisasi">Realisasi</a>
              <a class="nav-link" href="/allrelasi">Relasi</a>
              <a class="nav-link" href="/allsolar">Solar</a>
              <a class="nav-link" href="/allkendala">Kendala</a>
              <a class="nav-link" href="/alluser">Daftar User</a>
            </div>
          </li>
        </ul>
        <div class="nav-item dropdown mr-2">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user"></i>
            {{this.namaCabang}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" @click.prevent="showModal">Ubah Password</a>
            <a class="dropdown-item" @click.prevent="logout()">Logout</a>
          </div>
        </div>
      </div>
    </nav>
    <div class="footer-nav">
      <div id="gold"></div>
      <div id="putih"></div>
      <div id="hijau"></div>
    </div>
    <div class="modal fade" id="modalPass" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <form @submit.prevent="ubahPass()">
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Password Baru</label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="password" minlength="5" required />
                </div>
              </div>
              <button id="submit" type="submit" class="btn btn-primary mt-3">Ubah Password</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../API/axios";
export default {
  name: "Navbar",
  data() {
    return {
      password: ""
    };
  },
  methods: {
    showModal() {
      $("#modalPass").modal("show");
    },
    ubahPass() {
      return axios
        .put(
          "/user/password",
          {
            password: this.password
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          Swal.fire("Ok", "Password Berhasil diubah", "success");
          $("#modalPass").modal("hide");
          this.password = "";
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Maaf", "Periksa Kembali data anda", "error");
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.$store.commit("setUserLogin", false);
    }
  },
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
    localStorage.getItem("cabang");
    if (localStorage.getItem("access_token")) {
      this.$store.commit("setUserLogin", true);
    }
    localStorage.getItem("role");
  }
};
</script>

<style scoped>
#submit {
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: #038c3e;
  color: antiquewhite;
}
.adminMenu {
  display: flex;
}
#gold {
  min-height: 5px;
  background-color: #fbb34b;
}
#putih {
  min-height: 3px;
  background-color: #f2f2f2;
}
#hijau {
  min-height: 10px;
  background-color: #02731e;
}
#nav {
  padding: 0;
}
nav {
  padding: 0;
}
img {
  /* background-color: aqua; */
  width: 300px;
}

#gambar2 {
  width: 120px;
}
nav {
  min-height: 12vh;
  padding: 0;
  font-weight: bold;
  color: #038c3e;
}
nav a {
  color: #038c3e;
}
@media screen and (max-width: 800px) {
  #nav {
    width: 100%;
  }
  nav {
    padding: 0;
    font-weight: bold;
    color: #038c3e;
  }
  img {
    width: 200px;
  }
}

@media screen and (min-width: 800px) {
  li {
    display: none;
  }
}
</style>
<template>
  <div class="Loginpage row justify-content-md-center align-items-center">
    <!-- <img src alt /> -->
    <div class="loginBox col-lg-3 justify-content-md-center">
      <!-- <div class="row"> -->
      <div class="form col justify-content-md-center">
        <img src="../assets/KallaBeton.png" id="kallabeton" alt />
        <p id="selamatPagi">Selamat Datang!</p>
        <p id="solusi">Kalla Beton Pasti Bisa</p>
        <form @submit.prevent="login">
          <input type="text" v-model="username" placeholder="username" />
          <input type="password" v-model="password" placeholder="password" />
          <button type="submit" class="btn btn-success">Login</button>
        </form>
        <img id="oplogo" src="../assets/opLogo.png" alt />
        <div class="footerForm row">
          <p>copyright © 2021 - otnielpangkung</p>
        </div>
      </div>
      <!-- <div class="logoside">
        <img src="../assets/logoside.png" alt />
      </div>-->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import axios from "../API/axios";
import Swal from "sweetalert2";

export default {
  name: "Loginpage",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      return axios
        .post("/user/login", {
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          console.log(data);
          Swal.fire("Assalamualaikum", "Kalla Beton Pasti Bisa", "success");
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("role", data.role);
          this.$router.push("/");
          localStorage.setItem("cabang", data.cabang);
          this.$store.commit("setUserLogin", true);
        })
        .catch(err => {
          console.log(err);
          alert("Password / USername Salah!");
        });
    }
  },
  created() {
    localStorage.setItem("cabang", data.cabang);
  }
};
</script>

<style scoped>
* {
  font-family: "Nunito", sans-serif;
  margin: 0;
}
.Loginpage {
  background-image: url("../assets/2.jpg");
  background-size: cover;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
.loginBox {
  padding: 0;
  border: 1px solid rgb(202, 196, 196);
}
.logoside {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
#oplogo {
  margin-top: 15px;
  width: 30px;
}
img {
  justify-self: center;
}

.form {
  display: grid;
  background-color: whitesmoke;
  justify-content: center;
  margin: 0;
  padding: 0;
}
form {
  /* text-align: center;
   */

  justify-items: center;
  display: grid;
}
.form img {
  width: 200px;
  text-align: center;
}
#selamatPagi {
  font-weight: bold;
  font-size: 25px;
}
#solusi {
  font-size: 14px;
}
input {
  max-width: 200px;

  border: 1px rgb(150, 150, 150) solid;
  border-radius: 10px;
  margin-top: 10px;
  height: 35px;
  text-align: center;
}
button {
  margin-top: 10px;
  max-width: 100px;
  color: antiquewhite;
}
form {
  margin-top: 10px;
}
.footerForm {
  font-size: 12px;
  color: rgb(145, 144, 143);

  /* height: 150px; */
}
.form p {
  text-align: center;
}
@media screen and(max-width: 800px) {
  .logoside img {
    padding-left: 5px;
  }
}
</style>
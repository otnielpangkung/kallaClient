import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../API/axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    namaCabang: "",
    relasiUser: [],
    items: [],
    itemUser: [],
    scheduleUser: [],
    realisasiUser: [],
    nomorWoUser: [],
    allSchedule: [],
    allSolar: [],
    allMobil: [],
    allNomorWo: [],
    users: [],
    realisasi: [],
    relasi: [],
    solarUser: [],
    mobilUser: [],
  },
  mutations: {
    setUserLogin(state, data) {
      state.isLogin = data
    },
    setNamaJemaat(state, nama) {
      state.namaCabang = nama
    },
    setRelasiUSer(state, data) {
      state.relasiUser = data
    },
    setItems(state, data) {
      state.items = data
    },
    setItemUser(state, data) {
      state.itemUser = data
    },
    setUserSchedule(state, data) {
      state.scheduleUser = data
    },
    setNomorWo(state, data) {
      state.nomorWoUser = data
    },
    setAllSchedule(state, data) {
      state.allSchedule = data
    },
    setRealisasiUser(state, data) {
      state.realisasiUser = data
    },
    setAllUser(state, data) {
      state.users = data
    },
    setAllRealisasi(state, data) {
      state.realisasi = data
    },
    setAllRelasi(state, data) {
      state.relasi = data
    },
    setSolarUser(state, data) {
      state.solarUser = data
    },
    setMobilUser(state, data) {
      state.mobilUser = data
    },
    setAllSolar(state, data) {
      state.allSolar = data
    },
    setAllMobil(state, data) {
      state.allMobil = data
    },
    setAllNomorWo(state, data) {
      state.allNomorWo = data
    },

  },
  actions: {
    fetchRelasi(context) {
      return axios.get("/database/relasi/user", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {

        context.commit("setRelasiUSer", data)
      }).catch(err => {
        console.log(err);
      })
    },
    fetchItem(context) {
      return axios.get("/database/item").then(({ data }) => {
        context.commit("setItems", data)
      }).catch(err => {
        console.log(err);
      })
    },
    fetchItemUser(context) {
      return axios.get("/database/item/user", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        context.commit("setItemUser", data)
      }).catch(err => {
        console.log(err);
      })
    },
    fetchSchedule(context) {
      return axios.get("/database/schedule/user", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        context.commit("setUserSchedule", data)
      }).catch(err => {
        console.log(err);
      })
    },

    fetchRealisasiUser(context) {
      return axios.get("/database/realisasi/user", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        // console.log(data, "====");
        context.commit("setRealisasiUser", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getNomorWo(context) {
      return axios.get("/database/nomorwo/user", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        console.log(data.rows, "====xxxx");
        context.commit("setNomorWo", data)
      }).catch(err => {
        console.log(err);
      })
    },

    getAllSchedule(context) {
      return axios.get("/database/schedule", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        context.commit("setAllSchedule", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getAllUser(context) {
      return axios.get("/user/getall", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        context.commit("setAllUser", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getAllRealisasi(context) {
      return axios.get("/database/realisasi", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        // console.log(data, "==============");
        context.commit("setAllRealisasi", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getAllRelasi(context) {
      return axios.get("/database/relasi", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        console.log(data, "==============");
        context.commit("setAllRelasi", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getSolarUser(context) {
      return axios.get("/database/solar/user", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        // console.log(data, "==============");
        context.commit("setSolarUser", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getMobilUser(context) {
      return axios.get("/database/mobil/user", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        // console.log(data, "==============");
        context.commit("setMobilUser", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getAllMobil(context) {
      return axios.get("/database/mobil", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        // console.log(data, "==============");
        context.commit("setAllMobil", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getAllSolar(context) {
      return axios.get("/database/solar", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        // console.log(data, "==============");
        context.commit("setAllSolar", data)
      }).catch(err => {
        console.log(err);
      })
    },
    getAllNomorWo(context) {
      return axios.get("/database/allnomorwo", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        // console.log(data, "==============");
        context.commit("setAllNomorWo", data)
      }).catch(err => {
        console.log(err);
      })
    },
  },
  modules: {
  }
})

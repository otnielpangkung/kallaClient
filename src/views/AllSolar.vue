<template>
  <div class="Realisasi">
    <p class="mt-3" id="head">PEMAKAIAN SOLAR</p>

    <div class="form-row">
      <div class="input-group col-sm">
        <label class="my-1 mr-2" for="Username">Periode :</label>
        <vue-monthly-picker v-model="selectedMonth"></vue-monthly-picker>

        <div class="input-group col-sm">
          <label class="my-1 mr-2" for="Username">Cabang :</label>

          <select class="form-control" v-model="cabang">
            <option value="0" selected disabled>Pilih Cabang</option>

            <option v-for="user in setUser()" :key="user.id" :value="user.id">{{user.namaCabang}}</option>
          </select>
        </div>
        <button id="download" class="btn" @click.prevent="tableHtmlToExcel('relasiTable')">
          <i class="fa fa-download"></i> Download
        </button>
      </div>
    </div>
    <!-- <button id="download" class="btn" @click.prevent="tableHtmlToExcel('relasiTable')">
      <i class="fa fa-download"></i> Download
    </button>-->
    <!-- table -->
    <div class="tableView mb-5">
      <!-- </div> -->
      <table class="table table-bordered border-primary" id="relasiTable">
        <thead class="table">
          <th>No Kendaraan.</th>

          <th>Total</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
          <th>7</th>
          <th>8</th>
          <th>9</th>
          <th>10</th>
          <th>11</th>
          <th>12</th>
          <th>13</th>
          <th>14</th>
          <th>15</th>
          <th>16</th>
          <th>17</th>
          <th>18</th>
          <th>19</th>
          <th>20</th>
          <th>21</th>
          <th>22</th>
          <th>23</th>
          <th>24</th>
          <th>25</th>
          <th>26</th>
          <th>27</th>
          <th>28</th>
          <th>29</th>
          <th>30</th>
          <th>31</th>
        </thead>
        <tbody>
          <!-- {{this.mobilUser}} -->
          <tr v-for="mobil in filterMobil()" :key="mobil.id">
            <td id="edit">{{mobil.nomorMobil}}</td>

            <td id="uang">{{formatUang(getSolar(mobil.Solars,0))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,1))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,2))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,3))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,4))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,5))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,6))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,7))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,8))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,9))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,10))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,11))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,12))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,13))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,14))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,15))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,16))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,17))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,18))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,19))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,20))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,21))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,22))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,23))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,24))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,25))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,26))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,27))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,28))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,29))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,30))}}</td>
            <td id="uang">{{formatUang(getSolar(mobil.Solars,31))}}</td>
          </tr>
          <tr>
            <th id="edit">Total</th>
            <th id="uang">{{formatUang(getTotal(0))}}</th>
            <th id="uang">{{formatUang(getTotal(1))}}</th>
            <th id="uang">{{formatUang(getTotal(2))}}</th>
            <th id="uang">{{formatUang(getTotal(3))}}</th>
            <th id="uang">{{formatUang(getTotal(4))}}</th>
            <th id="uang">{{formatUang(getTotal(5))}}</th>
            <th id="uang">{{formatUang(getTotal(6))}}</th>
            <th id="uang">{{formatUang(getTotal(7))}}</th>
            <th id="uang">{{formatUang(getTotal(8))}}</th>
            <th id="uang">{{formatUang(getTotal(9))}}</th>
            <th id="uang">{{formatUang(getTotal(10))}}</th>
            <th id="uang">{{formatUang(getTotal(11))}}</th>
            <th id="uang">{{formatUang(getTotal(12))}}</th>
            <th id="uang">{{formatUang(getTotal(13))}}</th>
            <th id="uang">{{formatUang(getTotal(14))}}</th>
            <th id="uang">{{formatUang(getTotal(15))}}</th>
            <th id="uang">{{formatUang(getTotal(16))}}</th>
            <th id="uang">{{formatUang(getTotal(17))}}</th>
            <th id="uang">{{formatUang(getTotal(18))}}</th>
            <th id="uang">{{formatUang(getTotal(19))}}</th>
            <th id="uang">{{formatUang(getTotal(20))}}</th>
            <th id="uang">{{formatUang(getTotal(21))}}</th>
            <th id="uang">{{formatUang(getTotal(22))}}</th>
            <th id="uang">{{formatUang(getTotal(23))}}</th>
            <th id="uang">{{formatUang(getTotal(24))}}</th>
            <th id="uang">{{formatUang(getTotal(25))}}</th>
            <th id="uang">{{formatUang(getTotal(26))}}</th>
            <th id="uang">{{formatUang(getTotal(27))}}</th>
            <th id="uang">{{formatUang(getTotal(28))}}</th>
            <th id="uang">{{formatUang(getTotal(29))}}</th>
            <th id="uang">{{formatUang(getTotal(30))}}</th>
            <th id="uang">{{formatUang(getTotal(31))}}</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tableView">
      <div class="daftarRelasi mt-2">Daftar Pemakaian Solar</div>
      <table class="table table-bordered border-primary">
        <thead class="table">
          <th>No Kendaraan.</th>

          <th>Tanggal</th>
          <th>Jumlah</th>
        </thead>
        <tbody>
          <!-- {{this.mobilUser}} -->
          <tr v-for="solar in dataSolar()" :key="solar.id">
            <td id="edit">{{solar.Mobil.nomorMobil}}</td>

            <td id="edit">{{solar.tanggal.slice(0,10)}}</td>
            <td id="uang">{{formatUang(solar.jumlah)}}</td>
          </tr>
          <tr>
            <th colspan="2">Total</th>
            <th id="uang">{{formatUang(getTotalSolar())}}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "../API/axios";
import Swal from "sweetalert2";
import VueMonthlyPicker from "vue-monthly-picker";
export default {
  name: "Realisasi",
  data() {
    return {
      jumlah: 0,
      mobil: [],
      solar: [],
      selectedMonth: "",
      cabang: 0
    };
  },
  components: {
    VueMonthlyPicker
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    allMobil() {
      return this.$store.state.allMobil;
    },
    users() {
      return this.$store.state.users;
    }
  },
  created() {
    this.$store.dispatch("getAllMobil");
    this.$store.dispatch("getAllUser");
    this.getAllMobil();
    this.getAllSolar();
  },
  methods: {
    setUser() {
      let hasil = [];
      this.users?.map(item => {
        if (item.role == "staff") {
          hasil.push(item);
        }
      });
      return hasil;
    },
    formatUang(data) {
      // console.log(data, "dataa");
      let uang = "";
      data = data.toString();
      for (let i = 0; i < data.length; i++) {
        if ((data.length - i) % 3 == 0 && i !== 0) {
          uang += `,${data[i]}`;
        } else {
          uang += data[i];
        }
      }
      return uang;
    },
    getSolar(data, tanggal) {
      let hasil = 0;
      if (tanggal !== 0) {
        data?.map(item => {
          const bulan = moment(item.tanggal).format("MM-YYYY");
          const periode = moment(this.selectedMonth).format("MM-YYYY");
          const tanggalItem = moment(item.tanggal).format("DD");
          if (bulan == periode && tanggal == tanggalItem) {
            hasil += item.jumlah;
          }
        });
      } else {
        data?.map(item => {
          const bulan = moment(item.tanggal).format("MM-YYYY");
          const periode = moment(this.selectedMonth).format("MM-YYYY");

          if (bulan == periode) {
            hasil += item.jumlah;
          }
        });
      }
      return hasil;
    },
    dataSolar() {
      let hasil = [];
      this.solarUser?.map(item => {
        const bulan = moment(item.tanggal).format("MM-YYYY");
        const periode = moment(this.selectedMonth).format("MM-YYYY");
        if (bulan == periode) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    getTotal(tanggal) {
      let hasil = 0;
      if (tanggal !== 0) {
        this.dataSolar()?.map(item => {
          const bulan = moment(item.tanggal).format("MM-YYYY");
          const periode = moment(this.selectedMonth).format("MM-YYYY");
          const tanggalItem = moment(item.tanggal).format("DD");
          if (bulan == periode && tanggal == tanggalItem) {
            hasil += item.jumlah;
          }
        });
      } else {
        this.dataSolar()?.map(item => {
          const bulan = moment(item.tanggal).format("MM-YYYY");
          const periode = moment(this.selectedMonth).format("MM-YYYY");

          if (bulan == periode) {
            hasil += item.jumlah;
          }
        });
      }
      return hasil;
    },
    getTotalSolar() {
      let hasil = 0;
      this.dataSolar()?.map(item => {
        hasil += item.jumlah;
      });
      return hasil;
    },
    getAllMobil() {
      // let hasil = [];
      return axios
        .get("/database/mobil", {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.mobil = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllSolar() {
      return axios
        .get("/database/solar", {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.solar = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    filterMobil() {
      let hasil = [];
      this.mobil?.map(item => {
        if (item.UserId == this.cabang) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    dataSolar() {
      let hasil = [];
      this.solar?.map(item => {
        const bulan = moment(item.tanggal).format("MM-YYYY");
        const periode = moment(this.selectedMonth).format("MM-YYYY");
        if (bulan == periode && this.cabang == item.UserId) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    tableHtmlToExcel(tableID, filename = `Daftar Rekapitulasi Solar `) {
      // Download Transaksi
      var downloadLink;
      var dataType = "application/vnd.ms-excel";
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

      filename = filename ? filename + ".xls" : "excel_data.xls";

      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(["\ufeff", tableHTML], {
          type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        downloadLink.href = "data:" + dataType + ", " + tableHTML;

        downloadLink.download = filename;

        downloadLink.click();
      }
    }
  }
};
</script>

<style scoped>
.Realisasi {
  max-width: 85vw;
  /* padding: 2px; */
}

#edit {
  text-align: center;
}
#uang {
  min-width: 20px;
  text-align: right;
}
.daftarRelasi {
  font-size: 25px;
  margin-bottom: 0px;
  font-weight: bold;
}
* {
  font-family: "Roboto Condensed", sans-serif;
}
#download {
  background-color: transparent;
  color: rgb(72, 66, 33);
}
button {
  background-color: #038c3e;
  color: antiquewhite;
}
button:hover {
  color: #038c3e;
  background-color: white;
}
#head {
  font-weight: 600;
  font-size: 40px;
  font-family: "Roboto Condensed", sans-serif;
}
#relasiTable {
  min-width: 2000px;

  margin-left: 20px;
}
.tableView {
  max-height: 1000px;
  margin-bottom: 2px;
  width: 85vw;
  overflow-x: scroll;
  overflow-y: scroll;
}
table {
  margin-top: 10px;
}
table td,
th {
  padding: 1px 2px;
  font-size: 14px;
}
table th {
  text-align: center;
}

@media screen and (max-width: 800px) {
  #head {
    font-weight: 500;
    font-size: 25px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  button {
    font-size: 12px;
  }
  .tableView {
    max-height: 500px;
    margin-bottom: 2px;
    width: 100vw;
    overflow-x: scroll;
    overflow-y: scroll;
  }
  .Realisasi {
    max-width: 100vw;
    /* padding: 2px; */
  }
  .table {
    /* background-color: aqua; */
    max-height: 400px;
    margin-bottom: 2px;
    width: 100vw;
    overflow-x: scroll;
    overflow-y: scroll;
  }
  table tbody {
    padding: 0;
    text-align: right;
  }
  table tbody td,
  th {
    font-size: 11px;
    padding: 2px 1px;
  }
}
</style>
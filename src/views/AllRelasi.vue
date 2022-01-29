<template>
  <div class="Relasi">
    <p class="mt-3" id="head">REKAPITULASI RELASI</p>
    <div class="row justify-content-center">
      <div class="col col-lg-12 mt-3">
        <div class="form-row mb-3">
          <div class="input-group col-sm">
            <label class="my-1 mr-2" for="Username">Tanggal :</label>
            <input type="date" class="form-control mr-3" v-model="startDate" /> -
            <input type="date" class="form-control ml-3" v-model="endDate" />
          </div>
          <div class="input-group col-sm">
            <label class="my-1 mr-2" for="Username">Cabang :</label>

            <select class="form-control" v-model="cabang">
              <option selected disabled>Pilih Cabang</option>
              <option value="0">Semua Cabang</option>
              <option v-for="user in setUser()" :key="user.id" :value="user.id">{{user.namaCabang}}</option>
            </select>
          </div>
          <button id="download" class="btn" @click.prevent="tableHtmlToExcel('table')">
            <i class="fa fa-download"></i> Download
          </button>
        </div>
        <table class="table table-striped" id="table">
          <thead class="table">
            <th>Nama Relasi</th>
            <th>Alamat</th>
            <th>Jenis</th>
            <th>Unit</th>
            <th>Volume Schedule</th>
            <th>Total Realisasi</th>
            <th>Selisih</th>
          </thead>
          <tbody>
            <tr v-for="relasi in filterData()" :key="relasi.id">
              <td>{{relasi.namaRelasi}}</td>
              <td>{{relasi.alamat}}</td>
              <td>{{relasi.type}}</td>
              <td>{{relasi.User.namaCabang}}</td>
              <td id="uang">{{getTotalVolume(relasi.Schedules)}}</td>
              <td id="uang">{{getTotalVolume(relasi.Realisasis)}}</td>
              <td id="uang">{{ getTotalVolume(relasi.Realisasis)-getTotalVolume(relasi.Schedules)}}</td>
            </tr>
            <tr>
              <th colspan="4">Total</th>

              <th id="uang">{{getTotal(this.allSchedule)}}</th>
              <th id="uang">{{getTotal(this.allRealisasi)}}</th>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th colspan="4">Pencapaian</th>
              <th colspan="3">{{persen(getTotal(this.allRealisasi) ,getTotal(this.allSchedule))}} %</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- {{this.filterData()}} -->
    <!-- {{this.allSchedule}} -->
  </div>
</template>

<script>
import moment from "moment";
import axios from "../API/axios";
import Swal from "sweetalert2";

export default {
  name: "Realisasi",
  data() {
    return {
      startDate: "",
      endDate: "",
      penm: [],
      totalData: 0,
      totalPage: 0,
      currentPage: 0,
      startDate: "",
      endDate: "",
      cabang: 0
    };
  },
  computed: {
    realisasiUser() {
      return this.$store.state.realisasiUser;
    },
    allSchedule() {
      return this.$store.state.allSchedule;
    },
    allRelasi() {
      return this.$store.state.relasi;
    },
    allUser() {
      return this.$store.state.users;
    },
    allRealisasi() {
      return this.$store.state.realisasi;
    },
    users() {
      return this.$store.state.users;
    }
  },
  created() {
    this.$store.dispatch("fetchRelasi");
    this.$store.dispatch("fetchSchedule");
    this.$store.dispatch("getAllRelasi");
    this.$store.dispatch("getAllUser");
    this.$store.dispatch("getAllRealisasi");
    this.$store.dispatch("getAllSchedule");
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
    filterData() {
      let hasil = [];
      let penm = [];
      if (this.cabang == 0) {
        hasil = this.allRelasi;
      } else {
        this.allRelasi?.map(item => {
          if (item.UserId == this.cabang) {
            hasil.push(item);
          }
        });
      }
      return hasil;
    },
    formatUang(data) {
      let uang = data;
      // let uang = "";
      // data = data.toString();
      // for (let i = 0; i < data.length; i++) {
      //   if ((data.length - i) % 3 == 0 && i !== 0) {
      //     uang += `.${data[i]}`;
      //   } else {
      //     uang += data[i];
      //   }
      // }
      return uang;
    },
    filterUser() {
      let hasil = [];
      this.allUser?.map(item => {
        if (item.namaCabang) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    getTotalVolume(data) {
      let hasil = 0;

      if (!this.startDate || !this.endDate) {
        data?.map(item => {
          hasil += +item.volume;
        });
      } else {
        data?.map(item => {
          let start = moment(this.startDate, "YYYY/MM/DD") - 1;
          let end = moment(this.endDate, "YYYY/MM/DD") + 1;
          let tanggalItem = moment(item.tanggal, "YYYY/MM/DD");
          if (tanggalItem.isBetween(start, end) == true) {
            hasil += +item.volume;
          }
        });
      }
      return hasil;
    },
    getTotal(data) {
      let hasil = 0;
      let penm = [];
      if (this.cabang == 0) {
        penm = data;
      } else {
        data?.map(item => {
          if (item.UserId == this.cabang) {
            penm.push(item);
          }
        });
      }

      if (!this.startDate || !this.endDate) {
        penm?.map(item => {
          hasil += +item.volume;
        });
      } else {
        penm?.map(item => {
          let start = moment(this.startDate, "YYYY/MM/DD") - 1;
          let end = moment(this.endDate, "YYYY/MM/DD") + 1;
          let tanggalItem = moment(item.tanggal, "YYYY/MM/DD");
          if (tanggalItem < end && tanggalItem > start) {
            hasil += +item.volume;
          }
        });
      }

      return hasil;
    },
    totalRelisasi(data) {
      let hasil = 0;
      if (this.startDate && this.endDate) {
        data?.map(item => {
          let start = moment(this.startDate, "YYYY/MM/DD");
          let end = moment(this.endDate, "YYYY/MM/DD");
          let tanggalItem = moment(item.tanggal, "YYYY/MM/DD");
          if (tanggalItem.isBetween(start, end) == true) {
            hasil += +item.volume;
          }
        });
      } else {
        data?.map(item => {
          hasil += item.volume;
        });
      }
      return hasil;
    },

    selisih(real, std) {
      let hasil = ``;

      if (real == std) {
        hasil = 0;
      } else if (std > real) {
        hasil = std - real;
      } else if (real > std) {
        hasil = real - std;
      }

      return hasil;
    },
    cekSelisih(a, b) {
      if (a < b) {
        return true;
      } else return false;
    },
    persen(a, b) {
      let hasil = 0;
      if (a !== 0 || b !== 0) {
        hasil = Math.ceil((a / b) * 10000) / 100;
      }

      return hasil;
    },
    tableHtmlToExcel(tableID, filename = `Daftar Rekapitulasi Relasi `) {
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
.Relasi {
  width: 85vw;
}
#uang {
  text-align: right;
}
.daftarRelasi {
  font-size: 25px;
  margin-bottom: 5px;
  font-weight: bold;
}
* {
  font-family: "Roboto Condensed", sans-serif;
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
table {
  margin-top: 30px;
}
table td,
th {
  padding: 1px 2px;
  font-size: 20px;
}
table th {
  text-align: center;
}
#download {
  background-color: transparent;
  color: rgb(72, 66, 33);
}
@media screen and (max-width: 800px) {
  p {
    margin: 0;
  }
  #head {
    font-weight: 500;
    font-size: 25px;
  }
  button {
    font-size: 12px;
  }
  .Relasi {
    width: 100vw;
  }
  .tableView {
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
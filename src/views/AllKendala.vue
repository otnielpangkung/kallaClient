<template>
  <div class="Relasi">
    <p class="mt-3" id="head">REKAPITULASI KENDALA</p>
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
            <th>Unit</th>
            <th>Tanggal</th>
            <th>Kendala</th>
          </thead>
          <tbody>
            <tr v-for="data in filterData()" :key="data.id">
              <td>{{data.User.namaCabang}}</td>
              <td>{{formatTanggal(data.tanggal)}}</td>
              <td>{{data.kendala}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- {{this.filterData()}} -->
    <!-- {{filterData()}}
    ======================
    {{this.allRealisasi}}-->
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
    formatTanggal(data) {
      let hasil = "";
      var time = moment(data).format("DD-MM-YYYY h:mm:ss");
      hasil = time.slice(0, 10);
      return hasil;
    },
    filterData() {
      let data = this.allRealisasi;
      let penm = [];
      let hasil = [];
      if (this.cabang !== 0) {
        data?.map(item => {
          if (item.UserId == this.cabang) {
            penm.push(item);
          }
        });
      } else {
        penm = data;
      }
      if (this.startDate && this.endDate) {
        penm?.map(item => {
          let start = moment(this.startDate, "YYYY/MM/DD") - 1;
          let end = moment(this.endDate, "YYYY/MM/DD") + 1;
          let tanggalItem = moment(item.tanggal, "YYYY/MM/DD");
          if (tanggalItem.isBetween(start, end) == true) {
            hasil.push(item);
          }
        });
      } else {
        hasil = penm;
      }
      return hasil;
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

    tableHtmlToExcel(tableID, filename = `Daftar Rekapitulasi Kendala `) {
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
  font-size: 25px;
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

  table tbody td,
  th {
    font-size: 11px;
    padding: 2px 1px;
  }
}
</style>
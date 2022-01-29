<template>
  <div class="Schedule">
    <div class="head">
      <p id="headSchedule">SCHEDULE HARIAN</p>
    </div>
    <div class="tanggal mt-3 mb-3">
      <div class="input-group col col-lg-12">
        <label class="my-1 mr-2" for="Username">Tanggal :</label>
        <input type="date" class="form-control mr-3" v-model="startDate" /> -
        <input type="date" class="form-control ml-3" v-model="endDate" />
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
    </div>
    <div class="tableView">
      <table class="table table-hover table-striped table-bordered mb-3" id="table">
        <thead>
          <tr>
            <th scope="col">Tanggal</th>
            <th scope="col">Cabang</th>
            <th scope="col">Nama Realasi</th>
            <th scope="col">Alamat</th>
            <th scope="col">Waktu(schedule)</th>
            <th scope="col">Relasisasi Mulai</th>
            <th scope="col">Selesai</th>
            <th scope="col">Volume</th>
            <th scope="col">Realisasi Volume</th>
            <th scope="col">Selisih</th>
            <th scope="col">Kendala</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in filterData().data" :key="e.id">
            <td>{{ formatTanggal(e.tanggal) }}</td>
            <td>{{e.User.namaCabang }}</td>
            <td>{{e.Relasi.namaRelasi}}</td>
            <td>{{e.lokasi}}</td>
            <td>{{e.waktu}}</td>
            <td>{{ getMulai(e.Realisasis) }}</td>
            <td>{{ getSelesai(e.Realisasis) }}</td>
            <td id="uang">{{formatUang(e.volume)}}</td>
            <td id="uang">{{formatUang (volumeReal(e.Realisasis))}}</td>
            <td id="uang">
              <!-- <i v-if="cekSelisih(e.volume, volumeReal(e.Realisasis))" class="fas fa-arrow-up"></i> -->
              {{formatUang(selisihVolume(e.volume, volumeReal(e.Realisasis)))}}
            </td>
            <td>{{getKendala(e.Realisasis)}}</td>
          </tr>
          <tr>
            <th colspan="8">Total</th>
            <th id="uang">{{formatUang(filterData().total)}}</th>
            <th id="uang">{{formatUang(filterData().realisasi)}}</th>
            <th id="uang">{{formatUang(filterData().selisih)}}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../API/axios";
import Swal from "sweetalert2";
export default {
  name: "Schedule",
  data() {
    return {
      startDate: "",
      endDate: "",
      cabang: 0
    };
  },
  computed: {
    allSchedule() {
      return this.$store.state.allSchedule;
    },
    users() {
      return this.$store.state.users;
    }
  },
  created() {
    this.$store.dispatch("getAllSchedule");
    this.$store.dispatch("getAllUser");
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
      let setData = [];
      let hasil = {
        data: [],
        total: 0,
        realisasi: 0,
        selisih: 0
      };

      if (this.cabang != 0) {
        this.allSchedule?.map(item => {
          if (item.UserId == this.cabang) {
            setData.push(item);
          }
        });
      } else {
        setData = this.allSchedule;
      }

      if (!this.startDate || !this.endDate) {
        hasil.data = setData;
      } else {
        setData?.map(item => {
          let start = moment(this.startDate, "YYYY/MM/DD") - 1;
          let end = moment(this.endDate, "YYYY/MM/DD") + 1;
          let tanggalItem = moment(item.tanggal, "YYYY/MM/DD");
          if (tanggalItem < end && tanggalItem > start) {
            hasil.data.push(item);
          }
        });
      }
      hasil.data?.map(item => {
        hasil.total += +item.volume;
      });
      hasil.data?.map(item => {
        item.Realisasis?.map(e => {
          hasil.realisasi += +e.volume;
        });
      });
      hasil.selisih = Math.ceil(hasil.realisasi - hasil.total);
      return hasil;
    },
    formatUang(data) {
      // console.log(data, "dataa");
      let uang = data;
      // let uang = "";
      // data = data.toString();
      // for (let i = 0; i < data.length; i++) {
      //   if ((data.length - i) % 3 == 0 && i !== 0) {
      //     uang += `,${data[i]}`;
      //   } else {
      //     uang += data[i];
      //   }
      // }
      return uang;
    },
    getMulai(data) {
      let hasil = "";
      if (data.length) {
        hasil = data[0].waktuMulai;
      }

      return hasil;
    },
    getSelesai(data) {
      let hasil = "";
      if (data.length) {
        hasil = data[data.length - 1].waktuSelesai;
      }
      return hasil;
    },
    volumeReal(data) {
      let hasil = 0;
      data?.map(item => {
        hasil += +item.volume;
      });
      return hasil;
    },
    selisihVolume(std, real) {
      let hasil = 0;
      if (std > real) {
        hasil = std - real;
      } else if (real > std) {
        hasil = real - std;
      } else if ((real = std)) {
        hasil = real - std;
      }

      hasil = Math.ceil(hasil * 10000) / 10000;
      return hasil;
    },
    cekSelisih(std, real) {
      if (std > real) {
        return false;
      } else return true;
    },

    tanggalSlice(data) {
      let hasil = "";
      hasil = data.slice(0, 15);
      return hasil;
    },

    getKendala(data) {
      let hasil = "";
      data?.map(item => {
        hasil += `${item.kendala} , `;
      });
      return hasil;
    },
    tableHtmlToExcel(tableID, filename = `Daftar Schedule`) {
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
.Schedule {
  justify-content: center;
  padding: 10px;
  width: 85vw;
  min-height: 0;
  margin-top: 5px;
}
* {
  font-family: "Roboto Condensed", sans-serif;
}
.tableView {
  max-height: 800px;
  margin-bottom: 2px;
  width: 85vw;
  overflow-x: scroll;
  overflow-y: scroll;
}
.tanggal {
  justify-content: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 2mm;
  margin-top: 2mm;
}
#uang {
  text-align: right;
}
#ket {
  color: rgb(235, 54, 48);
  padding: 0;
  margin-top: 0;
  font-size: 13px;
}
table td,
th {
  padding: 5px 5px;
}

th {
  text-align: center;
}
.titleSchedule {
  font-size: 30px;
  /* background-color: rgb(238, 238, 238); */
  margin-bottom: 5px;
}
.col-sm {
  padding: 0 10px;
}
.formCard {
  padding-top: 20px;
  padding-left: 5px;
  border: 1px rgb(232, 232, 232) solid;
  border-radius: 10px;
}

button {
  margin-bottom: 5px;
  margin-top: 5px;
  background-color: #038c3e;
  color: antiquewhite;
}
button:hover {
  color: #038c3e;
  background-color: white;
}
#headSchedule {
  font-weight: 600;
  font-size: 40px;
  font-family: "Roboto Condensed", sans-serif;
  /* background-color: springgreen; */
}

#download {
  background-color: transparent;
  color: rgb(72, 66, 33);
}
@media screen and (max-width: 800px) {
  .tableView {
    /* width: 100vw; */
    overflow-x: scroll;
    overflow-y: scroll;
  }
  #headSchedule {
    font-size: 25px;
  }
  .Schedule {
    padding: 10px;
    width: 100vw;
    min-height: 0;
    margin-top: 5px;
  }
  .tableView {
    font-size: 12px;
    max-height: 800px;
    margin-bottom: 2px;
    width: 100vw;
    overflow-x: scroll;
    overflow-y: scroll;
  }
  table tbody td,
  th {
    font-size: 12px;
    padding: 2px 1px;
  }
}
</style>
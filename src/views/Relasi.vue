<template>
  <div class="Realisasi">
    <p class="mt-3" id="head">REKAPITULASI RELASI</p>
    <div class="row justify-content-center">
      <div class="col col-lg-10 mt-3">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#staticBackdrop"
        >Tambahkan Relasi</button>
        <button id="download" class="btn" @click.prevent="tableHtmlToExcel('table')">
          <i class="fa fa-download"></i> Download
        </button>
        <div
          class="modal fade"
          id="staticBackdrop"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Tambah Relasi</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addRelasi">
                  <input
                    type="text"
                    v-model="namaRelasi"
                    placeholder="Nama Relasi"
                    class="form-control"
                    required
                  />
                  <input
                    type="text"
                    v-model="alamat"
                    placeholder="Alamat"
                    class="form-control mt-2"
                    required
                  />
                  <label class="my-1 mr-2" for="Username">Jenis Relasi:</label>
                  <div class="input-group mb-2">
                    <select class="form-control" v-model="type" required>
                      <option selected disabled>Pilih Relasi</option>
                      <option v-for="type in this.types" :key="type" :value="type">{{type}}</option>
                    </select>
                  </div>
                  <button class="btn btn-secondary" type="submit">Tambahkan</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="input-group mt-3">
          <label class="my-1 mr-2" for="Username">Tanggal :</label>
          <input type="date" class="form-control mr-3" v-model="startDate" /> -
          <input type="date" class="form-control ml-3" v-model="endDate" />
        </div>
        <table class="table table-hover table-striped table-bordered" id="relasiTable">
          <thead class="table">
            <th>Nama Relasi</th>
            <th>Alamat</th>
            <th>Jenis</th>
            <th>Volume Schedule</th>
            <th>Total Realisasi</th>
            <th>Selisih</th>
            <th>Hapus</th>
          </thead>
          <tbody>
            <tr v-for="relasi in relasiUser" :key="relasi.id">
              <td>{{relasi.namaRelasi}}</td>
              <td>{{relasi.alamat}}</td>
              <td>{{relasi.type}}</td>
              <td id="uang">{{ totalRelisasi(relasi.Schedules) }}</td>
              <td id="uang">{{ totalRelisasi(relasi.Realisasis) }}</td>
              <td
                id="uang"
              >{{ (totalRelisasi(relasi.Realisasis) - totalRelisasi(relasi.Schedules)) }}</td>
              <td class="text-center">
                <a @click.prevent="confirmDelete(relasi.id)">
                  <i class="fas fa-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <th colspan="3">Total</th>

              <td id="uang">{{getTotalVolume(this.sheduleUser)}}</td>
              <td id="uang">{{getTotalVolume(this.realisasiUser)}}</td>
              <td></td>
            </tr>
            <tr>
              <th colspan="4">Pencapaian</th>
              <th
                colspan="3"
              >{{persen(getTotalVolume(this.realisasiUser),getTotalVolume(this.sheduleUser))}} %</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
      namaRelasi: "",
      alamat: "",
      type: "",
      types: ["Retail", "Proyek", "Internal"]
    };
  },
  computed: {
    relasiUser() {
      return this.$store.state.relasiUser.rows;
    },
    realisasiUser() {
      return this.$store.state.realisasiUser.rows;
    },
    sheduleUser() {
      return this.$store.state.scheduleUser.rows;
    }
  },
  created() {
    this.$store.dispatch("fetchRelasi");
    this.$store.dispatch("fetchSchedule");
    this.$store.dispatch("fetchRelasi");
    this.$store.dispatch("fetchRealisasiUser");
    this.itemId;
    // this.totalRelisasi();
    // this.filterData();
  },
  methods: {
    persen(a, b) {
      let hasil = 0;
      if (a !== 0 || b !== 0) {
        hasil = Math.ceil((a / b) * 10000) / 100;
      }
      return hasil;
    },
    formatUang(data) {
      // console.log(data, "dataa");
      let uang = "";
      data = data.toString();
      for (let i = 0; i < data.length; i++) {
        if ((data.length - i) % 3 == 0 && i !== 0) {
          uang += `.${data[i]}`;
        } else {
          uang += data[i];
        }
      }
      return uang;
    },
    getTotalVolume(data) {
      let penm = data;
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

    totalRelisasi(data) {
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

    itemId() {
      let hasil = 0;
      this.sheduleUser?.map(item => {
        if (item.id == ScheduleId) {
          hasil = item.Item.id;
        }
      });
      return hasil;
    },
    scheduleUpdate() {
      let hasil = [];
      this.sheduleUser?.map(item => {
        if (item.tanggal.slice(0, 10) == this.tanggal) {
          hasil.push(item);
        }
      });
      return hasil;
    },

    addRelasi() {
      return axios
        .post(
          "/database/relasi",
          {
            namaRelasi: this.namaRelasi,
            alamat: this.alamat,
            type: this.type
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          this.$store.dispatch("fetchRelasi");
          Swal.fire("Ok", "Relasi Berhasil Ditambahkan", "success");
          $("#staticBackdrop").modal("hide");
          this.$store.dispatch("fetchRelasi");
          this.$store.dispatch("fetchRelasi");
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kembali Data Anda", "error");
          console.log(err);
        });
    },
    confirmDelete(id) {
      Swal.fire({
        title: "Yakin?",
        text: "Yakin ki mau hapus?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus!!"
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.dispatch("fetchRelasi");
          this.deleteRelasi(id);
          Swal.fire("Deleted!", "Data Berhasil Dihapus", "success");
          this.$store.dispatch("fetchRelasi");
          this.$store.dispatch("fetchRelasi");
          this.$store.dispatch("fetchRelasi");
        } else {
          Swal.fire("Ok!", "Proses Berhasil Dibatalkan", "error");
        }
      });
    },
    deleteRelasi(id) {
      return axios
        .delete(`/database/relasi/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          this.$store.dispatch("fetchRelasi");
          this.$store.dispatch("fetchRelasi");
          this.$store.dispatch("fetchRelasi");
        });
    },
    tableHtmlToExcel(tableID, filename = `Daftar Realisasi `) {
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
  padding: 5px 1px;
  font-size: 16px;
}
table th {
  text-align: center;
}
#download {
  background-color: transparent;
  color: rgb(72, 66, 33);
}
</style>
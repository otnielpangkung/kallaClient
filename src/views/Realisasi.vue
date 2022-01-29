<template>
  <div class="Realisasi">
    <p class="mt-3" id="head">DATA BP</p>

    <button @click.prevent="showAdd" class="btn btn-primary">Tambahkan BP</button>
    <!-- Modal -->
    <div class="modal fade" id="modalForm" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <form @submit.prevent="editStatus ? editRealisasi() : addRealisasi()">
              <div class="form-row mb-1">
                <div class="col-sm">
                  <label class="my-1 mr-2" for="Username">Tanggal</label>
                  <div class="input-group">
                    <input type="date" class="form-control" v-model="tanggal" />
                  </div>
                </div>
              </div>
              <div class="form-row mb-1">
                <div class="col-sm">
                  <label class="my-1 mr-2" for="RelasiId">No.Wo - Relasi - Lokasi</label>
                  <div class="input-group">
                    <select
                      class="form-control"
                      id="RelasiId"
                      v-model="NomorWoId"
                      aria-placeholder="Relasi"
                      required
                    >
                      <option selected disabled value="0">Pilih WO</option>
                      <option
                        v-for="wo in this.nomorWo()"
                        :key="wo.id"
                        :value="wo.id"
                      >{{wo.namaWo}} - {{wo.Relasi.namaRelasi}} - {{wo.Schedule.lokasi}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-sm">
                  <label class="my-1 mr-2" for="volume">Mulai :</label>
                  <div class="input-group mt-1">
                    <input
                      type="time"
                      placeholder="No. TN"
                      class="form-control"
                      v-model="waktuMulai"
                    />
                  </div>
                </div>
                <div class="col-sm">
                  <label class="my-1 mr-2" for="volume">Selesai :</label>
                  <div class="input-group mt-1">
                    <input type="time" class="form-control" v-model="waktuSelesai" />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input type="number" placeholder="SO" class="form-control" v-model="so" />
                  </div>
                </div>

                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="number"
                      placeholder="Shipment"
                      class="form-control"
                      v-model="shipment"
                    />
                  </div>
                </div>
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="text"
                      placeholder="Bongkar"
                      class="form-control"
                      v-model="bongkar"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="text"
                      placeholder="No. TM:"
                      class="form-control"
                      v-model="noTm"
                      required
                    />
                  </div>
                </div>

                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="text"
                      placeholder="No. Tiket"
                      class="form-control"
                      v-model="noTiket"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="number"
                      step="any"
                      placeholder="Volume"
                      class="form-control"
                      v-model="volume"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input type="text" placeholder="Driver" class="form-control" v-model="driver" />
                  </div>
                </div>
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="number"
                      step="any"
                      placeholder="Cipping"
                      class="form-control"
                      v-model="cipping"
                    />
                  </div>
                </div>
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="number"
                      placeholder="Split"
                      step="any"
                      class="form-control"
                      v-model="split"
                    />
                  </div>
                </div>
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="number"
                      placeholder="Pasir"
                      step="any"
                      class="form-control"
                      v-model="pasir"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="number"
                      placeholder="Semen"
                      step="any"
                      class="form-control"
                      v-model="semen"
                    />
                  </div>
                </div>
                <div class="col-sm">
                  <div class="input-group mt-1">
                    <input
                      type="number"
                      step="any"
                      placeholder="additive  Cair"
                      class="form-control"
                      v-model="additiveCair"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-sm">
                  <div class="input-group mt-1 mb-3">
                    <input type="text" placeholder="Kendala" class="form-control" v-model="kendala" />
                  </div>
                </div>
              </div>
              <button v-if="!editStatus" class="btn btn-secondary" type="submit">Tambahkan</button>
              <button v-if="editStatus" class="btn btn-secondary" type="submit">Edit</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Tanggal -->
    <div class="tanggal">
      <div class="input-group col col-lg-7">
        <label class="my-1 mr-2" for="Username">Tanggal :</label>
        <input type="date" class="form-control mr-3" v-model="startDate" /> -
        <input type="date" class="form-control ml-3" v-model="endDate" />
        <button id="download" class="btn" @click.prevent="tableHtmlToExcel('table')">
          <i class="fa fa-download"></i> Download
        </button>
      </div>
    </div>
    <!-- Table -->
    <div class="tableView">
      <div class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="filterData().length"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>

        <b-table
          id="my-table"
          :items="filterData()"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          striped
          small
        >
          <template #cell(tanggal)="row">{{ formatTanggal(row.value) }}</template>
          <template #cell(pasir)="row">{{ getJumlah(row.value) }}</template>
          <template #cell(split)="row">{{ getJumlah(row.value) }}</template>
          <template #cell(cipping)="row">{{ getJumlah(row.value) }}</template>
          <template #cell(semen)="row">{{ getJumlah(row.value) }}</template>
          <template #cell(action)="row">
            <a @click.prevent="showEdit(row.item)">
              <i class="fas fa-edit" title="edit"></i>
            </a>
            <a @click.prevent="confirmDelete(row.item.id)">
              <i class="fas fa-trash"></i>
            </a>
          </template>
        </b-table>
      </div>
    </div>
    {{this.startDate }} {{this.endDate}}
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
      perPage: 15,
      currentPage: 1,
      filter: null,
      editStatus: false,
      id: 0,
      RelasiId: 0,
      ScheduleId: 0,
      NomorWoId: 0,
      ItemId: 0,
      tanggal: "",
      noTm: "",
      noTiket: "",
      volume: "",
      waktuMulai: "",
      waktuSelesai: "",
      driver: "",
      cipping: "",
      split: "",
      pasir: "",
      kendala: "",
      so: "",
      shipment: "",
      bongkar: "",
      semen: "",
      additiveCair: "",
      startDate: "",
      endDate: "",
      penm: [],
      totalData: 0,
      totalPage: 0,
      currentPage: 0,
      namaWo: "",
      fields: [
        {
          key: "NomorWo.namaWo",
          label: "Nomor WO",
          class: "text-center"
        },
        {
          key: "so",
          label: "SO",
          class: "text-center"
        },
        {
          key: "shipment",
          label: "Shipment",
          class: "text-center"
        },
        {
          key: "tanggal",
          label: "Tanggal",
          class: "text-center"
        },
        {
          key: "Relasi.namaRelasi",
          label: "Relasi",
          class: "text-center"
        },
        {
          key: "Schedule.lokasi",
          label: "Alamat",
          class: "text-center"
        },
        {
          key: "driver",
          label: "TM/Driver",
          class: "text-center"
        },
        {
          key: "Item.namaItem",
          label: "No. TM"
        },
        {
          key: "Item.mutu",
          label: "Mutu"
        },
        {
          key: "bongkar",
          label: "Mode Bongkar"
        },
        {
          key: "volume",
          label: "Volume",
          class: "text-right"
        },
        {
          key: "pasir",
          label: "Pasir",
          class: "text-right"
        },
        {
          key: "cipping",
          label: "Cipping",
          class: "text-right"
        },
        {
          key: "split",
          label: "Split",
          class: "text-right"
        },
        {
          key: "semen",
          label: "Semen",
          class: "text-right"
        },
        {
          key: "additiveCair",
          label: "Additive Cair",
          class: "text-right"
        },
        {
          key: "waktuMulai",
          label: "Mulai",
          class: "text-center"
        },
        {
          key: "waktuSelesai",
          label: "Selesai",
          class: "text-center"
        },
        {
          key: "kendala",
          label: "Kendala"
        },
        {
          key: "action",
          label: "Action",
          class: "text-center"
        }
      ]
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
    },
    nomorWoUser() {
      return this.$store.state.nomorWoUser.rows;
    },
    rows() {
      return this.filterData().length;
    }
  },
  created() {
    this.$store.dispatch("fetchRelasi");
    this.$store.dispatch("fetchSchedule");
    this.$store.dispatch("fetchRealisasiUser");
    this.$store.dispatch("getNomorWo");
    this.filterData();
  },
  methods: {
    showAdd() {
      // console.log("ok");
      $("#modalForm").modal("show");
      this.editStatus = false;
      this.id = 0;
      this.RelasiId = 0;
      this.ScheduleId = 0;
      this.NomorWoId = 0;
      this.tanggal = "";
      this.so = "";
      this.shipment = "";
      this.bongkar = "";
      this.ItemId = "";
      this.noTm = "";
      this.noWo = "";
      this.noTiket = "";
      this.volume = "";
      this.waktuMulai = "";
      this.waktuSelesai = "";
      this.driver = "";
      this.cipping = "";
      this.split = "";
      this.pasir = "";
      this.kendala = "";
      this.semen = "";
      this.additiveCair = "";
    },
    showEdit(data) {
      $("#modalForm").modal("show");
      this.id = data.id;
      this.editStatus = true;
      this.noTm = data.noTm;
      this.noWo = data.noWo;
      this.noTiket = data.noTiket;
      this.so = data.so;
      this.shipment = data.shipment;
      this.bongkar = data.bongkar;
      this.NomorWoId = data.NomorWoId;
      this.volume = data.volume;
      this.tanggal = data.tanggal;
      this.waktuMulai = data.waktuMulai;
      this.waktuSelesai = data.waktuSelesai;
      this.driver = data.driver;
      this.cipping = data.cipping;
      this.split = data.split;
      this.pasir = data.pasir;
      this.semen = data.semen;
      this.additiveCair = data.additiveCair;
      this.kendala = data.kendala;
    },

    filterData() {
      let hasil = [];
      if (!this.startDate || !this.endDate) {
        hasil = this.realisasiUser;
      } else {
        this.realisasiUser?.map(item => {
          let start = moment(this.startDate, "YYYY/MM/DD") - 1;
          let end = moment(this.endDate, "YYYY/MM/DD") + 1;
          let tanggalItem = moment(item.tanggal, "YYYY/MM/DD");
          if (tanggalItem < end && tanggalItem > start) {
            hasil.push(item);
          }
        });
      }
      return hasil;
    },
    getJumlah(data) {
      if (data == "NaN") {
        data = 0;
      }
      return data;
    },
    nomorWo() {
      let hasil = [];
      this.nomorWoUser?.map(item => {
        if (item.tanggal.slice(0, 10) == this.tanggal) {
          hasil.push(item);
        }
      });
      return hasil;
    },
    filterData2(page) {
      let hasil = [];
      if (!page) {
        page = 1;
      }
      let dataPerPage = 1000;
      if (!this.startDate || !this.endDate) {
        hasil = this.realisasiUser;
        this.totalData = this.penm.length;
        this.totalPage = Math.ceil(this.totalData / dataPerPage);

        if (page) {
          let end = page * dataPerPage;
          let start = end - dataPerPage;
          if (page == 1) {
            start = 0;
          }
          this.penm = this.penm.slice(start, end);
        }
      } else {
        // console.log("haloos");
        let data = {
          startDate: this.startDate,
          endDate: this.endDate
        };
        return axios({
          method: "get",
          headers: { access_token: localStorage.getItem("access_token") },
          url: "/database/schedule/user/periode",
          params: data
        })
          .then(({ data }) => {
            hasil = data;
            this.totalData = this.penm.length;
            this.totalPage = Math.ceil(this.totalData / dataPerPage);
            if (page) {
              let end = page * dataPerPage;
              let start = end - dataPerPage;
              if (page == 1) {
                start = 0;
              }
              this.penm = this.penm.slice(start, end);
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            // console.log(this.penm, "selesai");
          });
        return hasil;
      }
    },
    formatTanggal(data) {
      let hasil = "";
      var time = moment(data).format("DD-MM-YYYY h:mm:ss");
      hasil = time.slice(0, 10);
      return hasil;
    },
    addRealisasi() {
      return axios
        .post(
          "/database/realisasi",
          {
            RelasiId: this.RelasiId,
            ScheduleId: this.ScheduleId,
            NomorWoId: this.NomorWoId,
            noTm: this.noTm,
            noTiket: this.noTiket,
            so: this.so,
            shipment: this.shipment,
            bongkar: this.bongkar,
            volume: this.volume,
            tanggal: this.tanggal,
            waktuMulai: this.waktuMulai,
            waktuSelesai: this.waktuSelesai,
            driver: this.driver,
            cipping: this.cipping,
            split: this.split,
            pasir: this.pasir,
            semen: this.semen,
            additiveCair: this.additiveCair,
            kendala: this.kendala
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          this.$store.dispatch("fetchRealisasiUser");
          Swal.fire("Ok", "Bp Baru berhasil Ditambahkan", "success");
          $("#modalForm").modal("hide");
          this.$store.dispatch("fetchRelasi");
          this.$store.dispatch("fetchSchedule");
          this.$store.dispatch("fetchRealisasiUser");
          this.$store.dispatch("fetchRealisasiUser");
        })
        .catch(err => {
          console.log(err);
          alert("Gagagl");
        });
    },
    editRealisasi(id) {
      return axios
        .put(
          `/database/realisasi/${this.id}`,
          {
            RelasiId: this.RelasiId,
            ScheduleId: this.ScheduleId,
            NomorWoId: this.NomorWoId,
            noTm: this.noTm,
            noWo: this.noWo,
            noTiket: this.noTiket,
            so: this.so,
            shipment: this.shipment,
            bongkar: this.bongkar,
            volume: this.volume,
            tanggal: this.tanggal,
            waktuMulai: this.waktuMulai,
            waktuSelesai: this.waktuSelesai,
            driver: this.driver,
            cipping: this.cipping,
            split: this.split,
            pasir: this.pasir,
            semen: this.semen,
            additiveCair: this.additiveCair,
            kendala: this.kendala
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          //   alert("Berhasil");
          this.$store.dispatch("fetchRealisasiUser");
          Swal.fire("Ok", "Bp Baru berhasil Diedit", "success");
          $("#modalForm").modal("hide");
          this.$store.dispatch("fetchRelasi");
          this.$store.dispatch("fetchSchedule");
          this.$store.dispatch("fetchRealisasiUser");
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Maaf", "Periksa Kembali Data Anda", "error");
        });
    },
    itemId() {
      let hasil = 0;
      this.sheduleUser?.map(item => {
        if (item.id == ScheduleId) {
          console.log(item.id, ScheduleId, "====");
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
    findSchedule() {
      let hasil = [];
      this.sheduleUser?.map(item => {
        if (
          item.tanggal.slice(0, 10) == this.tanggal &&
          item.RelasiId == this.RelasiId
        ) {
          hasil.push(item);
        }
      });
      //   console.log(hasil, "hasiil");
      return hasil;
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
          this.$store.dispatch("fetchRealisasiUser");
          this.$store.dispatch("fetchRealisasiUser");
          $("#modalForm").modal("hide");

          this.deleteItem(id);
          Swal.fire("Deleted!", "Data Berhasil Dihapus", "success");
          this.$store.dispatch("fetchRealisasiUser");
        }
      });
    },
    deleteItem(id) {
      return axios
        .delete(`/database/realisasi/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          this.$store.dispatch("fetchRealisasiUser");
          this.$store.dispatch("fetchRealisasiUser");
          this.$store.dispatch("fetchRealisasiUser");
          $("#modalForm").modal("hide");

          this.$store.dispatch("fetchRealisasiUser");
          this.$store.dispatch("fetchRealisasiUser");
          this.$store.dispatch("fetchRealisasiUser");
          this.$store.dispatch("fetchRealisasiUser");
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
* {
  font-family: "Roboto Condensed", sans-serif;
}
#kata {
  text-align: center;
}
.Realisasi {
  width: 85vw;
}
.tanggal {
  justify-content: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 2mm;
  margin-top: 2mm;
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
td,
th {
  padding: 5px 1px;
  font-size: 14px;
}
#head {
  font-weight: 600;
  font-size: 40px;
  font-family: "Roboto Condensed", sans-serif;
}
table {
  font-size: 14px;

  min-width: 2500px;
  margin-bottom: 20px;
}
table tbody {
  text-align: right;
}
table thead {
  text-align: center;
}
.tableView {
  max-height: 800px;
  margin-bottom: 2px;
  width: 85vw;
  overflow-x: scroll;
  overflow-y: scroll;
}
</style>
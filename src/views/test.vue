<template>
  <div class="Realisasi">
    <p class="mt-3" id="head">LAPORAN PRODUKSI</p>
    <!-- {{this.realisasiUser}} -->
    <button @click.prevent="showAdd" class="btn btn-primary">Tambahkan WO</button>

    <div class="modal fade" id="modalForm" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <form @submit.prevent="isEdit ? editWo() : addWo()">
              <div class="titleSchedule row pl-3">FORM WO</div>
              <div class="form-row">
                <div class="col-sm">
                  <label class="my-1 mr-2" for="Username">Tanggal</label>
                  <div class="input-group">
                    <input type="date" class="form-control" v-model="tanggal" />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-sm">
                  <label class="my-1 mr-2" for="Username">Schedule</label>
                  <div class="input-group">
                    <select
                      class="form-control"
                      id="RelasiId"
                      v-model="ScheduleId"
                      aria-placeholder="Relasi"
                      required
                    >
                      <option selected disabled value="0">Pilih Schedule</option>
                      <option
                        v-for="schedule in this.scheduleUpdate()"
                        :key="schedule.id"
                        :value="schedule.id"
                      >{{schedule.Relasi.namaRelasi}} - {{schedule.lokasi}} - {{schedule.Item.namaItem}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-row mb-2">
                <div class="col-sm">
                  <label class="my-1 mr-2" for="Username">Nomor Wo</label>
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="namaWo" required />
                    <div class="input-group-append"></div>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn">Tambahkan</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
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

    <!-- <button class="btn btn-primary" @click.prevent="filterData()">Lihat</button> -->

    <div class="tableView">
      <table class="table table-hover table-striped table-bordered" id="table">
        <thead>
          <tr>
            <th scope="col" rowspan="2">No. WO</th>
            <th scope="col" rowspan="2">SO</th>
            <th scope="col" rowspan="2">Shipment</th>
            <th scope="col" rowspan="2">Tanggal</th>
            <th scope="col" rowspan="2">Relasi</th>
            <th scope="col" rowspan="2">Alamat</th>
            <th scope="col" rowspan="2">Item Description</th>
            <th scope="col" rowspan="2">Total Volume</th>
            <th scope="col" colspan="4">Pasir</th>
            <th scope="col" colspan="4">Chipping</th>
            <th scope="col" colspan="4">Split</th>
            <th scope="col" colspan="3">Semen</th>
            <th scope="col" colspan="3">Additive Cair</th>
            <th scope="col" rowspan="2">Kendala</th>
            <th scope="col" rowspan="2">Action</th>
          </tr>
          <tr>
            <th scope="col">Realisasi</th>
            <th scope="col">Standar</th>
            <th scope="col">(m3)</th>
            <th scope="col">Selisih</th>
            <th scope="col">Realisasi</th>
            <th scope="col">Standar</th>
            <th scope="col">(m3)</th>
            <th scope="col">Selisih</th>
            <th scope="col">Realisasi</th>
            <th scope="col">Standar</th>
            <th scope="col">(m3)</th>
            <th scope="col">Selisih</th>
            <th scope="col">Realisasi</th>
            <th scope="col">Standar</th>
            <th scope="col">Selisih</th>
            <th scope="col">Realisasi</th>
            <th scope="col">Standar</th>
            <th scope="col">Selisih</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="wo in filterData()" :key="wo.id">
            <td id="tengah">{{wo.namaWo}}</td>
            <td id="tengah">{{getTotal(wo.Realisasis, wo.Item).so}}</td>
            <td id="tengah">{{getTotal(wo.Realisasis, wo.Item).shipment}}</td>
            <td id="tengah">{{ formatTanggal(wo.tanggal)}}</td>
            <td id="kiri">{{wo.Relasi.namaRelasi}}</td>
            <td id="kiri">{{wo.Schedule.lokasi}}</td>
            <td id="kiri">{{wo.Item.namaItem}} - {{wo.Item.mutu}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).volume}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).realPasir}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdPasir}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).m3Pasir}}</td>
            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihPasir).cek"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihPasir).cek"
                class="fas fa-arrow-down"
              ></i>
              {{cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihPasir).nilai}}
            </td>

            <td>{{getTotal(wo.Realisasis, wo.Item).realCipping}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdCipping}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).m3Cipping}}</td>
            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihCipping).cek"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihCipping).cek"
                class="fas fa-arrow-down"
              ></i>
              {{cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihCipping).nilai}}
            </td>

            <td>{{getTotal(wo.Realisasis, wo.Item).realSplit}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdSplit}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).m3Split}}</td>
            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihSplit).cek"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihSplit).cek"
                class="fas fa-arrow-down"
              ></i>
              {{cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihSplit).nilai}}
            </td>

            <td>{{getTotal(wo.Realisasis, wo.Item).realSemen}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdSemen}}</td>

            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihSemen).cek"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihSemen).cek"
                class="fas fa-arrow-down"
              ></i>
              {{cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihSemen).nilai}}
            </td>

            <td>{{getTotal(wo.Realisasis, wo.Item).realAdd}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdAdd}}</td>

            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihAdd).cek"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihAdd).cek"
                class="fas fa-arrow-down"
              ></i>
              {{cekSelisih(getTotal(wo.Realisasis, wo.Item).selisihAdd).nilai}}
            </td>

            <td id="kiri">{{getTotal(wo.Realisasis, wo.Item).kendala}}</td>
            <td id="tengah">
              <a @click.prevent="showEdit(wo)">
                <i class="fas fa-edit" title="edit"></i>
              </a>
              <a @click.prevent="confirmDelete(wo.id)">
                <i class="fas fa-trash"></i>
              </a>
            </td>
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

export default {
  name: "Realisasi",
  data() {
    return {
      editStatus: false,
      id: 0,
      RelasiId: 0,
      ScheduleId: 0,
      NomorWoId: 0,
      namaWo: "",
      ItemId: 0,
      tanggal: "",
      startDate: "",
      endDate: "",
      isEdit: false,
      namaWo: ""
    };
  },
  computed: {
    relasiUser() {
      return this.$store.state.relasiUser;
    },
    realisasiUser() {
      return this.$store.state.realisasiUser;
    },
    scheduleUser() {
      return this.$store.state.scheduleUser;
    },
    nomorWoUser() {
      return this.$store.state.nomorWoUser;
    }
  },
  created() {
    this.$store.dispatch("fetchRelasi");
    this.$store.dispatch("fetchSchedule");
    this.$store.dispatch("getNomorWo");
  },
  methods: {
    showAdd() {
      $("#modalForm").modal("show");
      this.id = 0;
      this.RelasiId = 0;
      this.ScheduleId = 0;
      this.NomorWoId = 0;
      this.namaWo = "";
      this.ItemId = 0;
      this.tanggal = "";
      this.isEdit = false;
    },
    showEdit(item) {
      $("#modalForm").modal("show");
      this.isEdit = true;
      this.tanggal = item.tanggal;
      this.ScheduleId = item.ScheduleId;
      this.namaWo = item.namaWo;
      this.id = item.id;
    },
    addWo() {
      console.log(this.ScheduleId, this.namaWo);
      return axios
        .post(
          "/database/nomorwo",
          {
            ScheduleId: this.ScheduleId,
            namaWo: this.namaWo
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          // this.$store.dispatch("getNomorWo");
          Swal.fire("Ok", "Nomor Wo Baru berhasil Ditambahkan", "success");
          $("#modalForm").modal("hide");

          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Maaf", "Periksa Kembali data Anda", "error");
        });
    },
    scheduleUpdate() {
      let hasil = [];
      this.scheduleUser?.map(item => {
        if (item.tanggal.slice(0, 10) == this.tanggal) {
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
      let hasil = [];
      if (!this.startDate || !this.endDate) {
        hasil = this.nomorWoUser;
      } else {
        this.nomorWoUser?.map(item => {
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
    getTotal(data, data2) {
      // console.log(data2, "========");
      let hasil = {
        volume: 0,
        so: "",
        shipment: "",
        realPasir: 0,
        stdPasir: 0,
        selisihPasir: 0,
        realSemen: 0,
        stdSemen: 0,
        selisihSemen: 0,
        realCipping: 0,
        stdCipping: 0,
        selisihCipping: 0,
        realSplit: 0,
        stdSplit: 0,
        selisihSplit: 0,
        realAdd: 0,
        stdAdd: 0,
        selisihAdd: 0,
        kendala: "",
        m3Pasir: 0,
        m3Cipping: 0,
        m3Split: 0
      };
      data?.map(item => {
        hasil.volume += +item.volume;
        hasil.realPasir += +item.pasir;
        hasil.realCipping += +item.cipping;
        hasil.realSplit += +item.split;
        hasil.realSemen += +item.semen;
        hasil.realAdd += +item.additiveCair;
        if (item.kendala) {
          hasil.kendala += item.kendala + ", ";
        }

        if (item.so) {
          hasil.so = item.so;
        }
        if (item.shipment) {
          hasil.shipment = item.shipment;
        }
      });
      hasil.stdPasir = hasil.volume * +data2.stdPasir;
      hasil.stdSemen = hasil.volume * +data2.stdSemen;
      hasil.stdSplit = hasil.volume * +data2.stdSplit;
      hasil.stdCipping = hasil.volume * +data2.stdCpping;
      hasil.stdAdd = Math.ceil(hasil.volume * +data2.stdAdditive);
      hasil.selisihPasir = hasil.realPasir - hasil.stdPasir;
      hasil.selisihCipping = hasil.realCipping - hasil.stdCipping;
      hasil.selisihSplit = hasil.realSplit - hasil.stdSplit;
      hasil.selisihSemen = hasil.realSemen - hasil.stdSemen;
      hasil.selisihAdd = hasil.realAdd - hasil.stdAdd;

      hasil.m3Pasir = Math.ceil((hasil.realPasir / 1372) * 10000) / 100;
      hasil.m3Cipping = Math.ceil((hasil.realCipping / 1416) * 10000) / 100;
      hasil.m3Split = Math.ceil((hasil.realSplit / 1519) * 10000) / 100;
      return hasil;
    },
    cekSelisih(data) {
      let hasil = {
        cek: true,
        nilai: 0
      };
      if (data < 1) {
        hasil.nilai = data * -1;
      } else {
        hasil.nilai = data;
        hasil.cek = false;
      }

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
          setTimeout(function() {
            this.$store.dispatch("getNomorWo");
            this.filterData();
          }, 1000);
          this.deleteWo(id);
          Swal.fire("Deleted!", "Data Berhasil Dihapus", "success");
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
        }
      });
    },
    deleteWo(id) {
      return axios
        .delete(`/database/nomorwo/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          this.$store.dispatch("getNomorWo");

          this.filterData();
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
        });
    },
    editWo() {
      return axios
        .put(
          `/database/nomorwo/${this.id}`,
          {
            ScheduleId: this.ScheduleId,
            namaWo: this.namaWo
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          // this.$store.dispatch("getNomorWo");
          Swal.fire("Ok", "Nomor Wo Baru berhasil Diubah", "success");
          $("#modalForm").modal("hide");

          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
          this.$store.dispatch("getNomorWo");
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Maaf", "Periksa Kembali data Anda", "error");
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
#kiri {
  text-align: left;
}
#tengah {
  text-align: center;
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
  min-width: 2300px;
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
@media screen and (max-width: 800px) {
  #head {
    font-weight: 500;
    font-size: 25px;
  }
  button {
    font-size: 12px;
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
    font-size: 12px;
    padding: 2px 1px;
  }
  .tanggal {
    font-size: 80%;
  }
}
</style>
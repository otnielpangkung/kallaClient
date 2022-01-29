<template>
  <div class="Realisasi">
    <p class="mt-3" id="head">LAPORAN PRODUKSI</p>
    {{tanggal}}
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
    <div class="over-flow-auto">
      <b-pagination
        :total-rows="filterData().length"
        v-model="currentPage"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
      <div class="tableView">
        <b-table
          id="my-table"
          :items="filterData()"
          :per-page="perPage"
          :current-page="currentPage"
          bordered
          :filter="filter"
          :fields="fields"
        >
          <template #thead-top>
            <b-tr>
              <b-th colspan="8"></b-th>
              <b-th colspan="4">Pasir</b-th>
              <b-th colspan="4">Cipping</b-th>
              <b-th colspan="4">Split</b-th>
              <b-th colspan="4">Semen</b-th>
            </b-tr>
          </template>
          <template #cell(so)="row">{{ getTotal(row.item.Realisasis, row.item.Item).so }}</template>
          <template
            #cell(shipment)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).shipment }}</template>
          <template #cell(tanggal)="row">{{ formatTanggal(row.value) }}</template>
          <template #cell(relasi)="row">{{ row.item.Relasi.namaRelasi }}</template>
          <template #cell(alamat)="row">{{ row.item.Schedule.lokasi }}</template>
          <template #cell(item)="row">{{ row.item.Item.namaItem }} - {{ row.item.Item.mutu }}</template>
          <template #cell(volume)="row">
            <!-- {{row.item.Realisasis}} -->
            {{ getTotal(row.item.Realisasis, row.item.Item).volume }}
          </template>
          <!-- Pasir -->
          <template
            #cell(pasirReal)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).realPasir }}</template>
          <template
            #cell(pasirStd)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).stdPasir }}</template>
          <template #cell(pasirM3)="row">{{ getTotal(row.item.Realisasis, row.item.Item).m3Pasir }}</template>
          <template #cell(pasirSelisih)="row">
            <i
              v-if="cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihPasir).cek"
              class="fas fa-arrow-up"
            ></i>
            <i
              v-if="!cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihPasir).cek"
              class="fas fa-arrow-down"
            ></i>
            {{cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihPasir).nilai}}
          </template>
          <!-- Cipping -->
          <template
            #cell(cippingReal)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).realCipping }}</template>
          <template
            #cell(cippingStd)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).stdCipping }}</template>
          <template
            #cell(cippingM3)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).m3Cipping }}</template>
          <template #cell(cippingSelisih)="row">
            <i
              v-if="cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihCipping).cek"
              class="fas fa-arrow-up"
            ></i>
            <i
              v-if="!cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihCipping).cek"
              class="fas fa-arrow-down"
            ></i>
            {{cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihCipping).nilai}}
          </template>
          <!-- Split -->
          <template
            #cell(splitReal)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).realSplit }}</template>
          <template
            #cell(splitStd)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).stdSplit }}</template>
          <template #cell(splitM3)="row">{{ getTotal(row.item.Realisasis, row.item.Item).m3Split }}</template>
          <template #cell(splitSelisih)="row">
            <i
              v-if="cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihSplit).cek"
              class="fas fa-arrow-up"
            ></i>
            <i
              v-if="!cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihSplit).cek"
              class="fas fa-arrow-down"
            ></i>
            {{cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihSplit).nilai}}
          </template>
          <!-- Semen -->
          <template
            #cell(semenReal)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).realSemen }}</template>
          <template
            #cell(semenStd)="row"
          >{{ getTotal(row.item.Realisasis, row.item.Item).stdSemen }}</template>
          <template #cell(semenM3)="row">{{ getTotal(row.item.Realisasis, row.item.Item).m3Semen }}</template>
          <template #cell(semenSelisih)="row">
            <i
              v-if="cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihSemen).cek"
              class="fas fa-arrow-up"
            ></i>
            <i
              v-if="!cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihSemen).cek"
              class="fas fa-arrow-down"
            ></i>
            {{cekSelisih(getTotal(row.item.Realisasis, row.item.Item).selisihSemen).nilai}}
          </template>
          <!-- action -->
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

    <!-- <button class="btn btn-primary" @click.prevent="filterData()">Lihat</button> -->
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
      perPage: 20,
      currentPage: 1,
      filter: null,
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
      namaWo: "",
      fields: [
        {
          key: "namaWo",
          label: "Nomor Wo",
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
          key: "Relasi",
          label: "Relasi"
        },
        {
          key: "Alamat",
          label: "Alamat",
          class: "text-left"
        },
        {
          key: "item",
          label: "Item Description",
          class: "text-left"
        },
        {
          key: "volume",
          label: "Total Volume",
          class: "text-right"
        },
        {
          key: "pasirReal",
          label: "Realisasi",
          class: "text-right"
        },
        {
          key: "pasirStd",
          label: "Standar",
          class: "text-right"
        },
        {
          key: "pasirM3",
          label: "M(3)",
          class: "text-right"
        },
        {
          key: "pasirSelisih",
          label: "Selisih",
          class: "text-right"
        },
        {
          key: "cippingReal",
          label: "Realisasi",
          class: "text-right"
        },
        {
          key: "cippingStd",
          label: "Standar",
          class: "text-right"
        },
        {
          key: "cippingM3",
          label: "M(3)",
          class: "text-right"
        },
        {
          key: "cippingSelisih",
          label: "Selisih",
          class: "text-right"
        },
        {
          key: "splitReal",
          label: "Realisasi",
          class: "text-right"
        },
        {
          key: "splitStd",
          label: "Standar",
          class: "text-right"
        },
        {
          key: "splitM3",
          label: "M(3)",
          class: "text-right"
        },
        {
          key: "splitSelisih",
          label: "Selisih",
          class: "text-right"
        },
        {
          key: "semenReal",
          label: "Realisasi",
          class: "text-right"
        },
        {
          key: "semenStd",
          label: "Standar",
          class: "text-right"
        },
        {
          key: "semenM3",
          label: "M(3)",
          class: "text-right"
        },
        {
          key: "semenSelisih",
          label: "Selisih",
          class: "text-right"
        },
        {
          key: "action",
          label: "Action"
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
    scheduleUser() {
      return this.$store.state.scheduleUser.rows;
    },
    nomorWoUser() {
      return this.$store.state.nomorWoUser.rows;
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
</style>
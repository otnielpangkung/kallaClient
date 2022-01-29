<template>
  <div class="Realisasi">
    <p class="mt-3" id="head">LAPORAN PRODUKSI</p>
    <!-- {{this.realisasiUser}} -->

    <div class="form-row">
      <div class="input-group col-sm">
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

    <div class="tableView mt-2">
      <table class="table table-hover table-striped table-bordered" id="table">
        <thead>
          <tr>
            <th scope="col" rowspan="2">No. WO</th>
            <th scope="col" rowspan="2">SO</th>
            <th scope="col" rowspan="2">Shipment</th>
            <th scope="col" rowspan="2">Tanggal</th>
            <th scope="col" rowspan="2">Cabang / Unit</th>
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
            <th>(m3)</th>
            <th scope="col">Selisih</th>
            <th scope="col">Realisasi</th>
            <th scope="col">Standar</th>
            <th>(m3)</th>
            <th scope="col">Selisih</th>
            <th scope="col">Realisasi</th>
            <th scope="col">Standar</th>
            <th>(m3)</th>
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
            <td id="tengah">{{wo.User.namaCabang}}</td>
            <td id="kiri">{{wo.Relasi.namaRelasi}}</td>
            <td id="kiri">{{wo.Schedule.lokasi}}</td>
            <td id="kiri">{{wo.Item.namaItem}} - {{wo.Item.mutu}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).volume}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).realPasir}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdPasir}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).m3Pasir}}</td>
            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).realPasir,getTotal(wo.Realisasis, wo.Item).stdPasir)"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).realPasir,getTotal(wo.Realisasis, wo.Item).stdPasir)"
                class="fas fa-arrow-up"
              ></i>
              {{selisih(getTotal(wo.Realisasis, wo.Item).realPasir,getTotal(wo.Realisasis, wo.Item).stdPasir)}}
            </td>

            <td>{{getTotal(wo.Realisasis, wo.Item).realCipping}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdCipping}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).m3Cipping}}</td>
            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).realCipping,getTotal(wo.Realisasis, wo.Item).stdCipping)"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).realCipping,getTotal(wo.Realisasis, wo.Item).stdCipping)"
                class="fas fa-arrow-up"
              ></i>
              {{selisih(getTotal(wo.Realisasis, wo.Item).realCipping,getTotal(wo.Realisasis, wo.Item).stdCipping)}}
            </td>

            <td>{{getTotal(wo.Realisasis, wo.Item).realSplit}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdSplit}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).m3Split}}</td>
            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).realSplit,getTotal(wo.Realisasis, wo.Item).stdSplit)"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).realSplit,getTotal(wo.Realisasis, wo.Item).stdSplit)"
                class="fas fa-arrow-up"
              ></i>
              {{selisih(getTotal(wo.Realisasis, wo.Item).realSplit,getTotal(wo.Realisasis, wo.Item).stdSplit)}}
            </td>

            <td>{{getTotal(wo.Realisasis, wo.Item).realSemen}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdSemen}}</td>
            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).realSemen,getTotal(wo.Realisasis, wo.Item).stdSemen)"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).realSemen,getTotal(wo.Realisasis, wo.Item).stdSemen)"
                class="fas fa-arrow-up"
              ></i>
              {{selisih(getTotal(wo.Realisasis, wo.Item).realSemen,getTotal(wo.Realisasis, wo.Item).stdSemen)}}
            </td>

            <td>{{getTotal(wo.Realisasis, wo.Item).realAdd}}</td>
            <td>{{getTotal(wo.Realisasis, wo.Item).stdAdd}}</td>
            <td>
              <i
                v-if="cekSelisih(getTotal(wo.Realisasis, wo.Item).realAdd,getTotal(wo.Realisasis, wo.Item).stdAdd)"
                class="fas fa-arrow-up"
              ></i>
              <i
                v-if="!cekSelisih(getTotal(wo.Realisasis, wo.Item).realAdd,getTotal(wo.Realisasis, wo.Item).stdAdd)"
                class="fas fa-arrow-up"
              ></i>
              {{selisih(getTotal(wo.Realisasis, wo.Item).realAdd,getTotal(wo.Realisasis, wo.Item).stdAdd)}}
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
    <!-- {{this.allNomorWo}}-- -->
    <!-- {{setUser()}} -->
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
      endDate: "",
      startDate: "",
      cabang: 0
    };
  },
  computed: {
    allNomorWo() {
      return this.$store.state.allNomorWo;
    },
    users() {
      return this.$store.state.users;
    }
  },
  created() {
    this.$store.dispatch("getAllNomorWo");
    this.$store.dispatch("getAllUser");
  },
  methods: {
    formatTanggal(data) {
      let hasil = "";
      var time = moment(data).format("DD-MM-YYYY h:mm:ss");
      hasil = time.slice(0, 10);
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
        penm = this.allNomorWo;
      } else {
        this.allNomorWo?.map(item => {
          if (item.UserId == this.cabang) {
            penm.push(item);
          }
        });
      }

      if (!this.startDate || !this.endDate) {
        hasil = penm;
      } else {
        penm?.map(item => {
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
      let hasil = {
        volume: 0,
        so: "",
        shipment: "",
        realPasir: 0,
        stdPasir: 0,
        selisihPasir: 0,
        m3Pasir: 0,
        realSemen: 0,
        stdSemen: 0,
        selisihSemen: 0,
        realCipping: 0,
        m3Cipping: 0,
        stdCipping: 0,
        selisihCipping: 0,
        realSplit: 0,
        m3Split: 0,
        stdSplit: 0,
        selisihSplit: 0,
        realAdd: 0,
        stdAdd: 0,
        selisihAdd: 0,
        kendala: ""
      };
      data?.map(item => {
        hasil.volume += +item.volume;
        hasil.realPasir += +item.pasir;
        hasil.realCipping += +item.cipping;
        hasil.realSplit += +item.split;
        hasil.realSemen += +item.semen;
        hasil.realAdd += +item.additiveCair;
        hasil.kendala += item.kendala + ", ";
        if (item.so) {
          hasil.so = item.so;
        }
        if (item.shipment) {
          hasil.shipment = item.shipment;
        }
      });
      hasil.stdPasir = +hasil.volume * +data2.stdPasir;
      hasil.stdSemen = +hasil.volume * +data2.stdSemen;
      hasil.stdSplit = +hasil.volume * +data2.stdSplit;
      hasil.stdCipping = +hasil.volume * +data2.stdCpping;
      hasil.stdAdd = Math.ceil(hasil.volume * +data2.stdAdditive);
      hasil.selisihPasir = hasil.stdPasir - hasil.realPasir;
      hasil.selisihCipping = hasil.stdCipping - hasil.realCipping;
      hasil.selisihSplit = hasil.stdSplit - hasil.realSplit;
      hasil.selisihAdd = hasil.stdAdd - hasil.realAdd;
      hasil.selisihSemen = hasil.stdSemen - hasil.realSemen;
      //  m3
      hasil.m3Pasir = Math.ceil((hasil.realPasir / 1372) * 10000) / 100;
      hasil.m3Cipping = Math.ceil((hasil.realCipping / 1416) * 10000) / 100;
      hasil.m3Split = Math.ceil((hasil.realSplit / 1519) * 10000) / 100;
      return hasil;
    },
    selisih(real, std) {
      let hasil = 0;

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
          this.deleteWo(id);
          Swal.fire("Deleted!", "Data Berhasil Dihapus", "success");
          this.$store.dispatch("getNomorWo");
        }
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
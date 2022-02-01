<template>
  <div class="Realisasi">
    <p class="mt-3" id="head">PEMAKAIAN SOLAR</p>
    <div class="row col-lg-1 justify-content-center">
      <p>Periode:</p>
      <vue-monthly-picker v-model="selectedMonth"></vue-monthly-picker>
    </div>
    <button class="btn btn-primary mr-3" @click.prevent="showAddMobil">Tambah Mobil</button>
    <button class="btn btn-primary" @click.prevent="showAddSolar">Tambah Solar</button>
    <button id="download" class="btn" @click.prevent="tableHtmlToExcel('relasiTable')">
      <i class="fa fa-download"></i> Download
    </button>
    <!-- modal Add -->
    <div class="modal fade" id="modalForm" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <form @submit.prevent="statusModal ? editMobil() : addMobil()">
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Nomor Mobil</label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="nomorMobil" required />
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Tambahkan</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- solarForm -->
    <div class="modal fade" id="solarForm" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <form @submit.prevent="editStatus ? editSolar() : addSolar()">
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Mobil</label>
                <div class="input-group">
                  <select v-model="MobilId" class="form-control">
                    <option
                      v-for="mobil in mobilUser"
                      :key="mobil.id"
                      :value="mobil.id"
                    >{{mobil.nomorMobil}}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Tanggal</label>
                <div class="input-group">
                  <input class="form-control" type="date" v-model="tanggal" required />
                </div>
              </div>
              <div class="col-sm">
                <label class="my-1 mr-2" for="kelompokMA">Jumlah</label>
                <div class="input-group">
                  <input class="form-control" type="number" v-model="jumlah" required />
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Tambahkan</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="daftarRelasi">DAFTAR RELASI</div>
    <!-- table -->
    <div class="tableView">
      <!-- <div class="input-group mb-3">
        <label class="my-1 mr-2" for="Username">Tanggal :</label>
        <input type="date" class="form-control mr-3" v-model="startDate" /> -
        <input type="date" class="form-control ml-3" v-model="endDate" />
      </div>-->

      <table class="table table-bordered border-primary" id="relasiTable">
        <thead class="table">
          <th>No Kendaraan.</th>
          <th></th>
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
          <tr v-for="mobil in this.mobilUser" :key="mobil.id">
            <td id="edit">{{mobil.nomorMobil}}</td>
            <td id="edit">
              <a @click.prevent="showEditMobil(mobil)">
                <i class="fas fa-edit" title="Edit Mobil"></i>
              </a>
            </td>
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
            <th id="edit" colspan="2">Total</th>
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
      <!-- </div> -->
    </div>
    <div class="tableView mt-3">
      <div class="daftarRelasi mt-2">Daftar Pemakaian Solar</div>
      <table class="table table-bordered border-primary">
        <thead class="table">
          <th>No Kendaraan.</th>
          <th>Tanggal</th>
          <th>Jumlah</th>
          <th>Action</th>
        </thead>
        <tbody>
          <!-- {{this.mobilUser}} -->
          <tr v-for="solar in dataSolar()" :key="solar.id">
            <td id="edit">{{solar.Mobil.nomorMobil}}</td>
            <td id="edit">{{solar.tanggal.slice(0,10)}}</td>
            <td id="uang">{{formatUang(solar.jumlah)}}</td>
            <td id="edit">
              <a @click.prevent="showEditSolar(solar)">
                <i class="fas fa-edit" title="edit"></i>
              </a>
              <a @click.prevent="confirmDelete(solar.id)">
                <i class="fas fa-trash-alt" title="hapus"></i>
              </a>
            </td>
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
      statusModal: false,
      editStatus: false,
      nomorMobil: "",
      MobilId: 0,
      tanggal: "",
      jumlah: 0,
      id: 0,
      selectedMonth: ""
    };
  },
  components: {
    VueMonthlyPicker
  },
  computed: {
    relasiUser() {
      return this.$store.state.relasiUser.rows;
    },
    solarUser() {
      return this.$store.state.solarUser.rows;
    },
    mobilUser() {
      return this.$store.state.mobilUser.rows;
    }
  },
  created() {
    this.$store.dispatch("fetchRelasi");
    this.$store.dispatch("fetchSchedule");
    this.$store.dispatch("fetchRealisasiUser");
    this.$store.dispatch("getSolarUser");
    this.$store.dispatch("getMobilUser");
  },
  methods: {
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
    showAddSolar() {
      $("#solarForm").modal("show");
      this.editStatus = false;
      this.id = 0;
      this.MobilId = "";
      this.jumlah = 0;
      this.nomorMobil = "";
    },
    showEditSolar(item) {
      this.editStatus = true;
      $("#solarForm").modal("show");
      this.id = item.id;
      this.MobilId = item.MobilId;
      this.tanggal = item.tanggal;
      this.jumlah = item.jumlah;
    },
    showEditMobil(item) {
      this.statusModal = true;
      $("#modalForm").modal("show");
      this.nomorMobil = item.nomorMobil;
      this.id = item.id;
    },
    showAddMobil() {
      $("#modalForm").modal("show");
      this.statusModal = false;
      this.nomorMobil = "";
    },
    editMobil() {
      return axios
        .put(
          `/database/mobil/${this.id}`,
          {
            nomorMobil: this.nomorMobil
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          Swal.fire("Terima Kasih", "Data telah ditambahkan", "success");
          this.$store.dispatch("getMobilUser");
          $("#modalForm").modal("hide");
          this.id = 0;
          this.nomorMobil = "";
          this.editStatus = false;
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kemabli Data Anda", "error");
          this.$store.dispatch("getMobilUser");
        });
    },
    addMobil() {
      return axios
        .post(
          "/database/mobil",
          {
            nomorMobil: this.nomorMobil
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          Swal.fire("Terima Kasih", "Data telah ditambahkan", "success");
          this.$store.dispatch("getMobilUser");
          $("#modalForm").modal("hide");
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kembali Data Anda", "error");
        });
    },
    deleteSolar(id) {
      return axios
        .delete(`/database/solar/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          this.$store.dispatch("getMobilUser");
          this.$store.dispatch("getSolarUser");
          this.$store.dispatch("getSolarUser");
          this.$store.dispatch("getSolarUser");
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kemabli Data Anda", "error");
          this.$store.dispatch("getMobilUser");
        });
    },
    confirmDelete(id) {
      Swal.fire({
        title: "Yakin?",
        text: "Apakah Yakin Menghapus Data",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batalkan"
      }).then(result => {
        if (result.isConfirmed) {
          this.deleteSolar(id);
          Swal.fire("Deleted!", "Data Berhasil Dihapus", "success");
        } else {
          Swal.fire("Ok", "Proses anda berhasil dibatalkan", "error");
        }
      });
    },
    editSolar() {
      return axios
        .put(
          `/database/solar/${this.id}`,
          {
            MobilId: this.MobilId,
            jumlah: this.jumlah,
            tanggal: this.tanggal
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          Swal.fire("Terima Kasih", "Data telah ditambahkan", "success");
          this.$store.dispatch("getMobilUser");
          this.$store.dispatch("getSolarUser");
          $("#solarForm").modal("hide");
          this.id = 0;
          this.MobilId = 0;
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kemabli Data Anda", "error");
          this.$store.dispatch("getMobilUser");
        });
    },
    addSolar() {
      return axios
        .post(
          "/database/solar",
          {
            MobilId: this.MobilId,
            jumlah: this.jumlah,
            tanggal: this.tanggal
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          this.$store.dispatch("getSolarUser");
          Swal.fire("Terima Kasih", "Data telah ditambahkan", "success");
          this.$store.dispatch("getMobilUser");
          $("#solarForm").modal("hide");
          this.$store.dispatch("getSolarUser");
          this.$store.dispatch("getSolarUser");
        });
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

    getTotal(tanggal) {
      let hasil = 0;
      if (tanggal !== 0) {
        this.solarUser?.map(item => {
          const bulan = moment(item.tanggal).format("MM-YYYY");
          const periode = moment(this.selectedMonth).format("MM-YYYY");
          const tanggalItem = moment(item.tanggal).format("DD");
          if (bulan == periode && tanggal == tanggalItem) {
            hasil += item.jumlah;
          }
        });
      } else {
        this.solarUser?.map(item => {
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
    tableHtmlToExcel(tableID, filename = `Daftar Solar`) {
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
  justify-content: center;
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
button {
  margin-bottom: 20px;
  margin-top: 20px;
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
  min-width: 2300px;

  margin-left: 20px;
}
.tableView {
  max-height: 500px;
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
#download {
  background-color: transparent;
  color: rgb(72, 66, 33);
}
</style>
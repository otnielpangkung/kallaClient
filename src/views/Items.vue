<template>
  <div class="Items">
    <p class="mt-3" id="head">ITEMS</p>
    <div class="row justify-content-center">
      <div class="col col-lg-11">
        <div class="headTable">DAFTAR TABLE</div>
        <button type="button" class="btn btn-primary" @click.prevent="showAdd()">Tambahkan Item</button>
        <button id="download" class="btn" @click.prevent="tableHtmlToExcel('table')">
          <i class="fa fa-download"></i> Download
        </button>
        <div class="modal fade" id="modalForm" role="dialog">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-body">
                <form @submit.prevent="editStatus ? editItem() : addItem()">
                  <input
                    type="text"
                    v-model="namaItem"
                    placeholder="Type"
                    class="form-control"
                    required
                  />
                  <input
                    type="text"
                    v-model="mutu"
                    placeholder="Mutu"
                    class="form-control mt-2"
                    required
                  />
                  <input
                    type="number"
                    step="any"
                    v-model="stdSemen"
                    placeholder="Semen"
                    class="form-control mt-2"
                    required
                  />
                  <input
                    type="number"
                    step="any"
                    v-model="stdPasir"
                    placeholder="Pasir"
                    class="form-control mt-2"
                    required
                  />
                  <input
                    type="number"
                    step="any"
                    v-model="stdCpping"
                    placeholder="Cipping"
                    class="form-control mt-2"
                  />
                  <input
                    type="number"
                    step="any"
                    v-model="stdSplit"
                    placeholder="Split"
                    class="form-control mt-2"
                  />
                  <input
                    type="number"
                    step="any"
                    v-model="stdAir"
                    placeholder="Air"
                    class="form-control mt-2"
                  />
                  <input
                    min="0.001"
                    step="any"
                    type="number"
                    v-model="stdAdditive"
                    placeholder="additive"
                    class="form-control mt-2 mb-2"
                    required
                  />
                  <button class="btn btn-secondary" type="submit">Tambahkan</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="tableView">
          <table id="table" class="table table-hover table-striped table-bordered mb-3">
            <thead>
              <tr>
                <th>Mutu</th>
                <th>Type</th>
                <th>Semen</th>
                <th>Pasir</th>
                <th>Chipping</th>
                <th>Splite</th>
                <th>Air</th>
                <th>Additive</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in this.itemUser" :key="item.id">
                <td>{{item.mutu}}</td>
                <td>{{item.namaItem}}</td>
                <td>{{item.stdSemen}}</td>
                <td>{{item.stdPasir}}</td>
                <td>{{item.stdCpping}}</td>
                <td>{{item.stdSplit}}</td>
                <td>{{item.stdAir}}</td>
                <td>{{item.stdAdditive}}</td>
                <td>
                  <a @click.prevent="showEdit(item)">
                    <i class="fas fa-edit" title="edit"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- {{this.items}} -->
  </div>
</template>

<script>
import axios from "../API/axios";
export default {
  name: "Items",
  data() {
    return {
      namaItem: "",
      mutu: "",
      stdPasir: "",
      stdSemen: "",
      stdCpping: "",
      stdSplit: "",
      stdAir: "",
      stdAdditive: "",
      id: 0,
      editStatus: false
    };
  },
  methods: {
    showAdd() {
      $("#modalForm").modal("show");
      this.editStatus = false;
      this.namaItem = "";
      this.mutu = "";
      this.stdPasir = "";
      this.stdSemen = "";
      this.stdCpping = "";
      this.stdSplit = "";
      this.stdAir = "";
      this.stdAdditive = "";
    },
    showEdit(item) {
      $("#modalForm").modal("show");
      this.editStatus = true;
      this.namaItem = item.namaItem;
      this.mutu = item.mutu;
      this.stdPasir = item.stdPasir;
      this.stdSemen = item.stdSemen;
      this.stdCpping = item.stdCpping;
      this.stdSplit = item.stdSplit;
      this.stdAir = item.stdAir;
      this.stdAdditive = item.stdAdditive;
      this.id = item.id;
    },
    addItem() {
      return axios
        .post(
          "/database/item",
          {
            namaItem: this.namaItem,
            mutu: this.mutu,
            stdPasir: this.stdPasir,
            stdSemen: this.stdSemen,
            stdCpping: this.stdCpping,
            stdSplit: this.stdSplit,
            stdAir: this.stdAir,
            stdAdditive: this.stdAdditive
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          Swal.fire("Terima Kasih", "Data telah ditambahkan", "success");
          $("#modalForm").modal("hide");

          this.$store.dispatch("fetchItemUser");
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kemabli Data Anda", "error");
          this.$store.dispatch("getMobilUser");
        });
    },
    editItem() {
      return axios
        .put(
          `/database/item/${this.id}`,
          {
            namaItem: this.namaItem,
            mutu: this.mutu,
            stdPasir: this.stdPasir,
            stdSemen: this.stdSemen,
            stdCpping: this.stdCpping,
            stdSplit: this.stdSplit,
            stdAir: this.stdAir,
            stdAdditive: this.stdAdditive
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          Swal.fire("Terima Kasih", "Data telah ditambahkan", "success");
          this.$store.dispatch("fetchItem");
          this.$store.dispatch("fetchItemUser");
          $("#modalForm").modal("hide");
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kemabli Data Anda", "error");
          this.$store.dispatch("getMobilUser");
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
  },
  created() {
    this.$store.dispatch("fetchItemUser");
  },
  computed: {
    relasiUser() {
      return this.$store.state.relasiUser;
    },
    realisasiUser() {
      return this.$store.state.realisasiUser;
    },
    sheduleUser() {
      return this.$store.state.scheduleUser;
    },
    items() {
      return this.$store.state.items;
    },
    itemUser() {
      return this.$store.state.itemUser;
    }
  }
};
</script>

<style scoped>
.Items {
  width: 85vw;
}
#download {
  background-color: transparent;
  color: rgb(72, 66, 33);
}
#head {
  font-weight: 600;
  font-size: 40px;
}
.headTable {
  font-size: 25px;
  margin-bottom: 5px;
  font-weight: bold;
}
table th,
td {
  text-align: center;
}
table td {
  padding: 2px;
}
button {
  margin-bottom: 20px;

  background-color: #038c3e;
  color: antiquewhite;
}
button:hover {
  color: #038c3e;
  background-color: white;
}
@media screen and (max-width: 800px) {
  .tableView {
    overflow-x: scroll;
  }
}
</style>
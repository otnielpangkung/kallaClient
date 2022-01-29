<template>
  <div class="Relasi">
    <p class="mt-3" id="head">DAFTAR USER</p>
    <div class="row justify-content-center">
      <div class="col col-lg-8 mt-3">
        <div class="form-row mb-3">
          <button class="btn" @click.prevent="showAdd">Tambah User</button>
          <button id="download" class="btn" @click.prevent="tableHtmlToExcel('table')">
            <i class="fa fa-download"></i> Download
          </button>
        </div>
        <div class="modal fade" id="modalForm" role="dialog">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-body">
                <form @submit.prevent=" editStatus? editUser(): addUser()">
                  <div class="col-sm" v-if="!editStatus">
                    <label class="my-1 mr-2" for="kelompokMA">Username</label>
                    <div class="input-group">
                      <input class="form-control" type="text" v-model="username" required />
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="my-1 mr-2" for="kelompokMA">Password</label>
                    <div class="input-group">
                      <input class="form-control" type="text" v-model="password" required />
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="my-1 mr-2" for="kelompokMA">Nama Unit</label>
                    <div class="input-group">
                      <input class="form-control" type="text" v-model="namaCabang" required />
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="my-1 mr-2" for="kelompokMA">Role</label>
                    <select
                      class="form-control"
                      id="ScheduleId"
                      v-model="role"
                      aria-placeholder="Relasi"
                      required
                    >
                      <option value="0" disabled>PILIH ROLE</option>
                      <option v-for="role in this.rolelist" :key="role" :value="role">{{role}}</option>
                    </select>
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
        <table class="table table-striped" id="table">
          <thead class="table">
            <th>Username</th>
            <th>Nama Unit</th>
            <th>Role</th>
            <th>Reset Pass</th>
          </thead>
          <tbody>
            <tr v-for="user in this.allUser" :key="user.id">
              <td>{{user.username}}</td>
              <td>{{user.namaCabang}}</td>
              <td>{{user.role}}</td>
              <td>
                <a @click.prevent="confirmReset(user.id)" class="mr-2">
                  <i class="fas fa-power-off"></i>
                </a>
                <a @click.prevent="showEdit(user)">
                  <i class="fas fa-edit" title="edit"></i>
                </a>
              </td>
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
      username: "",
      password: "",
      role: 0,
      id: 0,
      namaCabang: "",
      rolelist: ["admin", "tamu", "staff"],
      editStatus: false
    };
  },
  computed: {
    allUser() {
      return this.$store.state.users;
    }
  },
  created() {
    this.$store.dispatch("getAllUser");
  },
  methods: {
    showAdd() {
      $("#modalForm").modal("show");
      this.editStatus = false;
      this.username = "";
      this.password = "";
      this.role = 0;
      this.namaCabang = "";
    },
    showEdit(item) {
      console.log(item);
      $("#modalForm").modal("show");
      this.editStatus = true;
      this.id = item.id;
      this.role = item.role;
      this.namaCabang = item.namaCabang;
      this.password = "";
    },
    editUser() {
      return axios
        .put(
          `/user/${this.id}`,
          {
            password: this.password,
            role: this.role,
            namaCabang: this.namaCabang
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          Swal.fire("Terima Kasih", "Data telah Diubah", "success");
          this.$store.dispatch("getAllUser");
          $("#modalForm").modal("hide");
          this.editStatus = false;
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kembali Data Anda", "error");
        });
    },
    addUser() {
      return axios
        .post(
          "/user/register",
          {
            username: this.username,
            password: this.password,
            role: this.role,
            namaCabang: this.namaCabang
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          Swal.fire("Terima Kasih", "Data telah ditambahkan", "success");
          this.$store.dispatch("getAllUser");
          $("#modalForm").modal("hide");
        })
        .catch(err => {
          Swal.fire("Maaf", "Periksa Kembali Data Anda", "error");
        });
    },
    confirmReset(id) {
      Swal.fire({
        title: "Yakin?",
        text: "Yakin ki mau reset?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Reset!!",
        cancelButtonText: "Batal"
      }).then(result => {
        console.log(id, "=====");
        if (result.isConfirmed) {
          this.resetPass(id);
          Swal.fire("Reset!", "Data Berhasil Diubah", "success");
          this.$store.dispatch("getAllUser");
        }
      });
    },
    resetPass(id) {
      return axios.patch(`/user/resetpass/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      });
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
table td {
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
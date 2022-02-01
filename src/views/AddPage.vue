<template>
  <div class="addPage">
    <div class="formRow mt-2">
      <div class="form-row" v-for="item in this.items" :key="item">
        <div class="col-sm">
          <label for="item.nama">Tanggal</label>
          <input type="date" required class="form-control" v-model="item.tanggal" />
        </div>
        <div class="col-sm">
          <label for="item.nama">Nomor Wo</label>
          <select
            class="form-control"
            id="RelasiId"
            v-model="item.NomorWoId"
            aria-placeholder="Relasi"
            required
          >
            <option selected disabled value="0">Pilih WO</option>
            <option
              v-for="wo in nomorWo()"
              :key="wo.id"
              :value="wo.id"
            >{{wo.namaWo}} - {{wo.Relasi.namaRelasi}} - {{wo.Schedule.lokasi}}</option>
          </select>
        </div>
        <div class="col-sm">
          <label for="volume">Mulai :</label>
          <div class="input-group">
            <input type="time" placeholder="No. TN" class="form-control" v-model="waktuMulai" />
          </div>
        </div>
        <div class="col-sm">
          <label for="volume">Selesai :</label>

          <input type="time" class="form-control" v-model="item.waktuSelesai" />
        </div>
        <div class="col-sm">
          <label for="so">No. TM</label>
          <input type="text" class="form-control" v-model="item.noTm" required />
        </div>
        <div class="col-sm">
          <label for="so">No. Tiket</label>
          <input type="text" class="form-control" v-model="item.noTiket" required />
        </div>
        <div class="col-sm">
          <label for="so">Volume</label>
          <input type="number" class="form-control" v-model="item.volume" required />
        </div>
        <div class="col-sm">
          <label for="so">So</label>
          <input type="number" class="form-control" v-model="item.so" />
        </div>
        <div class="col-sm">
          <label for="so">Shipment</label>
          <input type="number" class="form-control" v-model="item.shipment" />
        </div>
        <div class="col-sm">
          <label for="so">Bongkar</label>
          <input type="text" class="form-control" v-model="item.bongkar" required />
        </div>
        <div class="col-sm">
          <label for="so">Driver</label>
          <input type="text" class="form-control" v-model="item.driver" required />
        </div>
        <div class="col-sm">
          <label for="so">Cipping</label>
          <input type="number" class="form-control" v-model="item.cipping" />
        </div>
        <div class="col-sm">
          <label for="so">Cipping</label>
          <input type="number" class="form-control" v-model="item.cipping" />
        </div>
        <div class="col-sm">
          <label for="so">Split</label>
          <input type="number" class="form-control" v-model="item.split" />
        </div>
        <div class="col-sm">
          <label for="so">Pasir</label>
          <input type="number" class="form-control" v-model="item.pasir" />
        </div>
        <div class="col-sm">
          <label for="so">Semen</label>
          <input type="number" class="form-control" v-model="item.semen" />
        </div>
        <div class="col-sm">
          <label for="so">Addictive Cair</label>
          <input type="number" class="form-control" v-model="item.additiveCair" />
        </div>
      </div>
    </div>
    <!-- {{items}} -->
    <b-button class="mt-3 mr-3" variant="outline-primary" @click.prevent="addRow">Tambah Baris</b-button>
    <b-button class="mt-3" variant="outline-success" @click.prevent="addRow">Input Data</b-button>
  </div>
</template>

<script>
import axios from "../API/axios";
export default {
  name: "AddPage",
  data() {
    return {
      tanggal: "2022-01-01",
      items: [{}]
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
    }
  },
  created() {
    this.$store.dispatch("fetchRelasi");
    this.$store.dispatch("fetchSchedule");
    this.$store.dispatch("fetchRealisasiUser");
    this.$store.dispatch("getNomorWo");
  },
  methods: {
    addRow() {
      let lastData = this.items[this.items.length - 1];
      this.items.push({ ...lastData });
    },
    nomorWo() {
      let hasil = [];
      this.nomorWoUser?.map(el => {
        if (el.tanggal.slice(0, 10) == this.tanggal) {
          hasil.push(el);
        }
      });
      return hasil;
    }
  }
};
</script>

<style scoped>
.formRow {
  min-width: 2200px;
}
.addPage {
  width: 85vw;
  overflow-x: scroll;
  /* overflow-y: scroll; */
}
</style>
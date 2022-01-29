<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="filterData().data"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
    ></b-table>
    <!-- {{filterData()}} -->
  </div>
</template>

<script>
import axios from "../API/axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      name: "Schedule",
      perPage: 5,
      currentPage: 1,
      fields: [
        {
          key: "id",
          label: "ID"
        },
        {
          key: "tanggal",
          label: "Tanggal"
        }
      ]
    };
  },
  methods: {
    filterData() {
      let hasil = {
        data: [],
        total: 0,
        realisasi: 0,
        selisih: 0,
        persen: 0
      };
      if (!this.startDate || !this.endDate) {
        hasil.data = this.userSchedule;
      } else {
        this.userSchedule?.map(item => {
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
      hasil.selisih = +hasil.realisasi - +hasil.total;

      hasil.persen = Math.round((hasil.realisasi / hasil.total) * 10000) / 100;
      return hasil;
    },
    formatTanggal(data) {
      let hasil = "";
      var time = moment(data).format("DD-MM-YYYY h:mm:ss");
      hasil = time.slice(0, 10);
      return hasil;
    }
  },
  computed: {
    rows() {
      return this.items.length;
    },
    relasiUser() {
      return this.$store.state.relasiUser;
    },
    items() {
      return this.$store.state.itemUser;
    },
    userSchedule() {
      return this.$store.state.scheduleUser.rows;
    }
  },
  created() {
    this.$store.dispatch("fetchItemUser");
    this.$store.dispatch("fetchSchedule");
    this.$store.dispatch("fetchRelasi");
  }
};
</script>
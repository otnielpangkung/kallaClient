<template>
	<div class="Realisasi">
		<p class="mt-3" id="head">REKAPITULASI REALISASI</p>
		<!-- {{this.filterData()}} -->
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
						<option v-for="user in setUser()" :key="user.id" :value="user.id">{{
							user.namaCabang
						}}</option>
					</select>
				</div>
				<button
					id="download"
					class="btn"
					@click.prevent="tableHtmlToExcel('table')"
				>
					<i class="fa fa-download"></i> Download
				</button>
			</div>
		</div>

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
					<template #cell(tanggal)="row">{{
						formatTanggal(row.value)
					}}</template>
					<template #cell(pasir)="row">{{ getJumlah(row.value) }}</template>
					<template #cell(split)="row">{{ getJumlah(row.value) }}</template>
					<template #cell(cipping)="row">{{ getJumlah(row.value) }}</template>
					<template #cell(semen)="row">{{ getJumlah(row.value) }}</template>
					<template #cell(additiveCair)="row">{{
						getJumlah(row.value)
					}}</template>
				</b-table>
			</div>
		</div>
		<!-- {{ this.filterData() }} -->
	</div>
</template>

<script>
	import moment from 'moment';
	import axios from '../API/axios';
	import Swal from 'sweetalert2';

	export default {
		name: 'AllRealsiasi',
		data() {
			return {
				startDate: '',
				endDate: '',
				penm: [],
				totalData: 0,
				totalPage: 0,
				currentPage: 0,
				endDate: '',
				startDate: '',
				cabang: 0,
				perPage: 15,
				currentPage: 1,
				fields: [
					{
						key: 'NomorWo.namaWo',
						label: 'Nomor WO',
						class: 'text-center',
					},
					{
						key: 'so',
						label: 'SO',
						class: 'text-center',
					},
					{
						key: 'shipment',
						label: 'Shipment',
						class: 'text-center',
					},
					{
						key: 'tanggal',
						label: 'Tanggal',
						class: 'text-center',
					},
					{
						key: 'Relasi.namaRelasi',
						label: 'Relasi',
						class: 'text-center',
					},
					{
						key: 'Schedule.lokasi',
						label: 'Alamat',
						class: 'text-center',
					},
					{
						key: 'driver',
						label: 'TM/Driver',
						class: 'text-center',
					},
					{
						key: 'Item.namaItem',
						label: 'No. TM',
					},
					{
						key: 'Item.mutu',
						label: 'Mutu',
					},
					{
						key: 'bongkar',
						label: 'Mode Bongkar',
					},
					{
						key: 'volume',
						label: 'Volume',
						class: 'text-right',
					},
					{
						key: 'pasir',
						label: 'Pasir',
						class: 'text-right',
					},
					{
						key: 'cipping',
						label: 'Cipping',
						class: 'text-right',
					},
					{
						key: 'split',
						label: 'Split',
						class: 'text-right',
					},
					{
						key: 'semen',
						label: 'Semen',
						class: 'text-right',
					},
					{
						key: 'additiveCair',
						label: 'Additive Cair',
						class: 'text-right',
					},
					{
						key: 'waktuMulai',
						label: 'Mulai',
						class: 'text-center',
					},
					{
						key: 'waktuSelesai',
						label: 'Selesai',
						class: 'text-center',
					},
					{
						key: 'kendala',
						label: 'Kendala',
					},
				],
			};
		},
		computed: {
			allRealisasi() {
				return this.$store.state.realisasi.rows;
			},
			users() {
				return this.$store.state.users;
			},
		},
		created() {
			this.$store.dispatch('fetchRelasi');
			this.$store.dispatch('fetchSchedule');
			this.$store.dispatch('fetchRealisasiUser');
			this.$store.dispatch('getAllRealisasi');
			this.$store.dispatch('getAllUser');

			// this.filterData();
		},
		methods: {
			setUser() {
				let hasil = [];
				this.users?.map((item) => {
					if (item.role == 'staff') {
						hasil.push(item);
					}
				});
				return hasil;
			},
			getJumlah(data) {
				if (data == 'NaN') {
					data = 0;
				}
				return data;
			},
			formatTanggal(data) {
				let hasil = '';
				var time = moment(data).format('DD-MM-YYYY h:mm:ss');
				hasil = time.slice(0, 10);
				return hasil;
			},
			filterData() {
				let hasil = [];
				let penm = [];
				if (this.cabang == 0) {
					penm = this.allRealisasi;
				} else {
					this.allRealisasi?.map((data) => {
						if (data.UserId == this.cabang) {
							penm.push(data);
						}
					});
				}
				if (!this.startDate || !this.endDate) {
					hasil = penm;
				} else {
					penm?.map((item) => {
						let start = moment(this.startDate, 'YYYY/MM/DD') - 1;
						let end = moment(this.endDate, 'YYYY/MM/DD') + 1;
						let tanggalItem = moment(item.tanggal, 'YYYY/MM/DD');
						if (tanggalItem.isBetween(start, end) == true) {
							hasil.push(item);
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
				this.sheduleUser?.map((item) => {
					if (item.id == ScheduleId) {
						console.log(item.id, ScheduleId, '====');
						hasil = item.Item.id;
					}
				});
				return hasil;
			},
			scheduleUpdate() {
				let hasil = [];
				this.sheduleUser?.map((item) => {
					if (item.tanggal.slice(0, 10) == this.tanggal) {
						hasil.push(item);
					}
				});
				return hasil;
			},
			tableHtmlToExcel(tableID, filename = `Daftar Realisasi`) {
				// Download Transaksi
				var downloadLink;
				var dataType = 'application/vnd.ms-excel';
				var tableSelect = document.getElementById(tableID);
				var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

				filename = filename ? filename + '.xls' : 'excel_data.xls';

				downloadLink = document.createElement('a');

				document.body.appendChild(downloadLink);

				if (navigator.msSaveOrOpenBlob) {
					var blob = new Blob(['\ufeff', tableHTML], {
						type: dataType,
					});
					navigator.msSaveOrOpenBlob(blob, filename);
				} else {
					downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

					downloadLink.download = filename;

					downloadLink.click();
				}
			},
		},
	};
</script>

<style scoped>
	* {
		font-family: 'Roboto Condensed', sans-serif;
	}
	.Realisasi {
		width: 85vw;
	}

	button:hover {
		color: #038c3e;
		background-color: white;
	}
	#head {
		font-weight: 600;
		font-size: 40px;
		font-family: 'Roboto Condensed', sans-serif;
	}
	table {
		padding: 20px;
		min-width: 2800px;
		margin-bottom: 20px;
	}
	table tbody {
		text-align: right;
	}
	table thead {
		text-align: center;
	}
	td,
	th {
		padding: 5px 1px;
	}
	.tableView {
		margin-top: 10px;
		max-height: 800px;
		margin-bottom: 2px;
		width: 85vw;
		overflow-x: scroll;
		overflow-y: scroll;
	}

	#download {
		background-color: transparent;
		color: rgb(72, 66, 33);
	}
</style>

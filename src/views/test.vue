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
			<table class="table table-hover table-striped table-bordered" id="table">
				<thead>
					<tr>
						<th scope="col" rowspan="2">No. WO</th>
						<th scope="col" rowspan="2">Tanggal</th>
						<th scope="col" rowspan="2">Relasi</th>
						<th scope="col" rowspan="2">Cabang</th>
						<th scope="col" rowspan="2">Alamat</th>
						<th scope="col" rowspan="2">TM / Driver</th>
						<th scope="col" rowspan="2">No. TM</th>
						<th scope="col" rowspan="2">MUTU</th>
						<th scope="col" rowspan="2">VOLUME</th>
						<th scope="col" colspan="4">Pasir</th>
						<th scope="col" colspan="4">Chipping</th>
						<th scope="col" colspan="4">Split</th>
						<th scope="col" colspan="3">Semen</th>
						<th scope="col" colspan="3">Additive Cair</th>
					</tr>
					<tr>
						<th scope="col">Realisasi</th>
						<th scope="col">Standar</th>
						<th scope="col">(M3)</th>
						<th scope="col">Selisih</th>
						<th scope="col">Realisasi</th>
						<th scope="col">Standar</th>
						<th scope="col">(M3)</th>
						<th scope="col">Selisih</th>
						<th scope="col">Realisasi</th>
						<th scope="col">Standar</th>
						<th scope="col">(M3)</th>
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
					<tr v-for="data in this.filterData()" :key="data.id">
						<td>{{ data.NomorWo.namaWo }}</td>
						<td>{{ formatTanggal(data.tanggal) }}</td>
						<td>{{ data.Relasi.namaRelasi }}</td>
						<td>{{ data.User.namaCabang }}</td>
						<td>{{ data.Schedule.lokasi }}</td>
						<td>{{ data.driver }}</td>
						<td>{{ data.noTm }}</td>
						<td>{{ data.Item.mutu }} - {{ data.Item.namaItem }}</td>
						<td>{{ data.volume }}</td>
						<td>{{ data.pasir }}</td>
						<td>{{ data.Item.stdPasir }}</td>
						<td></td>
						<td>
							<i
								v-if="cekSelisih(data.pasir, data.Item.stdPasir)"
								class="fas fa-arrow-up"
							></i>
							<i
								v-if="!cekSelisih(data.pasir, data.Item.stdPasir)"
								class="fas fa-arrow-down"
							></i>
							{{ selisih(data.pasir, data.Item.stdPasir) }}
						</td>
						<td>{{ data.cipping }}</td>
						<td>{{ data.Item.stdCpping }}</td>
						<td></td>
						<td>
							<i
								v-if="cekSelisih(data.cipping, data.Item.stdCpping)"
								class="fas fa-arrow-up"
							></i>
							<i
								v-if="!cekSelisih(data.cipping, data.Item.stdCpping)"
								class="fas fa-arrow-down"
							></i>
							{{ selisih(data.cipping, data.Item.stdCpping) }}
						</td>
						<td>{{ data.split }}</td>
						<td>{{ data.Item.stdSplit }}</td>
						<td></td>
						<td>
							<i
								v-if="cekSelisih(data.pasir, data.Item.stdPasir)"
								class="fas fa-arrow-up"
							></i>
							<i
								v-if="!cekSelisih(data.pasir, data.Item.stdPasir)"
								class="fas fa-arrow-down"
							></i>
							{{ selisih(data.split, data.Item.stdSplit) }}
						</td>
						<td>{{ data.semen }}</td>
						<td>{{ data.Item.stdSemen }}</td>

						<td>
							<i
								v-if="cekSelisih(data.pasir, data.Item.stdPasir)"
								class="fas fa-arrow-up"
							></i>
							<i
								v-if="!cekSelisih(data.pasir, data.Item.stdPasir)"
								class="fas fa-arrow-down"
							></i>
							{{ selisih(data.semen, data.Item.stdSemen) }}
						</td>
						<td>{{ data.semen }}</td>
						<td>{{ data.Item.stdSemen }}</td>

						<td>
							<i
								v-if="cekSelisih(data.pasir, data.Item.stdPasir)"
								class="fas fa-arrow-up"
							></i>
							<i
								v-if="!cekSelisih(data.pasir, data.Item.stdPasir)"
								class="fas fa-arrow-down"
							></i>
							{{ selisih(data.semen, data.Item.stdSemen) }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- {{this.filterData()}} -->
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
			};
		},
		computed: {
			allRealisasi() {
				return this.$store.state.realisasi;
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
	@media screen and (max-width: 800px) {
		#head {
			font-weight: 500;
			font-size: 25px;
		}
		button {
			font-size: 12px;
		}
		.tableView {
			padding-right: 10px;
			max-height: 400px;
			margin-bottom: 2px;
			margin-right: 10px;
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
	}
</style>

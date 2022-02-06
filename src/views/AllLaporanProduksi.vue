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

		<div class="tableView mt-2">
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
								<b-th colspan="9"></b-th>
								<b-th colspan="4">Pasir</b-th>
								<b-th colspan="4">Cipping</b-th>
								<b-th colspan="4">Split</b-th>
								<b-th colspan="4">Semen</b-th>
							</b-tr>
						</template>
						<template #cell(so)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).so
						}}</template>
						<template #cell(shipment)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).shipment
						}}</template>
						<template #cell(cabang)="row">{{
							row.item.User.namaCabang
						}}</template>
						<template #cell(tanggal)="row">{{
							formatTanggal(row.value)
						}}</template>
						<template #cell(relasi)="row">{{
							row.item.Relasi.namaRelasi
						}}</template>
						<template #cell(alamat)="row">{{
							row.item.Schedule.lokasi
						}}</template>
						<template #cell(item)="row"
							>{{ row.item.Item.namaItem }} - {{ row.item.Item.mutu }}</template
						>
						<template #cell(volume)="row">
							<!-- {{row.item.Realisasis}} -->
							{{ getTotal(row.item.Realisasis, row.item.Item).volume }}
						</template>
						<!-- Pasir -->
						<template #cell(pasirReal)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).realPasir
						}}</template>
						<template #cell(pasirStd)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).stdPasir
						}}</template>
						<template #cell(pasirM3)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).m3Pasir
						}}</template>
						<template #cell(pasirSelisih)="row">
							<i
								v-if="
									cekSelisih1(
										getTotal(row.item.Realisasis, row.item.Item).selisihPasir
									).cek
								"
								class="fas fa-arrow-up"
							></i>
							<i
								v-if="
									!cekSelisih1(
										getTotal(row.item.Realisasis, row.item.Item).selisihPasir
									).cek
								"
								class="fas fa-arrow-down"
							></i>
							{{
								cekSelisih1(
									getTotal(row.item.Realisasis, row.item.Item).selisihPasir
								).nilai
							}}
						</template>
						<!-- Cipping -->
						<template #cell(cippingReal)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).realCipping
						}}</template>
						<template #cell(cippingStd)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).stdCipping
						}}</template>
						<template #cell(cippingM3)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).m3Cipping
						}}</template>
						<template #cell(cippingSelisih)="row">
							<i
								v-if="
									cekSelisih1(
										getTotal(row.item.Realisasis, row.item.Item).selisihCipping
									).cek
								"
								class="fas fa-arrow-up"
							></i>
							<i
								v-if="
									!cekSelisih1(
										getTotal(row.item.Realisasis, row.item.Item).selisihCipping
									).cek
								"
								class="fas fa-arrow-down"
							></i>
							{{
								cekSelisih1(
									getTotal(row.item.Realisasis, row.item.Item).selisihCipping
								).nilai
							}}
						</template>

						<template #cell(splitReal)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).realSplit
						}}</template>
						<template #cell(splitStd)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).stdSplit
						}}</template>
						<template #cell(splitM3)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).m3Split
						}}</template>
						<template #cell(splitSelisih)="row">
							<i
								v-if="
									!cekSelisih1(
										getTotal(row.item.Realisasis, row.item.Item).selisihSplit
									).cek
								"
								class="fas fa-arrow-down"
							></i>
							{{
								cekSelisih1(
									getTotal(row.item.Realisasis, row.item.Item).selisihSplit
								).nilai
							}}
						</template>
						<!-- Semen -->
						<template #cell(semenReal)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).realSemen
						}}</template>
						<template #cell(semenStd)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).stdSemen
						}}</template>
						<template #cell(semenM3)="row">{{
							getTotal(row.item.Realisasis, row.item.Item).m3Semen
						}}</template>
						<template #cell(semenSelisih)="row">
							<i
								v-if="
									cekSelisih1(
										getTotal(row.item.Realisasis, row.item.Item).selisihSemen
									).cek
								"
								class="fas fa-arrow-up"
							></i>
							<i
								v-if="
									!cekSelisih1(
										getTotal(row.item.Realisasis, row.item.Item).selisihSemen
									).cek
								"
								class="fas fa-arrow-down"
							></i>
							{{
								cekSelisih1(
									getTotal(row.item.Realisasis, row.item.Item).selisihSemen
								).nilai
							}}
						</template>
						<!-- action -->
					</b-table>
				</div>
			</div>
		</div>
		<!-- {{this.allNomorWo}}-- -->
		<!-- {{setUser()}} -->
	</div>
</template>

<script>
	import moment from 'moment';
	import axios from '../API/axios';
	import Swal from 'sweetalert2';

	export default {
		name: 'Realisasi',
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
				perPage: 20,
				currentPage: 1,
				fields: [
					{
						key: 'namaWo',
						label: 'Nomor Wo',
						class: 'text-center',
					},
					{
						key: 'so',
						label: 'SO',
						class: 'text-center',
					},
					{
						key: 'cabang',
						label: 'Cabang',
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
						key: 'Relasi',
						label: 'Relasi',
					},
					{
						key: 'Alamat',
						label: 'Alamat',
						class: 'text-left',
					},
					{
						key: 'item',
						label: 'Item Description',
						class: 'text-left',
					},
					{
						key: 'volume',
						label: 'Total Volume',
						class: 'text-right',
					},
					{
						key: 'pasirReal',
						label: 'Realisasi',
						class: 'text-right',
					},
					{
						key: 'pasirStd',
						label: 'Standar',
						class: 'text-right',
					},
					{
						key: 'pasirM3',
						label: 'M(3)',
						class: 'text-right',
					},
					{
						key: 'pasirSelisih',
						label: 'Selisih',
						class: 'text-right',
					},
					{
						key: 'cippingReal',
						label: 'Realisasi',
						class: 'text-right',
					},
					{
						key: 'cippingStd',
						label: 'Standar',
						class: 'text-right',
					},
					{
						key: 'cippingM3',
						label: 'M(3)',
						class: 'text-right',
					},
					{
						key: 'cippingSelisih',
						label: 'Selisih',
						class: 'text-right',
					},
					{
						key: 'splitReal',
						label: 'Realisasi',
						class: 'text-right',
					},
					{
						key: 'splitStd',
						label: 'Standar',
						class: 'text-right',
					},
					{
						key: 'splitM3',
						label: 'M(3)',
						class: 'text-right',
					},
					{
						key: 'splitSelisih',
						label: 'Selisih',
						class: 'text-right',
					},
					{
						key: 'semenReal',
						label: 'Realisasi',
						class: 'text-right',
					},
					{
						key: 'semenStd',
						label: 'Standar',
						class: 'text-right',
					},
					{
						key: 'semenM3',
						label: 'M(3)',
						class: 'text-right',
					},
					{
						key: 'semenSelisih',
						label: 'Selisih',
						class: 'text-right',
					},
				],
			};
		},
		computed: {
			allNomorWo() {
				return this.$store.state.allNomorWo.rows;
			},
			users() {
				return this.$store.state.users;
			},
		},
		created() {
			this.$store.dispatch('getAllNomorWo');
			this.$store.dispatch('getAllUser');
		},
		methods: {
			formatTanggal(data) {
				let hasil = '';
				var time = moment(data).format('DD-MM-YYYY h:mm:ss');
				hasil = time.slice(0, 10);
				return hasil;
			},
			formatUang(data) {
				// console.log(data, "dataa");
				let uang = '';
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
				this.users?.map((item) => {
					if (item.role == 'staff') {
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
					this.allNomorWo?.map((item) => {
						if (item.UserId == this.cabang) {
							penm.push(item);
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
					so: '',
					shipment: '',
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
					kendala: '',
					m3Pasir: 0,
					m3Cipping: 0,
					m3Split: 0,
				};
				data?.map((item) => {
					hasil.volume += +item.volume;
					hasil.realPasir += +item.pasir;
					hasil.realCipping += +item.cipping;
					hasil.realSplit += +item.split;
					hasil.realSemen += +item.semen;
					hasil.realAdd += +item.additiveCair;
					if (item.kendala) {
						hasil.kendala += item.kendala + ', ';
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

			cekSelisih1(data) {
				let hasil = {
					cek: true,
					nilai: 0,
				};
				if (data < 1) {
					hasil.nilai = data * -1;
					hasil.cek = false;
				} else {
					hasil.nilai = data;
				}
				return hasil;
			},

			confirmDelete(id) {
				Swal.fire({
					title: 'Yakin?',
					text: 'Yakin ki mau hapus?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Hapus!!',
				}).then((result) => {
					if (result.isConfirmed) {
						this.deleteWo(id);
						Swal.fire('Deleted!', 'Data Berhasil Dihapus', 'success');
						this.$store.dispatch('getNomorWo');
					}
				});
			},

			tableHtmlToExcel(tableID, filename = `Daftar Realisasi `) {
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
		font-family: 'Roboto Condensed', sans-serif;
	}
	table {
		min-width: 3000px;
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

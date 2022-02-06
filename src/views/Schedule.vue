<template>
	<div class="Schedule mt-2">
		<div id="headSchedule">Schedule</div>

		<b-col class="mb-2">
			<b-button
				class="mr-3"
				data-toggle="modal"
				data-target="#staticBackdrop"
				variant="outline-primary"
				>Tambah Relasi</b-button
			>

			<b-button variant="outline-primary" @click.prevent="showAdd"
				>Tambah Schedule</b-button
			>
		</b-col>
		<div class="tanggal">
			<div class="input-group col col-lg-7">
				<label class="my-1 mr-2" for="Username">Tanggal :</label>
				<input type="date" class="form-control mr-3" v-model="startDate" /> -
				<input type="date" class="form-control ml-3" v-model="endDate" />
				<button
					id="download"
					class="btn"
					@click.prevent="tableHtmlToExcel('table')"
				>
					<i class="fa fa-download"></i> Download
				</button>
			</div>
		</div>
		<div class="overflow-auto">
			<b-pagination
				:total-rows="filterData().data.length"
				v-model="currentPage"
				:per-page="perPage"
				aria-controls="my-table"
			></b-pagination>

			<div class="tableView">
				<b-table
					id="my-table"
					:items="filterData().data"
					:per-page="perPage"
					:current-page="currentPage"
					bordered
					:filter="filter"
					:fields="fields"
				>
					<template #cell(tanggal)="row">{{
						formatTanggal(row.value)
					}}</template>
					<template #cell(mulai)="row">{{
						getMulai(row.item.Realisasis)
					}}</template>
					<template #cell(selesai)="row">{{
						getSelesai(row.item.Realisasis)
					}}</template>
					<template #cell(volumeReal)="row">{{
						formatUang(volumeReal(row.item.Realisasis))
					}}</template>
					<template #cell(kendala)="row">{{
						getKendala(row.item.Realisasis)
					}}</template>
					<template #cell(selisih)="row">{{
						selisihVolume(row.item.volume, volumeReal(row.item.Realisasis))
					}}</template>
					<template #cell(action)="row">
						<a @click.prevent="clickEdit(row.item)">
							<i class="fas fa-edit" title="edit"></i>
						</a>
						<a @click.prevent="confirmDelete(row.item.id)">
							<i class="fas fa-trash"></i>
						</a>
					</template>
				</b-table>
			</div>
		</div>
		<div class="modal fade" id="modalForm" role="dialog">
			<div class="modal-dialog">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-body">
						<form @submit.prevent="isEdit ? editSchedule() : addSchedule()">
							<div class="titleSchedule row pl-3">SCHEDULE BARU</div>
							<div class="form-row">
								<div class="col-sm">
									<label class="my-1 mr-2" for="Username">Nama Relasi:</label>
									<div class="input-group">
										<select class="form-control" v-model="RelasiId" required>
											<option selected disabled>Pilih Relasi</option>
											<option
												v-for="relasi in this.relasiUser"
												:key="relasi.id"
												:value="relasi.id"
												>{{ relasi.namaRelasi }} - {{ relasi.type }}</option
											>
										</select>
									</div>
								</div>
								<div class="col-sm">
									<label class="my-1 mr-2" for="Username"
										>Lokasi Schedule:</label
									>
									<div class="input-group">
										<input type="text" class="form-control" v-model="lokasi" />
									</div>
								</div>
							</div>
							<div class="form-row">
								<div class="col-sm">
									<label class="my-1 mr-2" for="Username">Tanggal</label>
									<div class="input-group">
										<input type="date" class="form-control" v-model="tanggal" />
									</div>
								</div>
								<div class="col-sm">
									<label class="my-1 mr-2" for="Username">Waktu</label>
									<div class="input-group">
										<input type="time" class="form-control" v-model="waktu" />
									</div>
								</div>
							</div>
							<div class="form-row">
								<div class="col-sm">
									<label class="my-1 mr-2" for="Username">Volume</label>
									<div class="input-group">
										<input
											type="number"
											step="any"
											class="form-control"
											v-model="volume"
										/>
										<div class="input-group-append">
											<span class="input-group-text">M3</span>
										</div>
									</div>
								</div>
								<div class="col-sm">
									<label class="my-1 mr-2" for="Username">Mutu:</label>
									<div class="input-group">
										<select class="form-control" v-model="ItemId" required>
											<option selected disabled>Pilih Mutu</option>
											<option
												v-for="item in this.items"
												:key="item.id"
												:value="item.id"
												>{{ item.mutu }} - {{ item.namaItem }}</option
											>
										</select>
									</div>
								</div>
							</div>
							<button type="submit" class="btn">Tambahkan</button>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>

		<div
			class="modal fade"
			id="staticBackdrop"
			data-backdrop="static"
			data-keyboard="false"
			tabindex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="staticBackdropLabel">Tambah Relasi</h5>

						<button
							type="button"
							class="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body" id="relasiForm">
						<form @submit.prevent="addRelasi">
							<input
								type="text"
								v-model="namaRelasi"
								placeholder="Nama Relasi"
								class="form-control"
							/>
							<input
								type="text"
								v-model="alamat"
								placeholder="Alamat"
								class="form-control mt-2"
							/>
							<label class="my-1 mr-2" for="Username">Jenis Relasi:</label>
							<div class="input-group mb-2">
								<select class="form-control" v-model="type" required>
									<option selected disabled>Pilih Relasi</option>
									<option
										v-for="type in this.types"
										:key="type"
										:value="type"
										>{{ type }}</option
									>
								</select>
							</div>
							<button class="btn btn-secondary" type="submit">Tambahkan</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../API/axios';
	import Swal from 'sweetalert2';
	export default {
		data() {
			return {
				perPage: 20,
				currentPage: 1,
				RelasiId: '',
				type: '',
				lokasi: '',
				volume: '',
				tanggal: '',
				waktu: '',
				ItemId: '',
				namaRelasi: '',
				alamat: '',
				startDate: '',
				endDate: '',
				filter: null,
				id: 0,
				types: ['Retail', 'Proyek', 'Internal'],
				isEdit: false,
				fields: [
					{
						key: 'tanggal',
						label: 'Tanggal',
						class: 'text-center',
					},
					{
						key: 'Relasi.namaRelasi',
						label: 'Nama Relasi',
					},
					{
						key: 'lokasi',
						label: 'Alamat ',
					},
					{
						key: 'waktu',
						label: 'Jadwal',
					},
					{
						key: 'mulai',
						label: 'Waktu Mulai',
					},
					{
						key: 'selesai',
						label: 'Selesai',
					},
					{
						key: 'volume',
						label: 'Volume',
						class: 'text-right',
					},
					{
						key: 'volumeReal',
						label: 'Realisasi Volume',
						class: 'text-right',
					},
					{
						key: 'selisih',
						label: 'Selisih',
						class: 'text-right',
					},
					{
						key: 'getKendala',
						label: 'Kendala',
					},
					{
						key: 'action',
						label: 'Action',
					},
				],
			};
		},
		computed: {
			relasiUser() {
				return this.$store.state.relasiUser.rows;
			},
			items() {
				return this.$store.state.itemUser;
			},
			userSchedule() {
				return this.$store.state.scheduleUser.rows;
			},
		},
		created() {
			this.$store.dispatch('fetchItemUser');
			this.$store.dispatch('fetchSchedule');
			this.$store.dispatch('fetchRelasi');
		},
		methods: {
			clickEdit(item) {
				$('#modalForm').modal('show');
				this.RelasiId = item.RelasiId;
				this.lokasi = item.lokasi;
				this.volume = item.volume;
				this.waktu = item.waktu;
				this.ItemId = item.ItemId;
				this.isEdit = true;
				this.id = item.id;
			},
			showAdd() {
				$('#modalForm').modal('show');
				this.RelasiId = 0;
				this.lokasi = '';
				this.volume = 0;
				this.tanggal = '';
				this.waktu = '';
				this.ItemId = '';
				this.namaRelasi = '';
				this.alamat = '';
				this.id = 0;
				this.isEdit = false;
			},
			filterData() {
				let hasil = {
					data: [],
					total: 0,
					realisasi: 0,
					selisih: 0,
					persen: 0,
				};
				if (!this.startDate || !this.endDate) {
					hasil.data = this.userSchedule;
				} else {
					this.userSchedule?.map((item) => {
						let start = moment(this.startDate, 'YYYY/MM/DD') - 1;
						let end = moment(this.endDate, 'YYYY/MM/DD') + 1;
						let tanggalItem = moment(item.tanggal, 'YYYY/MM/DD');
						if (tanggalItem < end && tanggalItem > start) {
							hasil.data.push(item);
						}
					});
				}
				hasil.data?.map((item) => {
					hasil.total += +item.volume;
				});
				hasil.data?.map((item) => {
					item.Realisasis?.map((e) => {
						hasil.realisasi += +e.volume;
					});
				});
				hasil.selisih = +hasil.realisasi - +hasil.total;

				hasil.persen =
					Math.round((hasil.realisasi / hasil.total) * 10000) / 100;
				return hasil;
			},
			formatTanggal(data) {
				let hasil = '';
				var time = moment(data).format('DD-MM-YYYY h:mm:ss');
				hasil = time.slice(0, 10);
				return hasil;
			},
			formatUang(data) {
				let uang = data;
				return uang;
			},
			getMulai(data) {
				let hasil = '';
				if (data.length) {
					hasil = data[0].waktuMulai;
				}

				return hasil;
			},
			getSelesai(data) {
				let hasil = '';
				if (data.length) {
					hasil = data[data.length - 1].waktuSelesai;
				}
				return hasil;
			},
			volumeReal(data) {
				let hasil = 0;
				data?.map((item) => {
					hasil += +item.volume;
				});
				return hasil;
			},
			selisihVolume(std, real) {
				let hasil = 0;
				if (std > real) {
					hasil = std - real;
				} else if (real > std) {
					hasil = real - std;
				} else if ((real = std)) {
					hasil = real - std;
				}

				hasil = Math.ceil(hasil * 10000) / 10000;
				return hasil;
			},
			cekSelisih(std, real) {
				if (std > real) {
					return false;
				} else return true;
			},

			addRelasi() {
				return axios
					.post(
						'/database/relasi',
						{
							namaRelasi: this.namaRelasi,
							alamat: this.alamat,
							type: this.type,
						},
						{
							headers: {
								access_token: localStorage.getItem('access_token'),
							},
						}
					)
					.then((data) => {
						Swal.fire('Ok', 'Relasi Berhasil Ditambahkan', 'success');
						this.$store.dispatch('fetchRelasi');
						$('#staticBackdrop').modal('hide');
						this.$store.dispatch('fetchSchedule');
					})
					.catch((err) => {
						Swal.fire('Maaf', 'Periksa Kembali Data Anda', 'error');
						console.log(err);
					});
			},
			tanggalSlice(data) {
				let hasil = '';
				hasil = data.slice(0, 15);
				return hasil;
			},
			addSchedule() {
				return axios
					.post(
						'/database/schedule',
						{
							RelasiId: this.RelasiId,
							lokasi: this.lokasi,
							volume: this.volume,
							tanggal: this.tanggal,
							waktu: this.waktu,
							ItemId: this.ItemId,
						},
						{
							headers: {
								access_token: localStorage.getItem('access_token'),
							},
						}
					)
					.then((data) => {
						Swal.fire('Ok', 'Schedule Baru telah ditambahkan', 'success');
						this.$store.dispatch('fetchSchedule');
						this.RelasiId = '';
						this.lokasi = '';
						this.volume = '';
						this.waktu = '';
						this.ItemId = '';
						this.isEdit = false;
						this.id = 0;
						$('#modalForm').modal('hide');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
					})
					.catch((err) => {
						Swal.fire('Maaf', 'Periksa Kembali Data Anda', 'error');
						console.log(err);
					});
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
						this.$store.dispatch('fetchSchedule');
						this.deleteSchedule(id);
						Swal.fire('Deleted!', 'Data Berhasil Dihapus', 'success');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
					}
				});
			},
			editSchedule() {
				return axios
					.put(
						`/database/schedule/${this.id}`,
						{
							RelasiId: this.RelasiId,
							lokasi: this.lokasi,
							volume: this.volume,
							tanggal: this.tanggal,
							waktu: this.waktu,
							ItemId: this.ItemId,
						},
						{
							headers: {
								access_token: localStorage.getItem('access_token'),
							},
						}
					)
					.then((data) => {
						Swal.fire('Ok', 'Schedule telah diedit', 'success');
						this.$store.dispatch('fetchSchedule');
						this.RelasiId = '';
						this.lokasi = '';
						this.volume = '';
						this.waktu = '';
						this.ItemId = '';
						this.isEdit = false;
						this.id = 0;
						this.$store.dispatch('fetchSchedule');
						$('#modalForm').modal('hide');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
					})
					.catch((err) => {
						Swal.fire('Maaf', 'Periksa Kembali Data Anda', 'error');
						console.log(err);
					});
			},
			deleteSchedule(id) {
				return axios
					.delete(`/database/schedule/${id}`, {
						headers: {
							access_token: localStorage.getItem('access_token'),
						},
					})
					.then((data) => {
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
						this.$store.dispatch('fetchSchedule');
					});
			},
			getKendala(data) {
				let hasil = '';
				data?.map((item) => {
					if (item.kendala) {
						hasil += `${item.kendala} , `;
					}
				});
				return hasil;
			},
			tableHtmlToExcel(tableID, filename = `Daftar Schedule`) {
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
	button {
		margin-bottom: 5px;
		margin-top: 5px;
		background-color: #038c3e;
		color: antiquewhite;
	}
	button:hover {
		color: #038c3e;
		background-color: white;
	}

	* {
		font-family: 'Roboto Condensed', sans-serif;
	}
	#headSchedule {
		font-weight: 600;
		font-size: 40px;
		font-family: 'Roboto Condensed', sans-serif;
		/* background-color: springgreen; */
	}
	table {
		min-width: 1800px;
	}
	.tableView {
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
	.tanggal {
		justify-content: center;
		display: flex;
		flex-direction: row;
		margin-bottom: 2mm;
		margin-top: 2mm;
	}
</style>

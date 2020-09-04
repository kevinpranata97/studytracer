<template>
<div class="row">
  <div class="col-md-12 col-xs-12">
    <q-table
      title="Perusahaan"
      ref="table"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
      :table-style="$q.platform.is.mobile ? 'max-width: 300px':'max-width: 1100px'"
    >
    <template v-slot:top-left>
      <div class="text-blue-grey-14 text-h5 mobile-only">Data Perusahaan</div>
      <div class="row inline">
        <q-btn @click="refresh" color="secondary" flat round class="q-mb-md" icon="refresh" />
        <q-btn @click="adddata()" color="secondary" flat round class="q-mb-md" icon="add"/>
          <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <div class="text-white text-caption">Add Perusahaan</div>
          </q-tooltip>
      </div>
            <div class="text-blue-grey-14 text-h5 desktop-only">Data Perusahaan</div>
          </template>
          <template v-slot:top-right>
            <q-input  dense outlined rounded debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id_perusahaan" :props="props">{{ props.row.id_perusahaan }}</q-td>
              <q-td key="nama" :props="props">{{ props.row.nama }}</q-td>
              <q-td key="pemilik" :props="props">{{ props.row.pemilik }}</q-td>
              <q-td key="provinsi" :props="props">{{ props.row.provinsi }}</q-td>
              <q-td key="email" :props="props">{{ props.row.email }}</q-td>
              <q-td key="alamat" :props="props">{{ props.row.alamat }}</q-td>
              <q-td key="kota" :props="props">{{ props.row.kota }}</q-td>
              <q-td key="web" :props="props">{{ props.row.web }}</q-td>
              <q-td key="contact" :props="props">{{ props.row.contact }}</q-td>
              <q-td key="logo" :props="props">
                <q-img :src= link+props.row.logo style="height:100px; width:160px">
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-white text-black">No Image</div>
                  </template>
                </q-img>
              </q-td>
              <q-td key="action" :props="props" align="around">
                <q-btn round color="secondary" @click="kuistampil(props.row.id_perusahaan)"  icon="info" class="q-mr-xs">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Check Kuisioner</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round color="secondary" @click="edit(props.row.id_perusahaan)"  icon="edit" class="q-mr-xs">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Update Data Alumni</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round color="negative" @click="hapus(props.row.id_perusahaan)" icon="close">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Delete Data Alumni</div>
                  </q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
  </div>
      <q-dialog v-model="action" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6">{{ editdata ? 'Edit Data' : 'Add data' }}</div>
            <q-space/>
            <q-btn icon="close" flat round dense @click="closedialog()"/>
          </q-card-section>

          <q-separator/>
          <q-form @submit="onSubmit">
            <q-card-section class="scroll">
              <q-input dense :readonly="editdata" filled maxlength="8" v-model="form.id_perusahaan" label="Id"></q-input>
              <q-input dense filled maxlength="40" v-model="form.nama" label="Nama" v-if="editdata === true"></q-input>
              <q-input dense filled maxlength="40" v-model="form.pemilik" label="Pemilik" v-if="editdata === true"></q-input>
              <q-input dense filled maxlength="30" v-model="form.provinsi" label="Provinsi" v-if="editdata === true"></q-input>
              <q-input dense filled maxlength="25" v-model="form.kota" label="Kota" v-if="editdata === true"></q-input>
              <q-input v-model="form.email" label="Email :" v-if="editdata === true">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <div class="text-h8 text-grey-8" v-if="editdata===true">Profile Picture :</div>
              <q-input @change="selectFoto()" type="file" ref="logo" class="q-pb-md" v-if="editdata===true"></q-input>
              <q-input dense filled v-model="form.alamat" label="Alamat" v-if="editdata === true"></q-input>
              <q-input dense filled v-model="form.web" label="Web" v-if="editdata === true"></q-input>
              <q-input dense mask="############" filled maxlength="12" v-model="form.contact" label="Kontak" v-if="editdata === true"></q-input>
              <q-card-actions align="right">
                <q-btn type="submit" label="Save" rounded class="bg-secondary text-white q-mt-md"/>
                <q-btn label="Cancel" @click="closedialog()" rounded class="bg-secondary text-white q-mt-md" />
              </q-card-actions>
              </q-card-section>
          </q-form>
        </q-card>
      </q-dialog>
      <q-dialog v-model="kuisioner" persistent>
        <q-card>
          <q-card-section class="row item-center">
            <div class="text-h4">Kuisioner</div>
            <q-space/>
            <q-btn icon="close" flat round dense @click="closedialog1()"/>
          </q-card-section>
          <q-separator/>
          <q-form>
            <q-card-section>
              <q-table
              title="Kuisioner"
              ref="table2"
              separator="none"
              :data="data2"
              :columns="columns2"
              row-key="no"/>
              <q-card-actions align="center">
                <q-btn class="bg-secondary text-white" label="Ubah Kuisioner" icon="edit" to="editkuis"/>
                <q-btn class="bg-secondary text-white" label="Cek Semua Kuisioner" icon="info" to="grafik"/>
              </q-card-actions>
            </q-card-section>
          </q-form>
        </q-card>
      </q-dialog>
</div>
</template>

<script>
import skala15 from '../../statics/api/skala1-5'
export default {
  data () {
    return {
      kuisioner: false,
      page: 1,
      link: 'http://localhost:3000/',
      logo: '',
      datacount: '',
      editdata: false,
      action: false,
      confirm: false,
      filter: '',
      drawer: true,
      loading: true,
      keahlians: skala15,
      b_inggriss: skala15,
      integritass: skala15,
      komunkasis: skala15,
      kerjasamas: skala15,
      penguasaan_diris: skala15,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      data: [],
      data2: [],
      original: [],
      ttl: '',
      form: {
        id_perusahaan: '',
        nama: '',
        pemilik: '',
        provinsi: '',
        email: '',
        alamat: '',
        kota: '',
        web: '',
        contact: ''
      },
      columns: [
        {
          name: 'id_perusahaan',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id_perusahaan',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'nama', align: 'Left', label: 'Nama', field: 'nama' },
        { name: 'pemilik', align: 'Left', label: 'Pemilik', field: 'pemilik' },
        { name: 'provinsi', align: 'Left', label: 'Provinsi', field: 'provinsi' },
        { name: 'email', align: 'Left', label: 'Email', field: 'email' },
        { name: 'alamat', align: 'Left', label: 'Alamat', field: 'alamat' },
        { name: 'kota', align: 'Left', label: 'Kota', field: 'kota' },
        { name: 'web', align: 'Left', label: 'Web', field: 'web' },
        { name: 'contact', align: 'Left', label: 'Kontak', field: 'contact' },
        { name: 'logo', align: 'Left', label: 'Logo', field: 'logo' },
        { name: 'action', align: 'Left', label: 'Action', field: 'action' }
      ],
      columns2: [
        { name: 'no', label: 'No', field: 'no' },
        { name: 'text', label: 'Pertanyaan', field: 'text', align: 'Left', sortable: true },
        { name: 'value', label: 'jawaban', field: 'value', align: 'Left' }
      ]
    }
  },
  mounted () {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  async created () {
    const b = localStorage.getItem('dataadmin')
    try {
      this.$axios.get('/admin/viewalldataperusahaan', { headers: {
        'x-access-token': b
      } })
        .then(res => {
          this.original = res.data.results.data
          if (res.data.results.status === true) {
            console.log('kosong')
            // data is available and empty
          } else {
            this.loading = true
            this.$q.notify({
              color: 'negative',
              message: 'Fetching data Failed',
              icon: 'ion-closed'
            })
            console.log('this.data')
          }
        }).catch(e => {
          console.log('ada')
        })
    } catch (error) {
      console.log()
    }
  },
  methods: {
    closedialog1 () {
      this.kuisioner = false
    },
    kuistampil (id) {
      this.kuisioner = true
      this.$axios.get('/admin//selectonekuisionerperusahaan?id_perusahaan=' + id)
        .then(res => {
          var data1 = res.data.results.data
          this.data2 = data1
        }).catch(e => {
          console.log(e)
        })
    },
    closedialog () {
      this.refresh()
      this.action = false
      this.loading = false
      this.form.npm = ''
      this.form.nama = ''
      this.form.email = ''
      this.form.jurusan = ''
      this.form.tempatlahir = ''
      this.form.tanggallahir = ''
      this.form.alamat = ''
      this.form.tahunlulus = ''
      this.form.judulta = ''
      this.form.ipk = ''
      this.form.pekerjaan = ''
      this.form.nohp = ''
    },
    hapus (id) {
      this.$q
        .dialog({
          title: 'Confirm Delete',
          message: 'Hapus User:' + id + '?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          const b = localStorage.getItem('dataadmin')
          this.$q.loading.show()
          try {
            this.$axios.post('/admin/deleteperusahaan?id=' + id, {
              id_perusahaan: id
            }, {
              headers: {
                'x-access-token': b
              }
            })
              .then(res1 => {
                this.$q.loading.hide()
                if (res1) {
                  this.$q.notify({
                    color: 'positive',
                    message: 'Data has been Deleted',
                    icon: 'checkmark'
                  })
                  console.log(res1)
                  this.refresh()
                } else {
                  this.$q.notify({
                    color: 'negative',
                    message: 'Data has been deleted',
                    icon: 'closed'
                  })
                }
              })
          } catch (error) {
            console.log(error)
          }
        })
    },
    adddata () {
      this.loading = true
      this.editdata = false
      this.action = true
    },
    edit (id) {
      this.loading = true
      this.editdata = true
      this.action = true
      console.log('idnya ' + id)
      this.$axios.get('/perusahaan/selectone?id=' + id)
        .then(res => {
          var data1 = res.data.results.data[0]
          console.log('Ini data' + id)
          this.form.id_perusahaan = data1.id_perusahaan
          this.form.nama = data1.nama
          this.form.pemilik = data1.pemilik
          this.form.provinsi = data1.provinsi
          this.form.email = data1.email
          this.form.alamat = data1.alamat
          this.form.kota = data1.kota
          this.form.web = data1.web
          this.form.contact = data1.contact
          this.form.logo = data1.logo
        }).catch(e => {
          console.log(e)
        })
    },
    onSubmit () {
      this.action = false
      this.loading = true
      if (this.editdata === true) {
        const b = localStorage.getItem('dataadmin')
        if (this.logo === '') {
          console.log('a')
          this.$axios.post('/admin/editdataperusahaannologo?id_perusahaan=' + this.form.id_perusahaan, this.form, {
            headers: {
              'x-access-token': b
            }
          })
            .then(res => {
              this.loading = false
              this.$q.notify({
                message: res.data.results.msg,
                color: 'positive',
                icon: 'ion-positive'
              })
              this.refresh()
            })
            .catch(e => {
              this.$q.notify({
                message: 'Edit Data failed',
                color: 'negative',
                icon: 'ion-closed'
              })
              console.log(e)
            })
        } else {
          const formData = new FormData()
          formData.append('id_perusahaan', this.form.id_perusahaan)
          formData.append('nama', this.form.nama)
          formData.append('pemilik', this.form.pemilik)
          formData.append('provinsi', this.form.provinsi)
          formData.append('email', this.form.email)
          formData.append('alamat', this.form.alamat)
          formData.append('kota', this.form.kota)
          formData.append('web', this.form.web)
          formData.append('contact', this.form.contact)
          formData.append('logo', this.picture1, this.form.id_perusahaan + '.PNG')
          this.$axios.post('/admin/editdataperusahaan?id_perusahaan=' + this.form.id_perusahaan, formData, {
            headers: {
              'x-access-token': b
            }
          })
            .then(res => {
              this.loading = false
              this.$q.notify({
                message: res.data.results.msg,
                color: 'positive',
                icon: 'ion-positive'
              })
              this.refresh()
              console.log(res.data)
            }).catch(e => {
              this.$q.notify({
                message: 'Edit data Failed',
                color: 'negative',
                icon: 'ion-closed'
              })
            })
        }
      } else {
        try {
          const b = localStorage.getItem('dataadmin')
          this.$axios.post('/admin/inputdataperusahaan', this.form, {
            headers: {
              'x-access-token': b
            }
          })
            .then(res => {
              this.$q.notify({
                message: 'Data has been added',
                color: 'positive',
                icon: 'checkmark'
              })
              this.loading = false
              this.refresh()
              this.closedialog()
              console.log(res.data)
            }).catch(e => {
              this.$q.notify({
                message: 'Edit Data failed',
                color: 'negative',
                icon: 'ion-closed'
              })
              console.log(e)
            })
        } catch (error) {
          console.log(error)
        }
      }
    },
    async refresh () {
      this.loading = true
      this.filter = ''
      const b = localStorage.getItem('dataadmin')
      try {
        this.$axios.get('/admin/viewalldataperusahaan', { headers: {
          'x-access-token': b
        } })
          .then(res => {
            this.original = res.data.results.data
            if (res.data.results.status === true) {
              this.action = false
              this.loading = false
              this.onRequest({
                pagination: this.pagination,
                filter: undefined
              })
              console.log('kosong')
              // data is available and empty
            } else {
              this.loading = false
              this.$q.notify({
                color: 'negative',
                message: 'Fetching data Failed',
                icon: 'ion-closed'
              })
              console.log('this.data')
            }
          }).catch(e => {
            console.log('ada')
          })
      } catch (error) {
        console.log()
      }
    },
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      let filter = props.filter
      this.loading = true
      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)
        // get all rows if "All" (0) is selected
        let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage
        // calculate starting row of data
        let startRow = (page - 1) * rowsPerPage
        // fetch data from "server"
        let returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)
        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)
        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        // ...and turn of loading indicator
        this.loading = false
      }, 1000)
    },
    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer (startRow, count, filter, sortBy, descending) {
      const data = filter
        ? this.original.filter(row => row.id_perusahaan.includes(filter) || row.nama.includes(filter))
        : this.original.slice()

      // handle sortBy
      if (sortBy) {
        const sortFn = sortBy === 'desc'
          ? (descending
            ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
            : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
          )
          : (descending
            ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
            : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
          )
        data.sort(sortFn)
      }

      return data.slice(startRow, startRow + count)
    },
    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        if (treat['id_perusahaan'].includes(filter)) {
          ++count
        }
      })
      return count
    },
    ck () {
      this.$refs.form.tanggallahir.show()
    },
    selectFoto (foto) {
      this.logo = this.$refs.logo.$refs.input.files[0]
      console.log(this.logo)
    }
  }
}
</script>
<style scoped>

</style>

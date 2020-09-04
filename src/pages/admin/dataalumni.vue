<template>
<q-page padding>
<div class="row">
  <div class="col-md-12 col-xs-12">
    <q-table
      title="Alumni"
      ref="table"
      :data="dataalumni"
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
          <div class="text-blue-grey-14 text-h5 mobile-only">Data User</div>
            <div class="row inline">
      <q-btn @click="refresh" color="secondary" flat round class="q-mb-md" icon="refresh" />
        <q-btn @click="adddata()" color="secondary" flat round class="q-mb-md" icon="group_add"/>
          <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <div class="text-white text-caption">Add Data Alumni</div>
          </q-tooltip>
      </div>
      <div class="text-blue-grey-14 text-h5 desktop-only">Data User</div>
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
              <q-td key="npm" :props="props">{{ props.row.npm }}</q-td>
              <q-td key="picture" :props="props">
                <q-img :src= link+props.row.picture style="height:100px; width:160px">
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-white text-black">No Image</div>
                  </template>
                </q-img>
              </q-td>
              <q-td key="nama" :props="props">{{ props.row.nama }}</q-td>
              <q-td key="tanggal_lulus" :props="props">{{ props.row.tanggal_lulus }}</q-td>
              <q-td key="ipk" :props="props">{{ props.row.ipk }}</q-td>
              <q-td key="jurusan" :props="props">{{ props.row.jurusan }}</q-td>
              <q-td key="keterangan" :props="props">{{ props.row.keterangan }}</q-td>
              <q-td key="action" :props="props" align="around">
                <q-btn round color="secondary" @click="kuistampil(props.row.npm)"  icon="info" class="q-mr-xs">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Cek Kuisioner</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round color="secondary" @click="edit(props.row.npm, props.row.jurusan)"  icon="edit" class="q-mr-xs">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Update Data Alumni</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round color="negative" @click="hapus(props.row.npm)" icon="close">
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
              <q-input borderless :readonly="editdata" dense filled maxlength="8" v-model="form.npm" label="NPM" :rules="[ val => val.length >= 8 || 'Please Insert NPM Correctly' ]"></q-input>
              <q-input dense filled maxlength="50" v-model="form.nama" label="Nama" v-if="editdata === true"></q-input>
              <q-input mask="date" :rules="['date']" dense filled v-model="form.tanggal_lulus" label="Tanggal Lulus" @click="ck()" v-if="editdata === true" readonly>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qdateproxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.tanggal_lulus" @input="() => $refs.qdateproxy.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input mask="#.##"  fill-mask="0" dense filled v-model="form.ipk" label="IPK" :rules="[val => val < 4.01 || 'Please insert IPK correctly']" lazy-rules v-if="editdata === true"></q-input>
              <q-input dense filled maxlength="20" v-model="form.keterangan" label="Keterangan" v-if="editdata === true"></q-input>
              <q-select
                v-model="form.jurusan"
                :options="jurusans"
                label="Jurusan"/>
                <div class="text-h8 text-grey-8" v-if="editdata===true">Profile Picture :</div>
              <q-input @change="selectFoto()" type="file" ref="picture1" class="q-pb-md" v-if="editdata===true"></q-input>
                <q-space/>
              <q-toggle v-model="riwayat" label="Cek Riwayat?" v-if="editdata === true"/>
                <div class="col">
              <div class="row" v-if="riwayat === true && editdata ? true : false">
              <q-table
              title="Riwayat"
              ref="table1"
              grid
              :data="data1"
              :columns="columns2"
              row-key="id"
              >
        </q-table>
              </div>
              </div>
              <q-card-actions align="right">
                <q-btn type="submit" label="Save" rounded class="bg-secondary text-white q-mt-md" :loading="load1" @click="simulateProgress"/>
                <q-btn label="Cancel" @click="closedialog()" rounded class="bg-secondary text-white q-mt-md" />
              </q-card-actions>
              </q-card-section>
          </q-form>
        </q-card>
      </q-dialog>
      <q-dialog v-model="kuisioner" persistent>
        <q-card>
          <q-card-section class="row item-center">
            <div class="text-h4">Kuisioner </div><div class="text-h6 text-secondary">  {{ kuis.npm }}</div>
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
</q-page>
</template>

<script>
import jurusan1 from '../../statics/api/jurusan'
export default {
  data () {
    return {
      kuis: {
        npm: ''
      },
      search: '',
      link: 'http://localhost:3000/',
      kuisioner: false,
      riwayat: false,
      load1: false,
      editon: true,
      datacount: '',
      editdata: false,
      action: false,
      confirm: false,
      filter: '',
      drawer: false,
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      picture1: '',
      dataalumni: [],
      data1: [],
      data2: [],
      original: [],
      jurusans: jurusan1,
      date: '',
      form: {
        npm: '',
        nama: '',
        jenis_kelanmin: '',
        tempatlahir: '',
        jurusan: '',
        tanggal_lulus: '',
        ipk: '',
        keterangan: ''
      },
      columns: [
        {
          name: 'npm',
          required: true,
          label: 'NPM',
          align: 'left',
          field: 'npm',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'picture', label: 'Image', field: 'picture', align: 'Left' },
        { name: 'nama', label: 'Nama', field: 'nama', align: 'Left', sortable: true },
        { name: 'tanggal_lulus', label: 'Tanggal Lulus', field: 'tanggal_lulus', align: 'Left', sortable: true },
        { name: 'ipk', label: 'IPK', field: 'ipk', align: 'Left' },
        { name: 'jurusan', label: 'Jurusan', field: 'jurusan', align: 'Left' },
        { name: 'keterangan', label: 'Keterangan', field: 'keterangan', align: 'Left' },
        { name: 'action', label: 'Action', field: 'action', align: 'Left' }
      ],
      columns1: [
        { name: 'mulai', label: 'Mulai', field: 'mulai' },
        { name: 'sampai', label: 'Sampai', field: 'sampai', sortable: true },
        { name: 'posisi', label: 'Posisi', field: 'posisi' },
        { name: 'perusahaan', label: 'Perusahaan', field: 'perusahaan' }
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
    return new Promise(async (resolve, reject) => {
      try {
        var data = await this.$axios.get('/admin/viewalldataalumni', { headers: {
          'x-access-token': b
        } })
        resolve(this.original = data.data.results.data)
        // 0 -> unverf - 1 -> verf
      } catch (error) {
        reject(error)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    kuistampil (npm) {
      this.kuisioner = true
      this.$axios.get('/admin/selectonekuisioneralumni?npm=' + npm)
        .then(res => {
          const data1 = res.data.results.data
          this.data2 = data1
          this.kuis.npm = npm
        }).catch(e => {
          console.log(e)
        })
    },
    closedialog1 () {
      this.kuisioner = false
    },
    closedialog () {
      this.riwayat = false
      this.action = false
      this.loading = false
      this.form.npm = ''
      this.form.nama = ''
      this.form.jurusan = ''
      this.form.tanggal_lulus = ''
      this.form.keterangan = ''
      this.form.ipk = ''
    },
    async hapus (npm) {
      var token1 = this.$q.localStorage.getItem('dataadmin')
      this.$q
        .dialog({
          title: 'Confirm Delete',
          message: 'Delete User:' + npm + '? If you delete the data, you will delete all of User:' + npm + ' record',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show()
          const b = localStorage.getItem('dataadmin')
          try {
            this.$axios.post('/admin/deletealumni?npm=' + npm, {
              id: npm
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
                  this.refresh()
                  console.log(token1)
                  console.log(res1)
                } else {
                  this.$q.notify({
                    color: 'negative',
                    message: 'Data Delete Failed',
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
    edit (npm, jurusan) {
      console.log('jurusan ' + jurusan)
      this.loading = true
      this.editdata = true
      this.action = true
      console.log('npmnya ' + npm)
      this.form.npm1 = npm
      this.$axios.get('/alumni/selectone?npm=' + npm)
        .then(res => {
          var data1 = res.data.results.data[0]
          this.form = data1
        }).catch(e => {
          console.log(e)
        })
      this.$axios.get('/alumni/selectriwayat?npm=' + npm)
        .then(res => {
          this.data1 = res.data.results.data
          console.log('axe')
        }).catch(e => {
          console.log(e)
        })
    },
    async onSubmit () {
      if (this.editdata === true) {
        if (this.picture1 === '') {
          try {
            const b = localStorage.getItem('dataadmin')
            this.$axios.post('/admin/editdataalumni?npm=' + this.form.npm, this.form, {
              headers: {
                'x-access-token': b
              }
            })
              .then(res => {
                this.$q.notify({
                  message: 'Data has been editted',
                  color: 'positive',
                  icon: 'checkmark'
                })
                this.loading = false
                this.closedialog()
                this.action = false
                this.refresh()
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
        } else {
          const b = localStorage.getItem('dataadmin')
          const formdata = new FormData()
          formdata.append('picture', this.picture1, this.form.nama + '.PNG')
          formdata.append('npm', this.form.npm)
          formdata.append('nama', this.form.nama)
          formdata.append('tanggal_lulus', this.form.tanggal_lulus)
          formdata.append('keterangan', this.form.keterangan)
          formdata.append('ipk', this.form.ipk)
          formdata.append('jurusan', this.form.jurusan)
          this.$axios.post('/admin/editalumnipic?npm=' + this.form.npm, formdata, {
            headers: {
              'x-access-token': b
            }
          }).then(res => {
            if (res.data.results.status === false) {
              this.$q.notify({
                message: res.data.results.msg,
                color: 'negative',
                icon: 'closed'
              })
            } else {
              this.$q.notify({
                message: res.data.results.msg,
                color: 'positive',
                icon: 'checkmark'
              })
              this.loading = false
              this.refresh()
              this.closedialog()
            }
          })
        }
      } else {
        if (this.form.jurusan === '') {
          this.$q.notify({
            message: 'Please Fill Jurusan',
            color: 'negative',
            icon: 'closed'
          })
        } else {
          const b = localStorage.getItem('dataadmin')
          try {
            this.$axios.post('/admin/inputdataalumni', this.form, {
              headers: {
                'x-access-token': b
              }
            }).then(res => {
              if (res.data.results.status === false) {
                console.log('wow')
                this.$q.notify({
                  message: 'Insert Failed',
                  color: 'negative',
                  icon: 'closed'
                })
              } else {
                this.$q.notify({
                  message: 'Add data Success',
                  color: 'positive',
                  icon: 'checkmark'
                })
                this.loading = false
                this.closedialog()
                this.refresh()
                console.log('haha')
              }
            }).catch(e => {
              this.$q.notify({
                message: 'Add data failed',
                color: 'negative',
                icon: 'ion-closed'
              })
              console.log(e)
            })
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    async refresh () {
      const b = localStorage.getItem('dataadmin')
      this.loading = true
      return new Promise(async (resolve, reject) => {
        try {
          var data = await this.$axios.get('/admin/viewalldataalumni', {
            headers: {
              'x-access-token': b
            }
          })
          resolve(this.original = data.data.results.data)
          this.loading = false
          // this.original = this.dataalumni
          this.onRequest({
            pagination: this.pagination,
            filter: undefined
          })
          // 0 -> unverf - 1 -> verf
        } catch (error) {
          reject(error)
        }
      }).catch(err => {
        console.log(err)
      })
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
        this.dataalumni.splice(0, this.dataalumni.length, ...returnedData)
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
        ? this.original.filter(row => row.npm.includes(filter) || row.jurusan.includes(filter))
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
        if (treat['npm'].includes(filter) || treat['jurusan'].includes(filter)) {
          ++count
        }
      })
      return count
    },
    ck () {
      this.$refs.form.tanggal_lulus.show()
    },
    simulateProgress () {
      this.load1 = true
      setTimeout(() => {
        // we're done, we reset loading state
        this.load1 = false
      }, 3000)
    },
    selectFoto (foto) {
      this.picture1 = this.$refs.picture1.$refs.input.files[0]
      console.log(this.picture1)
    }
  }
}
</script>
<style scoped>

</style>

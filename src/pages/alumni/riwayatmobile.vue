<template>
  <q-page padding>
      <div class="row">
              <div class="q-mt-md text-left text-h6">
               <q-table
                class="text-teal"
                borderless
                title="Riwayat"
                ref="table"
                grid
                :pagination.sync="pagination"
                :loading="loading"
                :filter="filter"
                @request="onRequest"
                binary-state-sort
                :data="data1"
                :columns="columns1"
                row-key="id"
                >
                    <template v-slot:top-right>
                        <div class="row inline">
                            <q-btn @click="addriwayat()" color="secondary" flat round class="q-mb-md" icon="add"/>
                                <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                    <div class="text-white text-caption">Add Riwayat</div>
                                </q-tooltip>
                        </div>
                    </template>
                    <template v-slot:item="props">
                        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
                            <q-card>
                            <q-list dense>
                                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                                <q-item-section>
                                    <q-item-label class="text-h8 text-black">{{ col.label }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-item-label caption>{{ col.value }}</q-item-label>
                                </q-item-section>
                                </q-item>
                                <q-card-actions>
                                <q-btn color="secondary" @click="edit(props.row.id_riwayat, props.row.mulai, props.row.sampai, props.row.perusahaan, props.row.posisi)"  icon="edit" class="q-mr-xs">
                                    <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                        <div class="text-white text-caption">Update Data Alumni</div>
                                    </q-tooltip>
                                </q-btn>
                                    <q-btn color="negative" @click="hapus(props.row.id_riwayat)" icon="close">
                                    <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                        <div class="text-white text-caption">Delete Data Alumni</div>
                                    </q-tooltip>
                                    </q-btn>
                                </q-card-actions>
                            </q-list>
                        </q-card>
                    </div>
                    </template>
                </q-table>
              </div>
               <q-dialog v-model="action" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6">{{ editriwayat ? 'Edit Riwayat' : 'Add Riwayat' }}</div>
            <q-space/>
            <q-btn icon="close" flat round dense @click="closedialog()"/>
          </q-card-section>

          <q-separator/>
          <q-form @submit="onSubmit">
            <q-card-section class="scroll">
              <q-input borderless readonly dense filled maxlength="20" v-model="form.id_riwayat" label="id_riwayat" :rules="[ val => val.length >= 8 || 'Please Insert NPM Correctly' ]" v-if="editriwayat === true"></q-input>
              <q-input dense filled maxlength="20" v-model="form.posisi" label="Posisi"></q-input>
              <q-input dense filled maxlength="20" v-model="form.perusahaan" label="Perusahaan"></q-input>
              <q-input mask="date" :rules="['date']" dense filled v-model="form.mulai" readonly label="Mulai" @click="ck()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qdateproxym" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.mulai" @input="() => $refs.qdateproxym.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-checkbox v-model="now" label="Currently?" @click="clear()"/>
              <q-input mask="date" :rules="['date']" dense filled v-model="form.sampai" readonly label="Sampai" @click="ck1()" v-if="now === false">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qdateproxys" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.sampai" @input="() => $refs.qdateproxys.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-card-actions align="right">
                <q-btn type="submit" label="Save" rounded class="bg-secondary text-white q-mt-md" />
                <q-btn label="Cancel" @click="closedialog()" rounded class="bg-secondary text-white q-mt-md" />
              </q-card-actions>
              </q-card-section>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import JwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      loading: false,
      action: false,
      filter: '',
      editriwayat: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      form: {
        id_riwayat: '',
        posisi: '',
        perusahaan: '',
        mulai: '',
        sampai: ''
      },
      data1: [],
      original: [],
      now: true,
      columns1: [
        {
          name: 'id_riwayat',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id_riwayat',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'mulai', label: 'Mulai', field: 'mulai', sortable: true },
        { name: 'sampai', label: 'Sampai', field: 'sampai', sortable: true },
        { name: 'posisi', label: 'Posisi', field: 'posisi' },
        { name: 'perusahaan', label: 'Perusahaan', field: 'perusahaan' },
        { name: 'action', label: 'Action', field: 'action' }
      ]
    }
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  async created () {
    let token = this.$q.localStorage.getItem('datauser')
    let userdata = JwtDecode(token)
    this.original = userdata.data
  },
  methods: {
    clear () {
      this.form.sampai = ''
    },
    addriwayat () {
      this.editriwayat = false
      this.action = true
      this.now = true
      this.form.id_riwayat = ''
      this.form.sampai = ''
      this.form.mulai = ''
      this.form.perusahaan = ''
      this.form.posisi = ''
    },
    closedialog () {
      this.action = false
    },
    onSubmit () {
      this.loading = true
      if (this.now === true) {
        this.form.sampai = 'NOW'
        if (this.editriwayat === true) {
          try {
            const a = localStorage.getItem('datauser')
            const b = JwtDecode(a)
            this.$axios.post('/alumni/editriwayat?id_riwayat=' + this.form.id_riwayat, {
              id_riwayat: this.form.id_riwayat,
              npm: b.profile.npm,
              mulai: this.form.mulai,
              sampai: this.form.sampai,
              perusahaan: this.form.perusahaan,
              posisi: this.form.posisi
            }, {
              headers: {
                'x-access-token': a
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
                  icon: 'chechmark'
                })
                this.$q.localStorage.set('datauser', res.data.results.token)
                this.refresh()
              }
            })
          } catch (error) {
            console.log(error)
          }
        } else {
          try {
            const a = localStorage.getItem('datauser')
            const b = JwtDecode(a)
            this.$axios.post('/alumni/inputdatariwayat', {
              npm: b.profile.npm,
              mulai: this.form.mulai,
              sampai: this.form.sampai,
              perusahaan: this.form.perusahaan,
              posisi: this.form.posisi
            }, {
              headers: {
                'x-access-token': a
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
                  icon: 'chechmark'
                })
                this.$q.localStorage.set('datauser', res.data.results.token)
                this.refresh()
              }
            })
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        if (this.editriwayat === true) {
          try {
            const a = localStorage.getItem('datauser')
            const b = JwtDecode(a)
            this.$axios.post('/alumni/editriwayat?id_riwayat=' + this.form.id_riwayat, {
              id_riwayat: this.form.id_riwayat,
              npm: b.profile.npm,
              mulai: this.form.mulai,
              sampai: this.form.sampai,
              perusahaan: this.form.perusahaan,
              posisi: this.form.posisi
            }, {
              headers: {
                'x-access-token': a
              }
            }).then(res => {
              console.log(res.data.results.token)
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
                  icon: 'chechmark'
                })
                this.$q.localStorage.set('datauser', res.data.results.token)
                this.refresh()
              }
            })
          } catch (error) {
            console.log(error)
          }
        } else {
          try {
            const a = localStorage.getItem('datauser')
            const b = JwtDecode(a)
            this.$axios.post('/alumni/inputdatariwayat', {
              npm: b.profile.npm,
              mulai: this.form.mulai,
              sampai: this.form.sampai,
              perusahaan: this.form.perusahaan,
              posisi: this.form.posisi
            }, {
              headers: {
                'x-access-token': a
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
                  icon: 'chechmark'
                })
                this.$q.localStorage.set('datauser', res.data.results.token)
                this.refresh()
              }
            })
          } catch (error) {
            console.log(error)
          }
        }
      } // submit form
    }, // add and edit riwayat
    edit (id, mulai, sampai, perusahaan, posisi) {
      console.log('id:' + id)
      this.action = true
      this.editriwayat = true
      this.form.id_riwayat = id
      this.form.mulai = mulai
      if (sampai === 'NOW') {
        this.form.sampai = ''
        this.now = true
      } else {
        this.now = false
        this.form.sampai = sampai
      }
      this.form.perusahaan = perusahaan
      this.form.posisi = posisi
    },
    cancel () {
      this.editon = true
      this.picture1 = ''
      this.refresh()
    },
    refresh () {
      let token = this.$q.localStorage.getItem('datauser')
      let userdata = JwtDecode(token)
      this.original = userdata.data
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
      this.action = false
      this.editon = true
    },
    hapus (riwayat) {
      const token = this.$q.localStorage.getItem('datauser')
      const b = JwtDecode(token)
      this.$q
        .dialog({
          title: 'Confirm Delete',
          message: 'Delete Riwayat:' + riwayat + '?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show()
          try {
            this.$axios.post('/alumni/deleteriwayat?id_riwayat=' + riwayat, {
              id_riwayat: riwayat,
              npm: b.profile.npm
            }, {
              headers: {
                'x-access-token': token
              }
            })
              .then(res1 => {
                this.$q.loading.hide()
                if (res1) {
                  this.$q.localStorage.set('datauser', res1.data.results.token)
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
                    message: res1.data.results.msg,
                    icon: 'closed'
                  })
                }
              })
          } catch (error) {
            console.log(error)
          }
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
        this.data1.splice(0, this.data1.length, ...returnedData)
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
      let data = []
      if (!filter) {
        data = this.original.slice(startRow, startRow + count)
      } else {
        let found = 0
        for (let index = startRow, items = 0; index < this.original.length && items < count; ++index) {
          let row = this.original[index]
          // match filter?
          if (!row['npm'].includes(filter) && !row['nama'].includes(filter)) {
            // get a different row, until one is found
            continue
          }
          ++found
          if (found >= startRow) {
            data.push(row)
            ++items
          }
        }
      }
      // handle sortBy
      if (sortBy) {
        data.sort((a, b) => {
          let x = descending ? b : a
          let y = descending ? a : b
          if (sortBy === 'desc') {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }
      return data
    },
    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        if (treat['id_riwayat'].includes(filter)) {
          ++count
        }
      })
      return count
    },
    ck () {
      this.$refs.form.mulai.show()
    },
    ck1 () {
      this.$refs.form.sampai.show()
    },
    ck2 () {
      this.$refs.date.show()
    },
    selectFoto (foto) {
      this.picture1 = this.$refs.picture1.$refs.input.files[0]
      console.log(this.picture1)
    }
  }
}
</script>

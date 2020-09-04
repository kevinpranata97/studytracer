<template>
<q-page padding>
<div class ="row">
 <div :class="$q.platform.is.mobile ? 'col-md-6 col-xs-12 flex' : 'col-md-6 col-xs-12'">
    <q-card :class="$q.platform.is.mobile ? 'bg-white text-black no-margin fit-screen' : 'bg-white text-black no-margin'" :style="$q.platform.is.mobile ? 'width: 350px' : 'width: 880px'" >
        <q-card-section :hidden="$q.platform.is.mobile" class="bg-teal">
            <q-list>
             <q-item >
              <q-item-section>
               <div class="text-h5 text-white desktop-only">{{ editon ? 'Profile' : 'Edit Profile' }}</div>
               <div class="text-h5 text-white text-center mobile-only">{{ editon ? 'Profile' : 'Edit Profile' }}</div>
              </q-item-section>
              <q-item-section side top>
                <div class="text-h6 text-blue-grey-14">
                  <q-btn @click="editon = false" icon="edit" color="white" class="text-teal" round v-if="editon">
                    <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Update Profile</div>
                  </q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
             </q-item>
            </q-list>
        </q-card-section>
              <q-separator />
           <q-splitter
            v-model="splitterModel"
            >
              <template v-slot:before>
                <q-tabs
                v-model="tab"
                vertical
                class="text-teal"
                >
                  <q-tab name="profile" icon="account_box" label="Person" @click="editon = true" class="desktop-only" />
                  <q-tab name="riwayat" icon="work" label="Work" @click="editon = true" class="desktop-only"/>
                </q-tabs>
              </template>
              <template v-slot:after>
                <q-tab-panels
                v-model="tab"
                animated
                transition-prev="jump-up"
                transition-next="jump-up"
                >
                <q-tab-panel name="profile">
                    <q-card-section>
                        <q-list>
                            <q-item>
                                <q-item-section>
                                <q-input borderless readonly maxlength="8" v-model="profile.npm" label="NPM" :rules="[ val => val.length >= 8 || 'Please Insert NPM Correctly' ]"></q-input>
                                <q-input borderless :readonly="editon" maxlength="50" v-model="profile.nama" label="Nama"></q-input>
                                <q-input borderless mask="date" :rules="['date']" v-model="profile.tanggal_lulus" label="Tanggal Lulus" @click="ck2()" readonly>
                                  <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer" v-if="editon === false">
                                      <q-popup-proxy ref="qdateproxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="profile.tanggal_lulus" @input="() => $refs.qdateproxy.hide()"/>
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                                </q-input>
                                <q-input borderless :readonly="editon" mask="#.##"  fill-mask="0" v-model="profile.ipk" label="IPK" :rules="[val => val < 4.01 || 'Please insert IPK correctly']" lazy-rules v-if="editdata === true"></q-input>
                                <q-input borderless :readonly="editon" maxlength="20" v-model="profile.keterangan" label="Keterangan" v-if="editdata === true" hint="ex. Strata Satu (S1)"></q-input>
                                <q-select
                                  borderless
                                  hide-dropdown-icon
                                  :readonly="editon"
                                  v-model="profile.jurusan"
                                  :options="jurusans"
                                  label="Jurusan"/>
                                </q-item-section>
                                <q-space/>
                                <div class="col-5 flex-top">
                                  <q-img :src= link+picture style="height:220px; width:200px">
                                    <template v-slot:error>
                                      <div class="absolute-full flex flex-center bg-grey text-black">No Image</div>
                                    </template>
                                  </q-img>
                                  <q-input style="width:200px" @change="selectFoto()" type="file" ref="picture1" class="q-pb-md" v-if="editon === false"></q-input>
                                </div>
                            </q-item>
                        </q-list>
                            <q-card-actions align="right">
                            <q-btn label="Save" rounded class="bg-secondary text-white q-mt-md" @click="submit()" v-if="editon === false"/>
                            <q-btn label="Cancel" @click="cancel()" rounded class="bg-secondary text-white q-mt-md" v-if="editon === false" />
                        </q-card-actions>
                    </q-card-section>
                </q-tab-panel>

                <q-tab-panel name="riwayat" class="desktop-only">
                    <q-card-section>
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-table
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
                                          <div
                                            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                                          >
                                            <q-card>
                                              <q-list dense>
                                                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                                                  <q-item-section>
                                                    <q-item-label>{{ col.label }}</q-item-label>
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
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
    </q-card>
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
              <q-input dense filled maxlength="30" v-model="form.posisi" label="Posisi"></q-input>
              <q-input dense filled maxlength="20" v-model="form.perusahaan" label="Perusahaan"></q-input>
              <q-input mask="date" :rules="['date']" dense filled v-model="form.mulai" label="Mulai" readonly @click="ck()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qdateproxym" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.mulai" @input="() => $refs.qdateproxym.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-checkbox v-model="now" label="Currently?" @click="clear()"/>
              <q-input mask="date" :rules="['date']" dense filled v-model="form.sampai" label="Sampai" readonly @click="ck1()" v-if="now === false">
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
import jurusan1 from '../../statics/api/jurusan'
import JwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      link: 'http://localhost:3000/',
      picture1: '',
      picture: '',
      filter: '',
      drawer: false,
      loading: false,
      editriwayat: false,
      action: false,
      tab: 'profile',
      splitterModel: 20,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      date: '',
      form: {
        id_riwayat: '',
        posisi: '',
        perusahaan: '',
        mulai: '',
        sampai: ''
      },
      editdata: true,
      editon: true,
      profile: {
        npm: '',
        nama: '',
        tanggal_lulus: '',
        ipk: '',
        jurusan: '',
        keterangan: ''
      },
      data1: [],
      original: [],
      now: true,
      jurusans: jurusan1,
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
    this.profile = userdata.profile
    this.picture = userdata.profile.picture
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
                  message: 'Success',
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
                  message: 'Success',
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
                  message: 'Success',
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
      this.form.sampai = sampai
      this.form.perusahaan = perusahaan
      console.log(sampai)
      if (sampai === 'NOW') {
        this.form.sampai = ''
        this.now = true
      } else {
        this.now = false
      }
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
      this.profile = userdata.profile
      this.picture = userdata.profile.picture
      this.date = userdata.profile.tanggallahir
      this.original = userdata.data
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
      this.action = false
      this.editon = true
    },
    submit () {
      const token = this.$q.localStorage.getItem('datauser')
      console.log(token)
      this.$q
        .dialog({
          title: 'Edit Profile',
          message: 'Are you sure to edit Profile data?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          if (this.picture1 === '') {
            try {
              this.$axios.post('/alumni/editdataalumni?npm=' + this.profile.npm, this.profile, {
                headers: {
                  'x-access-token': token
                }
              })
                .then(res => {
                  if (res.data.results.status === false) {
                    this.$q.notify({
                      message: res.data.results.msg,
                      color: 'negative',
                      icon: 'closed'
                    })
                  } else {
                    console.log(res.data.results.msg)
                    this.$q.localStorage.set('datauser', res.data.results.token)
                    this.$q.notify({
                      message: res.data.results.msg,
                      color: 'positive',
                      icon: 'checkmark'
                    })
                    this.editon = true
                    this.refresh()
                  }
                })
                .catch(e => {
                  this.$q.notify({
                    message: 'Edit Data failed',
                    color: 'negative',
                    icon: 'ion-closed'
                  })
                  console.log(e)
                })
            } catch (error) {
              this.$q.notify({
                message: 'Edit Data failed',
                color: 'negative',
                icon: 'ion-closed'
              })
              console.log(error)
            }
          } else {
            const formdata = new FormData()
            formdata.append('picture', this.picture1, this.profile.nama + '.PNG')
            formdata.append('npm', this.profile.npm)
            formdata.append('nama', this.profile.nama)
            formdata.append('tanggal_lulus', this.profile.tanggal_lulus)
            formdata.append('ipk', this.profile.ipk)
            formdata.append('keterangan', this.profile.keterangan)
            formdata.append('jurusan', this.profile.jurusan)
            formdata.append('jenis_kelanmin', this.profile.jenis_kelanmin)
            this.$axios.post('/alumni/editalumniwithpic?npm=' + this.profile.npm, formdata, {
              headers: {
                'x-access-token': token
              }
            })
              .then(res => {
                if (res.data.results.status === false) {
                  this.$q.notify({
                    message: res.data.results.msg,
                    color: 'negative',
                    icon: 'closed'
                  })
                } else {
                  console.log(res.data.results.msg)
                  this.$q.localStorage.set('datauser', res.data.results.token)
                  this.$q.notify({
                    message: res.data.results.msg,
                    color: 'positive',
                    icon: 'checkmark'
                  })
                  this.editon = true
                  this.refresh()
                }
              })
          }
        })
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
      this.$refs.profile.tanggal_lulus.show()
    },
    selectFoto (foto) {
      this.picture1 = this.$refs.picture1.$refs.input.files[0]
      console.log(this.picture1)
    }
  }
}
</script>

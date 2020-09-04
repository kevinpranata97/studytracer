<template>
  <q-page padding>
      <div class="row">
          <div class="col-md-12 col-xs-12">
              <q-card>
                  <q-card-section>
            <q-toggle v-model="alumni" label="Alumni?" @click="refresh()"/>
            <div class="text-h6">{{ alumni ? 'Edit Kuisioner for Alumni' : 'Edit Kuisioner for perusahaan' }}</div>
            <div class="text-h8"> Press refresh button if data is not updated</div>
            <q-space/>
            <q-separator/>
                  </q-card-section>
                  <q-card-section>
              <q-table
              title="Kuisioner"
              ref="table"
              :data="datakuis"
              :columns="columns"
              row-key="id"
              :pagination.sync="pagination"
              :loading="loading"
              :filter="filter"
              @request="onRequest"
              binary-state-sort
              :table-style="$q.platform.is.mobile ? 'max-width: 300px':'max-width: 1100px'">
              <template v-slot:top-left>
          <div class="text-blue-grey-14 text-h5 mobile-only">Data User</div>
            <div class="row inline">
        <q-btn @click="refresh" color="secondary" flat round class="q-mb-md" icon="refresh" >
        <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <div class="text-white text-caption">Refresh</div>
          </q-tooltip>
        </q-btn>
        <q-btn @click="adddata()" color="secondary" flat round class="q-mb-md" icon="add">
            <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <div class="text-white text-caption">Add Data kuisioner</div>
          </q-tooltip>
        </q-btn>
      </div>
      <div class="text-blue-grey-14 text-h5 desktop-only">Data Kuisioner</div>
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
              <q-td key="no" :props="props">{{ props.row.no }}</q-td>
              <q-td key="text" :props="props">{{ props.row.text }}</q-td>
              <q-td key="category" :props="props">{{ props.row.category }}</q-td>
              <q-td key="action" :props="props" align="around">
                <q-btn round color="secondary" @click="edit(props.row.no, props.row.text, props.row.category)"  icon="edit" class="q-mr-xs">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Update Data</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round color="negative" @click="hapus(props.row.no)" icon="close">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Delete Data</div>
                  </q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
              </q-table>
              <q-dialog v-model="kuis" persistent>
                  <q-card>
                      <q-card-section class="row items-center">
                         <div class="text-h6">{{ editkuis ? 'Edit Question' : 'Add Question' }}</div>
                        <q-space/>
                        <q-btn icon="close" flat round dense @click="closedialog()"/>
                      </q-card-section>
                      <q-form @submit="onsubmit">
                      <q-card-section>
                          <q-input v-model="pertanyaan.no" label="no" maxlength="3" :readonly="editkuis"/>
                          <q-input type="textarea" label="text" v-model="pertanyaan.text"/>
                          <q-input v-model="pertanyaan.category" label="category" maxlength="3"/>
                      </q-card-section>
                      <q-card-actions>
                          <q-btn type="submit" label="Save" rounded class="bg-secondary text-white q-mt-md"/>
                          <q-btn label="Cancel" @click="closedialog()" rounded class="bg-secondary text-white q-mt-md" />
                      </q-card-actions>
                      </q-form>
                  </q-card>
              </q-dialog>
              <q-separator/>
                  </q-card-section>
                  <q-card-section>
              <q-table
              title="Jawaban"
              ref="table1"
              :data="datajawab"
              :columns="columns1"
              row-key="id"
              :pagination.sync="pagination1"
              :loading="loading1"
              :filter="filter1"
              @request="onRequest1"
              binary-state-sort
              :table-style="$q.platform.is.mobile ? 'max-width: 300px':'max-width: 1100px'">
              <template v-slot:top-left>
          <div class="text-blue-grey-14 text-h5 mobile-only">Data User</div>
            <div class="row inline">
      <q-btn @click="refresh" color="secondary" flat round class="q-mb-md" icon="refresh" >
          <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <div class="text-white text-caption">Refresh</div>
          </q-tooltip>
      </q-btn>
    <q-btn @click="adddata1()" color="secondary" flat round class="q-mb-md" icon="add">
        <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <div class="text-white text-caption">Add Data indikator</div>
          </q-tooltip>
    </q-btn>
      </div>
      <div class="text-blue-grey-14 text-h5 desktop-only">Data Jawaban</div>
      </template>
          <template v-slot:top-right>
            <q-input  dense outlined rounded debounce="300" v-model="filter1" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">{{ props.row.id }}</q-td>
              <q-td key="value" :props="props">{{ props.row.value }}</q-td>
              <q-td key="category" :props="props">{{ props.row.category }}</q-td>
              <q-td key="action" :props="props" align="Right">
                <q-btn color="secondary" round @click="edit1(props.row.id, props.row.value, props.row.category)"  icon="edit" class="q-mr-xs">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Update Data</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round color="negative" @click="hapus1(props.row.id)" icon="close">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Delete Data</div>
                  </q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
              </q-table>
              <q-dialog v-model="jawab" persistent>
                  <q-card>
                      <q-card-section class="row items-center">
                         <div class="text-h6">{{ editjawab ? 'Edit Answer' : 'Add Answer' }}</div>
                        <q-space/>
                        <q-btn icon="close" flat round dense @click="closedialog1()"/>
                      </q-card-section>
                    <q-form @submit="onsubmit1">
                      <q-card-section>
                          <q-input v-model="indikator.id" maxlength="3" label="ID" :readonly="editjawab"/>
                          <q-input type="textarea" v-model="indikator.value" label="Value"/>
                          <q-input v-model="indikator.category" maxlength="3" label="Category" hint="Used to group answers on question"/>
                      <q-card-actions>
                          <q-btn type="submit" label="Save" rounded class="bg-secondary text-white q-mt-md"/>
                          <q-btn @click="closedialog1()" label="Cancel" rounded class="bg-negative text-white q-mt-md"/>
                      </q-card-actions>
                      </q-card-section>
                      </q-form>
                  </q-card>
              </q-dialog>
                  </q-card-section>
              </q-card>
          </div>
      </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      filter: '',
      filter1: '',
      editjawab: false,
      editkuis: false,
      loading: false,
      loading1: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      pagination1: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      datakuis: [],
      original: [],
      original1: [],
      alumni: true,
      datajawab: [],
      jawaban: false,
      kuisioner: false,
      kuis: false,
      jawab: false,
      pertanyaan: {
        no: '',
        text: '',
        category: ''
      },
      indikator: {
        id: '',
        value: '',
        category: ''
      },
      columns: [
        {
          name: 'no',
          required: true,
          label: 'No',
          align: 'left',
          field: 'no',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'text', label: 'Pertanyaan', field: 'text', align: 'Left' },
        { name: 'category', label: 'Category', field: 'category', align: 'Left', sortable: true },
        { name: 'action', label: 'Action', field: 'action', align: 'Right' }
      ],
      columns1: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'value', label: 'Jawaban', field: 'value', sortable: true, align: 'Right' },
        { name: 'category', label: 'Category', field: 'category', sortable: true },
        { name: 'action', label: 'Action', field: 'action', align: 'Center' }
      ]
    }
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
    this.onRequest1({
      pagination: this.pagination1,
      filter1: undefined
    })
  },
  async created () {
    const b = localStorage.getItem('dataadmin')
    this.$axios.get('/admin/viewallindikator', { headers: {
      'x-access-token': b
    } })
      .then(res => {
        this.original1 = res.data.results.data
        console.log(this.original1)
        console.log('axe')
      }).catch(e => {
        console.log(e)
      })
    if (this.alumni === true) {
      this.$axios.get('/admin/viewallkuisalumni', { headers: {
        'x-access-token': b
      } })
        .then(res => {
          this.original = res.data.results.data
          console.log('axe')
        }).catch(e => {
          console.log(e)
        })
    } else {
      this.$axios.get('/admin/viewallkuisperusahaan', { headers: {
        'x-access-token': b
      } })
        .then(res => {
          this.original = res.data.results.data
          console.log('axe')
        }).catch(e => {
          console.log(e)
        })
    }
  },
  methods: {
    closedialog () {
      this.kuis = false
      this.editkuis = false
    },
    closedialog1 () {
      this.jawab = false
      this.editjawab = false
    },
    adddata () {
      this.kuis = true
      this.pertanyaan.no = ''
      this.pertanyaan.text = ''
      this.pertanyaan.category = ''
    },
    adddata1 () {
      this.jawab = true
      this.indikator.id = ''
      this.indikator.value = ''
      this.indikator.category = ''
    },
    edit (no, text, category) {
      this.editkuis = true
      this.kuis = true
      this.pertanyaan.no = no
      this.pertanyaan.text = text
      this.pertanyaan.category = category
    },
    edit1 (id, value, category) {
      this.editjawab = true
      console.log(value)
      this.jawab = true
      this.indikator.id = id
      this.indikator.value = value
      this.indikator.category = category
    },
    hapus (no1) {
      const b = localStorage.getItem('dataadmin')
      if (this.alumni === true) {
        this.$axios.post('/admin/deletekuisalumni', { no: no1 }, { headers: {
          'x-access-token': b
        } })
          .then(res => {
            this.refresh()
          }).catch(e => {
            console.loading('?')
          })
      } else {
        this.$axios.post('/admin/deletekuisperusahaan', { no: no1 }, { headers: {
          'x-access-token': b
        } })
          .then(res => {
            this.refresh()
          }).catch(e => {
            console.loading('?')
          })
      }
    },
    hapus1 (id1) {
      const b = localStorage.getItem('dataadmin')
      this.$axios.post('/admin/deleteindikator', { id: id1 }, { headers: {
        'x-access-token': b
      } })
        .then(res => {
          this.refresh1()
        }).catch(e => {
          console.log('??')
        })
    },
    refresh () {
      const b = localStorage.getItem('dataadmin')
      if (this.alumni === true) {
        this.$axios.get('/admin/viewallkuisalumni', { headers: {
          'x-access-token': b
        } })
          .then(res => {
            this.original = res.data.results.data
            console.log(res.data.results.data)
          }).catch(e => {
            console.log(e)
          })
      } else {
        this.$axios.get('/admin/viewallkuisperusahaan', { headers: {
          'x-access-token': b
        } })
          .then(res => {
            this.original = res.data.results.data
            console.log('axe')
          }).catch(e => {
            console.log(e)
          })
      }
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    refresh1 () {
      const b = localStorage.getItem('dataadmin')
      this.$axios.get('/admin/viewallindikator', { headers: {
        'x-access-token': b
      } })
        .then(res => {
          this.original1 = res.data.results.data
          console.log('axe')
        }).catch(e => {
          console.log(e)
        })
      this.onRequest1({
        pagination: this.pagination1,
        filter1: undefined
      })
    },
    onsubmit () {
      const b = localStorage.getItem('dataadmin')
      if (this.alumni === true) {
        if (this.editkuis === true) {
          this.$axios.post('/admin/editkuisioneralumni', this.pertanyaan, { headers: {
            'x-access-token': b
          } })
            .then(res => {
              this.refresh()
              this.closedialog()
              console.log('axe')
            }).catch(e => {
              console.log(e)
            })
        } else {
          this.$axios.post('/admin/inputkuisioneralumni', this.pertanyaan, { headers: {
            'x-access-token': b
          } })
            .then(res => {
              this.refresh()
              this.closedialog()
              console.log('axe')
            }).catch(e => {
              console.log(e)
            })
        }
      } else {
        if (this.editkuis === true) {
          this.$axios.post('/admin/editkuisionerperusahaan', this.pertanyaan, { headers: {
            'x-access-token': b
          } })
            .then(res => {
              this.refresh()
              this.closedialog()
              console.log('axe')
            }).catch(e => {
              console.log(e)
            })
        } else {
          this.$axios.post('/admin/inputkuisionerperusahaan', this.pertanyaan, { headers: {
            'x-access-token': b
          } })
            .then(res => {
              this.refresh()
              this.closedialog()
              console.log('axe')
            }).catch(e => {
              console.log(e)
            })
        }
      }
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    onsubmit1 () {
      const b = localStorage.getItem('dataadmin')
      if (this.editjawab === true) {
        this.$axios.post('/admin/editindikator', this.indikator, { headers: {
          'x-access-token': b
        } })
          .then(res => {
            this.refresh1()
            this.closedialog1()
            console.log('axe')
          }).catch(e => {
            console.log(e)
          })
      } else {
        this.$axios.post('/admin/inputindikator', this.indikator, { headers: {
          'x-access-token': b
        } })
          .then(res => {
            this.refresh1()
            this.closedialog1()
            console.log('axe')
          }).catch(e => {
            console.log(e)
          })
        this.onRequest1({
          pagination: this.pagination1,
          filter1: undefined
        })
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
        this.datakuis.splice(0, this.datakuis.length, ...returnedData)
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
        ? this.original.filter(row => row.text.includes(filter) || row.category.includes(filter))
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
        if (treat['text'].includes(filter) || treat['category'].includes(filter)) {
          ++count
        }
      })
      return count
    },
    onRequest1 (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      let filter1 = props.filter
      this.loading1 = true
      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination1.rowsNumber = this.getRowsNumberCount1(filter1)
        // get all rows if "All" (0) is selected
        let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage
        // calculate starting row of data
        let startRow = (page - 1) * rowsPerPage
        // fetch data from "server"
        let returnedData = this.fetchFromServer1(startRow, fetchCount, filter1, sortBy, descending)
        // clear out existing data and add new
        this.datajawab.splice(0, this.datajawab.length, ...returnedData)
        // don't forget to update local pagination object
        this.pagination1.page = page
        this.pagination1.rowsPerPage = rowsPerPage
        this.pagination1.sortBy = sortBy
        this.pagination1.descending = descending
        // ...and turn of loading indicator
        this.loading1 = false
      }, 1000)
    },
    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer1 (startRow, count, filter1, sortBy, descending) {
      const data = filter1
        ? this.original1.filter(row => row.id.includes(filter1) || row.value.includes(filter1) || row.category.includes(filter1))
        : this.original1.slice()

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
    getRowsNumberCount1 (filter1) {
      if (!filter1) {
        return this.original1.length
      }
      let count = 0
      this.original1.forEach((treat) => {
        if (treat['id'].includes(filter1) || treat['value'].includes(filter1) || treat['category'].includes(filter1)) {
          ++count
        }
      })
      return count
    }
  }
}
</script>

<template>
<q-page padding>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <q-card class="bg-white text-black no-margin full-height full" :style="$q.platform.is.mobile ? '' : 'width: 850px'">
          <q-table
          title="Kuisioner"
          ref="table"
          hide-header
          hide-bottom=""
          separator="none"
          :pagination="pagination"
          :data="datakuis"
          :columns="columns"
          row-key="id"
          :loading="loading">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="no" :props="props">{{ props.row.no }}.</q-td>
              <q-td key="text" :props="props">{{ props.row.text }}</q-td>
              <q-td key="action" :props="props" align="around">
                <q-btn rounded label="Answer" color="secondary" @click="edit(props.row.no, props.row.text, props.row.category)"  icon="edit" class="q-mr-xs">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Answer</div>
                  </q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
          </q-table>
          <q-dialog v-model="kuisioner" persistent>
                  <q-card>
                      <q-card-section class="row items-center">
                         <div class="text-h6">{{ editkuis ? 'Edit Response' : 'Answer' }}</div>
                        <q-space/>
                        <q-btn icon="close" flat round dense @click="closedialog()"/>
                      </q-card-section>
                      <q-form @submit="onsubmit">
                      <q-card-section>
                          <div>{{ jawab.no }}. {{ kuis.text }}</div>
                          <q-select v-model="jawab.jawaban" :options="indikator" option-value="id" option-label="value" emit-value map-options :filled="editkuis === false"/>
                      </q-card-section>
                      <q-card-actions align="right">
                          <q-btn type="submit" label="Save" rounded class="bg-secondary text-white q-mt-md"/>
                          <q-btn label="Cancel" @click="closedialog()" rounded class="bg-negative text-white q-mt-md" />
                      </q-card-actions>
                      </q-form>
                  </q-card>
              </q-dialog>
        </q-card>
      </div>
    </div>
</q-page>
</template>
<script>
import JwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      datakuis: [],
      indikator: [],
      kuisioner: false,
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
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
        { name: 'action', label: 'Action', field: 'action', align: 'Right' }
      ],
      editkuis: true,
      kuis: {
        text: '',
        category: ''
      },
      jawab: {
        no: '',
        jawaban: '',
        id_perusahaan: ''
      }
    }
  },
  mounted () {
  },
  async created () {
    let token = this.$q.localStorage.getItem('dataperusahaan')
    let userdata = JwtDecode(token)
    this.jawab.id_perusahaan = userdata.profile.id_perusahaan
    this.$axios.get('/perusahaan/viewkuisioner', { headers: {
      'x-access-token': token
    } })
      .then(res => {
        this.datakuis = res.data.results.data
        console.log(this.datakuis)
        console.log('axe')
      }).catch(e => {
        console.log(e)
      })
  },
  methods: {
    edit (no, text, category1) {
      console.log(category1)
      this.kuis.category = category1
      this.kuisioner = true
      this.jawab.no = no
      this.kuis.text = text
      let token = this.$q.localStorage.getItem('dataperusahaan')
      this.$axios.post('/perusahaan/viewkuisionergroup', { category: this.kuis.category })
        .then(res1 => {
          this.indikator = res1.data.results.data
          this.$axios.post('/perusahaan/selectkuisioner', this.jawab, { headers: {
            'x-access-token': token
          } })
            .then(res => {
              if (res.data.results.status === true) {
                this.editkuis = true
                this.jawab.jawaban = res.data.results.data[0].jawaban
              } else {
                this.editkuis = false
                this.jawab.jawaban = ''
              }
              console.log('axe')
            }).catch(e => {
              console.log(e)
            })
        }).catch(e => {
          console.log(e)
        })
    },
    closedialog () {
      this.kuisioner = false
    },
    onsubmit () {
      let token = this.$q.localStorage.getItem('dataperusahaan')
      if (this.editkuis === true) {
        this.$axios.post('/perusahaan/updatekuisioner', this.jawab, { headers: {
          'x-access-token': token
        } })
          .then(res => {
            this.$q.notify({
              message: res.data.results.msg,
              color: 'positive',
              icon: 'checkmark'
            })
            this.closedialog()
          }).catch(e => {
            console.log(e)
          })
      } else {
        this.$axios.post('/perusahaan/insertkuisioner', this.jawab, { headers: {
          'x-access-token': token
        } })
          .then(res => {
            this.$q.notify({
              message: 'Insert Answer No.' + this.jawab.no + ' Success',
              color: 'positive',
              icon: 'checkmark'
            })
            this.closedialog()
          }).catch(e => {
            console.log(e)
          })
      }
    }
  }
}
</script>

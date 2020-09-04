<template>
<q-page padding>
    <div class="row">
        <div class="col-md-6 col-xs-12">
        <q-card class="bg-white text-black no-margin full-height full" :style="$q.platform.is.mobile ?  'width: 300px':'width: 885px'">
            <q-card-section :hidden="$q.platform.is.mobile" class="bg-grey-4">
            <q-list>
             <q-item >
              <q-item-section>
               <div class="text-h5 text-black">{{perusahaan ? 'Perusahaan' : 'Alumni'}}</div>
              </q-item-section>
             </q-item>
            </q-list>
        </q-card-section>
            <q-card-section>
                <q-toggle v-model="perusahaan" label="Perusahaan?"/>
                <q-space/>
                <label>Indikator: </label>
                <q-space/>
                <q-select filled style="width:200px" option-label="text" option-value="text" emit-value map-options v-model="indikator" :options="indikators" @input="submit()" v-if="perusahaan === false" />
                <q-select filled style="width:200px" option-label="text" option-value="text" emit-value map-options v-model="indikatorp" :options="indikatorsp" @input="submit()" v-if="perusahaan" />
                <q-space/>
                <label v-if="perusahaan === false">Jurusan: </label>
                <q-space/>
                <q-select filled style="width:200px" v-model="jurusan" :options="jurusans"  v-if="perusahaan === false" @input="submit()"/>
                <q-space/>
            </q-card-section>
            <q-card-actions align="right">
            </q-card-actions>
            <q-separator/>
            <q-card-section class="mobile-only">
              <ejs-chart id="container1" :primaryXAxis='primaryXAxis' :title="title">
                  <e-series-collection>
                    <e-series :dataSource='seriesData' type='Bar' xName='x' yName='y' :marker='marker'> </e-series>
                  </e-series-collection>
              </ejs-chart>
            </q-card-section>
            <q-card-section class="desktop-only">
              <q-splitter
            v-model="splitterModel"
            >
              <template v-slot:before>
                <q-tabs
                v-model="tab"
                vertical
                class="text-black"
                >
                  <q-tab name="column" label="COLUMN"/>
                  <q-tab name="bar" label="BAR" />
                </q-tabs>
              </template>
            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="column">
                    <q-card-section>
                        <q-list>
                            <q-item>
                                <q-item-section>
                                  <ejs-chart id="container" :primaryXAxis='primaryXAxis' :title="title" :pointRender='pointRender'>
                                  <e-series-collection>
                                      <e-series :dataSource='seriesData' type='Column' xName='x' yName='y' :marker='marker'> </e-series>
                                  </e-series-collection>
                                  </ejs-chart>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-tab-panel>
                <q-tab-panel name="bar">
                    <q-card-section>
                        <q-list>
                            <q-item>
                                <q-item-section>
                                  <ejs-chart id="container" :primaryXAxis='primaryXAxis' :title="title" :pointRender='pointRender'>
                                  <e-series-collection>
                                      <e-series :dataSource='seriesData' type='Bar' xName='x' yName='y' :marker='marker'> </e-series>
                                  </e-series-collection>
                                  </ejs-chart>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-tab-panel>
              </q-tab-panels>
            </template>
            </q-splitter>
            </q-card-section>
        </q-card>
        </div>
    </div>
</q-page>
</template>
<script>
import jurusan1 from '../../statics/api/jurusan'
import { ColumnSeries, Category, BarSeries, DataLabel } from '@syncfusion/ej2-vue-charts'
export default {
  data () {
    return {
      splitterModel: 20,
      tab: 'column',
      title: '',
      perusahaan: false,
      jurusan: '',
      indikator: '',
      indikatorp: '',
      indikators: [],
      indikatorsp: [],
      jurusans: jurusan1,
      seriesData: [
      ],
      primaryXAxis: {
        valueType: 'Category',
        title: 'Indikator'
      },
      marker: {
        dataLabel: { visible: true }
      }
    }
  },
  mounted () {
  },
  async created () {
    const b = localStorage.getItem('dataadmin')
    this.$axios.get('/admin/dropdownkuisalumni', { headers: {
      'x-access-token': b
    } })
      .then(res => {
        this.indikators = res.data.results.data
      }).catch(e => {
        console.log(e)
      })
    this.$axios.get('/admin/dropdownkuisperusahaan', { headers: {
      'x-access-token': b
    } })
      .then(res => {
        this.indikatorsp = res.data.results.data
      }).catch(e => {
        console.log(e)
      })
  },
  methods: {
    pointRender: function (args) {
      var seriesColor = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57']
      args.fill = seriesColor[args.point.index]
    },
    submit () {
      console.log(this.indikator)
      if (this.perusahaan === true) {
        if (this.indikatorp === '') {
          this.$q.notify({
            message: 'Please fill the indikator',
            color: 'negative',
            icon: 'closed'
          })
        } else {
          this.$axios.post('/admin/kuisionerp', {
            text: this.indikatorp
          }).then(res => {
            this.title = 'Grafik Kuisioner Perusahaan'
            this.seriesData = res.data.results.data
            this.$q.notify({
              message: res.data.results.msg,
              color: 'positive',
              icon: 'checkmark'
            })
          })
        }
      } else {
        if (this.indikator === '') {
          this.$q.notify({
            message: 'Please Choose the indicator',
            color: 'negative',
            icon: 'closed'
          })
        } else {
          this.$axios.post('/admin/viewkuisionergraph', {
            text: this.indikator,
            jurusan: this.jurusan
          }).then(res => {
            this.title = 'Grafik Kuisioner Alumni'
            this.seriesData = res.data.results.label
            console.log(res.data.results.label)
            this.$q.notify({
              message: res.data.results.msg,
              color: 'positive',
              icon: 'checkmark'
            })
          })
        }
      }
    }
  },
  provide: {
    chart: [ColumnSeries, Category, DataLabel, BarSeries]
  }
}
</script>

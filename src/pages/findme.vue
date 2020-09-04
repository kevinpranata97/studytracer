<template>
  <q-page padding class="items-center justify-center">
      <div class="row fixed-center full-width">
        <div class="col-md-4 offset-md-4 col-xs-12 q-pb-lg q-pl-md q-pr-md q-pt-sm">
          <q-card class="my-card bg-white text-black">
            <q-card-section class="text-center">
              <img src="~assets/Logo-ubl.png" style="height: 120px;max-width: 150px;"/>
            </q-card-section>
            <q-card-section>
              <div class="text-black text-center text-h4">Tracer Study</div>
              <div class="text-black text-center text-h4" >Find Yourself</div>
              <div class="text-black text-h14 text-center" >Fill the field below to find your npm</div>
            </q-card-section>
            <q-card-section>
              <q-input v-model="form.nama" label="Nama">
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-select
              borderless
              hide-dropdown-icon
              v-model="form.jurusan"
              :options="jurusans"
              label="Jurusan" >
              </q-select>
              <q-btn rounded label="FIND" class="bg-secondary text-white" @click="find()"/>
              <q-btn rounded label="Back" to="/" class="bg-white text-negative"/>
            </q-card-section>
            <q-card-section>
                <div class="text-h6">Results:</div>
                <div v-for="item in items" :key="item.npm">
                    - npm: {{ item.npm }},  nama: {{ item.nama }} ,  jurusan:   {{ item.jurusan }}
                </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<style>
</style>

<script>
import jurusan1 from '../statics/api/jurusan'
export default {
  name: 'PageIndex',
  data () {
    return {
      registermode: false,
      loading: false,
      form: {
        nama: '',
        jurusan: ''
      },
      items: [],
      jurusans: jurusan1
    }
  },
  created () {
  },
  methods: {
    find () {
      this.$axios.post('/admin/findalumni', this.form)
        .then(res => {
          this.items = res.data.results.data
        })
    },
    simulateProgress () {
      // we set loading state
      this.loading = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false
      }, 3000)
    }
  }
}
</script>

<template>
  <q-page padding>
    <div class="row">
      <q-card square bordered flat class="bg-white">
        <q-card-section class="bg-white text-center text-secondary">
          <div class="q-mt-md text-center text-h4">PROFILE</div>
          <q-item-section align="right" top >
                <div class="text-h6 text-blue-grey-14">
                  <q-btn flat round @click="action = true" icon="edit" color="secondary" class="text-secondary" >
                  </q-btn>
                </div>
              </q-item-section>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-teal text-center">
          <q-avatar size="200px">
          <q-img :src="link+picture" style="height:100%; width:100%">
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-grey text-black">No Image</div>
            </template>
          </q-img>
          </q-avatar>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-teal text-h7">NPM :</div><div class="q-mt-md text-left text-h7"> {{ profile.npm }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-teal text-h7">Nama :</div><div class="q-mt-md text-left text-h7"> {{ profile.nama }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-teal text-h7">Tanggal Lulus :</div><div class="q-mt-md text-left text-h7"> {{ tanggal_lulus1 }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-teal text-h7">Jurusan :</div><div class="q-mt-md text-left text-h7"> {{ profile.jurusan }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-teal text-h7">Keterangan :</div><div class="q-mt-md text-left text-h7"> {{ profile.keterangan }}</div>
        </q-card-section>
        <q-separator/>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-teal text-h7">IPK :</div><div class="q-mt-md text-left text-h7"> {{ profile.ipk }}</div>
        </q-card-section>
        <q-separator/>
      </q-card>
    </div>
    <q-dialog v-model="action" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Edit Profile</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="closedialog()" />
        </q-card-section>
        <q-separator />
        <q-form @submit="onSubmit">
          <q-card-section class="scroll">
            <q-input
              borderless
              dense
              maxlength="40"
              v-model="profile.nama"
              label="Nama :"
            ></q-input>
            <q-input mask="date" borderless v-model="profile.tanggal_lulus" label="Tanggal Lulus" @click="ck()" >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qdateproxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="profile.tanggal_lulus" @input="() => $refs.qdateproxy.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            <q-input
              borderless
              mask="#.##"
              fill-mask="0"
              dense
              v-model="profile.ipk"
              label="IPK :"
              :rules="[val => val < 4.01 || 'Please insert IPK correctly']"
              lazy-rules
            ></q-input>
            <q-input
              borderless
              dense
              maxlength="20"
              v-model="profile.keterangan"
              hint="ex. Strata Satu (S1)"
              label="Pekerjaan :"
            ></q-input>
            <q-select
              borderless
              v-model="profile.jurusan"
              :options="jurusans"
              hide-dropdown-icon
              label="Jurusan :"
            />
            <div class="text-h8 text-grey-8" >Profile Picture :</div>
            <q-input style="width:200px" @change="selectFoto()" type="file" ref="picture1" class="q-pb-md" ></q-input>
            <q-card-actions align="right">
                <q-btn type="submit" label="Save" rounded class="bg-secondary text-white q-mt-md" />
                <q-btn label="Cancel" @click="closedialog()" rounded class="bg-secondary text-white q-mt-md"  />
            </q-card-actions>
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import jurusan1 from '../../statics/api/jurusan'
import JwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      page: 1,
      link: 'http://localhost:3000/',
      picture1: '',
      picture: '',
      filter: '',
      jurusans: jurusan1,
      action: false,
      genders: [
        'Laki-laki',
        'Perempuan'
      ],
      date: '',
      profile: {
        npm: '',
        nama: '',
        ipk: '',
        jurusan: '',
        keterangan: '',
        tanggal_lulus: ''
      },
      tanggal_lulus1: ''
    }
  },
  mounted () {
  },
  async created () {
    let token = this.$q.localStorage.getItem('datauser')
    let userdata = JwtDecode(token)
    this.profile = userdata.profile
    this.picture = userdata.profile.picture
    this.tanggal_lulus1 = userdata.profile.tanggal_lulus.slice(0, 10)
  },
  methods: {
    edit () {
      let token = this.$q.localStorage.getItem('datauser')
      let userdata = JwtDecode(token)
      this.profile = userdata.profile
      this.action = true
      this.page = 1
    },
    closedialog () {
      this.action = false
      this.refresh()
    },
    refresh () {
      let token = this.$q.localStorage.getItem('datauser')
      let userdata = JwtDecode(token)
      this.profile = userdata.profile
      this.picture = userdata.profile.picture
      this.tanggallahir1 = userdata.profile.tanggallahir.slice(0, 10)
      this.action = false
    },
    onSubmit () {
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
    ck () {
      this.$refs.profile.tanggal_lulus.show()
    },
    selectFoto (foto) {
      this.picture1 = this.$refs.picture1.$refs.input.files[0]
      console.log(this.picture1)
    }
  }
}
</script>

<template>
  <q-page padding>
    <div class="row">
      <q-card square bordered flat class="bg-white" >
        <q-card-section class="bg-white text-center text-orange">
          <div class="q-mt-md text-center text-h4">PROFILE</div>
          <q-item-section align="right" top>
            <div class="text-h6 text-blue-grey-14">
              <q-btn
                flat
                round
                @click="action = true"
                icon="edit"
                color="white"
                class="text-orange"
              ></q-btn>
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
          <div class="q-mt-md text-left text-h8 text-orange">ID :</div><div class="q-mt-md text-left text-h7"> {{ profile.id_perusahaan }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-h8 text-orange">Nama :</div><div class="q-mt-md text-left text-h7"> {{ profile.nama }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-h8 text-orange">Pemilik :</div><div class="q-mt-md text-left text-h7"> {{ profile.pemilik }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-h8 text-orange">Web :</div><div class="q-mt-md text-left text-h7"> {{ profile.web }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-h8 text-orange">Contact :</div><div class="q-mt-md text-left text-h7"> {{ profile.contact }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-h8 text-orange">Provinsi :</div><div class="q-mt-md text-left text-h7"> {{ profile.provinsi }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-h8 text-orange">Kota :</div><div class="q-mt-md text-left text-h7"> {{ profile.kota }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-h8 text-orange">Alamat :</div><div class="q-mt-md text-left text-h7"> {{ profile.alamat }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="bg-white text-black">
          <div class="q-mt-md text-left text-h8 text-orange">Email :</div><div class="q-mt-md text-left text-h7"> {{ profile.email }}</div>
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
              readonly
              dense
              maxlength="8"
              v-model="profile.id_perusahaan"
              label="ID :"
            />
            <q-input
              borderless
              dense
              maxlength="40"
              v-model="profile.nama"
              label="Nama Perusahaan :"
            ></q-input>
            <q-input
              borderless
              dense
              maxlength="40"
              v-model="profile.pemilik"
              label="Pemilik :"
            ></q-input>
            <q-input borderless dense maxlength="20" v-model="profile.web" label="Web :"></q-input>
            <q-input borderless dense mask="############" maxlength="12" v-model="profile.contact" label="Contact :"></q-input>
            <q-input
              borderless
              v-model="profile.email"
              label="Email :"
              maxlength="50"
              :rules="[val => val.includes('@gmail.com') || 'Please insert Email correctly']"
            ></q-input>
            <q-input borderless dense maxlength="30" v-model="profile.provinsi" label="Provinsi :"></q-input>
            <q-input borderless dense maxlength="25" v-model="profile.kota" label="Kota :"></q-input>
            <q-input
              type="textarea"
              borderless
              dense
              v-model="profile.alamat"
              label="Alamat :"
            ></q-input>
            <q-input
              style="width:200px"
              @change="selectFoto()"
              type="file"
              ref="picture1"
              class="q-pb-md"
            ></q-input>
            <q-card-actions align="right">
              <q-btn type="submit" label="Save" rounded class="bg-secondary text-white q-mt-md" />
              <q-btn
                label="Cancel"
                @click="closedialog()"
                rounded
                class="bg-secondary text-white q-mt-md"
              />
            </q-card-actions>
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import JwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      link: 'http://localhost:3000/',
      picture1: '',
      picture: '',
      drawer: false,
      loading: false,
      editriwayat: false,
      action: false,
      editdata: true,
      editon: true,
      profile: {
        id_perusahaan: '',
        nama: '',
        pemilik: '',
        provinsi: '',
        email: '',
        alamat: '',
        kota: '',
        web: ''
      }
    }
  },
  mounted () {
  },
  async created () {
    let token = this.$q.localStorage.getItem('dataperusahaan')
    let userdata = JwtDecode(token)
    this.profile = userdata.profile
    this.picture = userdata.profile.logo
  },
  methods: {
    closedialog () {
      this.action = false
      this.refresh()
    },
    cancel () {
      this.picture1 = ''
      this.refresh()
    },
    refresh () {
      let token = this.$q.localStorage.getItem('dataperusahaan')
      let userdata = JwtDecode(token)
      this.profile = userdata.profile
      this.picture = userdata.profile.logo
      this.action = false
    },
    onSubmit () {
      const token = this.$q.localStorage.getItem('dataperusahaan')
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
              this.$axios.post('/perusahaan/editdataperusahaannologo?id_perusahaan=' + this.profile.id_perusahaan, this.profile, {
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
                    this.$q.localStorage.set('dataperusahaan', res.data.results.token)
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
                  console.log(e)
                })
            } catch (error) {
              console.log(error)
            }
          } else {
            const formdata = new FormData()
            formdata.append('logo', this.picture1, this.profile.id_perusahaan + '.PNG')
            formdata.append('id_perusahaan', this.profile.id_perusahaan)
            formdata.append('nama', this.profile.nama)
            formdata.append('pemilik', this.profile.pemilik)
            formdata.append('provinsi', this.profile.provinsi)
            formdata.append('email', this.profile.email)
            formdata.append('alamat', this.profile.alamat)
            formdata.append('kota', this.profile.kota)
            formdata.append('web', this.profile.web)
            formdata.append('contact', this.profile.contact)
            this.$axios.post('/perusahaan/update?id_perusahaan=' + this.profile.id_perusahaan, formdata, {
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
                  this.$q.localStorage.set('dataperusahaan', res.data.results.token)
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
    selectFoto (foto) {
      this.picture1 = this.$refs.picture1.$refs.input.files[0]
      console.log(this.picture1)
    }
  }
}
</script>

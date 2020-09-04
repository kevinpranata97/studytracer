<template>
<div class =row>
 <div class="col-md-6 col-xs-12">
    <q-card :flat="$q.platform.is.mobile" class="bg-orange text-black no-margin full-height full" style="width: 880px">
        <q-card-section :hidden="$q.platform.is.mobile" class="bg-orange">
            <q-list>
             <q-item >
              <q-item-section>
               <div class="text-h5 text-black">{{ editon ? 'Profile' : 'Edit Profile' }}</div>
              </q-item-section>
              <q-item-section side top>
                <div class="text-h6 text-blue-grey-14">
                  <q-btn @click="editon = false" icon="edit" color="white" class="text-orange" round v-if="editon">
                    <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-black text-caption">Update Profile</div>
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
                class="text-black"
                >
                  <q-tab name="profile" icon="work" label="Company" @click="editon = true" />
                </q-tabs>
              </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
              >
                <q-tab-panel name="profile">
                    <q-card-section>
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-input borderless readonly dense maxlength="8" v-model="profile.id_perusahaan" label="ID :" />
                                    <q-input borderless dense maxlength="40" v-model="profile.nama" label="Nama Perusahaan :" :readonly="editon"></q-input>
                                    <q-input borderless dense maxlength="40" v-model="profile.pemilik" label="Pemilik :" :readonly="editon"></q-input>
                                    <q-input borderless dense maxlength="20" v-model="profile.web" label="Web :" :readonly="editon"></q-input>
                                    <q-input borderless dense mask="############" maxlength="12" v-model="profile.contact" label="Contact :" :readonly="editon" ></q-input>
                                    <q-input borderless maxlength="50" v-model="profile.email" label="Email :" :rules="[val => val.includes('@gmail.com') || 'Please insert Email correctly']" :readonly="editon"></q-input>
                                    <q-input borderless dense maxlength="30" v-model="profile.provinsi" label="Provinsi :" :readonly="editon"></q-input>
                                <q-input borderless dense maxlength="25" v-model="profile.kota" label="Kota :" :readonly="editon"></q-input>
                                <q-input type="textarea" borderless dense v-model="profile.alamat" label="Alamat :" :readonly="editon"></q-input>
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
                            <q-btn label="Save" rounded class="bg-orange text-black q-mt-md" @click="submit()" v-if="editon === false"/>
                            <q-btn label="Cancel" @click="cancel()" rounded class="bg-orange text-black q-mt-md" v-if="editon === false" />
                        </q-card-actions>
                    </q-card-section>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
    </q-card>
 </div>
</div>
</template>
<script>
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
      date: '',
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
    cancel () {
      this.editon = true
      this.picture1 = ''
      this.refresh()
    },
    refresh () {
      let token = this.$q.localStorage.getItem('dataperusahaan')
      let userdata = JwtDecode(token)
      this.profile = userdata.profile
      this.picture = userdata.profile.logo
      this.editon = true
    },
    submit () {
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
                  console.log(res.data.results.token)
                  this.$q.localStorage.set('dataperusahaan', res.data.results.token)
                  this.$q.notify({
                    message: res.data.results.msg,
                    color: 'positive',
                    icon: 'checkmark'
                  })
                  this.editon = false
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

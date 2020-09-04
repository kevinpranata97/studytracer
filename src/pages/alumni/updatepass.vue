<template>
<div class="row">
  <div class="col-md-6 col-xs-12">
    <q-card class="bg-white text-black no-margin full-height full" :style="$q.platform.is.mobile ? '' : 'width: 850px'">
        <q-card-section :hidden="$q.platform.is.mobile" class="bg-teal">
            <q-list>
             <q-item >
              <q-item-section>
               <div class="text-h5 text-white">Update Password</div>
              </q-item-section>
             </q-item>
            </q-list>
        </q-card-section>
        <q-card-section>
            <q-space/>
            <label>Old Password: </label>
            <q-input v-model="pass" dense filled type="password" class="q-pt-lg"/>
            <label>New Password: </label>
            <q-input v-model="passbaru" dense filled type="password" class="q-pt-lg"/>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn @click="changepass()" label="Change Password" rounded flat color="secondary"/>
        </q-card-actions>
    </q-card>
  </div>
</div>
</template>
<script>
import { LocalStorage } from 'quasar'
import JwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      passbaru: '',
      pass: ''
    }
  },
  created () {
  },
  methods: {
    changepass () {
      const a = LocalStorage.getItem('datauser')
      const b = JwtDecode(a)
      this.$axios.post('/alumni/updatepass', {
        npm: b.profile.npm,
        pass: this.pass,
        passbaru: this.passbaru
      }, {
        headers: {
          'x-access-token': a
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
            this.$q.notify({
              message: res.data.results.msg,
              color: 'positive',
              icon: 'checkmark'
            })
            this.passbaru = ''
            this.pass = ''
          }
        })
    }
  }
}
</script>

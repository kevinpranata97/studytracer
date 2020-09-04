<template>
<q-page padding>
<div class="row">
  <div class="col-md-6 col-xs-12">
    <q-card class="bg-white text-black no-margin full-height full" :style="$q.platform.is.mobile ? '' : 'width: 850px'">
        <q-card-section :hidden="$q.platform.is.mobile" class="bg-grey-4">
            <q-list>
             <q-item >
              <q-item-section>
               <div class="text-h5 text-black">Update Password</div>
              </q-item-section>
             </q-item>
            </q-list>
        </q-card-section>
        <q-card-section>
            <q-space/>
            <label>User ID/NPM: </label>
            <q-input v-model="id" dense filled maxlength="12" />
            <label>Password: </label>
            <q-input v-model="pass" dense filled type="password" class="q-pt-lg"/>
        </q-card-section>
        <q-card-actions>
            <q-btn @click="changepass()" label="Change Password" rounded flat color="secondary"/>
        </q-card-actions>
    </q-card>
  </div>
</div>
</q-page>
</template>
<script>
import { LocalStorage } from 'quasar'
export default {
  data () {
    return {
      id: '',
      pass: ''
    }
  },
  created () {
  },
  methods: {
    changepass () {
      const a = LocalStorage.getItem('dataadmin')
      this.$axios.post('/admin/updatepass', {
        id: this.id,
        pass: this.pass
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
            this.id = ''
            this.pass = ''
          }
        })
    }
  }
}
</script>

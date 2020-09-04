<template>
  <q-page padding class="items-center justify-center">
      <div class="row fixed-center full-width">
        <div class="col-md-4 offset-md-4 col-xs-12 q-pb-lg q-pl-md q-pr-md q-pt-sm">
          <q-card class="my-card bg-white text-black">
            <q-card-section class="text-center">
              <img src="~assets/Logo-ubl.png" style="height: 120px;max-width: 150px;"/>
            </q-card-section>
            <q-card-section>
              <div class="text-black text-center text-h4" v-if="registermode === false">Tracer Study</div>
              <div class="text-black text-center text-h4" v-if="registermode">Register</div>
              <div class="text-black text-h14 text-center" v-if="registermode">You have to be registered by admin to register in this website</div>
              <div class="text-black text-center text-subtitle1 " v-if="registermode === false">Login</div>
            </q-card-section>
            <q-card-section>
              <q-input v-model="form.id" label="UserID/NPM" maxlength="8">
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input  type="password" class="q-pt-lg" v-model="form.pass" label="Password" maxlength="8" v-on:keyup.enter="login1()">
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input v-if="registermode" type="password" class="q-pt-lg" v-model="passdupe" label="Re write your Password" maxlength="8" :rules="[val => val == form.pass || 'Password does not match']" v-on:keyup.enter="register()">
                <template v-slot:append>
                  <q-icon name="lock" v-if="registermode" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <div class="row q-col-gutter-xs">
                <div class="col-md-5 col-xs-12 col-sm-12">
                  <!-- <router-link style="text-decoration:none;color:teal;" to="/register">Lupa Password ?</router-link> -->
                </div>
                <div class="col-md-4 col-xs-12 col-sm-12">
                </div>
                <div class="col-md-4 col-xs-12 col-sm-12">
                  <q-btn class="full-width" rounded flat :loading="loading" @click="registermode = true" color="secondary" label="Register" v-if="registermode === false"/>
                  <q-btn class="full-width" rounded flat :loading="loading" @click="registermode = false" color="negative" label="back" v-if="registermode" />
                </div>
                <div class="col-md-3 col-xs-12 col-sm-12">
                  <q-btn class="full-width" rounded :loading="loading" color="secondary" @click="login()" label="Login" v-if="registermode === false" />
                  <q-btn class="full-width" rounded :loading="loading" color="secondary" @click="register()" label="Register" v-if="registermode" />
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn class="full-width bg-white text-black" rounded :loading="loading" color="secondary" to="findme" label="Forget your npm?" />
            </q-card-section>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      registermode: false,
      loading: false,
      form: {
        id: '',
        pass: ''
      },
      passdupe: ''
    }
  },
  created () {
  },
  methods: {
    login1 () {
      if (this.registermode === true) {
        this.register()
      } else {
        this.login()
      }
    },
    register () {
      if (this.form.id === '' || this.form.pass === '') {
        this.showNotif('Username/Password must be Filled', 'red')
        return
      }
      this.$axios.post('signup', {
        id: this.form.id,
        pass: this.form.pass
      })
        .then(res => {
          if (res.data.results) {
            if (res.data.results.status === true) {
              this.showNotif(res.data.results.msg, 'green')
              this.login()
            } else {
              this.showNotif(res.data.results.msg, 'red')
            }
          } else {
            this.showNotif(res.message, 'red')
          }
        })
        .catch((e) => {
          console.log(e)
          this.showNotif('User cannot be Found Please contact Admin for more detail', 'red')
        })
    },
    login () {
      if (this.form.id === '' || this.form.pass === '') {
        this.showNotif('Username/Password Tidak Boleh Kosong', 'red')
        return
      }
      this.$axios.post('signin', {
        id: this.form.id,
        pass: this.form.pass
      })
        .then(res => {
          if (res.data.results) {
            console.log('ada')
            if (res.data.results.user.status === '02') {
              console.log(localStorage)
              this.$q.localStorage.set('dataperusahaan', res.data.results.token)
              this.$router.push('perusahaan')
              this.showNotif('Login as Company', 'green')
            } else if (res.data.results.user.status === '01') {
              this.$q.localStorage.set('datauser', res.data.results.token)
              this.$router.push('alumni')
              this.showNotif('Login as Alumni', 'green')
            } else {
              this.$q.localStorage.set('dataadmin', res.data.results.token)
              this.$router.push('dataalumni')
              this.showNotif('Login as Admin', 'green')
            }
          } else {
            this.showNotif(res.message, 'red')
          }
        })
        .catch((e) => {
          console.log(e)
          this.showNotif('User cannot be Found Please Register First', 'red')
        })
    },
    showNotif (message, jenis) {
      this.$q.notify({
        message: message,
        color: jenis,
        timeout: 2000,
        actions: [{ icon: 'close', color: 'white' }]
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

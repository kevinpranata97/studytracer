<template>
<div class="q-pa-md">
  <q-layout view="hHh lpR fff">
    <q-header :elevated="left" reveal :bordered="$q.platform.is.desktop"  class="bg-white text-teal" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
          <q-toolbar-title shrink class="text-teal desktop-only">Alumni</q-toolbar-title>
          <q-toolbar-title shrink class="text-teal text-center text-h6 mobile-only">Alumni</q-toolbar-title>
          <q-space/>
          <q-btn rounded color="white" round class="text-teal" >
            <q-avatar rounded size="38px">
              <div class="text-h6 text-blue-grey-14">
              <q-icon class="desktop-only" name="person" color="secondary"/>
              <q-icon class="mobile-only" name="far fa-user" color="secondary"/>
              </div>
            </q-avatar>
            <q-menu transition-show="flip-left" transition-hide="flip-right" auto-close>
              <q-list style="min-width: 240px">
                <q-item class="desktop-only" clickable to="profile2" active-class="text-secondary">
                  <q-item-section avatar>
                   <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="mobile-only" clickable to="profilem2" active-class="text-secondary">
                  <q-item-section avatar>
                   <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable to="updatepass2" active-class="text-secondary">
                  <q-item-section avatar>
                    <q-icon name="edit"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Update Password</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable @click="logout()" active-class="text-secondary">
                  <q-item-section avatar>
                    <q-icon name="fas fa-sign-out-alt"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-negative">Log Out</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer elevated overlay v-model="left" side="left" content-class="bg-white text-black" bordered :width="250" show-if-above :breakpoint="500">
        <q-list padding>
          <q-item to="alumni" exact active-class="text-secondary">
            <q-item-section avatar>
            <q-icon name="home"/>
            </q-item-section>
            <q-item-section>
            Home
            </q-item-section>
          </q-item>
          <q-item class="mobile-only" to="riwayat2" exact active-class="text-secondary">
            <q-item-section avatar>
            <q-icon name="work"/>
            </q-item-section>
            <q-item-section>
            Riwayat
            </q-item-section>
          </q-item>
          <q-item to="profilem2" class="mobile-only" exact @click="check()" active-class="text-secondary">
            <q-item-section avatar>
            <q-icon name="person"/>
            </q-item-section>
            <q-item-section>
             Profile
            </q-item-section>
          </q-item>
          <q-item to="profile2" class="desktop-only" exact @click="check()" active-class="text-secondary">
            <q-item-section avatar>
            <q-icon name="person"/>
            </q-item-section>
            <q-item-section>
             Profile
            </q-item-section>
          </q-item>
          <q-item to="kuisioner2" exact active-class="text-secondary">
            <q-item-section avatar>
            <q-icon name="edit"/>
            </q-item-section>
            <q-item-section>
             Kuisioner Alumni
            </q-item-section>
          </q-item>
          <q-item @click="logout()" clickable active-class="text-negative">
            <q-item-section avatar>
            <q-icon name="fas fa-sign-out-alt"/>
            </q-item-section>
            <q-item-section class="text-negative">
            Log out
            </q-item-section>
          </q-item>
        </q-list>
    </q-drawer>
      <q-page-container>
        <q-page padding class="flex flex-center">
        <router-view></router-view>
        </q-page>
      </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
    </q-footer>
  </q-layout>
</div>
</template>

<script>
import JwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      path: 'http://localhost:3000/',
      left: false,
      label: 'NPM: ',
      npm: '',
      user: {
        picture: '',
        name: '',
        id: ''
      }
    }
  },
  async created () {
    let token = this.$q.localStorage.getItem('datauser')
    let userdata = JwtDecode(token)
    this.user.picture = userdata.profile.picture
    this.user.name = userdata.profile.name
    this.user.id = userdata.profile.npm
  },
  methods: {
    check () {
      console.log(localStorage)
    },
    logout () {
      this.$router.push('/')
      this.$q.localStorage.clear('datauser')
    }
  }
}
</script>

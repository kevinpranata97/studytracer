<template>
<div class="q-pa-md">
  <q-layout view="hHh lpR fff">
    <q-header elevated reveal bordered class="bg-orange text-black" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"  />
          <q-toolbar-title shrink class="text-black desktop-only">Company</q-toolbar-title>
          <q-toolbar-title shrink class="text-black text-center text-h6 mobile-only">Company</q-toolbar-title>
          <q-space/>
          <q-btn rounded color="black" class="text-white">
            <q-avatar rounded size="38px">
              <div class="text-h6 text-blue-grey-14">
              <q-icon class="desktop-only" name="work" color="orange"/>
              <q-icon class="mobile-only" name="work" color="orange"/>
              </div>
            </q-avatar>
            <q-menu transition-show="flip-right" transition-hide="flip-left" auto-close>
              <q-list style="min-width: 240px">
                <q-item class="desktop-only" clickable to="profile1" active-class="text-orange">
                  <q-item-section avatar>
                    <q-icon name="work"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="mobile-only" clickable to="profilem1" active-class="text-orange">
                  <q-item-section avatar>
                    <q-icon name="work"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable to="updatepass1" active-class="text-orange">
                  <q-item-section avatar>
                    <q-icon name="edit"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Update Password</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable @click="logout()" active-class="text-orange">
                  <q-item-section avatar>
                    <q-icon name="fas fa-sign-out-alt"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-negative">Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer overlay elevated v-model="left" side="left" content-class="bg-black text-white" bordered :width="250" show-if-above :breakpoint="500">
        <q-list padding>
          <q-item to="perusahaan" exact>
            <q-item-section avatar>
            <q-icon name="home"/>
            </q-item-section>
            <q-item-section>
            Home
            </q-item-section>
          </q-item>
          <q-item to="profilem1" class="mobile-only">
            <q-item-section avatar>
            <q-icon name="work"/>
            </q-item-section>
            <q-item-section>
            Profile
            </q-item-section>
          </q-item>
          <q-item to="profile1" class="desktop-only">
            <q-item-section avatar>
            <q-icon name="work"/>
            </q-item-section>
            <q-item-section>
            Profile
            </q-item-section>
          </q-item>
          <q-item to="kuisioner1" exact>
            <q-item-section avatar>
            <q-icon name="edit"/>
            </q-item-section>
            <q-item-section>
            Kuisioner
            </q-item-section>
          </q-item>
          <q-item clickable @click="logout()">
            <q-item-section avatar>
            <q-icon name="fas fa-sign-out-alt"/>
            </q-item-section>
            <q-item-section >
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
export default {
  data () {
    return {
      left: false
    }
  },
  async created () {
  },
  methods: {
    logout () {
      this.$router.push('/')
      this.$q.localStorage.clear('dataperusahaan')
    }
  }
}
</script>

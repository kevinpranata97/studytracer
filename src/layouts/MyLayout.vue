<template>
<div class="q-pa-md">
  <q-layout view="hHh lpR fff">
    <q-header :elevated="left" reveal bordered class="bg-black text-white" height-hint="98">
      <q-toolbar>
        <q-btn  dense flat round icon="menu" @click="left = !left" />
          <q-toolbar-title shrink class="text-white desktop-only">Admin</q-toolbar-title>
          <q-toolbar-title shrink class="text-white text-center text-h6 mobile-only">Study Tracer</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer elevated v-model="left" side="left" content-class="bg-white text-black" overlay bordered :width="250" show-if-above :breakpoint="500">
        <q-list padding>
          <q-item to="dataalumni" exact @click="cektoken()">
            <q-item-section avatar>
            <q-icon name="group"/>
            </q-item-section>
            <q-item-section>
            Data Alumni
            </q-item-section>
          </q-item>
          <q-item to="dataperusahaan" exact>
            <q-item-section avatar>
            <q-icon name="work"/>
            </q-item-section>
            <q-item-section>
            Data Perusahaan
            </q-item-section>
          </q-item>
          <q-item to="grafik" exact>
            <q-item-section avatar>
            <q-icon name="equalizer"/>
            </q-item-section>
            <q-item-section>
            Grafik Kuisioner
            </q-item-section>
          </q-item>
          <q-item to="editkuis" exact>
            <q-item-section avatar>
            <q-icon name="edit"/>
            </q-item-section>
            <q-item-section>
            Edit Kuis
            </q-item-section>
          </q-item>
          <q-item to="updatepass" exact>
            <q-item-section avatar>
            <q-icon name="edit"/>
            </q-item-section>
            <q-item-section>
            Update Pass
            </q-item-section>
          </q-item>
          <q-item clickable @click="logout()">
            <q-item-section avatar>
            <q-icon name="fas fa-sign-out-alt"/>
            </q-item-section>
            <q-item-section>
            Log out
            </q-item-section>
          </q-item>
        </q-list>
    </q-drawer>
      <q-page-container :class="left ? 'bg-white' : 'bg-white q-mb-xl'">
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
    home () {},
    cektoken () {
      console.log(localStorage)
    },
    logout () {
      this.$router.push('/')
      this.$q.localStorage.clear('dataadmin')
    }
  }
}
</script>

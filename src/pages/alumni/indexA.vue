<template>
  <q-page padding>
      <div class="row">
      <q-carousel
      animated
      v-model="header"
      arrows
      navigation
      navigation-icon="minimize"
      infinite
      autoplay
      swipeable
      style="width:100%;height:100%"
      class="bg-teal text-white"
      >
      <q-carousel-slide class="column no-wrap flex-center" name="style" @click="to1()">
        <q-icon name="people" size="56px"/>
        <div class="q-mt-md text-center">
            {{ text1 }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide class="column no-wrap flex-center" name="style1" @click="to()">
          <q-icon name="local_library" size="56px"/>
          <div class="q-mt-md text-center">
            {{ text2 }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide class="column no-wrap flex-center" name="style2" @click="to2()" v-if="$q.platform.is.mobile">
          <q-icon name="work" size="56px"/>
          <div class="q-mt-md text-center">
            {{ text3 }}
        </div>
      </q-carousel-slide>
      </q-carousel>
      <q-separator/>
      <q-card square flat class="bg-white">
          <q-card-section class="bg-white text-teal">
              <div class="q-mt-md text-left text-h4">
                Welcome {{ user }},
              </div>
          </q-card-section>
          <q-card-section class="bg-white text-teal">
              <div class="q-mt-md text-left text-h6">
                Thanks for sign in on this website please fill questionare and profile so we can collect more data about you and your opinion and still connect with you
              </div>
          </q-card-section>
          <q-separator/>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import JwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      user: '',
      tab: 'status',
      header: 'style',
      style: '',
      text1: 'Check Profile you can fill profile to indentify yourself more so we can know about you more',
      text3: 'Check Riwayat you can fill riwayat to indentify yourself more so we can know about you more',
      text2: 'Check questionare you can fill questionare to share your opinion more so we can know about you more'
    }
  },
  mounted () {
  },
  async created () {
    const a = localStorage.getItem('datauser')
    const b = JwtDecode(a)
    this.user = b.profile.nama
  },
  methods: {
    to1 () {
      if (this.$q.platform.is.mobile) {
        this.$router.push('profilem2')
      } else {
        this.$router.push('profile2')
      }
    },
    to () {
      this.$router.push('kuisioner2')
    },
    to2 () {
      this.$router.push('riwayat2')
    }
  }
}
</script>

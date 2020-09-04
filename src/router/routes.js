
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/dataalumni', component: () => import('pages/admin/dataalumni.vue'), meta: { requiredAdmin: true } },
      { path: '/dataperusahaan', component: () => import('pages/admin/dataperusahaan.vue'), meta: { requiredAdmin: true } },
      { path: '/updatepass', component: () => import('pages/admin/updatepass.vue'), meta: { requiredAdmin: true } },
      { path: '/editkuis', component: () => import('pages/admin/editkuis.vue'), meta: { requiredAdmin: true } },
      { path: '/grafik', component: () => import('pages/admin/kuisionergraph.vue'), meta: { requiredAdmin: true } }
    ]
  },
  {
    path: '/alumni',
    component: () => import('layouts/layoutalumni.vue'),
    children: [
      { path: '/riwayat2', component: () => import('pages/alumni/riwayatmobile.vue'), meta: { requiredAuth: true } },
      { path: '', component: () => import('pages/alumni/indexA.vue'), meta: { requiredAuth: true } },
      { path: '/profile2', component: () => import('pages/alumni/profile.vue'), meta: { requiredAuth: true } },
      { path: '/profilem2', component: () => import('pages/alumni/profilemobile.vue'), meta: { requiredAuth: true } },
      { path: '/updatepass2', component: () => import('pages/alumni/updatepass.vue'), meta: { requiredAuth: true } },
      { path: '/kuisioner2', component: () => import('pages/alumni/kuisionerA.vue'), meta: { requiredAuth: true } }
    ]
  },
  {
    path: '/perusahaan',
    component: () => import('layouts/layoutperusahaan.vue'),
    children: [
      { path: '', component: () => import('pages/perusahaan/indexP.vue'), meta: { requiredPerusahaan: true } },
      { path: '/updatepass1', component: () => import('pages/perusahaan/updatepass.vue'), meta: { requiredPerusahaan: true } },
      { path: '/kuisioner1', component: () => import('pages/perusahaan/kuisionerP.vue'), meta: { requiredPerusahaan: true } },
      { path: '/profile1', component: () => import('pages/perusahaan/profile.vue'), meta: { requiredPerusahaan: true } },
      { path: '/profilem1', component: () => import('pages/perusahaan/profilemobile.vue'), meta: { requiredPerusahaan: true } }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Guest.vue'),
    children: [
      {
        path: '', component: () => import('pages/login.vue')
      },
      {
        path: 'findme', component: () => import('pages/findme.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

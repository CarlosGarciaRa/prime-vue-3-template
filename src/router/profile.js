import AppLayout from '@/layout/AppLayout.vue';

export default [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/mi-perfil',
        name: 'myProfile',
        component: () => import('@/views/pages/profile/Profile.vue'),
        meta: { requiresAuth: true },
        props: (route) => ({ key: route.name })
      },
      {
        path: '/mi-perfil/editar',
        name: 'editMyProfile',
        component: () => import('@/views/pages/profile/EditProfile.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/perfil/:username',
        name: 'userProfile',
        component: () => import('@/views/pages/profile/Profile.vue'),
        meta: { requiresAuth: false },
        props: (route) => ({ key: route.name })
      }
    ]
  }
];

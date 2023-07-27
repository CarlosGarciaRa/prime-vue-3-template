import AppLayout from '@/layout/AppLayout.vue';

export default [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/lenguajes-de-programacion',
        name: 'programmingLanguages',
        component: () => import('@/views/pages/programming-languages/ProgrammingLanguages.vue')
      },
      {
        path: '/lenguajes-de-programacion/nuevo',
        name: 'addProgrammingLanguage',
        component: () => import('@/views/pages/programming-languages/CreateProgrammingLanguage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
];

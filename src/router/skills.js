import AppLayout from '@/layout/AppLayout.vue';

export default [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/habilidades',
        name: 'skills',
        component: () => import('@/views/pages/skills/Skills.vue')
      },
      {
        path: '/habilidades/nuevo',
        name: 'addSkill',
        component: () => import('@/views/pages/skills/CreateSkill.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
];

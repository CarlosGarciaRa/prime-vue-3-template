import AppLayout from '@/layout/AppLayout.vue';

export default [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/proyectos/nuevo',
        name: 'addProject',
        component: () => import('@/views/pages/projects/CreateProject.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/proyectos/:id/editar',
        name: 'editProject',
        component: () => import('@/views/pages/projects/CreateProject.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
];

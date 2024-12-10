import { createRouter, createWebHistory } from 'vue-router';
import CreateBuild from './createBuild.vue';
import GetBuilds from './getBuilds.vue';
import DeleteByID from './deleteByID.vue';
import LoginForm from './loginForm.vue';
import searchByID from './getBuildByName.vue';
import updateBuild from './updateBuild.vue';

const routes = [
  { path: '/mostrar', component: GetBuilds, name: 'getBuilds' }, 
  { path: '/crear', component: CreateBuild, name: 'crear' },
  { path: '/buscar', component: DeleteByID, name: 'buscar' },
  { path: '/modificar', component: updateBuild, name: 'modificar' },
  { path: '/eliminar', component: DeleteByID, name: 'eliminar' },
  { path: '/logueo', component: LoginForm, name: 'logueo' },
  { path: '/byID', component: searchByID, name: 'byID'},
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

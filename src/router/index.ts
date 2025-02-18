import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../components/UserCard.vue';
import UserDetails from '../components/UserModal.vue';
import { RouteNames } from '../enums/route-names';

const routes = [
  {
    path: '/',
    name: RouteNames.UserDetails,
    component: UserList,
  },
  {
    path: '/user/:id',
    name: RouteNames.UserDetails,
    component: UserDetails,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

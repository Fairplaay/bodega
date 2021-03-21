import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/auth',
		name: 'auth',
		component: () => import('@/views/Auth.vue'),
		meta: { title: 'Autenticación', layout: false },
	},
	{
		path: '/',
		redirect: { name: 'prices' },
	},
	{
		path: '/prices',
		name: 'prices',
		component: () => import('@/views/Prices.vue'),
		meta: { title: 'Lista de precios', layout: true },
	},
];

const router = new VueRouter({
	routes,
});

export default router;

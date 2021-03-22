import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/auth',
		name: 'auth',
		component: () => import('@/views/Auth.vue'),
		meta: { title: 'Autenticación', layout: false, requiresAuth: false, isAdmin: false },
	},
	{
		path: '/',
		name: 'products',
		component: () => import('@/views/Products.vue'),
		meta: { title: 'Productos', layout: true, requiresAuth: false, isAdmin: false },
	},
	{
		path: '/prices',
		name: 'prices',
		component: () => import('@/views/Prices.vue'),
		meta: { title: 'Lista de precios', layout: true, requiresAuth: true, isAdmin: true },
	},
];

const router = new VueRouter({
	routes,
});

router.beforeEach(async (to, from, next) => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (user) next();
		else
			next({
				path: '/auth',
				params: { nextUrl: to.fullPath },
			});
	} else next();
});

export default router;

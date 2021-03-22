import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/Firebase';

Vue.use(Vuex);

const formatUser = user => {
	return {
		name: user.displayName,
		email: user.email,
		photoUrl: user.photoURL,
		emailVerified: user.emailVerified,
		uid: user.uid,
	};
};

export default new Vuex.Store({
	state: {
		user: null,
	},
	getters: {
		user(state) {
			return state.user;
		},
	},
	mutations: {
		setUser: (state, value) => (state.user = value),
	},
	actions: {
		async createUser(context, form) {
			let { user } = await auth.createUserWithEmailAndPassword(form.email, form.password);
			user = formatUser(user);
			context.commit('setUser', user);
			localStorage.setItem('user', JSON.stringify(user));
			return user;
		},
		async signIn(context, form) {
			let { user } = await auth.signInWithEmailAndPassword(form.email, form.password);
			user = formatUser(user);
			context.commit('setUser', user);
			localStorage.setItem('user', JSON.stringify(user));
			return user;
		},
	},
});

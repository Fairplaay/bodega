<template>
	<v-app>
		<v-app-bar v-if="$route.meta.layout" app color="primary" dark>
			{{ $route.meta.title }}
			<v-spacer></v-spacer>
			<v-btn text @click="logout">Salir</v-btn>
		</v-app-bar>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import { auth } from '@/Firebase';

export default {
	mounted() {
		auth.onAuthStateChanged(user => {
			if (user) console.log('ya ha ingresado');
			else console.log('ya ha salio');
		});
	},
	methods: {
		async logout() {
			await auth.signOut();
			this.$router.push({ name: 'auth' });
		},
	},
};
</script>

<style>
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
	> .v-input__control
	> .v-input__slot
	fieldset {
	color: #e0e0e0 !important;
}

.theme--light.v-label {
	font-weight: 500;
	color: #54565a;
}
.v-text-field.v-text-field--enclosed {
	border-radius: 10px;
	padding: 1px !important;
}

.v-btn i:hover {
	transform: scale(1.15);
}

.v-btn {
	text-transform: none !important;
}
</style>

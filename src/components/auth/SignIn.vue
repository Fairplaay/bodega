<template>
	<div>
		<v-row no-gutters>
			<v-col cols="12">
				<v-text-field
					v-model="form.email"
					label="Correo electronico"
					type="text"
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="12">
				<v-text-field
					v-model="form.password"
					label="Contraseña"
					type="password"
					outlined
				></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-btn block rounded color="primary" @click="onSubmit">Entra</v-btn>
			</v-col>
			<v-col cols="12">
				<GoogleBtn />
			</v-col>
		</v-row>
		<v-snackbar v-model="snackbar.show" :color="snackbar.color" top right>
			{{ snackbar.text }}
			<template v-slot:action="{ attrs }">
				<v-btn text v-bind="attrs" @click="snackbar.show = false"> Cerrar </v-btn>
			</template>
		</v-snackbar>
	</div>
</template>
<script>
import { auth } from '@/Firebase';
import GoogleBtn from '@/components/GoogleBtn';
export default {
	components: {
		GoogleBtn,
	},
	data() {
		return {
			snackbar: {
				show: false,
				color: '',
				text: '',
			},
			form: {
				email: '',
				password: '',
			},
		};
	},
	methods: {
		async onSubmit() {
			try {
				const userCredentials = await auth.signInWithEmailAndPassword(
					this.form.email,
					this.form.password
				);
				console.log(userCredentials, 'Signin');
				this.$router.push({ name: 'Products' });
			} catch (error) {
				this.snackbar = { text: error.message, color: 'error', show: true };
			}
		},
	},
};
</script>

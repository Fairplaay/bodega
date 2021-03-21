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
			<v-col cols="12">
				<v-text-field
					v-model="repeatPassword"
					label="Repite contraseña"
					type="password"
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="12">
				<v-btn block rounded color="primary" @click="onSubmit">Registrar</v-btn>
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

export default {
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
			repeatPassword: '',
		};
	},
	methods: {
		async onSubmit() {
			try {
				const { user } = await auth.createUserWithEmailAndPassword(
					this.form.email,
					this.form.password
				);
				localStorage.setItem(
					'user',
					JSON.stringify({
						name: user.displayName,
						email: user.email,
						photoUrl: user.photoURL,
						emailVerified: user.emailVerified,
						uid: user.uid,
					})
				);
			} catch (error) {
				this.snackbar = { text: error.message, color: 'error', show: true };
			}
		},
	},
};
</script>

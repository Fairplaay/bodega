<template>
	<div>
		<v-form @submit.prevent="onSubmit">
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
					<v-btn :loading="loading" block rounded color="primary" type="submit">
						Entra
					</v-btn>
				</v-col>
				<v-col cols="12">
					<GoogleBtn />
				</v-col>
			</v-row>
		</v-form>
		<v-snackbar v-model="snackbar.show" :color="snackbar.color" top right>
			{{ snackbar.text }}
			<template v-slot:action="{ attrs }">
				<v-btn text v-bind="attrs" @click="snackbar.show = false"> Cerrar </v-btn>
			</template>
		</v-snackbar>
	</div>
</template>
<script>
import GoogleBtn from '@/components/GoogleBtn';
import { mapActions } from 'vuex';

export default {
	components: {
		GoogleBtn,
	},
	data() {
		return {
			loading: false,
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
				this.loading = true;
				const user = await this.signIn(this.form);
				if (user) this.$router.push({ name: 'products' });
			} catch (error) {
				this.snackbar = { text: error.message, color: 'error', show: true };
			} finally {
				this.loading = false;
			}
		},
		...mapActions({ signIn: 'signIn' }),
	},
};
</script>

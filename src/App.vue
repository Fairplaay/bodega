<template>
	<v-app>
		<v-app-bar app color="primary" dark> Bodega </v-app-bar>
		<v-main>
			<v-container>
				<v-row justity="space-between" align="center">
					<v-col>
						<v-text-field
							dense
							style="width: 300px"
							outlined
							label="Precio del dolar hoy"
							placeholder="Escriba el precio del dolar hoy"
							hide-details
						></v-text-field>
					</v-col>
					<v-col cols="4" class="text-right">
						<v-btn color="primary" @click="dialog = true"> Nuevo producto </v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title class="headline primary white--text">Nuevo producto</v-card-title>
				<v-card-text class="mt-4 pb-0">
					<v-text-field
						v-model="name"
						label="Nombre del producto"
						dense
						outlined
					></v-text-field>
					<v-text-field
						v-model="price"
						type="number"
						dense
						outlined
						label="Precio"
					></v-text-field>
					<v-text-field
						v-model="cant"
						type="number"
						dense
						outlined
						label="Cantidad"
					></v-text-field>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-btn color="error" text @click="dialog = false">Cerrar</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="success" text @click="save">Guardar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-app>
</template>

<script>
import { validationMixin } from 'vuelidate';
const { required, number } = require('vuelidate/lib/validators');

export default {
	name: 'App',
	mixins: [validationMixin],
	data: () => ({
		dialog: false,
		name: '',
		price: 0,
		cant: 0,
	}),
	methods: {
		save() {
			alert('guardando...');
		},
	},
	validations: {
		name: {
			required,
		},
		price: {
			number,
		},
		cant: {
			number,
		},
	},
};
</script>

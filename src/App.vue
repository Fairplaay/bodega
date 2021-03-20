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
				<v-row>
					<v-col cols="12">
						<v-data-table
							:headers="headers"
							:items="items"
							:items-per-page="5"
							class="elevation-1"
						></v-data-table>
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
						:error-messages="nameErrors"
						@input="$v.name.$touch()"
						@blur="$v.name.$touch()"
					></v-text-field>
					<v-text-field
						v-model="price"
						type="number"
						dense
						outlined
						label="Precio"
						placeholder="Al mayor en dolar"
						:error-messages="priceErrors"
						@input="$v.price.$touch()"
						@blur="$v.price.$touch()"
					></v-text-field>
					<v-text-field
						v-model="cant"
						type="number"
						dense
						outlined
						label="Cantidad"
						:error-messages="cantErrors"
						@input="$v.cant.$touch()"
						@blur="$v.cant.$touch()"
					></v-text-field>
					<v-text-field
						v-model="measure"
						type="text"
						dense
						outlined
						label="Medida ej: 50gr, 1kg, 1Lts"
						:error-messages="measureErrors"
						@input="$v.measure.$touch()"
						@blur="$v.measure.$touch()"
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
const { required, minLength, maxLength } = require('vuelidate/lib/validators');

export default {
	name: 'App',
	mixins: [validationMixin],
	data: () => ({
		dialog: false,
		name: '',
		price: null,
		cant: null,
		measure: null,
		headers: [
			{
				text: 'Dessert (100g serving)',
				align: 'start',
				sortable: false,
				value: 'name',
			},
			{ text: 'Calories', value: 'calories' },
			{ text: 'Fat (g)', value: 'fat' },
			{ text: 'Carbs (g)', value: 'carbs' },
			{ text: 'Protein (g)', value: 'protein' },
			{ text: 'Iron (%)', value: 'iron' },
		],
		items: [],
	}),
	computed: {
		nameErrors() {
			const errors = [];
			if (!this.$v.name.$dirty) return errors;
			!this.$v.name.required && errors.push('Campo requerido');
			!this.$v.name.minLength && errors.push('Minimo 4 Caracteres');
			!this.$v.name.maxLength && errors.push('Maximo 100 Caracteres');
			return errors;
		},
		priceErrors() {
			const errors = [];
			if (!this.$v.price.$dirty) return errors;
			!this.$v.price.required && errors.push('Campo requerido');
			return errors;
		},
		cantErrors() {
			const errors = [];
			if (!this.$v.cant.$dirty) return errors;
			!this.$v.cant.required && errors.push('Campo requerido');
			return errors;
		},
		measureErrors() {
			const errors = [];
			if (!this.$v.measure.$dirty) return errors;
			!this.$v.measure.required && errors.push('Campo requerido');
			return errors;
		},
	},
	methods: {
		save() {
			alert('guardando...');
		},
	},
	validations: {
		name: {
			required,
			minLength: minLength(4),
			maxLength: maxLength(100),
		},
		price: {
			required,
		},
		cant: {
			required,
		},
		measure: {
			required,
		},
	},
};
</script>

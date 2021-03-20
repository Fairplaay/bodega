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
							type="number"
							@change="setDolar"
						>
							<template v-slot:append-outer>
								<v-btn text small>
									<span>Establecer</span>
								</v-btn>
							</template>
						</v-text-field>
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
						>
							<template v-slot:[`item.total_dolar`]="{ item }">
								<span class="text-capitalize"> {{ item.cant / dolar }} </span>
							</template></v-data-table
						>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title class="headline primary white--text">Nuevo producto</v-card-title>
				<v-card-text class="mt-4 pb-0">
					<v-text-field
						v-model="form.name"
						label="Nombre del producto"
						dense
						outlined
						:error-messages="nameErrors"
						@input="$v.form.name.$touch()"
						@blur="$v.form.name.$touch()"
					></v-text-field>
					<v-text-field
						v-model="form.price"
						type="number"
						dense
						outlined
						label="Precio"
						placeholder="Al mayor en dolar"
						:error-messages="priceErrors"
						@input="$v.form.price.$touch()"
						@blur="$v.form.price.$touch()"
					></v-text-field>
					<v-text-field
						v-model="form.cant"
						type="number"
						dense
						outlined
						label="Cantidad"
						:error-messages="cantErrors"
						@input="$v.form.cant.$touch()"
						@blur="$v.form.cant.$touch()"
					></v-text-field>
					<v-text-field
						v-model="form.measure"
						type="text"
						dense
						outlined
						label="Medida ej: 50gr, 1kg, 1Lts"
						:error-messages="measureErrors"
						@input="$v.form.measure.$touch()"
						@blur="$v.form.measure.$touch()"
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
import { db } from '@/Firebase';

export default {
	name: 'App',
	mixins: [validationMixin],
	firebase: {
		products: db.collection('products'),
	},
	data: () => ({
		dolar: 0,
		dialog: false,
		form: {
			name: '',
			price: null,
			cant: null,
			measure: null,
		},
		headers: [
			{
				text: 'Nombre del product',
				align: 'start',
				sortable: false,
				value: 'name',
			},
			{ text: 'Precio', value: 'price' },
			{ text: 'Cantidad', value: 'cant' },
			{ text: 'Unidad de medida', value: 'measure' },
			{ text: 'Precio $', value: 'total_dolar' },
			{ text: 'Precio Bs', value: 'totral_bolivar' },
		],
		items: [],
	}),
	computed: {
		nameErrors() {
			const errors = [];
			if (!this.$v.form.name.$dirty) return errors;
			!this.$v.form.name.required && errors.push('Campo requerido');
			!this.$v.form.name.minLength && errors.push('Minimo 4 Caracteres');
			!this.$v.form.name.maxLength && errors.push('Maximo 100 Caracteres');
			return errors;
		},
		priceErrors() {
			const errors = [];
			if (!this.$v.form.price.$dirty) return errors;
			!this.$v.form.price.required && errors.push('Campo requerido');
			return errors;
		},
		cantErrors() {
			const errors = [];
			if (!this.$v.form.cant.$dirty) return errors;
			!this.$v.form.cant.required && errors.push('Campo requerido');
			return errors;
		},
		measureErrors() {
			const errors = [];
			if (!this.$v.form.measure.$dirty) return errors;
			!this.$v.form.measure.required && errors.push('Campo requerido');
			return errors;
		},
	},
	mounted() {
		db.collection('products').onSnapshot(querySnapshot => {
			this.items = [];
			querySnapshot.forEach(doc => {
				this.items.push(doc.data());
			});
		});
	},
	methods: {
		setDolar(price) {
			this.dolar = price;
		},
		async save() {
			await db.collection('products').add(this.form);
			this.clearInputs();
			this.dialog = false;
		},
		clearInputs() {
			this.form = {
				name: '',
				price: null,
				cant: null,
				measure: null,
			};
		},
	},
	validations: {
		form: {
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
	},
};
</script>

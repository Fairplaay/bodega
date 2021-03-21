<template>
	<v-container>
		<v-row justity="space-between" align="center">
			<v-col>
				<v-text-field
					v-model="dolar"
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
			<v-col cols="12" class="text--secondary title">
				Se ha establecido el precio del dolar a
				<span class="success--text title">{{ dolar }} BSF</span>
			</v-col>
		</v-row>
		<v-row no-gutters justify="end">
			<v-col cols="12" sm="6" md="3">
				<v-text-field
					v-model="search"
					dense
					style="width: 300px"
					outlined
					placeholder="Buscar"
					hide-details
					type="text"
				>
				</v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-data-table
					:loading="loading"
					:headers="headers"
					:items="items"
					:search="search"
					:items-per-page="10"
					class="elevation-1"
					loading-text="Cargando..."
					no-data-text="No hay productos"
				>
					<template v-slot:[`item.und_dolar`]="{ item }">
						<span class="text-capitalize"> {{ undPrice(item) }} </span>
					</template>
					<template v-slot:[`item.percent`]="{ item }">
						<span class="text-capitalize"> {{ item.percent }} </span>
					</template>
					<template v-slot:[`item.total_bolivar`]="{ item }">
						<span v-if="dolar" class="text-capitalize">
							{{ setPrice(item, 'bs') }}
						</span>
						<span v-else class="text-capitalize"> 0 </span>
					</template>
					<template v-slot:[`item.total_dolar`]="{ item }">
						<span v-if="dolar" class="text-capitalize">
							{{ (setPrice(item, 'bs') / dolar).toFixed(4) }}
						</span>
						<span v-else class="text-capitalize"> 0 </span>
					</template>
					<template v-slot:[`item.actions`]="{ item }">
						<v-btn icon @click="openDialogEdit(item)">
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-btn icon @click="deleteItem(item)">
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
		<v-dialog v-model="dialog" width="500" @click:outside="closeDialog">
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
						label="Precio al mayor en $"
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
					<v-text-field
						v-model="form.percent"
						type="text"
						dense
						outlined
						label="Porcentaje de ganancia"
						:error-messages="percentErrors"
						@input="$v.form.percent.$touch()"
						@blur="$v.form.percent.$touch()"
					></v-text-field>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-btn color="error" text @click="closeDialog">Cerrar</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="success" text @click="onSubmit">Guardar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-snackbar v-model="snackbar.show" :color="snackbar.color" top right>
			{{ snackbar.text }}
			<template v-slot:action="{ attrs }">
				<v-btn text v-bind="attrs" @click="snackbar.show = false"> Cerrar </v-btn>
			</template>
		</v-snackbar>
	</v-container>
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
		snackbar: {
			show: false,
			color: '',
			text: '',
		},
		search: '',
		dolar: 0,
		dialog: false,
		loading: false,
		form: {
			name: '',
			price: null,
			cant: null,
			measure: null,
			percent: 50,
		},
		headers: [
			{
				text: 'Nombre',
				align: 'start',
				sortable: false,
				value: 'name',
			},
			{ text: 'Cantidad', value: 'cant', sortable: false },
			{ text: 'Medida', value: 'measure', sortable: false },
			{ text: 'Precio al Mayor $', value: 'price', sortable: false },
			{ text: 'Precio x unidad $', value: 'und_dolar', sortable: false },
			{ text: '% Ganancia', value: 'percent', sortable: false },
			{ text: 'Precio venta $', value: 'total_dolar', sortable: false },
			{ text: 'Precio venta Bs', value: 'total_bolivar', sortable: false },
			{ text: 'Acciones', value: 'actions', sortable: false },
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
		percentErrors() {
			const errors = [];
			if (!this.$v.form.percent.$dirty) return errors;
			!this.$v.form.percent.required && errors.push('Campo requerido');
			return errors;
		},
	},

	mounted() {
		this.dolar = localStorage.getItem('DOLAR');
		this.initApp();
	},
	methods: {
		initApp() {
			db.collection('products')
				.orderBy('name')
				.onSnapshot(querySnapshot => {
					this.items = [];
					querySnapshot.forEach(doc => {
						this.items.push({ ...doc.data(), id: doc.id });
					});
				});
		},
		setDolar(price) {
			localStorage.setItem('DOLAR', price);
			this.dolar = price;
		},
		setPrice(item) {
			// valor dolar unidad
			const value = item.price / item.cant;
			// valor unidad en bolivares
			const valueBs = value * this.dolar;
			// suma %
			const sum = (item.percent / 100) * valueBs + valueBs;

			return sum.toFixed(0);
		},
		async onSubmit() {
			if (!this.$v.$invalid) {
				this.loading = true;
				if (this.form.id) {
					await this.editItem();
				} else {
					await this.onSubmitItem();
				}
				this.closeDialog();
				this.loading = false;
			}
		},
		async deleteItem(item) {
			if (confirm(`Eliminar ${item.name}`)) {
				try {
					this.loading = true;
					await db.collection('products').doc(item.id).delete();
					this.snackbar = {
						text: `Eliminado ${item.name}`,
						color: 'success',
						show: true,
					};
					this.loading = false;
				} catch (error) {
					this.snackbar = { text: error.message, color: 'error', show: true };
				}
			}
		},
		async editItem() {
			try {
				await db.collection('products').doc(this.form.id).set(this.form);
				this.snackbar = {
					text: `Editado ${this.form.name}`,
					color: 'success',
					show: true,
				};
			} catch (error) {
				this.snackbar = { text: error.message, color: 'error', show: true };
			}
		},
		async onSubmitItem() {
			try {
				await db.collection('products').add(this.form);
				this.snackbar = {
					text: `Agregado ${this.form.name}`,
					color: 'success',
					show: true,
				};
			} catch (error) {
				this.snackbar = { text: error.message, color: 'error', show: true };
			}
		},
		clearInputs() {
			this.form = {
				name: '',
				price: null,
				cant: null,
				measure: null,
				percent: 50,
			};
			this.$v.$reset();
		},
		openDialogEdit(item) {
			this.dialog = true;
			this.form = item;
		},
		closeDialog() {
			this.clearInputs();
			this.dialog = false;
		},
		undPrice(item) {
			return (item.price / item.cant).toFixed(4);
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
			percent: {
				required,
			},
		},
	},
};
</script>

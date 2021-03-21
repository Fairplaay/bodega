<template>
	<v-row no-gutters>
		<v-col cols="12">
			<v-text-field label="Nombre" type="text" outlined></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field label="Correo electronico" type="text" outlined></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field label="Contraseña" type="password" outlined></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field label="Repite contraseña" type="password" outlined></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-btn block rounded color="primary"> Registrar </v-btn>
		</v-col>
	</v-row>
</template>

<script>
export default {};
</script>

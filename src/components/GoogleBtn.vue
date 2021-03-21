<template>
	<div>
		<v-btn color="#4285F4" block class="my-4 white--text" rounded @click="signInWithGoogle">
			<v-icon left>mdi-google</v-icon>
			Ingresar con Google
		</v-btn>
		<v-btn color="#4267B2" block class="my-4 white--text" rounded>
			<v-icon left>mdi-facebook</v-icon>
			Ingresar con facebook
		</v-btn>
	</div>
</template>

<script>
import { auth, googleAuthProvider } from '@/Firebase';

export default {
	name: 'GoogleButton',
	methods: {
		async signInWithGoogle() {
			try {
				await auth.signInWithPopup(googleAuthProvider);
			} catch (error) {
				this.snackbar = { text: error.message, color: 'error', show: true };
			}
		},
	},
};
</script>

<style lang="scss">
.google-button {
	display: block;
	background: white;
	color: #444;
	width: 100%;
	border-radius: 25px;
	border: thin solid #888;
	white-space: nowrap;
	box-shadow: none;
	transition: box-shadow ease-in-out 0.6s;
	outline: 0 !important;

	&:focus,
	&:hover {
		box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
		transition: box-shadow ease-in-out 0.6s;
		outline: 0 !important;
	}

	&:active {
		background-color: #e5e5e5;
		box-shadow: none;
		outline: 0 !important;
		transition-duration: 10ms;
	}
}

.google-button__icon {
	display: inline-block;
	vertical-align: middle;
	margin: 0 0 0 0;
	padding-top: 5px;
	padding-bottom: 5px;
	width: 18px;
	box-sizing: border-box;
}

.google-button__text {
	display: inline-block;
	vertical-align: middle;
	padding: 0 10px;
	font-size: 14px;
	font-weight: bold;
	font-family: 'Roboto', arial, sans-serif;
}
</style>

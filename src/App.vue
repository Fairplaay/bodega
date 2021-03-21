<template>
	<v-app>
		<v-app-bar v-if="$route.meta.layout" app color="primary" dark>
			{{ $route.meta.title }}
		</v-app-bar>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

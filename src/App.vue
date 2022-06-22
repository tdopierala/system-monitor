<template>
	<main>
		<monitor-box></monitor-box>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MonitorBox from '@/components/MonitorBox.vue';

export default defineComponent({
	components: { MonitorBox },
	name: 'App',
});
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html,
body {
	height: 100vh;
	width: 100%;
	background-image: linear-gradient(180deg, #647170 0%, #090c15 100%);
}

$col-errors: #e23333;
$col-warnings: #cb9b47;
$col-operations: #2699fb;

#app {
	font-family: 'Segoe UI', sans-serif;
	color: #fff;
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
	<div class="max-w-xl mx-auto h-full">
		<h1 class="font-bold text-xl text-center my-[24px]">毛概科目一</h1>
		<div class="flex justify-around">
			<el-button>
				<RouterLink to="/all">所有题目</RouterLink>
			</el-button>
			<el-button>
				<RouterLink to="/mistakes">错题复习</RouterLink>
			</el-button>
			<el-button>
				<RouterLink to="/random">随机测试</RouterLink>
			</el-button>
		</div>
		<div><RouterView></RouterView></div>
	</div>
</template>

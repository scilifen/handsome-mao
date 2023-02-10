<script setup lang="ts">
import { useExaminerStore } from "@/stores/examiner";
import { ref } from "vue";
import type { ButtonType } from "element-plus";
const examiner = useExaminerStore();

// refs of Mistake Page only
const passFlag = ref(false);
const queList = ref([] as number[]);
queList.value = JSON.parse(localStorage.getItem("que_list") as string);
if (queList.value == undefined || queList.value.length == 0) {
	queList.value = [];
	for (let i = 0; i < examiner.size; i++) {
		queList.value.push(i);
	}
}
const index = ref(queList.value[0]);

// refs
const question = ref(examiner.getQuestion(index.value) as string);
const choices = ref(examiner.getChoices(index.value) as string[]);
const answers = ref(examiner.getAnswers(index.value) as number[]);
const resultsTypes = ref(new Array(choices.value.length) as ButtonType[]);
const results = ref(new Array(choices.value.length) as boolean[]);

// functions
function setAns(index: number) {
	if (results.value[index]) {
		resultsTypes.value[index] = "default";
		results.value[index] = false;
	} else {
		resultsTypes.value[index] = "primary";
		results.value[index] = true;
	}
}

function check() {
	let all = true;
	let len = choices.value.length;
	let refer = new Array(len).fill(false);
	answers.value.forEach((element) => {
		refer[element] = true;
		all = results.value[element] && all;
	});
	for (let i = 0; i < len; i++) {
		if (refer[i]) {
			resultsTypes.value[i] = "success";
		} else if (!refer[i] && results.value[i]) {
			resultsTypes.value[i] = "danger";
		} else if (!refer[i] && !results.value[i]) {
			resultsTypes.value[i] = "default";
		}
	}
	if (all) {
		queList.value.shift();
		localStorage.setItem("que_list", JSON.stringify(queList.value));
	} else {
		queList.value.push(queList.value.shift() as number);
	}
	passFlag.value = true;
}

function nextQues() {
	if (queList.value == undefined || queList.value.length == 0) {
		passFlag.value = false;
	} else {
		index.value = queList.value[0];
		question.value = examiner.getQuestion(index.value);
		choices.value = examiner.getChoices(index.value);
		answers.value = examiner.getAnswers(index.value);
		passFlag.value = false;
		results.value = [];
		resultsTypes.value = [];
	}
}
</script>

<template>
	<div class="mx-[8px] font-semibold text-center my-[20px] mt-4">
		现在是第{{ index + 1 }}题,剩余{{ queList.length }}道，冲冲冲！\^o^/
	</div>
	<div class="mx-[16px] mb-[20px] text-l text-center font-bold mt-12">
		<div class="text-left">{{ question }}</div>
	</div>
	<div class="flex flex-col space-y-8 content-around mx-10 mt-8">
		<el-button
			class="choice"
			v-for="(choice, index) in choices"
			@click="setAns(index)"
			:type="resultsTypes[index]"
		>
			<div class="text-lg break-words whitespace-normal text-left">
				{{ choice }}
			</div>
		</el-button>
	</div>
	<div class="mt-[32px] flex flex-col items-center justify-center">
		<el-button
			@click="check"
			class="w-[120px] ml-0"
			:disabled="passFlag"
			>检查
		</el-button>
		<el-button
			@click="nextQues"
			class="w-[120px] ml-0 mt-6"
			:disabled="!passFlag"
			>下一题
		</el-button>
	</div>
	<div
		v-if="queList.length == 0"
		class="text-center mt-8 font-bold"
	>
		已完成所有题目！干得不错！[]~(￣▽￣)~*
	</div>
</template>

<script setup lang="ts">
import { useExaminerStore } from "@/stores/examiner";
import { ref } from "vue";
import type { ButtonType } from "element-plus";
const examiner = useExaminerStore();

const randomList = getRandomNum(100, 619);
const index = ref(0);
const question = ref(examiner.getQuestion(randomList[index.value]) as string);
const choices = ref(examiner.getChoices(randomList[index.value]) as string[]);
const answers = ref(examiner.getAnswers(randomList[index.value]) as number[]);

const nextQues = () => {
	index.value < 99 ? index.value++ : (index.value = 99);
	question.value = examiner.getQuestion(randomList[index.value]);
	choices.value = examiner.getChoices(randomList[index.value]);
	answers.value = examiner.getAnswers(randomList[index.value]);
	choiceType.value = [];
};
const prevQues = () => {
	index.value > 0 ? index.value-- : (index.value = 0);
	question.value = examiner.getQuestion(randomList[index.value]);
	choices.value = examiner.getChoices(randomList[index.value]);
	answers.value = examiner.getAnswers(randomList[index.value]);
	choiceType.value = [];
};

const choiceType = ref(new Array(choices.value.length) as string[]);

const setAns = (ansIndex: number) => {
	let tempType = choiceType.value[ansIndex];
	if (tempType === "primary") {
		choiceType.value[ansIndex] = "default";
	} else {
		choiceType.value[ansIndex] = "primary";
	}
};

const check = () => {
	answers.value.forEach((element) => {
		if (choiceType.value[element] === "primary") {
			choiceType.value[element] = "success";
		}
	});
	for (let index = 0; index < choiceType.value.length; index++) {
		if (choiceType.value[index] === "primary") {
			choiceType.value[index] = "danger";
		}
		answers.value.forEach((element) => {
			choiceType.value[element] = "success";
		});
	}
};

function getRandomNum(needNum: number, allNum: number) {
	let randomList = []; //生成的随机数组
	while (randomList.length < needNum) {
		let num = Math.floor(Math.random() * allNum);
		if (randomList.indexOf(num) == -1) {
			randomList.push(num);
		}
	}
	return randomList;
}
</script>

<template>
	<div class="mx-[8px] font-semibold text-center my-[20px] mt-4">
		现在是第{{ index + 1 }}题，冲冲冲！\^o^/
	</div>
	<div class="mx-[16px] mb-[20px] text-l text-center font-bold mt-12">
		<div class="text-left">{{ question }}</div>
	</div>
	<div class="flex flex-col space-y-8 content-around mx-10 mt-8">
		<el-button
			class="choice"
			v-for="(choice, index) in choices"
			@click="setAns(index)"
			:type="(choiceType[index] as ButtonType)"
		>
			<div class="text-lg break-words whitespace-normal text-left">
				{{ choice }}
			</div>
		</el-button>
	</div>
	<div class="mt-[32px] flex justify-around">
		<el-button @click="prevQues">上一题</el-button>
		<el-button @click="check">检查</el-button>
		<el-button @click="nextQues">下一题</el-button>
	</div>
</template>

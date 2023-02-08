<script setup lang="ts">
import { useExaminerStore } from "@/stores/examiner";
import { ref } from "vue";
const examiner = useExaminerStore();
const index = ref(0);
const to = ref(0);
index.value = parseInt(localStorage.getItem("index") as string);
index.value = isNaN(index.value) ? 0 : index.value;
const question = ref(examiner.getQuestion(index.value) as string);
const choices = ref(examiner.getChoices(index.value) as string[]);
const answers = ref(examiner.getAnswers(index.value) as number[]);

const nextQues = () => {
	index.value < 619 ? index.value++ : (index.value = 619);
	localStorage.setItem("index", index.value.toString());
	question.value = examiner.getQuestion(index.value);
	choices.value = examiner.getChoices(index.value);
	answers.value = examiner.getAnswers(index.value);
	choiceType.value = [];
};
const prevQues = () => {
	index.value > 0 ? index.value-- : (index.value = 0);
	localStorage.setItem("index", index.value.toString());
	question.value = examiner.getQuestion(index.value);
	choices.value = examiner.getChoices(index.value);
	answers.value = examiner.getAnswers(index.value);
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

const goTo = (to: number) => {
	index.value = to;
};
</script>

<template>
	<div class="mx-[8px] font-bold text-center my-[20px]">
		现在是第{{ index + 1 }}题，冲冲冲！\^o^/
	</div>
	<div class="mx-[16px] mb-[20px] text-l">{{ question }}</div>

	<div class="flex flex-col space-y-14 content-around">
		<el-button
			v-for="(choice, index) in choices"
			@click="setAns(index)"
			:type="choiceType[index] as string"
			text
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

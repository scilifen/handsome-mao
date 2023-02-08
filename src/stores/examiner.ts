import { ref, computed } from "vue";
import { defineStore } from "pinia";
import bankdata from "../assets/data.json";

export const useExaminerStore = defineStore("examiner", {
	state: () => {
		return {
			bank: bankdata,
		};
	},
	actions: {
		getQuestion(index: number) {
			return this.bank[index]["question"];
		},
		getAnswers(index: number) {
			return this.bank[index]["answers"];
		},
		getChoices(index: number) {
			return this.bank[index]["choices"];
		},
	},
});

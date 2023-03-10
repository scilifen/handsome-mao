import { ref, computed } from "vue";
import { defineStore } from "pinia";
import bankdata from "../assets/store.json";

export const useExaminerStore = defineStore("examiner", {
	state: () => {
		return {
			bank: bankdata,
			size: bankdata.length,
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

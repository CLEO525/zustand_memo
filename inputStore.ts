import { create } from "zustand";

interface MemoParams {
	id: string;
	title: string;
	content: string;
}

interface inputValue {
	title: string;
	setTitle: (val: string) => void;
	content: string;
	setContent: (val: string) => void;
	memos: MemoParams[];
	setMemos: (memos: MemoParams[]) => void;
}

const useInputChangeStore = create<inputValue>((set) => ({
	title: "",
	setTitle: (val) => {
		set({ title: val });
	},
	content: "",
	setContent: (val) => {
		set({ content: val });
	},
	memos: [],
	setMemos: (val) => {
		set({ memos: val });
	},
}));

export default useInputChangeStore;

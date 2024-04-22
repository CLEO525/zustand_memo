"use client";

import { useState } from "react";
import shortid from "shortid";
import { NextPage } from "next";
import axios from "axios";

interface MemopParams {
	id: string;
	title: string;
	content: string;
}

const MemoPage: NextPage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);
	const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setContent(e.target.value);

	const handleSubmitClick = () => {
		const id = shortid.generate();
		const memoData = { id, title, content };
		axios.post("/api", memoData);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		handleSubmitClick();
	};

	return (
		<form onSubmit={handleSubmit}>
			<input name={title} value={title} onChange={handleTitleChange} required />
			<input
				name={content}
				value={content}
				onChange={handleContentChange}
				required
			/>
			<button type="submit">메모만들기</button>
		</form>
	);
};

export default MemoPage;

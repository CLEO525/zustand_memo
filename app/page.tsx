"use client";

import useInputChangeStore from "@/inputStore";
import axios from "axios";
import { useEffect } from "react";
import shortid from "shortid";

const Home = () => {
	const { title, setTitle, content, setContent, memos, setMemos } =
		useInputChangeStore();

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);

	const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setContent(e.target.value);

	const handleSubmitClick = () => {
		const id = shortid.generate();
		const memoData = { id, title, content };
		axios.post("/api", memoData);
	};

	useEffect(() => {
		axios
			.get("/api")
			.then((response) => {
				const memosData = response.data.data.data;

				for (const key in memosData) {
					if (memosData[key] === null) {
						delete memosData[key];

						return memosData;
					}
				}
				setMemos(memosData);
			})
			.catch((error) => {
				console.error("error", error);
			});
	}, [setMemos]);

	const handleDeleteMemo = (e: any) => {
		const id = e.target.value;
		axios.delete(`/api`, { data: id });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		handleSubmitClick();
		setTitle("");
		setContent("");
	};

	return (
		<main className="flex flex-col p-24 justify-center align-middle">
			<div className="text-gray text-32px">memolist</div>
			<form
				onSubmit={handleSubmit}
				className="flex justify-center align-middle"
			>
				<label htmlFor="title" className="flex text-28px">
					title
				</label>
				<input
					name={title}
					value={title}
					onChange={handleTitleChange}
					required
					className="text-input"
				/>
				<label htmlFor="content" className="flex text-28px">
					content
				</label>
				<input
					name={content}
					value={content}
					onChange={handleContentChange}
					required
					className="text-input"
				/>
				<button type="submit" className="btn">
					메모만들기
				</button>
			</form>

			{memos && (
				<div className="flex flex-col align-middle justify-center text-center">
					<div className="flex align-middle justify-center">
						<table>
							<tbody>
								<tr>
									<th className="text-28px w-44">ID</th>
									<th className="text-28px w-56">title</th>
									<th className="text-28px w-80">content</th>
								</tr>
								{memos &&
									memos.map((memo) => (
										<tr
											key={`key__${memo.id}`}
											className="h-16 hover:bg-sky-500  hover:text-white "
										>
											<td className="text-24px mb-8">{memo.id}</td>
											<td className="text-24px mb-8">{memo.title}</td>
											<td className="text-24px mb-8">{memo.content}</td>
											<td>
												<button
													onClick={handleDeleteMemo}
													value={memo.id}
													className=" border-solid border-2 border-sky-500  rounded-lg  w-16 h-8 text-18px  hover:text-white"
												>
													삭제
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</main>
	);
};

export default Home;

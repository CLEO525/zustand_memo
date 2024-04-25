import { NextApiRequest, NextApiResponse } from "next";
import { Config, JsonDB } from "node-json-db";
import memos from "@/app/data/memoData.json";

interface MemoDataType {
	id: string;
	title: string;
	content: string;
}

export async function GET() {
	return Response.json({ data: { ...memos } });
}

const db = new JsonDB(new Config("./app/data/memoData", true, false));

export async function POST(req: NextApiRequest) {
	try {
		let body = "";
		for await (const chunk of req.body) {
			body += chunk;
		}
		const { id, title, content }: MemoDataType = JSON.parse(body);
		if (!id) return Response.json({ error: "no id" });

		await db.push(`/data[]`, { id, title, content }, true);

		db.reload();

		return Response.json({
			data: { id, title, content },
		});
	} catch (error) {
		Response.json({ status: 500, error: "error" });
	}
}

function findIndexById(data: MemoDataType[], id: any) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id === id) {
			return i;
		}
	}
	return -1;
}

export async function DELETE(req: NextApiRequest) {
	const data = memos.data;

	try {
		let id = "";
		for await (const chunk of req.body) {
			id += chunk;
		}

		const index = findIndexById(data, id);
		await db.delete(`/data/${index}`);

		console.log("데이터 삭제 완료");

		return Response.json({ data: { id }, text: "ok" });
	} catch (error) {
		console.log(error);
		return Response.json({ status: 500, error: "error" });
	}
}

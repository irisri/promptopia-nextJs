import { NextResponse } from "next/server";

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, prompt, tag } = body;

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, tag, prompt });
    await newPrompt.save();
    return new NextResponse(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify("failed POST /api/prompt/new"), {
      status: 500,
    });
  }
}

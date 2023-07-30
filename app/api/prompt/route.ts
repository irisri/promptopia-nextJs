import { NextResponse } from "next/server";

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET() {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return NextResponse.json(prompts);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify("failed GET /api/prompt"), {
      status: 500,
    });
  }
}

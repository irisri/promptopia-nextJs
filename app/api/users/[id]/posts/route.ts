import { NextResponse } from "next/server";

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new NextResponse(JSON.stringify("No user ID"), {
      status: 500,
    });
  }

  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: id }).populate("creator");
    return NextResponse.json(prompts);
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify("failed GET /api/prompt"), {
      status: 500,
    });
  }
}

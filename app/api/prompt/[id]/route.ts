import { NextResponse } from "next/server";

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new NextResponse(JSON.stringify("No prompt ID"), {
      status: 500,
    });
  }

  try {
    await connectToDB();
    const prompt = await Prompt.findById(id).populate("creator");
    if (!prompt) {
      return new NextResponse(JSON.stringify(`Prompt not found, id: ${id}`), {
        status: 404,
      });
    }
    return NextResponse.json(prompt);
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify(`failed GET /api/prompt/[id], id: ${id}`),
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new NextResponse(JSON.stringify("No prompt ID"), {
      status: 500,
    });
  }

  const body = await request.json();
  const { prompt, tag } = body;

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new NextResponse(JSON.stringify(`Prompt not found, id: ${id}`), {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return NextResponse.json(existingPrompt);
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify(`failed PATCH /api/prompt/[id], id: ${id}`),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new NextResponse(JSON.stringify("No prompt ID"), {
      status: 500,
    });
  }

  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(id);

    return new NextResponse(JSON.stringify("Deleted prompt"), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify(`failed DELETE /api/prompt/[id], id: ${id}`),
      {
        status: 500,
      }
    );
  }
}

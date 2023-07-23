import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  const users = [
    {
      id: 1,
      name: "Jhone",
    },
    {
      id: 2,
      name: "Wldf",
    },
    {
      id: 3,
      name: "Rijeroe",
    },
  ];

  return new Response(JSON.stringify(users));
}

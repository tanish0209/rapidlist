import { prisma } from "@/lib/prisma";
import { auth } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  const updated = await prisma.task.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(updated);
}
export async function DELETE(req: Request, { params }: any) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.task.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}

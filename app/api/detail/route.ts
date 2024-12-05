import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({ test: "hi" });
};

import { NextResponse } from "next/server"; import { prisma } from "@/lib/prisma";
export async function POST(req: Request){const b=await req.json();const report=await prisma.report.create({data:{playerId:b.playerId,match:b.match,report:b.report,strengths:b.strengths,weaknesses:b.weaknesses,action:b.action,decision:b.decision}});return NextResponse.json(report)}

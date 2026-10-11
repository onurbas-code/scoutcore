import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type PreviewPlayer = {
  player_id: string;
  external_link: string;
  name: string;
  status: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = String(body.links || "");

    const urls = input.match(/https?:\/\/[^\s"'<>]+/g) || [];

    if (!urls.length) {
      return NextResponse.json(
        { error: "Transfermarkt bağlantısı bulunamadı." },
        { status: 400 }
      );
    }

    if (urls.length > 300) {
      return NextResponse.json(
        { error: "Tek seferde en fazla 300 bağlantı gönderilebilir." },
        { status: 400 }
      );
    }

    const players: PreviewPlayer[] = [];
    const seen = new Set<string>();

    for (const raw of urls) {
      try {
        const url = new URL(raw);

        if (
          !(
            url.hostname === "transfermarkt.com" ||
            url.hostname.startsWith("transfermarkt.")
          )
        ) {
          continue;
        }

        const match = url.pathname.match(/\/spieler\/(\d+)/);

        if (!match) continue;

        const playerId = match[1];

        if (seen.has(playerId)) continue;

        seen.add(playerId);

        players.push({
          player_id: playerId,
          external_link:
            `https://www.transfermarkt.com/-/profil/spieler/${playerId}`,
          name: "",
          status: "Profil bilgileri henüz doğrulanmadı"
        });
      } catch {
        continue;
      }
    }

    return NextResponse.json({
      total: players.length,
      players
    });
  } catch {
    return NextResponse.json(
      { error: "Bağlantılar işlenemedi." },
      { status: 400 }
    );
  }
}

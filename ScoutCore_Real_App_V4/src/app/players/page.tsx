import { prisma } from "@/lib/prisma";
import { Shell } from "@/components/Shell";
import PlayersClient from "./players-client";
export default async function PlayersPage() {
  const players = await prisma.player.findMany({ orderBy: { createdAt: "desc" } });
  return <Shell active="players" title="Oyuncu Takip" subtitle="Pozisyon ve transfer klasörleri"><PlayersClient initialPlayers={JSON.parse(JSON.stringify(players))}/></Shell>;
}

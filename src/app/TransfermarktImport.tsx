"use client";

import { useState } from "react";

type PreviewPlayer = {
  player_id: string;
  external_link: string;
  name: string;
  status: string;
};

export default function TransfermarktImport() {
  const [links, setLinks] = useState("");
  const [players, setPlayers] = useState<PreviewPlayer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function preview() {
    setLoading(true);
    setError("");
    setPlayers([]);

    try {
      const response = await fetch("/api/transfermarkt-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ links }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Bağlantılar okunamadı.");
      }

      setPlayers(data.players || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="v18Page">
      <div className="panel pageHead">
        <span className="eyebrow">SCOUTCORE ELITE</span>

        <h2>Transfermarkt Toplu Futbolcu Aktarımı</h2>

        <p>
          Transfermarkt bağlantılarını yapıştır.
          Sistem futbolcu ID'lerini kontrol ederek
          önizleme oluşturur.
        </p>
      </div>

      <div className="panel">
        <h3>Transfermarkt Bağlantıları</h3>

        <textarea
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          placeholder={
            "Transfermarkt bağlantılarını buraya yapıştır...\n" +
            "Her satıra bir bağlantı yazabilirsin."
          }
          rows={12}
          style={{
            width: "100%",
            padding: 16,
            marginTop: 12,
            marginBottom: 16,
            borderRadius: 10,
            boxSizing: "border-box",
          }}
        />

        <button
          className="excelPrimary"
          onClick={preview}
          disabled={loading || !links.trim()}
        >
          {loading
            ? "BAĞLANTILAR KONTROL EDİLİYOR..."
            : "FUTBOLCULARI ÖNİZLE"}
        </button>
      </div>

      {error && (
        <div className="panel formError">
          {error}
        </div>
      )}

      {players.length > 0 && (
        <div className="panel">
          <h3>
            Bulunan Futbolcu: {players.length}
          </h3>

          <p>
            Bu aşamada yalnızca Transfermarkt
            bağlantıları doğrulanmıştır.
            Futbolcu bilgileri henüz çekilmemiştir.
          </p>

          <div className="v18Scroll">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Transfermarkt ID</th>
                  <th>Profil</th>
                  <th>Durum</th>
                </tr>
              </thead>

              <tbody>
                {players.map((player, index) => (
                  <tr key={player.player_id}>
                    <td>{index + 1}</td>

                    <td>{player.player_id}</td>

                    <td>
                      <a
                        href={player.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Profili Aç ↗
                      </a>
                    </td>

                    <td>{player.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

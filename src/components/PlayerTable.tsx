const players = [
  { name: "Marko Petrovic", position: "Forvet", folder: "Acil Transfer", club: "FK Novi", score: 82, status: "A Hedef" },
  { name: "Ali Can", position: "Orta Saha", folder: "Gelişim", club: "Anadolu FK", score: 78, status: "B Hedef" },
  { name: "Uğurcan Kaya", position: "Kaleci", folder: "Acil Transfer", club: "Anadolu FK", score: 78, status: "B Hedef" },
  { name: "Lucas Ferreira", position: "Kanat", folder: "Kiralık", club: "Club Brasil", score: 75, status: "Takip" },
];

export default function PlayerTable() {
  return (
    <div className="panel">
      <div className="panelHeader">
        <div>
          <h3>Yönetici Karar Listesi</h3>
          <p>Oyuncu adına tıklandığında tam profil ve rapor ekranı açılacak.</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Oyuncu</th>
            <th>Mevki</th>
            <th>Klasör</th>
            <th>Kulüp</th>
            <th>Skor</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.name}>
              <td><b>{player.name}</b></td>
              <td>{player.position}</td>
              <td>{player.folder}</td>
              <td>{player.club}</td>
              <td>{player.score}</td>
              <td><span className="badge">{player.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

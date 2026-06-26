const folders = [
  ["Kaleci", 8],
  ["Stoper", 16],
  ["Sol Bek", 7],
  ["Sağ Bek", 9],
  ["Orta Saha", 22],
  ["Kanat", 14],
  ["Forvet", 11],
  ["Acil Transfer", 8],
];

export default function FolderPanel() {
  return (
    <div className="panel">
      <h3>Pozisyon Klasörleri</h3>
      <p>Her pozisyon altında acil transfer, gelecek sezon, gelişim, kiralık ve takip listeleri olacak.</p>
      <div className="folders">
        {folders.map(([name, count]) => (
          <div className="folder" key={name}>
            <span>{name}</span>
            <b>{count}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

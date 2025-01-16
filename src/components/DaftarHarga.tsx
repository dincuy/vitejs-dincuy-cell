import { Stack, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { client } from '.././sanity';
import { PaketData } from '../vite-env';

export default function DaftarHarga({
  kategori,
  provider,
}: {
  kategori: string;
  provider: string;
}) {
  const [data, setData] = useState<PaketData[]>([]);
  const [sortedData, setSortedData] = useState<PaketData[]>([]);
  const [kolomKode, setKolomKode] = useState<boolean>(false)
  const [showDesc, setShowDesc] = useState<boolean>(false)

  /**
   * Mengambil lamanya masa aktif dari teks paket.
   * @param text - Teks paket internet.
   * @returns Jumlah hari masa aktif, atau null jika tidak ditemukan.
   */
  function getActiveDays(text: string): number | null {
    const regex = /(\d+)\s*Hari/i; // Regex untuk mencocokkan "x Hari"
    const match = text.match(regex);
    return match ? parseInt(match[1], 10) : null;
  }

  const removeStrBeforeStrip = (teks: string): string => {
    // Temukan posisi strip dan spasi setelahnya
    const cariStrip = teks.indexOf("-");
    const start = teks.indexOf(" ", cariStrip);

    // Ambil teks setelah strip (jika ada)
    let hasil = start !== -1 ? teks.substring(start + 1) : teks;

    // Hapus pola terkait hari, baik "/ X hari" atau ", X Hari"
    hasil = hasil.replace(/( \/ \d+ hari|, \d+ Hari)$/i, "").trim();

    return hasil;
  };

  function formatTextWithBreaks(input: string): (string)[] {
    // Membagi teks berdasarkan ". " dan menyisipkan <br /> di antaranya
    const arrTeks = input.split("\r")
    // const result = arrTeks.map(sentence => sentence + '.').join('<br />');
    // console.log(result)
    // console.log(arrTeks)
    return arrTeks
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "paket" && kategori == "${kategori.replace(
          '-',
          ' '
        )}" && provider == "${provider}" && aktif == true]`;
        const dataFetched = await client.fetch(query);

        setData(dataFetched);
      } catch (error) {
        // setError(true);
      }
    };

    fetchData();
  }, [provider]);

  useEffect(() => {
    if (data) {
      // Mengurutkan data berdasarkan hari terendah, lalu harga terendah
      const sorted = data.sort((a, b) => {
        const daysA = getActiveDays(a.produk) ?? 0; // Default 0 jika tidak ditemukan
        const daysB = getActiveDays(b.produk) ?? 0;

        if (daysA !== daysB) {
          return daysA - daysB; // Urutkan berdasarkan hari
        }
        return a.harga - b.harga; // Jika hari sama, urutkan berdasarkan harga
      });
      setSortedData(sorted);
    }
  }, [data]);
  // console.log(data);
  return (
    <>
      <Stack className="" style={{ pageBreakAfter: 'always', paddingTop: '110px' }}>
        <h1 className="fs-2 my-3 text-center text-capitalize">
          Daftar Harga {kategori.split("-").join(" ")} {provider}
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th onClick={() => setKolomKode(!kolomKode)}>{kolomKode ? 'Kode' : 'No.'}</th>
              <th>Nama Paket</th>
              <th className="">Masa Aktif</th>
              {kolomKode && (
                <th>Harga Modal</th>
              )}
              <th>Harga Jual</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <>
                <tr key={index}>
                  <td>{kolomKode ? item.kode : index + 1}</td>
                  <td className="text-start" onClick={() => setShowDesc(!showDesc)}>{removeStrBeforeStrip(item.produk)}</td>
                  <td className='text-center'>{getActiveDays(item.produk)} Hari</td>
                  {kolomKode && (
                    <td className="text-nowrap fw-bold text-end">
                      Rp. {item.harga.toLocaleString('id-ID')}
                    </td>
                  )}
                  <td className="text-nowrap fw-bold text-end">
                    Rp. {item.hargaJual.toLocaleString('id-ID')}
                  </td>
                </tr>
                {showDesc && (
                  <tr>
                    <td colSpan={5}>{formatTextWithBreaks(item.desc || "").map((item, i) => (
                      <span key={i}>{item}<br /></span>
                    ))}</td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </Table>
      </Stack>
    </>
  );
}

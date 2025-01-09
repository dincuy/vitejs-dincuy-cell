import { Stack, Table, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { client } from '.././sanity';
import { PaketData } from '../vite-env';
import logoImg from '.././assets/images/logo.png';

export default function DaftarHarga({
  kategori,
  provider,
}: {
  kategori: string;
  provider: string;
}) {
  const [data, setData] = useState<PaketData[]>([]);
  const [sortedData, setSortedData] = useState<PaketData[]>([]);

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
  }, []);

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
      <Image
        className="text-center d-block m-auto"
        src={logoImg}
        height="100px"
        alt=""
      />
      <Stack className="mt-2">
        <h1 className="fs-2 my-3 text-center text-capitalize">
          Daftar Harga {kategori.split("-").join(" ")} {provider}
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Kode.</th>
              <th>Nama Paket</th>
              <th className="">Masa Aktif</th>
              <th>Harga Modal</th>
              <th>Harga Jual</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="text-start">{item.produk}</td>
                <td className='text-center'>{getActiveDays(item.produk)} Hari</td>
                <td className="text-nowrap fw-bold">
                  Rp. {item.harga.toLocaleString('id-ID')}
                </td>
                <td className="text-nowrap fw-bold">
                  Rp. {item.hargaJual.toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </>
  );
}

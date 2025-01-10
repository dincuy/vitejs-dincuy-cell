import { Container, Image } from 'react-bootstrap';
import DaftarHarga from './components/DaftarHarga';
import logoImg from './assets/images/logo.png';

export default function App() {
  return (
    <>
      <header className='print-header'>
        <Image
          className=""
          src={logoImg}
          height="100px"
          alt=""
        />
      </header>
      <Container className="text-white py-3">
        <DaftarHarga kategori="voucher-internet" provider="telkomsel" />
        <DaftarHarga kategori="paket-internet" provider="telkomsel" />
      </Container>
    </>
  );
}

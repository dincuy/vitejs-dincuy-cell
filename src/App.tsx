import { Container, Image } from 'react-bootstrap';
import DaftarHarga from './components/DaftarHarga';
import logoImg from './assets/images/logo.png';

export default function App() {
  return (
    <>
      <Container className="text-white">
        <div className='print-header'>
          <Image
            className=""
            src={logoImg}
            height="100px"
            alt=""
          />
        </div>
        <DaftarHarga kategori="voucher-internet" provider="telkomsel" />
        <DaftarHarga kategori="paket-internet" provider="telkomsel" />
      </Container>
    </>
  );
}

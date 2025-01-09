import { Container } from 'react-bootstrap';
import DaftarHarga from './components/DaftarHarga';

export default function App() {
  return (
    <div style={{ backgroundColor: '#192f76' }}>
      <Container className="text-white py-3">
        <DaftarHarga kategori="voucher-internet" provider="telkomsel" />
        <DaftarHarga kategori="paket-internet" provider="telkomsel" />
      </Container>
    </div>
  );
}

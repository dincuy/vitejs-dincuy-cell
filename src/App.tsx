import { Col, Container, Row, Stack, Table } from 'react-bootstrap';
import DaftarHarga from './components/DaftarHarga';

export default function App() {
  return (
    <div style={{ backgroundColor: '#192f76' }}>
      <Container fluid className="text-white py-3">
        <DaftarHarga kategori="paket-internet" provider="telkomsel" />
        <DaftarHarga kategori="paket-internet" provider="indosat" />
      </Container>
    </div>
  );
}

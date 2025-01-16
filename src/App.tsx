import { Button, ButtonGroup, Container, Image } from 'react-bootstrap';
import DaftarHarga from './components/DaftarHarga';
import logoImg from './assets/images/logo.png';
import { useState } from 'react';

export default function App() {
  const [operator, setOperator] = useState<string>('telkomsel')
  const [hideBtn, setHideBtn] = useState<boolean>(true)
  return (
    <>
      <Container className="text-white">
        <div className='print-header' onClick={() => setHideBtn(!hideBtn)}>
          <Image
            className=""
            src={logoImg}
            height="100px"
            alt=""
          />
        </div>
        {hideBtn && (
          <ButtonGroup aria-label="Basic example" style={{position: "absolute", left: "30px", top: "50px"}}>
            <Button variant="secondary" onClick={() => setOperator('telkomsel')}>Telkomsel</Button>
            <Button variant="secondary" onClick={() => setOperator('axis')}>Axis</Button>
            <Button variant="secondary" onClick={() => setOperator('xl')}>XL</Button>
            <Button variant="secondary" onClick={() => setOperator('indosat')}>Indosat</Button>
            <Button variant="secondary">By U</Button>
          </ButtonGroup>
        )}
        <DaftarHarga kategori="voucher-internet" provider={operator} />
        <DaftarHarga kategori="paket-internet" provider={operator} />
      </Container>
    </>
  );
}

import { Button, ButtonGroup, Container, Image } from 'react-bootstrap';
import DaftarHarga from './components/DaftarHarga';
import logoImg from './assets/images/logo.png';
import { useState } from 'react';

export default function App() {
  const [operator, setOperator] = useState<string>('telkomsel')
  const [hideBtn, setHideBtn] = useState<boolean>(true)
  const [btn, setBtn] = useState<{ [key: string]: boolean }>({})

  const handleBtnProvider = (prov: string) => {
    setOperator(prov)
    setBtn((prev) => ({ ...prev, [prov]: !btn[prov] }))
  }
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
          <ButtonGroup aria-label="Basic example" style={{ position: "absolute", left: "30px", top: "50px" }}>
            <Button className={btn['telkomsel'] ? 'btn-provider active' : 'btn-provider'} variant="primary" onClick={() => handleBtnProvider('telkomsel')}>Telkomsel</Button>
            <Button className={btn['axis'] ? 'btn-provider active' : 'btn-provider'} variant="primary" onClick={() => handleBtnProvider('axis')}>Axis</Button>
            <Button className={btn['xl'] ? 'btn-provider active' : 'btn-provider'} variant="primary" onClick={() => handleBtnProvider('xl')}>XL</Button>
            <Button className={btn['indosat'] ? 'btn-provider active' : 'btn-provider'} variant="primary" onClick={() => handleBtnProvider('indosat')}>Indosat</Button>
            <Button className={btn['by u'] ? 'btn-provider active' : 'btn-provider'} variant="primary">By U</Button>
          </ButtonGroup>
        )}
        <DaftarHarga kategori="voucher-internet" provider={operator} />
        <DaftarHarga kategori="paket-internet" provider={operator} />
      </Container>
    </>
  );
}

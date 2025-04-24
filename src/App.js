import React, { useState } from 'react';
import { Container } from 'react-bootstrap'; // ✅ Correto agora
import Formulario from './Components/Formulario/index';
import Lista from './Components/ListProdutos/index';

function App() {
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [RefreshLista, setRefreshLista] = useState(false);

  const handleEdit = (produto) => {
    setSelectedProduto(produto);
  };

  const handleSave = () => {
    setSelectedProduto(null);
    setRefreshLista(!RefreshLista);
  };

  return (
    <Container className="mt-5"> {/* ✅ Corrigido aqui */}
      <h1>Cadastro de Produtos</h1>
      <Formulario selectedProduto={selectedProduto} onSave={handleSave} />
      <hr />
      <Lista onEdit={handleEdit} RefreshLista={RefreshLista} />
    </Container>
  );
}

export default App;

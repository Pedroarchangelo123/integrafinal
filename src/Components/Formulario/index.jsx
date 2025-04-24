import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addProduto, updateProdutos } from '../../Service/ProdutoService'

function ProdutoForm({ selectedProduto, onSave }) {
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");

    useEffect(() => {
        if (selectedProduto) {
            setNome(selectedProduto.nome);
            setCategoria(selectedProduto.categoria);
            setPreco(selectedProduto.preco);
        } else {
            setNome("");
            setCategoria("");
            setPreco("");
        }
    }, [selectedProduto]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!nome || !categoria || !preco) {
            alert("Preencha todos os campos");
            return;
        }
    
        const produtoData = {
            id: selectedProduto?.id, // garante que o ID vá junto se for edição
            nome,
            categoria,
            preco,
        };
    
        if (selectedProduto) {
            updateProdutos(produtoData);
            alert("Produto atualizado!");
        } else {
            addProduto(produtoData);
            alert("Produto adicionado!");
        }
    
        setNome("");
        setCategoria("");
        setPreco("");
        onSave();
    };
    

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control   
                    type="text"
                    placeholder="Digite o nome do produto"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <Form.Control
                    type="text"
                    placeholder="Digite a categoria do produto"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
                <Form.Control
                    type="number"
                    placeholder="Digite o preço do produto"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {selectedProduto ? 'Atualizar Produto' : 'Salvar Produto'}
            </Button>
        </Form>
    );
}

export default ProdutoForm;
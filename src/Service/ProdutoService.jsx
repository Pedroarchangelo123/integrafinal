import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'produtos'; // Corrigido: estava escrito STRORAGE_KEY

export const getProdutos = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveProdutos = (produtos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
};

export const addProduto = (produto) => {
    const produtos = getProdutos();
    const newProduto = { id: uuidv4(), ...produto }; // CORRIGIDO AQUI
    produtos.push(newProduto);
    saveProdutos(produtos);
};

export const updateProdutos = (updateProduto) => {
    const produtos = getProdutos().map(p =>
        p.id === updateProduto.id ? updateProduto : p
    );
    saveProdutos(produtos);
};

export const deleteProdutos = (id) => {
    const produtos = getProdutos().filter(p => p.id !== id);
    saveProdutos(produtos);
};


import './css/header.css';
import './css/global.css';
import './css/Card.css';
import img1 from '../src/img/image 1.png'
import imgLogo from '../src/img/unsplash_TvPoR5_ppJg.png'
import img2 from '../src/img/Group.png'
import imgPencil from '../src/img/lapis.png'
import api from './api/api';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [dados,setDados] = useState([])

  // Referencias dos input da onde a gente vai tirar os valores

  const [marca,setMarca]= useState("")
  const [modelo,setModelo]= useState("")
  const [detalhes,setDetalhes]= useState("")
  const [ano,setAno]= useState("")
  const [cor,setCor]= useState("")
  const [preco,setPreco]= useState("")
  const envButton = useRef()
  const [count,setCount] = useState(0)
  const [ids,setIds] = useState(0)
  useEffect(() => {
    
}, [dados]);
  const closeModal = ()=>{
    
    if(count==0){
      setCount(1)
    }
    else{
      setCount(0)
    }
  }

  const getOnibus = async()=>{
    const getterOnibus = await api.get("http://localhost:8080/onibus/getonibus");
    console.log(getterOnibus.data)
    setDados(getterOnibus.data)
  }

  const deleteOnibus = async(id)=>{
    await api.delete("http://localhost:8080/onibus/deleteonibus/"+id);
    getOnibus()
  }
  const CollectOneRegister = async(id)=>{
    setIds(id)
    const dadosOnibus = dados.find((dog) => dog.id === ids);
    if (dadosOnibus) {
      console.log("valores dos dados=  " + dadosOnibus)
      setAno(dadosOnibus.ano);
      setDetalhes(dadosOnibus.detalhe);
      setCor(dadosOnibus.cor);
      setMarca(dadosOnibus.marca);
      setModelo(dadosOnibus.modelo);
      setPreco(dadosOnibus.preco);
    }
  }
  const putOnibus = async(id)=>{
    try{
      envButton.current.style.disabled= true; 
    await api.put("http://localhost:8080/onibus/putonibus/" + id,{
      
        "marca": marca,
        "cor": cor,
        "modelo":modelo,
        "detalhe": detalhes,
        "ano": ano,
        "preco": preco
      
    
    });
  }
  finally{
    getOnibus();
    setMarca("")
    setModelo("")
    setDetalhes("")
    setAno("")
    setCor("")
    setPreco("") 
    envButton.current.style.disabled= false 
  }
  

  }

  const postOnibus = async(e)=>{
    e.preventDefault();
    try{
      envButton.current.style.disabled= true; 
    await api.post("http://localhost:8080/onibus/postonibus",{
      
        "marca": marca,
        "cor": cor,
        "modelo":modelo,
        "detalhe": detalhes,
        "ano": ano,
        "preco": preco
      
    
    });
  }
  finally{
    getOnibus();
    setMarca("")
    setModelo("")
    setDetalhes("")
    setAno("")
    setCor("")
    setPreco("") 
    envButton.current.style.disabled= false 
  }
  
  }
  


  useEffect(()=>{



    getOnibus();
  },[])

  return (
    <>
    <div className="container">
    <header className="header">
        <a href="#" className="logo">

            <img src={imgLogo} alt="logo da empresa MapBus"/>
            
        </a>
        <p>MapBus</p>
        <div className="isso">
            <input type="text" placeholder="Busca por veículos" id="buscar"/>
        </div>
        <nav>
            <ul>
                <li> <a href="#">Categoria</a> </li>
                <li> <a href="#">Meus Anúncios</a> </li>
                </ul> 
        </nav>    
    </header>

    <main>


        <div className="img34">

        <img className="big" src={img1} alt="imagem de um onibus Millenuim Brt II"/>
        <div className='busItens'>
          <div>
            <h1>Itens</h1>
            </div>

            <div className="Alinhando">
            <button id="openCard" onClick={closeModal}>Novo Item</button>
          </div>
          </div>
        </div>

        <form id={count==0?"formulario":"hidden"} onSubmit={postOnibus}>
        <div id="NovoItem">
            <input type="text" id="Marca" placeholder="Marca:" value={marca} onChange={(e)=>setMarca(e.target.value)} required/>  
            <input type="text" id="Modelo" placeholder="Modelo:" value={modelo} onChange={(e)=>setModelo(e.target.value)} required/>  
            <input type="text" id="Descrição" placeholder="Descrição:" value={detalhes} onChange={(e)=>setDetalhes(e.target.value)} required/>  
            <input type="text" id="Ano" placeholder="Ano:" value={ano} onChange={(e)=>setAno(e.target.value)} required/>  
            <input type="text" id="Cor" placeholder="Cor:" value={cor} onChange={(e)=>setCor(e.target.value)} required/>  
            <input type="text" id="Preço" placeholder="Preço:" value={preco} onChange={(e)=>setPreco(e.target.value)} required/>  
            <button type='submit' id="CrairNovoBus" ref={envButton}>Enviar</button>
            <button type='button' id="AlterarBus"  onClick={()=>putOnibus(ids)} ref={envButton}>Alterar</button>
            <button id="CloseButton" onClick={closeModal}>Fechar</button>
          </div>
        </form>
              
        <table >
          <thead>
          <tr className='minicleito'>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Descrição</th>
                    <th>Ano</th>
                    <th>Cor</th>
                    <th>Preço</th>
                    <th>Ação</th>
                </tr>
          </thead>
          <tbody>
       
            {
              dados.map((itens)=>(
                <tr key={itens.id} className="onibusTable">
                <td>{itens.marca}</td>
                <td>{itens.modelo}</td>
                <td>{itens.detalhe}</td>
                <td>{itens.ano}</td>
                <td>{itens.cor}</td>
                <td>{itens.preco}</td>
               
                
                 
                <td className='flex-buttons'>
                  <button className='buttonAction' onClick={()=>deleteOnibus(itens.id)}><img src={img2} alt="" /></button>
                   <button className='buttonAction' onClick={()=>CollectOneRegister(itens.id)}><img src={imgPencil} alt="" /></button></td>
                   </tr>

              ))

               
            }
      
                
          </tbody>
        </table>
            

        





    </main>

    <footer>
        <p>2024&nbsp;@&nbsp;Yago&nbsp;&nbsp;&&nbsp;&nbsp;Pedro</p>
    </footer>
</div>
</>
  )
}


export default App

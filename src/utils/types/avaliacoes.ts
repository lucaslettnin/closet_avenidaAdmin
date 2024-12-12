import { ProdutoI } from "./produtos"
import { ClienteI } from "./clientes"

export interface AvaliacaoI {
  id:        number,
  cliente:     ClienteI,   
  clienteId:   string,   
  produto   :  ProdutoI 
  produtoId  : number,
  estrelas    :number,      
  comentario  :string,   
  resposta    :String   
}
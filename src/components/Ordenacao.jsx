// src/components/Ordenacao.jsx

import { SortAsc } from 'lucide-react'; // Aproveitando que você já usa lucide-react

const Ordenacao = ({ ordemAtual, setOrdem }) => {
  return (
    <div className="filter-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
      <SortAsc size={20} color="#7c3aed" />
      <label htmlFor="select-ordem" style={{ fontWeight: 'bold', fontSize: '14px' }}>
        Ordenar por:
      </label>
      <select 
        id="select-ordem"
        value={ordemAtual} 
        onChange={(e) => setOrdem(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          backgroundColor: '#1e293b',
          cursor: 'pointer'
        }}
      >
        <option value="recente">Mais Recentes</option>
        <option value="menor-preco">Menor Preço</option>
        <option value="maior-preco">Maior Preço</option>
      </select>
    </div>
  );
};

export default Ordenacao;
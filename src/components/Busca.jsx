// src/components/Busca.jsx
import React from 'react';
import { Search } from 'lucide-react'; // Ícone para combinar com seu layout

const Busca = ({ termoBusca, setTermoBusca }) => {
  return (
    <div className="search-container" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#1e293b', 
      padding: '8px 15px', 
      borderRadius: '8px',
      border: '1px solid #3f3f46',
      flex: 1, // Faz o campo crescer para ocupar o espaço disponível
      maxWidth: '400px'
    }}>
      <Search size={18} color="#7c3aed" style={{ marginRight: '10px' }} />
      <input
        type="text"
        placeholder="Pesquisar pelo nome..."
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          outline: 'none',
          width: '100%',
          fontSize: '14px'
        }}
      />
    </div>
  );
};

export default Busca;
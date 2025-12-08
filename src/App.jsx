import { useState, useEffect } from 'react';
import { RefreshCw, ShoppingBag, Gamepad2 } from 'lucide-react';
import GameCard from './components/GameCard'; // Importamos nosso novo componente
import './App.css'; 

function App() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3001/favoritos';

  const carregarJogos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Não foi possível conectar ao servidor.');
      }
      const data = await response.json();
      setJogos(data.reverse());
    } catch (err) {
      console.error(err);
      setError("Não conseguimos conectar ao seu Banco de Dados (json-server). Verifique se ele está rodando na porta 3001.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarJogos();
  }, []);

  const deletarJogo = async (id) => {
    if (!confirm("Tem certeza que deseja remover este jogo da lista?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setJogos(jogos.filter(jogo => jogo.id !== id));
    } catch (err) {
      alert("Erro ao tentar deletar. O servidor está ativo?");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-area">
          <div className="icon-box">
            <Gamepad2 size={32} color="#fff" />
          </div>
          <div>
            <h1>Caçador de Jogos</h1>
            <p>Monitorando preços de PS4/PS5</p>
          </div>
        </div>
        
        <button onClick={carregarJogos} className="btn-refresh" disabled={loading}>
          <RefreshCw size={16} className={loading ? "spin" : ""} />
          {loading ? "Atualizando..." : "Atualizar Lista"}
        </button>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}

      {/* Estado Vazio */}
      {!loading && !error && jogos.length === 0 && (
        <div className="empty-state">
          <ShoppingBag size={64} style={{ opacity: 0.5 }} />
          <h3>Sua lista está vazia</h3>
          <p>Use a extensão do Chrome na página da OLX para salvar seus primeiros anúncios.</p>
        </div>
      )}

      {/* Aqui está a mágica da limpeza:
         Em vez de 30 linhas de HTML, temos apenas uma linha chamando o componente.
      */}
      <div className="games-grid">
        {jogos.map((jogo) => (
          <GameCard 
            key={jogo.id} 
            jogo={jogo} 
            onDelete={deletarJogo} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
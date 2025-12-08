import { Trash2, ExternalLink } from 'lucide-react';

// Este componente é "burro": ele não sabe fazer fetch nem gerenciar estado.
// Ele apenas recebe dados (props) e mostra na tela.
function GameCard({ jogo, onDelete }) {
  
  return (
    <div className="game-card">
      <div className="image-container">
        <img 
          src={jogo.image} 
          alt={jogo.title} 
          // Mantivemos a lógica de fallback da imagem aqui, pois é visual
          onError={(e) => { e.target.src = 'https://placehold.co/400x300/1e293b/cbd5e1?text=Sem+Imagem'; }}
        />
        <span className="date-tag">Salvo em: {jogo.date || 'Data desc.'}</span>
      </div>

      <div className="card-content">
        <h3 title={jogo.title}>{jogo.title}</h3>
        
        <div className="card-footer">
          <div className="price">{jogo.price}</div>
          
          <div className="actions">
            <a href={jogo.link} target="_blank" rel="noreferrer" className="btn-link">
              <ExternalLink size={18} />
              Ver
            </a>
            {/* Quando clicado, ele avisa o componente pai (App) 
              que precisa deletar este ID específico.
            */}
            <button onClick={() => onDelete(jogo.id)} className="btn-delete">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
import KnowledgeGraph from '@/KnowledgeGraph';
import styles from './MindMap.module.css';
import { useEffect, useRef, useState } from "react";
import { useAuth } from '@/AuthContext';

function useGraphData() {
  const { user } = useAuth(); 
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/graph`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then((res) => res.json())
      .then((json) => {
        const nodes = (json.data.nodes || []).map((n) => ({
          ...n,
          hue: typeof n.hue === 'number' ? n.hue : 100,
        }));
        const links = (json.data.relationships || []).map((rel) => ({
          source: rel.from_id,
          target: rel.to_id,
          type: rel.type,
        }));
        setGraphData({ nodes, links });
      })
      .catch(() => setGraphData({ nodes: [], links: [] }));
  }, []);
  return graphData;
}


function MindMap({ onNodeFocus }) {
  const containerRef = useRef();
  const graphData = useGraphData();
  const [backgroundOffset, setBackgroundOffset] = useState({ x: 0, y: 0, scale: 1 });

  return (
    <div
      ref={containerRef}
      className={styles.GraphBackground}
      style={{
        backgroundPosition: `${-backgroundOffset.x}px ${-backgroundOffset.y}px, ${-backgroundOffset.x}px ${-backgroundOffset.y}px, ${-backgroundOffset.x}px ${-backgroundOffset.y}px, ${-backgroundOffset.x}px ${-backgroundOffset.y}px`,
        backgroundSize: `${50 * backgroundOffset.scale}px ${50 * backgroundOffset.scale}px, ${50 * backgroundOffset.scale}px ${50 * backgroundOffset.scale}px, ${10 * backgroundOffset.scale}px ${10 * backgroundOffset.scale}px, ${10 * backgroundOffset.scale}px ${10 * backgroundOffset.scale}px`,
        userSelect: 'none',
      }}
    >
      <KnowledgeGraph
        nodes={graphData.nodes}
        links={graphData.links}
        onNodeFocus={onNodeFocus}
      />
    </div>
  );
}

export default MindMap;


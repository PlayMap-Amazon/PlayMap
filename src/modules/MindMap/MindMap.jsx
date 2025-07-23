import React, { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import styles from "./MindMap.module.css";

const originalRawData = {
  "data": [],
  "document_count": 0,
  "status": "success",
  "tsne_perplexity": 1,
};

function convertToNodes(data) {
  const nodes = data.data.map((coord, index) => ({
    id: coord.id,
    x: coord.x,
    y: coord.y,
    neighbors: coord.neighbors,
    hue: coord.hue,
    _index: index
  }));

  const links = [];

  nodes.forEach((node, sourceIndex) => {
    node.neighbors.forEach(targetIndex => {
      links.push({
        source: node.id,
        target: nodes[targetIndex].id
      });
    });
  });

  return { nodes, links };
}

function MindMap({onNodeFocus}) {
    const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
    const [rawData, setRawData] = useState(originalRawData);
    const [graphData, setGraphData] = useState(convertToNodes(originalRawData));
    const containerRef = useRef();
    const fgRef = useRef();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/graph`, {method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'https://1f46ac602abb.ngrok-free.app'
          }})
            .then(response => response.json())
            .then(data => {
                setRawData(data);
                setGraphData(convertToNodes(data));
                setTimeout(() => {
                    if (fgRef.current) {
                        fgRef.current.zoomToFit(400);
                    }
                }, 100);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const parent = containerRef.current.parentElement;
                if (parent) {
                    const rect = parent.getBoundingClientRect();
                    setDimensions({
                        width: rect.width * 0.8,
                        height: rect.height * 0.8
                    });
                }
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        let resizeObserver;
        if (window.ResizeObserver && containerRef.current?.parentElement) {
            resizeObserver = new ResizeObserver(updateDimensions);
            resizeObserver.observe(containerRef.current.parentElement);
        }

        return () => {
            window.removeEventListener('resize', updateDimensions);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.GraphBackground}>
            <button
                style={{marginLeft: "10px", marginTop: "10px", position: "absolute", zIndex: 1}}
                onClick={() => fgRef.current.zoomToFit(400)}
            >
                Zoom to Fit
            </button>
            <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                nodeLabel="id"
                nodeRelSize={10}
                cooldownTicks={100}
                enableNodeDrag={false}
                onNodeClick={(node) => {
                    const id = node.id;
                    const foundNode = rawData.data.find(coord => coord.id === id);
                    if (foundNode) {
                        onNodeFocus(foundNode.metadata);
                    }
                }
                }
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const radius = 10;
                    
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                    const hue = node.hue || 0;
                    ctx.fillStyle = `hsl(${hue} 100% 79%)`;
                    ctx.fill();
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 1 / globalScale;
                    ctx.stroke();
                }}
            />
        </div>
    );
};

export default MindMap;
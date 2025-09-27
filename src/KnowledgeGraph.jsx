import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';
import { ArrowedButton } from './components/ui/button';

const hashCode = (str) => {
  return str.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
};

const KnowledgeGraph = ({ nodes = [], links = [], onNodeFocus, onDrag, onZoom }) => {
  const containerRef = useRef(null);
  const configPanelRef = useRef(null);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const data = {
      nodes: nodes.map((node) => ({
        id: node.id,
        label: node.id,
        title: node.type,
        group: node.group,
        color: {
          background: `hsl(${hashCode(node.type) % 360}, 70%, 50%)`,
          border: '#222222',
          hover: {
            background: `hsl(${hashCode(node.type) % 360}, 80%, 80%)`,
            border: '#222222'
          },
          highlight: {
            background: `hsl(${hashCode(node.type) % 360}, 80%, 90%)`,
            border: '#222222'
          }
          
        },
        font: {
          color: '#222222'
        }
      })),
      edges: links.map((link) => ({
        from: link.source,
        to: link.target,
        label: link.type.toLowerCase().replace(/_/g, ' '),
        arrows: 'to',
      }))
    };

    const options = {
      layout: {
        improvedLayout: true
      },
      configure: {
        enabled: showConfig,
        container: configPanelRef.current,
      },
      nodes: {
        shape: "box",
        borderWidth: 1
      },
      interaction: {
        hover: true,
        tooltipDelay: 0,
        zoomView: true,
        dragView: true
      },
      edges: {
        font: {
          align: 'middle',
          strokeColor: '#FFECCC'
        },
        smooth: {
          forceDirection: "none",
          roundness: 1
        }
      },
      physics: {
        forceAtlas2Based: {
          springLength: 150,
          avoidOverlap: 0.40
        },
        minVelocity: 0.75,
        solver: "forceAtlas2Based",
        stabilization: {
          iterations: 30,
        }
      }
    };

    const network = new Network(containerRef.current, data, options);
    network.once("beforeDrawing", function () {
      network.focus(2, {
        scale: 2,
      });
    });
    network.once("afterDrawing", function () {
      network.fit({
        animation: {
          duration: 3000,
          easingFunction: "easeOutCubic",
        },
      });
    });

    if (onNodeFocus) {
      network.on('click', function(params) {
        if (params.nodes && params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = nodes.find(n => n.id === nodeId);
          if (node) {
            onNodeFocus(node);
          }
        }
      });
    }
    if (onDrag) {
      network.on('dragging', function(params) {
        const { x, y } = params.event.center;
        onDrag({ x, y });
      });
    }
    if (onZoom) {
      network.on('zoom', function(params) {
        onZoom(params.scale);
      });
    }
    return () => network.destroy();
  }, [nodes, links, onNodeFocus, onDrag, onZoom, showConfig]);

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', position: 'relative', transition: 'all 1.0s' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <div
          ref={containerRef}
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#00000000',
            borderRadius: '8px',
            minHeight: 0
          }}
        />
        <ArrowedButton
          style={{
            position: 'absolute',
            top: 16,
            right: 10,
          }}
          onClick={() => setShowConfig((v) => !v)}
        >
          {showConfig ? 'Hide Config' : 'Show Config'}
        </ArrowedButton>
      </div>
      {showConfig && (
        <div
          ref={configPanelRef}
          style={{
            width: 475,
            background: '#fafafa',
            borderLeft: '1px solid #eee',
            padding: 16,
            overflowY: 'scroll',
            height: '100%',
            boxSizing: 'border-box',
            transition: 'width 0.2s',
          }}
        />
      )}
    </div>
  );
};

export default KnowledgeGraph;

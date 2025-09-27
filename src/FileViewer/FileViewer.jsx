import styles from "./FileViewer.module.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

function FileViewer({metadata, goBackToMindMap}) {

    return <div style={{ width: "100%", height:"100%", display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center" }}>
        <div style={{ width: "100%", height: "10%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <button className={styles["back-button"]} onClick={goBackToMindMap}>
                <svg className={styles["arrow-icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Mind Map
            </button>
            <h2 className={styles.overviewTitle}>Overview of {metadata.filename}</h2>
        </div>
        <div className={styles.markdown}>
            <h3 style={{}}>Summary</h3>
            {
                metadata.summary ?
                <div style={{ maxHeight: '90%', fontSize: '1.0rem', overflowY: 'auto', padding: '2rem', width: '100%', border: '1px solid #F78F1E', borderRadius: '4px' }}>
                    <ReactMarkdown 
                        remarkPlugins={[remarkMath, remarkGfm]}
                        rehypePlugins={[rehypeKatex]}
                        children={metadata.summary.replace(/`([^`]*\$[^`]*)`/gm, '$1')}
                    />
                </div>
                : <div>
                    <p>No summary generated yet!</p>
                    <p>Please come back in a few minutes !</p>
                </div>
            }
        </div>
    </div>
}

export default FileViewer;
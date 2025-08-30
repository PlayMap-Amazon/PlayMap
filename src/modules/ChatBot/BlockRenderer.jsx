import React from 'react'
import styles from './ChatBot.module.css'

export default function BlockRenderer({ blocks = [] }) {
  return blocks.map((blk, i) => {
    if (!blk || typeof blk !== 'object') {
      return <p className={styles.botParagraph} key={i} style={{ whiteSpace: 'pre-wrap' }}>{String(blk)}</p>
    }

    switch (blk.type) {
      case 'paragraph': {
        const pText = String(blk.text ?? '');
        return (
          <p className={styles.botParagraph} key={i} style={{ whiteSpace: 'pre-wrap' }}>
            {pText}
          </p>
        )
      }
      case 'list': {
        let items = blk.items;
        if (!Array.isArray(items)) {
          if (typeof items === 'string') {
            items = items.split(/\r?\n|;|\||,/).map(s => s.trim()).filter(Boolean);
          } else if (typeof items === 'object' && items !== null) {
            items = Object.values(items).map(x => String(x));
          } else {
            items = [String(items)];
          }
        }
        return (
          <ul className={styles.botList} key={i}>
            {items.map((item, j) => (
              <li className={styles.botListItem} key={j}>
                {String(item)}
              </li>
            ))}
          </ul>
        )
      }
      case 'table': {
        const header = Array.isArray(blk.header) ? blk.header : [];
        const rows = Array.isArray(blk.rows) ? blk.rows : [];
        return (
          <table className={styles.botTable} key={i}>
            <thead>
              <tr>
                {header.map((h, idx) => (
                  <th className={styles.botTh} key={idx}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ridx) => (
                <tr key={ridx}>
                  {(Array.isArray(row) ? row : [row]).map((cell, cidx) => (
                    <td className={styles.botTd} key={cidx}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
      default:
        return null
    }
  })
}
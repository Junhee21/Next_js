import styles from '../../../styles/Home.module.css';
import { useState, useEffect } from 'react';

export default function Textarea ({text, event, fontSize, row=1, value}) {
    const [active, setActive] = useState(false);
    return (
        <div style={{
            position:'relative',
            width: '95%',
            margin: 'auto',
        }}>
            <textarea
                className={styles.textarea}
                onChange={event}
                style={{fontSize: fontSize}}
                rows={row}
                value={value}
                // onFocus={e => setActive(true)} onBlur={e => setActive(false)}
            >
                {text}
            </textarea>
            <div className={styles.textareaBottomBorder}></div>
        </div>
    )
}
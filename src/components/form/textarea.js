import styles from '../../../styles/Home.module.css';
import { useState, useEffect } from 'react';
import classNames from 'classnames';

export default function Textarea({value, event, fontSize, row = 1, disabled=false}) {
    const [active, setActive] = useState(false);
    return (
        <div
            style={{
                position: 'relative',
                width: '95%',
                margin: 'auto',
            }}
        >
            <textarea
                className={classNames(styles.textarea, active?styles.active:'')}
                value={value}
                onChange={event}
                onFocus={e => setActive(true)} onBlur={e => setActive(false)}
                style={{ fontSize: fontSize }}
                rows={row}
                disabled={disabled} />
            <div className={styles.textareaBottomBorderDefault}></div>
            <div className={classNames(styles.textareaBottomBorder, active?styles.active:'')}></div>
        </div>
    )
}
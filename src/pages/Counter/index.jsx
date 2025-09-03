import React from 'react';
import clsx from 'clsx';

import styles from './Counter.module.css';

export default function Counter() {
    const [count, setCount] = React.useState(0);

    const handleIncrease = () => setCount(count + 1);
    const handleDecrease = () => setCount(count - 1);
    const handleReset = () => setCount(0);

    const countStyle = clsx(styles.count, {
        [styles.positive]: count > 0,
        [styles.negative]: count < 0,
        [styles.zero]: count === 0,
    });

    const statusStyle = clsx(styles.status, {
        [styles.positive]: count > 0,
        [styles.negative]: count < 0,
        [styles.zero]: count === 0,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles['counter-app']}>
                <h2 className={styles.heading}>Counter App</h2>
                <div className={countStyle}>{count}</div>
                <div className={statusStyle}>
                    {count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero'}
                </div>
                <div className={styles.buttons}>
                    <button
                        className={styles.decrement}
                        onClick={handleDecrease}
                    >
                        Decrease (-1)
                    </button>
                    <button
                        className={styles.reset}
                        onClick={handleReset}
                    >
                        Reset (0)
                    </button>
                    <button
                        className={styles.increment}
                        onClick={handleIncrease}
                    >
                        Increase (+1)
                    </button>
                </div>
            </div>
        </div>
    );
}

import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Navigation.module.css';

function Navigation() {
    const tabs = [
        {
            emoji: '🏡',
            title: 'Home',
            path: '/',
        },
        {
            emoji: '🎰',
            title: 'Counter App',
            path: '/counter',
        },
        {
            emoji: '📝',
            title: 'Todo List App',
            path: '/todo',
        },
        {
            emoji: '👩🏻‍💻',
            title: 'Profile Card',
            path: '/profile',
        },
        {
            emoji: '📦',
            title: 'Product List',
            path: '/products',
        },
        {
            emoji: '✏️',
            title: 'Comment System',
            path: '/comments',
        },
        {
            emoji: '☀️',
            title: 'Weather App',
            path: '/weather',
        },
        {
            emoji: '🕹️',
            title: 'Buttons',
            path: '/buttons',
        },
    ];
    return (
        <nav>
            <ul className={styles['nav-list']}>
                {tabs.map((tab, index) => {
                    return (
                        <li key={index}>
                            <NavLink
                                to={tab.path}
                                className={({ isActive }) =>
                                    clsx(
                                        styles['link-btn'],
                                        isActive && styles.active
                                    )
                                }
                            >
                                <span>{tab.emoji}</span>
                                <span>{tab.title}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navigation;

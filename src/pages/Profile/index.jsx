import React from 'react';
import clsx from 'clsx';

import styles from './Profile.module.css';

function SkeletonItem() {
    return (
        <div className={clsx(styles.row, styles['sk-row'])}>
            <div className={clsx(styles.label, styles.skeleton)}></div>
            <div className={clsx(styles.value, styles.skeleton)}></div>
        </div>
    );
}

function Skeleton() {
    const items = [...Array(7)];
    return (
        <div className={clsx(styles.profile, styles['card--skeleton'])}>
            <div className={styles.header}>
                <div className={clsx(styles.avatar, styles.skeleton)}></div>
                <div>
                    <div
                        className={clsx(styles.skeleton, styles['sk-title'])}
                    ></div>
                </div>
            </div>

            <div className={clsx(styles.rows)}>
                {items.map((_, index) => (
                    <SkeletonItem key={index} />
                ))}
            </div>

            <div className={clsx(styles.shimmer)}></div>
        </div>
    );
}

function ProfileDetail({ user }) {
    return (
        <div className={clsx(styles.profile, styles['card--data'])}>
            <div className={clsx(styles.header)}>
                <div className={clsx(styles.avatar)}>
                    <img
                        className={clsx(styles['avatar-img'])}
                        src="/avatar.jpeg"
                        alt={user.name}
                    />
                </div>
                <div>
                    <h1 className={clsx(styles.title)}>User Info</h1>
                </div>
            </div>

            <div className={clsx(styles.rows)}>
                <div className={clsx(styles.row)}>
                    <div className={clsx(styles.label)}>Name</div>
                    <div className={clsx(styles.value)}>{user.name}</div>
                </div>
                <div className={clsx(styles.row)}>
                    <div className={clsx(styles.label)}>Username</div>
                    <div className={clsx(styles.value)}>{user.username}</div>
                </div>
                <div className={clsx(styles.row)}>
                    <div className={clsx(styles.label)}>Email</div>
                    <div className={clsx(styles.value)}>{user.email}</div>
                </div>
                <div className={clsx(styles.row)}>
                    <div className={clsx(styles.label)}>Phone</div>
                    <div className={clsx(styles.value)}>{user.phone}</div>
                </div>
                <div className={clsx(styles.row)}>
                    <div className={clsx(styles.label)}>Website</div>
                    <div className={clsx(styles.value)}>
                        <a
                            className={clsx(styles.link)}
                            href={user.website}
                            target="_blank"
                            rel="noopener"
                        >
                            {user.website}
                        </a>
                    </div>
                </div>
                <div className={clsx(styles.row)}>
                    <div className={clsx(styles.label)}>Address</div>
                    <div className={clsx(styles.value)}>
                        {`${user.address.street}, ${user.address.city}`}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Profile() {
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => res.json())
            .then((user) => {
                setUser(user);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className={styles.wrapper}>
            {isLoading && <Skeleton />}
            {user && <ProfileDetail user={user} />}
        </div>
    );
}

export default Profile;

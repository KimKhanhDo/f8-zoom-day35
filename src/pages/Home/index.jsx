import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Welcome to F8 React Day 35</h1>
            </div>
        </div>
    );
}

export default Home;

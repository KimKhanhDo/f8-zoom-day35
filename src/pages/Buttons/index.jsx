import Button from '../../components/Button';
import styles from './Buttons.module.css';

function Buttons() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Buttons Demo</h1>

                <div className={styles.buttons}>
                    <Button
                        color="alert"
                        onClick={() => alert('Clicked Alert!')}
                    >
                        <span>🚨</span> Click Alert
                    </Button>

                    <Button
                        className={styles.customBtn}
                        onClick={() => alert('Custom Button')}
                    >
                        <span>💅</span> Custom Button
                    </Button>

                    <Button
                        color="secondary"
                        loading
                        onClick={() => console.log('Should not log')}
                    >
                        <span>Loading Button</span>
                    </Button>

                    <Button
                        disabled
                        onClick={() => alert('Should not show')}
                    >
                        <span>🚫</span> Disabled Button
                    </Button>

                    <Button
                        color="primary"
                        onClick={() => alert('Email Sent!')}
                    >
                        <span>📧</span> Send Email
                    </Button>
                </div>

                <div className={styles.buttons}>
                    <Button>
                        <span>🕹️</span> Normal
                    </Button>

                    <Button color="primary">
                        <span>🕹️</span> Primary
                    </Button>

                    <Button color="secondary">
                        <span>🕹️</span> Secondary
                    </Button>

                    <Button color="alert">
                        <span>🕹️</span> Alert
                    </Button>
                </div>

                <div className={styles.buttons}>
                    <Button rounded>Rounded</Button>

                    <Button
                        rounded
                        bordered
                    >
                        Bordered
                    </Button>

                    <Button
                        color="primary"
                        rounded
                        href="https://google.com"
                        target="_blank"
                    >
                        Go to Google
                    </Button>

                    <Button
                        color="alert"
                        rounded
                        bordered
                        disabled
                        className={styles.customRounded}
                    >
                        Disabled
                    </Button>
                </div>

                <div className={styles.buttons}>
                    <Button size="small">Small</Button>

                    <Button color="primary">Medium</Button>

                    <Button
                        color="secondary"
                        size="large"
                    >
                        Large
                    </Button>

                    <Button
                        className={styles.customBtn}
                        size="large"
                    >
                        Custom
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Buttons;

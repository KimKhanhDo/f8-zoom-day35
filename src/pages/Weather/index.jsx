import React from 'react';
import PropTypes from 'prop-types';

import styles from './Weather.module.css';

function DropDownItem({ city }) {
    return <option value={city.id}>{city.name}</option>;
}

function MainDisplay({ city }) {
    if (!city) return null;

    const icon = city.weather?.[0].icon;
    const desc = city.weather?.[0]?.description ?? '';
    const temp = Math.round(city.main?.temp ?? 0);

    return (
        <div className={styles['w-mid']}>
            <div className={styles.city}>{city.name}</div>
            <div className={styles.desc}>{desc}</div>
            <div>
                {icon ? (
                    <img
                        alt={desc}
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        className={styles.icon}
                    />
                ) : (
                    '—'
                )}
            </div>
            <div className={styles.temp}>
                <span>{temp}</span>
                <span className={styles.deg}>°C</span>
            </div>
        </div>
    );
}

function Footer({ city }) {
    if (!city) return;

    const humidity = city.main?.humidity || '';
    const status = city.weather?.[0]?.main || '';
    const tempMin = Math.round(city.main?.temp_min ?? 0);
    const tempMax = Math.round(city.main?.temp_max ?? 0);
    return (
        <div className={styles['w-bottom']}>
            <div className={styles['w-col']}>
                <span className={styles.label}>Humidity</span>
                <span className={styles.value}>
                    <span>{humidity}</span>%
                </span>
            </div>
            <div className={styles['w-col']}>
                <span className={styles.label}>Status</span>
                <span className={styles.value}>{status}</span>
            </div>
            <div className={styles.split}></div>
            <div className={styles['w-col']}>
                <span className={styles.label}>Lowest Temp</span>
                <span className={styles.muted}>{`${tempMin}°C`}</span>
            </div>
            <div className={styles['w-col']}>
                <span className={styles.label}>Highest Temp</span>
                <span className={styles.muted}>{`${tempMax}°C`}</span>
            </div>
        </div>
    );
}

const API_KEY = 'e8346609ea3f487328a1a71904677d68';
const cities = [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Hobart',
    'Canberra',
    'Darwin',
];

function Weather() {
    const [data, setData] = React.useState([]);
    const [selectedId, setSelectedId] = React.useState('');

    const url = (city) =>
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
        )},au&units=metric&appid=${API_KEY}`;

    React.useEffect(() => {
        Promise.all(
            cities.map((city) => fetch(url(city)).then((res) => res.json()))
        ).then((results) => {
            console.log(results);

            setData(results);
            if (results[0]?.id) setSelectedId(results[0].id);
        });
    }, []);

    const currentCity = data.find((city) => city.id === selectedId);

    const randomTemp = (temp) => temp + (Math.random() * 10 - 5);
    const randomHumidity = (humidity) =>
        Math.max(
            0,
            Math.min(100, humidity + Math.floor(Math.random() * 11 - 5))
        );

    const handleRefresh = () => {
        setData(
            data.map((city) =>
                city.id === selectedId
                    ? {
                          ...city,
                          main: {
                              ...city.main,
                              temp: randomTemp(city.main.temp),
                              humidity: randomHumidity(city.main.humidity),
                          },
                      }
                    : city
            )
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.weather}>
                <div className={styles['w-top']}>
                    <select
                        value={selectedId}
                        onChange={(e) => setSelectedId(Number(e.target.value))}
                        id="citySelect"
                        className={styles.select}
                        title="Choose city"
                    >
                        {data.map((city) => (
                            <DropDownItem
                                key={city.id}
                                city={city}
                            />
                        ))}
                    </select>
                    <button
                        id="refreshBtn"
                        className={styles.btn}
                        type="button"
                        onClick={handleRefresh}
                    >
                        Refresh
                    </button>
                </div>

                <MainDisplay city={currentCity} />

                <Footer city={currentCity} />
            </div>
        </div>
    );
}

DropDownItem.propTypes = {
    city: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
};

MainDisplay.propTypes = {
    city: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        main: PropTypes.shape({
            temp: PropTypes.number,
        }),
        weather: PropTypes.arrayOf(
            PropTypes.shape({
                icon: PropTypes.string,
                description: PropTypes.string,
            })
        ),
    }),
};

Footer.propTypes = {
    city: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        main: PropTypes.shape({
            humidity: PropTypes.number,
            temp_min: PropTypes.number,
            temp_max: PropTypes.number,
        }),
        weather: PropTypes.arrayOf(
            PropTypes.shape({
                main: PropTypes.string,
            })
        ),
    }),
};

export default Weather;

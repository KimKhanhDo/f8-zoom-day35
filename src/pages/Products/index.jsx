import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Products.module.css';

function SkeletonItem() {
    return (
        <article className={styles.card}>
            <div
                className={clsx(
                    styles['post - id'],
                    styles.skeleton,
                    styles['sk-badge']
                )}
            />
            <div
                className={clsx(styles.skeleton, styles['sk-title'])}
                style={{ marginTop: 4 }}
            />
            <div
                className={clsx(styles.skeleton, styles['sk-line'])}
                style={{ marginTop: 6 }}
            />
            <div className={clsx(styles.skeleton, styles['sk-line'])} />
            <div
                className={clsx(
                    styles.skeleton,
                    styles['sk-line'],
                    styles.short
                )}
            />
            <div
                className={styles.actions}
                style={{ gap: 8, marginTop: 10 }}
            >
                <div
                    className={clsx(styles.skeleton, styles['sk-btn'])}
                    style={{ width: 120 }}
                />
            </div>
            <div className={styles.shimmer} />
        </article>
    );
}

function Skeleton() {
    const items = [...Array(12)];
    return (
        <section className={styles.grid}>
            {items.map((_, index) => (
                <SkeletonItem key={index} />
            ))}
        </section>
    );
}

function ProductItem({ product, handleOpenModal }) {
    return (
        <article className={styles.card}>
            <span className={styles['post-id']}>ID: {product.id}</span>
            <h3 className={styles.title}>{product.title}</h3>
            <p className={styles.body}>{product.body}</p>
            <div className={styles.actions}>
                <button
                    className={styles.btn}
                    onClick={handleOpenModal}
                >
                    Detail
                </button>
            </div>
        </article>
    );
}

function Modal({ product, handleCloseModal }) {
    return (
        <div
            id={product.id}
            className={clsx(styles.modal, styles.show)}
        >
            <div className={styles['modal__content']}>
                <h3
                    id="modal-title"
                    className={styles['modal__title']}
                >
                    {product.title}
                </h3>
                <div className={styles['modal__body']}>{product.body}</div>

                <button
                    onClick={handleCloseModal}
                    className={styles['modal__close']}
                >
                    &times;
                </button>
            </div>
        </div>
    );
}

function Products() {
    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=12')
            .then((res) => res.json())
            .then((products) => {
                setProducts(products);
                setIsLoading(false);
            });
    }, []);

    const handleOpenModal = (product) => setSelectedProduct(product);
    const handleCloseModal = () => setSelectedProduct(null);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Product List</h1>
                {isLoading && <Skeleton />}
                <section className={styles.grid}>
                    {products.length !== 0 &&
                        products.map((product) => (
                            <ProductItem
                                key={product.id}
                                product={product}
                                handleOpenModal={() => handleOpenModal(product)}
                            />
                        ))}
                </section>

                {selectedProduct && (
                    <Modal
                        product={selectedProduct}
                        handleCloseModal={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
}

ProductItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
    }),
    handleOpenModal: PropTypes.func,
};

Modal.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
    }),
    handleCloseModal: PropTypes.func,
};

export default Products;

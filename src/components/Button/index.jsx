import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Button.module.css';

function Button({
    size = 'medium',
    color,
    loading = false,
    disabled = false,
    rounded = false,
    bordered = false,
    children,
    href,
    className,
    onClick,
    ...passProps
}) {
    const classNames = clsx(
        styles.btn,
        styles[size],
        styles[color],
        className,
        {
            [styles.rounded]: rounded,
            [styles.bordered]: bordered,
            [styles.loading]: loading,
            [styles.disabled]: disabled,
        }
    );

    const isDisable = loading || disabled;
    let Component = href ? 'a' : 'button';

    const handleClick = (e) => {
        if (isDisable) {
            e.preventDefault();
            return;
        }

        onClick?.();
    };

    return (
        <Component
            {...passProps}
            href={href}
            className={classNames}
            onClick={handleClick}
        >
            {/* spinner: luôn render, chỉ hiện khi có class loading */}
            <span className={styles.spinner} />

            {/* label: ẩn bằng visibility */}
            <span className={styles.label}>{children}</span>
        </Component>
    );
}

// Validate đầu vào
Button.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    rounded: PropTypes.bool,
    bordered: PropTypes.bool,
    href: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;

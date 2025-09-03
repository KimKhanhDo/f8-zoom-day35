import React from 'react';
import PropTypes from 'prop-types';

import styles from './Todo.module.css';

function FormInput({ inputValue, handleInputChange, handleSubmit }) {
    return (
        <form
            className={styles['todo__form']}
            onSubmit={handleSubmit}
        >
            <input
                value={inputValue}
                onChange={handleInputChange}
                className={styles['todo__input']}
                placeholder="Add new task..."
            />
            <button
                className={styles['todo__add-btn']}
                type="submit"
            >
                Add
            </button>
        </form>
    );
}

function EmptyState() {
    return (
        <p className={styles['todo__empty']}>
            There is no task. Add your first task!
        </p>
    );
}

function TodoItem({ todo, handleCheck, handleDelete }) {
    return (
        <li className={styles['todo__item']}>
            <input
                id={todo.id}
                onChange={handleCheck}
                checked={todo.completed}
                className={styles['todo__checkbox']}
                type="checkbox"
            />
            <label
                htmlFor={todo.id}
                className={styles['todo__text']}
            >
                {todo.text}
            </label>
            <button
                onClick={handleDelete}
                className={styles['todo__delete-btn']}
                type="button"
            >
                Delete
            </button>
        </li>
    );
}

function StatItem({ label, value }) {
    return (
        <div className={styles.stat}>
            {label}: <strong>{value}</strong> task(s)
        </div>
    );
}

let uniqID = 0;
function Todo() {
    const [inputValue, setInputValue] = React.useState('');
    const [todos, setTodos] = React.useState([]);

    const handleInputChange = (e) => setInputValue(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue.trim()) {
            setTodos([
                ...todos,
                {
                    id: ++uniqID,
                    text: inputValue,
                    completed: false,
                },
            ]);

            setInputValue('');
        }
    };

    const handleCheck = (e, id) => {
        const value = e.target.checked;

        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: value } : todo
            )
        );
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const completedCount = todos.filter((todo) => todo.completed).length;
    const remainingCount = todos.filter(
        (todo) => todo.completed === false
    ).length;

    return (
        <div className={styles.wrapper}>
            <div className={styles.todo}>
                <header className={styles['todo__header']}>
                    <h1 className={styles['todo__title']}>Todo List</h1>
                </header>

                <FormInput
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />

                {todos.length === 0 && <EmptyState />}

                <ul className={styles['todo__list']}>
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            handleCheck={(e) => handleCheck(e, todo.id)}
                            handleDelete={() => handleDelete(todo.id)}
                        />
                    ))}
                </ul>

                <section className={styles['todo__stats']}>
                    <StatItem
                        label="Total"
                        value={todos.length}
                    />
                    <StatItem
                        label="Completed"
                        value={completedCount}
                    />
                    <StatItem
                        label="Remaining"
                        value={remainingCount}
                    />
                </section>
            </div>
        </div>
    );
}

FormInput.propTypes = {
    inputValue: PropTypes.string,
    handleInputChange: PropTypes.func,
    handleSubmit: PropTypes.func,
};

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        completed: PropTypes.bool,
    }),
    handleCheck: PropTypes.func,
    handleDelete: PropTypes.func,
};

StatItem.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
};

export default Todo;

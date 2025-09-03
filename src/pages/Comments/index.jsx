import React from 'react';
import styles from './Comments.module.css';

function CommentLoader() {
    return (
        <div className={styles['cmt-loader']}>
            <span className={styles['cmt-loader__icon']}>
                <span className={styles['cmt-dot']}></span>
                <span className={styles['cmt-dot']}></span>
                <span className={styles['cmt-dot']}></span>
            </span>
            <span className={styles['cmt-loader__text']}>
                Loading comments…
            </span>
        </div>
    );
}

function CommentForm({ form, handleInputChange, handleSubmit }) {
    return (
        <form
            className={styles['comment-form']}
            onSubmit={handleSubmit}
        >
            <input
                value={form.name}
                onChange={handleInputChange}
                name="name"
                type="text"
                placeholder="Your name"
                required
            />
            <input
                value={form.email}
                onChange={handleInputChange}
                name="email"
                type="email"
                placeholder="Your email"
                required
            />
            <textarea
                value={form.body}
                onChange={handleInputChange}
                name="body"
                placeholder="Write comment..."
                required
            ></textarea>
            <button type="submit">Send comment</button>
        </form>
    );
}

function CommentItem({ comment }) {
    return (
        <div className={styles.comment}>
            <img
                className={styles['comment__avatar']}
                src={`https://ui-avatars.com/api/?name=${comment.name}&background=random`}
                alt="avatar"
            />
            <div className={styles['comment__body']}>
                <div className={styles['comment__header']}>
                    <div>
                        <div className={styles['comment__author']}>
                            {comment.name}
                        </div>
                        <div className={styles['comment__email']}>
                            {comment.email}
                        </div>
                    </div>
                    <div className={styles['comment__time']}>2 hrs ago</div>
                </div>
                <div className={styles['comment__text']}>{comment.body}</div>
            </div>
        </div>
    );
}

let uniqueID = 5;
function Comments() {
    const [form, setForm] = React.useState({ name: '', email: '', body: '' });
    const [comments, setComments] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
            .then((res) => res.json())
            .then((comments) => {
                setComments(comments);
                setIsLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValidInput = Object.values(form).every((value) => value.trim());
        if (!isValidInput) return;

        setComments([...comments, { postId: 1, id: ++uniqueID, ...form }]);
        setForm({ name: '', email: '', body: '' });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Start Comment</h1>

                <CommentForm
                    form={form}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
                {isLoading && <CommentLoader />}

                <div className={styles.comments}>
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Comments;

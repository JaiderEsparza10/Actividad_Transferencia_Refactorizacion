const url = 'http://localhost:3000';

export const getPosts = async () => {
    const response = await fetch(`${url}/posts`);
    const data = await response.json();
    return data;
}

export const getComments = async (postId) => {
    const response = await fetch(`${url}/comments?postId=${postId}`);
    const data = await response.json();
    return data;
}

export const deleteComment = async (id) => {
    await fetch(`${url}/comments/${id}`, {
        method: 'DELETE'
    });
}

export const deletePost = async (id) => {
    await fetch(`${url}/posts/${id}`, {
        method: 'DELETE'
    });
}
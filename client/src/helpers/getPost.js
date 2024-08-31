import axios from "axios";
import { toast } from 'react-toastify';

const backendURL = import.meta.env.VITE_backendURL;

export async function getPost(postID, setPost, setUsername, setlikeCount) {
    try {
        const response = await axios.get(`${backendURL}/feed/${postID}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                }
            }
        );
        const data = response.data;
        
        setPost(data.post);
        setUsername(data.post.username);
        setlikeCount(data.post.likeCount);
    }
    catch (e) {
        toast.error('Error fetching post');
        console.log('Error fetching post : ' + e);
    }
}
import axios from 'axios';
import { toast } from 'react-toastify';
const backendURL = import.meta.env.VITE_backendURL;

export async function Dislike(postID, setlikeCount, setLiked) {
    try {
        const response = await axios.get(`${backendURL}/feed/dislike/${postID}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                }
            }
        )
        const data = response.data;

        if (data.status === 'success') {
            setlikeCount(data.newLikeCount);
            setLiked(false);
            console.log('Disliked post');
        }
        else {
            toast.error('Error disliking post');
            console.log('Error : ' + data.message);
        }
    }
    catch (e) {
        toast.error('Error disliking post');
        console.log('Error disliking post : ' + e);
    }
}
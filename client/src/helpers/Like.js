import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
const backendURL = import.meta.env.VITE_backendURL;

export async function Like(postID, setLikeCount, setLiked) {
    try {
        const response = await axios.get(`${backendURL}/feed/like/${postID}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                }
            }
        )
        const data = response.data;

        if (data.status === 'success') {
            console.log('Liked post');
            setLikeCount(data.newLikeCount);
            setLiked(true);
        }
        else {
            if (data.message === 'Not authorised') {
                toast.warn('Login to like post');
            }
            else {
                toast.error('Error liking post');
                console.log('Error : ' + data.message);
            }
        }
    }
    catch (e) {
        toast.error('Error liking post');
        console.log('Error liking post : ' + e);
    }
}
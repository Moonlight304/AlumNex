import axios from "axios";
import { toast } from 'react-toastify';
const backendURL = import.meta.env.VITE_backendURL;

export async function checkLiked(postID, setLiked) {
    try {
        const response = await axios.get(`${backendURL}/feed/checkLiked/${postID}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                }
            }
        )
        const data = response.data;        

        if (data.status === 'success')
            setLiked(JSON.parse(data.liked));
        else {
            if (data.message === 'Not authorised') return;

            toast.error(`${data.message}`);
            console.log('Error : ' + data.message);
        }
    }
    catch (e) {
        toast.error(`${e.message}`);
        console.log('Error : ' + e);
    }
}
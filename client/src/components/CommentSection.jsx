import axios from "axios";
import { useState } from "react";
import { Comments } from "./Comments";
import { toast } from 'react-toastify';

const backendURL = import.meta.env.VITE_backendURL;

export function CommentSection({ commentsArray, postID }) {    
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(commentsArray);

    

    return (
        
    );
}

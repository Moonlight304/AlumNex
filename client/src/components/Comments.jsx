
export function Comments({ comment }) {

    return (
        <div className="flex items-center mb-4 ms-5">
            <svg
                className="w-8 h-8 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
            </svg>
            <div>
                <p className="font-medium text-gray-700"> {comment?.username} </p>
                <p className="text-gray-600">{comment?.content}</p>
            </div>
        </div>
    );
}
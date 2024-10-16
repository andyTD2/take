import MessageReply from "./MessageReply";
import ReplyBox from "./ReplyBox";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postData } from "./utils/fetch";
import { useStore } from "./Store";


export default function Message({data, appendReply})
{
    const [replyBoxOpen, setReplyBoxOpen] = useState(false);
    const user = useStore((state) => state.user);

    const submitReply = (editorContent) =>
    {
        postData({
            baseRoute: "https://localhost:3000/sendMessage",
            body: 
            {
                body: editorContent,
                parentId: data.id,
                recipient: user == data.recipient_name ? data.sender_name : data.recipient_name
            },
            onSuccess: (result) => 
            {
                setReplyBoxOpen(false);
                appendReply(data.id, 
                            {
                                body: editorContent,
                                parentId: data.id,
                                minutesSinceCreation: 0,
                                recipient_name: user == data.recipient_name ? data.sender_name : data.recipient_name,
                                sender_name: user,
                                status: "unread",
                                id: result.insertId
                            }
                )
            },
            onFailure: (error) => {
                console.log(error);
            }
        })
    }

    let correspondent; 
    if(data.sender_name == user)
    {
        correspondent = 
            <div className="flex">
                <img className='placeholder-avatar rounded-full w-4 h-4 bg-red-500 mr-1' src={data.recipientProfilePic}></img>
                <Link to={`/u/${data.recipient_name}`} className="hover:underline text-xs align-middle text-zinc-300">{data.recipient_name}</Link>
            </div>
    }
    else
    {
        correspondent = 
            <div className="flex">
                <img className='placeholder-avatar rounded-full w-4 h-4 bg-red-500 mr-1' src={data.senderProfilePic}></img>
                <Link to={`/u/${data.sender_name}`} className="hover:underline text-xs align-middle text-zinc-300">{data.sender_name}</Link>
            </div>
    }

    return (
        <div className="content-item bg-zinc-950 mb-8 min-h-24 flex flex-row pr-2 rounded-md">  
            <div className="flex flex-col px-4 py-2 mr-auto w-full min-w-0">

                
                {correspondent}
                <div className="text-xl font-semibold">{data.title}</div>

                <div className="border-l-[1px] border-dashed border-zinc-500 pl-2">
                    <MessageReply data={data}></MessageReply>
                    {data.replies.map(reply => 
                        <MessageReply data={reply} key={reply.id}></MessageReply>
                    )}
                </div>

                <div onClick={() => setReplyBoxOpen(prev => !prev)} className="text-zinc-300 hover:underline hover:cursor-pointer w-min">reply</div>

                {replyBoxOpen && <ReplyBox className="mt-4"
                    onSubmit={submitReply}
                />}

            </div>
        </div>
    );
}

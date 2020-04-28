import {useContext, useState, useEffect, useRef, useReducer, useMemo } from 'react';
import {MovieContext} from "../../pages";
import commentJson from '../../common/assets/comments';

export default function Comments() {
    const [commIdx, setCommIdx] = useState(0);
    const [isVisible, setVisible] = useState(false);


    function changeNextComm(){
        const commRange = commentJson.comments.length;
        if(commIdx < commRange - 1){
            setCommIdx(commIdx + 1);
        }else{
            setCommIdx(0);
        }
    }

    useEffect(()=>{
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 2000);
        setTimeout(()=>{
            changeNextComm();
        }, 2500);

        return () => {

        };
    }, [commIdx]);

    return (
        <>
            <div className={'comments'}>
                <div className={'comments-wrap'}>
                    <div className="comments-content">
                        {commentJson.comments[commIdx].comment}
                    </div>
                    <div className="comments-movie">
                        {commentJson.comments[commIdx].movie}
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .comments {
                        width: 100%;
                        display:flex;
                        justify-content:center;
                        margin: 80px 0;
                    }
                    .comments-wrap {
                        width: 420px;
                        height: 200px;
                        opacity: ${isVisible ? 1 : 0};
                        transition: opacity 0.5s;
                        position: relative;
                        
                    }
                    .comments-content {
                        font-size: 22px;
                        color: #fefefe;
                        font-style: italic;
                        text-align:center;
                    }
                    .comments-content::before, .comments-content::after {
                        font-size: 25px;
                        color: #bbb;
                        content:'"';
                    }
                    .comments-movie {
                        font-size: 18px;
                        color: #ddd;
                        font-style: italic;
                        display:inline-block;
                        position: absolute;
                        bottom:0;
                        right: 0;
                    }
                `}
            </style>
        </>
    )
}

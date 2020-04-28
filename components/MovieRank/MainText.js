import {useContext} from 'react';
import {MovieContext} from "../../pages";

export default function MainText(){
    const {nDate} = useContext(MovieContext);
    return (
        <>
            <div className={'maintext'}>
                <div className={'title'}>
                    <span>{nDate.getFullYear()}년 {nDate.getMonth() + 1}월 {nDate.getDate()}일</span><br/>
                    오늘의 인기영화를 만나보세요.
                </div>
            </div>
            <style jsx>
                {`
                    .maintext {
                        width:100%;
                        display:flex;
                        justify-content:center;
                        flex-direction:column;
                        align-items:center;
                        padding:110px 0;
                    }
                    .title {
                        color:#fdfdfd;
                        font-size:32px;
                        text-align:center;
                        line-height:60px;
                    }
                    .title > span {
                        font-size:46px;
                    }
                `}
            </style>
        </>
    );
}

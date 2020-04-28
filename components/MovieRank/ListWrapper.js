import {useContext} from 'react';
import MovieList from "./MovieList";
import MainText from "./MainText";
import {MovieContext} from "../../pages";
import Comments from "./Comments";

export default function ListWrapper() {
    const {nDate} = useContext(MovieContext);
    const yesday = new Date(nDate.getTime() - (1000 * 60 * 60 * 24));
    return (
        <>
            <MainText/>
            <Comments/>
            <div className="movie-wrapper">
                <div className="list-title">
                    <div className={'list-title-text'}>Box Office Ranking</div>
                    <div className={'list-cmnt'}>{`${yesday.getFullYear()}년 ${yesday.getMonth() + 1}월 ${yesday.getDate()}일 기준`}</div>
                </div>
                <div className="list-wrapper">
                    <MovieList/>
                </div>
            </div>
            <style jsx>
                {`
                    .movie-wrapper {
                        width: 90%;
                        max-width: 1020px;
                        margin-bottom: 70px;
                    }
                    .list-title {
                        font-size: 41px;
                        font-weight: bold;
                        background: #e34236;
                        width:100%;
                        color:#fff;
                        text-align:center;
                        padding: 30px 0;
                        position:relative;
                    }
                    .list-title-text {
                        margin-bottom: 20px;
                    }
                    .list-cmnt {
                        font-size: 13px;
                        color: #fefefe;
                        position:absolute;
                        bottom:10px;
                        right: 10px;
                    }
                    .list-wrapper {
                        background: #fafafa;
                    }
                `}
            </style>
        </>
    )
}

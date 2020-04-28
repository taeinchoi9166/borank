import {useState, useEffect, useRef} from 'react';
import { Query, useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import MovieDetail from "./MovieDetail";
import MovieImage from "../common/MovieImage";
import CancelIcon from "../../common/assets/cancel.svg";

const GET_MOVIE = gql`
    query movie($movieCd: String!) {
        movie(movieCd: $movieCd){
            actorNm,
            genreNm,
            movieCd,
            movieNm,
            nationNm,
            openDt,
            peopleNm,
            showTm,
            watchGradeNm
        }
    }
`;



export default function MovieWrapper(props) {
    const [movieTitle, setMovieTitle] = useState('');
    const [popupFadedFlag, setPopupFadedFlag] = useState(false);
    const movieRef = useRef();
    const popupFlag = props.popupFlag;

    useEffect(()=>{
        const mtg = movieRef.current;

        if(popupFlag){
            mtg.style.display = 'inline-block';
            mtg.style.opacity = 0;

            setTimeout(()=>{
                mtg.style.opacity = 1;
            },500);

        }else{
            mtg.style.opacity = 0;
            setTimeout(()=>{
                mtg.style.display = 'none';
            },700);
        }
    },[popupFlag, popupFlag]);

    return (
        <>
            <div className={'movie-wrapper'} ref={movieRef}>
                <div className={'movie-wrapper-bg'}/>
                <div className={'movie-popup'} onClick={e=>{
                    props.onClosePopup();
                }}>
                    <div className={'movie-popup-wrap'} onClick={e=>{
                        e.stopPropagation();
                    }}>
                        <div className={'movie-header'}>
                            <div className={'movie-header-title'}>{props.movieTitle}</div>
                            <div className={'cancel-btn'} onClick={props.onClosePopup}>
                                <CancelIcon width={20} height={20}/>
                            </div>
                        </div>
                        <div className={'movie-info'}>
                            <div className={'movie-content'}>
                                <Query query={GET_MOVIE} variables={{
                                    movieCd: props.movieCd
                                }}>
                                    {
                                        ({loading, error, data}) => {
                                            if(loading) return <div className={'movie-content-load'}>loading...</div>;
                                            if(error) return <div className={'movie-content-error'}>error...</div>;

                                            if(data && data.movie){
                                                props.onChangeMovieTitle(data.movie.name);
                                                return (
                                                    <>
                                                        <MovieImage movieCd={data.movie.movieCd} imgLoadFlag={true} posterViewMode={'movie'}/>
                                                        <MovieDetail {...data.movie}/>
                                                    </>
                                                );
                                            }else {
                                                return <div>???</div>
                                            }
                                        }
                                    }
                                </Query>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>
                {`
                    .movie-wrapper {
                        width:100vw;
                        height:100vh;
                        position:fixed;
                        z-index: 999;
                        display:none;
                        transition: 
                            opacity 0.5s linear;
                    }
                    
                    .movie-wrapper-bg {
                        width:100%;
                        height:100%;
                        display:inline-block;
                        background: rgba(10,10,10,0.5);
                        position:absolute;
                        left:0;
                        top:0;
                    }

                    .movie-popup {
                        width: 100%;
                        height:100%;
                        display:flex;
                        justify-content:center;
                        align-items: center;
                        flex-direction: column;
                        transition:all 0.5s;
                        position:relative;
                    }
                    
                    .movie-popup-wrap {
                        display:inline-block;
                        background: #fff;
                        position:relative;
                        min-width: 120px;
                        overflow:hidden;
                        border-radius: 5px;
                        max-height: 90%;
                        max-width: 90%;
                        transition:all 0.5s;
                        z-index: 2;
                    }
                    
                    .movie-header {
                        width:100%;
                        display:inline-block;
                        background: #e34236;
                        padding: 15px 7px;
                        height: 60px;
                        top: 0;
                        position: absolute;
                        z-index:2;
                    }
                    
                    .movie-header-title {
                        font-size: 24px;
                        color: #fff;
                        font-weight: bold;
                        margin-left: 30px;
                    }

                    .cancel-btn {
                        position: absolute;
                        top:15px;
                        right: 25px;
                        font-size: 14px;
                        color: #777;
                        cursor: pointer;
                        border-radius: 20px;
                        transition: all 0.9s;
                        padding: 3px 4px;
                        
                    }


                    .movie-cancel-btn::before, .movie-cancel-btn::after{
                        content:'';
                        display:block;
                        width:0%;
                        height:0%;
                        border: 1.5px solid transparent;
                        z-index: 4;
                        position:absolute;
                    }

                    .movie-cancel-btn::before {
                        top:-7.5px;
                        left:-12px;
                        transition:
                            width 0.2s ease-in-out 0s,
                            height 0.2s ease-in-out 0.2s;
                    }

                    .movie-cancel-btn::after {
                        bottom:-7.5px;
                        right:-12px;
                        transition:
                            width 0.2s ease-in-out 0.4s,
                            height 0.2s ease-in-out 0.6s,
                            border-color 0s ease-in-out 0.4s;
                    }

                    .movie-cancel-btn:hover::before, .movie-cancel-btn:hover::after{
                        width: calc(100% + 20px);
                        height: calc(100% + 12px);
                    }

                    .movie-cancel-btn:hover::before {
                        border-top-color: #333;
                        border-right-color: #333;
                        transition:
                            width 0.2s ease-in-out 0s,
                            height 0.2s ease-in-out 0.2s;
                    }

                    .movie-cancel-btn:hover::after{
                        border-bottom-color: #333;
                        border-left-color: #333;
                        transition:
                            width 0.2s ease-in-out 0.4s,
                            height 0.2s ease-in-out 0.6s,
                            border-color 0s ease-in-out 0.4s;
                    }
                    
                    .movie-info {
                        width:100%;
                        margin-top:60px;
                        height: calc(100% - 60px);
                        overflow:auto;
                    }
                    
                    .movie-content-load, .movie-content-error {
                        display: flex;
                        justify-content:center;
                        flex-direciton: column;
                        align-items:center;
                    }

                    .movie-content {
                        width: 100%;
                        position:relative;
                        padding: 20px;
                        display:inline-flex;
                    }
                    
                    
                `}
            </style>
        </>
    );
}

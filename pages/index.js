import React, {useState, createContext, useContext, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import ListWrapper from "../components/MovieRank/ListWrapper";
import Footer from "../components/common/Footer";
import MainBackground from "../components/common/MainBackground";
import HoverMenu from "../components/common/HoverMenu";
import MovieWrapper from "../components/MovieInfo/MovieWrapper";
import InfoWrap from "../components/ProjectInfo/InfoWrap";
import PosterPreview from "../components/PosterPreview/PosterPreview";
import './fonts.css';
import './master.css';


const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache()
});

export const MovieContext = createContext({
    nDate: null,
    movieCd: '',
    movieTitle: '',
    popupFlag: false,
    imgLoadIndex: 0,
    posterViewFlag: false,
    posterImgUrl: '',
    goToMovieInfo: () => {},
    goNextImage: () => {},
    toggleProjectInfo: () => {},
    togglePosterView: () => {},
    changePosterUrl: () => {}
});

export default function Index(){
    const [movieCd, setMovieCd] = useState('');
    const [movieTitle, setMovieTitle] = useState('');
    const [popupFlag, setPopupFlag] = useState(false);
    const [imgLoadIndex, setImgLoadIndex] = useState(0);
    const [projectInfoFlag, setProjectInfoFlag] = useState(false);
    const [posterViewFlag, setPosterViewFlag] = useState(false);
    const [posterImgUrl, setPosterImgUrl] = useState('');

    const [posterX, setPosterX] = useState(0);
    const [posterY, setPosterY] = useState(0);
    const [posterW, setPosterW] = useState(0);
    const [posterH, setPosterH] = useState(0);


    const goToMovieInfo = (_movieCd) => {
        setMovieCd(_movieCd);
        setPopupFlag(true);
    };

    const closeMovieInfo = () => {
        setPopupFlag(false);
    };

    const goNextImage = () => {
        setImgLoadIndex(imgLoadIndex + 1);
    };

    const toggleProjectInfo = () => {
        setProjectInfoFlag(!projectInfoFlag);
    };

    const togglePosterView = img => {
        setPosterViewFlag(!posterViewFlag);
        if(img){
            setPosterX(img.x);
            setPosterY(img.y);
            setPosterW(img.w);
            setPosterH(img.h);
        }
    };

    const changePosterUrl = url => {
        setPosterImgUrl(url);
    };

    const changeMovieTitle = title => {
        setMovieTitle(title);
    };

    useEffect(() => {
        window.addEventListener('keyup', function(e){
            e.stopPropagation();

            const key = e.key;
            if(key === 'Escape'){
                if(posterViewFlag){
                    setPosterViewFlag(false);
                }else{
                    if(popupFlag){
                        setPopupFlag(false);
                    }
                }
            }
        });
    }, [movieCd, popupFlag, posterViewFlag]);


    return (
        <MovieContext.Provider value={{
            nDate: new Date(),
            movieCd: movieCd,
            popupFlag: popupFlag,
            imgLoadIndex: 0,
            posterViewFlag: posterViewFlag,
            posterImgUrl: posterImgUrl,
            goToMovieInfo: goToMovieInfo,
            goNextImage: goNextImage,
            toggleProjectInfo: toggleProjectInfo,
            togglePosterView: togglePosterView,
            changePosterUrl: changePosterUrl
        }}>
            <ApolloProvider client={client}>
                <div className={'container'}>
                    <MainBackground/>
                    <MovieWrapper movieCd={movieCd} movieTitle={movieTitle} onChangeMovieTitle={changeMovieTitle} popupFlag={popupFlag} onClosePopup={closeMovieInfo}/>
                    <InfoWrap projectInfoFlag={projectInfoFlag} onToggleProjectInfo={toggleProjectInfo}/>
                    <PosterPreview
                        posterViewFlag={posterViewFlag} posterImgUrl={posterImgUrl} onTogglePosterPreview={togglePosterView}
                        posterX={posterX} posterY={posterY} posterW={posterW} posterH={posterH}/>
                    <ListWrapper/>
                    {/*<HoverMenu/>*/}
                    <Footer/>
                </div>
                <style jsx>{`
                
                `}
                </style>
            </ApolloProvider>
        </MovieContext.Provider>
    );
}

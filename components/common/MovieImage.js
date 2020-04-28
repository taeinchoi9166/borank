import {useContext, useEffect} from 'react';
import {useQuery} from "react-apollo";
import {gql} from "apollo-boost";
import {MovieContext} from "../../pages";

const GET_MOVIE_IMAGE = gql`
    query movieImage($movieCd: String!){
        movieImage(movieCd: $movieCd)
    }
`;

function LoadErrorImage({loading, error}){
    return (
        <>
            {
                loading && <div className={'item-image-load'}>loading...</div>
            }
            {
                error && <div className={'item-image-error'}>error!</div>
            }
            <style jsx>
                {`
                         .item-image-load, .item-image-error {
                            width: 180px;
                            height: 255px;
                            background: #333;
                            display: flex;
                            justify-content:center;
                            flex-direciton: column;
                            align-items:center;
                            color: #fff;
                            font-size: 21px;
                        }
                    `}
            </style>
        </>
    );
}

export default function MovieImage({movieCd, imgLoadFlag, onFinishedImgLoad, posterViewMode}){
    const {togglePosterView, changePosterUrl} = useContext(MovieContext);

    const openPosterView = e => {
        const element = e.target;

        let startX, startY = 0;

        if(posterViewMode === 'movie'){
            const outerElement = document.body.querySelector('.movie-popup-wrap');
            const outerTop = outerElement.offsetTop;
            const outerLeft = outerElement.offsetLeft;

            startX = outerLeft + element.offsetLeft;
            startY = outerTop + 60 + element.offsetTop;
        }else if(posterViewMode === 'rank'){
            startX = element.offsetLeft;
            startY = element.offsetTop - window.scrollY;
        }

        togglePosterView({
            x:startX,
            y:startY,
            w:element.width,
            h:element.height,
            url:element.href,
            mode: posterViewMode
        });
        changePosterUrl(element.currentSrc);
    };

    useEffect(()=>{

    },[movieCd, imgLoadFlag]);

    if(true){
        const {loading, error, data} = useQuery(GET_MOVIE_IMAGE,{
            variables: {
                movieCd: movieCd
            }
        });

        if(data && data.movieImage) {
            return (
                <>
                    <img src={data.movieImage} className={'movie-image'} alt={'영화 포스터'} onClick={openPosterView}/>
                    <style jsx>
                        {`
                            .movie-image {
                                max-width: 180px;
                                height: auto;
                                cursor:pointer;
                                flex: 1;
                            }
                        `}
                    </style>
                </>
            );
        }
        else {
            return <LoadErrorImage loading={loading} error={error}/>;
        }
    }else{
        return <LoadErrorImage loading={true} error={false}/>;
    }

}

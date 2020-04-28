import React, {useContext} from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import DaIcon from '../../common/assets/downarrow.svg';
import UaIcon from '../../common/assets/uparrow.svg';
import KIcon from '../../common/assets/minus.svg';
import {toNumberFormatString} from '../../common/util';
import {MovieContext} from "../../pages";
import MovieImage from "../common/MovieImage";

const GET_MOVIE_IMAGE = gql`
    query movieImage($movieCd: String!){
        movieImage(movieCd: $movieCd)
    }
`;

export default function MovieItem(props) {
    const INTEN_SIZE = 14;
    const {goToMovieInfo, imgLoadIndex} = useContext(MovieContext);

    return (
        <>
            <div className="list-item">
                <MovieImage movieCd={props.movieCd} imgLoadFlag={imgLoadIndex + 1 === props.rank} posterViewMode={'rank'}/>
                <div className={"item-wrap"}>
                    <div className={"item-rank"}>
                        <div className={"item-rank-no"}>{props.rank}</div>
                        <div className={`item-rank-cnamt ${props.rankInten > 0 ? "inc" : ( props.rankInten < 0 ? "dec" : "")}`}>
                            {
                                props.isNewRanked ? (<div className={'item-rank-new'}>New!</div>) : (
                                    props.rankInten > 0 ?
                                        (<><UaIcon width={INTEN_SIZE} height={INTEN_SIZE}/> <div>{props.rankInten}</div></>) : (
                                            props.rankInten < 0 ?
                                                (<><DaIcon width={INTEN_SIZE} height={INTEN_SIZE}/> <div>{props.rankInten * -1}</div></>) : (<KIcon width={INTEN_SIZE} height={INTEN_SIZE}/>)
                                    )
                                )
                            }
                        </div>
                    </div>
                    <br/>
                    <div className={"item-title"}>{props.name}</div>
                    <div className={"item-open-dt"}>개봉일 : {props.openDate}</div>
                    <div className={"item-acc"}>
                        <div className="item-acc-audi">누적관객 수 : {toNumberFormatString(props.audiAcc)} 명</div>
                        <div className="item-acc-sales">누적판매량 : &#8361; {toNumberFormatString(props.salesAcc)}</div>
                    </div>
                    <button className="detail-btn" onClick={()=>{
                        goToMovieInfo(props.movieCd);
                    }}>
                        영화정보 보기
                    </button>
                </div>
            </div>
            <style jsx>
                {`
                    .list-item {
                        padding: 18px;
                        background: #fafafa;
                        height:100%;
                        margin-bottom:12px;
                        border-bottom: 1px solid #ddd;
                        float:left;
                        width:100%;
                        /*max-width:490px;*/
                        justify-content:space-between;
                        display:flex;
                        height: 300px;
                    }
                    
                    .list-item:last-child {
                        margin-bottom:0;
                        border-bottom:none;
                    }
            
                    .movie-image {
                        width:40%;
                        max-width: 180px;
                        height:auto;
                        max-height: 257px;
                    }
                    .item-image-load, .item-image-error {
                        width:40%;
                        max-width: 180px;
                        height:auto;
                        max-height: 257px;
                        background: #333;
                        display: flex;
                        justify-content:center;
                        flex-direciton: column;
                        align-items:center;
                        color: #fff;
                        font-size: 21px;
                    }
                    
                    
                    .item-wrap {
                        right: 0;
                        width:60%;
                        padding: 10px;
                        position:relative;
                    }
                    
                    .item-rank {
                        display: inline-block;
                        position:relative;
                        width:100%;
                    }
                    
                    .item-rank-no {
                        font-size: 40px;
                        font-style: italic;
                        font-weight: bold;
                        display: inline-block;
                        float:left;
                    }
                    
                    .item-rank-cnamt {
                        font-size: 20px;
                        float: left;
                        margin-top:20px;
                        margin-left:10px;
                        position: relative;
                    }
                    .item-rank-cnamt > * {
                        position: absolute;
                    }
                    .item-rank-cnamt > svg {
                        left: 20px;
                        top: 20px;
                    }
                    .item-rank-cnamt > div {
                        left: 20px;
                        top: 0px;
                    }
                    .item-rank-cnamt.inc {
                        color: #e63f29;
                        fill: #e63f29;
                    }
                    .item-rank-cnamt.dec {
                        color: #1667d9;
                        fill: #1667d9;
                    }
                    
                    .item-rank-new {
                        color: #f0cf4d;
                        font-weight: bold;
                        font=size: 12px;
                    }
                    
                    .item-title {
                        font-size: 20px;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 8px;
                        overflow:hidden;
                        max-height: 60px;
                        text-overflow: ellipsis;
                    }
                    
                    .item-open-dt, .item-acc-audi, .item-acc-sales {
                        font-size: 14px;
                    }
                    
                    .detail-btn {
                        background: #e34236;
                        color: #fff;
                        padding: 10px 0;
                        font-size: 16px;
                        cursor:pointer;
                        bottom:0;
                        position:absolute;
                        left:0;
                        margin:0 10px 10px 10px;
                        width: calc(100% - 20px);
                        border-radius: 6px;
                    }
                `}
            </style>
        </>
    )
}

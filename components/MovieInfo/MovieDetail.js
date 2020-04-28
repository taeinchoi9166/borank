import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Movie12Rate from '../../common/assets/12rate.png';
import Movie15Rate from '../../common/assets/15rate.png';
import Movie18Rate from '../../common/assets/18rate.png';
import MovieAllRate from '../../common/assets/allrate.png';
import MovieLimitRate from '../../common/assets/limitrate.png';
import {toDateFormat} from "../../common/util";




export default function MovieDetail(props) {

    const MovieRateImg = function(props){
        let img = MovieLimitRate;
        const wgNm = props.watchGradeNm;

        if(wgNm.indexOf('전체관람가') !== -1){
            img = MovieAllRate;
        }else if(wgNm.indexOf('12세이상관람가') !== -1){
            img = Movie12Rate;
        }else if(wgNm.indexOf('15세이상관람가') !== -1){
            img = Movie15Rate;
        }else if(wgNm.indexOf('청소년관람불가') !== -1){
            img = Movie18Rate;
        }

        // switch (props.watchGradeNm) {
        //     case '전체관람가':
        //         img = MovieAllRate;
        //         break;
        //     case '12세이상관람가':
        //         img = Movie12Rate;
        //         break;
        //     case '15세이상관람가':
        //         img = Movie15Rate;
        //         break;
        //     case '청소년관람불가':
        //         img = Movie18Rate;
        //         break;
        // }

        return <img src={img} width={40} height={40} style={{float:'left',marginRight:'10px'}}/>;
    };

    const dstr = `${props.openDt}`;
    const dt = dstr.substring(0,4) + '-' + dstr.substring(4,6) + '-' + dstr.substring(6,8);

    return (
        <>
            <div className={"movie-detail"}>
                <div className={"movie-title"}>{props.movieNm}</div>
                <table>
                    <tbody>
                        <tr className={"movie-wgrade"}>
                            <td><span className="movie-text-head">연령제한</span></td>
                            <td>
                                <MovieRateImg watchGradeNm={props.watchGradeNm}/>
                                <div className={"movie-wgrade-text"}>
                                    {props.watchGradeNm}
                                </div>
                            </td>
                        </tr>
                        <tr className={"movie-openDt"}>
                            <td><span className="movie-text-head">개봉날짜</span></td>
                            <td>
                                {dt}
                            </td>
                        </tr>
                        <tr className={"movie-stm"}>
                            <td><span className="movie-text-head">상영시간</span></td>
                            <td>
                                {props.showTm + "분"}
                            </td>
                        </tr>
                        <tr className={"movie-nation"}>
                            <td><span className="movie-text-head">제작국가</span></td>
                            <td>
                                {props.nationNm}
                            </td>
                        </tr>
                        <tr className={"movie-genre"}>
                            <td><span className="movie-text-head">장르</span></td>
                            <td>
                                {props.genreNm}
                            </td>
                        </tr>
                        <tr className={"movie-people"}>
                            <td><span className="movie-text-head">감독</span></td>
                            <td>
                                {props.peopleNm}
                            </td>
                        </tr>
                        <tr className={"movie-actor"}>
                            <td><span className="movie-text-head">출연</span></td>
                            <td>
                                {props.actorNm}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/*<div className={"movie-wgrade"}>{props.watchGradeNm}</div>*/}
                {/*<div className={"movie-openDt"}>*/}
                {/*    <span className={'movie-text-head'}>개봉날짜&nbsp;|&nbsp;</span>*/}
                {/*    {props.openDt}*/}
                {/*</div>*/}
                {/*<div className={"movie-stm"}>*/}
                {/*    <span className={'movie-text-head'}>상영시간&nbsp;|&nbsp;</span>*/}
                {/*    {Math.floor(props.showTm / 60) + "시간" +  (props.showTm % 60) + "분"}*/}
                {/*</div>*/}
                {/*<div className={"movie-nation"}>*/}
                {/*    <span className={'movie-text-head'}>제작국가&nbsp;|&nbsp;</span>*/}
                {/*    {props.nationNm}*/}
                {/*</div>*/}
                {/*<div className={"movie-genre"}>*/}
                {/*    <span className={'movie-text-head'}>장르&nbsp;|&nbsp;</span>*/}
                {/*    {props.genreNm}*/}
                {/*</div>*/}
                {/*<div className={"movie-people"}>*/}
                {/*    <span className={'movie-text-head'}>감독&nbsp;|&nbsp;</span>*/}
                {/*    {props.peopleNm}*/}
                {/*</div>*/}
                {/*<div className={"movie-actor"}>*/}
                {/*    <span className={'movie-text-head'}>개봉날짜&nbsp;|&nbsp;</span>*/}
                {/*    {props.actorNm}*/}
                {/*</div>*/}
            </div>
            <style jsx>
                {`
                    .movie-detail {
                        height:100%;
                        float:left;
                        padding: 7px;
                        flex: 1;
                    }
                     .movie-title {
                        width:100%;
                        text-align:center;
                        padding:10px 0;
                        font-size: 36px;
                        font-weight: bold;
                        margin-bottom: 6px;
                    }
                    .movie-wgrade > td:first-child {
                        height: 40px;
                    }
                    .movie-wgrade > td:nth-child(2) > *{
                        height: 40px;
                        float:left;
                    }
                    .movie-detail tr > td:first-child {
                        width: 30%;
                        display:flex;
                        align-items:center;
                        min-width: 100px;
                    }
                    .movie-wgrade td:first-child {
                        width: 30%;
                        display:flex;
                        align-items:center;
                        min-width: 100px;
                    }
                    .movie-detail tr > td:nth-child(2) {
                        width: 70%;
                        max-width: 300px;
                    }
                    .movie-wgrade {
                        font-size: 17px;
                    }
                    .movie-wgrade-text {
                        height: 40px;
                        line-height:40px;
                    }
                    .movie-detail > div:not(.movie-title){
                        color: #888;
                        margin-bottom: 6px;
                    }
                    .movie-text-head {
                        color: #444;

                    }
                `}
            </style>
        </>
    )
}

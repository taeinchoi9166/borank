import {useState, useEffect, useContext} from 'react';
import MovieItem from "./MovieItem";
import { Query } from "react-apollo";
import {useQuery} from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {MovieContext} from "../../pages";
import {toDateFormat} from "../../common/util";

const GET_RANK_ITEMS = gql`
        query rankItems($date: String!){
            rankItems(date: $date) {    
                movieCd
                rank
                rankInten
                isNewRanked
                name
                openDate
                salesAcc
                audiAcc
            }
        }
`;

export default function MovieList() {
    const {nDate} = useContext(MovieContext);

    useEffect(()=>{

    },[]);

    return (
        <>
            <div className="list-inner">
                <Query query={GET_RANK_ITEMS} variables={{
                   date: toDateFormat(new Date(nDate.getTime() - (1000 * 60 * 60 * 24)))
                }}>
                    {
                        ({loading, error, data}) => {
                            //console.log(loading, error, data);
                            if(loading) return (
                                <div className="list-load">
                                    Loading...
                                </div>
                            );
                            if(error) {
                                //console.log(error);
                                return (
                                    <div className="list-error">
                                        <span>&#128544;</span><br/>
                                        오류가 발생했습니다. 페이지를 새로고침하시거나 관리자에게 문의하세요.
                                    </div>
                                );
                            }

                            if(data){
                                //console.log(data);
                                const dList =  data.rankItems;
                                const itemList = [];
                                let key = 0;
                                for(const item of dList){
                                    itemList.push(
                                        (<MovieItem key={key++} {...item} />)
                                    );
                                }

                                return itemList;
                            }
                        }
                    }
                </Query>
            </div>
            <style jsx>
                {`
                    .list-inner {
                        padding: 20px;
                        display: inline-block;
                        width: 100%;
                    }
                    .list-load, .list-error {
                        width: 100%;
                        height: 200px;
                        display: inline-flex;
                        justify-content:center;
                        flex-direction: column;
                        align-items: center;
                        font-size: 40px;
                        text-align:center;
                        
                    }
                    .list-error span{
                        font-size: 78px;
                    }
                `}
            </style>
        </>
    )
}

import {useRef, useState, useEffect, useContext} from 'react';
import Plus from '../../common/assets/plus.svg';
import {MovieContext} from "../../pages";

export default function HoverMenu(){
    const btnRef = useRef();
    const [hmFlag, setHmFlag] = useState(false);
    const [creatorHoverFlag, setCreatorHoverFlag] = useState(false);

    const {toggleProjectInfo} = useContext(MovieContext);

    function toggleHoverMenu(){
        console.log(btnRef)
        if(hmFlag){ //
            btnRef.current.children[0].style.transform = 'rotate(0deg)';
        }else{ //
            btnRef.current.children[0].style.transform = 'rotate(260deg)';
        }

        setHmFlag(!hmFlag);
    }

    useEffect(()=>{
        btnRef.current.children[0].style.transition = 'all 0.5s';
    },[hmFlag]);

    return (
        <>
            <div className={'hover-menu'}>
                <div className={'hover-menu-list'}>
                    <div className={'hover-menu-item'} onMouseOver={()=>{setCreatorHoverFlag(true)}} onMouseOut={()=>{setCreatorHoverFlag(false)}}>
                        <span>
                            {
                                creatorHoverFlag ? 'Sproutseed' : '만든이'
                            }
                        </span>
                    </div>
                    <div className={'hover-menu-item'} onClick={toggleProjectInfo}>
                        <span>프로젝트 정보</span>
                    </div>
                </div>
                <div className={'hover-menu-btn'} onClick={toggleHoverMenu} ref={btnRef}>
                    <Plus width={20} height={20} style={{fill:'#fff'}} />
                </div>
            </div>
            <style jsx>
                {`
                    .hover-menu {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        margin-bottom: 60px;
                        overflow:hidden;
                        z-index: 99;
                    }
                    .hover-menu-list {
                        background: #fff;
                        border-radius: 4px;
                        overflow:hidden;
                        box-shadow: 0 0 0 1.5px #e34236 inset; /* 내부 테두리 속성*/
                        transition: all 0.85s;
                        margin-bottom: ${hmFlag ? 0 : '-100%'};
                    }
                    .hover-menu-item {
                        width:100%;
                        padding: 10px 15px; 
                        border-bottom: 1.5px solid #e34236;
                        transition:
                            color 0.5s,
                            background 0.5s;
                        color: #e34236;
                        text-align: center;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .hover-menu-item:last-child{
                        border-bottom:none;
                    }
                    
                    .hover-menu-item:hover{
                        background: #e34236;
                        color: #fdfdfd;
                    }
                    
                    .hover-menu-btn {
                        float:right;
                        position: fixed;
                        width: 50px;
                        height: 50px;
                        background: #e34236;
                        padding: 15px;
                        border-radius: 100%;
                        z-index: 99;
                        cursor:pointer;
                        box-shadow:1.6px 1.6px 1px 1.9px rgba(90,90,90,0.3);
                        bottom: 20px;
                        right: 20px;
                    }
                    
                `}
            </style>
        </>
    )
}

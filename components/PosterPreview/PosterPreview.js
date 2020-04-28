import {useEffect, useRef} from 'react';
import CancelIcon from '../../common/assets/cancel.svg';
import  './PosterPreview.css';

export default function PosterPreview(props){
    const isToggled = props.posterViewFlag;
    const previewRef = useRef();
    const imgRef = useRef();

    useEffect(()=>{
        const ptg = previewRef.current;
        const itg = imgRef.current;

        if(isToggled){
            ptg.style.display = 'inline-block';
            ptg.style.opacity = 0;

            itg.style.position = 'absolute';
            itg.style.transition = 'all 0.6s';
            itg.style.left = props.posterX + 'px';
            itg.style.top = props.posterY + 'px';
            itg.style.transform = '';
            itg.style.width = props.posterW + 'px';
            itg.style.height = 'auto';
            ptg.style.opacity = 1;

            setTimeout(()=>{
                if(window.innerWidth <= 850){
                    itg.style.width = '360px';
                }else {
                    itg.style.width = '30%';
                }

                itg.style.left = '50%';
                itg.style.top = '50%';
                itg.style.transform = 'translate(-50%, -50%)';

            },10);

        }else{
            ptg.style.opacity = 0;
            setTimeout(()=>{
                ptg.style.display = 'none';
            },1000);
        }
    },[isToggled]);

    return (
        <>
            <div className={'poster-preview'} ref={previewRef}>
                <div className={'poster-preview-bg'}/>
                <div className={'poster-preview-wrap'} onClick={props.onTogglePosterPreview}>
                    <div className={'poster-preview-view'}>
                        <div className="poster-preview-header">
                            <div className={'cancel-btn'} onClick={props.onTogglePosterPreview}>
                                <CancelIcon width={20} height={20}/>
                            </div>
                        </div>
                        <div className={'poster-preview-content'} ref={imgRef} onClick={e => e.stopPropagation()}>
                            <img src={props.posterImgUrl} className={'poster-preview-img'}/>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .poster-preview {
                        position:fixed;
                        width: 100vw;
                        height: 100vh;
                        z-index: 9999;
                        display:none;
                        opacity:0;
                        transition: opacity 2s;
                    }
                    .poster-preview-bg {
                        position:absolute;
                        top:0;
                        left:0;
                        width:100%;
                        height:100%;
                        background: rgba(30,30,30,0.5);
                    }
                    .poster-preview-wrap {
                        width:100%;
                        position:relative;
                        height:100%;
                        z-index: 2;
                        display:flex;
                        justify-content: center;
                        flex-direction: column;
                        align-items: center;
                    }
                    .poster-preview-view {
                        display: flex;
                        width: 100%;
                        height: 100%;
                        justify-content: center;
                        align-items: center;
                    }
                    .poster-preview-header {
                        width: 100%;
                        padding: 10px;
                        display: inline-block;
                        top:0;
                        position: fixed;
                    }
                    .cancel-btn {
                        padding: 10px;
                        float:right;
                        display: inline-block;
                        cursor:pointer;
                    }
                    .poster-preview-content {
                        height: auto;
                        width: 80%;
                        display:inline-block;
                        position: absolute;
                        top:0;
                        transition:
                           top 2s,
                           left 2s,
                           width 2s,
                           height 2s;
                    }
                    .poster-preview-content > img {
                        width: 100%;
                        height: 100%;
                    }
                    
                `}
            </style>
        </>
    )
}

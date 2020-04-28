import CancelIcon from "../../common/assets/cancel.svg";

export default function InfoWrapper(props) {
    return (
        <>
            <div className={'info-wrapper'} style={{display: props.projectInfoFlag ? 'inline-block' : 'none'}}>
                <div className={'info-wrapper-bg'}/>
                <div className={'info-popup'}>
                    <div className={'cancel-btn'} onClick={props.onToggleProjectInfo}>
                        <CancelIcon width={20} height={20}/>
                    </div>
                    <div className={'info-content'}>
                        <h1>Skill Stack</h1>
                        React.js + GraphQL + Next.js<br/><br/>
                        <h1>Project period</h1>
                        1 Week<br/>

                    </div>
                </div>
            </div>

            <style jsx>
                {`
                    .info-wrapper {
                        width:100vw;
                        height:100vh;
                        position:fixed;
                        z-index: 999;
                        display:inline-block;
                    }
                    .info-wrapper-bg {
                        width:100%;
                        height:100%;
                        display:inline-block;
                        background: rgba(10,10,10,0.5);
                        position:absolute;
                        left:0;
                        top:0;
                    }

                    .info-popup {
                        display:inline-block;
                        background: #fff;
                        width: 50%;
                        height: 60%;
                        margin: 10% 25%;
                        position:relative;
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


                    .info-cancel-btn::before, .info-cancel-btn::after{
                        content:'';
                        display:block;
                        width:0%;
                        height:0%;
                        border: 1.5px solid transparent;
                        z-index: 4;
                        position:absolute;
                    }

                    .info-cancel-btn::before {
                        top:-7.5px;
                        left:-12px;
                    }

                    .info-cancel-btn::after {
                        bottom:-7.5px;
                        right:-12px;
                    }

                    .info-cancel-btn:hover::before, .info-cancel-btn:hover::after{
                        width: calc(100% + 20px);
                        height: calc(100% + 12px);
                    }

                    .info-cancel-btn:hover::before {
                        border-top-color: #777;
                        border-right-color: #777;
                        transition:
                            width 0.2s ease-in-out 0s,
                            height 0.2s ease-in-out 0.2s;
                    }

                    .info-cancel-btn:hover::after{
                        border-bottom-color: #777;
                        border-left-color: #777;
                        transition:
                            width 0.2s ease-in-out 0.4s,
                            height 0.2s ease-in-out 0.6s,
                            border-color 0s ease-in-out 0.4s;
                    }

                    .info-content {
                        margin-top: 60px;
                        width: 100%;
                        position:relative;
                        padding: 20px;
                        display:inline-block;
                    }
                    
                    
                `}
            </style>
        </>
    );
}

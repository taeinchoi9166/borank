export default function MainBackground() {
    return (
        <>
            <div className={'main-bg'}>

            </div>
            <style jsx>
                {`
                    .main-bg {
                        width:100%;
                        position:absolute;
                        top:0;
                        background:#242a2c;
                        height:900px;
                        z-index:-2;
                    }
                `}
            </style>
        </>
    )
}

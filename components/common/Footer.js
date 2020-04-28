export default function Footer() {
    return (
        <>
            <footer>
                <div className="copy">
                    Copyright © 2020 Sproutseed. All rights reserved.
                </div>
                <ul className="links">
                    <li><a href="https://taeinchoi9166.github.io/">Blog</a></li>
                    <li><a href="https://github.com/taeinchoi9166">GitHub</a></li>
                    <li><a href="https://www.facebook.com/profile.php?id=100010925316863">Facebook</a></li>
                </ul>
            </footer>
            <style jsx>
                {`
                    footer {
                        background: #252b2d;
                        padding: 24px 48px;
                        width:100%;
                    }
                    .copy {
                        width: 100%;
                        color: #bbb;
                        margin:7px 0;
                        font-size: 13px;
                    }
                    .links {
                        display: inline-block;
                    }
                    .links > li{
                        float:left;
                        margin-right: 10px;
                    }
                    .links a{
                        color: #aaa;
                        font-size: 11.6px;
                    }
                `}
            </style>
        </>
    );
}

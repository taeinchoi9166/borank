const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const puppeteer = require('puppeteer');
let browser;
let isInitBrowser = false;


function requestData(url, param){
    return new Promise(resolve => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            let json = {};
            try{
                console.log(xhr.responseText);
                json = JSON.parse(xhr.responseText);
            }catch(e){
                console.error(e);
            }
            resolve(json);
        };

        xhr.open('GET', url + '?' + param);
        xhr.send();
    });
}

async function parseHtml(page, url, param, selector){
    const func = () => new Promise(async resolve => {
        try {
            await page.goto(`${url}?${param}`);
            await page.waitForSelector(selector);
            const el = await page.$(selector);
            const attr = await el.getProperty('href');
            resolve(attr);
        }catch(err){
            console.error(err);
            resolve('');
        }
    });

    const html = await func();
    return html;
}

module.exports = {
    Query: {
        rankItems: async (_, args) => {
            const result = await requestData('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json', `key=${process.env.REACT_APP_MOVIE_API_KEY}&targetDt=${args.date}`);
            const itemList =  result.boxOfficeResult.dailyBoxOfficeList;
            //console.log(result, result.boxOfficeResult);
            const retval = [];
            for(const item of itemList){
                retval.push({
                    movieCd: item.movieCd,
                    rank: item.rank,
                    rankInten: item.rankInten,
                    isNewRanked: item.rankOldAndNew !== 'OLD',
                    name: item.movieNm,
                    openDate: item.openDt,
                    salesAcc: `${item.salesAcc}`,
                    audiAcc: `${item.audiAcc}`
                });
            }
            return retval;
        },
        movieImage: async (_, args) => {
            if(!isInitBrowser){
                isInitBrowser = true;
                browser = await puppeteer.launch();
            }
            let page = await browser.newPage();

            const movieCd = args.movieCd;
            const el = await parseHtml(page, 'http://kobis.or.kr/kobis/business/mast/mvie/searchMovieList.do', `dtTp=movie&dtCd=${movieCd}`,
                '.cont_tab a.thumb');
            const url = el._remoteObject.value;

            await page.close();
            page = null;

            return url;
        },
        movie: async (_, args) => {
            const result = await requestData('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json', `key=${process.env.REACT_APP_MOVIE_API_KEY}&movieCd=${args.movieCd}`);
            const data = result.movieInfoResult.movieInfo;

            //console.log(data);

            let nationNms = '';
            for(const nation of data.nations)  nationNms += (', ' + nation.nationNm);
            nationNms = nationNms.substring(2, nationNms.length);

            let genreNms = '';
            for(const genre of data.genres) genreNms += (', ' + genre.genreNm);
            genreNms = genreNms.substring(2, genreNms.length);

            let directorNms = '';
            for(const director of data.directors) directorNms += (', ' + director.peopleNm);
            directorNms =  directorNms.substring(2,  directorNms.length);

            let actorNms = '';
            for(const director of data.actors) actorNms += (', ' + director.peopleNm);
            actorNms =  actorNms.substring(2,  actorNms.length);

            let watchGrades = '';
            for(const audit of data.audits) watchGrades += (', ' + audit.watchGradeNm);
            watchGrades =  watchGrades.substring(2,  watchGrades.length);

            return {
                movieCd: data.movieCd,
                movieNm: data.movieNm,
                openDt: data.openDt,
                showTm: data.showTm,
                nationNm: nationNms,
                genreNm: genreNms,
                peopleNm: directorNms,
                actorNm: actorNms,
                watchGradeNm: watchGrades
            };
        }
    }
}

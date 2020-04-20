const fetch = require('node-fetch');

const sendPush = (title, uri, thumb) => {
    let myHeaders = {"Content-Type": "application/json"}
            
    let myInit = { method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
            "to":"7f184bbe42f6e2ea4fa150",
            "data": {
                "title": "Discogs personal notifier",
                "message": title+" en vente ma gueule !!",
                "url": uri,
                "image": thumb
            }
        })
    };

    fetch('https://api.pushy.me/push?api_key=1078f5606fc2332164c58479f022b786199a838f33d3413b91c6ef53cb6bf1f7',myInit);
}

const checkDiscogs = async (release, thumb) => {
    let q = await fetch('https://api.discogs.com/releases/'+release);
    let res = await q.json();
    
    if (res.num_for_sale !== 0) {
        console.log(res.title);
        sendPush(res.title, res.uri, thumb);
    }
}

// const id = setInterval(() => {
    // accident num 7
    checkDiscogs('2387793', 'https://img.discogs.com/hnumEOuldwZ2Mi_7Ht6TFNJvG1M=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-2387793-1408011015-3502.jpeg.jpg');

    // Treillières Über Alles
    checkDiscogs('3134453', 'https://img.discogs.com/2ZVsWUxu-yV3Xnic5PCJPp3kChs=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-3134453-1317710191.jpeg.jpg');

    // Lemonade & brownies
    checkDiscogs('7665741', 'https://img.discogs.com/kXtkKCN0IEpiSRXd5Af47mj_RfU=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-7665741-1537723008-5641.jpeg.jpg');
// }, 1000*60*60*6)






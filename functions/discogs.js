const https = require('https');

const sendPush = (title, uri, thumb) => {
    let myHeaders = {
        "Content-Type": "application/json"
    }

    const data = JSON.stringify({
            "to":"b8c4e8a3494ea07d9ba44d",
            "data": {
                "title": "Discogs personal notifier",
                "message": title+" en vente ma gueule !!",
                "url": uri,
                "image": thumb
            }
    });
            
    let options = {
        hostname: 'api.pushy.me',
        path: '/push?api_key=1078f5606fc2332164c58479f022b786199a838f33d3413b91c6ef53cb6bf1f7',
        method: 'POST',
        headers: myHeaders
    };

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.write(data)
    req.end()
}

const checkDiscogs = (release, thumb) => {

    let url = 'https://api.discogs.com/releases/'+release;

    https.get(url, {headers: {'User-Agent': 'javascript'}}, (res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                if (json.num_for_sale !== 0) {
                    sendPush(json.title, json.uri, thumb);
                }
            } catch (error) {
                console.error('erreur :' + error.message);
            };
        });

    }).on("error", (error) => {
        console.error(error.message);
    });
}

const id = setInterval(() => {
    // accident num 7
    checkDiscogs('2387793', 'https://img.discogs.com/hnumEOuldwZ2Mi_7Ht6TFNJvG1M=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-2387793-1408011015-3502.jpeg.jpg');

    // Treillières Über Alles
    checkDiscogs('3134453', 'https://img.discogs.com/2ZVsWUxu-yV3Xnic5PCJPp3kChs=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-3134453-1317710191.jpeg.jpg');

    // Lemonade & brownies
    checkDiscogs('7665741', 'https://img.discogs.com/kXtkKCN0IEpiSRXd5Af47mj_RfU=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-7665741-1537723008-5641.jpeg.jpg');
}, 1000*60*60*6)






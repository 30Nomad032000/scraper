const fs = require('fs')

const PORT = 8000
const axios =   require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = ['https://www.bailii.org/ew/cases/EWCC/Fam/2014/11.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/12.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/13.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/14.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/16.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/18.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/19.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/2.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/20.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/21.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/22.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/23.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/24.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/25.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/26.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/27.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/29.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/3.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/31.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/33.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/34.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/35.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/36.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/37.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/38.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/39.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/4.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/40.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/6.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B1.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B17.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B2.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B27.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B30.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B32.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B41.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B42.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B43.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B44.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B45.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B46.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B47.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B48.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B49.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B50.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B51.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B52.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B54.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B55.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B56.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B57.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B58.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B59.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B60.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B61.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B62.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B63.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B64.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B65.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B66.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B67.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B68.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B69.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B70.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B71.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B72.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B73.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B74.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B75.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B76.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B77.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B78.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B79.html',
'https://www.bailii.org/ew/cases/EWCC/Fam/2014/B80.html',
]


function getData(item){    
axios(item)
.then(response => {
    console.log(i++)
    const html = response.data
    const $ = cheerio.load(html)
    const data = cheerio.text($('body'))
    fs.appendFile('htmldata.txt', data, err=>{
        if (err) throw err;
    });
})
}
i=0;
for(const item of url){
    getData(item)
}
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
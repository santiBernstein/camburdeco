const express = require('express');
const app = express();
var path = require("path")

app.get('/', (req, res) => {
    let file = path.resolve('./site/view/index.html')
    res.sendFile(file);
});
app.get('/login', (req, res) => {
    let file = path.resolve('./site/view/login.html')
    res.sendFile(file);
});
app.get('/productCart', (req, res) => {
    let file = path.resolve('./site/view/productCart.html')
    res.sendFile(file);
});
app.get('/productDetail', (req, res) => {
    let file = path.resolve('./site/view/productDetail.html')
    res.sendFile(file);
});
app.get('/register', (req, res) => {
    let file = path.resolve('./site/view/register.html')
    res.sendFile(file);
});

app.get('*', (req, res) => {
    if (req.url.endsWith('.css')) {
        let file = path.resolve('./site/public/style' + req.url);
        return res.sendFile(file); 
    }
    let images = ['jpg', 'jpeg', 'gif', 'png', 'svg'];
    let extencion = req.url.split('.')[1];
    if (images.includes(extencion)) {
        let file = path.resolve('./site/public/images' + req.url);
        return res.sendFile(file)
    }
    res.send('File Not Found!!!')
}).listen(3000, 'localhost', () => console.log('PROYECTO CAMBURDECO :: Server ON!!! running in port 3000'));

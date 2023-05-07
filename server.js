//a.	Create an express server and configure it to render the static files in the public folder.
const express = require('express')
const app = express()
const port = 3000  
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const nunjucks = require('nunjucks')
const articleModel = require('./models/article_model.js')
const floraEditor = require('flora-editor-sdk')
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

//b.	Configure it to use nunjucks templates under the views folder.
nunjucks.configure('views', {
    autoescape: true,
    express: app
})
//c.	Configure it to accept URL encoded forms. And to use the cookie-parser.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

//d.	Import the functions in the models/article_model.js


//e.	For GET request on “/”: render the index.html template passing it the list of articles returned by the getAllArticles().
app.get('/', (req, res) => {
    articleModel.getAllArticles()
        .then((articles) => {
            res.render('index.html', { articles: articles })
        })
        .catch((err) => {   

        })
})

//f.	For GET request on “/lang”:  create a cookie named ‘lang’ and its value is the content of the query string parameter ‘lang’ expires in a month. send this cookie.
app.get('/lang', (req, res) => {
    res.cookie('lang', req.query.lang, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) })
    res.send('cookie sent')
})

//g.	For GET request on “/articles/:article_id”: render the article.html template passing it the details of the article returned by the getArticleDetail(article_id). If the there is a cookie lang == ‘ar’, replace the content by arabicContent and unescape the HTML using the ‘html-escaper’ package before rendering.
app.get('/articles/:article_id', (req, res) => {
    articleModel.getArticleDetail(req.params.article_id)
        .then((article) => {
            if (req.cookies.lang == 'ar') {
                article.content = floraEditor.unescape(article.arabicContent)
            }
            res.render('article.html', { article: article })
        })
        .catch((err) => {

        })
})

//h.	For Delete request on “/articles/:article_id”: send a JSON encoding of the meta data returned by the deleteArticle(article_id).
app.delete('/articles/:article_id', (req, res) => {
    articleModel.deleteArticle(req.params.article_id)
        .then((meta) => {
            res.json(meta)
        })
        .catch((err) => {

        })
})

//i.	For PUT request on “/articles/:article_id/like”: send a JSON encoding of the meta data returned by the likeArticle(article_id).

app.put('/articles/:article_id/like', (req, res) => {
    articleModel.likeArticle(req.params.article_id)
        .then((meta) => {
            res.json(meta)
        })
        .catch((err) => {

        })
})

//j.	For GET request on “/new”: render the new_article template.
app.get('/new', (req, res) => {
    res.render('new_article.html')
})

//k.	For POST request on “/new”: extract the article data from the form request. Escape the HTML of the content and arabicContent using the ‘html-escaper’ package. Send a JSON encoding of the metadata returned by the addArticle(article_data).
app.post('/new', (req, res) => {
    let articleData = {
        title: req.body.title,
        content: floraEditor.escape(req.body.content),
        arabicContent: floraEditor.escape(req.body.arabicContent)
    }
    articleModel.addArticle(articleData)
        .then((meta) => {
            res.json(meta)
        })
        .catch((err) => {

        })
})

//l.	For GET request on “/edit/:id”: render the new_article template passing the details of returned by calling getArticleDetail(id).
app.get('/edit/:id', (req, res) => {
    articleModel.getArticleDetail(req.params.id)
        .then((article) => {
            res.render('new_article.html', { article: article })
        })
        .catch((err) => {

        })
})
 
//m.	For POST request on “/edit/:id”: extract the article data from the form request. Escape the HTML of the content and arabicContent using the ‘html-escaper’ package. Send a JSON encoding of the metadata returned by the updateArticle(id, data).
app.post('/edit/:id', (req, res) => {
    let articleData = {
        title: req.body.title,
        content: floraEditor.escape(req.body.content),
        arabicContent: floraEditor.escape(req.body.arabicContent)
    }
    articleModel.updateArticle(req.params.id, articleData)
        .then((meta) => {
            res.json(meta)
        })
        .catch((err) => {

        })
})

//n.	For POST requests on ‘/upload’: use the FloraEditor SDK to upload an image to the ‘public’ folder and send the URL of the uploaded image.
app.post('/upload', upload.single('image'), (req, res) => {
    floraEditor.uploadImage(req.file.path)
        .then((url) => {
            res.send(url)
        })
        .catch((err) => {
        
        })
})

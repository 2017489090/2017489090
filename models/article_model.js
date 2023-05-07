//a.	getAllArticles(): query the database to return an array of articles from the articles table.
//  
    function getAllArticles() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM articles', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }   
            });
        });
    }
//b.	getArticleDetail(article_id): query the database to return one object holding all the details of the article with the id given. Return data from the articles table.

    function getArticleDetail(article_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM articles WHERE id = ?', [article_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

//c.	addArticle (article_data): inserts in the articles table the article_data given. Note the article_data parameter is an object that holds the article columns like the author and the content. And returns metadata about the inserted row.
    function addArticle(article_data) { 
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO articles SET ?', [article_data], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
//d.	updateArticle (article_id, data): updates the articles table with the data given. Note that the data parameter is an object that holds the article columns like the author and the content And returns metadata about the updated row.
    function updateArticle(article_id, data) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE articles SET ? WHERE id = ?', [data, article_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

//e.	deleteArticle(article_id): deletes the article from the database. And returns metadata about the affected row.
    function deleteArticle(article_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM articles WHERE id = ?', [article_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

//f.	likeArticle(article_id): find the number of likes for the article, increment it, and save it back to the table.
    function likeArticle(article_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT likes FROM articles WHERE id = ?', [article_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    let likes = results[0].likes + 1;
                    db.query('UPDATE articles SET likes = ? WHERE id = ?', [likes, article_id], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }
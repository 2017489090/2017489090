let count=0;


const likes = document.getElementById("likes");
likes.innerHTML = count;
localStorage.setItem("likes", likes);

const incrementCount = document.getElementById("image");
incrementCount.addEventListener("click", likeArticle);

function likeArticle(){
    count++;
    likes.innerHTML = count;
    localStorage.setItem("likes", likes);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
        }
    };
    xhttp.open("PUT", "/article/id/like", true);
    xhttp.send();
}

function setLanguage(){
    var language = document.getElementById("language").value;
    localStorage.setItem("language", language);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", "/lang?lang=" + language, true);
    xhttp.send();
}

function deleteArticle(){
    var result = confirm("Are you sure you want to delete this article?");
    if(result){
        document.getElementById("article").remove();
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
        }
    };
    xhttp.open("DELETE", "/article/id", true);
    xhttp.send();
}

function initForm(){
    var language = localStorage.getItem("language");
    if(language == "ar"){
        document.getElementById("title").value = "عنوان";
        document.getElementById("content").value = "محتوى";
    }else{
        document.getElementById("title").value = "Title";
        document.getElementById("content").value = "Content";
    }
    new FroalaEditor('#content');

    new FroalaEditor('#content-ar', {   
        direction: 'rtl'
    });
        
    new FroalaEditor("#froala-editor", {
        imageUploadURL: "/upload"
    });
    new FroalaEditor("#froala-editor-ar", {
        imageUploadURL: "/upload"
    });
    
}

function validateForm(){
var editor = document.getElementById("froala-content").value;
var editor1 = document.getElementById("froala-content-ar").value;
    if(editor.length < 10 || editor1.length < 10){
        alert("Content must be at least 10 characters");
        return false;
    }
    return true;
    console.log("Validated");   
}

[1mdiff --git a/MovieToday/index.js b/MovieToday/index.js[m
[1mindex ac31aa9..c54cf7c 100644[m
[1m--- a/MovieToday/index.js[m
[1m+++ b/MovieToday/index.js[m
[36m@@ -131,12 +131,13 @@[m [mfunction addLoader() {[m
 [m
 function sendData(event) {[m
   val = 2;[m
[32m+[m[32m  pageSize = 1[m
   noColorizeLink();[m
   formValue = SEARCH_VALUE.value;[m
   event.preventDefault();[m
   addLoader()[m
 [m
[31m-  setTimeout(chargeContent, 2000);[m
[32m+[m[32m  setTimeout(chargeContent, 500);[m
 }[m
 [m
 function chargeContent() {[m
[36m@@ -194,7 +195,7 @@[m [mfor (let index = 0; index < navlink.length; index++) {[m
     dataValue = element.dataset.val;[m
 [m
     addLoader()[m
[31m-    setTimeout(chargeContent, 2000);[m
[32m+[m[32m    setTimeout(chargeContent, 500);[m
   };[m
 [m
 }[m
[36m@@ -214,11 +215,13 @@[m [mfunction showMovieDescription(e) {[m
   MOVIE_DESCRIPTION.textContent = overview;[m
 }[m
 [m
[31m-function endpointData(endpoint, pageSize = null, searchParam = null, ) {[m
[31m-  getMovies(endpoint, searchParam, pageSize).then((response) => {[m
[32m+[m[32mfunction endpointData(endpoint, pageSize = null, searchParam = null ) {[m
[32m+[m[32m  getMovies(endpoint, pageSize,searchParam ).then((response) => {[m
     if (response.results.length <= 0) {[m
[32m+[m[32m      loadBtn.style.display = "none"[m
       MOVIE_CONTAINER.insertAdjacentHTML([m
         "beforeend", `<div class="alet alert-danger px-3 py-3">No results</div>`)[m
[32m+[m[41m        [m
     } else {[m
       for (key in response.results) {[m
         const element = response.results[key];[m

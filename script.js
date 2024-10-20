console.log("Starting")

const api_key = "9c7ce628bdc44aa7a0616f169b7d7526"
let currentPage=1;
const pageSize = 5;


//function to fetch the news
let fetchNews= async (query) => {
    const url =  `https://newsapi.org/v2/everything?q=${query}&apikey=${api_key}`
    let response= await fetch(url);
    let data = await response.json();
    console.log(data)
    displayArticle(data.articles)
    updatePagination(data.totalResults)
}



//function to create div for articles to display
let displayArticle = (articles)=>{
    let container = document.getElementById("news");
         container.innerHTML = ""

        articles.forEach((article) => {
            let articleHTML = ` <div class="card m-3" style="width: 18rem;">
                <img src="${article.urlToImage}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text">${article.description}</p>
                  <a href="${article.url}" class="btn btn-primary">Read More</a>
                </div>
              </div>`

            //append this html to the container
            container.innerHTML +=articleHTML
         });
}


// Function to update pagination UI
let updatePagination = (totalResults) => {
    const totalPages = Math.ceil(totalResults / pageSize);
    document.getElementById("prevButton").disabled = currentPage === 1; // Disable previous button on the first page
    document.getElementById("nextButton").disabled = currentPage === totalPages; // Disable next button on the last page
}


// event liatener for buttons
document.getElementById("weatherbutton").addEventListener('click',(e)=>{
    e.preventDefault();
    fetchNews("weather")
})

document.getElementById("cricketbutton").addEventListener('click',(e)=>{
    e.preventDefault();
    fetchNews("cricket")
})
document.getElementById("footballbutton").addEventListener('click',(e)=>{
    e.preventDefault();
    fetchNews("football")
})
document.getElementById("Wrestlingbutton").addEventListener('click',(e)=>{
    e.preventDefault();
    fetchNews("wrestling")
})
document.getElementById("homebutton").addEventListener('click',(e)=>{
    e.preventDefault();
    fetchNews("india")
})

document.getElementById("searchform").addEventListener('submit',(e)=>{ 
    e.preventDefault();
    const query = document.getElementById("searchinput").value;
    fetchNews(query)
})

// Event listener for pagination buttons
document.getElementById("prevButton").addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage--; // Decrease the page number
        fetchNews(document.getElementById("searchinput").value || "india"); // Fetch news for the current query
    }
});

document.getElementById("nextButton").addEventListener('click', (e) => {
    e.preventDefault();
    currentPage++; // Increase the page number
    fetchNews(document.getElementById("searchinput").value || "india"); // Fetch news for the current query
});

fetchNews()




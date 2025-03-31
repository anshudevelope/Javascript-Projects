const apiKey = "6eedaa9ceba77d87b8aca0750b7cbd04";

const blogContainer = document.getElementById('blog-container');

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();

    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching news by query:", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.image;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncateddescription = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
        description.textContent = truncateddescription;
        description.textContent = truncateddescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        })

        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();






// updated code

// // const apiKey = "YOUR_GNEWS_API_KEY";  // Replace with your free GNews API key
// const blogContainer = document.getElementById('blog-container');
// const searchInput = document.getElementById("search_input");
// const searchButton = document.getElementById("search_button");

// async function fetchRandomNews() {
//     try {
//         const apiUrl = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&max=10&apikey=${apiKey}`;
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         return data.articles || [];
//     } catch (error) {
//         console.error("Error fetching random news:", error);
//         return [];
//     }
// }

// searchButton.addEventListener("click", async () => {
//     const query = searchInput.value.trim();

//     if (query !== "") {
//         try {
//             const articles = await fetchNewsQuery(query);
//             displayBlogs(articles);
//         } catch (error) {
//             console.error("Error fetching news by query:", error);
//         }
//     }
// });

// async function fetchNewsQuery(query) {
//     try {
//         const apiUrl = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&apikey=${apiKey}`;
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         return data.articles || [];
//     } catch (error) {
//         console.error("Error fetching news by query:", error);
//         return [];
//     }
// }

// function displayBlogs(articles) {
//     blogContainer.innerHTML = "";
//     articles.forEach(article => {
//         const blogCard = document.createElement("div");
//         blogCard.classList.add("blog-card");

//         const img = document.createElement("img");
//         img.src = article.image || "https://via.placeholder.com/150";
//         img.alt = article.title;

//         const title = document.createElement("h2");
//         const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
//         title.textContent = truncatedTitle;

//         const description = document.createElement("p");
//         const truncatedDescription = article.description ? (article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description) : "No description available.";
//         description.textContent = truncatedDescription;

//         blogCard.appendChild(img);
//         blogCard.appendChild(title);
//         blogCard.appendChild(description);
        
//         blogCard.addEventListener("click", () => {
//             window.open(article.url, "_blank");
//         });

//         blogContainer.appendChild(blogCard);
//     });
// }

// // Fetch initial random news on page load
// (async () => {
//     try {
//         const articles = await fetchRandomNews();
//         displayBlogs(articles);
//     } catch (error) {
//         console.error("Error fetching random news:", error);
//     }
// })();

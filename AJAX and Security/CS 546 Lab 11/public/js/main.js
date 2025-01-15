/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page. You can use a client-side fetch or axios request instead of AJAX)
*/
$(document).ready(function(){
    $("#searchMovieForm").on("submit", function(event){
        event.preventDefault();
        $("#error").remove();
        let movie_search_term = $("#movie_search_term").val().trim();
        let sanitized_movie_search_term = DOMPurify.sanitize(movie_search_term);
        let movie_search_term_error = check_movie_search_term(sanitized_movie_search_term);
        if(movie_search_term_error){
            $("#searchMovieForm").after(
                `<p id=error>${movie_search_term_error}</p>`
            );
            return;
        }
        $("#movieDetails").hide();
        $("#searchResults").empty().hide();
        let requestConfig_page1 = {
            method: "GET",
            url: `http://www.omdbapi.com/?apikey=CS546&s=${movie_search_term}`
        }
        let requestConfig_page2 = {
            method: "GET",
            url: `http://www.omdbapi.com/?apikey=CS546&s=${movie_search_term}&page=2`
        }
        $.ajax(requestConfig_page1).then(function(responseMessage) {
            const results = responseMessage.Search;
            for(let movie in results){
                const li = `<li>
                    <a href="javascript:void(0)" data-id=${results[movie].imdbID}>${results[movie].Title}</a>
                    </li>`;
                $("#searchResults").append(li)
            }
            $("#searchResults").show();
            $("#rootLink").show();
        });
        $.ajax(requestConfig_page2).then(function(responseMessage){
            const results = responseMessage.Search;
            for(let movie in results){
                const li = `<li>
                    <a href="javascript:void(0)" data-id="${results[movie].imdbID}">${results[movie].Title}</a>
                    </li>`;
                $("#searchResults").append(li)
            }
        });
    });

    $("#searchResults").on("click", "a", function(event){
        event.preventDefault();
        const movieId = $(this).data("id");
        $("#searchResults").hide();
        $("#movieDetails").empty();
        let requestConfig = {
            method: "GET",
            url: `http://www.omdbapi.com/?apikey=CS546&i=${movieId}`
        };
        $.ajax(requestConfig).then(function(responseMessage){
            const movieDetails = `
            <article>
            <h1>${responseMessage.Title || "N/A"}</h1>
                <img alt="${responseMessage.Title || "Movie"} Poster" src="${responseMessage.Poster !== "N/A" ? responseMessage.Poster: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}">  
                
                <h2>Plot</h2>
                <p>${responseMessage.Plot || "N/A"}</p>
                <section>
                    <h3>Info</h3>
                    <dl>
                        <dt>Year Released:</dt>
                            <dd>${responseMessage.Year || "N/A"}</dd>
                        <dt>Rated:</dt>
                            <dd>${responseMessage.Rated || "N/A"}</dd>
                        <dt>Runtime:</dt>
                            <dd>${responseMessage.Runtime || "N/A"}</dd>
                        <dt>Genre(s):</dt>
                            <dd>${responseMessage.Genre || "N/A"}</dd>
                        <dt>Box Office Earnings:</dt>
                            <dd>${responseMessage.BoxOffice || "N/A"}</dd>
                        <dt>DVD Release Date:</dt>
                            <dd>${responseMessage.DVD || "N/A"}</dd>
                    </dl>
                </section>

                <section>
                    <h4>Cast and Crew</h4>
                    <p><strong>Director:</strong> ${responseMessage.Director || "N/A"}</p>
                    <p><strong>Writer:</strong> ${responseMessage.Writer || "N/A"}</p>
                    <p><strong>Cast:</strong> ${responseMessage.Actors || "N/A"}</p>
                </section>

                <section>
                    <h4>Ratings</h4>
                    <table class="my_coolratings_table">
                        <tr>
                            <th>Source</th>
                            <th>Rating</th>
                        <tr>
                        ${create_ratings_html(responseMessage.Ratings)}
                    </table>
                </section>
            </article>
            `;
            $("#movieDetails").append(movieDetails).show();
        })
    });
});

const check_movie_search_term = (movie_search_term) => {
    if(!movie_search_term) return "Error: You must provide a movie search term";
    if(typeof movie_search_term !== "string") return "Error: Movie search term must be a string";
    if(movie_search_term.length === 0) return "Error: Movie search term cannot be just spaces";
    return null;
}

const create_ratings_html = (Ratings) => {
    if(!Ratings || Ratings.length === 0) return "<tr><td colspan='2'>N/A</td></tr>";
    let html = "";
    for(let obj of Ratings){
        let row =
        `<tr>
            <td>${obj.Source || "N/A"}</td>
            <td>${obj.Value || "N/A"}</td>
        </tr>`
        html += row;
    }
    return html;
}

"use strict";

(() => {
    window.APISearchController = {
        init: () => {
            let searchButton = $("#search-button");
            let searchTerm = $("#search-term");
            let reviewTextContainer = $(".review-text-container");
            let searchButton2 = $("#search-button2");
            let searchTerm2 = $("#search-term2");
            let reviewTextContainer2 = $(".review-text-container2");
            searchButton.click(() =>
    
                $.getJSON("https://www.goodreads.com/book/title.json", {
                    key: "7NXHoMFJOMRzmUJmxfUTA",
                    title: searchTerm.val()

                // parse the string that GoodReads returns
                }).done(result => {
                    if (result === undefined) {
                        reviewTextContainer.empty().append(
                            'Please add a valid book title'
                        );
                    } else {
                        let parse = (str) => {
                            let index = str.indexOf('src=') + 5;
                            let start = '';
                            let currChar = str[index];
                            while (currChar !== '"') {
                                start = start + currChar;
                                index++;
                                currChar = str[index];
                            }
                            return start;
                        };
                        reviewTextContainer.text(
                            parse(result.reviews_widget)
                        );
                    }
                })
            );

            searchButton2.click(() =>

                $.getJSON("https://www.goodreads.com/book/review_counts.json", {
                    key: "7NXHoMFJOMRzmUJmxfUTA",
                    isbns: searchTerm2.val()
                }).done(page => {
                    // console.log(page.books[0].average_rating);

                    /* rating = page.books[0].average_rating;
                    ratings_count = page.books[0].work_ratings_count; */
                    // reviewTextContainer2.text(
                    $(reviewTextContainer2).text("Average Review: " + page.books[0].average_rating);
                    $(reviewTextContainer2).text("Reviews Count: " + page.books[0].work_ratings_count);
                    // Rating_out_of_5_Stars(rating)                    
                // );
                }
                ));
            searchTerm.bind("input", () => searchButton.prop("disabled", !searchTerm.val()));
        }
    };
})();
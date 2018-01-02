var source = $('#books-template').html()
var template = Handlebars.compile(source);
// bind Parsley to the search form
$('#search-form').parsley();

// AJAX request for search by Author
var fetchAuthor = function (searchQuery) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + searchQuery,
        beforeSend: function () {
            $('#loader').show;
        },
        success: function (data) {
            $('#loader').hide();
            authorSearch(data)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}
// Ajax Request for search by ISBN
var fetchISBN = function (searchQuery) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + searchQuery,
        beforeSend: function () {
            $('#loader').show();
        },

        success: function (data) {
            $('#loader').hide();
            bookInfo(data);


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};
// AJAX Request for search by Title
var fetchTitle = function (searchQuery) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + searchQuery,
        beforeSend: function () {
            $('#loader').show();

        },
        success: function (data) {
            $('#loader').hide()
            console.log(data);
            titleSearch(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus)
        }
    })
}

// Validate the search and append data from ISBN search
function bookInfo(data) {
     $('#book-search').attr('data-parsley-type','number')
    var newHTML = template(data.items[0].volumeInfo);
    $('.book-display').append(newHTML)

}

// Append data from Title Search
function titleSearch(data) {
    for (var i = 0; i < 10; i++) {
        var newHTML = template(data.items[i].volumeInfo);
        $('.book-display').append(newHTML);
    }
}

// append data from author Search
function authorSearch(data) {
    for (var i = 0; i < 10; i++) {
        var newHTML = template(data.items[i].volumeInfo);
        $('.book-display').append(newHTML);
    }
}
// Chcek which radio button is selected and perform the apropriate ajax request
function getRadioState(searchQuery) {

    if ($('#isbn-radio').prop('checked')) {
        fetchISBN(searchQuery)
    } else if ($('#title-radio').prop('checked')) {
        fetchTitle(searchQuery)
    } else if ($('#author-radio').prop('checked')) {
        fetchAuthor(searchQuery)
    }
}
// Click handler for showing more details
// hides every other book on the page
$('.book-display').on('click', '.show-detail', function () {
    $('.book-display').children().hide();
    $(this).closest('div').show();
    $(this).closest('div').append("<a href='#' class='search-return'>return to search results</a>")
    $(this).hide();
})
// click handler for returning back the the search results
// shows all other elements previously hidden
$('.book-display').on('click', '.search-return', function () {
    $(this).parents().siblings('div, hr').show();
})

// click handler for peforming a search
$('#isbn-search').on('click', function () {
    var searchQuery = $('#book-search').val();
    $('#search-form').parsley().validate();

    $('.book-display').show();
    getRadioState(searchQuery);

})

// $('#title-search').on('click', function () {
//     var searchQuery = $('#book-search').val();
//     $('.book-display').show();

//     fetchTitle(searchQuery);
// })
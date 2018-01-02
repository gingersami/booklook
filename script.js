var source = $('#books-template').html()
var template = Handlebars.compile(source);
$('#search-form').parsley();

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

function bookInfo(data) {
     $('#book-search').attr('data-parsley-type','number')
    var newHTML = template(data.items[0].volumeInfo);
    $('.book-display').append(newHTML)

}

function titleSearch(data) {
    for (var i = 0; i < 10; i++) {
        var newHTML = template(data.items[i].volumeInfo);
        $('.book-display').append(newHTML);
    }
}

function authorSearch(data) {
    for (var i = 0; i < 10; i++) {
        var newHTML = template(data.items[i].volumeInfo);
        $('.book-display').append(newHTML);
    }
}

function getRadioState(searchQuery) {

    if ($('#isbn-radio').prop('checked')) {
        fetchISBN(searchQuery)
    } else if ($('#title-radio').prop('checked')) {
        fetchTitle(searchQuery)
    } else if ($('#author-radio').prop('checked')) {
        fetchAuthor(searchQuery)
    }
}

$('.book-display').on('click', '.show-detail', function () {
    $('.book-display').children().hide();
    $(this).closest('div').show();
    $(this).closest('div').append("<a href='#' class='search-return'>return to search results</a>")
    $(this).hide();
})

$('.book-display').on('click', '.search-return', function () {
    $(this).parents().siblings('div, hr').show();
})


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
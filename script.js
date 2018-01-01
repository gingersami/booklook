var source = $('#books-template').html()
var template = Handlebars.compile(source);


var fetchISBN = function (searchQuery) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+searchQuery,
        success: function (data) {
            // var newHTML = template(data.items[0].volumeInfo)
            // $('.book-display').append(newHTML)
            bookInfo(data);
            

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

var fetchTitle = function (searchQuery){
    $.ajax({
        method:"GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:'+searchQuery,
        success: function(data){
            console.log(data);
            titleSearch(data);
        },
          error:function(jqXHR,textStatus,errorThrown){
              console.log(textStatus)
          }
    })
}

$('#isbn-search').on('click', function(){
    var searchQuery = $('#book-search').val();
fetchISBN(searchQuery);
})

$('#title-search').on('click',function(){
    var searchQuery = $('#book-search').val();
    fetchTitle(searchQuery);
})

// function newData(){
//     var description = data.items[0].volumeInfo.description
//     var title = data.items[0].volumeInfo.title
//     $('.book-display').append(title)
// }
function bookInfo(data){
    var newHTML=template(data.items[0].volumeInfo);
    $('.book-display').append(newHTML)

}

function titleSearch(data){
    for(var i=0;i<9;i++){
        var newHTML =template(data.items[i].volumeInfo);
        $('.book-display').append(newHTML);
    }
}
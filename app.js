function resetSearch() {
    var bookDisplay = $('#searchResults');
    bookDisplay.empty();
}

function resetRecommend() {
    var bookDisplay = $('#bookRecommendView');
    bookDisplay.empty();
}

function resetBestseller() {
    var bookDisplay = $('#bestSellerView');
    bookDisplay.empty();
}

function bookSearch(event) {
    event.preventDefault();
  
    var searchQuery = document.getElementById("bookTitleInput").value;
    var errorElement = document.getElementById("search-error");
  
    if (searchQuery === "") {
      errorElement.innerHTML = "Please enter a book title to search.";
      return;
    }
  
    var apiUrl = 'https://dapi.kakao.com/v3/search/book';
    var apiKey = 'c10d9a76d50200c7f1dbc9b67f0814e7';
  
    $.ajax({
      url: apiUrl,
      data: {
        query: searchQuery,
        size: 10
      },
      headers: {
        Authorization: 'KakaoAK ' + apiKey
      },
      dataType: 'json',
      success: function(data) {
        var bookDisplay = $('#searchResults');
        bookDisplay.empty();
  
        for (var i = 0; i < data.documents.length; i++) {
          var book = data.documents[i];
  
          var bookCard = $('<div class="book-card"></div>');
          var bookDetails = $('<div class="book-details"></div>');
          var bookDescription = $('<div class="book-description"></div>');
  
          bookDetails.html(
            '<img class="book-image" src="' + book.thumbnail + '" alt="Cover Image">' +
            '<h2>' + book.title + '</h2>' +
            '<p class="book-author">' + book.authors.join(', ') + '</p>'
          );
          bookDescription.html('<p>' + book.contents + '</p>');
  
          bookCard.append(bookDetails);
          bookCard.append(bookDescription);
          bookDisplay.append(bookCard);
  
          bookDescription.hide();
  
          bookCard.on('click', function() {
            $(this).find('.book-details, .book-description').toggle();
          });
        }
      },
      error: function(error) {
        if (error !=  null) {
            alert("Sorry, An unexpected error occureed. " +  error);
        }
      }
    });
  }
  
var categoryMapping = {
    '국내도서': {
        '소설': '101',
        '시/에세이': '102',
        '예술/대중문화': '103',
        '사회과학': '104',
        '역사와 문화': '105',
        '잡지': '107',
        '만화': '108',
        '유아': '109',
        '아동': '110',
        '가정과 생활': '111',
        '청소년': '112',
        '초등학습서': '113',
        '고등학습서': '114',
        '국어/외국어/사전': '115',
        '자연과 과학': '116',
        '경제경영': '117',
        '자기계발': '118',
        '인문': '119',
        '종교/역학': '120',
        '컴퓨터/인터넷': '122',
        '자격서/수험서': '123',
        '취미/레저': '124',
        '전공도서/대학교재': '125',
        '건강/뷰티': '126',
        '여행': '128',
        '중등학습서': '129'
    },
    '외국도서': {
        '어린이': '201',
        'ELT/사전': '203',
        '문학': '205',
        '경영/인문': '206',
        '예술/디자인': '207',
        '실용': '208',
        '해외잡지': '209',
        '대학교재/전문서적': '210',
        '컴퓨터': '211',
        '일본도서': '214',
        '프랑스도서': '215',
        '중국도서': '216',
        '해외주문원서': '217'
    },
    '음반': {
        '가요': '301',
        'Pop': '302',
        'Rock': '303',
        '일본음악': '304',
        'World Music': '305',
        'Jazz': '306',
        '클래식': '307',
        '국악': '308',
        '뉴에이지/명상': '309',
        'O.S.T': '310',
        '종교음악': '311',
        '유아/아동/태교': '312',
        '수입음반': '313',
        '액세서리/관련상품': '314',
        '뮤직 DVD': '315',
        '해외구매': '319',
        'LP': '320'
    },
    'DVD': {
        '애니메이션': '409',
        '다큐멘터리': '411',
        'TV시리즈': '412',
        '건강/취미/스포츠': '417',
        '영화': '425',
        '해외구매': '426',
        '기타': '427',
        '블루레이': '428',
        '유아동/교육DVD': '429',
        'EBS 교육용': '430'
    }
}


function changeSubSelect_best() {
    var mainCategorySelect = document.getElementById("main-category_best");
    var mainCategory = mainCategorySelect.options[mainCategorySelect.selectedIndex].value;

    var subCategorySelect = document.getElementById("sub-category_best");

    subCategorySelect.options.length = 0;

    if (mainCategory !== "") {
        var subCategories = categoryMapping[mainCategory];

        for (var subCategory in subCategories) {
            if (subCategories.hasOwnProperty(subCategory)) {
                var newOption = document.createElement("option");
                newOption.text = subCategory;
                newOption.value = subCategory;
                subCategorySelect.add(newOption);
            }
        }
    }

    var defaultOption = document.createElement("option");
    defaultOption.text = "--선택하세요--";
    defaultOption.value = "";
    subCategorySelect.insertBefore(defaultOption, subCategorySelect.firstChild);

    subCategorySelect.selectedIndex = 0;
}

function changeSubSelect_recommend() {
    var mainCategorySelect = document.getElementById("main-category_recommend");
    var mainCategory = mainCategorySelect.options[mainCategorySelect.selectedIndex].value;

    var subCategorySelect = document.getElementById("sub-category_recommend");

    subCategorySelect.options.length = 0;

    if (mainCategory !== "") {
        var subCategories = categoryMapping[mainCategory];

        for (var subCategory in subCategories) {
            if (subCategories.hasOwnProperty(subCategory)) {
                var newOption = document.createElement("option");
                newOption.text = subCategory;
                newOption.value = subCategory;
                subCategorySelect.add(newOption);
            }
        }
    }

    var defaultOption = document.createElement("option");
    defaultOption.text = "--선택하세요--";
    defaultOption.value = "";
    subCategorySelect.insertBefore(defaultOption, subCategorySelect.firstChild);

    subCategorySelect.selectedIndex = 0;
}

function bestsellerDisplay() {
    var mainCategory = document.getElementById("main-category_best").value;
    var subCategory = document.getElementById("sub-category_best").value;
    var errorElement = document.getElementById("bestseller-error");

    if (mainCategory == "" || subCategory == "") {
        errorElement.innerHTML = "Please select a category.";
        return;
    }

    var categoryId = parseInt(categoryMapping[mainCategory][subCategory]);
    var apiKey = "6F74C302D57225F07B144534D2062F32F515D5B12E9F364F600B61E9BD92868B";

    $.ajax({
        url: 'http://cors-anywhere.herokuapp.com/http://book.interpark.com/api/bestSeller.api',
        data: {
            key: apiKey,
            categoryId: categoryId,
            output: 'json'
        },
        success: function(data) {
            var bookDisplay = $('#bestSellerView');
            bookDisplay.empty();
    
            for (var i = 0; i < 10; i++) {
                var book = data.item[i];
    
                var bookCard = $('<div class="book-card"></div>');
                var bookDetails = $('<div class="book-details"></div>');
                var bookDescription = $('<div class="book-description"></div>');
    
                bookDetails.html(
                    '<img class="book-image" src="' + book.coverLargeUrl + '" alt="Cover Image">' +
                    '<h2>' + book.title + '</h2>' +
                    '<p class="book-author">' + book.author + '</p>'
                );
                bookDescription.html('<p>' + book.description + '</p>');
    
                bookCard.append(bookDetails);
                bookCard.append(bookDescription);
                bookDisplay.append(bookCard);
    
                bookDescription.hide();
    
                bookCard.on('click', function() {
                    $(this).find('.book-details, .book-description').toggle();
                });
            }
        },
        error: function(error) {
            if (error !=  null) {
                alert("Sorry, An unexpected error occureed. " +  error);
            }
        }
    });
}

function bookRecommendationDisplay() {
    var mainCategory = document.getElementById("main-category_recommend").value;
    var subCategory = document.getElementById("sub-category_recommend").value;
    var errorElement = document.getElementById("recommendation-error");

    if (mainCategory == "" || subCategory == "") {
        errorElement.innerHTML = "Please select a category.";
        return;
    }
    
    var categoryId = parseInt(categoryMapping[mainCategory][subCategory]);
    var apiKey = "6F74C302D57225F07B144534D2062F32F515D5B12E9F364F600B61E9BD92868B";

    $.ajax({
        url: 'http://cors-anywhere.herokuapp.com/http://book.interpark.com/api/recommend.api',
        data: {
            key: apiKey,
            categoryId: categoryId,
            output: 'json'
        },
        success: function(data) {
            var bookDisplay = $('#bookRecommendView');
            bookDisplay.empty();
    
            for (var i = 0; i < 10; i++) {
                var book = data.item[i];
    
                var bookCard = $('<div class="book-card"></div>');
                var bookDetails = $('<div class="book-details"></div>');
                var bookDescription = $('<div class="book-description"></div>');
    
                bookDetails.html(
                    '<img class="book-image" src="' + book.coverLargeUrl + '" alt="Cover Image">' +
                    '<h2>' + book.title + '</h2>' +
                    '<p class="book-author">' + book.author + '</p>'
                );
                bookDescription.html('<p>' + book.description + '</p>');
    
                bookCard.append(bookDetails);
                bookCard.append(bookDescription);
                bookDisplay.append(bookCard);
    
                bookDescription.hide();
            }
        },
        error: function(error) {
            if (error !=  null) {
                alert("Sorry, An unexpected error occureed. " +  error);
            }
        }
    });
}
$(function() {
  $('.search-box').on('keyup', function() {
    var query = $(this).val();
    var client = algoliasearch(window.ALGOLIA.applicationId, window.ALGOLIA.searchApiKey);
    var index = client.initIndex('docs');

    if (query) {
      index.search(query, function(err, content) {
        var resultsHtml = '<ul class="topics__list list-unstyled">';
        content.hits.forEach(function(hit) {
          var result = '<li class="topics__list__item"><a href="{{article.url}}" class="topics__list__link"><h4 class="topics__list__title">{{article.title}}</h4><p>{{article.description}}</p></a></li>';
          result = result.replace('{{article.url}}', hit.url);
          result = result.replace('{{article.title}}', hit._highlightResult.title.value);
          result = result.replace('{{article.description}}', hit._highlightResult.text.value);

          resultsHtml += result; 
        });
        resultsHtml += '</ul>';

        $('.container.search-results').html(resultsHtml);
      });

      $('.container.content').addClass('hidden');
      $('.container.search-results').removeClass('hidden');
    } else {
      $('.container.content').removeClass('hidden');
      $('.container.search-results').addClass('hidden');
    }
  })
});

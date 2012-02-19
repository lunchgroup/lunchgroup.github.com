(function($) {

	window.scrollTo(0, 1);

    if (Modernizr.touch) {
        
        // swap bw images for colour
        $('.riderimage img, .sponsorimg').css({opacity: 1});
    }
    
    var ride_date = new Date('June 16, 2012').getTime(),
        days_left = Math.ceil((ride_date - new Date().getTime())/86400000);
    $('#days').html(days_left);

    var yql = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.conquercancer.ca%2Fsite%2FTR%3Fpg%3Dteam%26fr_id%3D1413%26team_id%3D47401%22%20and%20xpath%3D%22%2F%2Fdd%22&format=json&diagnostics=true';
    $.ajax({
        type:'GET',
        url: yql, 
        dataType:'jsonp', 
        success: function(data, textStatus) {
            data = data.query.results.dd;            
            var formatstring = function(str) {
                str = str.replace(/,/, '', 'g');
                str = str.substr(0, str.indexOf('.'));
                return str;
            };
            $('#goal').text(formatstring(data[0].span.content));
            $('#raised').text(formatstring(data[1].span.span.content));
        }
    });
    
})(jQuery);
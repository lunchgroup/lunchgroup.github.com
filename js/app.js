(function($) {

	window.scrollTo(0, 1);
    
    if (Modernizr.touch) {
        
        // swap bw images for colour
        $('.riderimage img, .sponsorimg').css({opacity: 1});
    }
    
    var ride_date = new Date(1339858800*1000).getTime(),
        days_left = Math.ceil((ride_date - new Date().getTime())/86400000);
    $('#days').html(days_left);

    var yql = function(url, cb) {
        $.ajax({
            type:'GET',
            url: url, 
            dataType:'jsonp', 
            success: cb
        });
    };

    // stats
    (function() {
        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.conquercancer.ca%2Fsite%2FTR%3Fpg%3Dteam%26fr_id%3D1413%26team_id%3D47401%22%20and%20xpath%3D%22%2F%2Fdd%22&format=json&diagnostics=true';
        yql(url, function(data, textStatus) {
            data = data.query.results.dd;            
            var formatstring = function(str) {
                str = str.replace(/,/, '', 'g');
                str = str.substr(0, str.indexOf('.'));
                return str;
            };
            $('#goal').text(formatstring(data[0].span.content));
            $('#raised').text(formatstring(data[1].span.span.content));
        });
    })();
    
    // donate table
    (function() {
        
        var riderurls = {};
        
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.conquercancer.ca%2Fsite%2FTR%3Fpg%3Dteam%26fr_id%3D1413%26team_id%3D47401%22%20and%20xpath%3D'%2F%2Ftable%5B%40class%3D%22tr_roster%22%5D%2Ftr'&format=json&diagnostics=true";
        yql(url, function(data, textStatus) {
            var out = [];
            var html = [];
            var rows = data.query.results.tr;
            for (var i=0; i < rows.length; i++) {
                var row = rows[i];
                var name = row.td[0].a.content;
                var amountStr = row.td[1].p;
                var amount = parseFloat(amountStr.replace(/[A-Za-z\s$,]/g, ''));
                out.push({name: name, amountStr: amountStr, amount: amount*100});
                riderurls[name] = row.td[0].a.href;
            }
            function compareAmounts(a, b) {
                return b.amount - a.amount;
            }
            out = out.sort(compareAmounts).reverse();
            for (var i=0; i < out.length; i++) {
                var rider = out[i];
                var firstname = rider.name.split(' ')[0].toLowerCase();
                html.push('<tr><td><a href="/team/'+firstname+'.html">' + rider.name + '</a></td><td>' + rider.amountStr + '</td><td><a href="' + riderurls[rider.name] + '" class="btn btn-small btn-donate">Donate</a></td></tr>');
            };
            $('#donate table tbody').append(html.join(''));

        });
    })();
})(jQuery);
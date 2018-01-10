
// Declare overlay and its components
var $overlay = $('<div id="overlay"></div>');
var $vid = $('<video src="" autoplay controls></video>');
var video;
var iframe_link;

var items; // for CSV handling

// Append the components to overlay, then append it to html body
$overlay.append($vid);

// Append to body
$("body").append($overlay);

$overlay.click(function() {
	//hide overlay
	$overlay.fadeOut();
	video.pause();
});


// on gallery item click function
$(".video-item a").click(function(event) {
	event.preventDefault();
	
	// update overlay
	$vid.attr("src", $(this).attr("href"));
	video = $vid.get(0);
	
	
	// Show overlay
	$overlay.fadeIn();
});

// CSV handling 
$.ajax({
	// alt URL: https://rawgit.com/ntuhsslibrary/limchongyah-final/master/lcy_news.csv
    url: "https://cdn.rawgit.com/ntuhsslibrary/limchongyah-final/98f9d511/lcy_news.csv",
    async: true,
    success: function (csvd) {
        items = $.csv.toObjects(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
		
		// run through each objects and sort it out according to the decades
		for (var i = 0; i < items.length; i++) {
			var $li_link = $('<a href=""></a>');
			
			if (items[i].permalink.indexOf("factiva") >= 0) {
				$li_link.addClass("news-headline-iframe");
			} else {
				$li_link.addClass("news-headline-popup");
			}
			
			$li_link.attr("href", items[i].permalink);
			$li_link.text(items[i].headline);
			
			if (items[i].decade == "60" || items[i].decade == "70") {
				$("#news-60s").append(
					$('<li/>').append($li_link)
					);
			} else if (items[i].decade == "80") {
				$("#news-80s").append(
					$('<li/>').append($li_link)
					);
			} else if (items[i].decade == "90") {
				$("#news-90s").append(
					$('<li/>').append($li_link)
					);
			} else if (items[i].decade == "100") {
				$("#news-100s").append(
					$('<li/>').append($li_link)
					);
			} else if (items[i].decade == "110") {
				$("#news-110s").append(
					$('<li/>').append($li_link)
					);
			}
		}
		
		// bind the functions and such
		//news iframe stuff
		$(".news-headline-iframe").click(function(event) {
			event.preventDefault();
			
			// grab the link from href
			iframe_link = $(this).attr("href");
			
			//update iframe
			$("#news-iframe").attr("src", iframe_link);
		});

		// news popup window stuff
		$(".news-headline-popup").click(function(event) {
			event.preventDefault();
			
			//open link in new window
			var NWin = window.open($(this).attr('href'), '', 'height=800,width=800');
			if (window.focus){
				NWin.focus();
			}
		});
		
    }
});




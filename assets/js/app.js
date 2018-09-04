$(".left .close").on('click',function(){
	if( $(".left").hasClass("gone") ){
		$(".left").stop(true,true).removeClass("gone");
		$(".left .close").text("<");
		$(".right").stop(true,true).removeClass("full");
	}else{
		$(".left").stop(true,true).addClass("gone");
		$(".left .close").text(">");
		$(".right").stop(true,true).addClass("full");
	}
});


$("ul li a").on('click',function(){
	$("ul li a").removeClass("active");
	$(this).addClass("active");
});





function getTitle(){ 
  var winScrollTop = $(window).scrollTop();		
  var step;

  $(".right .step").each(function(){
  	var stepTop = $(this).position().top;
  	//console.log($(this).data("title") + " - " + stepTop);
  	if(winScrollTop >= stepTop-30){
  		step = $(this).data("title");
  	}
  });
  //console.log(step);
  $("ul.toc-list li a").removeClass("active");
  $("ul.toc-list li a[data-id='"+step+"']").addClass("active");
}
getTitle();
$(window).scroll(function(){ getTitle(); });



/* SMOOTH SCROOL */
$(function() {
	var $window = $(window), $document = $(document),
		transitionSupported = typeof document.body.style.transitionProperty === "string", // detect CSS transition support
		scrollTime = 1; // scroll time in seconds

	$(document).on("click", "a[href*=\\#]:not([href=\\#])", function(e) {
		var target, avail, scroll, deltaScroll;
    
		if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
			target = $(this.hash);
			target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");

			if (target.length) {
				avail = $document.height() - $window.height();

				if (avail > 0) {
					scroll = target.offset().top;
          
					if (scroll > avail) {
						scroll = avail;
					}
				} else {
					scroll = 0;
				}

				deltaScroll = $window.scrollTop() - scroll;

				// if we don't have to scroll because we're already at the right scrolling level,
				if (!deltaScroll) {
					return; // do nothing
				}

				e.preventDefault();
				
				if (transitionSupported) {
					$("html").css({
						"margin-top": deltaScroll + "px",
						"transition": scrollTime + "s ease-in-out"
					}).data("transitioning", scroll);
				} else {
					$("html, body").stop(true, true) // stop potential other jQuery animation (assuming we're the only one doing it)
					.animate({
						scrollTop: scroll + "px"
					}, scrollTime * 1000);
					
					return;
				}
			}
		}
	});

	if (transitionSupported) {
		$("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function(e) {
			var $this = $(this),
				scroll = $this.data("transitioning");
			
			if (e.target === e.currentTarget && scroll) {
				$this.removeAttr("style").removeData("transitioning");
				
				$("html, body").scrollTop(scroll);
			}
		});
	}
});
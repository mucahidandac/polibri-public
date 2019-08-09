///////////////////////
// Bootstrap Menu/nav
///////////////////////

$(function () {

    // Keeping dropdown submenu inside screen. 
    // More info: http://stackoverflow.com/questions/17985334/jquery-solution-for-keeping-dropdown-submenu-inside-screen
    $('.dropdown-toggle').parent().on('hover', function () {
        var menu = $('> .dropdown-menu', this);
        var menupos = $(menu).offset();

        if (menupos.left + menu.width() > $(window).width()) {
            var newpos = -$(menu).width();
            menu.css({
                left: newpos
            });
        }
    });


    // Close mobile menu when click menu link (use class ".mlc")
    $(document).on('ready', function () {
        $(".mlc").on('click', function (event) {
            $(".navbar-collapse").collapse('hide');
        });
    });

    //////////////////////////////////////////////////////
    // Hide header/menu on scroll down, show on scroll up
    //////////////////////////////////////////////////////

    var didScroll;
    var lastScrollTop = 0;
    var delta = 2;
    var navbarHeight = $('.show-hide-on-scroll').outerHeight();
    $(window).on('scroll', function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 50);

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the header, add class .fly-up.
        // This is necessary so you never see what is "behind" the header.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('.show-hide-on-scroll').addClass('fly-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('.show-hide-on-scroll').removeClass('fly-up');
            }
        }

        lastScrollTop = st;
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Header Filled (cbpAnimatedHeader): http://tympanus.net/codrops/2013/06/06/on-scroll-animated-header/
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    var cbpAnimatedHeader = (function () {

        var docElem = document.documentElement,
            header = document.querySelector('#header'),
            didScroll = false,
            changeHeaderOn = 1;

        function init() {
            window.addEventListener('scroll', function (event) {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(scrollPage, 78);
                }
            }, false);
        }

        function scrollPage() {
            var sy = scrollY();
            if ($(this).scrollTop() > 78) {
                $('#header.fixed-top, #header.show-hide-on-scroll').addClass("header-filled");
            } else {
                $('#header.fixed-top, #header.show-hide-on-scroll').removeClass("header-filled");
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        init();

    })();


    ////////////////////
    // Top sliding bar
    ////////////////////

    var megaDrop = $('.top-slidingbar-trigger');
    var megaContainer = $('#top-slidingbar');
    $(megaDrop).on('click', function () {
        $(megaContainer).slideToggle(300, function () {
            if ($(this).is(":hidden")) $(megaDrop).html("+");
            else $(megaDrop).html("×");
        });
    });


    /////////////////////
    // Smooth scrolling
    /////////////////////
    $('.sm-scroll').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1500, 'easeInOutExpo');
                return false;
            }
        }
    });


    //////////////////////////////////////////////////////////////////////////////////////////
    // Isotope
    // Source: http://isotope.metafizzy.co
    // Note-1: "imagesloaded" blugin is required: https://github.com/desandr../assets/img/loaded
    // Note-2: "lazysizes" blugin is recommended: https://github.com/aFarkas/lazysizes
    //////////////////////////////////////////////////////////////////////////////////////////

    // init Isotope
    var $container = $('.isotope-items-wrap');
    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.isotope-item',
            transitionDuration: '0.5s',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    });

    // Filter
    $('.isotope-filter-links a').on('click', function () {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });
        return false;
    });

    // Filter item active
    var filterItemActive = $('.isotope-filter-links a');
    filterItemActive.on('click', function () {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            filterItemActive.removeClass('active');
            $this.addClass('active');
        }
    });



    ///////////////////////////////////////////////////////////////////////////////////////
    // YTPlayer (Background Youtube video): https://github.com/pupunzi/jquery.mb.YTPlayer
    ///////////////////////////////////////////////////////////////////////////////////////

    $(function () {
        if (!jQuery.browser.mobile)
            $(".youtube-bg").mb_YTPlayer();
    });


    ////////////////////////////////////////////////////////////////////
    // OWL Carousel (more info: http://www.owlcarousel.owlgraphic.com)
    ////////////////////////////////////////////////////////////////////
    $(function () {

        $('.owl-carousel').each(function () {
            var $carousel = $(this);
            $carousel.owlCarousel({

                items: $carousel.data("items"),
                loop: $carousel.data("loop"),
                margin: $carousel.data("margin"),
                center: $carousel.data("center"),
                startPosition: $carousel.data("start-position"),
                animateIn: $carousel.data("animate-in"),
                animateOut: $carousel.data("animate-out"),
                autoWidth: $carousel.data("autowidth"),
                autoHeight: $carousel.data("autoheight"),
                autoplay: $carousel.data("autoplay"),
                autoplayTimeout: $carousel.data("autoplay-timeout"),
                autoplayHoverPause: $carousel.data("autoplay-hover-pause"),
                autoplaySpeed: $carousel.data("autoplay-speed"),
                nav: $carousel.data("nav"),
                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                navSpeed: $carousel.data("nav-speed"),
                dots: $carousel.data("dots"),
                dotsSpeed: $carousel.data("dots-speed"),
                mouseDrag: $carousel.data("mouse-drag"),
                touchDrag: $carousel.data("touch-drag"),
                dragEndSpeed: $carousel.data("drag-end-speed"),
                lazyLoad: $carousel.data("lazy-load"),
                video: true,
                responsive: {
                    0: {
                        items: $carousel.data("mobile-portrait"),
                        center: false,
                    },
                    480: {
                        items: $carousel.data("mobile-landscape"),
                        center: false,
                    },
                    768: {
                        items: $carousel.data("tablet-portrait"),
                        center: false,
                    },
                    992: {
                        items: $carousel.data("tablet-landscape"),
                    },
                    1200: {
                        items: $carousel.data("items"),
                    }
                }

            });
        });

    });


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Simple Background Image Parallax Plugin
    // More info: (http://designers.hubspot.com/docs/snippets/design/implement-a-parallax-effect)
    ///////////////////////////////////////////////////////////////////////////////////////////////

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    jQuery(document).on('ready', function () {
        if (!isMobile.any()) {

            // Begin Background Image Parallax
            (function ($) {

                $.fn.parallax = function (options) {

                    var windowHeight = $(window).height();

                    // Establish default settings
                    var settings = $.extend({
                        speed: 0.5
                    }, options);

                    // Iterate over each object in collection
                    return this.each(function () {

                        // Save a reference to the element
                        var $this = $(this);

                        // Set up Scroll Handler
                        $(document).scroll(function () {

                            var scrollTop = $(window).scrollTop();
                            var offset = $this.offset().top;
                            var height = $this.outerHeight();

                            // Check if above or below viewport
                            if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
                                return;
                            }

                            var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

                            // Apply the Y Background Position to Set the Parallax Effect
                            $this.css('background-position', 'center ' + yBgPosition + 'px');

                        });
                    });
                }

            }(jQuery));

            // add css background-attachment: fixed;
            $('.bg-image-parallax').css('background-attachment', 'fixed');


            // Call the parallax plugin
            $('.bg-image-parallax').parallax({
                speed: 0.5
            });
            // End Background Image Parallax

        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////
//
// Deferring embed videos (Youtube, Vimeo).
// 
// When you have videos from Youtube, Vimeo or just about any other provider embedded 
// in your webpages it causes your page to load slower. Just about every video can be deferred 
// until after your initial pageload which will allow your page to load quickly 
// without having to gather all the files and resources that the video is requesting.
//
// More info: https://www.feedthebot.com/pagespeed/defer-videos.html
//
//////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
    var vidDefer = document.getElementsByTagName('iframe');
    for (var i = 0; i < vidDefer.length; i++) {
        if (vidDefer[i].getAttribute('data-src')) {
            vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
        }
    }
}
window.onload = init;


///////////////////////////////////////////////////////////////////
// Magnific Popup: http://dimsemenov.com/plugins/magnific-popup/
///////////////////////////////////////////////////////////////////
$(document).on('ready', function () {

    // Image gallery popup (type image)
    $('.popup-gallery').magnificPopup({
        delegate: '.popup-trigger',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fadein',
        gallery: {
            enabled: true, // enable or disable gallery (false/true)
            preload: [0, 1], // read about this option in next Lazy-loading section
            navigateByImgClick: true,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-custom-arrow mfp-custom-arrow-%dir%"></button>', // markup of an arrow button
            tPrev: 'Previous (Left arrow key)', // title for left button
            tNext: 'Next (Right arrow key)', // title for right button
            tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
        },
        image: {
            titleSrc: 'data-title', // Attribute of the target element that contains caption for the slide.
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.' // Error message
        }
    });

    // Inline popup (type inline)
    $('.inline-popup-trigger').magnificPopup({
        type: 'inline',
        modal: false,
        alignTop: true,
        fixedContentPos: true,
        fixedBgPos: false,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'mfp-fade-zoom',
        gallery: {
            enabled: true, // enable or disable gallery (false/true)
            arrowMarkup: '<button title="%title%" type="button" class="mfp-custom-arrow mfp-custom-arrow-%dir%"></button>', // markup of an arrow button
            tPrev: 'Previous (Left arrow key)', // title for left button
            tNext: 'Next (Right arrow key)' // title for right button
        }
    });

    $(document).on('click', '.inline-popup-close', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

});


/////////////////////////////////////////////////////
// Universal PHP Mail Feedback Script
// More info: https://github.com/agragregra/uniMail
/////////////////////////////////////////////////////

//E-mail Ajax Send
$("#contact-form").submit(function () { //Change (your contact form ID)
    var th = $(this);
    $.ajax({
        type: "POST",
        url: "mail.php", //Change (mail.php path)
        data: th.serialize()
    }).done(function () {
        alert("Thank you. Your message has been sent!");
        setTimeout(function () {
            // Done Functions
            th.trigger("reset");
        }, 1000);
    });
    return false;
});


/////////////////////////
// Scroll to top button
/////////////////////////

// Check to see if the window is top if not then display button
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 400) {
        $('.scrolltotop').fadeIn();
    } else {
        $('.scrolltotop').fadeOut();
    }
});

//////////////////
// Window resize 
//////////////////
$(window).on('resize', function () {
    // Make ".intro-inner" margin-top equal to "#header" height
    $('.intro-inner').css('margin-top', $('#header').css('height'));

    // Full height page 
    $('.full-height').innerHeight($(window).height());

}).resize();
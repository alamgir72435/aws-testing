(function ($) {
  "use strict";

  // Preloader
  $(window).on("load", function () {
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
    });
  });

  // Bootstrap Slider
  (function ($) {
    //Function to animate slider captions
    function doAnimations(elems) {
      //Cache the animationend event in a variable
      var animEndEv = "webkitAnimationEnd animationend";

      elems.each(function () {
        var $this = $(this),
          $animationType = $this.data("animation");
        $this.addClass($animationType).one(animEndEv, function () {
          $this.removeClass($animationType);
        });
      });
    }

    //Variables on page load
    var $myCarousel = $("#carousel-example-generic"),
      $firstAnimatingElems = $myCarousel
        .find(".item:first")
        .find("[data-animation ^= 'animated']");

    //Initialize carousel
    $myCarousel.carousel({
      interval: 5000,
    });

    //Animate captions in first slide on page load
    doAnimations($firstAnimatingElems);

    //Other slides to be animated on carousel slide event
    $myCarousel.on("slide.bs.carousel", function (e) {
      var $animatingElems = $(e.relatedTarget).find(
        "[data-animation ^= 'animated']"
      );
      doAnimations($animatingElems);
    });

    $myCarousel.on("mouseover", function (e) {
      $myCarousel.carousel();
    });
  })(jQuery);

  // wow animation script
  // new WOW().init();

  // Smoothly scroll
  $("#scroll").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $("#appointment").offset().top,
      },
      1200
    );
  });

  // Navbar Scroll To Fixed
  $(".fixed-header").scrollToFixed();

  // Datepicker
  var date = new Date();
  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  $("#datepicker").datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    autoclose: true,
  });
  $("#datepicker").datepicker("setDate", today);

  // Banner Carousel
  if ($(".banner-carousel").length) {
    $(".banner-carousel").owlCarousel({
      rtl: false,
      loop: true,
      margin: 30,
      dots: true,
      nav: false,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 1000,
      // animateIn: 'fadeInLeft',
      responsive: {
        0: {
          items: 1,
          center: true,
        },
        1200: {
          items: 1,
        },
      },
    });
  }

  // Doctor Carousel

  /*
    if($('.doctor-carousel').length){
        $('.doctor-carousel').owlCarousel({
            rtl:false,
            loop: true,
            margin: 30,
            dots: false,
            nav:true,
            autoplayHoverPause: false,
            autoplay: true,
            smartSpeed: 700,
            navText: [
              '<i class="fa fa-angle-left" aria-hidden="true"></i>',
              '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    center: false
                },
                480:{
                    items:2,
                    center: false
                },
                600: {
                    items: 2,
                    center: false
                },
                768: {
                    items: 3
                },
                992: {
                    items: 3
                },
                1199: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        })
    }

    */

  // Testimonial carousel
  if ($(".testimonial-carousel").length) {
    $(".testimonial-carousel").owlCarousel({
      rtl: false,
      loop: true,
      margin: 30,
      dots: false,
      nav: true,
      animateIn: "zoomInDown",
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 700,
      navText: [
        '<i class="fa fa-angle-down" aria-hidden="true"></i>',
        '<i class="fa fa-angle-up" aria-hidden="true"></i>',
      ],
      responsive: {
        0: {
          items: 1,
          center: false,
        },
        480: {
          items: 1,
          center: false,
        },
        600: {
          items: 1,
          center: false,
        },
        768: {
          items: 1,
        },
        992: {
          items: 1,
        },
        1200: {
          items: 1,
        },
      },
    });
  }

  //Scroll-Up
  dyscrollup.init({
    showafter: 500,
    scrolldelay: 1000,
    position: "right",
    shape: "squre",
    width: "20",
    height: "20",
  });

  // Video popup jquery
  jQuery("a.demo").YouTubePopUp();

  // CounterUp
  $(".numbar-counter").countUp();
})(window.jQuery);

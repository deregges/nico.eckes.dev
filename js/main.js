/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

"use strict";

// noinspection JSUnresolvedVariable
const $ = jQuery;

/*---------------------------------------------------- */
/* Preloader
------------------------------------------------------ */
$(window).load(function () {

    // will first fade out the loading animation
    $("#loader").fadeOut("slow", function () {

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

    });

})

/*----------------------------------------------------- */
/* Alert Boxes
  ------------------------------------------------------- */
$('.alert-box').on('click', '.close', function () {
    $(this).parent().fadeOut(500);
});


/*-----------------------------------------------------*/
/* Navigation Menu
------------------------------------------------------ */
const toggleButton = $('.menu-toggle'),
    nav = $('.main-navigation');

// toggle button
toggleButton.on('click', function (e) {

    e.preventDefault();
    toggleButton.toggleClass('is-clicked');
    nav.slideToggle();

});

// nav items
nav.find('li a').on("click", function () {

    // update the toggle button
    toggleButton.toggleClass('is-clicked');
    // fadeout the navigation panel
    nav.fadeOut();

});


/*---------------------------------------------------- */
/* Highlight the current section in the navigation bar
------------------------------------------------------ */
const sections = $("section"), navigation_links = $("#main-nav-wrap li a");

sections.waypoint({

    handler: function (direction) {

        let active_section;

        active_section = $('section#' + this.element.id);

        if (direction === "up") active_section = active_section.prev();

        const active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");
    },

    offset: '25%'
});


/*---------------------------------------------------- */
/* Smooth Scrolling
------------------------------------------------------ */
$('.smoothscroll').on('click', function (e) {

    e.preventDefault();

    const target = this.hash,
        $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 800);
});


/*---------------------------------------------------- */
/*  Placeholder Plugin Settings
------------------------------------------------------ */
$('input, textarea, select').placeholder()


/*---------------------------------------------------- */
/*	contact form
------------------------------------------------------ */

/* local validation */
$('#contactForm').validate({

    /* submit via ajax */
    submitHandler: function (form) {

        const sLoader = $('#submit-loader');
        const mWarning = $('#message-warning')

        $.ajax({

            type: "POST",
            url: "https://contact.eckes.dev",
            data: $(form).serialize(),
            beforeSend: function () {
                sLoader.fadeIn();
            },
            success: function (msg) {
                // Message was sent
                if (msg === 'OK') {
                    sLoader.fadeOut();
                    $('#message-warning').hide();
                    $('#contactForm').fadeOut();
                    $('#message-success').fadeIn();
                }
                // There was an error
                else {
                    sLoader.fadeOut();
                    mWarning.html(msg);
                    mWarning.fadeIn();
                }
            },
            error: function () {
                sLoader.fadeOut();
                mWarning.html("Something went wrong. Please mail me manually by contact@eckes.dev");
                mWarning.fadeIn();
            }
        });
    }
});

/*----------------------------------------------------- */
/* Back to top
------------------------------------------------------- */
$(window).scroll(function () {

    if (!($("#header-search").hasClass('is-visible'))) {

        if ($(window).scrollTop() >= 300) {
            $("#go-top").fadeIn(400);
        } else {
            $("#go-top").fadeOut(400);
        }
    }
});
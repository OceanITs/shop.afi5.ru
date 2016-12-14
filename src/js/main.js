/**
 * Yandex goal
 * @param goal
 */
function yaCounter(goal){
    yaCounterXXX.reachGoal(goal);
}

/**
 * scroll to #hash onLoad
 * @param hash
 */
function scrollToTarget(hash) {
    var top = 0;
    console.log(hash);

    $(document).off("scroll"); // not use onScroll
    if (hash) {
        if (!$(hash).length) return;
        top = $(hash).offset().top - 0;
    }

    //console.log(hash);

    $('html, body').stop().animate({
        'scrollTop': top
    }, 500, 'swing', function () {
        //window.location.hash = target;
        //fixedMenu();
        onScroll();
        $(document).on("scroll", onScroll);
    });

    //$('meta[name=viewport]').attr('content', 'width=1170,initial-scale=10,maximum-scale=10');
}

/**
 * scroll to #hash(window.location.hash) onLoad, if #hash
 */
function hash() {
    var hash = window.location.hash;
    if (hash) {
        scrollToTarget(hash);
        //console.log(hash);
    }
}

/**
 * Shuffle array
 * @param array()
 * @returns array()
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * ====================================================
 * Wow Animate - Animation
 * ====================================================
 */
$('.bTrigger__model').each( function(i) {
    var delay = 0.15 * i + "s";
    $(this).attr({"data-wow-delay": delay, "data-wow-duration": "0.55s"}).addClass("wow fadeInUp");
});

for (var arr = [], i = 0; i < $(".service__model").length; i++) arr[i] = i;
shuffle(arr);
$('.service__model').each( function(i) {
    var delay = 0.15 * (arr[i] % 4) + "s";
    $(this).attr({"data-wow-delay": delay, "data-wow-duration": "0.65s"}).addClass(("wow fadeIn"));
});

for (var arr = [], i = 0; i < $(".offer__model").length; i++) arr[i] = i;
shuffle(arr);
$('.offer__model').each( function(i) {
    var el_class = Math.round(Math.random()) ? "fadeInLeft" : "fadeInRight",
        delay = 0.15 * (arr[i] % 4) + "s";
    $(this).attr({"data-wow-delay": delay, "data-wow-duration": "0.65s"}).addClass(el_class + " wow");
});

for (var arr = [], i = 0; i < $(".sector__model").length; i++) arr[i] = i;
shuffle(arr);
$('.sector__model').each( function(i) {
    var el_class = Math.round(Math.random()) ? "fadeInLeft" : "fadeInRight",
        delay = 0.15 * (arr[i] % 4) + "s";
    $(this).attr({"data-wow-delay": delay, "data-wow-duration": "0.65s"}).addClass(el_class + " wow");
});

$('.question__model').each( function(i) {
    var delay = 0.15 * i + "s";
    $(this).attr({"data-wow-delay": delay, "data-wow-duration": "0.55s"}).addClass("wow flipInX");
});

if (window.screen.width > 500) new WOW().init(); // Wow Action. if mobile version disable

/**
 * ====================================================
 * Bind an event - on $( document ).ready()
 * ====================================================
 */
hash();

// on click on link with #hash
$('a[href^="#"],.toTop').on('click', function(e) {
    e.preventDefault();
    scrollToTarget(this.hash);
});

function onScroll() {
    if ($(this).scrollTop() > 400) $('.toTop').stop().show().fadeTo(200, 0.6);
    else $('.toTop').stop().fadeTo(200, 0, function() { $(this).hide(); });
}
//onScroll();

$(document).on("scroll", onScroll);


/**
 * ====================================================
 * magnificPopup
 * ====================================================
 */

$("[data-mfp-src]").magnificPopup({
    disableOn: 400,
    position: false
});


/*
$('input, select, textarea').on('focus blur', function(event) {
    $('meta[name=viewport]').attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type == 'blur' ? 10 : 1));
});*/

$('.bSlider__wrap').slick({
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnFocus: false,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dots: true,
    customPaging : function(slider, i) {
        return '<button type="button"></button>';
    }
});

$('.bCat__block').slick({
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dots: true,
    customPaging : function(slider, i) {
        return '<button type="button"></button>';
    }
});

$('.bsCard__block').slick({
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dots: true,
    customPaging : function(slider, i) {
        return '<button type="button"></button>';
    },
    variableWidth: true,
    slidesToShow: 5,
    slidesToScroll: 5
});

$('.bsCard__filter__link').click(function() {
    var filter = $(this).data("filter");
    if (typeof filter !== 'undefined') {
        $('.bsCard__filter__link').removeClass("active");
        $(this).addClass("active");
        $('.bsCard__block').slick('slickUnfilter');
        if (filter) $('.bsCard__block').slick('slickFilter', '.bsCard__model-' + filter);
    }
});


/**
 * ====================================================
 * inputmask
 * ====================================================
 */
$("input[name=phone]").inputmask("+7 (999) 999-99-99");

$(function() {
});

// Phone keyup
$('form input[name=phone]').keyup(function(){

    var phone = $(this).val();
    //this.value = this.value.replace(/[^0-9\.]/g,'');

    if (phone != '') {
        //if (phone.indexOf("_") < 0) $(this).removeClass("error"); // if inputmask
        if (phone.length >= 9) $(this).removeClass("error"); // if not inputmask
    }

});

var msg = {
    phone: "Пожалуйста, введите ваш Телефон!",
    phoneV: "Пожалуйста, введите ПОЛНЫЙ номер телефона с кодом города или оператора ( например, +7 (999) 444-55-66 или +7 (495) 444-55-66 )"
};

// Form Submit
$('form').submit(function(){
    var p = $(this);
    //var name = $('input[name=name]', p).val();
    var phone = $('input[name=phone]', p).val();

    if (phone == ''){
        $('input[name=phone]', p).focus().addClass("error");
        //alert(msg.phone);
        $.jGrowl(msg.phone);
        return false;
    }
    else {
        if (phone.indexOf("_") > 0) {
            //if (phone.length < 9) {
            $('input[name=phone]', p).focus().addClass("error");
            $.jGrowl(msg.phoneV);
            return false;
        }
    }
    alert('sefa');
    console.log('sefa');

    return false;
});



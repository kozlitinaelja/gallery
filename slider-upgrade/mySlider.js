/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 3/14/13
 * Time: 12:44 AM
 * To change this template use File | Settings | File Templates.
 */

var $container = $('div.slider').css({overflow: 'hidden'}).find('ul'),
    $containerImages = $container.find('img'),
    slider = new Slider($container),
    $nav = $('div.slider-nav').show(),
    $dir = $('.dir'),
    $screenImg = $("div.screen").children('img');


$container.find('img').addClass("slide");
slider.setEffect(Slider.TYPE_SLIDE);


$dir.on('click', function(error) {
  var act = $(this).data('action'),
      curr,
      imgSrc, $currList;
  slider[act]();

  curr = slider.getCurrent();

  $currList = $container.children('li').eq(curr).addClass("active");
  $currList.siblings('li').removeClass("active");
  imgSrc = $containerImages.eq(curr).attr("src");
  $screenImg = $("div.screen").children('img').attr("src", imgSrc);
});

$container.on("click", "li", function() {
  var $this = $(this).addClass("active"),
      imgSrc = $this.find('img').attr("src"),
      $parent = $this.closest('ul').children('li'),
      curr = $parent.index(this);


  $this.siblings('li').removeClass("active");
  $screenImg = $("div.screen").children('img').attr("src", imgSrc);
  slider.setCurrent(curr);


});



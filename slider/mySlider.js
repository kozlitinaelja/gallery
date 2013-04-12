/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 3/14/13
 * Time: 12:44 AM
 * To change this template use File | Settings | File Templates.
 */

  var $container = $('div.slider').css({overflow: 'hidden'}).find('ul'),
    slider = new Slider($container),
    $nav = $('div.slider-nav').show(),
    $dir = $('.dir');



$('#enableFadeEffect').on('change', function() {
  if (this.checked) {
    slider.setEffect(Slider.TYPE_FADE);
  } else {
    slider.setEffect(Slider.TYPE_SLIDE);
  }
    });
$dir.hover(function() {
  $(this).addClass('showDir')}, function() {
  $(this).removeClass('showDir');
    });

$dir.on('click', function(){
  var act = $(this).data('action');
  slider[act]();
  $nav.find('button').data('action', 'play').text('Play');

});

$nav.find('button').on('click', function() {
  var act = $(this).data('action');
  slider[act]();
  if (act === 'play') {
    $(this).data('action', 'pause').text('Pause');
  } else {
    $(this).data('action', 'play').text('Play');
  }
});



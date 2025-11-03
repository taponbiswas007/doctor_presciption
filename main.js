$(document).ready(function(){
$('.online_offline_tab button').click(function(){
    $('.online_offline_tab button').removeClass('active');
    $(this).addClass('active');
});
});
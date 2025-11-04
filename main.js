$(document).ready(function(){
$('.online_offline_tab button').click(function(){
    $('.online_offline_tab button').removeClass('active');
    $(this).addClass('active');
});
$('.today_or_all_select button').click(function(){
    $('.today_or_all_select button').removeClass('active');
    $(this).addClass('active');
});
 $(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
  });

  // Optional: Show/hide active indicator when filters are selected
  $(document).on('change', '.filter-option', function () {
    const checkedCount = $('.filter-option:checked').length;
    if (checkedCount > 0) {
      $('#filterIndicator').removeClass('d-none');
    } else {
      $('#filterIndicator').addClass('d-none');
    }
  });
});
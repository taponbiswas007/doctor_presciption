
// Function to handle screen resize and set initial state
function handleResponsiveLayout() {
    const $patientListArea = $('.patient_list_area');
    const $patientDetailsArea = $('.patient_details_area');
    const $icon = $('.toggle_patientList i');
    
    if ($(window).width() <= 768) {
        // Mobile view - default to collapsed
        $patientListArea.addClass('collapsed');
        $patientListArea.css('left', '-250px');
        $patientDetailsArea.css({
            'margin-left': '0',
            'max-width': '100%'
        });
        $icon.removeClass('fa-angle-left').addClass('fa-angle-right');
    } else {
        // Desktop view - default to expanded
        $patientListArea.removeClass('collapsed');
        $patientListArea.css('left', '0');
        $patientDetailsArea.css('margin-left', '250px');
        $icon.removeClass('fa-angle-right').addClass('fa-angle-left');
    }
}
$(document).ready(function() {
    handleResponsiveLayout();
    
    // Handle resize events
    $(window).resize(function() {
        handleResponsiveLayout();
    });
    
    // Toggle function with smooth transitions
    $('.patient_list_area .toggle_patientList').click(function() {
        const $patientListArea = $('.patient_list_area');
        const $patientDetailsArea = $('.patient_details_area');
        const $icon = $(this).find('i');
        const $toggleBtn = $(this);
        
        // Add smooth transition classes
        $patientListArea.addClass('transitioning');
        $patientDetailsArea.addClass('transitioning');
        $toggleBtn.addClass('transitioning').prop('disabled', true);
        
        $patientListArea.toggleClass('collapsed');
        
        if ($patientListArea.hasClass('collapsed')) {
            $patientListArea.css('left', '-250px');
           $patientDetailsArea.css({
            'margin-left': '0',
            'max-width': '100%'
        });
            $icon.removeClass('fa-angle-left').addClass('fa-angle-right');
        } else {
            $patientListArea.css('left', '0');
            $patientDetailsArea.css('margin-left', '250px');
            $icon.removeClass('fa-angle-right').addClass('fa-angle-left');
        }
        
        // Remove transitioning classes after animation
        setTimeout(() => {
            $patientListArea.removeClass('transitioning');
            $patientDetailsArea.removeClass('transitioning');
            $toggleBtn.removeClass('transitioning').prop('disabled', false);
        }, 400);
    });
    // ===== Online / Offline Toggle with Enhanced Transitions =====
    $('.online_offline_tab .patient_categoryBtn').click(function() {
        const $clickedBtn = $(this);
        const $offlineList = $('.offlinepatient_list');
        const $onlineList = $('.OnlinePatient_list');
        
        // If already active, do nothing
        if ($clickedBtn.hasClass('active')) return;
        
        // Add loading state
        $('.online_offline_tab').addClass('switching');
        
        // Remove active class from all buttons
        $('.online_offline_tab .patient_categoryBtn').removeClass('active');
        
        // Add active class with slight delay for better visual feedback
        setTimeout(() => {
            $clickedBtn.addClass('active');
        }, 150);
        
        // Smooth transition with crossfade effect
        if ($clickedBtn.hasClass('offlinepatient_listBtn')) {
            $onlineList.fadeOut(300, function() {
                $offlineList.fadeIn(400);
                $('.online_offline_tab').removeClass('switching');
            });
        } else if ($clickedBtn.hasClass('OnlinePatient_listBtn')) {
            $offlineList.fadeOut(300, function() {
                $onlineList.fadeIn(400);
                $('.online_offline_tab').removeClass('switching');
            });
        }
    });

    // Initialize correct state on page load
    if ($('.offlinepatient_listBtn').hasClass('active')) {
        $('.offlinepatient_list').show();
        $('.OnlinePatient_list').hide();
    }
    if ($('.OnlinePatient_listBtn').hasClass('active')) {
        $('.OnlinePatient_list').show();
        $('.offlinepatient_list').hide();
    }

    // ===== Today / All Toggle with Enhanced Transitions =====
    $('.today_or_all_select button').click(function() {
        const $clickedBtn = $(this);
        const $parent = $(this).closest('.OnlinePatient_list, .offlinepatient_list');
        
        // If already active, do nothing
        if ($clickedBtn.hasClass('active')) return;
        
        // Add loading state to the specific section
        $parent.addClass('content-switching');
        
        const $todayList = $parent.find('.todayPatientList');
        const $allList = $parent.find('.allPatientList');
        const $buttons = $parent.find('.today_or_all_select button');
        
        // Remove active class from all buttons in this section
        $buttons.removeClass('active');
        
        // Add active class with delay for better feedback
        setTimeout(() => {
            $clickedBtn.addClass('active');
        }, 100);
        
        // Smooth slide and fade transition
        if ($clickedBtn.hasClass('TodayPatientBtn')) {
            $allList.animate({
                opacity: 0,
                marginLeft: -20
            }, 300, function() {
                $(this).hide();
                $todayList.css({
                    opacity: 0,
                    marginLeft: 20,
                    display: 'block'
                }).animate({
                    opacity: 1,
                    marginLeft: 0
                }, 400, function() {
                    $parent.removeClass('content-switching');
                });
            });
        } else if ($clickedBtn.hasClass('allPatientBtn')) {
            $todayList.animate({
                opacity: 0,
                marginLeft: -20
            }, 300, function() {
                $(this).hide();
                $allList.css({
                    opacity: 0,
                    marginLeft: 20,
                    display: 'block'
                }).animate({
                    opacity: 1,
                    marginLeft: 0
                }, 400, function() {
                    $parent.removeClass('content-switching');
                });
            });
        }
    });

    // Initialize Today/All state on page load for OnlinePatient_list
    $('.OnlinePatient_list').each(function() {
        if ($(this).find('.TodayPatientBtn').hasClass('active')) {
            $(this).find('.todayPatientList').show();
            $(this).find('.allPatientList').hide();
        }
        if ($(this).find('.allPatientBtn').hasClass('active')) {
            $(this).find('.allPatientList').show();
            $(this).find('.todayPatientList').hide();
        }
    });

    // Initialize Today/All state on page load for offlinepatient_list
    $('.offlinepatient_list').each(function() {
        if ($(this).find('.TodayPatientBtn').hasClass('active')) {
            $(this).find('.todayPatientList').show();
            $(this).find('.allPatientList').hide();
        }
        if ($(this).find('.allPatientBtn').hasClass('active')) {
            $(this).find('.allPatientList').show();
            $(this).find('.todayPatientList').hide();
        }
    });
});


$(document).ready(function() {
    // Filter functionality
    let activeFilters = [];
    
    // Initialize filter state
    function initializeFilters() {
        activeFilters = [];
        updateFilterIndicator();
        updateFilterButtonState();
    }
    
    // Update filter indicator (checkmark)
    function updateFilterIndicator() {
        const $indicator = $('#filterIndicator');
        const hasActiveFilters = activeFilters.length > 0;
        
        if (hasActiveFilters) {
            $indicator.removeClass('d-none');
            
            // Add pulse animation when filter becomes active
            $indicator.addClass('pulse-active');
            setTimeout(() => $indicator.removeClass('pulse-active'), 300);
        } else {
            $indicator.addClass('d-none');
        }
    }
    
    // Update filter button visual state
    function updateFilterButtonState() {
        const $filterBtn = $('#filterIndicator');
        
        if (activeFilters.length > 0) {
            $filterBtn.addClass('filter-active');
            $filterBtn.find('i').removeClass('fa-filter').addClass('fa-filter-circle-check');
        } else {
            $filterBtn.removeClass('filter-active');
            $filterBtn.find('i').removeClass('fa-filter-circle-check').addClass('fa-filter');
        }
    }
    
    // Apply filters to patient lists
    function applyFilters() {
        const $patientItems = $('.patient-item, .appointment-item'); // Adjust selector as needed
        
        $patientItems.each(function() {
            const $item = $(this);
            const status = $item.data('status'); // Assuming each item has data-status attribute
            
            if (activeFilters.length === 0 || activeFilters.includes(status)) {
                $item.fadeIn(300);
            } else {
                $item.fadeOut(300);
            }
        });
        
        // Show no results message if needed
        const visibleItems = $patientItems.filter(':visible').length;
        toggleNoResultsMessage(visibleItems === 0);
    }
    
    // Filter option change handler
    $('.filter-option').change(function() {
        const value = $(this).val();
        const isChecked = $(this).is(':checked');
        
        // Add smooth transition to the checkbox
        $(this).parent().addClass('changing');
        setTimeout(() => $(this).parent().removeClass('changing'), 200);
        
        if (isChecked) {
            activeFilters.push(value);
        } else {
            activeFilters = activeFilters.filter(filter => filter !== value);
        }
        
        updateFilterIndicator();
        updateFilterButtonState();
        applyFilters();
    });
    
    // Clear filters handler
    $('#clearFilters').click(function(e) {
        e.preventDefault();
        
        // Add animation to clear button
        $(this).addClass('clearing');
        setTimeout(() => $(this).removeClass('clearing'), 300);
        
        // Uncheck all filter options with animation
        $('.filter-option').each(function() {
            if ($(this).is(':checked')) {
                $(this).prop('checked', false)
                      .parent().addClass('clearing-item');
                setTimeout(() => $(this).parent().removeClass('clearing-item'), 200);
            }
        });
        
        initializeFilters();
        applyFilters();
    });
    
    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-menu').removeClass('show');
        }
    });
    
    // Initialize on page load
    initializeFilters();
    
    // Enhanced dropdown animations
    $('#filterBtn').on('shown.bs.dropdown', function() {
        $('.dropdown-menu').addClass('show-animate');
    });
    
    $('#filterBtn').on('hidden.bs.dropdown', function() {
        $('.dropdown-menu').removeClass('show-animate');
    });
});

// patient service tabs area
$(document).ready(function() {
  const $tabs = $('.patient_sevices_tabs button');
  const $contents = $('.tab-content');

  $tabs.on('click', function() {
    const target = $(this).data('target');

    // tab active class
    $tabs.removeClass('active');
    $(this).addClass('active');

    // smooth hide/show with fade animation
    $contents.filter('.active').fadeOut(200, function() {
      $(this).removeClass('active');
      $(target).fadeIn(300).addClass('active');
    });
  });
});

// duration table
$(document).ready(function() {
  $('.duration_table table td').on('click', function() {
    // Remove old selection
    $('.duration_table table td').removeClass('selected');

    // Add selected class to clicked cell
    $(this).addClass('selected');

    // Get selected text value (e.g., "2d")
    const selectedValue = $(this).text().trim();

    // Set the hidden input value
    $('#selectedDuration').val(selectedValue);

    console.log("Selected duration:", selectedValue);
  });
});

$(document).ready(function() {
   $('#symptomSearch').on('keyup', function() {
    var searchValue = $(this).val().toLowerCase().trim();
    var visibleCount = 0;

    $('.history_symptoms_item').each(function() {
        var match = $(this).text().toLowerCase().indexOf(searchValue) > -1;
        $(this).toggle(match);
        if (match) visibleCount++;
    });

    if (visibleCount === 0) {
        if ($('#noResultMsg').length === 0) {
            $('.history_symptoms_list_area').append('<div id="noResultMsg" class="text-muted">No results found</div>');
        }
    } else {
        $('#noResultMsg').remove();
    }
});

});

$(function () {
  const mainTable = $("#questionTable");

  // Enable sorting for main questions
  makeSortable(mainTable, "questionOrder");

  // When "Add Sub Question" clicked
  $(document).on("click", ".addSubquestion", function () {
    const parentRow = $(this).closest("tr");
    const subArea = parentRow.find(".subQuestionArea");
    const subTable = subArea.find(".subQuestionTable");

    // If hidden, show it
    if (subArea.hasClass("d-none")) {
      subArea.removeClass("d-none");
      parentRow.find(".toggleSubBtn").removeClass("d-none");
      parentRow.find(".toggleSubBtn i").addClass("fa-rotate-90");
    }

    // Create new sub-question row
    const newId = "sub-" + Date.now();
    const subRow = `
      <tr data-id="${newId}" class="subQuestionRow">
        <td style="width:40px;">
          <div class="d-flex justify-content-start align-items-center h-100">
            <button class="row_move_btn"><i class="fa-solid fa-grip-vertical"></i></button>
          </div>
        </td>
        <td>
          <div class="questionmaintain_area d-flex justify-content-between align-items-center gap-3">
            <h1 class="mb-0 subQuestionTitle">New Sub Question</h1>
            <div class="d-flex justify-content-end align-items-center gap-3">
              <button class="deleteQuestion">Delete</button>
              <button class="visible_hideBtn"><i class="fa-solid fa-eye-slash"></i></button>
            </div>
          </div>
        </td>
      </tr>`;
    subTable.append(subRow);

    // Enable sorting on this subquestion table
    makeSortable(subTable, "subOrder_" + parentRow.data("id"));
  });

  // Toggle subquestion area
  $(document).on("click", ".toggleSubBtn", function () {
    const btn = $(this);
    const area = btn.closest("tr").find(".subQuestionArea");
    area.toggleClass("d-none");
    btn.find("i").toggleClass("fa-rotate-90");
  });

  // Helper function
  function makeSortable(table, key) {
    table.sortable({
      handle: ".row_move_btn",
      placeholder: "sortable-placeholder",
      helper: "clone",
      appendTo: "body",
      cancel: "input,textarea,select,option",
      zIndex: 99999,
      start: function (e, ui) {
        ui.placeholder.height(ui.helper.outerHeight());
      },
      update: function () {
        const newOrder = [];
        table.children("tr").each(function () {
          newOrder.push($(this).attr("data-id"));
        });
        localStorage.setItem(key, JSON.stringify(newOrder));
      },
    }).disableSelection();
  }
});

// Toggle visible/hide eye icon per row
$(document).on("click", ".visible_hideBtn", function () {
    const icon = $(this).find("i");
    const row = $(this).closest("tr");

    // Toggle icon class
    if (icon.hasClass("fa-eye-slash")) {
        icon.removeClass("fa-eye-slash").addClass("fa-eye");
        row.addClass("question-hidden"); // optional for visual effect
    } else {
        icon.removeClass("fa-eye").addClass("fa-eye-slash");
        row.removeClass("question-hidden");
    }
});

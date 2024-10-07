/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active'); 

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

})(jQuery);



function addEducation() {
  const educationList = document.getElementById('education-list');
  const newEntry = document.createElement('div');
  newEntry.className = 'col-lg-12 icon-box';
  newEntry.innerHTML = `
      <h4>
          New Education Institution 
          <span class="edit-btn" onclick="editEducation(this)">✏️</span>
          <span class="delete-btn" onclick="deleteEducation(this)">❌</span>
      </h4>
      <h5><em>New Degree</em></h5>
      <span><em>Start Date - End Date</em></span><br />
      <span><em>Location</em></span><br />
  `;
  educationList.appendChild(newEntry);
}

function editEducation(element) {
  const entry = element.parentElement.parentElement;
  const institution = prompt("Enter institution name:", entry.querySelector('h4').innerText.replace('✏️', '').replace('❌', '').trim());
  const degree = prompt("Enter degree:", entry.querySelector('h5 em').innerText);
  const dates = prompt("Enter dates:", entry.querySelector('span').innerText);
  const location = prompt("Enter location:", entry.querySelectorAll('span')[1].innerText);

  if (institution) entry.querySelector('h4').innerText = institution + ' ';
  if (degree) entry.querySelector('h5 em').innerText = degree;
  if (dates) entry.querySelectorAll('span')[0].innerText = dates;
  if (location) entry.querySelectorAll('span')[1].innerText = location;
}

function deleteEducation(element) {
  const entry = element.parentElement.parentElement;
  if (confirm("Are you sure you want to delete this entry?")) {
      entry.remove();
  }
}

function addSkill() {
  const skillName = prompt("Enter the skill name:");
  const skillIcon = prompt("Enter the icon URL:");

  if (skillName && skillIcon) {
      const skillsList = document.getElementById("skills-list");
      const newSkillHTML = `
          <figure class="item" style="display: inline-block">
              <img src="${skillIcon}" alt="${skillName}" width="40" height="40" />
              <figcaption style="text-align: center">${skillName}
                  <span class="edit-btn" onclick="editSkill(this)">✏️</span>
                  <span class="delete-btn" onclick="deleteSkill(this)">❌</span>
              </figcaption>
          </figure>
          &nbsp; &nbsp;
      `;
      skillsList.insertAdjacentHTML('beforeend', newSkillHTML);
  }
}

function editSkill(element) {
  const figcaption = element.closest("figcaption");
  const skillName = figcaption.childNodes[0].textContent.trim();
  const newSkillName = prompt("Edit skill name:", skillName);
  const newIconURL = prompt("Edit icon URL:", element.previousElementSibling.src);

  if (newSkillName) {
      figcaption.childNodes[0].textContent = newSkillName;
  }
  if (newIconURL) {
      element.previousElementSibling.src = newIconURL;
  }
}

function deleteSkill(element) {
  const skillItem = element.closest("figure.item");
  skillItem.remove();
}




    document.getElementById('uploadButton').addEventListener('click', function() {
        document.getElementById('fileInput').click(); // Trigger the file input click
    });

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profilePreview').src = e.target.result; // Set the image source to the uploaded file
            };
            reader.readAsDataURL(file); // Convert the file to a data URL
        }
    });


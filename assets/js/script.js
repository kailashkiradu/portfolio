$(document).ready(function () {

  // ─────────────────────────────────────────
  // Toggle navbar menu (mobile)
  // ─────────────────────────────────────────
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  // ─────────────────────────────────────────
  // Scroll/Load Event (Scroll spy + scroll top)
  // ─────────────────────────────────────────
  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    // Show scroll-to-top button
    if (window.scrollY > 60) {
      document.querySelector('#scroll-top').classList.add('active');
    } else {
      document.querySelector('#scroll-top').classList.remove('active');
    }

    // Scroll spy
    $('section').each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr('id');

      if (top > offset && top < offset + height) {
        $('.navbar ul li a').removeClass('active');
        $('.navbar').find(`[href="#${id}"]`).addClass('active');
      }
    });
  });

  // ─────────────────────────────────────────
  // Smooth scroll
  // ─────────────────────────────────────────
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top,
    }, 500, 'linear');
  });

  // ─────────────────────────────────────────
  // EmailJS contact form submission
  // ─────────────────────────────────────────
  $("#contact-form").submit(function (event) {
    emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
    emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById("contact-form").reset();
        alert("Form Submitted Successfully");
      }, function (error) {
        console.log('FAILED...', error);
        alert("Form Submission Failed! Try Again");
      });
    event.preventDefault();
  });
});

// ─────────────────────────────────────────
// Dynamic Title & Favicon on tab change
// ─────────────────────────────────────────
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Kailash";
    $("#favicon").attr("href", "assets/images/favicon.png");
  } else {
    document.title = "Kailash's Portfolio";
    $("#favicon").attr("href", "assets/images/favicon.png");
  }
});

// ─────────────────────────────────────────
// Typed.js effect
// ─────────────────────────────────────────
var typed = new Typed(".typing-text", {
  strings: ["frontend development", "backend development", "web designing", "cloud computing", "web development", "full stack development"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});

// ─────────────────────────────────────────
// Skills & Projects loader (from JSON)
// ─────────────────────────────────────────
async function fetchData(type = "skills") {
  const response = await fetch(type === "skills" ? "skills.json" : "./projects/projects.json");
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  const skillsContainer = document.getElementById("skillsContainer");
  skillsContainer.innerHTML = skills.map(skill => `
    <div class="bar">
      <div class="info">
        <img src="${skill.icon}" alt="skill" />
        <span>${skill.name}</span>
      </div>
    </div>`).join('');
}

function showProjects(projects) {
  const projectsContainer = document.querySelector("#work .box-container");
  projectsContainer.innerHTML = projects
    .slice(0, 10)
    .filter(project => project.category !== "android")
    .map(project => `
      <div class="box tilt">
        <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
        <div class="content">
          <div class="tag">
            <h3>${project.name}</h3>
          </div>
          <div class="desc">
            <p>${project.desc}</p>
            <div class="btns">
              <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
              <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
            </div>
          </div>
        </div>
      </div>`).join('');

  VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
  srtop.reveal('.work .box', { interval: 200 });
}

fetchData().then(showSkills);
fetchData("projects").then(showProjects);

// ─────────────────────────────────────────
// ScrollReveal animations
// ─────────────────────────────────────────
const srtop = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 1000,
  reset: true
});

srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin, .home .github, .home .twitter, .home .telegram, .home .instagram, .home .dev', { interval: 300 });

srtop.reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { delay: 200 });
srtop.reveal('.skills .container, .skills .container .bar', { interval: 200 });
srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.experience .timeline, .experience .timeline .container', { interval: 400 });
srtop.reveal('.contact .container, .contact .container .form-group', { delay: 400 });

// ─────────────────────────────────────────
// Tilt.js init (for any .tilt elements)
// ─────────────────────────────────────────
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});

// ─────────────────────────────────────────
// Optional: Disable DevTools Shortcuts
// ─────────────────────────────────────────
document.onkeydown = function (e) {
  if (
    e.keyCode === 123 || // F12
    (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) || // Ctrl+Shift+I/C/J
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) // Ctrl+U
  ) {
    return false;
  }
};

// ─────────────────────────────────────────
// Live Chat Widget (Tawk.to)
// ─────────────────────────────────────────
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();

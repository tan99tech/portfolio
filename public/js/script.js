$(document).ready(function () {

  $('#menu').click(function () {
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });


  // smooth scrolling
  $('a[href*="#"]').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top,
      }, 500, 'linear')
  });

  // <!-- emailjs to mail contact form data -->
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
  // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
  function () {
      if (document.visibilityState === "visible") {
          document.title = "Portfolio | Tan Truong";
          $("#favicon").attr("href", "assets/images/favicon.png");
      }
      else {
          document.title = "My Portfolio";
          $("#favicon").attr("href", "assets/images/favhand.png");
      }
  });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: ["backend development", "cloud development", "database development", "system optimization"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach(skill => {
      skillHTML += `
      <div class="bar">
            <div class="info">
              <img src=${skill.icon} alt="skill" />
              <span>${skill.name}</span>
            </div>
          </div>`
  });
  skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
      projectHTML += `
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
  </div>`
  });
  projectsContainer.innerHTML = projectHTML;

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 15,
  });
  // <!-- tilt js effect ends -->

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 1000,
      reset: true
  });

  /* SCROLL PROJECTS */
  srtop.reveal('.work .box', { interval: 200 });

}
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
      return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
      return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
      return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
      return false;
  }
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
      return false;
  }
}

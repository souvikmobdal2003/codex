document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Script loaded successfully");

  // 1. Offcanvas menu scroll + close
  try {
    const navLinks = document.querySelectorAll(".close-offcanvas");
    const offcanvasNavbar = document.getElementById("offcanvasNavbar");

    navLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (targetSection && offcanvasNavbar) {
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasNavbar);
          if (offcanvas) offcanvas.hide();
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      });
    });
  } catch (e) {
    console.warn("Offcanvas scroll issue:", e);
  }

  // 2. Typing animation
  try {
    const texts = ["Full-Stack Developer", "Digital Marketer", "UI/UX Designer"];
    let textIndex = 0;
    let charIndex = 0;

    function typeEffect() {
      const skillElement = document.getElementById("skill");
      if (!skillElement) return;

      const currentText = texts[textIndex];
      if (charIndex < currentText.length) {
        skillElement.innerHTML += currentText.charAt(charIndex);
        charIndex++;
        const delay = /[aeiouAEIOU]/.test(currentText.charAt(charIndex - 1)) ? 150 : 90;
        setTimeout(typeEffect, delay);
      } else {
        setTimeout(deleteEffect, 1800);
      }
    }

    function deleteEffect() {
      const skillElement = document.getElementById("skill");
      const currentText = texts[textIndex];
      if (charIndex > 0) {
        skillElement.innerHTML = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteEffect, 60);
      } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 400);
      }
    }

    typeEffect();
  } catch (e) {
    console.warn("Typing animation issue:", e);
  }

  // 3. Show/Hide More Projects
  try {
    const showMoreBtn = document.querySelector(".btn_show");
    const hiddenProjects = document.querySelectorAll(".content:nth-child(n+5)");
    let isExpanded = false;

    if (showMoreBtn) {
      showMoreBtn.addEventListener("click", function (e) {
        e.preventDefault();
        hiddenProjects.forEach(project => {
          project.style.display = isExpanded ? "none" : "block";
        });
        showMoreBtn.innerHTML = isExpanded ? "Want to Show More ?" : "Show Less";
        isExpanded = !isExpanded;
      });
    }
  } catch (e) {
    console.warn("Project toggle issue:", e);
  }

  // 4. Animate content on load
  try {
    const contents = document.querySelectorAll(".content");
    contents.forEach((content, index) => {
      setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      }, index * 300);
    });
  } catch (e) {
    console.warn("Project fade animation issue:", e);
  }




  // 6. WhatsApp Message
  window.sendWhatsAppMessage = function () {
    try {
      const message = document.getElementById("whatsappMessage").value.trim();
      if (message) {
        const phoneNumber = "917362949785";
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
        const modal = new bootstrap.Modal(document.getElementById("thankYouModal"));
        modal.show();
      } else {
        alert("Please enter a message to send!");
      }
    } catch (e) {
      console.warn("WhatsApp send error:", e);
    }
  };

  // 7. Greeting Message
  try {
    const hours = new Date().getHours();
    const greeting = hours < 12 ? "Good Morning!" : hours < 18 ? "Good Afternoon!" : "Good Evening!";
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) greetingEl.innerText = greeting;
  } catch (e) {
    console.warn("Greeting error:", e);
  }

 // EmailJS init with your public key
  emailjs.init("OXDPxM_Nr4D5SVynm");

  // Copy email function
  function copyEmail() {
    const emailText = "mondaksouvik289@gmail.com";
    navigator.clipboard.writeText(emailText);
    alert("Email copied: " + emailText);
  }
  

  // Form submission handler
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const user_name = document.getElementById("user_name").value.trim();
    const user_email = document.getElementById("user_email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!user_name || !user_email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    const templateParams = {
      user_name: user_name,
      user_email: user_email,
      message: message,
    };

    emailjs.send("service_5o3ze74", "template_5nypd64", templateParams)
      .then(function () {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
      }, function (error) {
        console.error("FAILED...", error);
        alert("Failed to send message. Please try again later.");
      });
  });

  // 9. Experience Section Intersection Animation
  try {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));
  } catch (e) {
    console.warn("Observer animation issue:", e);
  }
});
//feedback logic
function rateStar(value) {
  document.getElementById('rating').value = value;
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    star.style.color = index < value ? 'orange' : 'gray';
  });
}

function validateForm(event) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();  // ✅ Added this
  const rating = document.getElementById("rating").value.trim();
  const comments = document.getElementById("comments").value.trim();

  if (!name || !email || !rating || !comments) {
    alert("Please fill in all fields.");
    event.preventDefault();
    return false;
  }

  return true;
}

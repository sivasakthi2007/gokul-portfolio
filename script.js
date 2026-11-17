/* ==========================================================================
   PORTFOLIO JAVASCRIPT - Gokul Bharani G
   Vanilla JavaScript (No external libraries or frameworks)
   
   Functions included:
   1. Mobile Navigation Menu Toggle
   2. Active Navigation Link Highlighting on Scroll
   3. Dynamic Current Year in Footer
   4. Contact Form Validation and Submission Feedback
   ========================================================================== */

// The 'DOMContentLoaded' event fires when the initial HTML document has been 
// completely parsed, ensuring all DOM elements exist before running scripts.
document.addEventListener("DOMContentLoaded", function () {

  // ------------------------------------------------------------------------
  // 1. DYNAMIC CURRENT YEAR
  // ------------------------------------------------------------------------
  // Get the current year using JavaScript's Date object and update the footer
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }

  // ------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU TOGGLE
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu visibility when clicking hamburger button
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
      
      // Accessibility: update aria-expanded attribute
      const isExpanded = navMenu.classList.contains("show");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Close mobile menu whenever any navigation link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navMenu.classList.contains("show")) {
          navMenu.classList.remove("show");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close mobile menu when clicking anywhere outside the navbar
    document.addEventListener("click", function (event) {
      const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
      if (!isClickInside && navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. ACTIVE NAVIGATION LINK ON SCROLL
  // ------------------------------------------------------------------------
  // Highlights the link in the navbar corresponding to the section on screen
  const sections = document.querySelectorAll("section[id]");

  function highlightNavOnScroll() {
    const scrollPosition = window.pageYOffset + 140; // Offset for fixed navbar

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Listen to window scroll event
  window.addEventListener("scroll", highlightNavOnScroll);
  // Run once on load to set initial active section
  highlightNavOnScroll();

  // ------------------------------------------------------------------------
  // 4. CONTACT FORM VALIDATION & SUBMISSION
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  // Form input fields
  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const subjectInput = document.getElementById("userSubject");
  const messageInput = document.getElementById("userMessage");

  // Error message display spans
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  // Helper function to validate email using Regular Expression (RegEx)
  function isValidEmail(email) {
    // Simple email regex pattern checking for [characters]@[characters].[domain]
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  // Helper function to clear previous error messages
  function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";

    nameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    subjectInput.classList.remove("input-error");
    messageInput.classList.remove("input-error");
  }

  // Form submit event handler
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // Prevent browser default form submission (page reload)
      event.preventDefault();

      // Clear previous error messages
      clearErrors();

      let isValid = true;

      // 1. Validate Full Name (Required, at least 2 characters)
      if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Please enter your full name (at least 2 characters).";
        nameInput.classList.add("input-error");
        isValid = false;
      }

      // 2. Validate Email Address (Required, valid email format)
      if (emailInput.value.trim() === "") {
        emailError.textContent = "Please enter your email address.";
        emailInput.classList.add("input-error");
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address (e.g., user@example.com).";
        emailInput.classList.add("input-error");
        isValid = false;
      }

      // 3. Validate Subject (Required, at least 3 characters)
      if (subjectInput.value.trim().length < 3) {
        subjectError.textContent = "Please enter a subject (at least 3 characters).";
        subjectInput.classList.add("input-error");
        isValid = false;
      }

      // 4. Validate Message (Required, at least 10 characters)
      if (messageInput.value.trim().length < 10) {
        messageError.textContent = "Please write a message with at least 10 characters.";
        messageInput.classList.add("input-error");
        isValid = false;
      }

      // If all validation checks pass:
      if (isValid) {
        // Display positive confirmation message to the user
        const userName = nameInput.value.trim();
        formFeedback.style.display = "block";
        formFeedback.style.backgroundColor = "#eaeaea";
        formFeedback.style.borderColor = "#000000";
        formFeedback.style.color = "#000000";
        formFeedback.innerHTML = `
          <strong>Message Sent Successfully!</strong><br>
          Thank you, <em>${escapeHtml(userName)}</em>. Gokul Bharani G has received your message and will respond soon.
        `;

        // Reset the form input fields
        contactForm.reset();

        // Scroll smoothly to the feedback message
        formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });

        // Hide the feedback message after 8 seconds
        setTimeout(function () {
          formFeedback.style.display = "none";
        }, 8000);
      }
    });

    // Clear individual field errors dynamically as the user types
    nameInput.addEventListener("input", function () {
      if (nameInput.value.trim().length >= 2) {
        nameError.textContent = "";
        nameInput.classList.remove("input-error");
      }
    });

    emailInput.addEventListener("input", function () {
      if (isValidEmail(emailInput.value)) {
        emailError.textContent = "";
        emailInput.classList.remove("input-error");
      }
    });

    subjectInput.addEventListener("input", function () {
      if (subjectInput.value.trim().length >= 3) {
        subjectError.textContent = "";
        subjectInput.classList.remove("input-error");
      }
    });

    messageInput.addEventListener("input", function () {
      if (messageInput.value.trim().length >= 10) {
        messageError.textContent = "";
        messageInput.classList.remove("input-error");
      }
    });
  }

  // Security helper: Escape HTML to prevent basic XSS when rendering user name
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

});


// Smooth scroll and active nav
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header && window.scrollY > 100) {
        header.classList.add('scrolled');
    } else if (header) {
        header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        // Exclude the contact button from active state management
        if (!link.classList.contains('c-btn')) {
            link.classList.remove('active');
            // Only add active class if current section is not contact
            if (link.getAttribute('href') === `#${current}` && current !== 'contact') {
                link.classList.add('active');
            }
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// See More Projects functionality
const seeMoreBtn = document.getElementById('seeMoreBtn');
const moreProjects = document.querySelectorAll('.more-project');

if (moreProjects.length > 0 && seeMoreBtn) {
    seeMoreBtn.style.display = 'block';
}

if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', function() {
        const isExpanded = this.classList.contains('expanded');
        
        if (!isExpanded) {
            // Show all more projects
            moreProjects.forEach(project => {
                project.classList.add('show');
            });
            this.innerHTML = 'Show Less <i class="fa-solid fa-chevron-down"></i>';
            this.classList.add('expanded');
        } else {
            // Hide all projects again
            moreProjects.forEach(project => {
                project.classList.remove('show');
            });
            this.innerHTML = 'See More Projects <i class="fa-solid fa-chevron-down"></i>';
            this.classList.remove('expanded');
            
            // Scroll back to projects section
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.box-skills, .project-card, .list').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Handling contact form submission
const url =
  'https://script.google.com/macros/s/AKfycbzta3bltFi4sgWAGA7Y0f1oHdZnVDsTqzijLz0ZWBjsIVJgUmEiQOj7OpU-Z5C8-0qa/exec';

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const submitBtn = contactForm.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const loader = submitBtn.querySelector('.loader');
  
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Show loader and hide button text
    btnText.style.display = 'none';
    loader.style.display = 'inline-block';
    submitBtn.disabled = true;

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Successful', data);
        // Hide loader and restore button
        loader.style.display = 'none';
        btnText.style.display = 'inline-block';
        submitBtn.disabled = false;
        alert('Message sent successfully!');
        this.reset();
      })
      .catch((err) => {
        console.log('err', err);
        // Hide loader and restore button
        loader.style.display = 'none';
        btnText.style.display = 'inline-block';
        submitBtn.disabled = false;
        alert('Failed to send message. Please try again.');
      });
  });
}
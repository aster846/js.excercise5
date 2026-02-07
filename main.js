// === 1. NAVBAR VISIBILITY LOGIC ===
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
const navLoginLink = document.getElementById('navLoginLink');
const logoutBtn = document.getElementById('logoutBtn');

function updateNavbar() {
    // Check if the user is a real logged-in user
    if (sessionStorage.getItem('loggedIn')) {
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (navLoginLink) navLoginLink.style.display = 'none';
    } else {
        // If Guest or New Visitor, show Login
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (navLoginLink) navLoginLink.style.display = 'block';
    }
}
updateNavbar();

// === 2. LOGIN PAGE LOGIC (login.html) ===
const wrapper = document.querySelector('.wrapper');

if (wrapper) {
    const signUpBtnLink = document.querySelector('.signUpBtn-link');
    const signInBtnLink = document.querySelector('.signInBtn-link');
    
    // Select the specific buttons for the two different forms
    const loginSubmitBtn = document.querySelector('.form-wrapper.sign-in button');
    const signupSubmitBtn = document.querySelector('.form-wrapper.sign-up button');

    // Toggle between Login and Sign Up forms
    if(signUpBtnLink) {
        signUpBtnLink.addEventListener('click', () => {
            wrapper.classList.add('active');
        });
    }
    if(signInBtnLink) {
        signInBtnLink.addEventListener('click', () => {
            wrapper.classList.remove('active');
        });
    }

    // FIX: Set loggedIn status when clicking Login button
    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', () => {
            sessionStorage.setItem('loggedIn', 'true');
        });
    }

    // FIX: Set loggedIn status when clicking Sign Up button
    if (signupSubmitBtn) {
        signupSubmitBtn.addEventListener('click', () => {
            sessionStorage.setItem('loggedIn', 'true');
        });
    }
}

// === 3. GUEST POPUP LOGIC (index.html) ===
const guestOverlay = document.getElementById('guestOverlay');
const guestBtn = document.getElementById('guestBtn');
const loginBtn = document.getElementById('loginBtn');

if (guestOverlay) {
    // --- ADDED START ---
    // This function ensures that on every page load (Home or Product), 
    // it checks if the user already clicked "Guest"
    const isGuest = sessionStorage.getItem('guestUser');
    const isLoggedIn = sessionStorage.getItem('loggedIn');

    if (isGuest === 'true' || isLoggedIn === 'true') {
        guestOverlay.style.display = 'none';
    } else {
        guestOverlay.style.display = 'flex'; // Show it if they are new
    }
    // Hide popup if they are a Guest OR Logged In
    if (sessionStorage.getItem('guestUser') || sessionStorage.getItem('loggedIn')) {
        guestOverlay.style.display = 'none';
    }

    guestBtn.addEventListener('click', () => {
        alert("You are now browsing as a Guest!");
        sessionStorage.setItem('guestUser', 'true'); // Hide popup but NO logout
        guestOverlay.style.display = 'none';
        updateNavbar(); 
    });

    loginBtn.addEventListener('click', () => {
        alert("Redirecting to the Login page...");
        window.location.href = 'login.html';
    });
}

// === 4. LOGOUT LOGIC ===
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('guestUser'); // Clear everything
        alert("Logged out successfully!");
        window.location.reload();
    });
}


// --- Authentication & Page Protection ---

const API_BASE_URL = '/api/auth'; // Adjust if your backend API route is different

// Function to check if the user is logged in (using localStorage for simplicity)
function isLoggedIn() {
    // In a real app, you'd check for a valid session token, possibly validating it with the backend
    return localStorage.getItem('userLoggedIn') === 'true';
}

// Function to redirect to login if necessary
function protectPage() {
    const publicPages = ['/', '/index.html', '/contact.html', '/login.html', '/signup.html']; // Add '/' for the root path
    // Ensure paths are checked correctly, especially for the root
    let currentPath = window.location.pathname.toLowerCase();
    if (currentPath === '' || currentPath === '/') {
        currentPath = '/index.html'; // Treat root as index.html for comparison
    }
    const isPublicPage = publicPages.some(page => currentPath.endsWith(page));

    // console.log(`Current Path: ${currentPath}, Is Public: ${isPublicPage}, Logged In: ${isLoggedIn()}`); // Debugging

    if (!isPublicPage && !isLoggedIn()) {
        // console.log('Redirecting to login...'); // Debugging
        window.location.href = 'login.html'; // Redirect to login page
    }
}

// Function to handle email/password login
async function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const messageElement = document.getElementById('login-message');

    if (!emailInput || !passwordInput || !messageElement) {
        console.error('Login form elements not found!');
        return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;
    messageElement.textContent = ''; // Clear previous messages

    try {
        // **Placeholder:** Replace with actual API call to your backend
        console.log(`Attempting login for: ${email}`);
        // Example API call structure:
        // const response = await fetch(`${API_BASE_URL}/login`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password }),
        // });
        // const data = await response.json();

        // Mock success/failure for demonstration:
        const mockLoginSuccess = (email === 'user@example.com' && password === 'password'); // Simple mock check

        // if (response.ok && data.success) { // Check backend response
        if (mockLoginSuccess) { // Use mock check
            messageElement.textContent = 'Login successful! Redirecting...';
            messageElement.style.color = 'green';
            localStorage.setItem('userLoggedIn', 'true'); // Mark user as logged in
            localStorage.setItem('userEmail', email); // Store email (optional)
            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // messageElement.textContent = data.message || 'Login failed. Please check your credentials.';
            messageElement.textContent = 'Login failed. Use user@example.com / password for demo.'; // Mock failure message
            messageElement.style.color = 'red';
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userEmail');
        }
    } catch (error) {
        console.error('Login error:', error);
        messageElement.textContent = 'An error occurred during login. Please try again.';
        messageElement.style.color = 'red';
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userEmail');
    }
}

// Function to handle social login clicks
function handleSocialLogin(provider) {
    // In a real app, this would redirect to the backend endpoint which then initiates the OAuth flow
    console.log(`Initiating login with ${provider}...`);
    alert(`Social login with ${provider} requires backend setup and is not yet implemented.`);
    // Example backend redirect: window.location.href = `${API_BASE_URL}/social/${provider}`;
    // The backend handles the OAuth dance (redirect to provider, handle callback, create/login user, set token/session)
    // and redirects the user back to the frontend (e.g., index.html).
}

// Function to handle logout
function handleLogout() {
    // **Placeholder:** Add API call to backend to invalidate session/token if necessary
    // fetch(`${API_BASE_URL}/logout`, { method: 'POST' }); // Example
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    // localStorage.removeItem('userName'); // If you store username
    console.log('User logged out.');
    updateNav(); // Update nav immediately
    // Redirect to home page after logout
    window.location.href = 'index.html';
}

// Function to update navigation based on login status
function updateNav() {
    const navUl = document.querySelector('header nav ul');
    if (!navUl) return;

    // Find existing auth links (more robustly)
    const existingLoginLink = navUl.querySelector('a[href="login.html"]');
    const existingSignupLink = navUl.querySelector('a[href="signup.html"]');
    const existingLogoutLink = navUl.querySelector('.auth-logout-link'); // Use a specific class for logout

    // Remove existing auth links before adding new ones
    if (existingLoginLink) existingLoginLink.parentElement.remove();
    if (existingSignupLink) existingSignupLink.parentElement.remove();
    if (existingLogoutLink) existingLogoutLink.parentElement.remove();

    if (isLoggedIn()) {
        // User is logged in - Show Logout
        const userEmail = localStorage.getItem('userEmail') || 'User'; // Get stored email or default
        const logoutLi = document.createElement('li');
        const logoutLink = document.createElement('a');
        logoutLink.href = '#'; // Prevent navigation
        logoutLink.textContent = `Logout (${userEmail})`;
        logoutLink.onclick = handleLogout; // Add click handler
        logoutLink.classList.add('auth-logout-link'); // Add specific class
        logoutLi.appendChild(logoutLink);
        navUl.appendChild(logoutLi); // Append to the end

    } else {
        // User is not logged in - Show Login/Sign Up
        const loginLi = document.createElement('li');
        loginLi.innerHTML = '<a href="login.html">Login</a>';
        navUl.appendChild(loginLi); // Append to the end

        const signupLi = document.createElement('li');
        signupLi.innerHTML = '<a href="signup.html">Sign Up</a>';
        navUl.appendChild(signupLi); // Append to the end
    }
}


// --- Initialization ---

// Run page protection check immediately on script load (before DOM is ready)
protectPage();

// Add event listeners and run initial setup after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- Authentication Related Setup ---
    // Add Login Form Listener if on the login page
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Update navigation bar based on current login status
    updateNav();

    // --- Original Functionality ---

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    // Re-select navUl inside DOMContentLoaded to ensure it's found
    const navUl = document.querySelector('header nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });
    }

    // Close mobile menu when a non-auth link is clicked
    if (navUl) {
        const navLinks = navUl.querySelectorAll('a');
        navLinks.forEach(link => {
            // Add check to ensure it's not the logout link
            if (!link.classList.contains('auth-logout-link')) {
                link.addEventListener('click', () => {
                    if (navUl.classList.contains('active')) {
                        navUl.classList.remove('active');
                    }
                });
            }
        });
    }

    // Verse of the Day Fetcher (Placeholder)
    const verseTextElement = document.getElementById('verse-text');
    const verseRefElement = document.getElementById('verse-ref');

    function fetchVerseOfTheDay() {
        if (verseTextElement && verseRefElement) {
            // Using a placeholder:
            const verses = [
                { text: "Trust in the LORD with all your heart and lean not on your own understanding;", ref: "Proverbs 3:5" },
                { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16" },
                { text: "The LORD is my shepherd, I lack nothing.", ref: "Psalm 23:1" },
                { text: "I can do all this through him who gives me strength.", ref: "Philippians 4:13" }
            ];
            const randomVerse = verses[Math.floor(Math.random() * verses.length)];

            verseTextElement.textContent = `"${randomVerse.text}"`;
            verseRefElement.textContent = randomVerse.ref;
        }
    }
    // Fetch verse only if the elements exist on the current page
    if (verseTextElement && verseRefElement) {
        fetchVerseOfTheDay();
    }


    // Newsletter Form Submission (Placeholder)
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}!`); // Replace with actual submission logic
                emailInput.value = ''; // Clear the input
            }
        });
    }

    // Add smooth scrolling for anchor links (optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Ensure it's not the logout link
        if (!anchor.classList.contains('auth-logout-link')) {
            anchor.addEventListener('click', function (e) {
                // Check if it's a valid anchor target
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    try {
                        const targetElement = document.querySelector(targetId);
                        if(targetElement) {
                            targetElement.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }
                    } catch (error) {
                        console.warn(`Smooth scroll target not found or invalid selector: ${targetId}`);
                    }
                }
            });
        }
    });

    // --- Discussion Forum Logic (Runs only if #discussion-forum exists on the page) ---

    const discussionForum = document.getElementById('discussion-forum');
    if (discussionForum) {
        const newPostArea = document.getElementById('new-post-area');
        const loginPrompt = document.getElementById('login-prompt-discussion');
        const newPostForm = document.getElementById('new-post-form');
        const postMessage = document.getElementById('post-message');
        const postsList = document.getElementById('posts-list');

        // Function to check if user is admin (placeholder)
        function isAdmin() {
            // In real app, check user role from token or backend session
            // Mock check: assumes 'admin@example.com' is the admin
            return isLoggedIn() && localStorage.getItem('userEmail') === 'admin@example.com';
        }

        // Show/Hide New Post Form based on login status
        if (isLoggedIn()) {
            if (newPostArea) newPostArea.style.display = 'block';
            if (loginPrompt) loginPrompt.style.display = 'none';
        } else {
            if (newPostArea) newPostArea.style.display = 'none';
            if (loginPrompt) loginPrompt.style.display = 'block';
        }

        // Handle New Post Submission (Placeholder)
        if (newPostForm) {
            newPostForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const contentElement = document.getElementById('post-content');
                if (!contentElement) return;
                const content = contentElement.value;
                if (postMessage) postMessage.textContent = '';

                if (!content.trim()) {
                    if (postMessage) {
                        postMessage.textContent = 'Post content cannot be empty.';
                        postMessage.style.color = 'red';
                    }
                    return;
                }

                console.log('Submitting new post:', content);
                // **Placeholder:** Replace with API call to backend to save the post
                // const response = await fetch('/api/discussion/posts', { method: 'POST', headers:{...}, body: JSON.stringify({content}) });
                // const data = await response.json();
                // if (response.ok) { ... }
                if (postMessage) {
                    postMessage.textContent = 'Post submitted successfully! (Placeholder)';
                    postMessage.style.color = 'green';
                    contentElement.value = ''; // Clear textarea
                    // Ideally, fetch and refresh the posts list here
                    // loadPosts(); // You'd call a function to reload posts
                }
                setTimeout(() => { if (postMessage) postMessage.textContent = ''; }, 3000);
            });
        }

        // Add event listeners for actions within the posts list
        if (postsList) {
            postsList.addEventListener('click', async (e) => {
                // Toggle Comments Section visibility
                if (e.target.classList.contains('comment-link')) {
                    e.preventDefault();
                    const postElement = e.target.closest('.discussion-post');
                    if (postElement) {
                        const commentsSection = postElement.querySelector('.comments-section');
                        if (commentsSection) {
                            commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
                            // If showing, maybe load comments dynamically here
                        }
                    }
                }

                // Handle New Comment Submission (Placeholder)
                const commentForm = e.target.closest('.new-comment-form');
                if (commentForm && e.target.tagName === 'BUTTON') {
                    e.preventDefault();
                    const textarea = commentForm.querySelector('textarea');
                    const postElement = commentForm.closest('.discussion-post');
                    const postId = postElement ? postElement.dataset.postId : null; // Get post ID from data attribute

                    if (textarea && textarea.value.trim() && postId) {
                        const commentContent = textarea.value.trim();
                        console.log(`Submitting comment for post ${postId}:`, commentContent);
                        // **Placeholder:** API call to save comment
                        // const response = await fetch(`/api/discussion/posts/${postId}/comments`, { method: 'POST', ... });
                        alert('Comment submitted! (Placeholder)');
                        textarea.value = '';
                        // Ideally, refresh comments for this post
                    } else if (!isLoggedIn()) {
                         alert('Please login to comment.');
                    }
                }

                // Handle Admin Delete (Placeholder)
                if (e.target.classList.contains('delete-post')) {
                    if (isAdmin() && confirm('Are you sure you want to delete this post?')) {
                        const postElement = e.target.closest('.discussion-post');
                        const postId = postElement ? postElement.dataset.postId : null;
                        if (postId) {
                            console.log(`Admin deleting post ${postId}`);
                            // **Placeholder:** API call to delete post
                            // await fetch(`/api/discussion/posts/${postId}`, { method: 'DELETE', ... });
                            alert('Post deleted! (Placeholder)');
                            postElement.remove(); // Remove from UI
                        }
                    } else if (!isAdmin()) {
                        alert('Admin action required.');
                    }
                }

                 // Handle Admin Hide/Unhide (Placeholder)
                if (e.target.classList.contains('hide-post')) {
                     if (isAdmin()) {
                        const postElement = e.target.closest('.discussion-post');
                        const postId = postElement ? postElement.dataset.postId : null;
                        if (postId) {
                            console.log(`Admin hiding/unhiding post ${postId}`);
                            // **Placeholder:** API call to toggle post visibility
                            // await fetch(`/api/discussion/posts/${postId}/visibility`, { method: 'PUT', ... });
                            const isHidden = postElement.style.opacity === '0.5';
                            postElement.style.opacity = isHidden ? '1' : '0.5';
                            e.target.textContent = isHidden ? 'Hide' : 'Unhide';
                            alert(`Post ${isHidden ? 'unhidden' : 'hidden'}! (Placeholder)`);
                        }
                     } else {
                         alert('Admin action required.');
                     }
                }
            });
        }

        // Function to load posts (Placeholder) - Call this on page load and after new post
        function loadPosts() {
             console.log("Loading posts for Bible Study page...");
             // **Placeholder:** Fetch posts from backend API specific to this context if needed
             // const response = await fetch('/api/discussion/posts?context=bible-study');
             // const posts = await response.json();
             // Clear current list (optional, depends on how you load)
             // postsList.innerHTML = '<h4>Recent Topics</h4>';
             // posts.forEach(post => renderPost(post)); // Need renderPost function

             // For now, just ensure admin buttons are shown/hidden on existing placeholders
             if (isAdmin()) {
                discussionForum.querySelectorAll('.admin-action').forEach(btn => btn.style.display = 'inline-block');
             } else {
                discussionForum.querySelectorAll('.admin-action').forEach(btn => btn.style.display = 'none');
             }
        }

        // Function to render a single post (Placeholder)
        // function renderPost(postData) {
            // Create HTML elements for the post, comments, etc. using postData
            // const postDiv = document.createElement('div');
            // postDiv.classList.add('discussion-post');
            // postDiv.dataset.postId = postData.id;
            // ... add content, author, date, actions ...
            // Make sure to add admin buttons conditionally based on isAdmin()
            // Append to postsList
        // }

        // Initial load/setup for discussion forum on this page
        loadPosts();

    } // End if (discussionForum)

}); // End DOMContentLoaded

// Make social login function globally accessible as it's called directly from HTML onclick
window.handleSocialLogin = handleSocialLogin;

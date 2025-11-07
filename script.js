// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("xwy_WeyaGluzCgo4v");
})();

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[name="user_name"]').value;
        const email = contactForm.querySelector('input[name="user_email"]').value;
        const subject = contactForm.querySelector('input[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Update button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Format the message with all form data
            const formattedMessage = `From: ${email}\nName: ${name}\nSubject: ${subject}\nEmail:\n${message}`;
            
            // Send email using EmailJS
            await emailjs.send(
                'service_972ozdr',
                'template_bl3p14s',
                {
                    from_name: name,
                    from_email: email,
                    reply_to: email,
                    subject: subject,
                    message: formattedMessage,
                    user_name: name,
                    user_email: email
                },
                'xwy_WeyaGluzCgo4v'
            );
            
            // Success message
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        } catch (error) {
            // Error handling
            console.error('Error sending email:', error);
            alert('Sorry, there was an error sending your message. Please try again or contact me directly at akoushik@ualberta.ca');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .contact-info, .contact-form');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Uncomment the line below to enable typing animation
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards hover effect - handled by CSS now
// Keeping this section for potential future enhancements

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
    backToTopBtn.style.background = '#1d4ed8';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
    backToTopBtn.style.background = '#2563eb';
});

// Project Modal Functionality - Variables will be initialized in DOMContentLoaded
let projectModal, modalClose, modalTitle, modalLoading, modalError, modalReadme, modalOverlay;

// Configure marked.js for GitHub Flavored Markdown
// This will be called when marked is available
function configureMarked() {
    if (typeof marked === 'undefined') {
        return;
    }
    
    try {
        // Marked v4+ uses marked.use()
        if (typeof marked.use === 'function') {
            marked.use({
                breaks: true,
                gfm: true
            });
        } 
        // Marked v3 uses marked.setOptions()
        else if (typeof marked.setOptions === 'function') {
            marked.setOptions({
                breaks: true,
                gfm: true,
                headerIds: true,
                mangle: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            });
        }
    } catch (error) {
        console.warn('Could not configure marked.js:', error);
    }
}

// Try to configure when script loads (marked might already be loaded)
configureMarked();

// Also try when DOM is ready (in case marked loads after this script)
document.addEventListener('DOMContentLoaded', configureMarked);

// Function to extract repository info from GitHub URL
function extractRepoInfo(githubUrl) {
    try {
        const url = new URL(githubUrl);
        const pathParts = url.pathname.split('/').filter(part => part);
        
        if (pathParts.length >= 2) {
            return {
                owner: pathParts[0],
                repo: pathParts[1]
            };
        }
        return null;
    } catch (error) {
        console.error('Error parsing GitHub URL:', error);
        return null;
    }
}

// Function to fetch README from GitHub
async function fetchReadme(owner, repo) {
    try {
        // Fetch README using GitHub API
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('README not found in repository');
            }
            throw new Error(`Failed to fetch README: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Decode base64 content with proper UTF-8 handling
        // Remove whitespace before decoding
        const base64Content = data.content.replace(/\s/g, '');
        
        // Decode base64 to binary string
        const binaryString = atob(base64Content);
        
        // Convert binary string to UTF-8 string properly
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Use TextDecoder to properly decode UTF-8
        const decoder = new TextDecoder('utf-8');
        const content = decoder.decode(bytes);
        
        return content;
    } catch (error) {
        console.error('Error fetching README:', error);
        throw error;
    }
}

// Function to open modal and load README
async function openProjectModal(projectCard, event) {
    if (!projectModal || !modalLoading || !modalError || !modalReadme || !modalTitle) {
        console.error('Modal elements not initialized');
        return;
    }

    // Get the GitHub link from the project card
    const githubLink = projectCard.querySelector('.project-links a[href*="github.com"]');
    
    if (!githubLink) {
        console.error('No GitHub link found in project card');
        return;
    }

    const githubUrl = githubLink.href;
    const repoInfo = extractRepoInfo(githubUrl);

    if (!repoInfo) {
        showError('Invalid GitHub repository URL');
        return;
    }

    // Get project title
    const projectTitle = projectCard.querySelector('.project-content h3')?.textContent || 'Project README';
    modalTitle.textContent = projectTitle;

    // Get card position and size for animation
    const cardRect = projectCard.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;

    // Calculate modal final position (center of screen)
    const modalWidth = Math.min(900, window.innerWidth * 0.9);
    const modalHeight = Math.min(window.innerHeight * 0.9, 800);
    const modalCenterX = window.innerWidth / 2;
    const modalCenterY = window.innerHeight / 2;

    // Set initial transform origin and position for animation
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        // Calculate scale factors
        const scaleX = cardWidth / modalWidth;
        const scaleY = cardHeight / modalHeight;
        const initialScale = Math.max(scaleX, scaleY);
        
        // Set initial position (centered on card)
        const translateX = cardCenterX - modalCenterX;
        const translateY = cardCenterY - modalCenterY;
        
        // Apply initial transform
        modalContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${initialScale})`;
        modalContainer.style.transformOrigin = 'center center';
        modalContainer.style.opacity = '0';
    }

    // Get current transform state from computed styles (includes CSS hover)
    const computedStyle = window.getComputedStyle(projectCard);
    const currentTransform = computedStyle.transform;
    
    // Prevent card from moving during animation
    projectCard.style.transition = 'none';
    projectCard.style.pointerEvents = 'none';
    
    // Lock card at its current visual position (from CSS hover or normal)
    // The computed transform will already reflect the hover state from CSS
    if (currentTransform !== 'none' && currentTransform !== 'matrix(1, 0, 0, 1, 0, 0)') {
        // Card is transformed (hovered), preserve that exact transform
        projectCard.style.transform = currentTransform;
    } else {
        // Card is at normal position, keep it there
        projectCard.style.transform = 'translateY(0)';
    }

    // Show modal (but keep it invisible initially)
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset modal state
    modalLoading.style.display = 'flex';
    modalError.style.display = 'none';
    modalReadme.style.display = 'none';

    // Start animation immediately in next frame
    requestAnimationFrame(() => {
        const modalContainer = document.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease';
            modalContainer.style.transform = 'translate(0, 0) scale(1)';
            modalContainer.style.opacity = '1';
        }
    });

    try {
        // Fetch README
        const readmeContent = await fetchReadme(repoInfo.owner, repoInfo.repo);
        
        // Render markdown
        if (typeof marked !== 'undefined') {
            try {
                // Ensure marked is configured
                configureMarked();
                
                // Convert emoji codes BEFORE markdown parsing (but preserve code blocks)
                let processedContent = convertEmojisInMarkdown(readmeContent);
                
                // Parse markdown to HTML
                let html;
                if (typeof marked.parse === 'function') {
                    html = marked.parse(processedContent);
                } else if (typeof marked === 'function') {
                    // Older API - marked is a function
                    html = marked(processedContent);
                } else {
                    throw new Error('Marked library not properly loaded');
                }
                
                // Sanitize HTML if DOMPurify is available
                if (typeof DOMPurify !== 'undefined') {
                    html = DOMPurify.sanitize(html, {
                        ADD_TAGS: ['iframe'],
                        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
                        ALLOW_DATA_ATTR: true
                    });
                }
                
                // Set the HTML content
                modalReadme.innerHTML = html;
                
                // Process relative image URLs to absolute GitHub URLs
                processImageUrls(modalReadme, repoInfo.owner, repoInfo.repo);
                
                // Force reflow to ensure proper rendering
                modalReadme.offsetHeight;
            } catch (parseError) {
                console.error('Error parsing markdown:', parseError);
                console.error('Error details:', parseError.stack);
                // Fallback to plain text if parsing fails
                modalReadme.innerHTML = '<pre style="white-space: pre-wrap; word-wrap: break-word;">' + escapeHtml(readmeContent) + '</pre>';
            }
        } else {
            // Fallback: display as plain text with line breaks
            modalReadme.innerHTML = '<pre style="white-space: pre-wrap; word-wrap: break-word;">' + escapeHtml(readmeContent) + '</pre>';
        }

        // Show README content
        modalLoading.style.display = 'none';
        modalReadme.style.display = 'block';
    } catch (error) {
        console.error('Error loading README:', error);
        modalLoading.style.display = 'none';
        modalError.style.display = 'flex';
    }
}

// Function to close modal
function closeProjectModal() {
    if (!projectModal || !modalReadme) {
        return;
    }
    
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        // Animate closing
        modalContainer.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        modalContainer.style.transform = 'scale(0.9)';
        modalContainer.style.opacity = '0';
        
        setTimeout(() => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
            modalReadme.innerHTML = '';
            
            // Reset modal container styles
            modalContainer.style.transform = '';
            modalContainer.style.opacity = '';
            modalContainer.style.transition = '';
            
            // Restore card styles to allow CSS hover effects
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.style.transition = '';
                card.style.pointerEvents = '';
                // Remove inline transform to allow CSS hover to work
                card.style.transform = '';
            });
        }, 300);
    } else {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
        modalReadme.innerHTML = '';
    }
}

// Function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to convert emojis in markdown while preserving code blocks
function convertEmojisInMarkdown(markdown) {
    if (!markdown || typeof markdown !== 'string') {
        return markdown || '';
    }
    
    // Store code blocks and inline code with unique placeholders
    const codeBlocks = [];
    const inlineCodes = [];
    let processed = markdown;
    
    // First, replace fenced code blocks (triple backticks) - these take priority
    const codeBlockRegex = /```[\s\S]*?```/g;
    processed = processed.replace(codeBlockRegex, (match) => {
        const index = codeBlocks.length;
        codeBlocks.push(match);
        return `\u0001CODEBLOCK${index}\u0001`;
    });
    
    // Then replace inline code (single backticks that aren't part of triple backticks)
    // We'll match single backticks that aren't immediately preceded or followed by backticks
    const inlineCodeRegex = /`[^`\n]+`/g;
    processed = processed.replace(inlineCodeRegex, (match) => {
        // Skip if this looks like it might be part of a code block (shouldn't happen after code block replacement)
        const index = inlineCodes.length;
        inlineCodes.push(match);
        return `\u0002INLINECODE${index}\u0002`;
    });
    
    // Convert emoji codes in the remaining text
    processed = convertEmojiCodes(processed);
    
    // Restore inline code first (in reverse order)
    for (let i = inlineCodes.length - 1; i >= 0; i--) {
        processed = processed.replace(`\u0002INLINECODE${i}\u0002`, inlineCodes[i]);
    }
    
    // Then restore code blocks (in reverse order)
    for (let i = codeBlocks.length - 1; i >= 0; i--) {
        processed = processed.replace(`\u0001CODEBLOCK${i}\u0001`, codeBlocks[i]);
    }
    
    return processed;
}

// Function to convert GitHub emoji codes to Unicode emojis
function convertEmojiCodes(text) {
    if (!text || typeof text !== 'string') {
        return text;
    }
    
    // Comprehensive GitHub emoji mapping - sorted by length (longest first) to avoid partial matches
    const emojiMap = {
        ':white_check_mark:': '✅',
        ':heavy_check_mark:': '✔️',
        ':heavy_multiplication_x:': '✖️',
        ':love_you_gesture:': '🤟',
        ':fingers_crossed:': '🤞',
        ':information_source:': 'ℹ️',
        ':rotating_light:': '🚨',
        ':point_right:': '👉',
        ':point_left:': '👈',
        ':point_up:': '☝️',
        ':arrow_up:': '⬆️',
        ':arrow_down:': '⬇️',
        ':arrow_left:': '⬅️',
        ':arrow_right:': '➡️',
        ':arrow_forward:': '▶️',
        ':green_heart:': '💚',
        ':yellow_heart:': '💛',
        ':blue_heart:': '💙',
        ':purple_heart:': '💜',
        ':black_heart:': '🖤',
        ':white_heart:': '🤍',
        ':raising_hand:': '🙋',
        ':thumbsup:': '👍',
        ':thumbsdown:': '👎',
        ':ok_hand:': '👌',
        ':laughing:': '😆',
        ':smile:': '😄',
        ':blush:': '😊',
        ':wink:': '😉',
        ':heart:': '❤️',
        ':rocket:': '🚀',
        ':fire:': '🔥',
        ':star:': '⭐',
        ':tada:': '🎉',
        ':warning:': '⚠️',
        ':bulb:': '💡',
        ':zap:': '⚡',
        ':bug:': '🐛',
        ':check:': '✅',
        ':x:': '❌',
        ':sparkles:': '✨',
        ':memo:': '📝',
        ':pencil:': '📝',
        ':computer:': '💻',
        ':gear:': '⚙️',
        ':wrench:': '🔧',
        ':hammer:': '🔨',
        ':package:': '📦',
        ':book:': '📖',
        ':books:': '📚',
        ':mag:': '🔍',
        ':pushpin:': '📌',
        ':link:': '🔗',
        ':eyes:': '👀',
        ':back:': '◀️',
        ':question:': '❓',
        ':exclamation:': '❗',
        ':lock:': '🔒',
        ':unlock:': '🔓',
        ':key:': '🔑',
        ':shield:': '🛡️',
        ':construction:': '🚧',
        ':clap:': '👏',
        ':muscle:': '💪',
        ':pray:': '🙏',
        ':v:': '✌️',
        ':metal:': '🤘',
        ':ok:': '👌',
        ':punch:': '👊',
        ':fist:': '✊',
    };
    
    // Replace emoji codes with Unicode emojis
    let processed = text;
    
    // Sort by length (longest first) to avoid partial matches
    const sortedCodes = Object.keys(emojiMap).sort((a, b) => b.length - a.length);
    
    // Simple regex that matches :emoji_name: format
    for (const code of sortedCodes) {
        // Escape special regex characters and match the exact emoji code
        const escapedCode = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedCode, 'g');
        processed = processed.replace(regex, emojiMap[code]);
    }
    
    return processed;
}

// Function to process relative image URLs and convert them to absolute GitHub URLs
function processImageUrls(container, owner, repo) {
    const images = container.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
            // Handle relative URLs
            let imageUrl = src;
            if (src.startsWith('./')) {
                imageUrl = src.substring(2);
            } else if (!src.startsWith('/')) {
                imageUrl = src;
            }
            
            // Convert to GitHub raw content URL
            const branch = 'main'; // Default branch, could be improved
            const absoluteUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${imageUrl}`;
            img.src = absoluteUrl;
            
            // Add error handling for broken images
            img.onerror = function() {
                // Try with master branch as fallback
                if (branch === 'main') {
                    this.src = `https://raw.githubusercontent.com/${owner}/${repo}/master/${imageUrl}`;
                }
            };
        }
    });
    
    // Also process links that might be relative
    const links = container.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            // Convert relative GitHub links to absolute
            if (href.startsWith('./')) {
                const relativePath = href.substring(2);
                link.href = `https://github.com/${owner}/${repo}/blob/main/${relativePath}`;
            }
        }
    });
}

// Function to show error
function showError(message) {
    if (!modalError || !modalLoading) {
        console.error('Modal error elements not initialized');
        return;
    }
    
    const errorParagraph = modalError.querySelector('p');
    if (errorParagraph) {
        errorParagraph.textContent = message;
    }
    modalLoading.style.display = 'none';
    modalError.style.display = 'flex';
}

// Add click event listeners to project cards
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modal elements
    projectModal = document.getElementById('project-modal');
    modalClose = document.getElementById('modal-close');
    modalTitle = document.getElementById('modal-title');
    modalLoading = document.getElementById('modal-loading');
    modalError = document.getElementById('modal-error');
    modalReadme = document.getElementById('modal-readme');
    modalOverlay = document.querySelector('.modal-overlay');
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on the GitHub link
            if (e.target.closest('.project-links a')) {
                return; // Let the link work normally
            }
            
            openProjectModal(card, e);
        });
    });

    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // Projects "See More" functionality
    const seeMoreBtn = document.getElementById('projects-see-more-btn');
    const seeMoreText = document.getElementById('see-more-text');
    const seeMoreIcon = document.getElementById('see-more-icon');
    const hiddenCards = document.querySelectorAll('.project-card-hidden');
    
    if (seeMoreBtn && hiddenCards.length > 0) {
        let isExpanded = false;
        
        seeMoreBtn.addEventListener('click', () => {
            if (!isExpanded) {
                // Animation sequence:
                // hiddenCards order in DOM: [0=Project-6, 1=Project-5, 2=Project-4, 3=Project-3, 4=Project-2, 5=fpga-logic-circuits]
                // Sequence: 1. Project-5 (ARM Assembly Addressing Modes & Trapezoidal Integration) - index 1, fades in first
                //           2. After 100ms: Project-6 (ARM Assembly Modular Bubble Sort) - index 0, and Project-4 (ARM Assembly ASCII Conversion) - index 2, together
                //           3. After scroll: Last row - Project-2 (Combinational Logic) - index 4, fades in first, then after 200ms Project-3 (7-Segment LED) - index 3, and fpga-logic-circuits (AND-OR-NOT) - index 5, together
                
                // Animation timing configuration (in milliseconds)
                // Delay between Project-5 and the side cards (Project-6 and Project-4)
                const CENTER_TO_SIDE_DELAY = 100;
                
                // Helper function to animate a card
                const animateCard = (card, delay) => {
                    setTimeout(() => {
                        // Remove hidden class first
                        card.classList.remove('project-card-hidden');
                        card.classList.add('project-card-visible');
                        
                        // Set initial state for animation
                        card.style.display = 'block';
                        card.style.pointerEvents = 'auto';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        
                        // Force reflow to ensure initial state is applied
                        card.offsetHeight;
                        
                        // Then animate to visible state
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    }, delay);
                };
                
                // Step 1: Project-5 (ARM Assembly Addressing Modes & Trapezoidal Integration) - index 1, fades in first
                if (hiddenCards[1]) {
                    // Add to layout first
                    hiddenCards[1].classList.remove('project-card-hidden');
                    hiddenCards[1].classList.add('project-card-visible');
                    hiddenCards[1].style.display = 'block';
                    hiddenCards[1].style.pointerEvents = 'auto';
                    hiddenCards[1].style.opacity = '0';
                    hiddenCards[1].style.transform = 'translateY(20px)';
                    hiddenCards[1].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    hiddenCards[1].offsetHeight; // Force reflow
                    
                    // Then animate in
                    requestAnimationFrame(() => {
                        hiddenCards[1].style.opacity = '1';
                        hiddenCards[1].style.transform = 'translateY(0)';
                    });
                }
                
                // Step 2: Project-6 (ARM Assembly Modular Bubble Sort) - index 0, and Project-4 (ARM Assembly ASCII Conversion) - index 2
                // Add both cards to DOM layout first (but invisible) to prevent displacement
                setTimeout(() => {
                    // First, add both cards to layout but keep them invisible to prevent displacement
                    if (hiddenCards[0]) {
                        hiddenCards[0].classList.remove('project-card-hidden');
                        hiddenCards[0].classList.add('project-card-visible');
                        hiddenCards[0].style.display = 'block';
                        hiddenCards[0].style.pointerEvents = 'auto';
                        hiddenCards[0].style.opacity = '0';
                        hiddenCards[0].style.transform = 'translateY(20px)';
                        hiddenCards[0].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        // Force reflow
                        hiddenCards[0].offsetHeight;
                    }
                    if (hiddenCards[2]) {
                        hiddenCards[2].classList.remove('project-card-hidden');
                        hiddenCards[2].classList.add('project-card-visible');
                        hiddenCards[2].style.display = 'block';
                        hiddenCards[2].style.pointerEvents = 'auto';
                        hiddenCards[2].style.opacity = '0';
                        hiddenCards[2].style.transform = 'translateY(20px)';
                        hiddenCards[2].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        // Force reflow
                        hiddenCards[2].offsetHeight;
                    }
                    
                    // Now animate them in after a brief moment to ensure layout is stable
                    requestAnimationFrame(() => {
                        if (hiddenCards[0]) {
                            hiddenCards[0].style.opacity = '1';
                            hiddenCards[0].style.transform = 'translateY(0)';
                        }
                        if (hiddenCards[2]) {
                            hiddenCards[2].style.opacity = '1';
                            hiddenCards[2].style.transform = 'translateY(0)';
                        }
                    });
                }, CENTER_TO_SIDE_DELAY); // Wait 100ms after Project-5 starts appearing
                
                // Step 3: Add the last row cards to layout but keep them invisible
                // Last row: Project-3 (7-Segment LED) - index 3, Project-2 (Combinational Logic) - index 4, fpga-logic-circuits (AND-OR-NOT) - index 5
                // They will fade in when they scroll into view: Project-2 first, then after 200ms the other two together
                setTimeout(() => {
                    // Add all three last row cards to layout but keep them invisible to prevent displacement
                    if (hiddenCards[3]) {
                        hiddenCards[3].classList.remove('project-card-hidden');
                        hiddenCards[3].classList.add('project-card-visible');
                        hiddenCards[3].style.display = 'block';
                        hiddenCards[3].style.pointerEvents = 'auto';
                        hiddenCards[3].style.opacity = '0';
                        hiddenCards[3].style.transform = 'translateY(20px)';
                        hiddenCards[3].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        hiddenCards[3].offsetHeight; // Force reflow
                    }
                    if (hiddenCards[4]) {
                        hiddenCards[4].classList.remove('project-card-hidden');
                        hiddenCards[4].classList.add('project-card-visible');
                        hiddenCards[4].style.display = 'block';
                        hiddenCards[4].style.pointerEvents = 'auto';
                        hiddenCards[4].style.opacity = '0';
                        hiddenCards[4].style.transform = 'translateY(20px)';
                        hiddenCards[4].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        hiddenCards[4].offsetHeight; // Force reflow
                    }
                    if (hiddenCards[5]) {
                        hiddenCards[5].classList.remove('project-card-hidden');
                        hiddenCards[5].classList.add('project-card-visible');
                        hiddenCards[5].style.display = 'block';
                        hiddenCards[5].style.pointerEvents = 'auto';
                        hiddenCards[5].style.opacity = '0';
                        hiddenCards[5].style.transform = 'translateY(20px)';
                        hiddenCards[5].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        hiddenCards[5].offsetHeight; // Force reflow
                    }
                    
                    // Set up Intersection Observer for the last row cards
                    // Animation sequence: Project-2 (index 4) fades in first, then after 200ms Project-3 (index 3) and fpga-logic-circuits (index 5) fade in together
                    const LAST_ROW_DELAY = 200;
                    const lastRowCards = [hiddenCards[3], hiddenCards[4], hiddenCards[5]].filter(Boolean);
                    let lastRowAnimated = false;
                    
                    if (lastRowCards.length > 0) {
                        // Ensure all cards have proper initial state and transition before setting up observer
                        lastRowCards.forEach(card => {
                            if (card) {
                                card.style.opacity = '0';
                                card.style.transform = 'translateY(20px)';
                                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            }
                        });
                        
                        // Small delay to ensure styles are applied
                        setTimeout(() => {
                            const observerOptions = {
                                root: null,
                                rootMargin: '0px',
                                threshold: 0.1
                            };
                            
                            const observer = new IntersectionObserver((entries) => {
                                const intersectingCards = entries.filter(entry => entry.isIntersecting);
                                
                                if (intersectingCards.length > 0 && !lastRowAnimated) {
                                    lastRowAnimated = true;
                                    
                                    // Ensure all cards start with opacity 0 and proper transform
                                    lastRowCards.forEach(card => {
                                        if (card) {
                                            card.style.opacity = '0';
                                            card.style.transform = 'translateY(20px)';
                                            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                                        }
                                    });
                                    
                                    // Force reflow to ensure initial state is applied
                                    hiddenCards[4]?.offsetHeight;
                                    
                                    // Step 1: Project-2 (Combinational Logic Design: MUX and DEMUX) - index 4, fades in first
                                    requestAnimationFrame(() => {
                                        if (hiddenCards[4]) {
                                            hiddenCards[4].style.opacity = '1';
                                            hiddenCards[4].style.transform = 'translateY(0)';
                                        }
                                    });
                                    
                                    // Step 2: After 200ms, Project-3 (7-Segment LED) - index 3, and fpga-logic-circuits (AND-OR-NOT) - index 5, fade in together
                                    setTimeout(() => {
                                        // Force reflow for the other two cards
                                        hiddenCards[3]?.offsetHeight;
                                        hiddenCards[5]?.offsetHeight;
                                        
                                        requestAnimationFrame(() => {
                                            if (hiddenCards[3]) {
                                                hiddenCards[3].style.opacity = '1';
                                                hiddenCards[3].style.transform = 'translateY(0)';
                                            }
                                            if (hiddenCards[5]) {
                                                hiddenCards[5].style.opacity = '1';
                                                hiddenCards[5].style.transform = 'translateY(0)';
                                            }
                                        });
                                    }, LAST_ROW_DELAY);
                                    
                                    lastRowCards.forEach(card => observer.unobserve(card));
                                }
                            }, observerOptions);
                            
                            const checkIfInView = () => {
                                if (lastRowAnimated) return;
                                
                                // Ensure all cards start with opacity 0 and proper transform
                                lastRowCards.forEach(card => {
                                    if (card) {
                                        card.style.opacity = '0';
                                        card.style.transform = 'translateY(20px)';
                                        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                                    }
                                });
                                
                                // Force reflow to ensure styles are applied
                                lastRowCards.forEach(card => card?.offsetHeight);
                                
                                const project2Rect = hiddenCards[4]?.getBoundingClientRect();
                                if (project2Rect && project2Rect.top < window.innerHeight && project2Rect.bottom > 0) {
                                    lastRowAnimated = true;
                                    
                                    // Force reflow to ensure initial state is applied
                                    hiddenCards[4]?.offsetHeight;
                                    
                                    requestAnimationFrame(() => {
                                        if (hiddenCards[4]) {
                                            hiddenCards[4].style.opacity = '1';
                                            hiddenCards[4].style.transform = 'translateY(0)';
                                        }
                                    });
                                    
                                    setTimeout(() => {
                                        // Force reflow for the other two cards
                                        hiddenCards[3]?.offsetHeight;
                                        hiddenCards[5]?.offsetHeight;
                                        
                                        requestAnimationFrame(() => {
                                            if (hiddenCards[3]) {
                                                hiddenCards[3].style.opacity = '1';
                                                hiddenCards[3].style.transform = 'translateY(0)';
                                            }
                                            if (hiddenCards[5]) {
                                                hiddenCards[5].style.opacity = '1';
                                                hiddenCards[5].style.transform = 'translateY(0)';
                                            }
                                        });
                                    }, LAST_ROW_DELAY);
                                } else {
                                    lastRowCards.forEach(card => observer.observe(card));
                                }
                            };
                            
                            checkIfInView();
                        }, 50); // Small delay to ensure styles are applied before checking
                    }
                }, 1000); // Wait for Project-6 and Project-4 to start appearing
                
                seeMoreText.textContent = 'See Less Projects';
                seeMoreBtn.classList.add('expanded');
                isExpanded = true;
            } else {
                // Collapse: Hide cards beyond first 3
                hiddenCards.forEach((card, index) => {
                    setTimeout(() => {
                        // Ensure transition is set
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        // Animate out
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    }, index * 50);
                });
                
                setTimeout(() => {
                    hiddenCards.forEach(card => {
                        card.classList.remove('project-card-visible');
                        card.classList.add('project-card-hidden');
                        card.style.display = 'none';
                        card.style.pointerEvents = 'none';
                        // Reset inline styles
                        card.style.opacity = '';
                        card.style.transform = '';
                        card.style.transition = '';
                    });
                }, 500); // Wait for animation to complete
                
                seeMoreText.textContent = 'See More Projects';
                seeMoreBtn.classList.remove('expanded');
                isExpanded = false;
                
                // Scroll to the projects section
                setTimeout(() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100); // Small delay to ensure collapse animation completes
            }
        });
    }
});

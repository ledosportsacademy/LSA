// Add this script to the end of your index.html before the closing </body> tag

// Function to lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Function to defer non-critical CSS
function loadDeferredStyles() {
  const deferredStyles = document.querySelectorAll('link[rel="stylesheet"][media="print"][onload]');
  deferredStyles.forEach(link => {
    link.media = 'all';
  });
}

// Function to hide page loader when content is loaded
function hidePageLoader() {
  const pageLoader = document.getElementById('page-loader');
  if (pageLoader) {
    pageLoader.style.opacity = '0';
    setTimeout(() => {
      pageLoader.style.display = 'none';
    }, 500);
  }
}

// Initialize performance optimizations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Convert all image tags to use lazy loading
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
  
  // Initialize lazy loading for data-src images
  lazyLoadImages();
  
  // Load deferred styles
  loadDeferredStyles();
  
  // Hide page loader
  hidePageLoader();
});

// Add event listener for page load complete
window.addEventListener('load', () => {
  // Ensure page loader is hidden
  hidePageLoader();
});
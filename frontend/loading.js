// Loading Indicator Implementation

// Function to show loading indicator
function showLoadingIndicator() {
  // Check if loading indicator already exists
  let loadingIndicator = document.getElementById('loadingIndicator');
  
  // If it doesn't exist, create it
  if (!loadingIndicator) {
    loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loadingIndicator';
    loadingIndicator.className = 'loading-indicator';
    
    // Create spinner element
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    
    // Add spinner to loading indicator
    loadingIndicator.appendChild(spinner);
    
    // Add loading indicator to body
    document.body.appendChild(loadingIndicator);
  }
  
  // Show the loading indicator
  loadingIndicator.classList.remove('hidden');
}

// Function to hide loading indicator
function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById('loadingIndicator');
  
  // If loading indicator exists, hide it
  if (loadingIndicator) {
    loadingIndicator.classList.add('hidden');
  }
}
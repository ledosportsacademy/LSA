// API Service for Ledo Sports Academy

const API_BASE_URL = '/api';

// Generic fetch function with error handling
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Hero Slides API
const heroAPI = {
  getAll: () => fetchAPI('/heroes'),
  getById: (id) => fetchAPI(`/heroes/${id}`),
  create: (data) => fetchAPI('/heroes', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchAPI(`/heroes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetchAPI(`/heroes/${id}`, {
    method: 'DELETE'
  })
};

// Activities API
const activityAPI = {
  getAll: () => fetchAPI('/activities'),
  getByStatus: (status) => fetchAPI(`/activities/status/${status}`),
  getById: (id) => fetchAPI(`/activities/${id}`),
  create: (data) => fetchAPI('/activities', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchAPI(`/activities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetchAPI(`/activities/${id}`, {
    method: 'DELETE'
  })
};

// Members API
const memberAPI = {
  getAll: () => fetchAPI('/members'),
  getById: (id) => fetchAPI(`/members/${id}`),
  search: (query) => fetchAPI(`/members/search?q=${encodeURIComponent(query)}`),
  create: (data) => fetchAPI('/members', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchAPI(`/members/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetchAPI(`/members/${id}`, {
    method: 'DELETE'
  })
};

// Donations API
const donationAPI = {
  getAll: () => fetchAPI('/donations'),
  getById: (id) => fetchAPI(`/donations/${id}`),
  getTotal: () => fetchAPI('/donations/total'),
  create: (data) => fetchAPI('/donations', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchAPI(`/donations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetchAPI(`/donations/${id}`, {
    method: 'DELETE'
  })
};

// Expenses API
const expenseAPI = {
  getAll: () => fetchAPI('/expenses'),
  getById: (id) => fetchAPI(`/expenses/${id}`),
  getByCategory: (category) => fetchAPI(`/expenses/category/${category}`),
  getCategorySummary: () => fetchAPI('/expenses/category-summary'),
  getTotal: () => fetchAPI('/expenses/total'),
  create: (data) => fetchAPI('/expenses', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchAPI(`/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetchAPI(`/expenses/${id}`, {
    method: 'DELETE'
  })
};

// Experiences API
const experienceAPI = {
  getAll: () => fetchAPI('/experiences'),
  getById: (id) => fetchAPI(`/experiences/${id}`),
  create: (data) => fetchAPI('/experiences', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchAPI(`/experiences/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetchAPI(`/experiences/${id}`, {
    method: 'DELETE'
  })
};

// Weekly Fees API
const weeklyFeeAPI = {
  getAll: () => fetchAPI('/weekly-fees'),
  getMemberFees: (memberId) => fetchAPI(`/weekly-fees/member/${memberId}`),
  getSummary: () => fetchAPI('/weekly-fees/summary'),
  create: (data) => fetchAPI('/weekly-fees', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchAPI(`/weekly-fees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  addPayment: (id, paymentData) => fetchAPI(`/weekly-fees/${id}/payment`, {
    method: 'POST',
    body: JSON.stringify(paymentData)
  }),
  updatePaymentStatus: (id, paymentId, statusData) => fetchAPI(`/weekly-fees/${id}/payment/${paymentId}`, {
    method: 'PUT',
    body: JSON.stringify(statusData)
  })
};

// Gallery API
const galleryAPI = {
  getAll: () => fetchAPI('/gallery'),
  getTopFive: () => fetchAPI('/gallery/top-five'),
  getByAlbum: (album) => fetchAPI(`/gallery/album/${album}`),
  getById: (id) => fetchAPI(`/gallery/${id}`),
  create: (data) => fetchAPI('/gallery', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchAPI(`/gallery/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetchAPI(`/gallery/${id}`, {
    method: 'DELETE'
  }),
  updateTopFive: (items) => fetchAPI('/gallery/top-five', {
    method: 'PUT',
    body: JSON.stringify({ items })
  })
};

// Dashboard API
const dashboardAPI = {
  getStats: () => fetchAPI('/dashboard')
};

// Export all API services
const API = {
  hero: heroAPI,
  activity: activityAPI,
  member: memberAPI,
  donation: donationAPI,
  expense: expenseAPI,
  experience: experienceAPI,
  weeklyFee: weeklyFeeAPI,
  gallery: galleryAPI,
  dashboard: dashboardAPI
};
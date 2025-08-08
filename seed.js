const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const HeroSlide = require('./backend/models/HeroSlide');
const Activity = require('./backend/models/Activity');
const Member = require('./backend/models/Member');
const Donation = require('./backend/models/Donation');
const Expense = require('./backend/models/Expense');
const Experience = require('./backend/models/Experience');
const WeeklyFee = require('./backend/models/WeeklyFee');
const Gallery = require('./backend/models/Gallery');

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ledosportsacademy:I9R3MjfaSSYFXMKS@cluster0.l6exrot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Sample data
const heroSlides = [
  {
    title: "Welcome to Ledo Sports Academy",
    subtitle: "Where Champions Are Born",
    description: "Join India's premier sports academy and unlock your potential with world-class training facilities and expert coaches.",
    backgroundImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop",
    ctaText: "Join Today",
    ctaLink: "#members",
    redirectUrl: "https://forms.google.com/register",
    openNewTab: true
  },
  {
    title: "Championship Victory 2024",
    subtitle: "Making History Together",
    description: "Celebrating our regional championship win with exceptional team performance and dedication.",
    backgroundImage: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=1200&h=800&fit=crop",
    ctaText: "Our Journey",
    ctaLink: "#experiences",
    redirectUrl: "",
    openNewTab: false
  },
  {
    title: "State-of-the-Art Facilities",
    subtitle: "Training Excellence",
    description: "Experience training like never before with our modern facilities, synthetic turf, and advanced equipment.",
    backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
    ctaText: "Explore",
    ctaLink: "#activities",
    redirectUrl: "",
    openNewTab: false
  },
  {
    title: "Community Sports Festival",
    subtitle: "Building Tomorrow's Athletes",
    description: "Fostering sports culture and healthy competition with over 500 participants from local schools.",
    backgroundImage: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&h=800&fit=crop",
    ctaText: "Support Us",
    ctaLink: "#donations",
    redirectUrl: "https://donate.example.com/ledo-academy",
    openNewTab: true
  }
];

const activities = [
  {
    title: "Championship League Match vs Eagles FC",
    date: "2025-08-12",
    time: "16:00",
    description: "Ledo Sports Academy vs Eagles FC - Championship League Quarter Final match at home ground.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
    status: "upcoming",
    type: "match",
    priority: "high",
    redirectUrl: "https://tickets.example.com/eagles-match",
    openNewTab: true
  },
  {
    title: "Annual Sports Day Celebration",
    date: "2025-08-18",
    time: "09:00",
    description: "Join us for our annual sports day with competitions, awards ceremony, and community celebration.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    status: "upcoming",
    type: "event",
    priority: "high",
    redirectUrl: "https://events.example.com/sports-day-2025",
    openNewTab: true
  },
  {
    title: "Weekly Training Session",
    date: "2025-08-06",
    time: "17:30",
    description: "Regular training session for all academy members at the main practice field.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    status: "recent",
    type: "training",
    priority: "medium",
    redirectUrl: "",
    openNewTab: false
  },
  {
    title: "Junior Academy Trials",
    date: "2025-08-22",
    time: "14:00",
    description: "Open trials for junior academy program. Ages 8-16 welcome to showcase their talent.",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop",
    status: "upcoming",
    type: "trial",
    priority: "high",
    redirectUrl: "https://trials.example.com/junior-academy",
    openNewTab: true
  },
  {
    title: "Coaching Workshop",
    date: "2025-08-15",
    time: "10:00",
    description: "Professional development workshop for coaches focusing on youth training methodologies.",
    image: "https://images.unsplash.com/photo-1526232761682-d26e85d9d5c8?w=800&h=600&fit=crop",
    status: "upcoming",
    type: "workshop",
    priority: "medium",
    redirectUrl: "",
    openNewTab: false
  },
  {
    title: "Friendly Match vs United SC",
    date: "2025-08-03",
    time: "15:30",
    description: "Friendly match against United SC as preparation for the upcoming championship league.",
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=600&fit=crop",
    status: "recent",
    type: "match",
    priority: "medium",
    redirectUrl: "",
    openNewTab: false
  }
];

const members = [
  {
    name: "Rajiv Sharma",
    contact: "rajiv.sharma@example.com",
    phone: "+91 98765 43210",
    joinDate: "2023-01-15",
    role: "Coach",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Priya Patel",
    contact: "priya.patel@example.com",
    phone: "+91 87654 32109",
    joinDate: "2023-02-20",
    role: "Player",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Amit Kumar",
    contact: "amit.kumar@example.com",
    phone: "+91 76543 21098",
    joinDate: "2023-03-10",
    role: "Player",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Sunita Verma",
    contact: "sunita.verma@example.com",
    phone: "+91 65432 10987",
    joinDate: "2023-04-05",
    role: "Administrator",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
  },
  {
    name: "Vikram Singh",
    contact: "vikram.singh@example.com",
    phone: "+91 54321 09876",
    joinDate: "2023-05-12",
    role: "Player",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Neha Gupta",
    contact: "neha.gupta@example.com",
    phone: "+91 43210 98765",
    joinDate: "2023-06-18",
    role: "Coach",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
  },
  {
    name: "Rahul Desai",
    contact: "rahul.desai@example.com",
    phone: "+91 32109 87654",
    joinDate: "2023-07-22",
    role: "Player",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Ananya Reddy",
    contact: "ananya.reddy@example.com",
    phone: "+91 21098 76543",
    joinDate: "2023-08-30",
    role: "Player",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  }
];

const donations = [
  {
    donorName: "Tata Group",
    amount: 50000,
    date: "2024-01-15",
    purpose: "Infrastructure Development"
  },
  {
    donorName: "Reliance Foundation",
    amount: 25000,
    date: "2024-02-20",
    purpose: "Youth Program"
  },
  {
    donorName: "Mahindra & Mahindra",
    amount: 15000,
    date: "2024-03-10",
    purpose: "Equipment"
  },
  {
    donorName: "Infosys Foundation",
    amount: 20000,
    date: "2024-04-05",
    purpose: "Coaching Staff"
  },
  {
    donorName: "Aditya Birla Group",
    amount: 5000,
    date: "2024-05-12",
    purpose: "Tournament Sponsorship"
  }
];

const expenses = [
  {
    description: "Field Maintenance",
    amount: 15000,
    date: "2024-01-20",
    category: "Facilities",
    vendor: "GreenTurf Solutions",
    paymentMethod: "Bank Transfer"
  },
  {
    description: "New Training Equipment",
    amount: 25000,
    date: "2024-02-15",
    category: "Equipment",
    vendor: "SportsMart",
    paymentMethod: "Credit Card"
  },
  {
    description: "Coach Salaries - March",
    amount: 18000,
    date: "2024-03-01",
    category: "Staff",
    vendor: "Internal",
    paymentMethod: "Bank Transfer"
  },
  {
    description: "Tournament Registration Fees",
    amount: 5000,
    date: "2024-04-10",
    category: "Events",
    vendor: "Regional Sports Association",
    paymentMethod: "Cheque"
  },
  {
    description: "Team Uniforms",
    amount: 8000,
    date: "2024-05-05",
    category: "Equipment",
    vendor: "UniformPro",
    paymentMethod: "Credit Card"
  },
  {
    description: "Utility Bills - Q1",
    amount: 3000,
    date: "2024-03-30",
    category: "Utilities",
    vendor: "City Power & Water",
    paymentMethod: "Bank Transfer"
  }
];

const experiences = [
  {
    title: "Regional Championship Victory",
    date: "2024-03-15",
    description: "Our academy team secured the regional championship with an outstanding performance, showcasing exceptional teamwork and skill development.",
    image: "https://images.unsplash.com/photo-1526232761682-d26e85d9d5c8?w=800&h=600&fit=crop"
  },
  {
    title: "Community Outreach Program",
    date: "2024-04-22",
    description: "We conducted a successful outreach program in underserved communities, introducing over 100 children to sports and physical activities.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop"
  },
  {
    title: "Professional Coach Workshop",
    date: "2024-02-10",
    description: "Our coaching staff participated in a professional development workshop led by international sports experts, enhancing our training methodologies.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
  },
  {
    title: "New Training Facility Inauguration",
    date: "2024-01-05",
    description: "We proudly inaugurated our new indoor training facility, featuring state-of-the-art equipment and technology to support year-round training.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
  },
  {
    title: "Youth Development Camp",
    date: "2024-05-15",
    description: "Our week-long youth development camp brought together talented young athletes from across the region for intensive training and skill development.",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop"
  }
];

const weeklyFees = [
  {
    memberId: null, // Will be populated after members are created
    memberName: "Priya Patel",
    payments: [
      {
        date: "2024-07-01",
        amount: 100,
        status: "paid"
      },
      {
        date: "2024-07-08",
        amount: 100,
        status: "paid"
      },
      {
        date: "2024-07-15",
        amount: 100,
        status: "pending"
      }
    ]
  },
  {
    memberId: null, // Will be populated after members are created
    memberName: "Amit Kumar",
    payments: [
      {
        date: "2024-07-01",
        amount: 100,
        status: "paid"
      },
      {
        date: "2024-07-08",
        amount: 100,
        status: "paid"
      },
      {
        date: "2024-07-15",
        amount: 100,
        status: "paid"
      }
    ]
  },
  {
    memberId: null, // Will be populated after members are created
    memberName: "Vikram Singh",
    payments: [
      {
        date: "2024-07-01",
        amount: 100,
        status: "paid"
      },
      {
        date: "2024-07-08",
        amount: 100,
        status: "overdue"
      },
      {
        date: "2024-07-15",
        amount: 100,
        status: "pending"
      }
    ]
  },
  {
    memberId: null, // Will be populated after members are created
    memberName: "Rahul Desai",
    payments: [
      {
        date: "2024-07-01",
        amount: 100,
        status: "paid"
      },
      {
        date: "2024-07-08",
        amount: 100,
        status: "paid"
      },
      {
        date: "2024-07-15",
        amount: 100,
        status: "paid"
      }
    ]
  },
  {
    memberId: null, // Will be populated after members are created
    memberName: "Ananya Reddy",
    payments: [
      {
        date: "2024-07-01",
        amount: 100,
        status: "paid"
      },
      {
        date: "2024-07-08",
        amount: 100,
        status: "overdue"
      },
      {
        date: "2024-07-15",
        amount: 100,
        status: "pending"
      }
    ]
  }
];

const gallery = [
  {
    title: "Team Victory",
    url: "https://images.unsplash.com/photo-1526232761682-d26e85d9d5c8?w=800",
    album: "Awards",
    isTopFive: true,
    order: 1
  },
  {
    title: "Training Session",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    album: "Training",
    isTopFive: true,
    order: 2
  },
  {
    title: "Youth Program",
    url: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800",
    album: "Youth",
    isTopFive: true,
    order: 3
  },
  {
    title: "Match Day",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    album: "Matches",
    isTopFive: true,
    order: 4
  },
  {
    title: "Community Event",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    album: "Community",
    isTopFive: true,
    order: 5
  },
  {
    title: "Coach Training",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    album: "Training",
    isTopFive: false,
    order: 0
  },
  {
    title: "Match Day",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    album: "Matches",
    isTopFive: false,
    order: 0
  },
  {
    title: "Tournament Victory",
    url: "https://images.unsplash.com/photo-1526232761682-d26e85d9d5c8?w=800",
    album: "Awards",
    isTopFive: false,
    order: 0
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');
    
    // Clear existing data
    await HeroSlide.deleteMany({});
    await Activity.deleteMany({});
    await Member.deleteMany({});
    await Donation.deleteMany({});
    await Expense.deleteMany({});
    await Experience.deleteMany({});
    await WeeklyFee.deleteMany({});
    await Gallery.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert hero slides
    const createdHeroSlides = await HeroSlide.insertMany(heroSlides);
    console.log(`Inserted ${createdHeroSlides.length} hero slides`);
    
    // Insert activities
    const createdActivities = await Activity.insertMany(activities);
    console.log(`Inserted ${createdActivities.length} activities`);
    
    // Insert members
    const createdMembers = await Member.insertMany(members);
    console.log(`Inserted ${createdMembers.length} members`);
    
    // Update weekly fees with member IDs
    const memberMap = {};
    createdMembers.forEach(member => {
      memberMap[member.name] = member._id;
    });
    
    weeklyFees.forEach(fee => {
      fee.memberId = memberMap[fee.memberName];
    });
    
    // Insert donations
    const createdDonations = await Donation.insertMany(donations);
    console.log(`Inserted ${createdDonations.length} donations`);
    
    // Insert expenses
    const createdExpenses = await Expense.insertMany(expenses);
    console.log(`Inserted ${createdExpenses.length} expenses`);
    
    // Insert experiences
    const createdExperiences = await Experience.insertMany(experiences);
    console.log(`Inserted ${createdExperiences.length} experiences`);
    
    // Insert weekly fees
    const createdWeeklyFees = await WeeklyFee.insertMany(weeklyFees);
    console.log(`Inserted ${createdWeeklyFees.length} weekly fees`);
    
    // Insert gallery
    const createdGallery = await Gallery.insertMany(gallery);
    console.log(`Inserted ${createdGallery.length} gallery items`);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedDatabase();
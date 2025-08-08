# Ledo Sports Academy Management System

A comprehensive web application for managing Ledo Sports Academy operations, including members, activities, donations, expenses, experiences, weekly fees, and gallery.

## Features

- **Dashboard**: Overview of key metrics and statistics
- **Hero Slideshow**: Dynamic slideshow featuring top gallery images
- **Activities Management**: Track upcoming and recent activities
- **Members Management**: Manage academy members and their details
- **Donations Tracking**: Record and track donations
- **Expense Management**: Track and categorize expenses
- **Experiences Showcase**: Highlight academy achievements and experiences
- **Weekly Fees Collection**: Manage member fee payments
- **Gallery Management**: Organize and showcase photos
- **Admin Mode**: Secure admin functionality for data management

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Responsive design for all device sizes

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_PASSWORD=your_admin_password
   ```

### Running the Application

1. Start the server:
   ```
   npm start
   ```
   Or for development with auto-reload:
   ```
   npm run dev
   ```

2. Seed the database with sample data:
   ```
   npm run seed
   ```

3. Access the application at `http://localhost:3000`

## API Endpoints

### Hero Slides
- `GET /api/heroes` - Get all hero slides
- `GET /api/heroes/:id` - Get a specific hero slide
- `POST /api/heroes` - Create a new hero slide
- `PUT /api/heroes/:id` - Update a hero slide
- `DELETE /api/heroes/:id` - Delete a hero slide

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/status/:status` - Get activities by status
- `GET /api/activities/:id` - Get a specific activity
- `POST /api/activities` - Create a new activity
- `PUT /api/activities/:id` - Update an activity
- `DELETE /api/activities/:id` - Delete an activity

### Members
- `GET /api/members` - Get all members
- `GET /api/members/search` - Search members
- `GET /api/members/:id` - Get a specific member
- `POST /api/members` - Create a new member
- `PUT /api/members/:id` - Update a member
- `DELETE /api/members/:id` - Delete a member

### Donations
- `GET /api/donations` - Get all donations
- `GET /api/donations/total` - Get total donations amount
- `GET /api/donations/:id` - Get a specific donation
- `POST /api/donations` - Create a new donation
- `PUT /api/donations/:id` - Update a donation
- `DELETE /api/donations/:id` - Delete a donation

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/total` - Get total expenses amount
- `GET /api/expenses/category/:category` - Get expenses by category
- `GET /api/expenses/category-summary` - Get expenses summary by category
- `GET /api/expenses/:id` - Get a specific expense
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get a specific experience
- `POST /api/experiences` - Create a new experience
- `PUT /api/experiences/:id` - Update an experience
- `DELETE /api/experiences/:id` - Delete an experience

### Weekly Fees
- `GET /api/weekly-fees` - Get all weekly fees
- `GET /api/weekly-fees/summary` - Get fees collection summary
- `GET /api/weekly-fees/member/:memberId` - Get weekly fees for a specific member
- `POST /api/weekly-fees` - Create a new weekly fee record
- `PUT /api/weekly-fees/:id` - Update a weekly fee record
- `POST /api/weekly-fees/:id/payment` - Add a payment to a member's weekly fee record
- `PUT /api/weekly-fees/:id/payment/:paymentId` - Update a payment status

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/top-five` - Get top five gallery items
- `GET /api/gallery/album/:album` - Get gallery items by album
- `GET /api/gallery/:id` - Get a specific gallery item
- `POST /api/gallery` - Create a new gallery item
- `PUT /api/gallery/:id` - Update a gallery item
- `DELETE /api/gallery/:id` - Delete a gallery item
- `PUT /api/gallery/top-five` - Update top five gallery items

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Admin Access

To access admin functionality, use the keyboard shortcut `Ctrl+Shift+A` and enter the admin password configured in your `.env` file.

## License

This project is licensed under the MIT License.
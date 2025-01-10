# Movie Review App

Welcome to the Movie Review App! This is a React-based web application that allows users to explore movies, view detailed information, and leave their reviews. It leverages modern tools such as React, TypeScript, Framer Motion for animations, and Axios for making API requests.
Frontend:vercel
Backend:Renderer:  https://movieapi-rook.onrender.com/
## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Components](#components)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Homepage**: Displays a list of movies with their ratings and details.
- **Movie Details Page**: Shows detailed information about a selected movie, including user reviews.
- **Review System**: Users can submit reviews, update, and delete them.
- **Table View**: Reviews are displayed in a tabular format, making it easy to navigate and manage them.
- **User Authentication**: Includes login, signup, and password reset features.

## Tech Stack
- **Frontend**: 
  - React
  - TypeScript
  - Framer Motion (for animations)
  - Axios (for API requests)
  - Tailwind CSS (for styling)
  - React Router (for routing)

- **Backend**: 
  - Node.js (with Express)
  - Firebase (for storing movie details and reviews)

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn (for package management)

### Steps
1. Clone the repository:
   ```
   git clone https://github.com/your-username/movie-review-app.git
   cd movie-review-app
   ```

2. Install the dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   # or
   yarn start
   ```

4. Open the app in your browser at `http://localhost:3000`.

## Usage

- **Home Page**: Displays a list of movies with ratings and a button to view movie details.
- **Movie Detail Page**: Shows detailed information about the movie along with an option to write a review.
- **Review**: Users can submit reviews with ratings, update or delete their reviews.

## Folder Structure

```
src/
├── components/
│   ├── MovieList.tsx        # Movie list component
│   ├── MovieDetails.tsx     # Movie detail component
│   ├── ReviewForm.tsx       # Review submission form
│   ├── ReviewList.tsx       # List of reviews for a movie
│   ├── Header.tsx           # Header component
│   └── Footer.tsx           # Footer component
├── context/
│   ├── MovieContext.tsx     # Movie-related state management
│   └── UserDetails.tsx      # User authentication and details
├── pages/
│   ├── HomePage.tsx         # Homepage with movie list
│   ├── MovieDetailpages.tsx # Page for movie details and reviews
│   └── Review.tsx           # Page for viewing user reviews
├── routes/
│   └── App.tsx              # Main app component with routing
└── styles/
    └── global.css           # Global styles and tailwind config
```

## Components

- **HomePage**: Displays a list of movies with ratings.
- **MovieDetailsPage**: Displays detailed movie information and allows users to leave reviews.
- **ReviewForm**: Form for submitting or updating reviews.
- **ReviewList**: Displays all reviews for a specific movie.
- **LampContainer**: UI component for decorative elements on the page.
- **Table**: UI component for displaying movie reviews in a table format.
  
## Routes

- **HomePage**: `/` — Displays a list of movies.
- **MovieDetailsPage**: `/review/:id` — Shows detailed information about a movie with an option to leave reviews.
- **ReviewPage**: `/reviews` — Displays the user’s personal reviews.
- **Login**: `/login` — Login form for user authentication.
- **Signup**: `/signup` — Signup form to create an account.
- **ForgetPassword**: `/forgetpassword` — Password reset form.

## Contributing

We welcome contributions to improve the app! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

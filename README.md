# Career Navigator AI

Build the FRONTEND ONLY for my AI Career Agent platform.

Do not build or modify the backend, database, OpenAI integration, authentication logic, APIs, or AI agents yet.

The frontend must be production-quality and designed so it can later connect cleanly to a FastAPI backend and Supabase.

PROJECT NAME:

CareerPilot AI

PRODUCT:

An AI-powered career platform that analyzes a user's resume and creates a personalized career profile.

TECH STACK:

- Next.js

- React

- TypeScript

- Tailwind CSS

- Modern component architecture

- Responsive design

- Use reusable components

- Use clean, maintainable code

DESIGN DIRECTION:

Create a premium AI career-tech SaaS website.

Visual style:

- Minimal

- Professional

- Modern

- Clean

- High-end SaaS

- Slightly futuristic but not gimmicky

- Excellent typography

- Generous whitespace

- Subtle shadows

- Smooth transitions

- Rounded cards

- Clear visual hierarchy

Do NOT make it look like a generic AI chatbot.

The product should feel trustworthy because users will upload sensitive career documents.

Use a professional color system with:

- White/light backgrounds

- Dark navy/charcoal primary text

- One restrained accent color

- Subtle gray borders

Include light and dark mode.

==================================================

1. LANDING PAGE

==================================================

Create:

/

Hero section:

Headline:

"Your AI Career Agent"

Subheadline:

"Turn your resume, skills, and experience into a personalized career roadmap."

Primary CTA:

"Get Started"

Secondary CTA:

"See How It Works"

Hero visual:

Create a dashboard preview showing:

- Resume Score

- Skills

- Career Suggestions

- Profile Completion

Do not use fake user testimonials or fake company logos.

Sections:

1. How It Works

Step 1:

Upload Your Resume

Step 2:

AI Builds Your Career Profile

Step 3:

Discover Your Career Opportunities

2. Features

- AI Resume Analysis

- Career Profile

- Skill Analysis

- Career Suggestions

- Personalized Roadmap

3. Trust/Security

Explain that users control their career data and that resumes are handled securely.

4. Final CTA

"Build Your Career Profile"

5. Footer

Include:

- Product

- Privacy

- Terms

- Contact

==================================================

2. SIGN UP PAGE

==================================================

Route:

/signup

Design a clean registration screen.

Fields:

- Full Name

- Email

- Password

- Confirm Password

Button:

"Create Account"

Include:

"Already have an account? Log in"

Prepare the UI so it can later connect to Supabase Authentication.

Do not implement authentication yet.

==================================================

3. LOGIN PAGE

==================================================

Route:

/login

Fields:

- Email

- Password

Buttons:

"Log In"

"Forgot Password?"

Link:

"Don't have an account? Create one"

Prepare for future Supabase authentication.

==================================================

4. DASHBOARD

==================================================

Route:

/dashboard

Create a professional SaaS dashboard.

Sidebar:

CareerPilot AI logo

Navigation:

- Dashboard

- My Resume

- Career Profile

- Career Suggestions

- Settings

At the bottom:

- User profile

- Logout

Main dashboard:

Header:

"Good morning, [User Name]"

Subtitle:

"Let's improve your career profile."

Cards:

Profile Completion

Example:

72%

Resume Score

Example:

78/100

Skills Identified

Example:

14

Career Suggestions

Example:

5

Then create:

"Your Career Profile"

Display:

- Professional Summary

- Top Skills

- Education

- Experience

- Projects

- Certifications

Create a "Complete Profile" button.

==================================================

5. RESUME UPLOAD PAGE

==================================================

Route:

/dashboard/resume

Create a large drag-and-drop upload area.

Text:

"Upload your resume"

"Upload PDF or DOCX"

"Maximum file size: 8 MB"

Button:

"Choose File"

Also allow drag and drop.

Show accepted formats:

PDF

DOCX

Before upload:

Show file information.

After upload:

Show:

Uploading...

Analyzing...

Analysis Complete

Use a progress indicator.

Do not actually implement file uploading yet.

Create a frontend service/API abstraction so the backend can later be connected without rebuilding the UI.

==================================================

6. RESUME ANALYSIS RESULT

==================================================

Route:

/dashboard/resume/analysis

Create a professional results dashboard.

Header:

"Your Resume Analysis"

Show:

Resume Score

78/100

Use a visual circular or horizontal score indicator.

Sections:

Professional Summary

Top Skills

Weak Areas

Education

Experience

Projects

Certifications

Career Suggestions

Resume Improvement Suggestions

Create expandable cards where appropriate.

Each section should have clean visual hierarchy.

==================================================

7. CAREER PROFILE

==================================================

Route:

/dashboard/profile

Create an editable career profile.

Sections:

Personal Information

Education

Skills

Experience

Projects

Certifications

Languages

Career Interests

Each section has:

"Edit"

button.

Use forms and modal/drawer interfaces for editing.

Do not implement database functionality yet.

Use local mock state only for the frontend demonstration.

==================================================

8. SETTINGS

==================================================

Route:

/dashboard/settings

Sections:

Profile

Account

Privacy

Notifications

Appearance

Security

Include:

Dark Mode toggle

Delete Account button

Do not implement account deletion yet.

==================================================

9. RESPONSIVE DESIGN

==================================================

The application must work properly on:

Desktop

Laptop

Tablet

Mobile

Desktop:

Use sidebar navigation.

Mobile:

Use a hamburger menu / mobile navigation.

Cards should resize properly.

No horizontal scrolling.

==================================================

10. COMPONENT ARCHITECTURE

==================================================

Create reusable components:

Button

Card

Input

Modal

Badge

ProgressBar

ScoreCard

Sidebar

Navbar

ResumeUploader

ProfileSection

SkillBadge

DashboardCard

LoadingState

EmptyState

ErrorState

Toast

FileUploadProgress

Avoid duplicating components.

==================================================

11. MOCK DATA

==================================================

Since the backend is not being built yet, create clearly separated mock data.

Create realistic example data for:

Candidate profile

Resume analysis

Skills

Education

Experience

Career suggestions

IMPORTANT:

Clearly label mock/demo data in the code.

Do not hardcode fake data throughout individual UI components.

Create a central mock-data file.

==================================================

12. API ARCHITECTURE

==================================================

Create a frontend API service layer.

For example:

services/api.ts

Create placeholder functions:

uploadResume()

getProfile()

updateProfile()

getResumeAnalysis()

These functions should be structured so they can later call:

NEXT_PUBLIC_API_URL

Do not put API calls directly inside UI components.

Example architecture:

components

↓

hooks

↓

services/api.ts

↓

FastAPI backend

==================================================

13. STATES

==================================================

Every major page should support:

Loading state

Success state

Empty state

Error state

For example, resume analysis should have:

Uploading

Analyzing

Success

Error

==================================================

14. UX REQUIREMENTS

==================================================

Make the experience extremely simple.

A new user should understand what to do immediately.

Primary onboarding flow:

Signup

↓

Dashboard

↓

Upload Resume

↓

AI Analysis

↓

Career Profile

Use clear CTA buttons.

Do not overload the user with information.

==================================================

15. IMPORTANT FUTURE ARCHITECTURE

==================================================

The frontend must be designed so future features can be added without redesigning the entire application.

Future modules will include:

- Job Matching Agent

- Career Coach Agent

- Mock Interview Agent

- Recruiter Dashboard

- Recruiter Agent

- Email Agent

- Application Agent

Do not implement these now.

However, structure the sidebar/navigation so these can be added later.

==================================================

16. ACCESSIBILITY

==================================================

Use:

- Semantic HTML

- Proper labels

- Keyboard navigation

- Accessible buttons

- Accessible forms

- Good contrast

- Appropriate ARIA attributes where needed

==================================================

17. PERFORMANCE

==================================================

Use:

- Next.js best practices

- Lazy loading where appropriate

- Optimized images

- Avoid unnecessary client-side rendering

- Avoid unnecessary dependencies

==================================================

18. FINAL REQUIREMENT

==================================================

Build the complete frontend and make sure every route works.

Do NOT:

- Build backend functionality

- Create API keys

- Implement OpenAI

- Implement Supabase

- Implement real authentication

- Implement real file storage

- Implement job matching

- Implement recruiter features

Those will be connected later.

At the end, provide:

1. Complete project structure

2. List of routes

3. List of reusable components

4. List of mock data

5. Instructions for running the frontend locally

6. Explanation of where the FastAPI backend will later connect

7. Explanation of where Supabase authentication will later connect

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://careerpilot-ai-frontend.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0a07713-3432-4353-8f81-1ba2b0abd121).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

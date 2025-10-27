# Developer Portfolio Website

![App Preview](https://imgix.cosmicjs.com/46b919c0-b38a-11f0-8dcc-651091f6a7c0-photo-1557821552-17105176677c-1761606690479.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, professional portfolio website built with Next.js 16 that showcases your development expertise through dynamic content management powered by Cosmic CMS. Features your projects, skills, work experience, and client testimonials in a beautiful, responsive design.

## Features

- 🚀 **Dynamic Content Management** - All content pulled from Cosmic CMS for easy updates
- 💼 **Project Showcase** - Featured projects with images, descriptions, tech stacks, and live links
- 🎯 **Skills Matrix** - Organized by category with proficiency levels and icons
- 📊 **Career Timeline** - Professional work experience with company logos and achievements
- ⭐ **Client Testimonials** - Star ratings and feedback linked to related projects
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI** - Clean design with smooth animations and transitions
- ⚡ **Server-Side Rendering** - Fast page loads with SEO optimization
- 🔍 **TypeScript** - Full type safety throughout the application

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68fffba74787b82c9d3713bb&clone_repository=68fffd134787b82c9d3713ee)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a web developer portfolio with projects, skills, work experience, and testimonials"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Runtime**: Bun
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with your content bucket

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Projects with Related Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all projects with depth for related objects
const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Skills by Category

```typescript
// Fetch all skills
const { objects: skills } = await cosmic.objects
  .find({ type: 'skills' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Group by category in your component
const skillsByCategory = skills.reduce((acc, skill) => {
  const category = skill.metadata?.category?.key || 'other'
  if (!acc[category]) acc[category] = []
  acc[category].push(skill)
  return acc
}, {})
```

### Fetching Work Experience with Sorting

```typescript
// Fetch work experience and sort by date
const { objects: experience } = await cosmic.objects
  .find({ type: 'work-experience' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Sort by start date (newest first)
const sortedExperience = experience.sort((a, b) => {
  const dateA = new Date(a.metadata?.start_date || '').getTime()
  const dateB = new Date(b.metadata?.start_date || '').getTime()
  return dateB - dateA
})
```

## Cosmic CMS Integration

This application uses the Cosmic SDK to fetch content from your bucket. The content model includes:

### Projects
- Project name, description, and technologies
- Featured image and screenshots
- Live URL and GitHub repository links
- Featured flag for highlighting top projects

### Skills
- Skill name with icon
- Category (Frontend, Backend, Database, Tools & DevOps)
- Proficiency level (Beginner, Intermediate, Advanced, Expert)

### Work Experience
- Job title and company information
- Company logo and location
- Start/end dates with current employment flag
- Detailed descriptions and achievements in Markdown

### Testimonials
- Client name, role, and company
- Client photo and testimonial text
- Star rating (3-5 stars)
- Related project reference

All content is fetched server-side for optimal performance and SEO.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in the Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

The site will automatically redeploy when you push changes to your repository.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx    # Individual project pages
│   └── globals.css         # Global styles
├── components/
│   ├── CosmicBadge.tsx     # Built with Cosmic badge
│   ├── ProjectCard.tsx     # Project display component
│   ├── SkillCard.tsx       # Skill display component
│   ├── ExperienceCard.tsx  # Work experience component
│   └── TestimonialCard.tsx # Testimonial component
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
├── types.ts                # TypeScript type definitions
└── public/
    └── dashboard-console-capture.js  # Console logging for dashboard
```

## License

MIT

<!-- README_END -->
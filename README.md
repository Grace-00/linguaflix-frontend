## Linguaflix 🚀 - ongoing project

Linguaflix is a language learning web app designed to immerse users in real language usage by leveraging TV shows and their subtitles. With a focus on personalized and engaging content, users can search for their favorite TV shows, receive meaningful and practical language snippets, and integrate learning with shows they already enjoy. This README provides a comprehensive overview of Linguaflix's technical structure, tech stack decisions, and guiding principles.

## Project Overview

Linguaflix combines language learning with entertainment by allowing users to search for TV shows and receive subtitle snippets that facilitate learning in real-world contexts.
These snippets are received via email and their are random sentences taken from a random episode of the selected tv show. Along with it, users also receive a translation of the snippet in their native language.
The project has been deployed as a frontend-backend split with Vercel hosting the frontend and Render hosting the backend. The frontend is built with Next.js (using the App Router), React, and Tailwind CSS for styling. The backend is a REST API that communicates with the frontend and serves subtitle data, while MySQL on Aiven handles persistent data storage, interfaced with Prisma ORM.

## Key Features and Implementation

1. User Interface & Frontend
   The frontend is built with Next.js 14, utilizing the App Router for routing and React for UI management. The interface allows users to:

- Search for TV shows through an input field with autosuggestions powered by TMDB's API.
- Receive random snippets from the subtitles, which include real-world language use, based on the proficiency level in their target language (beginner or intermediate).
- Experience a responsive UI both for browsers and mobile, designed with Tailwind CSS, and enhanced with ShadCN components for consistency and performance.

Search Form and Autosuggestions  

- Search Logic: When users type in the search bar, the input field shows autosuggestions from the TMDB API. API calls are minimised through debouncing. On submit, shows that lack subtitles prompt an appropriate message to inform users of content availability.
  
- Input Handling: The search bar uses ShadCN’s Input component, with custom logic in fetchShows to fetch TV show names. If no subtitles are available for a show, an informative message is displayed on submit.

- Customized Learning Content: By focusing on TV shows the user is interested in, Linguaflix offers users language practice with content they’re likely familiar with or interested in, enhancing engagement and relevancy.

2. Backend Structure
   The backend is hosted on Render, separated from the frontend repository to accommodate dedicated API routes and subtitle management. It operates on port 5001 and listens for requests from the frontend, managing form and email submission, adding a new user or new content for an existing one, and translating sentences.

## Tech Stack

Frontend:
Next.js 14 (App Router)
React
Tailwind CSS for styling
ShadCN UI for component consistency

Backend:
Node.js for the server environment
Prisma ORM with MySQL on Aiven
REST API design hosted on Render

APIs:
TMDB API for fetching TV shows
Deepl API for translation
Mailjet for email submission

Deployment:
Vercel (frontend)
Render (backend)

Libraries:

- Compromise is an NLP library that handles setting the sentence complexity level thanks to POS tagging: by determining a maximum set of parts of speech length and complex words per proficiency level, the algorithm determines whether a sentence is beginner or intermediate level.
- Deepl-node is the npm package that handles the translation.

## Decisions and future considerations

- Subtitle File Storage: Subtitle files are currently stored in the backend repository to keep the management of .srt files simple and focused. However, as the app scales, storing large numbers of subtitle files locally may become limiting. For scalability purposes, subtitle storage could be migrated to cloud-based storage solutions, such as AWS S3.
- TMDB API Hosting in Next.js API Folder: Currently, the TMDB API is implemented in the Next.js api folder rather than the backend server for quicker experimentation and testing.
- For now the submission form works with English as target language as the only subtitles available are in that language. Stay tuned for future expansion! 🚀

## How to start this project locally

- cd BE
- cd FE
- npm run dev within both folders

## How to test the deployed app

Check out [linguaflix](https://linguaflix-frontend.vercel.app/)

## Linguaflix submission form

<img width="487" alt="Screenshot 2024-10-31 at 12 57 00" src="https://github.com/user-attachments/assets/74e293b3-fa62-4d81-9b8d-d8994ec4dcae">

## Example of received email of a user with English as target language and Italian as native language :)

<img width="1008" alt="Screenshot 2024-10-31 at 13 04 22" src="https://github.com/user-attachments/assets/a83f1259-7171-4da8-992e-a2e4738aaad0">

## Getting Started

Fill in values in env file with correct values.

1. `docker build -t nextjs-docker .`
2. `docker run -p 3000:3000 nextjs-docker`

Open Chrome incognito window. After logging in, open dev tools and go to application and `clear site data`. Then refresh the page and you should get a 500. 

## Notes
If you go to `app/api/auth/[auth0]/route.ts` we have commented lines `13` and `16`. If you uncomment those lines and you should see the issue go away. 
# Railway Deployment Guide

This guide will help you deploy your React frontend to Railway.

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. Git repository pushed to GitHub/GitLab/Bitbucket
3. Backend API already deployed (or ready to deploy)

## Deployment Steps

### 1. Prepare Your Repository

Make sure your code is committed and pushed to your git repository:

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Create New Project on Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your repositories
5. Select your frontend repository

### 3. Configure Environment Variables

In the Railway dashboard for your project:

1. Click on your service
2. Go to "Variables" tab
3. Add the following environment variable:

```
VITE_API_BASE_URL=https://your-backend-api.railway.app
```

**Important:** Replace `https://your-backend-api.railway.app` with your actual backend API URL.

If you don't have your backend deployed yet, you can:
- Deploy your backend first on Railway
- Use the Railway-provided URL for your backend
- Come back and update this variable

### 4. Deploy

Railway will automatically:
- Detect it's a Node.js project
- Run `npm install && npm run build`
- Start the app with `npm start`
- Assign a public URL

### 5. Access Your Application

Once deployed:
1. Railway will provide a public URL (e.g., `https://your-app.railway.app`)
2. Click on the URL to open your deployed frontend
3. Your app should now be live!

## Configuration Files

This project includes:

- `railway.json` - Railway configuration file
- `.env.example` - Environment variables template
- `package.json` - Updated with `start` script for production

## Troubleshooting

### Build Fails

- Check the build logs in Railway dashboard
- Ensure all dependencies are listed in `package.json`
- Verify TypeScript compilation passes locally: `npm run build`

### App Won't Start

- Check that `npm start` works locally
- Verify PORT is not hardcoded (Railway sets PORT automatically)
- Check Railway logs for errors

### API Connection Issues

- Verify `VITE_API_BASE_URL` is set correctly in Railway
- Check backend allows CORS from your frontend domain
- Ensure backend is accessible at the URL you provided

### Environment Variables Not Working

- Remember: Vite requires env vars to start with `VITE_`
- Rebuild after changing environment variables
- Check that you're using `import.meta.env.VITE_*` in code

## Backend Deployment

If you haven't deployed your backend yet, you'll need to:

1. Create another Railway project for your backend
2. Configure backend environment variables (database, JWT secret, etc.)
3. Update CORS settings to allow your frontend domain
4. Copy the backend URL and set it as `VITE_API_BASE_URL` in frontend

## Custom Domain (Optional)

To use a custom domain:

1. Go to your Railway project settings
2. Click "Domains"
3. Add your custom domain
4. Update your DNS records as instructed by Railway

## Continuous Deployment

Railway automatically redeploys when you push to your connected branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Railway will detect the push and redeploy automatically!

## Cost

Railway offers:
- $5 free credit per month
- Pay-as-you-go pricing after free tier
- Starter plan: $5/month for more resources

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app

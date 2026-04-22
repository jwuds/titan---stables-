
# Titan Stables - Deployment Guide

**Complete deployment guide for production deployment to Vercel with Supabase backend.**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Supabase Setup](#supabase-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Environment Variables](#environment-variables)
6. [Build Verification](#build-verification)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Troubleshooting](#troubleshooting)
9. [Rollback Procedure](#rollback-procedure)

---

## Prerequisites

Before deploying, ensure you have:

- **Node.js 18.x or higher** installed ([Download](https://nodejs.org/))
- **npm 9.x or higher** (comes with Node.js)
- **Git** installed and configured
- **GitHub account** with repository access
- **Vercel account** ([Sign up](https://vercel.com/signup))
- **Supabase account** ([Sign up](https://supabase.com/dashboard))
- **Custom domain** (optional but recommended)

---

## Local Development Setup

### 1. Clone Repository

\`\`\`bash
git clone https://github.com/your-org/titan-stables.git
cd titan-stables
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

**Expected output**: All packages installed without errors or peer dependency warnings.

### 3. Configure Environment Variables

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your Supabase credentials:

\`\`\`env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_DOMAIN=http://localhost:3000
\`\`\`

**See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed instructions.**

### 4. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

**Expected output**: Server running at `http://localhost:3000`

### 5. Verify Local Setup

Open browser and test:
- ✅ Homepage loads without errors
- ✅ Navigation works correctly
- ✅ Supabase connection established (check console)
- ✅ Images load correctly
- ✅ Forms work without errors

---

## Supabase Setup

**Detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

### Quick Setup:

1. **Create Supabase Project**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Click "New Project"
   - Choose organization and name project
   - Set strong database password
   - Select region closest to users
   - Wait for project to initialize (~2 minutes)

2. **Get API Credentials**
   - Navigate to Settings → API
   - Copy **Project URL** (VITE_SUPABASE_URL)
   - Copy **anon/public** key (VITE_SUPABASE_ANON_KEY)
   - **NEVER** expose service_role key to client!

3. **Configure Database** (if needed)
   - Run SQL migrations in SQL Editor
   - Set up Row Level Security (RLS) policies
   - Configure storage buckets

4. **Test Connection**
   \`\`\`bash
   npm run dev
   \`\`\`
   Check browser console for Supabase connection confirmation.

---

## Vercel Deployment

**Detailed instructions in [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**

### Step-by-Step Deployment:

### 1. Push Code to GitHub

\`\`\`bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
\`\`\`

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose your GitHub repository
5. Click **"Import"**

### 3. Configure Build Settings

Vercel auto-detects Vite projects, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x

### 4. Add Environment Variables

In Vercel project settings:

1. Go to **Settings → Environment Variables**
2. Add each variable:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_SUPABASE_URL` | https://your-project-id.supabase.co | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | your-anon-key | Production, Preview, Development |
| `VITE_DOMAIN` | https://titanstables.org | Production |
| `VITE_DOMAIN` | https://preview.titanstables.org | Preview |

**Important**: 
- Check **"Production"**, **"Preview"**, and **"Development"** for each variable
- Never add `service_role` key to Vercel - only use in Supabase Edge Functions

### 5. Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Check build logs for errors
4. Verify deployment at generated Vercel URL

### 6. Add Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Click **"Add Domain"**
3. Enter `titanstables.org`
4. Follow DNS configuration instructions
5. Wait for DNS propagation (~5-10 minutes)
6. Verify HTTPS certificate is issued

---

## Environment Variables

**Complete guide: [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)**

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `VITE_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase public key | Supabase Dashboard → Settings → API |
| `VITE_DOMAIN` | Your production domain | Your domain registrar |

### Setting Variables Locally

\`\`\`bash
# Create .env file
cp .env.example .env

# Edit .env
nano .env
\`\`\`

### Setting Variables in Vercel

1. Navigate to project in Vercel Dashboard
2. Go to **Settings → Environment Variables**
3. Add each variable
4. Select environments (Production, Preview, Development)
5. Click **"Save"**
6. **Redeploy** to apply changes

---

## Build Verification

### Before Deploying:

### 1. Clean Install

\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### 2. Build Locally

\`\`\`bash
npm run build
\`\`\`

**Expected output**:
- ✅ Build completes without errors
- ✅ No TypeScript errors
- ✅ No ESLint errors
- ✅ Output in `dist/` directory
- ✅ Assets properly hashed

### 3. Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

**Test checklist**:
- ✅ All routes load correctly
- ✅ Images load without errors
- ✅ Forms submit successfully
- ✅ Supabase queries work
- ✅ Authentication works
- ✅ Admin routes are protected
- ✅ 404 page displays correctly
- ✅ No console errors

### 4. Check Bundle Size

\`\`\`bash
npm run build
\`\`\`

Review output:
- Main bundle should be < 500KB
- Vendor chunks properly split
- Assets properly optimized

---

## Post-Deployment Verification

### After Vercel Deployment:

### 1. Verify Deployment URL

Visit your Vercel deployment URL (e.g., `https://your-project.vercel.app`)

### 2. Test Critical Paths

- ✅ Homepage loads correctly
- ✅ Navigation works
- ✅ All major pages load
- ✅ Forms submit without errors
- ✅ Images load correctly
- ✅ Supabase connection works
- ✅ Admin login works
- ✅ Protected routes require auth

### 3. Check Browser Console

Open DevTools Console:
- ✅ No JavaScript errors
- ✅ No failed network requests
- ✅ No CORS errors
- ✅ Supabase initialized correctly

### 4. Test on Mobile Devices

- ✅ Responsive design works
- ✅ Touch interactions work
- ✅ Forms are usable on mobile
- ✅ Images load correctly

### 5. Verify Custom Domain (if configured)

- ✅ Domain resolves correctly
- ✅ HTTPS certificate is valid
- ✅ www redirect works (if configured)
- ✅ All pages accessible via custom domain

### 6. Check Vercel Logs

In Vercel Dashboard:
1. Go to project
2. Click **"Deployments"**
3. Select latest deployment
4. Check **"Build Logs"** and **"Function Logs"**
5. Verify no errors or warnings

---

## Troubleshooting

**Complete guide: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

### Common Issues:

### Build Fails

**Error**: `Module not found` or `Cannot find module`

**Solution**:
1. Check import paths use `@/` alias correctly
2. Verify file exists at import path
3. Check file extension (.jsx, .js)
4. Run `npm install` to ensure dependencies installed

### Supabase Connection Fails

**Error**: `Failed to initialize Supabase client`

**Solution**:
1. Verify `VITE_SUPABASE_URL` is set correctly
2. Verify `VITE_SUPABASE_ANON_KEY` is set correctly
3. Check Supabase project is active
4. Verify environment variables in Vercel dashboard

### 404 on Page Refresh

**Error**: Vercel returns 404 when refreshing on route

**Solution**:
- Verify `vercel.json` has rewrite rule:
\`\`\`json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
\`\`\`

### Images Not Loading

**Error**: Images return 403 or 404

**Solution**:
1. Check Supabase Storage bucket is public
2. Verify image URLs are correct
3. Check RLS policies allow public access
4. Verify CORS settings in Supabase

### Build Succeeds but Site Broken

**Issue**: Build completes but site doesn't work

**Solution**:
1. Check browser console for errors
2. Verify environment variables are set in Vercel
3. Check Vercel function logs for errors
4. Test locally with `npm run build && npm run preview`

---

## Rollback Procedure

### If Deployment Fails:

### 1. Immediate Rollback in Vercel

1. Go to Vercel Dashboard → **Deployments**
2. Find last working deployment
3. Click **"..."** → **"Promote to Production"**
4. Confirm rollback

### 2. Rollback via Git

\`\`\`bash
# Revert to last working commit
git revert HEAD

# Push to trigger new deployment
git push origin main
\`\`\`

### 3. Verify Rollback

- Test production URL
- Check all critical functionality works
- Monitor Vercel logs for errors

---

## Deployment Checklist

### Pre-Deployment:

- [ ] All code changes committed and pushed to GitHub
- [ ] `npm run build` completes without errors locally
- [ ] `npm run preview` works correctly locally
- [ ] All environment variables documented in `.env.example`
- [ ] No sensitive data in source code
- [ ] No console.log statements in production code
- [ ] All TODO/FIXME comments addressed or documented
- [ ] Supabase project active and configured
- [ ] Database migrations completed (if any)
- [ ] Storage buckets configured correctly

### Deployment:

- [ ] Vercel project created and connected to GitHub
- [ ] Build settings configured correctly
- [ ] All environment variables added in Vercel
- [ ] Custom domain added (if applicable)
- [ ] DNS configured correctly (if custom domain)
- [ ] Build completes successfully in Vercel
- [ ] No errors in build logs

### Post-Deployment:

- [ ] Production URL accessible
- [ ] Homepage loads correctly
- [ ] All major routes work
- [ ] Forms submit successfully
- [ ] Images load correctly
- [ ] Supabase queries work
- [ ] Authentication works
- [ ] Admin routes protected
- [ ] No errors in browser console
- [ ] No errors in Vercel logs
- [ ] Custom domain works (if configured)
- [ ] HTTPS certificate valid
- [ ] Tested on mobile devices
- [ ] Performance acceptable (Lighthouse score > 90)

---

## Support

### Getting Help:

1. **Check documentation**:
   - [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
   - [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
   - [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

2. **Check logs**:
   - Browser console (F12)
   - Vercel deployment logs
   - Vercel function logs
   - Supabase logs

3. **Contact support**:
   - Vercel: [vercel.com/support](https://vercel.com/support)
   - Supabase: [supabase.com/support](https://supabase.com/support)

---

## Maintenance

### Regular Tasks:

- **Weekly**: Check Vercel logs for errors
- **Monthly**: Update dependencies (`npm outdated`, `npm update`)
- **Quarterly**: Review and rotate Supabase keys
- **Annually**: Renew custom domain (if applicable)

### Monitoring:

- Set up Vercel Analytics (included with Pro plan)
- Monitor Supabase usage and quotas
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor Core Web Vitals

---

**Last Updated**: 2026-04-22  
**Deployment Platform**: Vercel  
**Backend**: Supabase  
**Framework**: Vite + React

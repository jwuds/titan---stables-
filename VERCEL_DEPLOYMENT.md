
# Vercel Deployment Guide

**Step-by-step guide for deploying Titan Stables to Vercel.**

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub repository with latest code pushed
- ✅ Vercel account ([Sign up](https://vercel.com/signup))
- ✅ Supabase project configured ([See SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
- ✅ Environment variables ready ([See ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md))
- ✅ Local build tested successfully (`npm run build`)

---

## Step 1: Push Code to GitHub

### 1. Verify all changes committed

\`\`\`bash
git status
\`\`\`

**Expected output**: "nothing to commit, working tree clean"

### 2. Commit any pending changes

\`\`\`bash
git add .
git commit -m "Prepare for production deployment"
\`\`\`

### 3. Push to main branch

\`\`\`bash
git push origin main
\`\`\`

### 4. Verify push succeeded

Go to your GitHub repository and verify latest commit is visible.

---

## Step 2: Import Project to Vercel

### 1. Log in to Vercel

Go to [Vercel Dashboard](https://vercel.com/dashboard)

### 2. Create new project

Click **"Add New..."** → **"Project"**

### 3. Import Git repository

1. If first time, click **"Install"** next to GitHub
2. Authorize Vercel to access your repositories
3. Select **"titan-stables"** repository
4. Click **"Import"**

---

## Step 3: Configure Build Settings

Vercel auto-detects Vite, but verify settings:

### Framework Preset
- **Detected**: Vite
- **Action**: Leave as default

### Root Directory
- **Value**: `./`
- **Action**: Leave blank (uses repository root)

### Build Command
- **Value**: `npm run build`
- **Action**: Leave as default

### Output Directory
- **Value**: `dist`
- **Action**: Leave as default

### Install Command
- **Value**: `npm install`
- **Action**: Leave as default

### Node.js Version
- **Value**: 18.x
- **Action**: Verify this is selected

---

## Step 4: Add Environment Variables

### 1. Navigate to Environment Variables

Before clicking "Deploy", expand **"Environment Variables"** section

### 2. Add VITE_SUPABASE_URL

- **Key**: `VITE_SUPABASE_URL`
- **Value**: Your Supabase project URL (e.g., `https://abcdefg.supabase.co`)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **"Add"**

### 3. Add VITE_SUPABASE_ANON_KEY

- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anon/public key
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **"Add"**

### 4. Add VITE_DOMAIN

- **Key**: `VITE_DOMAIN`
- **Value**: `https://titanstables.org` (your custom domain)
- **Environments**: ✅ Production only
- Click **"Add"**

### 5. Verify all variables added

You should see 3 environment variables listed before deploying.

---

## Step 5: Deploy

### 1. Click "Deploy"

Vercel will:
1. Install dependencies
2. Run build command
3. Deploy to CDN
4. Generate deployment URL

**Expected time**: 2-3 minutes

### 2. Monitor build logs

Watch for:
- ✅ "Installing dependencies..."
- ✅ "Running build command..."
- ✅ "Build completed successfully"
- ✅ "Deployment ready"

### 3. Check for errors

If build fails:
1. Click **"View Build Logs"**
2. Identify error message
3. Fix issue in code
4. Commit and push
5. Vercel automatically redeploys

---

## Step 6: Verify Deployment

### 1. Get deployment URL

After successful deployment, Vercel provides a URL:
- **Format**: `https://titan-stables-xyz123.vercel.app`
- Click URL to open in browser

### 2. Test deployment

Open deployment URL and verify:
- ✅ Homepage loads correctly
- ✅ All images load
- ✅ Navigation works
- ✅ Forms work
- ✅ No console errors (F12)
- ✅ Supabase connection works
- ✅ Admin login works

### 3. Check browser console

Press F12 → Console tab:
- ✅ No JavaScript errors
- ✅ No failed network requests
- ✅ Supabase client initialized
- ✅ No CORS errors

---

## Step 7: Add Custom Domain (Optional)

### 1. Navigate to Domains

1. In Vercel project, click **"Settings"**
2. Click **"Domains"** in sidebar

### 2. Add domain

1. Click **"Add"**
2. Enter your domain: `titanstables.org`
3. Click **"Add"**

### 3. Configure DNS

Vercel shows DNS instructions. Add records to your domain registrar:

**For root domain (titanstables.org)**:
- **Type**: A
- **Name**: @
- **Value**: 76.76.21.21

**For www subdomain (www.titanstables.org)**:
- **Type**: CNAME
- **Name**: www
- **Value**: cname.vercel-dns.com

### 4. Wait for verification

- DNS propagation: 5-10 minutes (can take up to 48 hours)
- SSL certificate: Automatic (Let's Encrypt)
- Vercel shows ✅ when domain is active

### 5. Set as primary domain

1. Click **"..."** next to your custom domain
2. Click **"Set as Primary Domain"**
3. Vercel automatically redirects vercel.app URL to custom domain

---

## Step 8: Production Configuration

### Configure production settings

1. Go to **Settings** → **General**
2. Verify:
   - **Node.js Version**: 18.x
   - **Build & Output Settings**: Match vite.config.js
   - **Root Directory**: ./ (blank)

### Set up preview deployments

Vercel automatically creates preview deployments for:
- Pull requests
- Non-main branches

Configure in **Settings** → **Git**:
- ✅ Production Branch: `main`
- ✅ Preview Deployments: Enabled

---

## Step 9: Post-Deployment Verification

### Complete verification checklist

**Functionality**:
- [ ] Homepage loads without errors
- [ ] All routes work correctly
- [ ] Images load from Supabase Storage
- [ ] Forms submit successfully
- [ ] Supabase queries work
- [ ] Authentication works
- [ ] Admin routes are protected
- [ ] 404 page displays correctly

**Performance**:
- [ ] Page load time < 3 seconds
- [ ] Images optimized and lazy loaded
- [ ] No console errors or warnings
- [ ] Lighthouse score > 90

**Security**:
- [ ] HTTPS enabled (automatic)
- [ ] Security headers present
- [ ] No exposed API keys in client
- [ ] Admin routes require authentication

**SEO**:
- [ ] Meta tags present
- [ ] Open Graph tags present
- [ ] Sitemap accessible (/sitemap.xml)
- [ ] robots.txt accessible (/robots.txt)

---

## Automatic Deployments

### How it works

Vercel automatically deploys when:
1. You push to `main` branch → **Production deployment**
2. You create pull request → **Preview deployment**
3. You push to other branches → **Preview deployment**

### Manual deployments

To manually trigger deployment:

**From Vercel Dashboard**:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on any deployment
3. Select **"Use existing build cache"** or **"Rebuild"**

**From Git**:
\`\`\`bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
\`\`\`

---

## Monitoring & Logs

### View deployment logs

1. Go to **Deployments** tab
2. Click on deployment
3. View:
   - **Build Logs**: Build process output
   - **Function Logs**: Runtime errors
   - **Static Logs**: Asset serving logs

### Set up monitoring

**Vercel Analytics** (optional, paid):
1. Go to **Analytics** tab
2. Click **"Enable Analytics"**
3. Monitor:
   - Page views
   - Top pages
   - Top referrers
   - Core Web Vitals

---

## Rollback Procedure

### Rollback to previous deployment

1. Go to **Deployments** tab
2. Find last working deployment
3. Click **"..."** → **"Promote to Production"**
4. Confirm rollback
5. Verify production site works

### Rollback via Git

\`\`\`bash
# Find commit to revert to
git log --oneline

# Revert to specific commit
git revert HEAD
# or
git reset --hard <commit-hash>

# Push to trigger new deployment
git push origin main --force
\`\`\`

---

## Common Deployment Issues

### Build fails with "Module not found"

**Solution**:
1. Verify import paths use `@/` alias
2. Check file exists at import path
3. Verify file extension (.jsx, .js)
4. Run `npm install` locally and test

### Environment variables not working

**Solution**:
1. Verify variables added in Vercel dashboard
2. Verify variable names have `VITE_` prefix
3. Redeploy after adding variables
4. Check build logs for environment variable errors

### 404 on page refresh

**Solution**:
- Verify `vercel.json` has rewrite rule (already configured)
- Check Vercel detected framework as Vite
- Verify SPA fallback is enabled

### Images not loading

**Solution**:
1. Check Supabase Storage bucket is public
2. Verify image URLs are correct
3. Check CORS settings in Supabase
4. Verify storage bucket policies

---

## Deployment Checklist

### Pre-Deployment:
- [ ] Code pushed to GitHub main branch
- [ ] `npm run build` works locally
- [ ] `npm run preview` tested locally
- [ ] Environment variables documented
- [ ] Supabase project configured
- [ ] No sensitive data in code

### Deployment:
- [ ] Vercel project created
- [ ] Repository connected
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Initial deployment successful
- [ ] No build errors or warnings

### Post-Deployment:
- [ ] Production URL accessible
- [ ] All routes work
- [ ] Supabase connection works
- [ ] Forms submit successfully
- [ ] Images load correctly
- [ ] No console errors
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Tested on mobile devices

---

## Support

**Vercel Documentation**:
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment Guide](https://vercel.com/docs/frameworks/vite)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

**Get Help**:
- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- Check deployment logs in Vercel dashboard

---

**Last Updated**: 2026-04-22  
**Platform**: Vercel  
**Framework**: Vite + React

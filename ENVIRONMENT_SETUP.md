
# Environment Variables Setup Guide

**Complete guide for configuring environment variables for Titan Stables application.**

---

## 📋 Overview

This application uses environment variables to configure:
- Supabase backend connection
- Domain configuration
- Feature flags
- Third-party API integrations

**Important**: All client-side environment variables MUST start with `VITE_` prefix.

---

## Required Environment Variables

### 1. VITE_SUPABASE_URL

**Description**: Your Supabase project URL  
**Type**: String (URL)  
**Required**: Yes  
**Example**: `https://abc defghijklmn.supabase.co`

**Where to get**:
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Settings → API**
4. Copy **Project URL**

**Local (.env)**:
\`\`\`env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
\`\`\`

**Vercel**:
1. Go to project settings → Environment Variables
2. Add variable: `VITE_SUPABASE_URL`
3. Value: Your Supabase project URL
4. Select: Production, Preview, Development

---

### 2. VITE_SUPABASE_ANON_KEY

**Description**: Supabase public anonymous key  
**Type**: String (JWT)  
**Required**: Yes  
**Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Where to get**:
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Settings → API**
4. Copy **anon/public** key

**⚠️ Security Notes**:
- This key is safe to expose in client-side code
- Row Level Security (RLS) protects your data
- NEVER use `service_role` key in client code
- `service_role` key should ONLY be in Supabase Edge Functions

**Local (.env)**:
\`\`\`env
VITE_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

**Vercel**:
1. Go to project settings → Environment Variables
2. Add variable: `VITE_SUPABASE_ANON_KEY`
3. Value: Your Supabase anon key
4. Select: Production, Preview, Development

---

### 3. VITE_DOMAIN

**Description**: Your application's public domain  
**Type**: String (URL)  
**Required**: Yes  
**Example**: `https://titanstables.org`

**Where to get**: Your custom domain or Vercel deployment URL

**Local (.env)**:
\`\`\`env
VITE_DOMAIN=http://localhost:3000
\`\`\`

**Vercel Production**:
\`\`\`env
VITE_DOMAIN=https://titanstables.org
\`\`\`

**Vercel Preview**:
\`\`\`env
VITE_DOMAIN=https://preview.titanstables.org
\`\`\`

---

## Optional Environment Variables

### VITE_API_BASE_URL

**Description**: External API base URL (if using external APIs)  
**Type**: String (URL)  
**Required**: No  
**Example**: `https://api.example.com`

**When to use**:
- If you have external API integrations
- If using third-party services beyond Supabase

**Local (.env)**:
\`\`\`env
# VITE_API_BASE_URL=https://api.example.com
\`\`\`

---

### Feature Flags

**Description**: Enable/disable features per environment  
**Type**: Boolean (true/false)  
**Required**: No

**Examples**:
\`\`\`env
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT=false
VITE_ENABLE_DEBUG_MODE=false
\`\`\`

---

## Setup Instructions

### Local Development

**1. Copy example file**:
\`\`\`bash
cp .env.example .env
\`\`\`

**2. Edit .env file**:
\`\`\`bash
nano .env
# or
code .env
\`\`\`

**3. Add your credentials**:
\`\`\`env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
VITE_DOMAIN=http://localhost:3000
\`\`\`

**4. Verify setup**:
\`\`\`bash
npm run dev
\`\`\`

Check browser console for:
- ✅ "Supabase client initialized successfully"
- ✅ No connection errors

---

### Vercel Deployment

**1. Navigate to project settings**:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**

**2. Add each variable**:

| Variable Name | Value | Environments |
|---------------|-------|--------------|
| `VITE_SUPABASE_URL` | https://your-id.supabase.co | ✅ Production<br>✅ Preview<br>✅ Development |
| `VITE_SUPABASE_ANON_KEY` | your-anon-key | ✅ Production<br>✅ Preview<br>✅ Development |
| `VITE_DOMAIN` | https://titanstables.org | ✅ Production only |
| `VITE_DOMAIN` | https://preview.yourdomain.com | ✅ Preview only |

**3. Save and redeploy**:
- Vercel automatically redeploys when environment variables change
- Or manually trigger deployment from Deployments tab

---

## Verification

### Verify Local Setup

**1. Start development server**:
\`\`\`bash
npm run dev
\`\`\`

**2. Open browser console** (F12)

**3. Check for**:
- ✅ "Supabase client initialized"
- ✅ No environment variable errors
- ✅ No connection errors

**4. Test Supabase connection**:
- Try logging in (if auth implemented)
- Try fetching data from database
- Check browser Network tab for Supabase requests

---

### Verify Vercel Setup

**1. After deployment**, visit your Vercel URL

**2. Open browser console** (F12)

**3. Check for**:
- ✅ "Supabase client initialized"
- ✅ No environment variable errors
- ✅ No connection errors

**4. Check Vercel logs**:
1. Go to Vercel Dashboard
2. Select deployment
3. Click **"Function Logs"**
4. Verify no errors related to environment variables

---

## Security Best Practices

### ✅ DO:
- Use `.env` for local development
- Use Vercel dashboard for production variables
- Add `.env` to `.gitignore`
- Use `VITE_` prefix for client-side variables
- Rotate keys regularly (quarterly)
- Use different keys for development/staging/production

### ❌ DON'T:
- Commit `.env` files to git
- Use `service_role` key in client code
- Hardcode credentials in source code
- Share environment variables publicly
- Use production keys in development
- Store sensitive keys in client-accessible variables

---

## Supabase Security Model

### Public vs Service Role Keys

**anon/public key** (`VITE_SUPABASE_ANON_KEY`):
- ✅ Safe to expose in client code
- ✅ Protected by Row Level Security (RLS)
- ✅ Limited to user-level permissions
- ✅ Used in browser/mobile apps

**service_role key** (NEVER in client):
- ❌ Bypasses all RLS policies
- ❌ Has full admin access to database
- ❌ Should ONLY be in Supabase Edge Functions
- ❌ NEVER expose to client code

---

## Common Issues

### Issue: "Failed to initialize Supabase client"

**Cause**: Missing or invalid environment variables

**Solution**:
1. Check `.env` file exists
2. Verify `VITE_SUPABASE_URL` is set correctly
3. Verify `VITE_SUPABASE_ANON_KEY` is set correctly
4. Restart dev server (`npm run dev`)
5. Clear browser cache and reload

---

### Issue: "Environment variables not loading in Vercel"

**Cause**: Variables not set in Vercel dashboard

**Solution**:
1. Go to Vercel project settings
2. Navigate to Environment Variables
3. Add missing variables
4. Select correct environments (Production/Preview/Development)
5. Redeploy application

---

### Issue: "CORS errors with Supabase"

**Cause**: Domain not configured in Supabase

**Solution**:
1. Go to Supabase Dashboard
2. Navigate to Settings → API
3. Add your domain to allowed origins
4. Wait 1-2 minutes for changes to propagate

---

## Environment Variable Checklist

### Before First Deployment:

- [ ] `.env.example` file created with all variables
- [ ] `.env` file created locally (not committed to git)
- [ ] `.gitignore` includes `.env` and `.env.local`
- [ ] `VITE_SUPABASE_URL` obtained from Supabase
- [ ] `VITE_SUPABASE_ANON_KEY` obtained from Supabase
- [ ] All variables added to Vercel dashboard
- [ ] Variables tested locally (`npm run dev` works)
- [ ] Variables tested in Vercel (deployment succeeds)
- [ ] No hardcoded credentials in source code
- [ ] Documentation updated with any new variables

---

## Example .env File

\`\`\`env
# =============================================================================
# TITAN STABLES - LOCAL DEVELOPMENT ENVIRONMENT
# =============================================================================

# Supabase Configuration
VITE_SUPABASE_URL=https://abcdefghijklmn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwMDAwMDAsImV4cCI6MTk5OTk5OTk5OX0.example-key

# Domain Configuration
VITE_DOMAIN=http://localhost:3000

# Feature Flags (Optional)
# VITE_ENABLE_ANALYTICS=false
# VITE_ENABLE_DEBUG_MODE=true
\`\`\`

---

## Support

**If you need help**:
1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
3. Review Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
4. Check Vercel deployment logs
5. Check browser console for errors

---

**Last Updated**: 2026-04-22  
**Platform**: Vercel + Supabase  
**Framework**: Vite + React

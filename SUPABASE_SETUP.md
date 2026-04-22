
# Supabase Setup Guide

**Complete guide for setting up Supabase backend for Titan Stables application.**

---

## 📋 Table of Contents

1. [Create Supabase Project](#create-supabase-project)
2. [Get API Credentials](#get-api-credentials)
3. [Database Setup](#database-setup)
4. [Row Level Security (RLS)](#row-level-security-rls)
5. [Storage Buckets](#storage-buckets)
6. [Edge Functions](#edge-functions)
7. [Testing Connection](#testing-connection)
8. [Security Best Practices](#security-best-practices)

---

## Create Supabase Project

### 1. Sign Up / Log In

Go to [Supabase Dashboard](https://app.supabase.com/)

- If new user, click **"Start your project"** and sign up
- If existing user, log in with your credentials

### 2. Create New Project

1. Click **"New Project"** button
2. Fill in project details:
   - **Name**: `titan-stables` (or your preferred name)
   - **Database Password**: Use a strong password (save this securely!)
   - **Region**: Select closest to your users (e.g., `us-east-1` for USA)
   - **Pricing Plan**: Free tier is sufficient to start

3. Click **"Create new project"**

4. Wait for initialization (~2 minutes)

---

## Get API Credentials

### 1. Navigate to API Settings

1. In Supabase Dashboard, select your project
2. Click **Settings** (gear icon in sidebar)
3. Click **API** in the settings menu

### 2. Copy Required Credentials

You need TWO keys from this page:

#### Project URL
- **Label**: "URL"
- **Example**: `https://abcdefghijklmn.supabase.co`
- **Use**: Set as `VITE_SUPABASE_URL` in your environment

#### anon/public Key
- **Label**: "anon" or "anon public"
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Use**: Set as `VITE_SUPABASE_ANON_KEY` in your environment
- **Security**: Safe to expose in client-side code

#### ⚠️ service_role Key
- **Label**: "service_role"
- **WARNING**: NEVER expose this key in client code!
- **Use**: Only in Supabase Edge Functions (server-side)
- **Security**: Bypasses all Row Level Security policies

### 3. Save Credentials

**Local Development**:
Add to `.env` file:
\`\`\`env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

**Vercel Production**:
Add in Vercel Dashboard → Settings → Environment Variables

---

## Database Setup

### Current Database Schema

The application already has database tables created. Verify they exist:

1. In Supabase Dashboard, click **Table Editor**
2. Verify these tables exist:
   - `horses`
   - `blog_articles`
   - `faqs`
   - `global_settings`
   - `reviews`
   - `site_messages`
   - (and others as shown in database schema)

### If Tables Don't Exist

Run SQL migrations:

1. Click **SQL Editor** in Supabase Dashboard
2. Click **"New query"**
3. Run database creation SQL (provided by development team)
4. Verify tables created successfully in Table Editor

---

## Row Level Security (RLS)

### What is RLS?

Row Level Security ensures users can only access data they're authorized to see, even with the public `anon` key.

### Verify RLS Policies

1. In Supabase Dashboard, go to **Authentication → Policies**
2. Verify each table has appropriate policies

### Example Policies Already Configured

**Public tables** (anyone can read):
- `horses` - Public can SELECT
- `blog_articles` - Public can SELECT published posts
- `faqs` - Public can SELECT active FAQs
- `reviews` - Public can SELECT approved reviews

**Protected tables** (admin only):
- `horses` - Only authenticated admins can INSERT/UPDATE/DELETE
- `blog_articles` - Only authenticated admins can INSERT/UPDATE/DELETE
- `global_settings` - Only authenticated admins can UPDATE

### Test RLS Policies

1. Open your application
2. Try accessing public data (should work)
3. Try modifying data without authentication (should fail)
4. Log in as admin and try modifying (should work)

---

## Storage Buckets

### Existing Buckets

The application uses these Supabase Storage buckets:

1. **blog-images** - Blog post images
2. **horse-images** - Horse profile images
3. **facility-gallery** - Facility images
4. **team-images** - Team member photos
5. **faq-images** - FAQ illustrations
6. **site-assets** - General site assets

### Verify Buckets Exist

1. In Supabase Dashboard, click **Storage**
2. Verify all buckets listed above exist

### Configure Bucket Policies

For each bucket:

1. Click bucket name
2. Click **Policies** tab
3. Verify policies:
   - **Public SELECT**: Allow anyone to read images
   - **Authenticated INSERT**: Only authenticated users can upload
   - **Authenticated UPDATE/DELETE**: Only authenticated users can modify

### Create Missing Buckets

If any bucket is missing:

1. Click **"New bucket"**
2. Enter bucket name (e.g., `blog-images`)
3. Set **Public bucket**: Yes (for images)
4. Click **"Create bucket"**
5. Add policies:
   - Click **"New policy"**
   - Template: **"Allow public read access"**
   - Click **"Review"** → **"Save policy"**

---

## Edge Functions

### What are Edge Functions?

Serverless functions that run on Supabase's edge network, used for:
- Server-side logic
- Email sending
- Payment processing
- API integrations

### Existing Edge Functions

The application may have these functions:

1. **admin-login** - Handle admin authentication
2. **send-message-reply** - Send email replies to contact form

### Verify Edge Functions

1. In Supabase Dashboard, click **Edge Functions**
2. Verify functions are deployed
3. Check function logs for errors

### Deploy Edge Functions (if needed)

If using Supabase CLI:

\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-id

# Deploy functions
supabase functions deploy admin-login
supabase functions deploy send-message-reply
\`\`\`

---

## Testing Connection

### Test Locally

1. Start development server:
\`\`\`bash
npm run dev
\`\`\`

2. Open browser and navigate to `http://localhost:3000`

3. Open browser console (F12)

4. Look for:
- ✅ "Supabase client initialized successfully"
- ✅ No connection errors

5. Test data fetching:
- Navigate to horses page
- Navigate to blog page
- Navigate to FAQs page
- Verify data loads without errors

### Test in Production

After Vercel deployment:

1. Visit your production URL

2. Open browser console (F12)

3. Verify:
- ✅ Supabase connection successful
- ✅ Data loads correctly
- ✅ No CORS errors
- ✅ No authentication errors

---

## Security Best Practices

### ✅ DO:

- **Use RLS policies** on all tables
- **Use anon key** in client code
- **Use service_role key** ONLY in Edge Functions
- **Enable email verification** for user signups
- **Use strong database password**
- **Enable 2FA** on your Supabase account
- **Rotate keys** quarterly
- **Monitor usage** regularly
- **Set up database backups**

### ❌ DON'T:

- **Don't expose service_role key** in client code
- **Don't disable RLS** on public tables
- **Don't skip authentication** for sensitive operations
- **Don't hardcode credentials** in source code
- **Don't share database password** publicly
- **Don't ignore security warnings**

---

## Monitoring & Maintenance

### Regular Checks

**Weekly**:
- Check Supabase Dashboard for errors
- Review API usage and quotas
- Check Edge Function logs

**Monthly**:
- Review and update RLS policies
- Audit user access logs
- Check storage usage
- Review database performance

**Quarterly**:
- Rotate API keys
- Review security policies
- Update database indexes
- Optimize slow queries

---

## Troubleshooting

### Connection Fails

**Issue**: "Failed to connect to Supabase"

**Solutions**:
1. Verify `VITE_SUPABASE_URL` is correct
2. Verify `VITE_SUPABASE_ANON_KEY` is correct
3. Check Supabase project is active (not paused)
4. Check internet connection
5. Verify no firewall blocking Supabase

### CORS Errors

**Issue**: "CORS policy blocked request"

**Solutions**:
1. Go to Supabase Dashboard → Settings → API
2. Add your domain to allowed origins
3. Wait 1-2 minutes for changes to propagate
4. Clear browser cache and retry

### RLS Policy Errors

**Issue**: "Row level security policy violation"

**Solutions**:
1. Verify RLS policies exist for the table
2. Check policy allows the operation (SELECT/INSERT/UPDATE/DELETE)
3. Verify user is authenticated if policy requires it
4. Check policy conditions match your use case

### Storage Upload Fails

**Issue**: "Failed to upload file"

**Solutions**:
1. Verify storage bucket exists
2. Check bucket has public write policy (for authenticated users)
3. Verify file size is under bucket limits (default 50MB)
4. Check file type is allowed
5. Verify user is authenticated

---

## Supabase Limits (Free Tier)

**Database**:
- 500MB database space
- Unlimited API requests
- Up to 50,000 monthly active users

**Storage**:
- 1GB file storage
- 2GB bandwidth per month

**Edge Functions**:
- 500,000 invocations per month
- 400,000 GB-seconds compute

**Upgrade**: If limits exceeded, upgrade to Pro plan ($25/month)

---

## Support Resources

**Official Documentation**:
- [Supabase Docs](https://supabase.com/docs)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

**Community**:
- [Supabase Discord](https://discord.supabase.com/)
- [Supabase GitHub](https://github.com/supabase/supabase)

**Support**:
- Email: support@supabase.com
- [Support Portal](https://supabase.com/support)

---

**Last Updated**: 2026-04-22  
**Supabase Version**: Latest  
**Application**: Titan Stables

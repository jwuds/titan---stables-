
# Troubleshooting Guide

**Common issues and solutions for Titan Stables deployment.**

---

## 📋 Table of Contents

1. [Build Errors](#build-errors)
2. [Runtime Errors](#runtime-errors)
3. [Supabase Connection Issues](#supabase-connection-issues)
4. [Vercel Deployment Issues](#vercel-deployment-issues)
5. [Environment Variable Issues](#environment-variable-issues)
6. [Storage and Upload Issues](#storage-and-upload-issues)
7. [Authentication Issues](#authentication-issues)
8. [Performance Issues](#performance-issues)
9. [Getting Help](#getting-help)

---

## Build Errors

### Error: "Module not found" or "Cannot resolve module"

**Symptom**:
\`\`\`
Error: Cannot find module '@/components/MyComponent'
\`\`\`

**Causes**:
- File doesn't exist at import path
- Incorrect file extension
- Wrong path alias
- Circular dependency

**Solutions**:

1. **Verify file exists**:
\`\`\`bash
ls src/components/MyComponent.jsx
\`\`\`

2. **Check import path**:
\`\`\`javascript
// ✅ CORRECT
import MyComponent from '@/components/MyComponent';

// ❌ INCORRECT
import MyComponent from '../components/MyComponent';
\`\`\`

3. **Check file extension**:
- React components use `.jsx`
- Utilities use `.js`
- Always include extension if not .jsx/.js

4. **Check for circular imports**:
- File A imports File B, File B imports File A
- Refactor to break circular dependency

---

### Error: "npm ERR! code ERESOLVE"

**Symptom**:
\`\`\`
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
\`\`\`

**Causes**:
- Peer dependency conflicts
- Package version incompatibilities

**Solutions**:

1. **Delete and reinstall**:
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

2. **Use legacy peer deps**:
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

3. **Update packages**:
\`\`\`bash
npm update
\`\`\`

---

### Error: "Vite build failed"

**Symptom**:
\`\`\`
✘ [ERROR] Build failed with 1 error
\`\`\`

**Causes**:
- Syntax errors in code
- Missing dependencies
- Environment variable issues

**Solutions**:

1. **Check build output** for specific error
2. **Fix syntax errors** identified in output
3. **Verify dependencies installed**:
\`\`\`bash
npm install
\`\`\`
4. **Check environment variables** are set correctly

---

## Runtime Errors

### Error: "Supabase client not initialized"

**Symptom**:
\`\`\`
Error: Supabase client not initialized
\`\`\`

**Causes**:
- Missing environment variables
- Invalid Supabase credentials
- Supabase project inactive

**Solutions**:

1. **Check environment variables**:
\`\`\`bash
# Local
cat .env

# Vercel
# Check Vercel Dashboard → Settings → Environment Variables
\`\`\`

2. **Verify credentials**:
- Go to Supabase Dashboard → Settings → API
- Copy **Project URL** and **anon key**
- Update `.env` or Vercel environment variables

3. **Check Supabase project status**:
- Go to Supabase Dashboard
- Verify project is active (not paused)

4. **Restart dev server**:
\`\`\`bash
# Stop server (Ctrl+C)
npm run dev
\`\`\`

---

### Error: "Network request failed"

**Symptom**:
\`\`\`
Error: Network request failed
\`\`\`

**Causes**:
- No internet connection
- CORS errors
- Firewall blocking requests
- API endpoint down

**Solutions**:

1. **Check internet connection**:
\`\`\`bash
ping google.com
\`\`\`

2. **Check browser console** for CORS errors

3. **Check Supabase status**:
- Visit [status.supabase.com](https://status.supabase.com)

4. **Clear browser cache and reload**

---

### Error: "Uncaught TypeError: Cannot read property"

**Symptom**:
\`\`\`
Uncaught TypeError: Cannot read property 'map' of undefined
\`\`\`

**Causes**:
- Accessing undefined data
- API response not yet loaded
- Missing null checks

**Solutions**:

1. **Add null checks**:
\`\`\`javascript
// ✅ CORRECT
{data?.map(item => ...)}

// ❌ INCORRECT
{data.map(item => ...)}
\`\`\`

2. **Add loading states**:
\`\`\`javascript
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
if (!data) return <div>No data</div>;
\`\`\`

3. **Use optional chaining**:
\`\`\`javascript
const value = data?.user?.name ?? 'Default';
\`\`\`

---

## Supabase Connection Issues

### Error: "CORS policy blocked request"

**Symptom**:
\`\`\`
Access to fetch has been blocked by CORS policy
\`\`\`

**Causes**:
- Domain not allowed in Supabase
- Incorrect CORS configuration

**Solutions**:

1. **Add domain to Supabase**:
- Go to Supabase Dashboard → Settings → API
- Scroll to **CORS**
- Add your domain (e.g., `https://titanstables.org`)
- Click **"Save"**
- Wait 1-2 minutes for changes to propagate

2. **Check allowed origins**:
- Verify your domain is in the list
- Include both `http://localhost:3000` (dev) and production domain

3. **Clear browser cache and retry**

---

### Error: "Row level security policy violation"

**Symptom**:
\`\`\`
Error: new row violates row-level security policy
\`\`\`

**Causes**:
- RLS policy prevents operation
- User not authenticated
- Policy conditions not met

**Solutions**:

1. **Check RLS policies**:
- Go to Supabase Dashboard → Authentication → Policies
- Verify policy exists for table and operation
- Check policy allows your use case

2. **Authenticate user** (if required):
\`\`\`javascript
const { data, error } = await supabase.auth.signIn({
  email: 'user@example.com',
  password: 'password'
});
\`\`\`

3. **Update policy** (if needed):
- Modify policy to allow operation
- Test with updated policy

---

### Error: "Invalid API key"

**Symptom**:
\`\`\`
Error: Invalid API key
\`\`\`

**Causes**:
- Wrong Supabase key used
- Key expired or rotated
- Typo in environment variable

**Solutions**:

1. **Verify key in Supabase Dashboard**:
- Go to Settings → API
- Copy fresh **anon/public** key

2. **Update environment variable**:
\`\`\`env
VITE_SUPABASE_ANON_KEY=your-new-anon-key
\`\`\`

3. **Restart dev server**:
\`\`\`bash
npm run dev
\`\`\`

4. **Redeploy in Vercel** (if production issue)

---

## Vercel Deployment Issues

### Error: "Build exceeded maximum duration"

**Symptom**:
\`\`\`
Error: Build exceeded maximum duration of 45 minutes
\`\`\`

**Causes**:
- Build process hanging
- Infinite loop in build script
- Very large bundle size

**Solutions**:

1. **Check build logs** for hanging process

2. **Optimize build**:
- Remove unused dependencies
- Enable code splitting
- Optimize images

3. **Contact Vercel support** if issue persists

---

### Error: "Environment variables not loading"

**Symptom**:
- Build succeeds but app doesn't work
- Console shows "undefined" for environment variables

**Causes**:
- Variables not set in Vercel dashboard
- Variables missing `VITE_` prefix
- Deployment not redeployed after adding variables

**Solutions**:

1. **Verify variables in Vercel**:
- Go to Settings → Environment Variables
- Check all required variables exist
- Verify `VITE_` prefix on all client variables

2. **Redeploy after adding variables**:
- Go to Deployments tab
- Click **"Redeploy"** on latest deployment

3. **Check variable names match code**:
\`\`\`javascript
// Variable in Vercel: VITE_SUPABASE_URL
const url = import.meta.env.VITE_SUPABASE_URL;
\`\`\`

---

### Error: "404 - Page Not Found" on refresh

**Symptom**:
- Routes work when navigating
- Refreshing page shows 404

**Causes**:
- Missing SPA fallback configuration
- Incorrect vercel.json configuration

**Solutions**:

1. **Verify vercel.json exists** with rewrites:
\`\`\`json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
\`\`\`

2. **Redeploy after adding vercel.json**

---

## Environment Variable Issues

### Variables work locally but not in Vercel

**Symptom**:
- App works with `npm run dev`
- Deployed app shows errors

**Causes**:
- Variables not set in Vercel
- Wrong environment selected

**Solutions**:

1. **Add variables in Vercel dashboard**:
- Settings → Environment Variables
- Add each variable
- Select **ALL** environments (Production, Preview, Development)

2. **Redeploy** after adding variables

3. **Check build logs** for environment variable errors

---

### Variable has wrong value

**Symptom**:
- Variable exists but has incorrect value
- App connects to wrong database/API

**Causes**:
- Typo in variable value
- Using development value in production

**Solutions**:

1. **Update variable in Vercel**:
- Settings → Environment Variables
- Find variable
- Click **"Edit"**
- Update value
- Select correct environment
- Save

2. **Redeploy** to apply changes

---

## Storage and Upload Issues

### Error: "Failed to upload file"

**Symptom**:
\`\`\`
Error: Failed to upload file to storage
\`\`\`

**Causes**:
- Storage bucket doesn't exist
- Bucket not public
- File too large
- User not authenticated

**Solutions**:

1. **Verify bucket exists**:
- Go to Supabase Dashboard → Storage
- Check bucket is created

2. **Make bucket public** (if needed):
- Click bucket name
- Click **"Make public"**

3. **Check file size**:
- Default limit: 50MB
- Reduce file size or increase limit in Supabase

4. **Authenticate user** (if required):
- Ensure user logged in before upload

---

### Images not loading from Storage

**Symptom**:
- Images uploaded successfully
- Images return 403 or 404

**Causes**:
- Bucket not public
- Incorrect URL format
- RLS policy blocks access

**Solutions**:

1. **Make bucket public**:
- Supabase Dashboard → Storage
- Select bucket → **"Make public"**

2. **Verify URL format**:
\`\`\`javascript
// ✅ CORRECT
const url = \`\${supabaseUrl}/storage/v1/object/public/\${bucket}/\${path}\`;

// ❌ INCORRECT
const url = \`\${supabaseUrl}/storage/\${bucket}/\${path}\`;
\`\`\`

3. **Check RLS policies**:
- Ensure bucket policy allows public SELECT

---

## Authentication Issues

### Error: "Invalid login credentials"

**Symptom**:
\`\`\`
Error: Invalid login credentials
\`\`\`

**Causes**:
- Wrong email or password
- User doesn't exist
- Email not verified

**Solutions**:

1. **Verify credentials** are correct

2. **Check user exists** in Supabase:
- Dashboard → Authentication → Users

3. **Verify email** (if required):
- Check email verification settings
- Resend verification email

---

### Session expires too quickly

**Symptom**:
- User gets logged out frequently
- Session lost on page refresh

**Causes**:
- Short session duration
- Refresh token expired
- localStorage cleared

**Solutions**:

1. **Check session settings** in Supabase:
- Dashboard → Authentication → Settings
- Adjust session duration

2. **Implement session refresh**:
\`\`\`javascript
useEffect(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      // Handle logout
    }
  });
}, []);
\`\`\`

---

## Performance Issues

### Slow page load times

**Symptom**:
- Pages take > 5 seconds to load
- Poor Lighthouse scores

**Causes**:
- Large bundle size
- Unoptimized images
- No code splitting
- Many API requests

**Solutions**:

1. **Enable code splitting**:
\`\`\`javascript
const MyComponent = lazy(() => import('@/components/MyComponent'));
\`\`\`

2. **Optimize images**:
- Use WebP format
- Lazy load images
- Use responsive images (srcset)

3. **Reduce API requests**:
- Batch requests
- Cache responses
- Use pagination

4. **Analyze bundle**:
\`\`\`bash
npm run build
# Check dist/ folder size
\`\`\`

---

### High memory usage

**Symptom**:
- Browser becomes slow
- Memory leaks detected

**Causes**:
- Event listeners not cleaned up
- Timers not cleared
- Large state objects

**Solutions**:

1. **Clean up effects**:
\`\`\`javascript
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval);
}, []);
\`\`\`

2. **Memoize expensive calculations**:
\`\`\`javascript
const value = useMemo(() => expensiveCalculation(data), [data]);
\`\`\`

3. **Use React DevTools Profiler** to identify issues

---

## Getting Help

### Before asking for help

1. **Check this troubleshooting guide** thoroughly
2. **Check browser console** for errors
3. **Check Vercel build logs** for deployment issues
4. **Check Supabase logs** for backend issues
5. **Try reproducing** issue in fresh browser/incognito mode

### Where to get help

**Documentation**:
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

**Community**:
- [Supabase Discord](https://discord.supabase.com/)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [React Community](https://react.dev/community)

**Support**:
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Supabase Support: support@supabase.com

### When reporting issues

Include:
- **Error message** (exact text)
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Browser/environment** (Chrome 120, Vercel production, etc.)
- **Screenshots** (if relevant)
- **Code snippet** (if relevant)
- **Build logs** (for deployment issues)

---

**Last Updated**: 2026-04-22  
**Maintained by**: Titan Stables Development Team

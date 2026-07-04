# 🚀 Quick Start Guide - Investify SvelteKit

## Fastest Way to Get Started

### Option 1: Frontend Only (No Database)
```bash
cd /root/investment/investify
npm run dev
```
Visit: http://localhost:5173

**What works:** Marketing pages, UI components  
**What doesn't:** Login, dashboard, admin panel (all need database)

---

### Option 2: Full Application (With Database)

#### Step 1: Get PostgreSQL Database

**Recommended: Supabase (Free)**
1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - Name: `investify`
   - Database Password: (create a strong password)
   - Region: (choose closest to you)
5. Wait ~2 minutes for project to initialize
6. Go to: Settings → Database → Connection String → URI
7. Copy the connection string (looks like: `postgresql://postgres.[ref]:[password]@...`)

#### Step 2: Configure Environment

```bash
cd /root/investment/investify

# Create .env file
cat > .env << 'EOF'
DATABASE_URL="your-postgresql-connection-string-here"
SESSION_SECRET="change-this-to-random-string"
EOF
```

**Generate secure SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and replace `change-this-to-random-string` in .env

#### Step 3: Initialize Database

```bash
# Create all 25 tables
npm run db:push

# Add sample data (admin user, plans, settings)
npm run db:seed
```

#### Step 4: Start Server

```bash
npm run dev
```

Server starts at: **http://localhost:5173**

---

## 🔑 Default Login Credentials

**Admin Account:**
- Email: `admin@investify.com`
- Password: `Admin123!`

**Test User Account:**
- Email: `user@example.com`
- Password: `User123!`

---

## 📍 Key Routes

### Public Pages
- Homepage: http://localhost:5173/
- About: http://localhost:5173/about
- Services: http://localhost:5173/private-wealth
- News: http://localhost:5173/news-and-insights
- Contact: http://localhost:5173/contact-us

### Auth
- Login: http://localhost:5173/login
- Register: http://localhost:5173/register
- Forgot Password: http://localhost:5173/forgot-password

### User Dashboard (Login Required)
- Dashboard: http://localhost:5173/user/dashboard
- Plans: http://localhost:5173/user/plans
- Investments: http://localhost:5173/user/investments
- Withdrawals: http://localhost:5173/user/withdrawals
- Wallets: http://localhost:5173/user/wallets
- Referrals: http://localhost:5173/user/referrals
- Settings: http://localhost:5173/user/settings/profile

### Admin Panel (Admin Login Required)
- Dashboard: http://localhost:5173/admin/dashboard
- Users: http://localhost:5173/admin/users
- Investments: http://localhost:5173/admin/investments
- Withdrawals: http://localhost:5173/admin/withdrawals
- Plans: http://localhost:5173/admin/plans
- Blog: http://localhost:5173/admin/blog
- Settings: http://localhost:5173/admin/settings/website

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Database
npm run db:push          # Update database schema
npm run db:seed          # Add sample data
npm run db:studio        # Open database GUI

# Code Quality
npm run check            # Type check
npm run lint             # Lint code
npm run format           # Format code
```

---

## ⚠️ Troubleshooting

**Database connection failed?**
- Check DATABASE_URL in .env is correct
- Verify PostgreSQL is accessible
- Test connection: `psql "your-connection-string"`

**Tables don't exist?**
- Run: `npm run db:push`

**Can't login?**
- Run: `npm run db:seed`
- Use default credentials above

**Port 5173 in use?**
- Use different port: `npm run dev -- --port 3000`

**Build errors?**
- Clear cache: `rm -rf .svelte-kit && npm run dev`
- Reinstall: `rm -rf node_modules && npm install`

---

## 📦 What's Included

- ✅ 72 pages across 90+ routes
- ✅ Complete auth system (login, register, 2FA, password reset)
- ✅ User dashboard (investments, withdrawals, wallets, referrals)
- ✅ Admin panel (users, plans, investments, withdrawals, blog, settings)
- ✅ Marketing website (22 frontend pages)
- ✅ PostgreSQL database (25 tables via Drizzle ORM)
- ✅ Lucia Auth (session-based authentication)
- ✅ Rate limiting, audit logging, email notifications
- ✅ Tailwind CSS + shadcn-svelte components
- ✅ TypeScript strict mode
- ✅ Zod validation

---

## 🚀 Ready to Deploy?

See production deployment guides:
- **Vercel:** https://vercel.com/docs/frameworks/sveltekit
- **Netlify:** https://docs.netlify.com/frameworks/sveltekit/
- **Node.js:** Change adapter to `@sveltejs/adapter-node`

---

## 📚 Documentation

- `AUDIT.md` - Complete migration specification
- `SESSION_SUMMARY_2026-07-04.md` - Latest changes
- `promot.md` - Original 7-phase plan

---

## 💬 Need Help?

Check the session summaries and audit documentation for detailed information about the architecture, database schema, and implementation details.

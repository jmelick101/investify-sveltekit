#!/bin/bash

# Investify SvelteKit Setup Script
# This script helps you set up and run the application

set -e

echo "═══════════════════════════════════════════════════════════════"
echo "  🚀 INVESTIFY SVELTEKIT - SETUP WIZARD"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from /root/investment/investify"
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Check if .env exists
if [ -f ".env" ]; then
    echo "📄 Found existing .env file"
    echo ""
    read -p "Do you want to reconfigure? (y/N): " reconfigure
    if [[ ! $reconfigure =~ ^[Yy]$ ]]; then
        echo "Keeping existing .env"
        ENV_EXISTS=true
    else
        ENV_EXISTS=false
    fi
else
    ENV_EXISTS=false
fi

# Configure environment
if [ "$ENV_EXISTS" != "true" ]; then
    echo ""
    echo "───────────────────────────────────────────────────────────────"
    echo "  DATABASE CONFIGURATION"
    echo "───────────────────────────────────────────────────────────────"
    echo ""
    echo "You need a PostgreSQL database. Options:"
    echo "  1. Supabase (recommended, free tier)"
    echo "  2. Local PostgreSQL"
    echo "  3. Remote PostgreSQL"
    echo ""
    read -p "Enter your DATABASE_URL: " database_url
    
    echo ""
    echo "Generating secure SESSION_SECRET..."
    session_secret=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    
    cat > .env << EOF
DATABASE_URL="${database_url}"
SESSION_SECRET="${session_secret}"
EOF
    
    echo "✅ Created .env file"
fi

echo ""
echo "───────────────────────────────────────────────────────────────"
echo "  DATABASE INITIALIZATION"
echo "───────────────────────────────────────────────────────────────"
echo ""
read -p "Initialize database? This will create tables and seed data (y/N): " init_db

if [[ $init_db =~ ^[Yy]$ ]]; then
    echo ""
    echo "📊 Pushing database schema..."
    npm run db:push
    
    echo ""
    echo "🌱 Seeding database..."
    npm run db:seed
    
    echo ""
    echo "✅ Database initialized successfully!"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "  🔑 DEFAULT LOGIN CREDENTIALS"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    echo "Admin Account:"
    echo "  Email: admin@investify.com"
    echo "  Password: Admin123!"
    echo ""
    echo "Test User Account:"
    echo "  Email: user@example.com"
    echo "  Password: User123!"
    echo ""
fi

echo ""
echo "───────────────────────────────────────────────────────────────"
echo "  START DEVELOPMENT SERVER"
echo "───────────────────────────────────────────────────────────────"
echo ""
read -p "Start development server now? (Y/n): " start_server

if [[ ! $start_server =~ ^[Nn]$ ]]; then
    echo ""
    echo "🚀 Starting development server..."
    echo ""
    echo "Server will be available at: http://localhost:5173"
    echo ""
    echo "Key routes:"
    echo "  - Frontend: http://localhost:5173/"
    echo "  - Login: http://localhost:5173/login"
    echo "  - User Dashboard: http://localhost:5173/user/dashboard"
    echo "  - Admin Panel: http://localhost:5173/admin/dashboard"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    sleep 2
    npm run dev
else
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "To start the development server later, run:"
    echo "  npm run dev"
    echo ""
    echo "Then visit: http://localhost:5173"
fi

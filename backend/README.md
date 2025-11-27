# BlockBustre Backend

Django REST API backend for the BlockBustre blockchain registration service.

## Features

- **RBAC (Role-Based Access Control)** - Complete user role and permission system
- **JWT Authentication** - Secure token-based authentication
- **User Management** - Registration, login, profile management, KYC verification
- **Smart Contract Management** - Document upload, blockchain deployment, verification
- **Transaction Management** - Payment processing, subscription management
- **Email Verification** - Account verification and password reset
- **Security Features** - Login attempt tracking, session management
- **API Documentation** - Swagger/OpenAPI documentation

## Installation

### Prerequisites

- Python 3.9+
- PostgreSQL 12+
- Redis 6+
- Node.js 16+ (for frontend)

### Setup Instructions

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Database Setup:**
   ```bash
   # Create PostgreSQL database
   createdb blockbustre_db
   
   # Run migrations
   python manage.py migrate
   ```

6. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Create default roles:**
   ```bash
   python manage.py create_roles
   ```

8. **Start development server:**
   ```bash
   python manage.py runserver
   ```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/swagger/
- **ReDoc**: http://localhost:8000/redoc/

## Environment Variables

Required environment variables in `.env`:

```bash
# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=blockbustre_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

# Redis
REDIS_URL=redis://localhost:6379/1

# Email (for verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@blockbustre.com

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Stripe (for payments)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Blockchain
ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/...
PRIVATE_KEY=your-private-key
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register/` - User registration
- `POST /api/v1/auth/login/` - User login (JWT)
- `POST /api/v1/auth/logout/` - User logout
- `POST /api/v1/auth/token/refresh/` - Refresh JWT token
- `POST /api/v1/auth/verify-email/<uid>/<token>/` - Email verification
- `POST /api/v1/auth/password/reset/` - Password reset request
- `POST /api/v1/auth/password/reset/confirm/<uid>/<token>/` - Password reset confirm

### User Management
- `GET /api/v1/auth/profile/` - Get user profile
- `PUT /api/v1/auth/profile/update/` - Update user profile
- `POST /api/v1/auth/password/change/` - Change password
- `GET /api/v1/auth/dashboard/` - User dashboard data
- `POST /api/v1/auth/kyc/request/` - Request KYC verification

### Contracts (Coming Soon)
- `GET /api/v1/contracts/` - List contracts
- `POST /api/v1/contracts/` - Create contract
- `GET /api/v1/contracts/{id}/` - Get contract details

### Transactions (Coming Soon)
- `GET /api/v1/transactions/` - List transactions
- `POST /api/v1/transactions/` - Create transaction

## User Roles

The system includes these default roles:

1. **Admin** - Full system access
2. **Manager** - Management access with limited admin capabilities
3. **User** - Standard user access (default for new users)
4. **Guest** - Limited guest access

## Development

### Running Tests
```bash
python manage.py test
```

### Code Formatting
```bash
black .
isort .
```

### Database Migrations
```bash
# Create migration
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

## Production Deployment

1. Set `DEBUG=False` in environment
2. Configure proper database and Redis
3. Set up email service
4. Configure Stripe keys
5. Set up blockchain RPC endpoints
6. Configure static file serving
7. Set up SSL/HTTPS
8. Configure monitoring (Sentry)

## Security Features

- JWT token authentication with refresh tokens
- Role-based access control (RBAC)
- Login attempt tracking and rate limiting
- Session management and tracking
- Email verification for account activation
- Secure password reset flow
- CORS protection
- XSS and CSRF protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.


# AI Support Chat Application

This repository contains both the server and client components of the AI Support Chat application. The application provides a modern web interface for interacting with AI-powered chat functionality.

## Server Component

This is the server component of the AI Support Chat application. It provides a RESTful API for authentication, chat functionality, and integration with AI services.

## Features

- User authentication and authorization
- Chat functionality with AI integration
- MongoDB database integration
- Error handling and request logging
- CORS support
- Environment-based configuration

## Prerequisites

- Docker and Docker Compose
- Make
- OpenAI API key

## Installation

1. Clone the repository:
   ```bash
   cd server
   ```

2. Create a `.env` file in the server directory with the following variables:
   ```
   # Server Configuration
   PORT=5000                        # Server port (default: 5000)
   NODE_ENV=development             # Environment mode (development/production)
   SITE_NAME=AI Support Chat        # Application name
   SITE_URL=http://localhost:5000   # Application URL

   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/ai-support-chat  # MongoDB connection string

   # Authentication
   JWT_SECRET=your_jwt_secret   # Secret key for JWT token generation

   # AI Configuration
   AI_CHAT_IMPL=openaisdk               # AI implementation type (default: openaisdk)
   OPENAI_API_KEY=your_openai_api_key   # OpenAI API key
   
   # OpenRouter Configuration (Alternative AI Provider)
   OPENROUTER_API_KEY=your_openrouter_api_key        # OpenRouter API key
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1  # OpenRouter API base URL
   OPENROUTER_MODEL=your_model_name                  # Model name to use
   AI_SYSTEM_PROMPT=your_system_prompt               # System prompt for AI interactions
   ```

## Running the Server

The server is containerized and can be run using Make commands. Make sure you have Docker and Docker Compose installed on your system.

### Development Mode
```bash
make up-dev
```
This command will:
- Build the development Docker image
- Start the server in development mode
- Mount the source code for hot-reloading
- Run the server on port 3000

### Production Mode
```bash
make up-prod
```
This command will:
- Build the production Docker image
- Start the server in production mode
- Run the server on port 3000

### Stopping the Server
To stop the server and remove containers:
```bash
make down
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Chat
- `POST /api/chat` - Create a new chat
- `GET /api/chat` - Get user's chat history
- `GET /api/chat/:id` - Get specific chat details
- `POST /api/chat/:id/message` - Send a message in a chat

## Project Structure

```
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controller/     # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── model/          # Database models
│   ├── repositories/   # Data access layer
│   ├── route/          # API routes
│   ├── services/       # Business logic
│   ├── tools/          # Utility tools
│   ├── utils/          # Helper functions
│   └── index.js        # Application entry point
├── Dockerfile          # Production Docker configuration
├── Dockerfile.dev      # Development Docker configuration
└── package.json        # Project dependencies and scripts
```

## Docker Support

The project uses Docker Compose for orchestration and includes configurations for both development and production environments.

### Development Environment
- Uses `docker-compose.override.yml` for development-specific settings
- Enables hot-reloading for development
- Mounts source code as a volume

### Production Environment
- Uses `docker-compose.yml` for production settings
- Optimized for performance
- No source code mounting

## Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- bcrypt: Password hashing
- jsonwebtoken: JWT authentication
- cors: Cross-origin resource sharing
- dotenv: Environment configuration
- openai: OpenAI API integration

## Error Handling

The server implements a global error handling middleware that processes and formats errors consistently across the application. All errors are logged and returned with appropriate HTTP status codes.

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Environment variable protection
- Request logging for monitoring

## Client Component

The client is a React-based web application built with Vite, providing a modern and responsive user interface for the AI Support Chat application.

### Features

- Modern React with Vite build system
- Responsive and intuitive user interface
- Real-time chat interactions
- Authentication integration
- State management with React Context
- Custom hooks for reusable logic
- Service layer for API communication

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```
   VITE_API_URL=http://localhost:5000  # Backend API URL
   ```

### Running the Client

#### Development Mode
```bash
npm run dev
```
This will start the development server with hot-reloading enabled.

#### Production Build
```bash
npm run build
```
This creates an optimized production build in the `dist` directory.

### Docker Support

The client includes Docker configurations for both development and production environments:

#### Development
```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

#### Production
```bash
docker-compose up
```

### Project Structure

```
client/
├── src/
│   ├── assets/        # Static assets (images, fonts, etc.)
│   ├── components/    # Reusable React components
│   ├── config/        # Configuration files
│   ├── context/       # React Context providers
│   ├── hook/          # Custom React hooks
│   ├── service/       # API service layer
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Public static files
├── Dockerfile         # Production Docker configuration
├── Dockerfile.dev     # Development Docker configuration
└── vite.config.js     # Vite configuration
```

### Dependencies

- React: UI library
- Vite: Build tool and development server
- TailwindCSS: Utility-first CSS framework
- Axios: HTTP client
- React Router: Client-side routing
- React Query: Data fetching and caching

### Development

The client application uses modern development practices:

- Hot Module Replacement (HMR)
- ESLint for code linting
- PostCSS for CSS processing
- Environment-based configuration
- Docker containerization

### Deployment

The client can be deployed using Docker Compose along with the server component. The production build is optimized for performance and served using Nginx.

# Bidflare - Online Bidding Platform

Bidflare is a comprehensive online bidding platform designed to facilitate secure and real-time auctions. It consists of a robust backend service and a dynamic frontend interface, ensuring a seamless user experience for buying and selling items through auctions.

## 🚀 Project Overview

The application is built as a monorepo containing:
- **Bidflare Backend**: A secure RESTful API built with Java and Spring Boot.
- **Bidflare Frontend**: A responsive web application built with Next.js.
- **Infrastructure**: Dockerized setup for easy deployment and orchestration.

### Key Features

#### Backend
- **Secure Authentication**: Implemented using Spring Security and JWT.
- **Data Persistence**: Optimized using Hibernate (JPA) and PostgreSQL.
- **Real-time Updates**: WebSocket integration for live bidding updates.
- **Payment Processing**: Integrated with Stripe for secure transactions.
- **RESTful API**: Well-structured API endpoints for managing users, auctions, and bids.

#### Frontend
- **Dynamic Interface**: Built with Next.js (React) for server-side rendering and static generation.
- **State Management**: Utilizes Redux Toolkit and Context API for efficient state handling.
- **Responsive Design**: Styled with Tailwind CSS to ensure compatibility across devices.
- **Interactive UI**: Enhanced with Framer Motion for smooth animations.
- **Real-time Notifications**: Updates via WebSockets (SockJS/Stomp).

---

## 🛠 Technology Stack

### Backend
- **Language**: Java 21
- **Framework**: Spring Boot 3.5.3
- **Database**: PostgreSQL 15
- **Security**: Spring Security, JWT (jjwt 0.11.5)
- **Persistence**: Spring Data JPA, Hibernate
- **Payments**: Stripe Java SDK
- **Real-time**: Spring WebSocket

### Frontend
- **Framework**: Next.js 15.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, PostCSS
- **State Management**: Redux Toolkit, React Context API
- **UI Components**: Headless UI, React Icons, Lucide React
- **Toast Notifications**: Sonner
- **Motion**: Framer Motion

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Deployment**: AWS EC2 ready

---

## 🏁 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose installed.
- **Optional (for manual setup)**:
    - Java JDK 21
    - Node.js 20+
    - PostgreSQL 15

### 🐳 Running with Docker

The easiest way to run the application is using Docker Compose.

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Bidflare-Monorepo
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory (if not exists) and populate it with the necessary variables (see [Environment Variables](#-environment-variables) section).

3. **Build and Run**:
   ```bash
   docker-compose up --build
   ```
   This command will start:
   - **Postgres Database**: Port `5432`
   - **Backend API**: Port `8080`
   - **Frontend App**: Port `3000`

4. **Access the Application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)

### 🛠 Manual Setup

#### Backend
1. Navigate to `bidflare-backend`.
2. Configure `src/main/resources/application.properties` or set environment variables.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

#### Frontend
1. Navigate to `bidflare-frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables

The application relies on several environment variables. You should define these in your `.env` file in the root directory.

| Variable | Description |
| :--- | :--- |
| `POSTGRES_DB` | Database name (e.g., `bidflaredb`) |
| `POSTGRES_USER` | Database user (e.g., `postgres`) |
| `POSTGRES_PASSWORD` | Database password |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRATION` | JWT expiration time in milliseconds |
| `STRIPE_SECRET_KEY` | Stripe Secret Key for payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Secret |

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

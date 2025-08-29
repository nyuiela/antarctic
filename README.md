# Stream - Decentralized Live Events Platform

Stream is a next-generation live streaming and events platform built on Base, featuring real-time event discovery, interactive maps, and seamless streaming experiences. Discover live events happening around you, join streams from creators worldwide, and explore curated content in a decentralized ecosystem.

## 🌟 Features

### Live Event Discovery

- **Interactive Map View**: Explore live events happening in real-time with our interactive map interface
- **Smart Search**: Find events by location, category, or creator with intelligent search capabilities
- **Real-time Updates**: Live event feeds that update automatically every 20 seconds
- **Category Filtering**: Filter events by type (eat, café, bar, and more)

### Streaming & Content

- **Multi-mode Streaming**: Support for camera, screen share, and map-based streaming
- **Creator Profiles**: Discover and follow your favorite streamers
- **Viewer Analytics**: Real-time viewer counts and engagement metrics
- **Curated Collections**: Hand-picked event collections from trusted curators

### Web3 Integration

- **Base Network**: Built on Base for fast, low-cost transactions
- **Farcaster Frames**: Seamless integration with the Farcaster ecosystem
- **Wallet Integration**: Connect your wallet to access premium features
- **Decentralized Identity**: Own your content and data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm, npm, or yarn
- A Base wallet (optional for full features)

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd stream
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
# Copy the example environment file
cp env.example .env.local

# Fill in your configuration
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Stream
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_ICON_URL=http://localhost:3000/icon.png
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here

# Frame metadata for Farcaster integration
FARCASTER_HEADER=your_farcaster_header
FARCASTER_PAYLOAD=your_farcaster_payload
FARCASTER_SIGNATURE=your_farcaster_signature

# Redis configuration for notifications
REDIS_URL=your_redis_url
REDIS_TOKEN=your_redis_token
```

4. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Architecture

### Frontend

- **Next.js 15**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **Lucide React**: Beautiful, customizable icons

### Backend & APIs

- **API Routes**: RESTful endpoints for events and notifications
- **Redis Integration**: Real-time data storage and caching
- **Webhook Support**: Event-driven architecture for live updates

### Web3 & Blockchain

- **Base Network**: Layer 2 scaling solution
- **Farcaster Integration**: Social protocol for decentralized identity
- **OnchainKit**: Web3 development toolkit
- **Wagmi**: React hooks for Ethereum

## 📱 Usage

### Discovering Events

1. **Map View**: Use the interactive map to explore events in your area
2. **Search**: Use the search bar to find specific events or creators
3. **Filters**: Apply category filters to narrow down results
4. **Discover Tab**: Browse curated event collections

### Joining Streams

1. **Event Selection**: Click on any event card to view details
2. **Live Streams**: Join live streams with real-time chat
3. **Creator Profiles**: Follow creators you enjoy
4. **Notifications**: Get notified when your favorite creators go live

### Creating Content

1. **Stream Setup**: Choose between camera, screen share, or location-based streaming
2. **Event Creation**: Set up new events with location and details
3. **Audience Engagement**: Interact with viewers in real-time
4. **Content Curation**: Build your own event collections

## 🔧 Development

### Project Structure

```
stream/
├── app/                    # Next.js app directory
│   ├── api/              # API routes
│   ├── components/       # React components
│   ├── e/               # Event pages
│   └── globals.css      # Global styles
├── lib/                  # Utility libraries
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

### Key Components

- **StreamHome**: Main dashboard with map and event discovery
- **EventsMap**: Interactive map component for event visualization
- **EventSearch**: Search functionality for events and creators
- **StreamHeader**: Navigation and wallet connection
- **WaitlistModal**: User onboarding experience

### API Endpoints

- `GET /api/events` - Fetch live events
- `POST /api/events` - Create new events
- `POST /api/notify` - Send notifications
- `POST /api/webhook` - Handle webhook events

## 🌐 Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables

Ensure all production environment variables are properly configured:

- Base network RPC endpoints
- Redis production credentials
- Farcaster production keys
- Domain and SSL certificates

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:

- Code style and standards
- Pull request process
- Development setup
- Testing requirements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [stream.app](https://stream.app)
- **Documentation**: [docs.stream.app](https://docs.stream.app)
- **Discord**: [Join our community](https://discord.gg/stream)
- **Twitter**: [@stream_app](https://twitter.com/stream_app)

## 🙏 Acknowledgments

- Built with [OnchainKit](https://www.base.org/builders/onchainkit)
- Powered by [Base](https://base.org)
- Integrated with [Farcaster](https://farcaster.xyz)
- Styled with [Tailwind CSS](https://tailwindcss.com)

---

**Stream** - Where live events meet decentralized innovation 🚀

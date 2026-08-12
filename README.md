<div align="center">

  
# TrustShield AI Security Hub
**Misinformation & Scam Analyzer**
</div>

## Overview
TrustShield is a comprehensive, state-of-the-art security platform designed to detect and analyze spear-phishing campaigns, automated misinformation, and social engineering scams. It brings together traditional digital forensics and behavioral linguistics, powered by the Google Gemini API with Search Grounding, to provide unified severity, reputation, and fact-checking reviews in real-time.

## Key Features

- **Text & Claims Analysis:** Evaluates input text for logical fallacies, emotional pressure triggers, and business frauds. It isolates core claims and rates each assertion as True, False, or Misleading.
- **URL Forensics:** Inspects full web paths for phishing subdomains, deceptive unicode redirects (homograph attacks), stateful redirection hooks, and domain brand spoofing.
- **Domain Profiling:** Computes domain age heuristics and WHOIS indicators to recreate registrar details and host associations.
- **File Metadata Forensics:** Safely inspects files for security anomalies (like dual extensions or abnormal file signatures) using a non-executable processing block.
- **Real-Time Fact Checking:** Dynamically gathers real URLs and provides live "Search Grounding Results" directly on the UI dashboard with trusted outbound link citations.

## Tech Stack
- **Frontend:** React 19, Tailwind CSS, Lucide Icons
- **Backend/Tooling:** Vite 6, TypeScript
- **Intelligence Layer:** `@google/genai` (Google Gemini API with Search Grounding)

## Getting Started

### Prerequisites
- Node.js (v18+)
- A valid Google Gemini API Key

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env.local` file in the root of the project and set your Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

3. **Run the App:**
   ```bash
   npm run dev
   ```
   The application will start locally on `http://localhost:3000`.

## Architecture & Security
TrustShield operates on a zero-trust execution model. All uploaded targets are read strictly for metadata signatures without ever executing them, nullifying sandbox escape vulnerabilities. The Gemini Secret API Key is securely insulated from the client bundles.

## License
*This is an Alpha Prototype / Proof of Concept V4.0.2.* All analysis is strictly advisory.

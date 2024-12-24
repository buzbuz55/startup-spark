import FirecrawlApp from "@mendable/firecrawl-js";

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

interface ErrorResponse {
  success: false;
  error: string;
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

class FirecrawlService {
  private static instance: FirecrawlApp;

  private static getInstance(): FirecrawlApp {
    if (!this.instance) {
      this.instance = new FirecrawlApp({
        apiKey: import.meta.env.VITE_FIRECRAWL_API_KEY || '',
      });
    }
    return this.instance;
  }

  static async crawlWebsite(url: string) {
    const firecrawl = this.getInstance();
    try {
      const response = await firecrawl.crawlUrl(url, {
        limit: 10, // Using limit instead of maxPages
        scrapeOptions: {
          formats: ['markdown', 'html'],
        }
      });
      return response as CrawlResponse;
    } catch (error) {
      console.error('Error crawling website:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      } as ErrorResponse;
    }
  }
}

export default FirecrawlService;
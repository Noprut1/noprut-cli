import type { CliConfig } from '../types/index.js';

const DEFAULT_API_BASE_URL = 'https://www.noprut-ai.dev';
const PLACEHOLDER_API_BASE_URL = 'https://www.noprut-ai.dev';

export function getConfig(): CliConfig {
    let baseUrl = process.env.NOPRUT_API_BASE_URL || process.env.NOPRUT_API_BASE_URL || DEFAULT_API_BASE_URL;
    if (baseUrl.replace(/\/+$/, '') === PLACEHOLDER_API_BASE_URL) baseUrl = DEFAULT_API_BASE_URL;

    // Normalize base URL: strip /v1 /v2 etc. if present (Next.js subpath)
    // API endpoints use /api/ prefix directly, not under /v1/
    baseUrl = baseUrl.replace(/\/v\d+\/?$/, '').replace(/\/+$/, '');

    const rawKey = process.env.NOPRUT_API_KEY || process.env.NOPRUT_API_KEY || '';
    const modelId = process.env.NOPRUT_MODEL_ID || process.env.NOPRUT_MODEL_ID;

    if (!rawKey) {
        console.error('❌ Error: NOPRUT_API_KEY environment variable is required');
        console.error('Please set it in your .env file or export it in your shell');
        console.error('Example:');
        console.error('  export NOPRUT_API_KEY=noprut_your_key');
        process.exit(1);
    }

    // Support combined format: "noprut_xxx:token" or just "noprut_xxx"
    const colonIndex = rawKey.indexOf(':');
    const apiKey = colonIndex !== -1 ? rawKey.substring(0, colonIndex) : rawKey;
    const apiToken = colonIndex !== -1 ? rawKey.substring(colonIndex + 1) : undefined;

    return {
        baseUrl,
        apiKey,
        apiToken,
        bearerToken: rawKey,
        modelId: modelId || undefined,
    };
}

export function validateConfig(config: CliConfig): void {
    if (!config.baseUrl) {
        console.error('❌ Error: NOPRUT_API_BASE_URL is not set');
        process.exit(1);
    }

    if (!config.apiKey) {
        console.error('❌ Error: NOPRUT_API_KEY is not set');
        process.exit(1);
    }
}

export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string, defaultHeaders: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: any,
    customHeaders?: HeadersInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      ...this.defaultHeaders,
      ...customHeaders,
    };

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorBody}`);
    }

    // If there's no content, return undefined
    if (response.status === 204) {
      return undefined as T;
    }

    return await response.json();
  }

  public get<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, customHeaders);
  }

  public post<T>(endpoint: string, body: any, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>('POST', endpoint, body, customHeaders);
  }

  public put<T>(endpoint: string, body: any, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>('PUT', endpoint, body, customHeaders);
  }

  public delete<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, customHeaders);
  }
}

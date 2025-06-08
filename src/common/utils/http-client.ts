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

export type ApiError = {
  code: string;
  detail: string;
};

export type Result<T> = {
  success: true;
  data: T;
  status: number;
} | {
  success: false;
  error: ApiError;
  status: number;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
  status: number;
  success: boolean;
};

export class HttpClientV2 {
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
  ): Promise<ApiResponse<T>> {
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

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        let error: ApiError;
        try {
          const errorResponse = await response.json();
          console.log('Raw API error response:', errorResponse); // Debug log
          
          // Flatten nested error structure
          let code: string;
          let detail: string;
          
          if (errorResponse.error?.error) {
            // Handle { error: { error: { code, detail } } } structure
            code = errorResponse.error.error.code || 'API_ERROR';
            detail = errorResponse.error.error.detail || errorResponse.error.error.message || 'An error occurred';
          } else if (errorResponse.error) {
            // Handle { error: { code, detail } } structure
            code = errorResponse.error.code || 'API_ERROR';
            detail = errorResponse.error.detail || errorResponse.error.message || 'An error occurred';
          } else {
            // Handle { code, detail } structure
            code = errorResponse.code || 'API_ERROR';
            detail = errorResponse.detail || errorResponse.message || 'An error occurred';
          }
          
          error = { code, detail };
          
        } catch {
          error = {
            code: 'HTTP_ERROR',
            detail: `HTTP error ${response.status}: ${response.statusText}`
          };
        }

        return {
          success: false,
          error,
          status: response.status
        };
      }

      if (response.status === 204) {
        return {
          success: true,
          data: undefined as T,
          status: response.status
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
        status: response.status
      };

    } catch (networkError) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          detail: networkError instanceof Error ? networkError.message : 'Unknown error'
        },
        status: 0
      };
    }
  }

  public get<T>(endpoint: string, customHeaders?: HeadersInit): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, customHeaders);
  }

  public post<T>(endpoint: string, body: any, customHeaders?: HeadersInit): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, body, customHeaders);
  }

  public put<T>(endpoint: string, body: any, customHeaders?: HeadersInit): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, body, customHeaders);
  }

  public delete<T>(endpoint: string, customHeaders?: HeadersInit): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, customHeaders);
  }
}
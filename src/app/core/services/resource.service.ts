import { inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  body?: unknown;
  params?:
    | HttpParams
    | Record<string, string | number | boolean | null | undefined>;
  headers?: HttpHeaders | Record<string, string>;
}

function stripTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export abstract class ResourceService<TModel = unknown> {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = stripTrailingSlash(environment.baseURL);

  protected constructor(
    protected readonly resourcePath: string,
    private readonly commonHeaders?: Record<string, string>,
  ) {}

  private buildUrl(path?: string): string {
    const resourceBase = `${this.baseUrl}/${this.resourcePath}`;
    return path ? `${resourceBase}/${path}` : resourceBase;
  }

  private buildHeaders(headers?: HttpHeaders | Record<string, string>): HttpHeaders | undefined {
    let result: HttpHeaders | undefined;

    if (headers instanceof HttpHeaders) {
      result = headers;
    } else if (headers) {
      result = new HttpHeaders(headers);
    }

    if (this.commonHeaders) {
      result = (result ?? new HttpHeaders()).set(
        Object.keys(this.commonHeaders)[0],
        Object.values(this.commonHeaders)[0] as string
      );
    }

    return result;
  }

  private buildParams(
    params?: HttpParams | Record<string, string | number | boolean | null | undefined>,
  ): HttpParams | undefined {
    if (!params) return undefined;
    if (params instanceof HttpParams) return params;

    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return httpParams;
  }

  protected get<R = TModel>(
    path = '',
    options: RequestOptions = {},
  ): Observable<R> {
    const url = this.buildUrl(path);
    const headers = this.buildHeaders(options.headers);
    const params = this.buildParams(options.params);

    return this.http.get<R>(url, { headers, params });
  }

  protected getById<R = TModel>(
    id: string | number,
    options?: RequestOptions,
  ): Observable<R> {
    return this.get<R>(String(id), options);
  }

}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassifyResponse } from '../dto/result/ClassifyResponse';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalClassifyerRes {
  private readonly http = inject(HttpClient);
  private readonly classUrl = '/animals';

  /**
   * Sends an image file to the FastAPI backend for classification.
   *
   * @param file - The File object
   * @param topK - Number of top prediction results to return (default: 5)
   * @returns Promise resolve with classification predictions
   */
  async classifyDogAndCats(file: File, topK: number = 5): Promise<ClassifyResponse> {
    // Client-side validation mirroring backend constraints
    if (!file || file.size === 0) {
      throw new Error('Uploaded file is empty.');
    }

    if (topK < 1) {
      throw new Error('topK parameter must be greater than or equal to 1.');
    }

    // Construct multipart/form-data payload
    const formData = new FormData();
    formData.append('file', file);

    // Construct query parameter URL
    const url = `${environment.apiFastApiUrl}${this.classUrl}/classifyDogAndCats?top_k=${encodeURIComponent(topK)}`;

    try {
      // HttpClient automatically sets multipart boundary headers for FormData
      // firstValueFrom converts the Observable to a Promise for your async/await workflow
      const data = await firstValueFrom(this.http.post<ClassifyResponse>(url, formData));

      return data;
    } catch (error: any) {
      // Angular HttpClient automatically wraps HTTP errors in HttpErrorResponse
      const detail =
        error?.error?.detail ||
        error?.message ||
        'An unknown error occurred during image classification.';
      throw new Error(detail);
    }
  }
}

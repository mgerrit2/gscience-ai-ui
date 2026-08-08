import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassifyResponse } from '../dto/result/ClassifyResponse';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalClassifyerRes {

  private readonly classUrl = '/animals';

  /**
   * Sends an image file to the FastAPI backend for classification.
   *
   * @param file - The File object (from an HTML <input type="file"> or Drag-and-Drop)
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
      const response = await fetch(url, {
        method: 'POST',
        body: formData, // Fetch automatically sets 'Content-Type: multipart/form-data'
      });

      if (!response.ok) {
        // Parse FastAPI HTTPExceptions (400, 500)
        const errorData = await response.json().catch(() => null);
        const detail = errorData?.detail || `HTTP Error ${response.status}: ${response.statusText}`;
        throw new Error(detail);
      }

      const data: ClassifyResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred during image classification.');
    }
  }
}

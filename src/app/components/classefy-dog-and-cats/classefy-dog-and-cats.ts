import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AnimalClassifyerRes } from '../../res/animal-classifyer-res';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-classefy-dog-and-cats',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    FloatLabel
  ],
  templateUrl: './classefy-dog-and-cats.html',
  styleUrl: './classefy-dog-and-cats.scss',
})
export class ClassefyDogAndCats {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  private readonly animalClassifyerRs = inject(AnimalClassifyerRes);

  filePictureToUpload: File | null = null;
  imageBytes: SafeUrl = '';

  isLoading = false;
  errorMessage = '';

  pictureDefault = true;

  form = new FormGroup({
    topPrediction: new FormControl(''),
    allPrediction: new FormControl(''),
  });

  //region getters for formcontrol
  get getTopPrediction(): FormControl {
    // We cast it to FormControl to easily access its value property later
    return this.form.get('topPrediction') as FormControl;
  }

  get getAllPrediction(): FormControl {
    // We cast it to FormControl to easily access its value property later
    return this.form.get('allPrediction') as FormControl;
  }
  //endregion

  /**
   * get the picture file, and transform to base64 string
   * @protected
   */
  protected async handleFileInput() {
    const files: FileList | null = this.fileInputRef.nativeElement.files;

    if (files && files.length > 0) {
      const file = files[0];

      this.pictureDefault = false;

      // clear prediction
      this.getTopPrediction.setValue('');
      this.getAllPrediction.setValue('');

      console.log('file:' + file.name + ' is loaded');

      // Use FileReader to convert the file into a data URL (Base64 string)
      const reader = new FileReader();

      reader.onload = () => {
        // Set the imageBytes property and update the display flag
        this.imageBytes = this.imageBytes = reader.result as string;
        this.filePictureToUpload = files.item(0);
      };

      // Start reading the file as a data URL
      reader.readAsDataURL(file);
    }
  }

  async checkWhichAnimal() {
    if (!this.filePictureToUpload) {
      this.errorMessage = 'Please select an image first.';
      return;
    }

    this.pictureDefault = false;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // FIX: Pass the raw File object (this.filePictureToUpload), not the Base64 SafeUrl
      const result = await this.animalClassifyerRs.classifyDogAndCats(this.filePictureToUpload, 5);

      // 1. Get the top prediction object
      const topPrediction = result.predictions[0];

      // 2. Get the text label
      const topLabel = topPrediction ? topPrediction.label : 'Unknown';

      // 3. Set the text label into your Reactive Form Input
      this.getTopPrediction.setValue(topLabel);
      this.getAllPrediction.setValue(JSON.stringify(result.predictions));

      console.log('Classification Result:', JSON.stringify(result));
    } catch (error: any) {
      console.error('Classification failed:', error);
      this.errorMessage = error?.error?.detail || error?.message || 'Inference error standard.';
    } finally {
      this.isLoading = false;
    }
  }
}

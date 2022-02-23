import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public uploader: FileUploader = null;
  previewImg: SafeUrl;
  images: any[];
  imageURL = environment.baseURL + '/' + environment.context + '/image2/';
  URL = environment.baseURL + '/' + environment.context + '/image/upload';

  constructor(private sanitizer: DomSanitizer) {
    this.uploader = new FileUploader({url: this.URL});
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      this.previewImg = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file)));;
    }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200) {
        this.images = JSON.parse(response);
      }
    };
    this.uploader.onErrorItem = ((item: any, response: string, status: number, headers: any): any => {
      if (status === 500) {
        console.log(response);
      }
    });
  }


  upload(fileInputEvent: any){
    this.uploader.clearQueue();
    this.uploader.addToQueue([fileInputEvent.target.files[0]]);
    this.uploader.uploadAll();
  }
}

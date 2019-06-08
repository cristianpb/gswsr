import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  documents: any = [];
  timer;
  currentPage = 0;

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    this.getDocuments();
    this.timer = setInterval(() => {
      this.updateDocuments()
    }, 30000);
  }

  updateDocuments() {
    this.twitter.fetchDocuments(0).subscribe((result: any) => {
      result.data.forEach((item) => {
        if (this.documents.map(item => item.id).indexOf(item.id) === -1) {
          this.documents.unshift(item)
        }
      })
    });
  }

  getDocuments() {
    this.twitter.fetchDocuments(this.currentPage).subscribe((result: any) => {
      result.data.forEach((item) => {
        if (this.documents.map(item => item.id).indexOf(item.id) === -1) {
          this.documents.push(item)
        }
      })
    });
  }

  nextPage() {
    this.currentPage++;
    this.getDocuments();
  }

}

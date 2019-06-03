import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  documents: any = [];
  currentPage = 0;

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments() {
    this.twitter.fetchDocuments(this.currentPage).subscribe((result: any) => {
      result.data.forEach((item) => {
        this.documents.push(item)
      })
    });
  }

  nextPage() {
    this.currentPage++;
    this.getDocuments();
  }

}

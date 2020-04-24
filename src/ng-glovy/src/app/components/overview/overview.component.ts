import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpRequest } from '../../types';

declare let chrome;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public isIntercepting: boolean;
  public requests: HttpRequest[];

  constructor(
    public _ChangeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.requests = [];
    this.registerEvents();
    this.intercept();
  }

  public intercept(): void {
    this.isIntercepting = true;
  }

  public pause(): void {
    this.isIntercepting = false;
  }

  public registerEvents(): void {
    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        const outgoingHttpRequest = {
          origin: details.initiator,
          target: details.url,
          method: details.method,
          body: details.body,
        };
        if (this.requests.length < 100) {
          this.requests.push(outgoingHttpRequest);
          this._ChangeDetectorRef.detectChanges();
        }
    },
      {urls: ['<all_urls>']},
    );
  }
}

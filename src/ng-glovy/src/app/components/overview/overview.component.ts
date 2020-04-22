import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpRequest } from '../../types';

declare let chrome;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public maximized: boolean;
  public requests: HttpRequest[];

  constructor(
    public _ChangeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.maximized = true;
    this.requests = [];
    this.registerEvents();
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
          this.detectChanges();
        }
    },
      {urls: ['<all_urls>']},
    );
  }

  public detectChanges() {
    this._ChangeDetectorRef.detectChanges();
  }

  public getDocumentHeight() {
    return document.body.clientHeight;
  }

  public resize(maximize: boolean): void {
    this.maximized = maximize;
    this.detectChanges();
    const newHeight = this.getDocumentHeight();
    window.top.postMessage({action: 'RESIZE', height: newHeight}, '*');
  }

  public close(): void {
    window.top.postMessage({action: 'CLOSE'}, '*');
  }



}

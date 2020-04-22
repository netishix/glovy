import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpRequest } from '../../types';

declare let chrome;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public showGlovyContent: boolean;
  public requests: HttpRequest[];
  constructor(
    public _ChangeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.showGlovyContent = true;
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
          this._ChangeDetectorRef.detectChanges();
        }
    },
      {urls: ['<all_urls>']},
    );
  }

  public onToolbarResize(event) {
    this.showGlovyContent = event.isMaximized;
    this._ChangeDetectorRef.detectChanges();
  }

}

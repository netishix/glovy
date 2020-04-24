import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public showGlovyContent: boolean;
  constructor(
    public _ChangeDetectorRef: ChangeDetectorRef
  ) {
    this.showGlovyContent = true;
  }

  public onToolbarResize(event) {
    this.showGlovyContent = event.isMaximized;
    this._ChangeDetectorRef.detectChanges();
  }
}

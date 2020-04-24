import { Component, OnInit, EventEmitter, Output } from '@angular/core';

const DEFAULT_DRAG_IMAGE = new Image();
DEFAULT_DRAG_IMAGE.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() resized = new EventEmitter();
  public lastYDragged;

  constructor() { }

  ngOnInit() {}

  public runAction(action: 'VERTICAL_RESIZE' | 'MAXIMIZE' | 'MINIMIZE' | 'CLOSE', data: any = {}): void {
    let message;
    switch (action) {
      case 'VERTICAL_RESIZE':
        message = {action, movementY: data.movementY};
        break;
      case 'MAXIMIZE':
      case 'MINIMIZE':
        this.resized.emit({isMaximized: action === 'MAXIMIZE'});
        const newHeight = document.body.clientHeight;
        message = {action, height: newHeight};
        break;
      case 'CLOSE':
        message = {action};
        break;
    }
    window.top.postMessage(message, '*');
  }

  public onDragStart(e) {
    this.lastYDragged = e.screenY;
    e.dataTransfer.setDragImage(DEFAULT_DRAG_IMAGE, 0, 0);
  }

  public onDrag(e) {
    if (e.screenY !== 0) {
      const movementY = this.lastYDragged - e.screenY;
      this.runAction('VERTICAL_RESIZE', {movementY});
      this.lastYDragged = e.screenY;
    }
  }

}

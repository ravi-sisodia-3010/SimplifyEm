import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'interactive-message',
  standalone: true,
  templateUrl: './interactive-message.component.html',
  styleUrls: ['./interactive-message.component.scss'],
  imports: [
    IonicModule
  ]
})
export class InteractiveMessageComponent {
  @Input("message") message?: string
  @Input("actionText") actionText: string = ""
  @Output("action") action = new EventEmitter()

  userClickedActionButton = () => {
    this.action.emit(this)
  }
}

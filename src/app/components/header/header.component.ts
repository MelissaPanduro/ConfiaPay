import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <button class="back-button" routerLink="{{backRoute}}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="title">{{title}}</h1>
      <div class="actions">
        <ng-content></ng-content>
      </div>
    </header>
  `,
  styles: [
    `
    .header {
      display: flex;
      align-items: center;
      padding: 16px;
      background-color: white;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .back-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      margin-right: 8px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .title {
      flex: 1;
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    
    .actions {
      display: flex;
      gap: 8px;
    }
  `,
  ],
})
export class HeaderComponent {
  @Input() title = ""
  @Input() backRoute = "/home"
}

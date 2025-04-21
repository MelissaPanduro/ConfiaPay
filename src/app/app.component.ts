import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <main class="app-container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
    .app-container {
      max-width: 500px;
      margin: 0 auto;
      height: 100vh;
      background-color: #f8f9fa;
      position: relative;
      overflow: hidden;
    }
  `,
  ],
})
export class AppComponent {
  title = "confiapay"
}

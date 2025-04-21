import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-bottom-nav",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bottom-nav">
      <a routerLink="/home" routerLinkActive="active" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Inicio</span>
      </a>
      <a routerLink="/market" routerLinkActive="active" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="20" x2="12" y2="10"/>
          <line x1="18" y1="20" x2="18" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="16"/>
        </svg>
        <span>Mercado</span>
      </a>
      <a routerLink="/converter" routerLinkActive="active" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 1l4 4-4 4"/>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
          <path d="M7 23l-4-4 4-4"/>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
        </svg>
        <span>Convertir</span>
      </a>
      <a routerLink="/card" routerLinkActive="active" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
        <span>Tarjeta</span>
      </a>
    </nav>
  `,
  styles: [
    `
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      background-color: white;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
      padding: 8px 0;
      max-width: 500px;
      margin: 0 auto;
      z-index: 100;
    }
    
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 0;
      color: #6c757d;
      text-decoration: none;
      width: 25%;
      font-size: 12px;
    }
    
    .nav-item svg {
      margin-bottom: 4px;
      width: 20px;
      height: 20px;
    }
    
    .nav-item.active {
      color: #7e3af2;
    }
  `,
  ],
})
export class BottomNavComponent {}

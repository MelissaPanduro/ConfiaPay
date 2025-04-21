import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { HeaderComponent } from "../../components/header/header.component"
import { BottomNavComponent } from "../../components/bottom-nav/bottom-nav.component"
import { CryptoCardComponent } from "../../components/crypto-card/crypto-card.component"
import type { CryptoService, CryptoPrice } from "../../services/crypto.service"

@Component({
  selector: "app-market",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, BottomNavComponent, CryptoCardComponent],
  template: `
    <div class="market-container">
      <app-header title="Mercado" backRoute="/home"></app-header>
      
      <div class="content">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Buscar" class="search-input">
        </div>
        
        <div class="tabs">
          <button class="tab-button active">Seguimientos</button>
          <button class="tab-button">Tendencia</button>
          <button class="tab-button">Mayor valor</button>
        </div>
        
        <div class="crypto-list">
          <app-crypto-card *ngFor="let crypto of cryptos" [crypto]="crypto"></app-crypto-card>
        </div>
      </div>
      
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [
    `
    .market-container {
      min-height: 100vh;
      background-color: #f8f9fa;
      padding-bottom: 80px;
    }
    
    .content {
      padding: 16px;
    }
    
    .search-bar {
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .search-icon {
      color: #6c757d;
      margin-right: 12px;
    }
    
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 16px;
    }
    
    .tabs {
      display: flex;
      margin-bottom: 16px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    
    .tabs::-webkit-scrollbar {
      display: none;
    }
    
    .tab-button {
      flex: 1;
      padding: 12px 16px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: 14px;
      font-weight: 500;
      color: #6c757d;
      white-space: nowrap;
    }
    
    .tab-button.active {
      color: #7e3af2;
      border-bottom-color: #7e3af2;
    }
    
    .crypto-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `,
  ],
})
export class MarketComponent implements OnInit {
  cryptos: CryptoPrice[] = []

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.getTopCryptos(10).subscribe((cryptos) => {
      this.cryptos = cryptos
    })
  }
}

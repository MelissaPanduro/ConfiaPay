import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { HeaderComponent } from "../../components/header/header.component"
import { BottomNavComponent } from "../../components/bottom-nav/bottom-nav.component"
import { CryptoCardComponent } from "../../components/crypto-card/crypto-card.component"
import type { WalletService } from "../../services/wallet.service"
import type { CryptoService, CryptoPrice } from "../../services/crypto.service"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, BottomNavComponent, CryptoCardComponent],
  template: `
    <div class="home-container">
      <div class="welcome-section">
        <h1 class="welcome-title">Bienvenido</h1>
        <p class="welcome-subtitle">Entramos sin fronteras, al instante.</p>
        <button class="product-button" routerLink="/market">Producto ahora</button>
      </div>
      
      <div class="wallet-card">
        <div class="wallet-icon">
          <img src="assets/wallet-icon.png" alt="Wallet">
        </div>
        <div class="wallet-info">
          <p class="wallet-label">Wallet</p>
          <p class="wallet-address">{{walletAddress}}</p>
        </div>
        <div class="wallet-balance">
          <p class="balance-label">Balance</p>
          <p class="balance-amount">{{balance}} ETH</p>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="action-button" routerLink="/card">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2"/>
            <line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
          Calculadora
        </button>
        <button class="action-button" routerLink="/market">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          Comprar
        </button>
        <button class="action-button" routerLink="/converter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 1l4 4-4 4"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <path d="M7 23l-4-4 4-4"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          Convertir
        </button>
        <button class="action-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
          Alerta de precio
        </button>
      </div>
      
      <div class="trending-section">
        <h2 class="section-title">Tendencia</h2>
        <div class="crypto-list">
          <app-crypto-card *ngFor="let crypto of trendingCryptos" [crypto]="crypto"></app-crypto-card>
        </div>
      </div>
      
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [
    `
    .home-container {
      padding: 24px 16px 80px;
      background-color: #f8f9fa;
      min-height: 100vh;
    }
    
    .welcome-section {
      background: linear-gradient(135deg, #7e3af2 0%, #6c2bd9 100%);
      border-radius: 16px;
      padding: 24px;
      color: white;
      margin-bottom: 24px;
      position: relative;
      overflow: hidden;
    }
    
    .welcome-section::after {
      content: '';
      position: absolute;
      right: -20px;
      bottom: -20px;
      width: 120px;
      height: 120px;
      background-image: url('assets/wallet-icon.png');
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.2;
    }
    
    .welcome-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .welcome-subtitle {
      font-size: 16px;
      opacity: 0.8;
      margin-bottom: 16px;
    }
    
    .product-button {
      background-color: white;
      color: #7e3af2;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
    }
    
    .wallet-card {
      background-color: white;
      border-radius: 16px;
      padding: 16px;
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .wallet-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
    }
    
    .wallet-icon img {
      width: 24px;
      height: 24px;
    }
    
    .wallet-info {
      flex: 1;
    }
    
    .wallet-label {
      font-size: 14px;
      color: #6c757d;
      margin: 0;
    }
    
    .wallet-address {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
    }
    
    .wallet-balance {
      text-align: right;
    }
    
    .balance-label {
      font-size: 14px;
      color: #6c757d;
      margin: 0;
    }
    
    .balance-amount {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
    }
    
    .action-buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .action-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      border: none;
      border-radius: 12px;
      padding: 16px 8px;
      font-size: 12px;
      color: #6c757d;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .action-button svg {
      margin-bottom: 8px;
      color: #7e3af2;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    
    .crypto-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `,
  ],
})
export class HomeComponent implements OnInit {
  walletAddress = ""
  balance = "0"
  trendingCryptos: CryptoPrice[] = []

  constructor(
    private walletService: WalletService,
    private cryptoService: CryptoService,
  ) {}

  ngOnInit(): void {
    this.walletService.account$.subscribe((account) => {
      this.walletAddress = account ? this.walletService.getShortAddress(account) : "Not connected"
    })

    this.walletService.balance$.subscribe((balance) => {
      this.balance = Number.parseFloat(balance).toFixed(4)
    })

    this.cryptoService.getTopCryptos(3).subscribe((cryptos) => {
      this.trendingCryptos = cryptos
    })
  }
}

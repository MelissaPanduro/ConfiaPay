import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { ActivatedRoute } from "@angular/router"
import { HeaderComponent } from "../../components/header/header.component"
import { BottomNavComponent } from "../../components/bottom-nav/bottom-nav.component"
import type { CryptoService, CryptoDetail } from "../../services/crypto.service"

@Component({
  selector: 'app-market-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BottomNavComponent],
  template: `
    <div class="detail-container">
      <app-header [title]="crypto?.symbol?.toUpperCase() || 'Detalle'" backRoute="/market"></app-header>
      
      <div class="content" *ngIf="crypto">
        <div class="crypto-header">
          <div class="crypto-info">
            <img [src]="crypto.image.large" [alt]="crypto.name" class="crypto-image">
            <div>
              <h1 class="crypto-name">{{crypto.name}}</h1>
              <p class="crypto-symbol">{{crypto.symbol.toUpperCase()}}</p>
            </div>
          </div>
          <div class="crypto-price">
            <h2 class="price\">${{ crypto.market_data.current_price.usd.toLocaleString() }}</h2>
            <p class="price-change" [ngClass]="{'positive': crypto.market_data.price_change_percentage_24h > 0, 'negative': crypto.market_data.price_change_percentage_24h < 0}">
              <svg *ngIf="crypto.market_data.price_change_percentage_24h > 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
              <svg *ngIf="crypto.market_data.price_change_percentage_24h < 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
              {{crypto.market_data.price_change_percentage_24h.toFixed(2)}}%
            </p>
          </div>
        </div>
        
        <div class="chart-container">
          <div class="chart-tabs">
            <button class="chart-tab active">24H</button>
            <button class="chart-tab">1W</button>
            <button class="chart-tab">1M</button>
            <button class="chart-tab">3M</button>
            <button class="chart-tab">ALL</button>
          </div>
          
          <div class="chart">
            <svg viewBox="0 0 500 200" class="chart-svg">
              <path d="M0,100 C100,10 250,190 500,50" fill="none" stroke="#7e3af2" stroke-width="2"></path>
            </svg>
          </div>
        </div>
        
        <div class="stats-container">
          <h3 class="section-title">Estadística de mercado</h3>
          
          <div class="stat-row">
            <div class="stat-label">Capitalización de mercado</div>
            <div class="stat-value">${{crypto.market_data.market_cap.usd.toLocaleString()}}</div>
          </div>
          
          <div class="stat-row">
            <div class="stat-label">Suministro circulante</div>
            <div class="stat-value">{{(crypto.market_data.market_cap.usd / crypto.market_data.current_price.usd).toLocaleString()}} {{crypto.symbol.toUpperCase()}}</div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="action-button">Establecer alerta</button>
          <button class="action-button primary">Comprar ahora</button>
        </div>
      </div>
      
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
    .detail-container {
      min-height: 100vh;
      background-color: #f8f9fa;
      padding-bottom: 80px;
    }
    
    .content {
      padding: 16px;
    }
    
    .crypto-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    
    .crypto-info {
      display: flex;
      align-items: center;
    }
    
    .crypto-image {
      width: 48px;
      height: 48px;
      margin-right: 16px;
    }
    
    .crypto-name {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
    
    .crypto-symbol {
      font-size: 14px;
      color: #6c757d;
      margin: 0;
    }
    
    .crypto-price {
      text-align: right;
    }
    
    .price {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
    
    .price-change {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
      margin: 0;
    }
    
    .positive {
      color: #10b981;
    }
    
    .negative {
      color: #ef4444;
    }
    
    .chart-container {
      background-color: white;
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .chart-tabs {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    
    .chart-tab {
      padding: 8px 12px;
      background: none;
      border: none;
      font-size: 14px;
      color: #6c757d;
      border-radius: 8px;
      cursor: pointer;
    }
    
    .chart-tab.active {
      background-color: #7e3af2;
      color: white;
    }
    
    .chart {
      height: 200px;
    }
    
    .chart-svg {
      width: 100%;
      height: 100%;
    }
    
    .stats-container {
      background-color: white;
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .section-title {
      font-size: 16px;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 16px;
    }
    
    .stat-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .stat-row:last-child {
      border-bottom: none;
    }
    
    .stat-label {
      color: #6c757d;
    }
    
    .stat-value {
      font-weight: 600;
    }
    
    .action-buttons {
      display: flex;
      gap: 16px;
    }
    
    .action-button {
      flex: 1;
      padding: 14px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #e2e8f0;
      background-color: white;
    }
    
    .action-button.primary {
      background: linear-gradient(135deg, #7e3af2 0%, #6c2bd9 100%);
      color: white;
      border: none;
    }
  `]
})
export class MarketDetailComponent implements OnInit {
  crypto: CryptoDetail | null = null

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params["id"]
      if (id) {
        this.cryptoService.getCryptoDetail(id).subscribe((crypto) => {
          this.crypto = crypto
        })
      }
    })
  }
}

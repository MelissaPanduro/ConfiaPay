import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import type { CryptoPrice } from "../../services/crypto.service"

@Component({
  selector: 'app-crypto-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="crypto-card" [routerLink]="['/market', crypto.id]">
      <div class="crypto-icon">
        <img [src]="crypto.image" [alt]="crypto.name">
      </div>
      <div class="crypto-info">
        <div class="crypto-name">
          <span class="symbol">{{crypto.symbol.toUpperCase()}}</span>
          <span class="name">{{crypto.name}}</span>
        </div>
        <div class="crypto-price">
          <span class="price\">${{crypto.current_price.toLocaleString()}}</span>
          <span class="change" [ngClass]="{'positive': crypto.price_change_percentage_24h > 0, 'negative': crypto.price_change_percentage_24h < 0}">
            <svg *ngIf="crypto.price_change_percentage_24h > 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <svg *ngIf="crypto.price_change_percentage_24h < 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
            {{crypto.price_change_percentage_24h.toFixed(2)}}%
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .crypto-card {
      display: flex;
      align-items: center;
      padding: 16px;
      background-color: white;
      border-radius: 12px;
      margin-bottom: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .crypto-card:hover {
      transform: translateY(-2px);
    }
    
    .crypto-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 16px;
      background-color: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .crypto-icon img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
    
    .crypto-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .crypto-name {
      display: flex;
      flex-direction: column;
    }
    
    .symbol {
      font-weight: 600;
      font-size: 16px;
    }
    
    .name {
      font-size: 14px;
      color: #6c757d;
    }
    
    .crypto-price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    
    .price {
      font-weight: 600;
      font-size: 16px;
    }
    
    .change {
      display: flex;
      align-items: center;
      font-size: 14px;
      gap: 4px;
    }
    
    .positive {
      color: #10b981;
    }
    
    .negative {
      color: #ef4444;
    }
  `]
})
export class CryptoCardComponent {
  @Input() crypto!: CryptoPrice
}

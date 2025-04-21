import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { HeaderComponent } from "../../components/header/header.component"
import { BottomNavComponent } from "../../components/bottom-nav/bottom-nav.component"
import type { CryptoService } from "../../services/crypto.service"

interface CryptoOption {
  id: string
  symbol: string
  name: string
  image: string
  price: number
}

@Component({
  selector: "app-converter",
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, BottomNavComponent],
  template: `
    <div class="converter-container">
      <app-header [title]="'Convertir'" [backRoute]="'/home'"></app-header>
      
      <div class="content">
        <div class="converter-card">
          <div class="crypto-row" *ngFor="let option of cryptoOptions; let i = 0">
            <div class="crypto-info">
              <div class="crypto-icon">
                <img [src]="option.image" [alt]="option.name">
              </div>
              <div class="crypto-details">
                <div class="crypto-symbol">{{option.symbol.toUpperCase()}}</div>
                <div class="crypto-name">{{option.name}}</div>
              </div>
            </div>
            <div class="crypto-input">
              <input type="number" [(ngModel)]="amounts[i]" (ngModelChange)="updateConversion(i)" [placeholder]="'0.00'" class="amount-input">
            </div>
          </div>
        </div>
        
        <div class="keypad">
          <div class="keypad-row">
            <button class="keypad-button" (click)="appendToInput('1')">1</button>
            <button class="keypad-button" (click)="appendToInput('2')">2</button>
            <button class="keypad-button" (click)="appendToInput('3')">3</button>
          </div>
          <div class="keypad-row">
            <button class="keypad-button" (click)="appendToInput('4')">4</button>
            <button class="keypad-button" (click)="appendToInput('5')">5</button>
            <button class="keypad-button" (click)="appendToInput('6')">6</button>
          </div>
          <div class="keypad-row">
            <button class="keypad-button" (click)="appendToInput('7')">7</button>
            <button class="keypad-button" (click)="appendToInput('8')">8</button>
            <button class="keypad-button" (click)="appendToInput('9')">9</button>
          </div>
          <div class="keypad-row">
            <button class="keypad-button" (click)="appendToInput('.')">.</button>
            <button class="keypad-button" (click)="appendToInput('0')">0</button>
            <button class="keypad-button delete-button" (click)="deleteFromInput()">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                <line x1="18" y1="9" x2="12" y2="15"/>
                <line x1="12" y1="9" x2="18" y2="15"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [
    `
    .converter-container {
      min-height: 100vh;
      background-color: #f8f9fa;
      padding-bottom: 80px;
    }
    
    .content {
      padding: 24px 16px;
    }
    
    .converter-card {
      background-color: white;
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .crypto-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .crypto-row:last-child {
      border-bottom: none;
    }
    
    .crypto-info {
      display: flex;
      align-items: center;
    }
    
    .crypto-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 12px;
      background-color: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .crypto-icon img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
    
    .crypto-symbol {
      font-weight: 600;
      font-size: 16px;
    }
    
    .crypto-name {
      font-size: 14px;
      color: #6c757d;
    }
    
    .amount-input {
      width: 120px;
      text-align: right;
      font-size: 16px;
      border: none;
      outline: none;
      padding: 8px;
    }
    
    .keypad {
      background-color: white;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .keypad-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    
    .keypad-row:last-child {
      margin-bottom: 0;
    }
    
    .keypad-button {
      width: 30%;
      height: 60px;
      border-radius: 12px;
      border: none;
      background-color: #f8f9fa;
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .keypad-button:hover {
      background-color: #e9ecef;
    }
    
    .delete-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
  ],
})
export class ConverterComponent {
  cryptoOptions: CryptoOption[] = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      price: 32128.8,
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      price: 1200.0,
    },
  ]

  amounts: number[] = [0, 0]
  activeInputIndex = 0

  constructor(private cryptoService: CryptoService) {
    this.loadCryptoData()
  }

  loadCryptoData() {
    this.cryptoService.getTopCryptos(2).subscribe((cryptos) => {
      if (cryptos.length >= 2) {
        this.cryptoOptions = cryptos.map((crypto) => ({
          id: crypto.id,
          symbol: crypto.symbol,
          name: crypto.name,
          image: crypto.image,
          price: crypto.current_price,
        }))
      }
    })
  }

  updateConversion(index: number) {
    this.activeInputIndex = index
    const otherIndex = index === 0 ? 1 : 0

    if (this.amounts[index]) {
      const conversionRate = this.cryptoOptions[index].price / this.cryptoOptions[otherIndex].price
      this.amounts[otherIndex] = Number.parseFloat((this.amounts[index] * conversionRate).toFixed(8))
    } else {
      this.amounts[otherIndex] = 0
    }
  }

  appendToInput(value: string) {
    const currentValue = this.amounts[this.activeInputIndex]?.toString() || "0"

    if (value === "." && currentValue.includes(".")) {
      return
    }

    const newValue = currentValue === "0" && value !== "." ? value : currentValue + value
    this.amounts[this.activeInputIndex] = Number.parseFloat(newValue)
    this.updateConversion(this.activeInputIndex)
  }

  deleteFromInput() {
    const currentValue = this.amounts[this.activeInputIndex]?.toString() || "0"

    if (currentValue.length <= 1) {
      this.amounts[this.activeInputIndex] = 0
    } else {
      const newValue = currentValue.slice(0, -1)
      this.amounts[this.activeInputIndex] = Number.parseFloat(newValue)
    }

    this.updateConversion(this.activeInputIndex)
  }
}

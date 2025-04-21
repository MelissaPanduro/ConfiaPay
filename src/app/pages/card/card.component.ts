import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "../../components/header/header.component"
import { BottomNavComponent } from "../../components/bottom-nav/bottom-nav.component"
import type { WalletService } from "../../services/wallet.service"

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule, HeaderComponent, BottomNavComponent],
  template: `
    <div class="card-container">
      <app-header title="MI TARJETA" backRoute="/home"></app-header>
      
      <div class="content">
        <div class="card">
          <div class="card-header">
            <div class="card-type">ConfiaPay CARD</div>
            <div class="card-chip">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
          </div>
          <div class="card-number">
            <span>5412</span>
            <span>7512</span>
            <span>3412</span>
            <span>1256</span>
          </div>
          <div class="card-footer">
            <div class="card-holder">
              <div class="label">CARD HOLDER</div>
              <div class="value">{{cardHolder}}</div>
            </div>
            <div class="card-expiry">
              <div class="label">EXPIRES</div>
              <div class="value">12/25</div>
            </div>
          </div>
        </div>
        
        <div class="contacts-section">
          <h2 class="section-title">Contactos</h2>
          <div class="contacts-grid">
            <div class="contact-item">
              <div class="contact-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div class="contact-name">Maria</div>
            </div>
            <div class="contact-item">
              <div class="contact-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div class="contact-name">Carlos</div>
            </div>
            <div class="contact-item">
              <div class="contact-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div class="contact-name">Javier</div>
            </div>
            <div class="contact-item">
              <div class="contact-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div class="contact-name">Patricia</div>
            </div>
            <div class="contact-item add-contact">
              <div class="contact-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </div>
              <div class="contact-name">Añadir</div>
            </div>
          </div>
        </div>
      </div>
      
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [
    `
    .card-container {
      min-height: 100vh;
      background-color: #f8f9fa;
      padding-bottom: 80px;
    }
    
    .content {
      padding: 24px 16px;
    }
    
    .card {
      background: linear-gradient(135deg, #7e3af2 0%, #6c2bd9 100%);
      border-radius: 16px;
      padding: 24px;
      color: white;
      margin-bottom: 32px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }
    
    .card-type {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
    }
    
    .card-chip {
      width: 40px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .card-number {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      letter-spacing: 2px;
      margin-bottom: 40px;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
    }
    
    .label {
      font-size: 10px;
      opacity: 0.7;
      margin-bottom: 4px;
    }
    
    .value {
      font-size: 14px;
      font-weight: 500;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    
    .contacts-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
    
    .contact-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .contact-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #e9ecef;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }
    
    .contact-name {
      font-size: 12px;
      text-align: center;
    }
    
    .add-contact .contact-avatar {
      background-color: #7e3af2;
      color: white;
    }
  `,
  ],
})
export class CardComponent implements OnInit {
  cardHolder = "JOHN DOE"

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.walletService.account$.subscribe((account) => {
      if (account) {
        this.cardHolder = this.walletService.getShortAddress(account)
      }
    })
  }
}

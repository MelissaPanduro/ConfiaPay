import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { type Router, RouterModule } from "@angular/router"
import type { WalletService } from "../../services/wallet.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="logo-container">
        <div class="logo">
          <img src="assets/wallet-icon.png" alt="ConfiaPay Logo">
        </div>
      </div>
      
      <div class="form-container">
        <h1 class="title">Registrate</h1>
        
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" [(ngModel)]="username" placeholder="Username">
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" [(ngModel)]="password" placeholder="Password">
        </div>
        
        <button class="login-button" (click)="login()">Registrarme</button>
        
        <div class="social-login">
          <button class="social-button" (click)="connectMetamask()">
            <img src="assets/metamask-icon.png" alt="MetaMask">
          </button>
          <button class="social-button">
            <img src="assets/google-icon.png" alt="Google">
          </button>
          <button class="social-button">
            <img src="assets/apple-icon.png" alt="Apple">
          </button>
        </div>
        
        <p class="register-link">
          ¿Ya tienes una cuenta? <a routerLink="/register">Inicia sesión</a>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
    .login-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: white;
    }
    
    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 48px 0;
    }
    
    .logo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .logo img {
      width: 60px;
      height: 60px;
    }
    
    .form-container {
      flex: 1;
      padding: 24px;
      border-radius: 24px 24px 0 0;
      background-color: white;
    }
    
    .title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;
      text-align: center;
    }
    
    .form-group {
      margin-bottom: 16px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      color: #6c757d;
    }
    
    .form-group input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.2s;
    }
    
    .form-group input:focus {
      outline: none;
      border-color: #7e3af2;
    }
    
    .login-button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #7e3af2 0%, #6c2bd9 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 16px;
      transition: transform 0.2s;
    }
    
    .login-button:hover {
      transform: translateY(-2px);
    }
    
    .social-login {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 24px;
    }
    
    .social-button {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid #e2e8f0;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .social-button:hover {
      transform: translateY(-2px);
    }
    
    .social-button img {
      width: 24px;
      height: 24px;
    }
    
    .register-link {
      text-align: center;
      margin-top: 24px;
      font-size: 14px;
      color: #6c757d;
    }
    
    .register-link a {
      color: #7e3af2;
      text-decoration: none;
      font-weight: 600;
    }
  `,
  ],
})
export class LoginComponent {
  username = ""
  password = ""

  constructor(
    private walletService: WalletService,
    private router: Router,
  ) {}

  async login() {
    // In a real app, you would validate credentials
    // For demo purposes, we'll just navigate to home
    this.router.navigate(["/home"])
  }

  async connectMetamask() {
    const connected = await this.walletService.connectWallet()
    if (connected) {
      this.router.navigate(["/home"])
    }
  }
}

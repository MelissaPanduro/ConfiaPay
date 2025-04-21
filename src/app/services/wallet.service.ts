import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { ethers } from "ethers"

@Injectable({
  providedIn: "root",
})
export class WalletService {
  private provider: ethers.BrowserProvider | null = null
  private signer: ethers.Signer | null = null

  private accountSubject = new BehaviorSubject<string | null>(null)
  public account$ = this.accountSubject.asObservable()

  private balanceSubject = new BehaviorSubject<string>("0")
  public balance$ = this.balanceSubject.asObservable()

  private connectedSubject = new BehaviorSubject<boolean>(false)
  public connected$ = this.connectedSubject.asObservable()

  constructor() {
    this.checkIfConnected()
    this.setupEventListeners()
  }

  private async checkIfConnected(): Promise<void> {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          await this.connectWallet()
        }
      } catch (error) {
        console.error("Error checking connection:", error)
      }
    }
  }

  private setupEventListeners(): void {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          this.disconnectWallet()
        } else {
          this.connectWallet()
        }
      })

      window.ethereum.on("chainChanged", () => {
        window.location.reload()
      })
    }
  }

  public async connectWallet(): Promise<boolean> {
    if (!window.ethereum) {
      console.error("MetaMask is not installed!")
      return false
    }

    try {
      this.provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await this.provider.send("eth_requestAccounts", [])

      if (accounts.length > 0) {
        this.signer = await this.provider.getSigner()
        const address = await this.signer.getAddress()
        this.accountSubject.next(address)
        this.connectedSubject.next(true)

        await this.updateBalance()
        return true
      }

      return false
    } catch (error) {
      console.error("Error connecting to MetaMask:", error)
      return false
    }
  }

  public disconnectWallet(): void {
    this.provider = null
    this.signer = null
    this.accountSubject.next(null)
    this.balanceSubject.next("0")
    this.connectedSubject.next(false)
  }

  public async updateBalance(): Promise<void> {
    if (!this.provider || !this.signer) return

    try {
      const address = await this.signer.getAddress()
      const balance = await this.provider.getBalance(address)
      const formattedBalance = ethers.formatEther(balance)
      this.balanceSubject.next(formattedBalance)
    } catch (error) {
      console.error("Error updating balance:", error)
    }
  }

  public async sendTransaction(to: string, amount: string): Promise<string | null> {
    if (!this.signer) return null

    try {
      const tx = await this.signer.sendTransaction({
        to,
        value: ethers.parseEther(amount),
      })

      await tx.wait()
      await this.updateBalance()
      return tx.hash
    } catch (error) {
      console.error("Error sending transaction:", error)
      return null
    }
  }

  public getShortAddress(address: string | null): string {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }
}

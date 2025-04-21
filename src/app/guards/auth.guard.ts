import { Injectable } from "@angular/core"
import type { CanActivate, Router } from "@angular/router"
import { type Observable, map, take } from "rxjs"
import type { WalletService } from "../services/wallet.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private walletService: WalletService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.walletService.connected$.pipe(
      take(1),
      map((connected) => {
        if (!connected) {
          this.router.navigate(["/login"])
          return false
        }
        return true
      }),
    )
  }
}

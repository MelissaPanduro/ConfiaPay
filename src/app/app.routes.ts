import type { Routes } from "@angular/router"
import { AuthGuard } from "./guards/auth.guard"

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./pages/register/register.component").then((m) => m.RegisterComponent),
  },
  {
    path: "home",
    loadComponent: () => import("./pages/home/home.component").then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "card",
    loadComponent: () => import("./pages/card/card.component").then((m) => m.CardComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "converter",
    loadComponent: () => import("./pages/converter/converter.component").then((m) => m.ConverterComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "market",
    loadComponent: () => import("./pages/market/market.component").then((m) => m.MarketComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "market/:id",
    loadComponent: () => import("./pages/market-detail/market-detail.component").then((m) => m.MarketDetailComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "login",
  },
]

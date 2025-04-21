import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import { catchError } from "rxjs/operators"

export interface CryptoPrice {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

export interface CryptoDetail {
  id: string
  symbol: string
  name: string
  image: {
    large: string
  }
  market_data: {
    current_price: {
      usd: number
    }
    price_change_percentage_24h: number
    market_cap: {
      usd: number
    }
    total_volume: {
      usd: number
    }
  }
  description: {
    en: string
  }
}

@Injectable({
  providedIn: "root",
})
export class CryptoService {
  private apiUrl = "https://api.coingecko.com/api/v3"

  constructor(private http: HttpClient) {}

  getTopCryptos(limit = 10): Observable<CryptoPrice[]> {
    return this.http
      .get<CryptoPrice[]>(
        `${this.apiUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
      )
      .pipe(
        catchError((error) => {
          console.error("Error fetching crypto data:", error)
          return of(this.getMockCryptos())
        }),
      )
  }

  getCryptoDetail(id: string): Observable<CryptoDetail> {
    return this.http
      .get<CryptoDetail>(
        `${this.apiUrl}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
      )
      .pipe(
        catchError((error) => {
          console.error("Error fetching crypto detail:", error)
          return of(this.getMockCryptoDetail(id))
        }),
      )
  }

  private getMockCryptos(): CryptoPrice[] {
    return [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        current_price: 32128.8,
        price_change_percentage_24h: 2.5,
      },
      {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        current_price: 1200.0,
        price_change_percentage_24h: 1.8,
      },
      {
        id: "achain",
        symbol: "act",
        name: "Achain",
        image: "https://assets.coingecko.com/coins/images/1053/large/Achain_logo.jpg",
        current_price: 28.32,
        price_change_percentage_24h: -0.5,
      },
      {
        id: "neo",
        symbol: "neo",
        name: "Neo",
        image: "https://assets.coingecko.com/coins/images/480/large/neo.jpg",
        current_price: 13.23,
        price_change_percentage_24h: 0.8,
      },
      {
        id: "vechain",
        symbol: "vet",
        name: "VeChain",
        image: "https://assets.coingecko.com/coins/images/1167/large/VeChain-Logo-768x725.png",
        current_price: 14.12,
        price_change_percentage_24h: 3.2,
      },
    ]
  }

  private getMockCryptoDetail(id: string): CryptoDetail {
    const mockCrypto = this.getMockCryptos().find((c) => c.id === id)

    return {
      id: mockCrypto?.id || "bitcoin",
      symbol: mockCrypto?.symbol || "btc",
      name: mockCrypto?.name || "Bitcoin",
      image: {
        large: mockCrypto?.image || "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      },
      market_data: {
        current_price: {
          usd: mockCrypto?.current_price || 32128.8,
        },
        price_change_percentage_24h: mockCrypto?.price_change_percentage_24h || 2.5,
        market_cap: {
          usd: 625000000000,
        },
        total_volume: {
          usd: 24000000000,
        },
      },
      description: {
        en: "A decentralized digital currency without a central bank or single administrator.",
      },
    }
  }
}

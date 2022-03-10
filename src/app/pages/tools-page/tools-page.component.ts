import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-tools-page',
  templateUrl: './tools-page.component.html',
  styleUrls: ['./tools-page.component.scss']
})
export class ToolsPageComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor() { }

  ngOnInit(): void {
    if (this.accordion) { this.accordion.openAll(); }
  }

  /**
   * 
   * Análisis de mercado
CoinGecko: https://www.coingecko.com. Ver los principales datos de mercado, de exchanges, y construcción de portfolio, además de noticias básicas y guías.
CoinMarketCap: https://coinmarketcap.com/invite?ref=Z97Z1PVC. Ver los principales datos de mercado, de exchanges, y construcción de portfolio, además de noticias básicas y guías.
Lunarcrush: https://lunarcrush.com. Análisis completo de criptomonedas, noticias, comentarios de influencers y mucho más.
Google Trends: https://trends.google.es/trends/explore. Para ver el número de búsquedas de una o varias palabras.
DefiLlama: https://defillama.com. Para analizar el mercado DeFi, además de las principales redes y exchanges DEX.
Análisis técnico
TradingView: https://www.tradingview.com. Para hacer análisis técnico al más alto nivel.
Noticias de proyectos
CoinMarketCal: https://coinmarketcal.com. Noticias y actualizaciones de proyectos.
Análisis de Bitcoin
Bitcoin rainbow chart: https://www.blockchaincenter.net/bitcoin-rainbow-chart. Permite ver si estamos más cerca de altseason o de BTC pump.
Otros
Chainlist: https://chainlist.org. Permite añadir nuevas redes a tu wallet sobre EVM (Ethereum Virtual Machine).
   * 
   */
}

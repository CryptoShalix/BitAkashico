import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { IAccordion } from 'src/app/shared/models/core';
import { IAccordionItem, URLS } from '../../shared/models/core';
import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'app-tools-page',
  templateUrl: './tools-page.component.html',
  styleUrls: ['./tools-page.component.scss']
})
export class ToolsPageComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  toolsList: IAccordion[] = [];

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {
    this.prepareToolsList();
    if (this.accordion) { this.accordion.openAll(); }
  }

  private prepareToolsList(): void {
    this.toolsList = [];
    this.toolsList.push(this.createToolsGroup(
      'ANALYSIS_MARKET',
      [
        this.createToolItem('CoinGecko', URLS.REF_CoinGecko, 4.5),
        this.createToolItem('CoinMarketCap', URLS.REF_CoinMarketCap, 4),
        this.createToolItem('Lunarcrush', URLS.REF_Lunarcrush, 3.5),
        this.createToolItem('DefiLlama', URLS.REF_DefiLlama, 3.5),
        this.createToolItem('Google Trends', URLS.REF_GoogleTrends, 1.5),
      ],
      'market'
    ));
    console.log(this.toolsList);
  }

  private createToolsGroup(groupName: string, items: IAccordionItem[], icon?: string, disabled?: boolean): IAccordion {
    return {
      title: `PAGES.TOOLS.GROUPS.${groupName}.title`,
      description: `PAGES.TOOLS.GROUPS.${groupName}.description`,
      disabled,
      icon,
      items
    };
  }

  private createToolItem(name: string, link: string, rank: number): IAccordionItem {
    return {
      text: name,
      link,
      description: `PAGES.TOOLS.app${name.replace(' ', '')}`,
      image: '',
      rank
    };
  }

  isNullOrEmpty(value: any): boolean {
    return this.coreService.isNullOrEmpty(value);
  }

  /**
   *
   * Análisis de mercado
    - CoinGecko: https://www.coingecko.com. Ver los principales datos de mercado, de exchanges, y construcción de portfolio, además de noticias básicas y guías.
    - CoinMarketCap: https://coinmarketcap.com/invite?ref=Z97Z1PVC. Ver los principales datos de mercado, de exchanges, y construcción de portfolio, además de noticias básicas y guías.
    - Lunarcrush: https://lunarcrush.com. Análisis social completo de criptomonedas, con noticias, comentarios de influencers y mucho más.
    - Google Trends: https://trends.google.es/trends/explore. Para ver el número de búsquedas de una o varias palabras.
    - DefiLlama: https://defillama.com. Para analizar el mercado DeFi, además de las principales redes y exchanges DEX.

    Análisis técnico
    - TradingView: https://www.tradingview.com. Para hacer análisis técnico al más alto nivel.

    Noticias de proyectos
    - CoinMarketCal: https://coinmarketcal.com. Noticias y actualizaciones de proyectos.

    Análisis de Bitcoin
    - Bitcoin rainbow chart: https://www.blockchaincenter.net/bitcoin-rainbow-chart. Permite ver si estamos más cerca de altseason o de BTC pump.

    Otros
    - Chainlist: https://chainlist.org. Permite añadir nuevas redes a tu wallet sobre EVM (Ethereum Virtual Machine).

    Apps de MercatorCrypto
    - PooCoin: poocoin.app. Comprar, vender, ver gráficas, liquidez, etc
    - StaySafu: app.staysafu.org. Análisis automático del token desde scan token. Muy util para tener un primer resumen.
    - BSCheck: bscheck.eu. Estupenda herramienta para análisis automático de tokens.
    - Justbuitffs: apps.justbuitffs.com. Otor escáner de tokens.
    - DexTools: dextools.io/app. Herramienta de trading con muchos datos. Muy buena.
    - MoonArch: moonarch.app. Algunos datos sobre los tokens aunque bastante incompleta, pero muy visual.
    - Honeypot: honeypot.is. Estupenda herramienta para detectar si estamos ante un tarro de miel, token en el que puedes comprar, pero no vender.
    - RugPullDetector: rugpulldetector.com. Estupenda herramienta para detectar si en el contrato está activada esa opción. Un poco coñazo porque hay que copiar el contrato del token. Pero se puede hacer desde Coingecko o Coinmarketcap sin problemas.
    - DexGuru: dex.guru. Herramienta muy completa para ver el gráfico, liquidez, listado comercial, etc.
    - RugDoc: rugdoc.io. Herramienta similar a las anteriores, aunque tiene muchos tokens de otras redes distintas de la BSC.
    - Mudra: mudra.website. Herramienta en que se puede ver la liquidez bloqueada de muchos tokens. Especialmente interesante porque se ven los últimos tokens que la han bloqueado aquí.
    - BoggedFinance: bogged.finance. Herramientas automatizadas para trading en la BSC. Puedes poner órdenes de compra y venta. No es la más útil ya que se desbloquean ciertas funciones si holdeas su token.
   *
   */
}

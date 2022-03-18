import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { CoreService } from '../../shared/services/core.service';

import { IAccordion } from 'src/app/shared/models/core';
import { IAccordionItem, URLS } from '../../shared/models/core';
import { ECurrency } from '../../shared/models/currency';

@Component({
  selector: 'app-tools-page',
  templateUrl: './tools-page.component.html',
  styleUrls: ['./tools-page.component.scss']
})
export class ToolsPageComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  showExpanded = false;
  bitcoinText = ECurrency.BTC.text;
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
    this.toolsList.push(this.prepareToolsAnalysisMarket());
    this.toolsList.push(this.prepareToolsAnalysisTechnical());
    this.toolsList.push(this.prepareToolsAnalysisProjects());
    this.toolsList.push(this.prepareToolsAnalysisBitcoin());
    this.toolsList.push(this.prepareToolsAnalysisOthers());
    console.log(this.toolsList);
  }

  private prepareToolsAnalysisMarket(): IAccordion {
    const groupName = 'ANALYSIS_MARKET';
    const accordion = this.createToolsGroup(
      groupName,
      [
        this.createToolItem(groupName, 'CoinGecko', URLS.REF_CoinGecko, 4.5),
        this.createToolItem(groupName, 'CoinMarketCap', URLS.REF_CoinMarketCap, 4),
        this.createToolItem(groupName, 'Lunarcrush', URLS.REF_Lunarcrush, 3.5),
        this.createToolItem(groupName, 'DefiLlama', URLS.REF_DefiLlama, 3.5),
        this.createToolItem(groupName, 'Google Trends', URLS.REF_GoogleTrends, 1.5),
      ],
      'multiline_chart'
    );
    return accordion;
  }

  private prepareToolsAnalysisTechnical(): IAccordion {
    const groupName = 'ANALYSIS_TECH';
    const accordion = this.createToolsGroup(
      groupName,
      [
        this.createToolItem(groupName, 'TradingView', URLS.REF_TradingView, 4.5),
      ],
      'insert_chart_outlined'
    );
    return accordion;
  }

  private prepareToolsAnalysisProjects(): IAccordion {
    const groupName = 'ANALYSIS_PROJECTS';
    const accordion = this.createToolsGroup(
      groupName,
      [
        this.createToolItem(groupName, 'CoinMarketCal', URLS.REF_CoinMarketCal, 4.5),
      ],
      'assignment icon'
    );
    return accordion;
  }

  private prepareToolsAnalysisBitcoin(): IAccordion {
    const groupName = 'ANALYSIS_BITCOIN';
    const accordion = this.createToolsGroup(
      groupName,
      [
        this.createToolItem(groupName, 'Bitcoin rainbow chart', URLS.REF_BitcoinRainbowChart, 4.5),
      ],
      'bitcoin'
    );
    return accordion;
  }

  private prepareToolsAnalysisOthers(): IAccordion {
    const groupName = 'OTHERS';
    const accordion = this.createToolsGroup(
      groupName,
      [
        this.createToolItem(groupName, 'Chainlist', URLS.REF_Chainlist, 4.5),
      ],
      'important_devices'
    );
    return accordion;
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

  private createToolItem(groupName: string, name: string, link: string, rank: number): IAccordionItem {
    return {
      text: name,
      link,
      description: `PAGES.TOOLS.GROUPS.${groupName}.app${name.replace(' ', '')}`,
      image: '',
      rank
    };
  }

  /**
   *
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
    - StackerNews: stacker.news. Permite publicar posts y que te remuneren en BTC LN, a la par que tu debes también valorar al resto con tus satoshis. Haces un ingreso de 1000 satoshis, y por cada publicación que te guste, donas unos pocos sats, pero si publicas posts, y la gente da like, recuperas esos sats. Mercado cíclico.
    - KYCP: kycp.org. Para saber si tu Bitcoin son tan privados como esperas. Nivel avanzado. Muy útil para ver cómo han implementado los diferentes wallets la privacidad (Wasabi, JoinMarket, Whirlpool, etc).
   *
   */
}

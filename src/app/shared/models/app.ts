export interface IAPP {
  name: string;
  link: string;
  rank: number;
  isLN?: boolean;
}

export class APP {
  name: string;
  text: string;
  link: string;
  description: string;
  image: string;
  rank: number;
  isLN: boolean;

  constructor(app: IAPP, groupName: string) {
    this.name = app.name;
    this.text = (app.isLN ? '[LN] ' : '') + app.name;
    this.link = app.link;
    this.description = `PAGES.TOOLS.GROUPS.${groupName}.app${app.name.replace(/\s/g, '')}`;
    this.image = '';
    this.rank = app.rank;
    this.isLN = app.isLN ? true : false;
    return this;
  }
}

export interface IAPP_GROUP {
  groupName: string;
  items: IAPP[];
  icon: string;
}

export class APP_GROUP {
  groupName: string;
  title: string;
  description: string;
  icon: string;
  items: APP[];

  constructor(appGroup: IAPP_GROUP) {
    this.groupName = appGroup.groupName;
    this.title = `PAGES.TOOLS.GROUPS.${this.groupName}.title`;
    this.description = `PAGES.TOOLS.GROUPS.${this.groupName}.description`;
    this.icon = appGroup.icon;
    this.items = appGroup.items.map(app => new APP(app, this.groupName));
  }
}
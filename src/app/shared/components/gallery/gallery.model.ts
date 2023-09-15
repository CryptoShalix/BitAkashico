import { LinkableIcon } from '../linkable-icon/linkable-icon';

export enum IGalleryTitleType {
  TXT = 'txt',
  IMG = 'img'
}

export interface IGalleryTitle {
  titleLogo: string;
  titleText: string;
  type: IGalleryTitleType;
  backgroundDark: boolean;
}

export interface IGalleryItem {
  imgPath: string;
  title: string;
  description?: string;
  li_read: LinkableIcon;
  li_buy: LinkableIcon;
}
import { Pipe, PipeTransform } from '@angular/core';

import { TranslateService } from '../services/translate.service';

import { ValueText } from '../models/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) { }

  /**
   * Get the text at the specified user language, so translated.
   * Example:
   * - .json file:
   * ```json
   * [{...
   *  "test": "A long text with {data}",
   *  "LEVEL1.test": "A long text with {data}"
   * ...}]
   * ```
   * - app.component.ts:
   * ```typescript
   * string result = ...instant('test', [{value: 'data', text: 'MyReplacedData'}]);
   * ```
   * - Result:
   * ```string
   * 'A long text with MyReplacedData'
   * ```
   * - [TIP] You can even set levels by adding a fullstop between those levels, like this:
   * ```typescript
   * string result = ...instant('LEVEL1.test', [{value: 'data', text: 'MyReplacedData'}]);
   * ```
   * @param value The first part that contains the text. Should be in english and easy to read.
   * @param options [Optional] A list of value-text pair in which the 'value' is the string to replace and the 'text' the new string.
   * @returns Returns a string totally parsed and with all value-text pairs integrated.
   */
  public transform(
    value: string,
    options?: ValueText[]
  ): string {
    return this.translateService.instant(value, options);
  }
}

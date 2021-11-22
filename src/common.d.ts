export {};

declare global {
  interface JSON {
    parse(
      text: string | Buffer | (() => string),
      reviver?: (key: any, value: any) => any
    ): any;
  }
}

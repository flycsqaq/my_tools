declare interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGAElement>> {}

declare module '*.svg' {
  const content: any
  export = content
}
declare interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGAElement>> {}

declare module '*.svg' {
    const content: any;
    export = content;
}

declare module '*.jpg' {
    const content: any;
    export = content;
}

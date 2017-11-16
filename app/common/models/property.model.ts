export class Property {
    constructor(
        public img_url: string = '',
        public lister_url: string = '',
        public price_formatted: string = '',
        public title: string = '',
        public summary: string = '',
        public bathroom_number: number | string = '',
        public bedroom_number: number | string = '') {
    }
}
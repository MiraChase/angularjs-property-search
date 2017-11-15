export default class commonSearchService {
    public searchParams: object = {}
    public searchResults: any[] = []
    public currentProperty: object

    static $inject = ['searchConfig'];
    constructor (
        private searchConfig
    ) {}

    storeSearchParams(searchParams: object) {
        this.searchParams = searchParams
    }

    storeSearchResults(searchResults: any[]) {
        this.searchResults = searchResults
    }

    appendSearchResults(searchResults: any[]) {
        this.searchResults = this.searchResults.concat(searchResults)
    }

    storeCurrentProperty({ img_url, lister_url, price_formatted, title, summary, bathroom_number, bedroom_number }) {
        this.currentProperty = {
            img_url,
            lister_url,
            price_formatted,
            title,
            summary,
            bathroom_number,
            bedroom_number
        }
    }

    getNumResultsPerPage() {
        return this.searchConfig.searchResultsLength
    }
}

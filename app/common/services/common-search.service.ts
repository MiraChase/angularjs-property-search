export default class commonSearchService {
    public searchParams: object = {}
    public searchResults: any[] = []

    static $inject = [];
    constructor (
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
}

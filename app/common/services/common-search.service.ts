import { Property } from '../models/property.model'
import { SearchResultsParams } from '../interfaces/search-params.interface'

export default class commonSearchService {
    static $inject = ['searchConfig']

    public searchResultsParams: SearchResultsParams = {}
    public searchResults: Property[] = []
    public currentProperty: Property

    constructor (
        private searchConfig
    ) {}

    public storeSearchResultsParams(searchResultsParams: SearchResultsParams) {
        this.searchResultsParams = searchResultsParams
    }

    public storeSearchResults(searchResults: Property[]) {
        this.searchResults = searchResults
    }

    public appendSearchResults(searchResults: Property[]) {
        this.searchResults = this.searchResults.concat(searchResults)
    }

    public storeCurrentProperty(property: Property) {
        this.currentProperty = Object.assign(new Property(), property)
    }

    public getNumResultsPerPage() {
        return this.searchConfig.SEARCH_RESULTS_LENGTH
    }
}

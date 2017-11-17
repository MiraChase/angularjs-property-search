import { Property } from '../models/property.model'
import { SearchResultsParams } from '../interfaces/search-params.interface'
import { SEARCH_CONFIG } from '../configs/search.config'

export default class commonSearchService {
    static $inject = []

    public searchResultsParams: SearchResultsParams = {}
    public searchResults: Property[] = []
    public currentProperty: Property

    constructor () {}

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
        return SEARCH_CONFIG.SEARCH_RESULTS_LENGTH
    }
}

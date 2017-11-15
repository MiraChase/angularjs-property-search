export default class apiService {
    static $inject = ['$http', '$q', 'apiConfig', 'searchConfig'];
    constructor (
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private apiConfig,
        private searchConfig
    ) {}

    formSearchParams(location: string, page: number = 1): object {
        return {
            callback: 'JSON_CALLBACK',
            encoding: 'json',
            action: 'search_listings',
            country: 'uk',
            listing_type: 'buy',
            place_name: location,
            number_of_results: this.searchConfig.searchResultsLength,
            page
        }
    }

    getJSONP(searchParams: object): ng.IPromise<any> {
        return this.$http.jsonp(this.apiConfig.apiUrl, {
            params: searchParams
        })
            .then((results: ng.IHttpResponse<any>) => {
                return results
            }, errors => {
                return this.$q.reject(errors)
            })
    }
}

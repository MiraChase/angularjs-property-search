export default class apiService {
    static $inject = ['$http', '$q', 'apiConfig'];
    constructor (
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private apiConfig
    ) {}

    getJSONP(searchParams) {
        return this.$http.jsonp(this.apiConfig.apiUrl, {
            params: searchParams
        })
            .then((results) => {
                return results
            }, errors => {
                return this.$q.reject(errors)
            })
    }
}

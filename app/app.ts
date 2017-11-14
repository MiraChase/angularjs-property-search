import { module, element, bootstrap } from 'angular'
import SearchModule from './pages/search/search.module'
import SearchResultsModule from './pages/search-results/search-results.module'
import FavoritesModule from './pages/favorites/favorites.module'
import PropertyDetailsModule from './pages/property-details/property-details.module'
import ApiService from './common/services/api.service'
import CommonSearchService from './common/services/common-search.service'
import PropertyListComponent from './common/components/property-list.component'
import ApiConfig from './common/configs/api.config'
import SearchConfig from './common/configs/search.config'
import './app.less'

const app = module('AppModule', [
    'ui.router',
    SearchModule,
    SearchResultsModule,
    PropertyDetailsModule,
    FavoritesModule
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider) => {
        $locationProvider.html5Mode(true)
        $urlRouterProvider.otherwise('/search');
    }])
    .service('apiService', ApiService)
    .service('commonSearchService', CommonSearchService)
    .component('propertyList', PropertyListComponent)
    .constant('apiConfig', ApiConfig)
    .constant('searchConfig', SearchConfig)

element(document).ready( () => {
    bootstrap(document, [app.name]);
});

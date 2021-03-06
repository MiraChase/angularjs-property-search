import { module, element, bootstrap } from 'angular'
import SearchModule from './pages/search/search.module'
import SearchResultsModule from './pages/search-results/search-results.module'
import FavoritesModule from './pages/favorites/favorites.module'
import PropertyOverviewModule from './pages/property-overview/property-overview.module'
import ApiService from './common/services/api.service'
import CommonSearchService from './common/services/common-search.service'
import FavoritesCommonService from './common/services/favorites-common.service'
import PropertyListComponent from './common/components/property-list.component'
import './app.less'

const app = module('AppModule', [
    'ui.router',
    SearchModule,
    SearchResultsModule,
    PropertyOverviewModule,
    FavoritesModule
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', (
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider) => {
            $locationProvider.html5Mode(true)
            $urlRouterProvider.otherwise('/search')
        }])
    .service('apiService', ApiService)
    .service('commonSearchService', CommonSearchService)
    .service('favoritesCommonService', FavoritesCommonService)
    .component('propertyList', PropertyListComponent)

element(document).ready( () => {
    bootstrap(document, [app.name])
})

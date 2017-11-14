import { module } from 'angular';
import SearchResultsComponent from './search-results.component';

export default module('SearchResultsModule', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state({
                name: 'searchResults',
                url: '/search-results?location',
                component: 'searchResultsComponent'
            })
        }])
    .component('searchResultsComponent', SearchResultsComponent)
    .name
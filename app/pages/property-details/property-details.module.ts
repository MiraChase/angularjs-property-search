import { module, element, bootstrap } from 'angular';
import PropertyDetailsComponent from './property-details.component';

export default module('FavoritesModule', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
            $stateProvider.state({
                name: 'propertyDetails',
                url: '/property-details',
                component: 'propertyDetailsComponent'
            })
        }])
    .component('propertyDetailsComponent', PropertyDetailsComponent)
    .name
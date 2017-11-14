import { module } from 'angular';
import PropertyDetailsComponent from './property-details.component';

export default module('PropertyDetailsModule', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state({
                name: 'propertyDetails',
                url: '/property-details',
                component: 'propertyDetailsComponent'
            })
        }])
    .component('propertyDetailsComponent', PropertyDetailsComponent)
    .name
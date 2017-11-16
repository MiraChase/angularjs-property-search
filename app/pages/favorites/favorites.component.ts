import template from './favorites.html'

import FavoritesCommonService from '../../common/services/favorites-common.service'

const
    bindings = {}

class controller {
    static $inject = ['favoritesCommonService']
    constructor (
        private favoritesCommonService: FavoritesCommonService
    ) {}

    $onInit() {
        this.favoritesCommonService.getFavorites()
    }
}

export default { template, controller, bindings }

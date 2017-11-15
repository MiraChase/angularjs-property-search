import template from './favorites.html'

const
    bindings = {}

class controller {
    static $inject = ['favoritesCommonService']
    constructor (
        private favoritesCommonService
    ) {}

    $onInit() {
        this.favoritesCommonService.getFavorites()
    }
}

export default { template, controller, bindings }

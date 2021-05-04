import Vuex from 'vuex';
import {mount, createLocalVue} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
    const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
    ];

    const localVue = createLocalVue();
    localVue.use(Vuex);

    let restaurantsModule;
    let wrapper;

    beforeEach(() => {
        restaurantsModule = {
            namespaced: true,
            state: {records},
            actions: {
                load: jest.fn().mockName('load'),
            },
        };
        const store = new Vuex.Store({
            modules: {
                restaurants: restaurantsModule,
            },
        });

        wrapper = mount(RestaurantList, {localVue, store});
    });

    it('loads restaurants on mount', () => {

        expect(restaurantsModule.actions.load).toHaveBeenCalled();
    });

    it('displays the restaurants', () => {

        const secondRestaurantName = wrapper
            .findAll('[data-testid="restaurant"]')
            .at(1)
            .text();
        expect(secondRestaurantName).toBe('Pizza Place');
    });
});

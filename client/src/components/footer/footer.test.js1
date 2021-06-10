import React from 'react';
import { shallow } from 'enzyme';

import Footer from './footer.component';

const setUp = () => {
    return shallow(<Footer />);
}

describe('LogOut page test set', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render the entire component without errors', () => {
        const wrapper = component.find('footer');
        expect(wrapper.length).toBe(1);
    });

    it('Should render <div class="footer__content">{...}</div> without errors', () => {
        const header = component.find('.footer__content');
        expect(header.length).toBe(1);
    });

    it('Should render <p class="footer__copyright">{...}</p> without errors', () => {
        const errorMessage = component.find('.footer__copyright');
        expect(errorMessage.length).toBe(1);
    });

    it('Should render <div class="footer__media">{...}</div> without errors', () => {
        const buttonBox = component.find('.footer__media');
        expect(buttonBox.length).toBe(1);
    });

    it('Should render <Link class="footer__link">{...} /> without errors', () => {
        const buttonBox = component.find('.footer__link');
        expect(buttonBox.length).toBe(2);
    });

    it('Should render <icon class="footer__icon">{...} /> without errors', () => {
        const buttonBox = component.find('.footer__icon');
        expect(buttonBox.length).toBe(2);
    });
})
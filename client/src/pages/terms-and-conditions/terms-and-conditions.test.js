import React from 'react';
import { shallow } from 'enzyme';

import TermsAndConditions from './terms-and-conditions.page';

const setUp = () => {
    return shallow(<TermsAndConditions />);
}

describe('TermsAndConditions page test set', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render the entire component without errors', () => {
        const wrapper = component.find('div');
        expect(wrapper.length).toBe(1);
    });
})
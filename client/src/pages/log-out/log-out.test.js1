import React from 'react';
import { shallow } from 'enzyme';

import LogOut from './log-out.page';

const setUp = (props = {}) => {
    return shallow(<LogOut {...props} />);
}

describe('LogOut page test set', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render the entire component without errors', () => {
        const wrapper = component.find('.log-out');
        expect(wrapper.length).toBe(1);
    });

    it('Should render component\'s header without errors', () => {
        const header = component.find('.log-out__header');
        expect(header.length).toBe(1);
    });

    it('Should render component\'s error message without errors', () => {
        const errorMessage = component.find('.log-out__error-message');
        expect(errorMessage.length).toBe(1);
    });

    it('Should render component\'s button box without errors', () => {
        const buttonBox = component.find('.log-out__button-box');
        expect(buttonBox.length).toBe(1);
    });

    // it('Should render two buttons without errors', () => {
    //     const buttons = component.find('.btn');
    //     // expect(component.find('.btn--')).to.have.length(2);
 
    //     expect(buttons.length).toBe(2);
    // });

    // it('Should simulate click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = shallow(
    //       <Foo onButtonClick={onButtonClick} />
    //     );
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });

})
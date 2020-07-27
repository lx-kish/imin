import React from 'react';
import { shallow } from 'enzyme';

import Button from './btn.component';

const setUp = (props = {}) => {
    return shallow(<Button {...props} />);
}

describe('Button component test set', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render <button /> component without errors', () => {
        expect(
            component.find('button').length
        ).toBe(1);
    });

    it('Should render <button /> with no props with type "button" by default', () => {
        expect(
            component.find('.btn').prop('type')
        ).toEqual('button');
    });

    it('Should render <button /> with props "type" with type "button" by default', () => {
        expect(
            shallow(<Button type='reset' />).find('.btn').prop('type')
        ).toEqual('reset');
    });

    it('Test click event', () => {
        const mockCallBack = jest.fn();

        const button = shallow((<Button onClick={mockCallBack}></Button>));
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
})
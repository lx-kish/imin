import React from 'react';
import { shallow } from 'enzyme';

import Header from './header.component';

const setUp = (props = {}) => {
    return shallow(<Header {...props} />);
}

describe('Navigation bar component test set', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render <NavigationBar /> component without errors', () => {
        expect(
            component
                .find('nav')
                .length
        ).toBe(1);
    });

    it('Should render class="navigation__logo-box" inside <NavigationBar /> component', () => {
        expect(
            component
                .find('.navigation__logo-box')
                .length
        ).toBe(1);
    });

    it('Should render <img /> inside <NavigationBar /> component', () => {
        expect(
            component
                .find('img')
                .length
        ).toBe(1);
    });

    it('Should render <ul /> list inside <NavigationBar /> component', () => {
        expect(
            component
                .find('ul')
                .length
        ).toBe(1);
    });

    it('Should render four <li /> items inside <NavigationBar /> component', () => {
        expect(
            component
                .find('li')
                .length
        ).toBe(5);
    });

    it('Should contain <Link /> to "/" (Home page)', () => {
        expect(
            component
                .find('Link')
                .at(0)
                .prop('to')
        ).toEqual('/');
    });

    it('Should contain <Link /> to "/about" (About page)', () => {
        expect(
            component
                .find('Link')
                .at(1)
                .prop('to')
        ).toEqual('/about');
    });

    it('Should contain <Link /> to "/platform" (Platform page)', () => {
        expect(
            component
                .find('Link')
                .at(2)
                .prop('to')
        ).toEqual('/platform');
    });

    it('Should contain <Link /> to "/contact" (Contact page)', () => {
        expect(
            component
                .find('Link')
                .at(3)
                .prop('to')
        ).toEqual('/contact');
    });

    it('Should contain <Link /> to "/signin" (Sign in page)', () => {
        const props = {
            pathname: '/signin',
            state: { role: 'student' }
        }

        expect(
            component
                .find('Link')
                .at(4)
                .prop('to')
        ).toEqual(props);
    });

    // it('Should render <ul /> list inside <NavigationBar /> component', () => {

    //     expect(
    //         shallow(<Button type='reset' />).find('.btn').prop('type')
    //     ).toEqual('reset');
    // });

    // it('Test click event', () => {
    //     const mockCallBack = jest.fn();

    //     const button = shallow((<Button onClick={mockCallBack}></Button>));
    //     button.find('button').simulate('click');
    //     expect(mockCallBack.mock.calls.length).toEqual(1);
    // });
})
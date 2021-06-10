import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
// import { shallow, render, mount } from 'enzyme';

import Header from './header.component';

import appMenu from '../navigation/appMenu';
import delimeter from '../navigation/delimeter';
import siteMenu from '../navigation/siteMenu';

import NavigationBar from '../navigation/navigation-bar/navigation-bar.component';
import BurgerIcon from '../navigation/burger icon/icon-burger.component';
import SlideBar from '../navigation/slide bar/slide-bar.component';

describe('Header component rendering test suit', () => {

    afterEach(cleanup);

    it('button should contain link to "/logout" if user ID HAS passed to props', () => {
        const props = {
            data: {
                _id: '123456789'
            }
        };

        const { container } = render(
            <BrowserRouter>
                <Header {...props} />
            </BrowserRouter>
        );

        const button = container.querySelector('.btn--header');

        expect(button).toHaveAttribute('href', '/logout');

    })

    it('button should contain link to "/signin" if user ID has NOT passed to props', () => {

        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = container.querySelector('.btn--header');

        expect(button).toHaveAttribute('href', '/signin');

    })

    it('should contain 15 links across component if user ID HAS passed to props', () => {
        const props = {
            data: {
                _id: '123456789'
            }
        };

        const { container } = render(
            <BrowserRouter>
                <Header {...props} />
            </BrowserRouter>
        );

        // const button = container.querySelector('.btn--header');

        expect(screen.getAllByRole('link').length).toBe(15);
        // expect(screen.getAllByRole('link')).toHaveAttribute('href', '/profile');

    })

    it('should contain 10 links across component if user ID has NOT passed to props', () => {

        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        // const button = container.querySelector('.btn--header');

        expect(screen.getAllByRole('link').length).toBe(10);
        // expect(screen.getAllByRole('link')).toHaveAttribute('href', '/profile');

    })

    it('should change state on every click on BurgerIcon element', () => {

        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = container.querySelector('.burger');

        expect(button.classList.contains('is-active')).toBe(false);

        fireEvent.click(button);

        expect(button.classList.contains('is-active')).toBe(true);

        fireEvent.click(button);

        expect(button.classList.contains('is-active')).toBe(false);
    })

    it('should show and hide SlideBar element on click on BurgerIcon element', () => {

        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const button = container.querySelector('.burger');

        const slidebar = container.querySelector('.slide-bar');

        expect(slidebar.classList.contains('is-active')).toBe(false);

        fireEvent.click(button);

        expect(slidebar.classList.contains('is-active')).toBe(true);

        fireEvent.click(button);

        expect(slidebar.classList.contains('is-active')).toBe(false);
    })
})
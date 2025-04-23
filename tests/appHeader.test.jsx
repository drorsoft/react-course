import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { GlobalContext } from '../src/context/globalContext'
import { BrowserRouter } from 'react-router'
import { AppHeader } from '../src/components/AppHeader'

const baseMockContext = {
    isAuth: false, setIsAuth: (value) => { }, cart: [], setCart: (value) => { }
}
describe('AppHeader Component', () => {
    it('renders the header with navigation links', () => {

        const mockContext = { ...baseMockContext }

        render(
            <GlobalContext.Provider value={mockContext}>
                <BrowserRouter>
                    <AppHeader />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        // Check if the header title is rendered
        expect(screen.getByText('גלידה מהאגדות')).toBeTruthy()

        // Check if the navigation links are rendered
        expect(screen.getByText('בניית גלידה')).toBeTruthy()
        expect(screen.getByText('הזמנה')).toBeTruthy()
        expect(screen.getByText('הסטורית הזמנות')).toBeTruthy()
    })

    it('displays the cart count when items are in the cart', () => {
        // Mock the GlobalContext with items in the cart
        const mockContext = {
            ...baseMockContext,
            cart: [1, 2, 3],
        }

        render(
            <GlobalContext.Provider value={mockContext}>
                <BrowserRouter>
                    <AppHeader />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        // Check if the cart count is displayed
        expect(screen.getByText('הזמנה (3)')).toBeTruthy()
    })
})
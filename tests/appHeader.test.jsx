import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { GlobalContext } from '../src/context/globalContext'
import { BrowserRouter } from 'react-router'
import { AppHeader } from '../src/components/AppHeader'
import { IceCream } from '../src/components/IceCreamVisual/IceCreamVisual'
import { IceCreamTaste } from '../src/models/IceCreamTaste'
import { IceCreamTopping } from '../src/models/IceCreamTopping'

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
        expect(screen.getByText('היסטורית הזמנות', { exact: false })).toBeTruthy()
    })

    it('displays the cart count when items are in the cart', () => {
        const mockItem = {
            serveType: 'cup',
            taste: IceCreamTaste.Chocolate,
            toppings: IceCreamTopping.None
        }
        const mockContext = {
            ...baseMockContext,
            cart: [mockItem, mockItem, mockItem],
        }

        render(
            <GlobalContext.Provider value={mockContext}>
                <BrowserRouter>
                    <AppHeader />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        expect(screen.getByText('הזמנה (3)')).toBeTruthy()
    })
})
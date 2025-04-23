import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GlobalContext } from '../src/context/globalContext'
import { BrowserRouter } from 'react-router'
import { addDoc } from 'firebase/firestore'
import { Checkout } from '../src/pages/Checkout'
import { IceCreamTaste } from '../src/models/IceCreamTaste'

vi.mock('firebase/firestore', () => ({
    addDoc: vi.fn(),
    collection: vi.fn(),
}))

vi.mock('../src/firebase/firebaseConfig.js', () => ({
    db: {}
}))

const baseMockContext = {
    cart: [
        { serveType: 'cup', taste: IceCreamTaste.Chocolate, toppings: 'None' },
        { serveType: 'cone', taste: IceCreamTaste.Strawberry, toppings: 'Sprinkles' },
    ],
    setCart: vi.fn(),
    isAuth: false, setIsAuth: (value) => { }
}

describe('Checkout Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        cleanup()

    })
    it('renders the checkout form and cart items', () => {
        render(
            <GlobalContext.Provider value={baseMockContext}>
                <BrowserRouter>
                    <Checkout />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        expect(screen.getByLabelText('שם')).toBeTruthy()
        expect(screen.getByLabelText('אימייל')).toBeTruthy()
        expect(screen.getByLabelText('טלפון')).toBeTruthy()
        expect(screen.getByLabelText('כתובת')).toBeTruthy()
        expect(screen.getByLabelText('שיטת תשלום')).toBeTruthy()

        expect(screen.getByText('כדור בטעם שוקולד', { exact: false })).toBeTruthy()
        expect(screen.getByText('בטעם תות', { exact: false })).toBeTruthy()
    })

    it('shows validation errors when fields are empty', async () => {
        render(
            <GlobalContext.Provider value={baseMockContext}>
                <BrowserRouter>
                    <Checkout />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        fireEvent.click(screen.getByText('שליחה', { exact: false }))

        await waitFor(() => {
            expect(screen.getAllByText('שדה חובה', { exact: false }).length).toEqual(5)
        })
    })


    it('submits the order successfully and shows success message', async () => {
        //@ts-ignore
        addDoc.mockResolvedValueOnce({ id: '12345' })

        render(
            <GlobalContext.Provider value={baseMockContext}>
                <BrowserRouter>
                    <Checkout />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        // Fill out the form
        fireEvent.change(screen.getByLabelText('שם'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText('אימייל'), { target: { value: 'john.doe@example.com' } })
        fireEvent.change(screen.getByLabelText('טלפון'), { target: { value: '0546734399' } })
        fireEvent.change(screen.getByLabelText('כתובת'), { target: { value: '123 Main St' } })
        fireEvent.change(screen.getByLabelText('שיטת תשלום'), { target: { value: 'credit' } })

        fireEvent.click(screen.getByText('שליחה'))

        await waitFor(() => {
            expect(screen.getByText('ההזמנה התקבלה בהצלחה!')).toBeTruthy()
            expect(screen.getByText('מזהה ההזמנה שלך הוא: 12345')).toBeTruthy()
        })
    })

    it('handles order submission failure and shows error message', async () => {
        //@ts-ignore
        addDoc.mockRejectedValueOnce(new Error('Failed to submit order'))

        render(
            <GlobalContext.Provider value={baseMockContext}>
                <BrowserRouter>
                    <Checkout />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        // Fill out the form
        fireEvent.change(screen.getByLabelText('שם'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText('אימייל'), { target: { value: 'john.doe@example.com' } })
        fireEvent.change(screen.getByLabelText('טלפון'), { target: { value: '0546734399' } })
        fireEvent.change(screen.getByLabelText('כתובת'), { target: { value: '123 Main St' } })
        fireEvent.change(screen.getByLabelText('שיטת תשלום'), { target: { value: 'credit' } })

        fireEvent.click(screen.getByText('שליחה'))

        await waitFor(() => {
            expect(screen.getByText('שגיאה בשליחת ההזמנה')).toBeTruthy()
            expect(screen.getByText('Failed to submit order')).toBeTruthy()
        })
    })
})
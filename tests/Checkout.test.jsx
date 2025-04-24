import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { GlobalContext } from '../src/context/globalContext'
import { BrowserRouter } from 'react-router'
import { Checkout } from '../src/pages/Checkout'
import { IceCreamTaste } from '../src/models/IceCreamTaste'
import { act } from '@testing-library/react'

const addDoc = vi.fn()
const collection = vi.fn()
const getDocs = vi.fn()

vi.mock('firebase/firestore', () => ({
    addDoc,
    collection,
}))
vi.mock('../src/firebase/firebaseProvider.js', () => ({
    firebaseProvider: () => ({
        addDoc,
        collection,
        getDocs,
    }),
}))
vi.mock('../src/firebase/firebaseConfig.js', () => ({
    db: {}
}))


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

describe('Checkout Component - Additional', () => {
    afterEach(() => {
        vi.clearAllMocks()
        cleanup()
    })

    it('disables submit button while sending', async () => {
        let resolveAddDoc
        addDoc.mockImplementationOnce(() => new Promise(res => { resolveAddDoc = res }))

        render(
            <GlobalContext.Provider value={{
                ...baseMockContext
            }}>
                <BrowserRouter>
                    <Checkout />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        fireEvent.change(screen.getByLabelText('שם'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText('אימייל'), { target: { value: 'john.doe@example.com' } })
        fireEvent.change(screen.getByLabelText('טלפון'), { target: { value: '0546734399' } })
        fireEvent.change(screen.getByLabelText('כתובת'), { target: { value: '123 Main St' } })
        fireEvent.change(screen.getByLabelText('שיטת תשלום'), { target: { value: 'credit' } })

        fireEvent.click(screen.getByText('שליחה'))
        expect(screen.getByText('שולח הזמנה...')).toBeTruthy()
        // Resolve the promise to finish the request
        act(() => resolveAddDoc && resolveAddDoc({ id: '999' }))
    })

    it('shows phone and email validation errors', async () => {
        render(
            <GlobalContext.Provider value={baseMockContext}>
                <BrowserRouter>
                    <Checkout />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        fireEvent.change(screen.getByLabelText('שם'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText('אימייל'), { target: { value: 'not-an-email' } })
        fireEvent.change(screen.getByLabelText('טלפון'), { target: { value: '123' } })
        fireEvent.change(screen.getByLabelText('כתובת'), { target: { value: '123 Main St' } })
        fireEvent.change(screen.getByLabelText('שיטת תשלום'), { target: { value: 'credit' } })

        fireEvent.click(screen.getByText('שליחה'))

        await waitFor(() => {
            expect(screen.getByText('נא להכניס מספר טלפון תקין (10 ספרות)')).toBeTruthy()
            expect(screen.getByText('נא להכניס כתובת דואל תקינה')).toBeTruthy()
        })
    })

    it('resets form and cart after successful order', async () => {
        addDoc.mockResolvedValueOnce({ id: 'abcde' })
        const setCartMock = vi.fn()
        render(
            <GlobalContext.Provider value={{ ...baseMockContext, setCart: setCartMock }}>
                <BrowserRouter>
                    <Checkout />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        fireEvent.change(screen.getByLabelText('שם'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText('אימייל'), { target: { value: 'john.doe@example.com' } })
        fireEvent.change(screen.getByLabelText('טלפון'), { target: { value: '0546734399' } })
        fireEvent.change(screen.getByLabelText('כתובת'), { target: { value: '123 Main St' } })
        fireEvent.change(screen.getByLabelText('שיטת תשלום'), { target: { value: 'credit' } })

        fireEvent.click(screen.getByText('שליחה'))

        await waitFor(() => {
            expect(screen.getByText('ההזמנה התקבלה בהצלחה!')).toBeTruthy()
        })

        fireEvent.click(screen.getByText('חזרה לעמוד הבית'))
        expect(setCartMock).toHaveBeenCalledWith([])
    })

    it('can retry after order failure', async () => {
        addDoc.mockRejectedValueOnce(new Error('Failed to submit order'))
        render(
            <GlobalContext.Provider value={baseMockContext}>
                <BrowserRouter>
                    <Checkout />
                </BrowserRouter>
            </GlobalContext.Provider>
        )

        fireEvent.change(screen.getByLabelText('שם'), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText('אימייל'), { target: { value: 'john.doe@example.com' } })
        fireEvent.change(screen.getByLabelText('טלפון'), { target: { value: '0546734399' } })
        fireEvent.change(screen.getByLabelText('כתובת'), { target: { value: '123 Main St' } })
        fireEvent.change(screen.getByLabelText('שיטת תשלום'), { target: { value: 'credit' } })

        fireEvent.click(screen.getByText('שליחה'))

        await waitFor(() => {
            expect(screen.getByText('שגיאה בשליחת ההזמנה')).toBeTruthy()
        })

        fireEvent.click(screen.getByText('חזרה להזמנה'))
        expect(screen.getByLabelText('שם')).toBeTruthy()
    })
})

const baseMockContext = {
    cart: [
        { serveType: 'cup', taste: IceCreamTaste.Chocolate, toppings: 'None' },
        { serveType: 'cone', taste: IceCreamTaste.Strawberry, toppings: 'Sprinkles' },
    ],
    setCart: vi.fn(),
    isAuth: false, setIsAuth: (value) => { }
}


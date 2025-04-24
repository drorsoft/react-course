<style>*{direction:rtl;}</style>
# קורס ריאקט חלק י' - טסטים

## פתיחה

חלק חשוב מתהליך כתיבת התוכנה הוא לכתוב טסטים. יש כאן מצגת מפעילות שהכנתי בעבר לדרור סופט, היא מותאמת יותר למפתחים עם נסיון, אבל אפשר להשתמש בבסיסים שלה.

## למה צריך טסטים?

למה צריך טסטים? בפשטות, הטסטים בודקים שהקוד שלנו עובד כמו שאנחנו רוצים. זה בעצם קוד שבודק קוד אחר.

### סוגי טסטים

אפשר לחלק טסטים להמון סוגים, אבל נלך על הפירמידה "הקלאסית" שמתמקדת ב SCOPE:
- **יוניטסט** - היחידה הכי קטנה
- **אינטגרציה** - אינטגרציה בין חלקים
- **מקצה לקצה** - כל המערכת

היום נתמקד ביוניטסט. אבל מה זה לדעתכם היחידה הכי קטנה?

### מהם הבעיות של יוניטסט?
- **מוקינג** - מחליפים משהו שהוא לא הדבר האמיתי
- **ללא אינטגרציה** - כל החלקים יכולים לעבוד אבל השלם לא

## עבודה עם יוניטסטים בפרונט

למרות שיש היום כלים שבודקים בדיקות E2E והם מאד פופולרים, לא כדאי לוותר על יונטיסטים, שבודקים יחידות קטנות של הקוד שלנו.

## התקנת VITEST

נעבוד עם ספרייה שנקראת VITEST. שימו לב, שאת ההתקנה נעשה בצורה שונה מבדרך כלל או נוסיף לה עוד פלאגין.

ניכנס לאתר ונקרא את [הדוקומנטציה של Vitest](https://vitest.dev/guide/).

נעשה:

```bash
npm install -D vitest
```

מה זה אומר ה `-D`? זה אומר שהחבילה תותקן כתלויית פיתוח - dev dependency.

בואו נסתקל על הפקאג' גיסון. אנחנו רואים כאן:
- dependencies
- devdependencies

החבילות שמשתמשים בהן לפיתוח לא תגענה בסוף לקוד שאותו הלקוחות יפגשו! אז למה הם שם? הם עוזרים לנו בפיתוח.

זוכרים שדיברנו על זה שכדאי לחשוב פעמיים לפני שמתקינים חבילות? אז זה נכון גם ל DEV DEPENDENCIES אבל בדרך כלל זה פחות נורא, כי אלו חבילות שמטרתן רק לעזור בתהליך הפיתוח והן לא חלק מליבת האפליקציה.

## כתיבת טסט ראשון

עכשיו בואו נכתוב את הטסט הראשון שלנו.

נפתח תיקייה שנקרא לה `tests`, ובתוכה נשים SMOKE TEST.

תיקיית ה`tests` היא מחוץ לתיקיית ה-`src`.

ואז נכתוב בקובץ ככה:

```javascript
import { expect, test } from 'vitest'

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})
```

בנוסף, נרצה להוסיף פקודה ל scripts:

```json
  {
  "test": "vitest --run"
}
```
 
```

עכשיו נריץ:
```bash
npm run test
```

עקרונית אפשר גם להריץ
```bash
npm test
```
כי היא פקודה מובנת.

בואו נראה מה קרה כאן:

אנחנו רואים תוצאות של:
- קובץ אחד עבר
- טסט אחד עבר

עכשיו בואו נעשה ניסוי. נשנה את הטסט כך:

```javascript
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(4)
})
```

שימו לב מה קיבלנו כאן. הטסט נכשל, וגם הוא הראה לנו איפה בדיוק הוא נכשל.

## קבצי הטסט

בואו נראה מה מייבאים מ-VITEST:
- יש לנו `test`, שאפשר לקרוא לה גם `it`. זו פונקציה שלוקחת 2 ארגומנטים:
    - שם הטסט
    - פונקציית הטסט
- בתוך פונקציית הטסט, יש לנו יבוא של פונקציה נוספת שנקראת `expect`.
    - היא מקבלת ארגומנט אחד (ערך כלשהו), אבל אז מחזירה משהו שנקרא assertion
    - זה בעצם אובייקט עם כל מני מתודות, שבודק שמשהו X הוא משהו Y. למשל כאן, שהוא שווה ל.

## יוניטסט של פונקציה פשוטה

הנקודות שבהן יוניטסטים הכי טובים ומושלמים בשבילם, זה פונקציות פשוטות שאפשר לבדוק את הלוגיקה שלהם.

בואו ניקח את הולידציה של האימייל ונרשום לו טסט:
`validateEmail.test.js`

עכשיו נכיר עוד משהו של טסטים, זה `describe`. היא פשוט פונקציה שמכילה או מאגדת כמה טסטים.

נוסיף את הטסט הבא:

```javascript
describe('email validator', () => {
  test('gmail address is valid', () => {
    const isValid = isValidEmail('john@gmail.com')
    expect(isValid).toBe(true)
  })
})
```

עכשיו נוסיף עוד טסטים:

```javascript
describe('email validator', () => {
  test('gmail address is valid', () => {
    const isValid = isValidEmail('john@gmail.com')
    expect(isValid).toBe(true)
  })
  
  test('address without @ sign is invalid', () => {
    const isValid = isValidEmail('johngmail.com')
    expect(isValid).toBe(false)
  })
  
  test('address with no domain is not valid', () => {
    const isValid = isValidEmail('john@')
    expect(isValid).toBe(false)
  })
})
```

## משימה

כתבו טסט לולידציה של הטלפון

### פתרון משימה

```javascript
describe('phone number validator', () => {
  test('valid 10-digit phone number', () => {
    const isValid = isValidMobilePhone('1234567890')
    expect(isValid).toBe(true)
  })
  
  test('phone number with less than 10 digits is invalid', () => {
    const isValid = isValidMobilePhone('123456789')
    expect(isValid).toBe(false)
  })
  
  test('phone number with more than 10 digits is invalid', () => {
    const isValid = isValidMobilePhone('12345678901')
    expect(isValid).toBe(false)
  })
  
  test('phone number with letters is invalid', () => {
    const isValid = isValidMobilePhone('12345abcde')
    expect(isValid).toBe(false)
  })
  
  test('phone number with special characters is invalid', () => {
    const isValid = isValidMobilePhone('12345@#$%^')
    expect(isValid).toBe(false)
  })
  
  test('empty phone number is invalid', () => {
    const isValid = isValidMobilePhone('')
    expect(isValid).toBe(false)
  })
})
```

## טסטים של קומפוננטות עם UI

אנחנו נשתמש עם REACT TESTING LIBRARY

כדאי לקרוא את [הדוקומנטציה של React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

נתקין עם:

```bash
npm install --save-dev @testing-library/react @testing-library/dom
```

עכשיו חוץ מזה צריך להתקין גם jsdom:

```bash
npm i -D jsdom
```

ופלאגין לריאקט:

```bash
npm i -D @vitejs/plugin-react
```

ולהגיד ל-VITEST להשתמש ב-JSDOM.

וגם להוסיף קובץ `vitest.config.js`:

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
```

בואו נסביר רגע למה כל ההתקנות והקונפיגורציות האלו:

כשאנחנו מריצים טסטים - מהסוג של יונטסטים שהם טסטים מהירים - אנחנו לא רוצים לפתוח דפדפן וכל פעם לטעון עמוד. אז מה שאנחנו עושים, אנחנו משתמשים ב-JSDOM. שזה בעצם חיקוי של ה-DOM של הדפדפן ב-JS. יש גם טסטים שבהם ממש נפתח דפדפן וכו', אנחנו לא ניגע בזה עכשיו אולי בהמשך.

בואו נכתוב טסט ראשון לקומפוננטה ונסביר מה קורה בו:

```javascript
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
  })})
```

## טסט לבדיקה שמספר הפריטים מופיע

```javascript
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
```

## טסט לבדיקת טופס ההזמנה

עכשיו שימו לב שכאן יש לנו עניין, שאנחנו משתמשים בפיירבייס בקומפוננטה הזו. אז אנחנו צריכים להשתמש במוק, כדי שזה יעבוד.

מה שהמוק עושה בעצם, זה שהוא מחליף את הפונקציה האמיתית או את הקובץ/אובייקט אמיתי, ושם במקומו סתם משהו:

```javascript
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
})
```

ועכשיו נוסיף עוד טסט שיבדוק שמופיעה הודעת שדה חובה כשמנסים לשלוח טופס ריק:

```javascript
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
```

שימו לב שהשתמשתי כאן בשתי מתודות חדשות:
- יצירת ארוע - שנקרא `fireEvent`
- ו-`waitFor` שזה בעצם אומר לTesting Library לחכות שיהיו שינויים בסטייט, ורינדור מחדש.

## עבודה מורכבת עם מוקים

עכשיו נגיע לחלק של עבודה יותר מורכבת עם מוקים. נצטרך לקבוע את הערך שהפונקציה מחזירה כדי לבנות את הטסט שבודק שהזמנה נשלחה בהצלחה:

```javascript
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
```

הייתי צריך לשים כאן TS-IGNORE כדי שהוא לא יצעק עלי.

## משימה

כתבו טסט שבודק הופעה של הודעת שגיאה במקרה של שגיאה בהזמנה.

### פתרון המשימה

```javascript
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
```

## סיכום

טסטים חשובים כדי לוודא שהקוד שלנו עובד כמו שצריך, ולגלות אם יש בו באגים. חוץ מזה הם צורה מסויימת של דוקומנטציה - הם אומרים למפתחים מה חשוב בקוד, ולמה לשים לב אם הוא נשבר.

[חזרה למעלה](#קורס-ריאקט-חלק-י---טסטים)

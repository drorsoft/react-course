<style>*{direction:rtl;}</style>
# קורס ריאקט חלק ט' - סטייט גלובלי


## פתיחה

עכשיו כשיש לנו בסיסים בהרבה מרכיבים של ריאקט, אנחנו רוצים לחבר את כל החלקים של היישום ביחד.
נתעסק בסטייט גלובלי, ובקשרים בין מריכיבים שונים.

## הוספת כפתורים ושינוי עיצוב

אנחנו עכשיו נרצה להוסיף כפתור שבלחיצה עליו, היוזר יוכל להוסיף גלידה נוספת להזמנה.

אז כרגע הקומפוננטה ICECREATEM BUILDER CONTROLS מכילה גם את הרגע והגודל. אני ארצה לפרק אותה לשני חלקים, או בעצם להוסיף חלק

```jsx
<div className="bg-background-main flex-1">
    <IceCreamBuilderControls 
        serveType={serveType}
        taste={taste} 
        toppings={toppings} 
        toggleServeType={toggleServeType} 
        setTaste={setTaste} 
        setToppings={setToppings} 
    />
</div>
```

עכשיו נוסיף עוד 2 כפתורים

```jsx
<div id='taste-container' className='flex flex-row gap-4'>
    <button className={`p-2 bg-button-submit text-black hover:ring-1 ring-purple-700 rounded`}>
        הוספה להזמנה
    </button>
    <button className={`p-2 bg-button-accent text-black hover:ring-1 ring-purple-700 rounded`}>
        סיום הזמנה
    </button>
</div>
```

## סטייט גלובלי

עד עכשיו התעסקנו בעיקר עם כל קומפוננטה כשלעצמה. ראינו דוגמא של שימוש בסטייט גלובלי, למשל במצב שבו אנחנו רוצים לדעת האם יוזר מחובר או לא. עכשיו אנחנו נמשיך עם פיתרון פשוט אחד של ניהול סטיט גלובלי שעליו אני ממליץ על אפליקציות קטנות.

עכשיו נוסיף לסטייט הגלובלי עוד 2 פרופרטיז: cart, setCart.

```jsx
const [cart, setCart] = useState([])

return (
    <GlobalContext.Provider value={{ isAuth, setIsAuth, cart, setCart }}>
        {children}
    </GlobalContext.Provider>
)
```

עכשיו כל פעם שנוסיף פריט לעגלה, נרצה לעדכן את העגלה. ונעשה את זה בעמוד הבנייה של הגלידה:

```jsx
const { cart, setCart } = useContext(GlobalContext)

const addToOrder = () => {
    const newItem = {
        serveType: serveType,
        taste: taste,
        toppings: toppings
    }
    setCart([...cart, newItem])
}
```

שימו לב אנחנו כאן מעדכנים את הקונטקסט הגלובלי, של כל האפליקציה.

וגם נוסיף לHEADER את כמות הגלידות שהוזמנו:

```jsx
<NavLink to={"/checkout"} className={({ isActive }) => 
    `text-xs p-3 ${isActive ? 'bg-button-accent' : ' '} flex flex-row items-center justify-center h-full `}>
    הזמנה
    {cart.length > 0 ? ` (${cart.length})` : null}
</NavLink>
```

עכשיו חוץ מבHEADER, אנחנו גם נרצה לראות את פריטים שהזמנו.

### יצירת פונקציות עזר

נפתח תיקיית `utils`, בדרך כלל משמשת לכל מני פונקציות עזר.

ונשים בה פונקציה שבונה תקציר של ההזמנה:

```javascript
import { IceCreamTaste } from "../models/IceCreamTaste";
import { IceCreamTopping } from "../models/IceCreamTopping";

const flavorTextFromFlavour = (flavor) => {
    switch (flavor) {
        case IceCreamTaste.Chocolate:
            return "שוקולד";
        case IceCreamTaste.Vanilla:
            return "וניל";
        case IceCreamTaste.Strawberry:
            return "תות";
        default:
            throw new Error(`Unknown flavor: ${flavor}`);
    }
}

const toppingsTextFromToppings = (toppings) => {
    switch (toppings) {
        case IceCreamTopping.Cherry:
            return "דובדבן ";
        case IceCreamTopping.Sprinkles:
            return "סוכריות ";
        case IceCreamTopping.None:
            return "ללא תוספות";
    }
}

export const iceCreamAbstract = (iceCream) => {
    const { flavor, toppings, serveType } = iceCream;

    const flavorText = flavorTextFromFlavour(flavor)
    const toppingsText = toppingsTextFromToppings(toppings);
    const serveTypeText = serveType === "cone" ? "גביע" : "כוס";
    return `גלידה בטעם ${flavorText}, ${toppingsText}, מוגשת ב${serveTypeText}.`;
};
```

שימו לב שהשתמשתי בפונקציות נוספות שלא מיובאות בקובץ.

### ולידציה והוספה לסל

השלב הבא זה שצריך שלא נוכל להוסיף גלידה בלי שיש לה טעם לפחות.

```jsx
<button 
    disabled={!taste} 
    className={`p-2 bg-button-submit disabled:opacity-50 text-black hover:ring-1 ring-purple-700 rounded`} 
    onClick={addToOrder}>
    הוספה להזמנה
</button>
```

וגם נעשה כשכל פעם שאנחנו עושים הוספה להזמנה, אנחנו מאפסים את הטעם והתוספת.

```jsx
const addToOrder = () => {
    const newItem = {
        serveType: serveType,
        taste: taste,
        toppings: toppings
    }
    setCart([...cart, newItem])

    setTaste(null)
    setToppings(IceCreamTopping.None)
}
```

## הוספת לינק מותנה ל-Checkout

נוסיף גם שהכפתור של סיום ההזמנה, יהיה בעצם לינק ל-CHECKOUT

```jsx
<button 
    onClick={gotoCheckout} 
    disabled={cart.length === 0} 
    className={`p-2 bg-button-accent disabled:opacity-50 text-black hover:ring-1 ring-purple-700 rounded`}>
    סיום הזמנה
</button>
```

עכשיו אני רוצה להראות משהו שקשור לריאקט ראוטר. אפשר שהכפתור הזה בעצם יהיה לינק, כמו שעשינו לינקים במקומות אחרים. אבל אפשר גם שהמעבר לנתיב אחר יהיה דרך פונקציה. איך עושים את זה?

יש HOOK שנקרא `useNavigate`:

```jsx
const navigate = useNavigate()

const gotoCheckout = () => {
    navigate('/checkout')
}
```

מתי לעשות כך, ומתי כך?

בעקרון, אם הלינק הוא עם לוגיקה יותר מורכבת, למשל, אני רוצה שלפעמים הוא יהיה פתוח ולפעמים לא, או שהחישוב של הנתיב הוא מסובך, אז יהיה לי יותר נוח להשתמש בפונקציה.

## חיווי למשתמש כשההזמנה נקלטה

עכשיו כשאנחנו שולחים את הטופס, לא קורה כלום. הטופס לא מתאפס, והמשתמש לא רואה שהתרחש משהו.

## משימה

אחרי שלחצתי שליחה, אני רוצה שהטופס יתרוקן, והמשתמש יראה הודעה שההזמנה נקלטה במערכת.
זוהי משימה יותר מורכבת מאחרות, ודורש תכנון וחשיבה

## פתרון המשימה

אז מילה לגבי משימות מורכבות: אין תמיד דרך אחת נכונה לפתור את המשימה, יש כל מני דרכים, אני עכשיו אציג את הדרך שלי, אבל זה לא אומר שהיא היותר נכונה אוהיותר טובה, בעיקר כשאין "דרך המלך" מבחינת הפריימוורק וכו'.

אז אתחיל בלבנות מודל לסטייט שלנו בקומפוננטה של ה-checkout:

```javascript
export const CheckoutStateType = {
    NotSent: 'NotSent',
    Sending: 'Sending',
    OrderReceived: 'OrderReceived',
    OrderFailed: 'OrderFailed',
}
```

עכשיו אפשר להגיד שהגזמתי, למה 4 מצבים?

משום שכששולחים טופס, לטופס יש תמיד סטייט מורכב. אגב, גם ל-NOT SENT יש סטייט מורכב, כי יכול להיות טופס ריק, טופס מלא, טופס חצי מלא, וכו'. אבל לא נעמיק בזה עכשיו אלא רק בנושא השליחה.

עכשיו כשאבנה את הסטייט של זה בתוך הקומפוננטה, אני ארצה להוסיף גם MESSAGE:

```jsx
const [checkoutState, setCheckoutState] = useState({ 
    status: CheckoutStateType.NotSent, 
    message: '' 
}); // NotSent | Sending | OrderReceived | OrderFailed
```

עכשיו אני אעשה דבר כזה, אם הסטייט הוא לא נשלח עדיין. אני אראה את הטופס כמו שמוצג עכשיו. איך עושים את זה?

```jsx
{checkoutState.status === CheckoutStateType.NotSent && <form>...  </form>}
```

השורה הזו בעצם אומרת, אם הביטוי הראשון נכון, אז תציג את הביטוי השני. ואז זה יוצג רק אם זה נכון.

### הוספת מצבי טעינה וסיום

עכשיו נוסיף מראה של שליחת הזמנה, פלוס ספינר מאד בסיסי:

```jsx
{checkoutState.status === CheckoutStateType.Sending && 
    <div className="flex flex-row items-center justify-center gap-2">
        <div className="">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <span className="text-blue-500">שולח הזמנה...</span>
    </div>
}
```

#### העשרה: יצירת ספינר בסיסי רק עם CSS

עושים DIV ברוחב 30 פיקסל, עם גבול עבה של 4 פיקסל. ואז מגדירים שהגבול העליון הוא שקוף. לזה מוסיפים את האנימציה של הספין.

### הוספת הודעת הצלחה

```jsx
{checkoutState.status === CheckoutStateType.OrderReceived && 
    <div className="flex flex-col gap-3">
        ההזמנה התקבלה בהצלחה!

        <span className="flex flex-col gap-1">
            <span>בדקות הקרובות תשלח אליך לטלפון</span>
            <span className="text-blue-500">{order.phone}</span>
            <span>הודעה עם פרטי ההזמנה ואופן התשלום</span>
        </span>
        
        <button 
            onClick={() => finishOrderProcess()} 
            className="bg-slate-500 text-white p-2 cursor-pointer rounded-md hover:bg-slate-600 transition-all duration-200">
            חזרה לעמוד הבית
        </button>
    </div>
}
```

ואת הפונקציה של סיום ההזמנה:

```jsx
const finishOrderProcess = () => {
    setCheckoutState({ status: CheckoutStateType.NotSent, message: '' });
    setCart([]);
    setOrder(demoOrder);
    navigate('/')
}
```

### הוספת מצב שגיאה

```jsx
{checkoutState.status === CheckoutStateType.OrderFailed && 
    <div className="flex flex-col gap-3">
        <span className="text-red-500">
            <span>שגיאה בשליחת ההזמנה </span>
            {checkoutState.message}
        </span>
        <button 
            onClick={() => setCheckoutState({ status: CheckoutStateType.NotSent, message: '' })} 
            className="bg-slate-500 text-white p-2 cursor-pointer rounded-md hover:bg-slate-600 transition-all duration-200">
            חזרה להזמנה
        </button>
    </div>
}
```

כאן אני לא ארצה לאפס את הטופס, או להעיף את היוזר לדף אחר. למה?

יכול להיות שהשגיאה היא זמנית, או שיש בעייה בוויפי, וכו', ואז אני לא רוצה שהיוזר יאבד את המידע.

### השפעה של תהליך השמירה על הסטייט

עכשיו נשנה את פונקציית השמירה, נוסיף לה דברים:

```jsx
const submitHandler = async (e) => {
    e.preventDefault();
    validateForm();
    if (Object.values(validationErrors).some(error => error !== '')) {
        return;
    }
    setCheckoutState({ status: CheckoutStateType.Sending, message: '' });
    try {
        const docRef = await addDoc(collection(db, "orders"), order);
        const orderId = docRef.id;
        setCheckoutState({ status: CheckoutStateType.OrderReceived, message: orderId });
    } catch (error) {
        console.error("Error adding document: ", error);
        setCheckoutState({ status: CheckoutStateType.OrderFailed, message: error.message });
    }
}
```

דבר ראשון, אם הולידציה לא עובדת, צריך שלא יקרה כלום עם שליחת הטופס.

דבר שני, כשהטופס נשלח, צריך שיהיה טעינה (לפני ה-AWAIT) ואחרי שהוא חוזר, צריך שיהיה שינוי של הסטייט.

בנוסף הוספתי את המספר הזמנה להודעת האישור:

```jsx
<span className="">מזהה ההזמנה שלך הוא: {checkoutState.message}</span>
```

## סיכום

התעסקנו בחלק הזה בכל מני דברים, אבל ראינו שיש כאן שילובים בין סטייט גלובלי, וסטייט מקומי. ניהול סטייט זה נושא מורכב, וזה הרבה מאד מההתעסקות של מפתחי פרונט.

[קישור לחזרה לתוכן הקורס](#קורס-ריאקט-חלק-ט---סטייט-גלובלי)
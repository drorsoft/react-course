<style>*{direction:rtl;}</style>
Please format this as an md file (in hebrew)

קורס ריאקט חלק ה' - ראוטינג

פתיחה
עברנו על הרבה מהיכולות הבסיסיות של ריאקט. עכשיו ניגע במשהו אחר: ראוטינג. 

מבוא לראוטינג

אבל בשביל להתחיל חשוב להבין את ההבדל בין 2 סוגי אתרים:
SPA
SSR

כדאי להעזר במצגת

רינדור בצד השרת שנקרא גם SSR, או MPA, אומר שכל פעם כשמשתנה העמוד, נשלחת בקשה חדשה לשרת, ונטען תוכן חדש. 
כל העמוד עם ה HTML שלו נטען מחדש. 
דוגמה לכך ויקיפדיה. 

להדגים:
נכנסים לויקיפדיה - בכלי המפתחים רואים מה קורה כל פעם כשעוברים ערך חדש. 
משנים את ה HTML של הכותרת רואים שהיא כל פעם מתעדכנת מחדש.


נכנסים ל https://react.dev/
בכל המפתחים רואים מה קורה כשעוברים ערך חדש
משנים את הכותרת של אחד מהדברים ב NAV BAR
עוברים עמוד ורואים מה קורה


ביצוע הראוטינג

הספריה של ריאקט לא יודעת לבצע ראוטינג, זה לא חלק מהגדרות התפקיד שלה. 
כדי לבצע ראוטינג נתקין ספריה אחרת שנקראת ריאקט ראוטר. 

שימו לב, יש סביב הספריה הזו הרבה מאד בלבול, יש לה כל מני גרסאות, ו - 3 סוגים שונים של API. נעשה את זה ביחד ונראה איך להשתמש בה. 

אז קודם כל בואו ניכנס לעמוד של הספריה:

https://reactrouter.com/home

כבר מהדוקומנטציה יש 3 סוגי APIs:
Declarative - זה הסגנון מסורתי יותר שבו הראוטר הוא כמו קומפוננטת ריאקט בתוך הישום
Data - זה הסגנון החדש יותר, שתומך בתכונות החדשות אבל בעצם "משתלט" על כל האפליקציה
Framework - זה סגנון שמותאם יותר ל FULL STACK כמו למשל NEXT ו REMIX .
אנחנו נשתמש ב Declarative 
שימו לב בהוראות ההתקנה, מראים איך בעצם ליצור אפליקציית ריאקט חדשה שמכילה כבר ראוטר. מכיוון שאנחנו התקנו ריאקט בלי ראוטר, אנחנו נעשה את זה בצורה שונה. 


npm i react-router


עכשיו גם נסתכל ונראה מה קרה לנו בקובץ PACKAGE. 


לאחר מכן, נעיין בדוקומנטציה איך לעבוד עם הסגנון של  Declarative :
https://reactrouter.com/start/modes
עכשיו ניצור תקייה חדשה שנקרא לה ROUTES
ובתוכה קובץ עם הנתיבים:

```
export const AppRoutes = () => {
    return <Routes>
        <Route path="/" element={<IceCreamBuilderPage />} />
        <Route path="/about" element={<About />} />
    </Routes>
}
```

 ואז נספק אותו באפליקציה
 export const App = () => {

```
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
    </GlobalContextProvider >)
}
```


שימו לב: ישלנו את הנתיבים של האפליקציה, אבל הם חייבים להיות בתוך קומפוננטה שנקראת BROWSER_ROUTER כדי לממש אותם. 

ונראה שהראוטר עובד בצורה תקינה. 

אבל יש לנו כאן בעייה. 

יכול להיות שחלק מהדברים שיש לנו באפליקציה, אנחנו רוצים שיופיעו בכמה נתיבים. 
אז מה שנעשה, בעצם, זה להשתמש בראוטר, אבל הוא לא יקבע מה קורה בכל העמוד אלא רק בחלק מה עמוד. יהיו חלקים מהעמוד שהוא לא יתעסק איתם. 

מה שנעשה זה לעשות ריפקטור קטן, ניקח את העמוד של הגלידה, ונפצל אותו ל - 2 חלקים:

אני אקח עכשיו תקייה שנקרא לה LAYOUT, ובתוכה נשים קומפוננטה שאקרא לה כך. 
```
export const Layout = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-col  ">
            <AppHeader />
            {children}


        </div>
    )
}
```

ואותה נשים בתוך ה APP. שימו לב שאנחנו מזריקים לה ילדים:
```
export const App = () => {


  return (
    <GlobalContextProvider><BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
    </GlobalContextProvider >)
}

```
נוריד את הNAV BAR מהקומפוננטה של הגלידות. 

עכשיו שימו לב שאנחנו מנווטים באפליקציה שלנו על ידי שינו הכתובת URL בצורה ידנית. זה משהו שהוא מאד לא נוח. 

לריקרט ראוטר יש מעיין אלמנט שנקרא נב-לינק, נשתמש בו בשביל הלינקים:
```
    <NavLink to={"/"} className=" text-xs p-3 bg-amber-400 flex flex-row items-center justify-center h-full ">בניית גלידה
            </NavLink>
            <NavLink to={"/about"} className="text-xs p-3 bg-amber-400 flex flex-row items-center justify-center h-full ">אודות
            </NavLink>
```

לאלמנט הזה יש תכונה מיוחדת, שהקלאס ניים שלו יכול לקבל את המצב של הנתיב, האם פעיל או לא. 

```
    <NavLink to={"/"} className={({ isActive }) => `text-xs p-3 ${isActive ? 'bg-amber-400' : 'bg-amber-secondary'} flex flex-row items-center justify-center h-full `}>בניית גלידה
            </NavLink>
            <NavLink to={"/about"} className={({ isActive }) => `text-xs p-3 ${isActive ? 'bg-amber-400' : 'bg-amber-secondary'} flex flex-row items-center justify-center h-full `}>אודות
            </NavLink>


```



משימה

אתם צריכים לבנות עוד נתיב באפליקצייה של הזמנות, ותוסיפו לו עוד מקישור בנב-בר 



פרמטרים לנתיבים או ראוט דינאמי

אפשר לעשות נתיבים קבועים. אבל יש גם אפשרות לקבוע שחלק מסויים מנתיב הוא פרמטר. 

איך עושים את זה? 

 <Route path="/order/:orderId" element={<Order />} />

בתוך שם הנתיב, נוסיף את ה ORDER ID עם נקודותיים. כך נוכל לגשת ל ORDER ID מתוך הקומפוננטה

```
import { useParams } from "react-router";


export const Order = () => {
    const { orderId } = useParams();
    return (
        <div className="p-20 text-xl">
            <h1>Order</h1>
            <p>This is one order Number {orderId}</p>
            <p></p>
        </div>
    );
}


```
עמוד 404
בדרך כלל מקובל להוסיף עמוד 404, דהיינו הקוד שאומר, לא מצאתי את התוכן:


משימה 

כאן המשימה שלכם, היא איך ליצור 404 עמוד "לא נמצא" עם ריקאט ראוטר. חפשו על זה באינטרנט. שימו לב: יש מספר גרסאות לריאקט ראוטר, בחלק מהגרסאות ה API שונה. 


פתרון

יש כמה דרכים לעשות את הדרך הכי מקובלת זה עם כוכבית. 

מה בעצם קורה כאן ?

שימו לב, איך הראוטר כאן עובד? 

כשהראוטר מזהה את הקומפוננטה Routes, הוא עובר נתיב נתיב בתוכה. הוא תמיד יראה את הראשון שימצא שתואם את ה URL. 
זאת אומרת שאם יש לנו 2 קומפוננות שתואמות לאותו דפוס, הוא ירנדר את הראשונה. 
אם משתמשים ב WILDCARD אז זה אומר שאפשר להכניס שם הכל. שימו לב למשל בגרסא העדכנית בדוקומנטציה של הראוטר אין את המידע על זה. המידע על זה נמצא ב 6.30. 

https://reactrouter.com/6.30.0/upgrading/v5#note-on-route-path-patterns


נתיבים פרטיים\ מוגנים

נניחה שאנחנו רוצה שחלק מהנתיבים יהיו זמינים רק למי שמחובר לאפליקציה. 

איך נעשה את זה ? 

ישנו דפוס, שיכול להשתנות טיפה, אבל העקרון שלו זהה, של ראוטינג סלקטיבי:
אם קורה תנאי א' היוזר יכול לצפות בנתיב. אם לא הוא מנווט למקום אחר. 

בואו נראה איך זה עובד:

```
import { Navigate, Route } from "react-router"

export const ProtectedRoute = ({ children, isAllowed }) => {
    if (!isAllowed) {
        return <Navigate to={'/'} />
    }
    return children
}
```

רכיב מהסוג הזה נקרא גם HOC, High order component, שזה אומר קומפוננטה, שמוסיפה לוגיקה לקומפוננטות קיימות. 
בדרך כלל אלו צורכים\ עוטפים  קומפוננטות ואז מכניסים את הלוגיקה  היחודית. 


וב ROUTES:
```
export const AppRoutes = () => {
    const { isAuth } = useContext(GlobalContext);
    return <Routes>
        <Route path="/" element={<IceCreamBuilderPage />} />
        <Route path="/orders" element={<Orders />} />


        <Route path="/order/:orderId" element={
            <ProtectedRoute isAllowed={isAuth}>
                <Order />
            </ProtectedRoute>} />


    </Routes>


}
```

נושאים נוספים
אני לא מכסה כאן את כל הדברים בראוטר. אני רוצה לציין גם עוד דברים שלא נגענו בהם, אבל אלו היסודות של הרואטינג ובזה משתמשים ב 90 מהזמן. 

למדריך:
לא בטוח שצריך לעלות את זה, אבל יש גם:
query params
navigation hooks & functions
nested routes
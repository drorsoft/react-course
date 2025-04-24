 
# קורס ריאקט חלק ח' - עבודה מול באקאנד


## פתיחה

עברנו על הרבה מהיכולות הבסיסיות של ריאקט. עכשיו ניגע בבקשות הרשת שיוצאות מהדפדפן.
בפעילות הזו, נלמד על קריאות שיוצאות מהדפדפן.

נשתמש בשירות [Firebase](https://firebase.google.com/) - חבילת יישומים של גוגל קלאוד שמכילה הרבה דברים ובטייר החינמי שלהם, אפשר לפתוח document db בחינם עם 20 אלף קריאות ביום.

> **שימו לב**: מה שנעשה כאן זה לא כל התקשורת עם בקאנד. יהיה חסר לנו החלק של האותנטיקציה - התחברות עם יוזר וסיסמה. בנוסף, בדרך כלל יהיה קוד בשרת שמבצע לוגיקה נוספת.

בגלל זה גם נפתח את זה בצורה זמנית לכמה שבועות, וגם זו תוכנית חינמית.

## התחלה עם Firebase

עושים את זה כולם ביחד:

1. מקלידים **FIREBASE** בגוגל
2. נכנסים לאתר
3. נכנסים ל-**GOTO CONSOLE**
4. התחלה עם פרוייקט Firebase:
    - שמים את שם הפרוייקט
    - אפשר לוותר על גוגל אנליטיקס, כי לא באמת נשתמש בזה

> **טיפ**: שימו לב שליד שם הפרוייקט רואים שאנחנו ב-**Spark Plan** - זה אומר שאנחנו לא צריכים לשלם. בואו נלחץ על זה כדי לוודא.

### הגדרת Firestore Database

בעצם הדבר היחיד שנרצה להשתמש בו זה ה-Firestore Database:

1. נלחץ עליו
2. ואז נלחץ על הכפתור להתחלת הגדרה
3. מבחינת המיקום נבחר באירופה, שיהיה יותר קרוב

עכשיו שימו לב יש לנו 2 אופציות להתחיל. אנחנו נתחיל ב-**TEST MODE**:

זה אומר בעצם:
- תמיד אפשר לקרוא מה-DB
- כל מי שרוצה (גם אם הוא באיראן) יכול לכתוב ל-DB שלנו בחודש הקרוב
- למטרות שלנו זה יהיה בסדר

## עבודה עם Firestore

עכשיו כשיש לנו Firestore אנחנו יכולים להתחיל לעבוד ולראות איך זה נראה.
סוג ה-DB הוא **Document DB**, שזה אומר פשוט אובייקטים של JS, בדומה ל-JSON. בנוסף כל מסמך יכול להכיל עוד מסמכים.

איך שבנוי ה-DB:
- יש **Collections** - כל אחד מהם זה אוסף של מסמכים
- אנחנו נעבוד עם אחד מרכזי שנקרא לו **ORDERS**

> **חשוב!** כשיוצרים אוסף, חייבים לתת לו לפחות מסמך אחד שיהיה בתוכו.

### כללים

בואו נעבור ללשונית **RULES**. נקרא רגע את החוקים וההערות שיש מעליהם.
הפורמט הזה הוא פורמט של Firebase לניסוח החוקים של ה-DB, ואפשר לשנות אותם מכאן. אם רוצים לשנות, אפשר פשוט לחפש בגוגל או [Gemini](https://gemini.google.com/) (יש את זה זמין בתוך ה-Firebase) איך מנסחים כל כלל.

## יצירת בקשה לשאילתה של מידע

בפיירבייס זה יכול להיות קצת מורכב איך לבנות את ה-URL למידע. זה המבנה של הכתובת:

```
https://firestore.googleapis.com/v1/projects/iceceream-legend/databases/(default)/documents/orders
```

### בדיקה

בואו נבדוק שזה עובד:
1. נלך לעמוד שעשינו `all-posts`
2. ונראה שהכתובת היא הנכונה
3. נשנה משהו בנתונים ונראה שאנחנו מקבלים מה שצריך

> **שימו לב**: איך שהנתונים מתקבלים, זה קצת קשה לנו להבין כי יש שם כל מיני שדות שמצביעים על סוג השדות וכו'. בהמשך ננסה לטפל בזה שזה לא יקרה.

## כתיבת הזמנה ל-DB

בסופו של דבר נרצה שהמשתמשים שלנו יבחרו גלידה אחת או יותר, ואז ימלאו את טופס ההזמנה.

נתחיל בכך שנשמור רק טופס הזמנה עם הפרטים שעכשיו עשינו.

נחזור לטופס שלנו. עכשיו נוסיף קונסול לוג אחרי סאבמיט מוצלח, נראה שיש לנו את המידע של ההזמנה.

## התקנת Firebase בריאקט

כמו שראינו ברמה העקרונית אפשר לקבל נתונים מה-DB שלנו בלי שימוש בספריות חיצוניות. אבל יש ספריה של Firebase שעושה לנו את החיים יותר קלים, בעיקר משום שאנחנו יכולים ככה לקבל ולשלוח אובייקטים של JS בשפה יותר פשוטה, בלי כל ההגבלות של Firebase.

### התקנת הספרייה

בואו נתקין את Firebase:

```bash
npm install firebase
```

נסתכל בדוקומנטציה [כאן](https://firebase.google.com/docs/firestore/quickstart) איך לקנפג את Firebase בצורה בסיסית.

### הגדרת קונפיגורציה

נפתח תיקייה חדשה שנקרא לה `firebase`
בתוכה נשים קובץ `firebaseConfig.js` ושם:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "iceceream-legend",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
```

ואז בקומפוננטה שלנו בשמירת הטופס נשים את זה:

```javascript
const submitHandler = async (e) => {
    e.preventDefault();
    validateForm();
    const docRef = await addDoc(collection(db, "orders"), order);
    console.log('docRef', docRef);
}
```

> **הערה למדריך (ולחניכים)**: ספציפית יש משהו קצת חסר ב-Firebase, משום שלא רואים את הבקשות רשת בצורה נורמלית כיוון ש-Firebase עושה דברים מאחורי הקלעים ואז אנחנו לא רואים בצורה פשוטה מה אנחנו שולחים. במובן הזה הדוגמה עם הפוסט היא יותר טובה.

## זהות פרטית לכל פרוייקט

מכיוון שאנחנו רוצים שלמרות שאנחנו עושים פרוייקט דומה, לכל אחד מכם יהיה את הדאטה בייס שלו להתנסות עליו.
זה קצת קשה משום שאנחנו עובדים על פרוייקט שהוא גם משותף (כדי שתמיד תוכלו למשוך את ה-Git) אבל גם רוצים שכל אחד יתנסה ב-DB שלו לבד.

### איך נעשה את זה?

בתיקייה הפרטית, נשים את ה-PROJECT ID, ונייבא משם:

```javascript
// במיקום: private/privateConfig.js
export const privateConfig = {
  firebaseProjectId: "iceceream-legend",
}
```

ואז נעדכן את הסטאפ של הפיירבייס:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { privateConfig } from "../private/privateConfig";

const firebaseConfig = {
  projectId: privateConfig.firebaseProjectId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
```

## צפייה בהיסטוריית ההזמנות

עכשיו כשנאחנו מצליחים ליצור מידע חדש, בואו נעסוק בלהביא אותו.

אז יש לנו כבר קומפוננטה ונתיב שנקראים `ORDERS`. בואו נהפוך אותם ל-`ORDERS HISTORY` - חשוב לעשות ריפקטורינג כשטבע הנתיב/קומפוננטה משתנה. נוסיף אותו לנאב-בר:

```jsx
<NavLink 
  to={"/orders-history"} 
  className={({ isActive }) => 
    `text-xs p-3 ${isActive ? 'bg-amber-400' : 'bg-amber-secondary'} flex flex-row items-center justify-center h-full `
  }
>
  היסטוריית הזמנות
</NavLink>
```

### קריאת נתונים מ-Firebase

עכשיו איך אנחנו מושכים מידע מ-Firebase?

לפי [התיעוד הרשמי](https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection), זו הדרך לעשות את זה:

```javascript
const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const allRecords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(allRecords);
}
```

> **שימו לב**: איך שה-API של Firebase עובד יש לנו סנאפשוט, שזה אומר מידע שנמצא במצב מסוים. ה-ID של כל מסמך יושבת על האובייקט של המסמך, וה-DATA יושב במקום אחר.

## משימה

כמו שעשינו עם הפוסטים, תנסו ליצור תצוגה של כל ההזמנות.

שימו לב שעדיין לא הכנסנו את הפרטים עצמם - הגלידות - להזמנות. אז נעשה משהו בסיסי, כי אחרי זה עוד נשפר את זה.

### פתרון המשימה

```jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

export const OrdersHistory = () => {
    const [allOrdersHistory, setAllOrdersHistory] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "orders"));
            const allRecords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllOrdersHistory(allRecords);
        }

        fetchData();
    }, []);

    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col items-start justify-start">
            <div className="p-5 overflow-scroll w-screen h-screen">
                <h2 className="text-2xl font-bold mb-4">היסטוריית הזמנות</h2>
                <div dir="ltr" className="flex flex-row gap-4 justify-start w-full h-44 p-2">
                    {allOrdersHistory ? (
                        <div className="flex flex-col gap-5">
                            {
                                allOrdersHistory.map((order) => (
                                    <div key={order.id}>
                                        <div className="w-96 rounded-md p-2 flex flex-col items-start justify-start gap-2 border border-black bg-amber-200">
                                            <h1 className="font-bold mb-5">{order.name} - {order.email}</h1>
                                            <div>{order.address}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <span>Loading...</span>
                    )}
                </div>
            </div>
        </div>
    );
}
```

## סיכום

התנסינו בחיבור ל-Firebase דרך ה-API שלו. יש כאן ספריה שמתקינים והיא עושה את התקשורת עם השרת. מה שחשוב כאן ההתנסות בזה שאנחנו שומרים מידע, הוא נשמר בשרת, ואז אנחנו רואים אותו חוזר אלינו ב-GET.
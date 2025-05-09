 
# קורס ריאקט חלק ב' - קומפוננטות וסטייט

## פתיחה
בפעם הקודמת התעסקנו עם התקנה וסידור כדי שתהיה לנו סביבת פיתוח שעובדת על המחשב.
היום נעסוק בהבנת המבנים הבסיסיים של אפליקציית ריאקט ואיך היא פועלת.

### תוכן העניינים
- פתיחה
- בניית קומפוננטה של הכותרת
- הערה לגבי VS-CODE וטיפול ב-TypeScript
- מגבלות של JSX
- ניהול סטייט בקומפוננטה
- הוספת גלידה - ופרופס
- דחיפת פרופס לקומפוננטה
- צורות נוספות של סינטקס
- משימה - הוספת כפתור נוסף
- מאפיינים נוספים של JSX

## נקודות על העבודה - ומבנה הפרוייקט

כמו שעשינו פעם שעברה הריצו `npm run dev`. זה בעצם מפעיל את שרת הפיתוח, ולכן חשוב שתוודאו שתהליך זה פועל בכל פעם שאתם עובדים על הקוד שלכם.

בואו נעבור על כל הקבצים והתיקיות שיש לנו כאן. ברמת השורש, יש לנו כמה קבצי קונפיגורציה. אני רוצה להתייחס ל-`package.json` שהוא בעצם ה"רכז" של הפרוייקט שלנו.

אפשר לראות בראש הקובץ את שם הפרוייקט. אפשר לראות גם את התלויות של הפרויקט שלנו מוגדרות ב-`package.json`. יש לנו כמה תלויות (dependencies) - זה בעצם אומר שהקוד שלנו זקוק לספריות או אפליקציות האלו כדי לרוץ. הוא מתבסס עליהן.

הדבר הבא שנראה הוא איזור ה-scripts: אתם יכולים להריץ את הסקריפטים האלה עם `npm run` ואז שם הסקריפט.

אנחנו נשתמש לרוב בפקודה `npm run dev` - זו פקודה שמתחילה את שרת הפיתוח, צופה בכל הקוד שלנו, ומסדרת אותו בצורה שתהיה נוחה לדפדפן לקרוא אותו. כמו שנראה היום, הקוד של ריאקט לא כתוב בצורה שהדפדפן יודע לקרוא אותו. מה שריאקט ו-VITE עושים זה לעשות שינוי בקוד (קומפילציה) - להפוך אותו מקוד שקריא לנו לקוד שקריא למכונה, במקרה שלנו דפדפן (המונח הטכני המדוייק יותר הוא טרנספילציה אבל כולם משתמשים במילה קומפילציה).

ברגע שאתם מוכנים לפרוס את האפליקציה שלכם, תריצו `npm run build` כדי:
1. לבצע אופטימיזציה נוספת שהקוד יהיה יותר קטן
2. לסדר אותו להגשה מתוך שרת

נחזור לזה בשיעור הבא.

תיקיית `node_modules` מחזיקה את כל התלויות ותת-התלויות של הפרויקט שלנו. אתם לא צריכים לערוך שום דבר בתיקייה זו - היא נוצרת אוטומטית אם תריצו `npm install` בתיקיית הפרויקט שלכם.

תיקיית `public` היא תיקיית השורש שמוגשת על ידי שרת האינטרנט. לרוב נשים בה דברים קבועים כמו תמונות או האיקון של האתר.

קובץ `index.html`, זהו דף HTML רגיל וזהו הדף היחיד שיש לנו כאן. אנחנו לא נוסיף עוד דפי HTML בפרויקט הזה, כי ריאקט יזריק את קבצי הסקריפט שלנו לדף זה.

חשוב לשים לב ל-`div` עם ה-ID `root` - זה המקום שבו React יזריק את הקוד ויכתוב את ה-HTML הסופי.

קבצי הסקריפט נמצאים בתיקיית `source` (SRC).

תיקיית `source` מכילה את הקבצים שבהם נעבוד - זו בעצם אפליקציית React שלנו.

הקובץ החשוב ביותר עבורנו כרגע הוא `index.js`, שמקבל גישה לאלמנט `root` ב-DOM שלנו, ומרנדר את אפליקציית React שלנו עם פונקציה שנקראת `render`.

המלצה: להשתמש בספריה Material Icons כפי שאני משתמש.

## קומפוננטות ו-JSX

האופן שבו נעבוד עם ריאקט הוא שבריאקט היחידה הבסיסית הקטנה נקראת קומפוננטה. קומפוננטה יכולה להיות דף שלם, אבל היא גם יכולה להיות איקון.

אני רוצה שנתחיל בלכתוב קומפוננטה. לשם כך, נעשה קצת תזכורת בנושא JS. בעצם ה-JSX הוא שילוב של HTML ו-JS. לגבי ה-HTML לא צריך לזכור הרבה דברים חוץ מעקרון אחד חשוב - שצריך לסגור תגים שפותחים. 

לגבי JS אנחנו נעשה גם תזכורות וגם נעמיק ביסודות בשפה שריאקט משתמש בהם. הראשונה והחשובה ביותר היא הפונקציה.

פונקציה זו חתיכה של קוד שרצה כשקוראים לה. פונקציה יכולה להחזיר ערך או לא. כל קומפוננטה בריאקט היא פונקציה.

## בניית קומפוננטה של הכותרת

נפתח תיקייה בתוך SRC שנקרא לה `components`.

הקומפוננטה הראשונה שלנו תהיה הכותרת של היישום. נקרא לקובץ `AppHeader.js`:

```javascript
export function AppHeader() {
  return "החנות שלי"
}
```

מה יש בקובץ הזה של הקומפוננטה:
- המילה `export` אומרת שהקובץ הזה מייצא את הפונקציה הזו
- המילה `function` אומרת ל-JS שאנחנו מגדירים פונקציה
- בפונקציה יש רק שורה אחת `return` שמחזירה מחרוזת

## הערה לגבי אם ה-VS-CODE מנסה לבדוק TypeScript

אנחנו עובדים עם VS Code והוא יודע לבדוק את הקבצים שלנו ולוודא שהאופן שבו אנחנו כותבים JS הוא תקין. כדי לעזור לו, נשים בתיקיית ה-ROOT קובץ `jsconfig.json`:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "jsx": "react-jsx",
    "types": [
      "vite/client"
    ]
  },
  "exclude": [
    "node_modules",
    "**/node_modules/*"
  ]
}
```

עכשיו נשים את הפונקציה בתוך האפליקציה:

```javascript
import { AppHeader } from './components/AppHeader'

// ...

<AppHeader />
<h1>Vite + React</h1>
// ...
```

כדי לייבא את הקומפוננטה, אנחנו משתמשים בהוראה `import`, ואז שמים את השם של הפונקציה בסוגריים מסולסלים.

שימו לב שה-VS יתן לנו השלמה אוטומטית, ואז גם ייבא את הקומפוננטה מהמקום שלה.

בשלב הבא נשפר את הקומפוננטה:
- נשים את הטקסט בתוך H1
- נמחק את הטקסט של הכותרת המקורית

## מגבלות של JSX

למרות שה-JSX נראה כמו HTML, הוא בעצם לא. הוא מעין פיצ'ר שריאקט נותן לנו כדי שיהיה לנו נוח לעבוד איתו, אבל בסופו של דבר ריאקט מחליף את מה שכתבנו ל-JavaScript.

למשל:
- אסור לשים את המילה `class` כי היא מילה שמורה ב-JS, במקום זה משתמשים ב-`className`
- כל פונקציית קומפוננטה חייבת להחזיר רק אלמנט ROOT אחד

## ניהול סטייט בקומפוננטה

הרבה מהעבודה בממשק משתמש קשורה בניהול סטייט. סטייט הוא המצב הנוכחי של האפליקציה שברובו נשמר בזיכרון. דוגמאות לסטייט:
- מה שהקלדתי בטופס
- תפריט פתוח או סגור
- האם אני משתמש מחובר או לא

איך מנהלים סטייט בריאקט?

בתוך הקומפוננטה הקיימת, שבאה כברירת המחדל, יש לנו את השורה הזאת:

```javascript
const [count, setCount] = useState(0)
```

יש כאן כמה דברים מורכבים:

- `const` זה הכרזת משתנה קבוע ב-JS
- הסינטקס עם הסוגריים המרובעים (שנקרא destructuring) בעצם אומר:

```javascript
const useStateResult = useState(0)
const count = useStateResult[0];
const setCount = useStateResult[1];
```

`useState` מחזירה מערך עם שני איברים: 
1. הראשון הוא הערך של ה-state
2. השני הוא פונקציה לעדכון ה-state

נשנה את שם המשתנים, כי נרצה שהכפתור ישנה את סוג הגלידה שנרצה לבחור:

```javascript
const [serveType, setServeType] = useState('cone') // cone | cup

function clickServeType() {
  if (serveType === 'cone') {
    setServeType('cup')
  } else {
    setServeType('cone')
  }
}
```

ובכפתור נשנה ל:

```jsx
<button onClick={() => clickServeType()}>
  count is {serveType}
</button>
```

שימו לב שבתוך ה-`onClick` יש לנו Arrow function.

## הוספת גלידה - ופרופס

אחד הדברים המרכזיים בריאקט: העדכון הוא תמיד מלמעלה למטה. כלומר ההורים משפיעים על הילדים (ועל הנכדים וכו').

נוסיף קומפוננטה שנקרא לה `IceCream`.

כדי להעביר מידע מהקומפוננטה הראשית לקומפוננטת בת, אנו משתמשים ב-props. פונקציה של קומפוננטה מקבלת משתנה אחד שנקרא props.

ניצור קומפוננטה בסיסית:

```javascript
export const IceCream = () => {
  return (<div>Ice cream</div>)
}
```

אנחנו רוצים שהגלידה שלנו תציג אם המשתמש בחר גביע או כוס.

נוסיף גם שורה לרינדור בקומפוננטת האב:

```jsx
<AppHeader />
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <IceCream />
</div>
```

## דחיפת פרופס לקומפוננטה

בקומפוננטה עצמה נוסיף את הארגומנט `props`:

```javascript
export const IceCream = (props) => {
  console.log(props)
  return (
    <div className="cup"></div>
  )
}
```

וכך נעביר props:

```jsx
<IceCream serveType={serveType} />
```

כל פעם שהקומפוננטה אב משתנה, הפונקציה של הבן (גלידה) רצה מחדש. ריאקט מרנדר מחדש את קומפוננטת הבן אם צריך.

נשתמש ב-props בקומפוננטת הבן:

```javascript
return (
  <div className={props.serveType}></div>
)
```

## צורות נוספות של סינטקס

נדבר על destructuring ב-JS:

ב-JS, יש לנו אובייקטים בתור האופן המרכזי להכיל סוגי מידע מורכבים. 
- דרך אחת לגשת לתכונות של האובייקטים היא על ידי dot notation
- דרך נוספת היא destructuring
- Ternary expression היא שיטה נוספת לבצע בקרת זרימה של IF-ELSE פשוט

```javascript
// destructuring
const person = { firstName: 'John', age: 30 };
const { firstName, age } = person;

// ternary expression
const isAdult = age > 18 ? 'yes' : 'no';
```

נעדכן את הקומפוננטה שלנו לשימוש בשיטות האלו:

```javascript
export const IceCream = ({ serveType }) => {
  return (
    <div className={serveType === 'cone' ? 'cone' : 'cup'}></div>
  )
}
```

אנחנו משתמשים בביטוי ternary כדי להפריד את הדרך שבה אנחנו מייצגים את המידע במקומות שונים. אם נרצה לשנות את שם הקלאס בעתיד, נוכל לעשות זאת בקלות.

## משימה - הוספת כפתור נוסף

משימות בקבוצות קטנות:
1. למחוק את הסמלים React + Vite שבאו כברירת מחדל
2. לשנות את הטקסט של הכפתור לעברית
3. להוסיף עוד כפתור, שייצג האם אנחנו רוצים שוקולד או וניל

## מאפיינים נוספים של JSX

לפני שנמשיך נתעקב על עוד 2 מאפיינים של JSX:
- children prop
- רינדור של מערכים
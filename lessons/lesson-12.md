# קורס ריאקט חלק יב' - לינט טייפצ'ק ופריטייר

## פתיחה

בחלק הקודם דיברנו על הסביבה שמקיפה את הקוד - בילד, CI/CD ופריסה. בחלק הזה נדבר על כלים שבודקים את **הקוד עצמו**, עוד לפני שהוא רץ.

יש שלושה כלים כאלו שנמצאים כמעט בכל פרוייקט פרונט מקצועי:
- **ESLint** - לינטר. מחפש בעיות ודפוסים לא טובים בקוד.
- **TypeScript (tsc)** - בודק שהטיפוסים בקוד נכונים (טייפצ'ק).
- **Prettier** - מעצב את הקוד בצורה אחידה.

שלושתם עושים משהו שנקרא **ניתוח סטטי** (Static Analysis) - הם קוראים את הקוד, אבל לא מריצים אותו. בניגוד לטסטים, שמריצים את הקוד ובודקים את התוצאה.

## למה צריך את זה בכלל?

בואו נחשוב על זה רגע. הקוד שלנו עובד, אז למה צריך עוד כלים?

- **לתפוס באגים מוקדם** - הרבה יותר זול לתקן באג בזמן שכותבים את הקוד, מאשר כשהוא כבר בפרודקשן.
- **אחידות בצוות** - כשעובדים כמה אנשים על אותו קוד, כל אחד כותב קצת אחרת. הכלים האלו גורמים לכולם לכתוב "באותה שפה".
- **פחות ויכוחים בקוד ריוויו** - במקום להתווכח אם שמים נקודה-פסיק או לא, הכלי מחליט.
- **אוטומציה** - אפשר להריץ אותם ב-CI, כמו שעשינו עם הטסטים.

### מי עושה מה?

| כלי | מה הוא בודק | דוגמה |
|------|------|------|
| ESLint | איכות הקוד, דפוסים בעייתיים | משתנה שלא בשימוש, `console.log` ששכחנו |
| TypeScript | נכונות הטיפוסים | העברנו מספר לפונקציה שמצפה לסטרינג |
| Prettier | עיצוב ופורמט בלבד | רווחים, גרשיים, אורך שורה |

שימו לב: Prettier לא מוצא באגים. הוא רק "מסדר" את הקוד. ESLint ו-TypeScript מוצאים בעיות.

## ESLint - הלינטר

### מה זה לינטר?

המילה Lint באנגלית זה מוך - הסיבים הקטנים שנשארים על הבגדים במייבש. לינטר הוא כלי ש"מנקה את המוך" מהקוד: דברים קטנים שלא בהכרח שוברים את הקוד, אבל הם סימן לבעיה או לקוד מרושל.

### ESLint כבר מותקן אצלנו

כשיצרנו את הפרוייקט עם VITE, הוא כבר התקין לנו ESLint. בואו נסתכל ב-`package.json`:

```json
{
  "scripts": {
    "lint": "eslint ."
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.24",
    "typescript-eslint": "^8.54.0"
  }
}
```

שימו לב שכולם ב-devDependencies - כמו שלמדנו בחלק של הטסטים, הם לא מגיעים ללקוח.

בואו נריץ:

```bash
npm run lint
```

וואו, הרבה שגיאות! בואו נסתכל על חלק מהן:

```
src/pages/Checkout.tsx
   42:57  error  Unexpected any. Specify a different type      @typescript-eslint/no-explicit-any
   50:12  error  'validationErrors' is assigned a value but never used  @typescript-eslint/no-unused-vars
```

כל שורה אומרת לנו:
- **איפה** - שם הקובץ, שורה ועמודה (`42:57`)
- **מה החומרה** - `error` או `warning`
- **מה הבעיה** - הסבר במילים
- **איזה חוק** - שם החוק שנשבר (`@typescript-eslint/no-explicit-any`)

### קובץ ההגדרות

כל ההגדרות של ESLint נמצאות בקובץ `eslint.config.js`. בואו נסתכל עליו:

```javascript
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  // ...
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    // ...
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]" },
      ],
    },
  },
]);
```

נעבור על החלקים החשובים:
- **globalIgnores** - תיקיות שלא בודקים בכלל. למשל `dist` - תוצאת הבילד, שאין טעם לבדוק.
- **files** - על אילו קבצים ההגדרות חלות.
- **extends** - "חבילות" של חוקים מוכנים. במקום להגדיר מאות חוקים בעצמנו, לוקחים את מה שהקהילה המליצה (`recommended`).
- **plugins** - למשל `react-hooks`, שבודק שאנחנו משתמשים בהוקים לפי החוקים (זוכרים? לא קוראים להוק בתוך תנאי).
- **rules** - כאן אנחנו משנים או מוסיפים חוקים משלנו.

### רמות חומרה של חוק

לכל חוק יש שלוש רמות:

| רמה | משמעות |
|------|------|
| `"off"` (או `0`) | החוק כבוי |
| `"warn"` (או `1`) | אזהרה - מוצג בצהוב, אבל `npm run lint` לא נכשל |
| `"error"` (או `2`) | שגיאה - מוצג באדום, והפקודה נכשלת |

ההבדל בין `warn` ל-`error` חשוב מאד כשמריצים ב-CI: שגיאה תכשיל את הבילד, אזהרה לא.

אפשר גם להעביר לחוק אפשרויות, כמו שרואים ב-`no-unused-vars` - מעבירים מערך שהאיבר הראשון שלו הוא הרמה, והשני הוא האפשרויות.

### חוקים חשובים

יש מאות חוקים, אבל בואו נכיר כמה מהחשובים:

#### no-console

אוסר על שימוש ב-`console.log` ודומיו.

למה? כי `console.log` זה כלי מעולה לדיבאג, אבל בדרך כלל לא נרצה שהוא יגיע לפרודקשן. זה מלכלך את הקונסול של המשתמש, ולפעמים אפילו חושף מידע רגיש.

```javascript
// ❌ החוק יתריע על זה
console.log("order", order);

// ✅ אם הגדרנו allow: ["error"], זה בסדר
console.error("Error adding document: ", error);
```

#### @typescript-eslint/no-explicit-any

אוסר על שימוש בטיפוס `any`.

זוכרים שדיברנו על טייפסקריפט? `any` זה בעצם להגיד לטייפסקריפט "תפסיק לבדוק כאן". זה מבטל את כל היתרון של טייפסקריפט.

```typescript
// ❌ טייפסקריפט לא יודע כלום על cart
const [cart, setCart] = useState<Record<string, any>>({});

// ✅ עכשיו טייפסקריפט יודע מה יש בכל פריט
interface CartItem {
  serveType: string;
  taste: string;
  topping: string;
}
const [cart, setCart] = useState<Record<string, CartItem>>({});
```

אם באמת לא יודעים מה הטיפוס, עדיף להשתמש ב-`unknown`, שמכריח אותנו לבדוק את הטיפוס לפני שמשתמשים בו.

#### no-unused-vars / @typescript-eslint/no-unused-vars

משתנה שהוגדר ולא בשימוש. בדרך כלל זה סימן שמשהו נשכח, או שזה קוד מת שאפשר למחוק.

#### eqeqeq

מחייב להשתמש ב-`===` במקום `==`.

```javascript
// ❌ == עושה המרות טיפוסים מוזרות
if (count == "0") { }   // true אם count הוא 0

// ✅
if (count === 0) { }
```

#### prefer-const

אם משתנה לא משתנה אף פעם, שיהיה `const` ולא `let`.

#### react-hooks/rules-of-hooks ו-react-hooks/exhaustive-deps

החוקים של ההוקים, שכבר מגיעים מוגדרים. השני בודק שלא שכחנו משתנה במערך התלויות של `useEffect`. זוכרים כמה באגים זה עשה לנו?

### תיקון אוטומטי

חלק מהחוקים ESLint יודע לתקן בעצמו (למשל `prefer-const`). בשביל זה מריצים:

```bash
npx eslint . --fix
```

לא כל חוק אפשר לתקן אוטומטית. למשל `no-explicit-any` - ESLint לא יכול לדעת מה הטיפוס הנכון, את זה רק אנחנו יודעים.

### השתקת חוק בשורה מסויימת

לפעמים יש מקרה מיוחד שבו אנחנו יודעים מה אנחנו עושים, ורוצים להשתיק חוק רק במקום אחד:

```typescript
// eslint-disable-next-line no-console
console.log("זה בכוונה");
```

שימו לב, להשתמש בזה בזהירות! אם צריך להשתיק חוק בכל מקום, כנראה שעדיף לשנות את החוק בקובץ ההגדרות.

### תוסף ל-VS Code

כדי לראות את השגיאות ישר בעורך, בלי להריץ פקודה, נתקין את התוסף **ESLint** של Microsoft ב-VS Code. עכשיו נראה קו מסולסל מתחת לבעיות, בדיוק כמו בשגיאות של טייפסקריפט.

## משימה 1 - חוק no-console

1. הוסיפו את החוק `no-console` לקובץ `eslint.config.js` (בחלק של קבצי ה-TS), כך שיציג **אזהרה** על כל שימוש ב-console.
2. הוסיפו `console.log` באחד הקומפוננטות, והריצו `npm run lint`. מה קיבלתם?
3. שנו את החוק כך ש-`console.error` יהיה מותר, אבל `console.log` עדיין לא.

### פתרון משימה 1

```javascript
  {
    files: ["**/*.{ts,tsx}"],
    // ...
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]" },
      ],
      "no-console": ["warn", { allow: ["error"] }],
    },
  },
```

והתוצאה:

```
  1:1  warning  Unexpected console statement. Only these console methods are allowed: error  no-console
```

## משימה 2 - חוק no-explicit-any

1. החוק `@typescript-eslint/no-explicit-any` כבר מוגדר כשגיאה (הוא מגיע עם `recommended`). מצאו בפרוייקט את המקום שבו יש `any`.
2. שנו את החוק כך שיהיה רק **אזהרה**. מה השתנה בפלט של `npm run lint`?
3. בונוס: תקנו את הקוד כך שלא יהיה בו `any` בכלל, והחזירו את החוק להיות `error`.

### פתרון משימה 2

```javascript
    rules: {
      // ...
      "@typescript-eslint/no-explicit-any": "warn",
    },
```

ה-`any` נמצא ב-`src/pages/Checkout.tsx`:

```typescript
const [cart, setCart] = useState<Record<string, any>>({});
```

אחרי השינוי, השורה הזו תופיע בצהוב בתור `warning` ולא בתור `error`.

## TypeScript - בדיקת טיפוסים (Typecheck)

### רגע, מה ההבדל בין זה ללינט?

אמרנו שגם ESLint בודק דברים שקשורים לטייפסקריפט (כמו `no-explicit-any`). אז למה צריך עוד בדיקה?

ESLint בודק **דפוסים** בקוד - "האם כתבת any?". הקומפיילר של טייפסקריפט בודק **נכונות** - "האם הטיפוסים מתאימים אחד לשני?".

### VITE לא בודק טיפוסים!

זו נקודה חשובה שהרבה אנשים לא יודעים. זוכרים שדיברנו על הבילד בחלק הקודם? VITE ממיר את הקוד מ-TS ל-JS, אבל **הוא לא בודק את הטיפוסים**. הוא פשוט "מוחק" אותם. זה מה שהופך אותו למהיר.

זאת אומרת שאפשר לבנות ולהריץ פרוייקט עם שגיאות טייפסקריפט, ולא לדעת על זה!

בגלל זה הוספנו פקודה ב-`package.json`:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

- `tsc` - הקומפיילר של טייפסקריפט.
- `--noEmit` - "אל תיצור קבצים". אנחנו רוצים רק את הבדיקה, את הבנייה עצמה VITE עושה.

בואו נריץ:

```bash
npm run typecheck
```

ונקבל משהו כזה:

```
src/models/ServingType.ts(1,10): error TS2724: '"./stubInterfact"' has no exported member named 'stubInterface'. Did you mean 'StubInterface'?
src/pages/IcecreamBuilderPage.tsx(22,17): error TS2741: Property 'testme' is missing in type ...
```

אלו באגים אמיתיים! למשל הראשון - ייבאנו משהו עם אות קטנה במקום אות גדולה.

### קובץ ההגדרות - tsconfig.json

ההגדרות של טייפסקריפט נמצאות בקובץ `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "tests"]
}
```

החלק המעניין אותנו הוא החלק שנקרא `Linting` - כן, גם לטייפסקריפט יש חוקים שדומים ללינט:

| הגדרה | מה היא עושה |
|------|------|
| `strict` | מדליק אוסף של בדיקות מחמירות (ראו בהמשך) |
| `noUnusedLocals` | שגיאה על משתנה מקומי שלא בשימוש |
| `noUnusedParameters` | שגיאה על פרמטר של פונקציה שלא בשימוש |
| `noFallthroughCasesInSwitch` | שגיאה אם שכחנו `break` ב-`switch` |
| `noImplicitReturns` | שגיאה אם בפונקציה יש מסלול שלא מחזיר ערך |

### מה זה strict?

`strict` הוא בעצם קיצור שמדליק כמה הגדרות. החשובות שבהן:
- **noImplicitAny** - אם טייפסקריפט לא מצליח להבין מה הטיפוס, הוא לא יחליט שזה `any` בשקט, אלא יצעק.
- **strictNullChecks** - `null` ו-`undefined` הם טיפוסים נפרדים. אי אפשר להשתמש במשהו שאולי `undefined` בלי לבדוק קודם.

```typescript
// עם noImplicitAny - שגיאה! מה הטיפוס של price?
function addTax(price) {
  return price * 1.18;
}

// ✅
function addTax(price: number) {
  return price * 1.18;
}
```

```typescript
const button = document.getElementById("buy");
// עם strictNullChecks - שגיאה! אולי אין אלמנט כזה
button.addEventListener("click", buy);

// ✅
button?.addEventListener("click", buy);
```

אפשר לכבות הגדרה ספציפית מתוך `strict`, למשל:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": false
  }
}
```

אבל בדרך כלל זה לא רעיון טוב. כמו שאמרנו על `any` - כל בדיקה שמכבים, זה עוד מקום שבאגים יכולים להסתתר בו.

### השתקת שגיאה של טייפסקריפט

כמו ב-ESLint, גם כאן אפשר להשתיק שורה. ראינו את זה בחלק של הטסטים:

```typescript
//@ts-ignore
addDoc.mockRejectedValueOnce(new Error('Failed to submit order'))
```

עדיף להשתמש ב-`@ts-expect-error`, שהוא דומה, אבל אם השגיאה נעלמת (למשל תיקנו את הקוד) - הוא יתריע לנו שאפשר להוריד אותו.

## משימה 3 - שינוי חוק בטייפסקריפט

1. הריצו `npm run typecheck` וספרו כמה שגיאות יש מסוג `TS6133` (משתנה שלא בשימוש).
2. כבו את `noUnusedLocals` ב-`tsconfig.json` והריצו שוב. מה השתנה?
3. החזירו את `noUnusedLocals`, והדליקו את `noImplicitReturns`. כתבו פונקציה שמחזירה ערך רק בתוך `if`, ובדקו שקיבלתם שגיאה.
4. שאלה למחשבה: גם ESLint וגם טייפסקריפט בודקים משתנים שלא בשימוש. האם צריך את שניהם?

### פתרון משימה 3

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true
  }
}
```

```typescript
function getServingLabel(type: string) {
  if (type === "cone") {
    return "גביע";
  }
}
// error TS7030: Not all code paths return a value.
```

לגבי השאלה - בדרך כלל בוחרים אחד מהם, כדי לא לקבל את אותה שגיאה פעמיים. היתרון של ESLint הוא שאפשר להגדיר אותו בצורה יותר גמישה (למשל להתעלם ממשתנים שמתחילים ב-`_`), ואפשר לקבוע אם זו אזהרה או שגיאה.

## Prettier - עיצוב קוד

### מה הבעיה?

בואו נסתכל על השורה הזו מתוך `Checkout.tsx`:

```typescript
    const  [ cart, setCart]   = useState<Record<string, any>>({});
```

רווחים כפולים, רווח אחרי הסוגריים אבל לא לפני... זה לא באג, הקוד עובד. אבל זה קשה לקריאה, וכשכל אחד בצוות כותב בסגנון אחר, כל קומיט מלא בשינויים של רווחים שמסתירים את השינויים האמיתיים.

### מה Prettier עושה?

Prettier הוא **מעצב קוד** (Code Formatter) "דעתן" (opinionated). הוא לוקח את הקוד, זורק את כל העיצוב שלו, ומדפיס אותו מחדש לפי הכללים שלו. יש לו מעט מאד אפשרויות הגדרה - בכוונה. הרעיון הוא להפסיק להתווכח על עיצוב.

### התקנה

```bash
npm install -D prettier
```

ונוסיף פקודות ל-`package.json`:

```json
{
  "scripts": {
    "format": "prettier . --write",
    "format:check": "prettier . --check"
  }
}
```

- `--write` - מתקן את הקבצים.
- `--check` - רק בודק, ונכשל אם יש קובץ שלא מעוצב. זה מה שנריץ ב-CI.

נריץ:

```bash
npm run format
```

ונראה שהשורה שלנו הפכה ל:

```typescript
  const [cart, setCart] = useState<Record<string, any>>({});
```

### קובץ ההגדרות - .prettierrc

כדי לשנות את ההגדרות, ניצור קובץ `.prettierrc` בתיקייה הראשית:

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "all"
}
```

| הגדרה | ברירת מחדל | מה היא עושה |
|------|------|------|
| `semi` | `true` | האם לשים `;` בסוף כל שורה |
| `singleQuote` | `false` | גרש בודד `'` במקום גרשיים `"` |
| `tabWidth` | `2` | כמה רווחים בכל הזחה |
| `printWidth` | `80` | אורך שורה מקסימלי לפני שבירה |
| `trailingComma` | `"all"` | פסיק אחרי האיבר האחרון ברשימה |

וגם קובץ `.prettierignore`, כדי ש-Prettier לא יגע בקבצים שלא שלנו:

```
dist
node_modules
package-lock.json
```

### Prettier ו-ESLint ביחד

יש חוקים של ESLint שעוסקים בעיצוב (למשל רווחים). אם גם ESLint וגם Prettier מטפלים בעיצוב, הם יכולים "לריב" - אחד מתקן, והשני מתקן בחזרה.

הפתרון המקובל: **ESLint אחראי על איכות הקוד, Prettier אחראי על העיצוב.** יש חבילה שנקראת `eslint-config-prettier` שמכבה את כל החוקים של ESLint שמתנגשים עם Prettier:

```bash
npm install -D eslint-config-prettier
```

```javascript
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  // ... כל ההגדרות הקודמות
  eslintConfigPrettier, // תמיד אחרון!
]);
```

### עיצוב אוטומטי בשמירה

הכי נוח זה שהקוד יעוצב לבד כל פעם שאנחנו שומרים קובץ. ב-VS Code:
1. מתקינים את התוסף **Prettier - Code formatter**.
2. בהגדרות מחפשים `Format On Save` ומסמנים אותו.
3. בהגדרות מחפשים `Default Formatter` ובוחרים ב-Prettier.

## משימה 4 - התאמה אישית של Prettier

1. התקינו את Prettier והוסיפו את הפקודות `format` ו-`format:check`.
2. הריצו `npm run format:check`. כמה קבצים לא מעוצבים?
3. צרו קובץ `.prettierrc` עם ההגדרות הבאות:
   - בלי נקודה-פסיק בסוף שורה
   - גרש בודד במקום גרשיים
   - הזחה של 4 רווחים
4. הריצו `npm run format` ובדקו בגיט (`git diff`) מה השתנה.

### פתרון משימה 4

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 4
}
```

לפני:

```typescript
const  x = {a:1,b:"two"}
function f(a,b){return a+b}
```

אחרי:

```typescript
const x = { a: 1, b: 'two' }
function f(a, b) {
    return a + b
}
```

## חיבור ל-CI

זוכרים את ה-GitHub Action שכתבנו בחלק הקודם? כרגע הוא מריץ רק טסטים. בואו נוסיף לו את כל הבדיקות:

```yaml
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: './'
      - run: npm install
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run format:check
      - run: npm test
```

עכשיו, אם מישהו דוחף קוד עם `any`, עם שגיאת טיפוסים או קוד לא מעוצב - הבילד ייכשל, ונדע על זה מיד.

שימו לב: כרגע יש בפרוייקט שלנו שגיאות לינט וטייפסקריפט, אז הבילד ייכשל! לפני שמוסיפים את הבדיקות ל-CI צריך קודם לתקן את כל השגיאות (או להוריד חלק מהחוקים ל-`warn`).

## סיכום

בפרק הזה הכרנו שלושה כלים לניתוח סטטי של קוד:
- **ESLint** - מוצא דפוסים בעייתיים בקוד, כמו `console.log` ששכחנו או שימוש ב-`any`.
- **TypeScript** - בודק שהטיפוסים נכונים. חשוב לזכור ש-VITE לא עושה את זה בשבילנו!
- **Prettier** - דואג שכל הקוד ייראה אותו דבר, כך שאפשר להתרכז במה שחשוב.

הכלים האלו לא מחליפים טסטים, הם משלימים אותם. ביחד הם יוצרים רשת ביטחון שתופסת באגים עוד לפני שהקוד רץ.

[חזרה לראש העמוד](#קורס-ריאקט-חלק-יב---לינט-טייפצק-ופריטייר)

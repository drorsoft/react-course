# קורס ריאקט חלק יא - סביבות ותהליכי עבודה

## למה אי אפשר להוסיף קבצי JS?

כשבנינו בקורס פרונט הפתיחה הראשון במקומי קובץ HTML יכולנו להוסיף לו קבצי JS אם הם היו בתיקייה לידו. פה אנחנו לא יכולים, זאת מכיוון שאנו עובדים בסביבת פיתוח מודרנית עם מודולים וכלי בנייה שדורשים תהליך קומפילציה.

## CI/CD עם GitHub Actions

```yaml
name: Ice cream app CI

on:
  push:

jobs:
  build:
    # ההגדרות חסרות כאן
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm run test
```

### הסבר תהליך העבודה

נסביר בעצם מה הצעדים שקורים כאן:

1. הגדרת שם למשימת ה-CI
2. הגדרה מתי תרוץ המשימה (בכל דחיפה לריפוזיטורי)
3. הגדרת ג'וב בנייה והרצת טסטים
4. קביעת סביבת הריצה ומטריצת גרסאות Node.js
5. הגדרת השלבים לביצוע

הנקודה החשובה שצריך להבין שכל זה רץ בקונטיינר, שזה כמו מיני מערכת הפעלה (לינוקס) שקמה ובתוכה אפשר לעשות כל מני פעולות, כולל יציאה לרשת.

### בדיקת תהליך ה-CI/CD

עכשיו בואו נראה מה קורה בצד של גיטהאב:

1. נכנס לריפוזיטורי בגיטהאב ונראה מה קורה באקשן
2. כל הקוד שכתבנו רץ אוטומטית
3. מריץ את הטסטים ורואה אם הכל בסדר

### בדיקת כישלון טסטים

עכשיו בואו ונעשה ניסיון להכשיל את הטסטים:

נגיד שבאנו ועשינו טעות - בטעות שינינו משהו, למשל את הרג'קס של הטלפון ל-9 ספרות. נראה מה קורה:

* הבילד נכשל
* מקבלים מייל על הכישלון
* ניתן להיכנס לבילד ולראות את סיבת הכישלון

## פריסת האתר

אז ככה, בדרך כלל כשאנחנו רוצים לפרוס את האתר לפרודקשן, נדחוף אותו לענף שנקרא `production`.

נדחוף אותו ל-[GitHub Pages](https://pages.github.com/). בשביל זה צריך לאפשר את הדחיפה הזו (זה פיצ'ר חדש).

### הגדרת GitHub Pages

ללכת ל-SETTING של הריפוזיטורי:

1. ואז ל-Environments
2. ואז ל-github-pages
3. בתוך "1 branch and 0 tags allowed" לשנות את ענף ברירת המחדל מ-`MAIN` ל-`PRODUCTION`

### הגדרת workflow לפריסה

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["production"]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ 22.x ]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: './'
      # המשך ההגדרות
      - run: npm ci
      - run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

עכשיו יש לי עוד שגיאה מכיוון שאין לי את הקובץ הפרטי, אז מה שאני אעשה אני אוסיף אותו בצורה של האק.

וזהו זה עובד באתר הזה!

## סיכום

בפרק הזה התעסקנו בתהליכי פיתוח שונים, הכרנו את סביבות העבודה השונות ואיך לעבוד איתן. למרות שלא מדובר כאן בקוד שקשור רק לממשק משתמש וכו', או שמוצג ישירות בקומפוננטות, זה חשוב להכיר את הסביבות ואת תהליכי העבודה איתם, לחווית פיתוח יותר משמעותית.

### הנושאים שלמדנו:
* הגדרת תהליכי CI/CD באמצעות GitHub Actions
* בדיקת טסטים אוטומטית בכל דחיפה לריפוזיטורי
* הגדרת פריסה אוטומטית לאתר באמצעות GitHub Pages
* קונפיגורציה של סביבות עבודה

[חזרה לראש העמוד](#קורס-ריאקט-חלק-יא---סביבות-ותהליכי-עבודה)
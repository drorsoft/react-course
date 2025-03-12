<style>*{direction:rtl;}</style>
קורס ריאקט שיעור ג'

פתיחה
בפעם הקודמת התעסקנו במנגנונים שבאים עם ריאקט מהקופסא:
קומפוננטות
USE STATE
פרופס

היום נתעסק בעיצוב ופריסה (LAYOUT). 

לשם כך נעשה קודם כל קצת חזרה על CSS, ממה שהיה לנו בקורס הקודם.

נראה רגע את המצגת הזו שתזכיר לנו קצת על CSS. 

בעיות עם CSS
השפה CSS היא שפה מאד "חזקה" במובן שבמעט עבודה אפשר לעשות הרבה מאד שינויי פריסה ועיצוב. אבל יש לה כל מני בעיות:
הכי חשוב: CSS הוא גלובלי. זאת אומרת הדפדפן מכיר את כל ה CSS של כל הקומפוננטות שלנו. אם יש לנו אפליקציה של דף HTML אחד, או שיש לנו  2-3 קומפוננטות זה לא נורא. אבל אם יש לנו 20 או 100 קומפוננטות שלכל אחד עיצוב משלה זה כבר נהיה בעייתי. 
חזרתיות: ה css חוזר על עצמו וזה יחסית קשה לעשות שימוש חוזר בקלאסים 
דירוג בחוקים: ישנה דינאמיקה מורכבת של החוקים, איזה חוק יותר חשוב ואיזה חוק יקבע את הסגנון הסופי
דרכים מרובות שונות  לקבוע את הסגנון 

פתרונות שונים

אז ככה: בהרבה מובנים אין פתרון אחד לכל הבעיות לכל פתרון יש יתרונות וחסרונות. 
בנוסף לכך ישנן המון(!) פתרונות שונים להתמודד עם איך מעצבים קומפוננטות בריאקט, ולא רק בריאקט, זו בעייה של כל נושא העיצוב מראשית ימיו. 

כן בשנים האחרונות, עלה כלי שנקרא tailwind css, שכן בגדול נהיה industry standard, אם בכלל אפשר להגיד דבר כזה. והוא יחסית קונצנזוס. הוא לא פותר את כל הבעיות, אבל היום זה הדרך המרכזית ברוב הגדול של המקומות. 

בשיעור הזה בעצם מתעסק בלהתקין אותו, להכיר אותו ולהשתמש בו לבנות layout. 

דגשים:
חשוב לי שנראה best practices  של איך מתקינים ספריה. 
חשוב לזכור שבסוף כל הכלים מייצרים css או סגנונות בדיוק כמו שלמדנו עליהם בקורס של הפרונט. אז בעצם חשוב להכיר את הtailwind והשימושים שלו, אבל יחד עם זה נלמד גם מאפיינים שונים של css. 
אני מתכנן בעוד כמה מפגשים להכיר עוד כלים (חלקם את כבר מכירים), גם משום שכנראה שכאשר תחפשו דברים באינטרנט תפגשו אותם. רובם מכילים עקרונות יחסית פשוטים, אז נעבור עליהם ועל הבסיסים שלהם. 


התקנת Tailwind-css

נלך לאתר https://tailwindcss.com/ 
נלך ל getting started

נעקוב אחרי ההוראות.
 אם הVSCODE יצעק עלינו שהאיפמורט לא טוב נוסיף את השורות האלו ל JSCONFIG


   "module": "esnext",
   "moduleResolution": "bundler",


נוסיף לפי ההוראות את הקישור לקובץ CSS ב HTML שלנו, ואז גם נמחוק את הקובץ מ APP.CSS

בנוסף נתקין את התוסף ל VSCODE 
Tailwind CSS IntelliSense

התוסף הזה יעזור לנו עם AUTO COMPLETE של קלאסים שקשורים ל TAILWIND. 

איך עובדים עם TAILWIND

למעשה TAILWIND הוא מה שנקרא UTILITY CLASSES. מה זה אומר? 
שיש שימוש בקלאסים לעיצוב 
ששמות הקלאסים הם שמות טכניים שקשורים לעיצוב שהקלאס עושה. 
למשל אם נראה את הקומפוננטה של הגלידה, אז אני בניתי שם קלאסים עם משמעות "סמנטית" ספל, או גביע וכו'. ב TAILWIND לכל קלאס אין משמעות מבחינת התוכן אלא רק משמעות טכנית. 

בואו נשחק עם זה קצת:

צבעי טקסט
צבעי רקע
פלטת הצבעים
שוליים

נקודות להדגמה עם TAILWIND: 

אחרי שהתקנו את התוסף, בריחוף מעל כל קלאס אנחנו יכולים לראות את ה CSS שלו. 


נסיונות ומשחקים עם TAILWIND

הערה: צריך לתת לזה הרבה זמן כדי לפתח ביטחון בסיסי בליצור דברים ב TAILWIND ולחפש בדוקומנטציה. 

 נקח סתם קומפוננטה וננסה לעבוד ולעשות כל מני דברים עם TAILWIND. 

export const TailwindExamples = () => {
    return (<div className="w-screen min-h-screen">
        Tail wind
    </div>)
}



עכשיו יש לנו מקום לעשות כל מני משחקים:

יצירת כרטיס - ומודל הקופסא

ננסה ליצור כרטיס של מידע 

<div className="w-54 h-26 border-2 border-amber-800 rounded bg-violet-300 shadow-md"></div>

בכרטיס הזה, נעבור דבר דבר ונסביר מה המשמעות שלו ומהם המידות שלו:
מספרים, גדלים אורכים 


משימה:
כל אחד צריך ליצור כרטיס ביקור פושט של עצמו.

למשל: 

   <div className="p-3 w-54 h-26 border-2 border-amber-800 rounded bg-violet-300 shadow-md">
            <p className="text-lg">
                My name is chen
            </p>
            <p className="text-sm"> I like dogs and funny jokes</p>
            <p className="text-3xl">🐶</p>
        </div>


מומלץ גם לקרוא את הדוקומנטציה של TAILWIND אם רוצים לעשות דברים שלא עשיתי אצלי



פלקסבוקס

עכשיו מכל הדברים שקשורים לעיצוב ופריסה, רוב הדברים הם יחסית פשוטים, יש נושא אחד שאנחנו נתעמק בו הרבה, מפני ש 90% מפריסות העיצוב היום משתמשים בו, וזה נקרא  FLEX. 

אם אתם זוכרים את השיעורים שעשינו פעם על תכונות CSS, יש כמה סוגי תכונות CSS, אחת המרכזית והחשובה היא DISPLAY. זו תכונה מבלבלת מפני שהיא מעידה גם על אופן ההצגה בתוך האלמנט, וגם איפה יוצג האלמנט ביחס לאחים\ הורים שלו. 

נעשה תזכורת מהירה

יש בקישור הזה  על מודל הקופסא. 
ויש כאן את המצגת על הקופסא


אז בעצם היסטורית מכיוון שCSS נועד למסמכים כל סוגי התצוגה היו יותר למסמכים ולא לישומי רשת אחרים. 

ואז לפני 10 שנים, קצת יותר נכנס ץו סוגים חדשים בעיקר flex. ו grid. 

שניהם מתאימים יותר לרשת המודרנית כשflex מתאים ל 90% מהמקרים ועלין אנחנו נלמד. Grid זה למקומות שיש טבלאות או רשתות מורכבות יותר. 

גם בפלקס אנחנו נכיר את הבסיס התצוגתי שעומד מאחוריו, שיאפשר לנו שימוש פשוט בו, יש גם שימושים מורכבים טיפה יותר. 

יש כאן 

https://css-tricks.com/snippets/css/a-guide-to-flexbox/

מדריך שבעיני הוא ברור יחסית אפשר לעבור עליו, זה אחד התוצאות הראשונות בגוגל. 

אנחנו נלמד לעשות את הדברים עם טיילוינד, אבל אם מרחפים עם העכבר מעל כל קלאס של טיילוידץנס (אחרי שהתקנתם את התוסף) אפשר לראות בדיוק למה זה מתרגם. 

מה צריך להבין:

פלקס היא תצוגה גמישה יחסית שמתאימה את עצמה לגודל הקומםונטה והמסך  בכל מני מובנים 
לכל פלקס יש כיוון: ברירת המחדל היא שורה, והוא יכול להיות גם טור column
הכיון קובע את אופי הפלקס - זו נקודה מאד חשובה! היץכיוון קובע בעצם את ה main axis,  ולכן את תכונת ה justufy
התכונה justify - משפיעה על אופי פיזור וסידור הפרטים בציר הראשי. 
התכונה align-items משפיעה על יישור הפריטים בכיוון הנגדי (בציר המשני)
התכונה gap מדברת על הפער בין הפריטים. 

דוגמת עבודה עם פלקס



const Item = ({ children }) => {
    return <div className="w-20 h-12 border border-blue-400 p-4 bg-amber-200"> Item {children}</div>
}


export const TailwindExamples = () => {
    return (<div className="p-5 w-screen min-h-screen flex flex-col items-center justify-center  ">
        <div className="flex flex-row gap-4 bg-pink-400 w-full">
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
            <Item>4</Item>
            <Item>5</Item>
            <Item>6</Item>


        </div>
    </div>)
}


נעשה מעיין דוגמה פשוטה של פלקס ועוד קומפוננטה 

נתנסה בתכונות הציר המרכזי
 justify-around
justify-end
justify-start

 justify-bwtween
זה ממש דומה ל AROUND חוץ מזה שזה מתעלם מהראשון והאחרון שקרובים לקצוות. 

נתנסה בתכונות הציר המשני

items-center
items-end
items-stretch

שימו לב ש STRETCH זה משהו שלא משתמשים בו המון אבל הוא מראה מצב שב CSS הקונטיינר \ ההורה קובע את הגובה של הבן, לפי מה שהוא "מאפשר" לבן. 

תכונות נוספות
flex-wrap
flex-grow = flex-1

להראות מה קורה עם כל מני אפשרויות כשמשנים גודל מסך
נשאיר את עמוד ה EXAMPLE שמסביר על זה (אבל הוא לא יהיה חלק מהאפליקציה)



לגבי DIRECTION  של שפה אם יעלו שאלות צריך להסביר שאין את התכונה הזו ב TAILWIND בצורה פשוטה בגלל הבעיתייות של ההסיטוריה שלה, עקרונית הדרך הנכונה ביותר היא לקבוע את התכונה ב  תג HTML ולא לשנות אותה חוץ מזה. אולי נצליח להעמיק בזה בהמשך. 


משימה:

2 אפשרויות: או ליצור LAYOUT של HTML כמו שיש בקישור

https://www.w3schools.com/html/html_layout.asp

או ליצור  LAYOUT 
של דף התחברות של פיסבוק
https://www.facebook.com/
רק החלק של ההתחברות, לא את כל העמוד






בנית הפריסה LAYOUT של האפליקציה

נבנה פריסה בסיסית לאפליקציה שתכיל NAV BAR שזה אומר בר עליון לניווט, מקום שבו תהיה הגלידה שנכין ועוד מקום שבו יהיה הממשק שדרכו נבחר את הגלידה

שלב ראשון, נעטוף את האפליקציה שלנו, במעיין מסגרת, שתהווה את הבסיס לאפליקציה שלנו.

 
    <div className="w-screen h-screen flex flex-col  bg-gray-100">
      <AppHeader />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IceCream serveType={serveType} />
      </div>

עכשיו שימו לב מה קרה כאן. למרות שעטפנו את הכל, עדיין יש קצת רווח בין הדברים. בואו נראה למה. נסתכל על ה CSS בכלי המפתחים

.

אנחנו בעצם רואים שיש לנו איזה סגנון, במקרה הזה PADDING שיושב לנו על ה ROOT ID  אז בואו נמחק אותו. 

שלב שני אנחנו רואים שהכותרת היא גדולה מדי, ולא ממורכזת. 

ננסה למרכז אותה באמצעות השימוש בפלקס. 

מה זה פלקס?

אם זוכרים מה CSS שיש כמה סוגים של display  פרופרטיז, אז אחת מהן, המודרנית ביותר היא פלקס. 


הוספת צבעים 

חוץ מהצבעים שה TAILWIND מספק לי, אני יכול לבנות עוד צבעים משלי, ולקרוא להם איך שאני רוצה. בואו נראה את הדוקומנטציה
https://tailwindcss.com/docs/adding-custom-styles

נוסף כמה צבעים.
בעייה עם הVSCODE עם המילה THEME

אם ה VS-CODE מציין שיש בעייה צריך להגיע ל setting.json 

ולהוסיף כלל

    "files.associations": {
        "*.css": "tailwindcss"
    },


צבעים משלכם
אתם תעקבו כל הזמן אחרי איך שאני אבנה את האפליקציה אבל אם הצבעים שאני שמתי ממש מפריעים לכם, יש דרך לשמור על הצבעים שלכם. בעצם ישנה תיקייה אחת שנקראת PRIVATE שהגיט מתעלם ממנה. אתם יכולים לשים שם קובץ עם סגנונות פרטיים שידרסו את הסגנונות שלי:
    <link href="/src/private/private.css" rel="stylesheet">


נשנה את השם לגלידה מהאגדות 
נשנה את זה גם בקובץ ה HTML


בחירת טעם

מה שנעשה עכשיו, זה להוסיף אפשרות של בחירת טעם
איך נעשה את זה ?

קודם כל נתחיל בליצור תקייה שנקרא לה MODELS. למה ? אנחנו נרצה כמה שניתן שהמידע באפליקצייה שלנו יהיה מסודר, ולא תמיד נצטרך "לנחש" איך קוראים לכל דבר. ואז ניצור מעיין אובייקט קבוע שמכיל שלושה טעמים:

export const IceCreamTaste = {
    Chocolate: "Chocolate"
    , Vanilla: "Vanilla"
    , Strawberry: "Strawberry"
}

הסיבה לעשות כך היא כדי שיהיו לנו משתנים "קבועים" ולא מחרוזות או מספרי קסם, שנצטרך לזכור כדי להגדיר נכון מידע באפליקציה. 

נבנה שלושה כפתורים, שיבררו מבין שלושת הטעמים:

 <div id='button-container' className='flex flex-col '>
          <button className={`p-2 w-12 bg-background-accent text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => toggleServeType()}>
            {serveType === 'cone' ? 'גביע' : 'כוס'}
          </button>
        </div>
        <div id='taste-container' className='flex flex-row gap-4'>
          <button className={`
            p-2 w-22 ${taste === IceCreamTaste.Vanilla ? 'bg-background-accent' : 'bg-secondary'}  text-black hover:ring-1 ring-purple-700 rounded
            `} onClick={() => setTaste(IceCreamTaste.Vanilla)}>
            וניל
          </button>
          <button className={`p-2 w-22 ${taste === IceCreamTaste.Chocolate ? 'bg-background-accent' : 'bg-secondary'} text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setTaste(IceCreamTaste.Chocolate)}>
            שוקולד
          </button>
          <button className={`p-2 w-22 ${taste === IceCreamTaste.Strawberry ? 'bg-background-accent' : 'bg-secondary'} text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setTaste(IceCreamTaste.Strawberry)}>
            תות שדה
          </button>


        </div>


שימו לב שכאן שמנו בתוך המחרוזת ביטוי JS, בצורה של TERNARRY, אם הכפתור הנבחר הוא זה, אז הצבע צריך להיות כך. 

השלב הבא הוא להוסיף את הטעם לקומפוננטה של הגלידה. 



    const scoopColor = (taste) => {
        switch (taste) {
            case IceCreamTaste.Chocolate:
                return '#704b03'
            case IceCreamTaste.Vanilla:
                return '#fffdf7'
            case IceCreamTaste.Strawberry:
                return '#FA5053'
            default:
                return '#fffdf7'
        }
    }


    return (
        <div className='flex flex-col items-center justify-center'>
            {taste ? (<div id='ice-cream-scoop' className={`bg-amber-400 w-22 h-22 rounded-full relative top-8 ring-1 ring-slate-400  `} style={{ backgroundColor: scoopColor(taste) }}> </div>) : null}




            <div className={serveType === 'cone' ? 'cone' : 'cup'}>


            </div>
        </div >
    )


משימה

נסו להוסיף עוד אפשרות של תוספת:
ללא תוספת, דובדבן, סוכריות צבעוניות  

לשם המשימה נלמד איך לייבא תמונות:

אז בעצם צריך להבין שנושא היבוא הוא  יותר עבודה של כלי הפריסה שלנו, במקרה שלנו vite. מה שvite עושה, כשהוא בונה את הקוד שלנו, הוא מזהה שהקובץ הזה הוא תמונה, ולכן מתייחס אליו בצורה שונה מאיפורט אחרים. זה אחד הסיבות שאנחנו צריכים כלי build.  כי אלו משימות שהם מחוץ לגבולות של ריאקט. 

אז בעצם אנחנו נשים את התמונה שלנו בתיקייה assets. זו תקיה שבדרך כלל יש בה כל מני קבצים שאינם קוד, ומקובל לשים שם תמונות, פונטים, קבצי קול וכו'. שימו לב זה לא חובה, עקרונית אפשר לשים את התמונה בכל תקייה אחרת (בתוך ה SRC) אבל זה מה שמקובל. 

ואז נעשה
import cherry from "../assets/svg/cherry.png"


עכשיו בעצם מי שעושה את העבודה הוא ה VITE שמבין שאנחנו לא מייבאים פה קובץ של קוד, אלא עושים משהו אחר, בעצם יוצרים קישור לתמונה. 
שימו לב שאם נעשה פה 
 
   console.log(cherry)



אנחנו נראה שמשתנה הזה בעצם הפך לכתובת שאותה אפשר לשים ב SRC. 

עכשיו אפשר להמשיך במשימה (צריך להביא את שתי התמונות) עדיף מאשר לבזבז זמן לחפש באינטרנט.
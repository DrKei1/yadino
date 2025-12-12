
import { Chapter } from "../types";

export const lessons: Chapter[] = [
    {
        title: "۱. مقدمه به پایتون",
        items: [
            {
                type: "lesson",
                title: "سلام، دنیا!",
                content: "به دنیای برنامه‌نویسی خوش اومدی! اولین قدم ما اینه که به کامپیوتر بگیم بهمون سلام کنه. توی پایتون، با دستور جادویی __INLINE_CODE_START__print()__INLINE_CODE_END__ می‌تونیم هرچیزی رو روی صفحه نمایش بدیم. فکر کن __INLINE_CODE_START__print()__INLINE_CODE_END__ مثل یه بلندگوئه. هرچیزی که داخل پرانتز __INLINE_CODE_START__()__INLINE_CODE_END__ و بین دوتا علامت نقل قول __INLINE_CODE_START__\" \"__INLINE_CODE_END__ (یا __INLINE_CODE_START__''__INLINE_CODE_END__) بذاری رو با صدای بلند اعلام می‌کنه. آماده‌ای اولین دستورت رو بنویسی؟ کد آماده‌ست، فقط کافیه دکمه 'اجرا' رو بزنی. 👇",
                initialCode: 'print("سلام، دنیا!")',
                hint: "هی رفیق! یادت باشه، هدف اینه که پایتون روی صفحه بگه 'سلام، دنیا!'. پایتون یه کلمه جادویی برای نمایش چیزها داره: __INLINE_CODE_START__print__INLINE_CODE_END__. فقط کافیه چیزی که می‌خوای بگی رو بین پرانتز و کوتیشن بذاری. تو می‌تونی! 😉"
            },
            {
                type: "practical",
                title: "تمرین: سلام به خودت!",
                description: "کد رو طوری تغییر بده که به جای 'سلام، دنیا!'، اسمت رو بگه! مثلاً 'سلام، سارا!'. خروجی باید شبیه 'سلام، [اسم شما]!' باشد.",
                initialCode: 'print("سلام، دنیا!")',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input # Store original input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs) # Also print to actual console

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    if not _captured_user_output:
        _test_message = "هیچ خروجی ای یافت نشد."
    elif not _captured_user_output[0].startswith("سلام، ") or not _captured_user_output[0].endswith("!"):
        _test_message = "خروجی با فرمت 'سلام، [اسم شما]!' مطابقت ندارد. مطمئن شو که 'سلام، ' و '!' را داری."
    else:
        _test_status = "TEST_PASSED"
        _test_message = "تبریک! کد شما درست است!"
        
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print # Restore original print
    builtins.input = _original_input # Restore original input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "سلام، سارا!",
                hint: "فقط متن داخل پرانتز و نقل قول رو عوض کن تا اسمت رو نشون بده. یادت نره که اسم باید بین __INLINE_CODE_START__سلام، __INLINE_CODE_END__ و __INLINE_CODE_START__!__INLINE_CODE_END__ قرار بگیره."
            },
            {
                type: "lesson",
                title: "جعبه‌های جادویی: متغیرها",
                content: "عالیه! حالا بیا با 'متغیرها' آشنا بشیم. متغیرها مثل جعبه‌های جادویی هستن که می‌تونی اطلاعاتت رو توشون ذخیره کنی. مثلاً اسمت، سنت، یا یه پیام خاص. برای ساختن یه متغیر، فقط یه اسم براش انتخاب کن، یه __INLINE_CODE_START__=__INLINE_CODE_END__ بذار و چیزی که می‌خوای رو بهش بده. مثلاً:\n__BLOCK_CODE_START__message = \"این یه راز باحاله\"__BLOCK_CODE_END__\nاز این به بعد، هرجا اسم __INLINE_CODE_START__message__INLINE_CODE_END__ رو صدا بزنی، پایتون یادشه که منظورت چیه! امتحانش کن. 🧐",
                initialCode: 'message = "این یک متغیر است"\nprint(message)',
                hint: "عالیه! متغیرها رو مثل جعبه‌هایی تصور کن که روشون برچسب زدی و می‌تونی چیزهای مختلفی توشون نگه داری. برای ساختن یه جعبه جدید (متغیر)، فقط یه اسم انتخاب کن، از علامت __INLINE_CODE_START__=__INLINE_CODE_END__ استفاده کن و هر چیزی که می‌خوای داخلش بذار. بعدش می‌تونی محتوای جعبه‌ات رو __INLINE_CODE_START__print__INLINE_CODE_END__ کنی! همینطور عالی ادامه بده! ✅"
            },
            {
                type: "quiz",
                title: "آزمون: متغیرها",
                description: "دانشت رو درباره متغیرها بسنج!",
                questions: [
                    {
                        question: "اگر بنویسیم __INLINE_CODE_START__age = 15__INLINE_CODE_END__، بعدش بنویسیم __INLINE_CODE_START__age = 16__INLINE_CODE_END__. حالا اگه __INLINE_CODE_START__print(age)__INLINE_CODE_END__ کنیم، چه عددی رو نشون میده؟",
                        options: ["15", "16", "هیچ‌کدوم"],
                        correctAnswerIndex: 1
                    }
                ],
                hint: "متغیرها همیشه آخرین مقداری که بهشون دادی رو نگه می‌دارن."
            },
            {
                type: "practical",
                title: "تمرین: معرفی خودت",
                description: "یک متغیر به اسم __INLINE_CODE_START__my_name__INLINE_CODE_END__ بساز و اسمت رو توش ذخیره کن. بعد یه متغیر دیگه به اسم __INLINE_CODE_START__my_age__INLINE_CODE_END__ بساز و سنت رو توش بذار. در نهایت، با استفاده از __INLINE_CODE_START__print()__INLINE_CODE_END__، هر دو متغیر رو نشون بده. مثلاً: 'اسم من علی هست و 15 سالمه.'",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    if 'my_name' not in _user_scope:
        _test_message = "متغیر 'my_name' تعریف نشده است."
    elif 'my_age' not in _user_scope:
        _test_message = "متغیر 'my_age' تعریف نشده است."
    elif not _captured_user_output:
        _test_message = "هیچ خروجی ای یافت نشد."
    elif not (str(_user_scope.get('my_name', '')) in _captured_user_output[0] and str(_user_scope.get('my_age', '')) in _captured_user_output[0]):
        _test_message = "نام و سن شما در خروجی چاپ نشده است."
    else:
        _test_status = "TEST_PASSED"
        _test_message = "تبریک! کد شما درست است!"
        
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "اسم من علی هست و 15 سالمه.",
                hint: "برای __INLINE_CODE_START__print__INLINE_CODE_END__ کردن چند چیز کنار هم، می‌تونی از f-string استفاده کنی:\n__BLOCK_CODE_START__print(f'اسم من {my_name} هست و {my_age} سالمه.')__BLOCK_CODE_END__"
            },
            {
                type: "lesson",
                title: "انواع متغیرها: عدد، متن، اعشار",
                content: "دنیا پر از تنوع، متغیرها هم همینطور! ما سه نوع متغیر اصلی داریم که باید بشناسیشون:\n\n1.  __INLINE_CODE_START__عدد صحیح (Integer - int)__INLINE_CODE_END__: مثل 1، 10، 100. اینا عددای بدون اعشارن.\n2.  __INLINE_CODE_START__عدد اعشاری (Float - float)__INLINE_CODE_END__: مثل 1.5، 3.14، 0.5. اینا عددای اعشاری هستن.\n3.  __INLINE_CODE_START__رشته (String - str)__INLINE_CODE_END__: هرچیزی که داخل __INLINE_CODE_START__\" \"__INLINE_CODE_END__ یا __INLINE_CODE_START__''__INLINE_CODE_END__ باشه، مثل 'سلام' یا 'اسم من'. اینا متن هستن.\n\nپایتون خیلی باهوشه و معمولاً خودش نوع متغیر رو حدس می‌زنه. اما تو می‌تونی با تابع __INLINE_CODE_START__type()__INLINE_CODE_END__ ازش بپرسی که 'جعبه‌ام از چه جنسیه؟'.",
                initialCode: 'age = 20\nname = "رضا"\nheight = 1.80\n\nprint(type(age))\nprint(type(name))\nprint(type(height))',
                hint: "تابع __INLINE_CODE_START__type()__INLINE_CODE_END__ خیلی کاربردیه! حواست باشه که __INLINE_CODE_START__input()__INLINE_CODE_END__ همیشه رشته برمی‌گردونه، حتی اگه عدد وارد کنی! پس اگه خواستی باهاش عملیات ریاضی انجام بدی، باید تبدیلش کنی. 🔄"
            },
            {
                type: "quiz",
                title: "آزمون: انواع متغیرها",
                description: "دانشت رو درباره انواع متغیرها بسنج!",
                questions: [
                    {
                        question: "نوع متغیر __INLINE_CODE_START__height = 1.75__INLINE_CODE_END__ چیه؟",
                        options: ["int", "str", "float"],
                        correctAnswerIndex: 2
                    }
                ],
                hint: "اعداد اعشاری (با نقطه) از نوع __INLINE_CODE_START__float__INLINE_CODE_END__ هستند."
            },
            {
                type: "practical",
                title: "تمرین: کاشف انواع",
                description: "چندتا متغیر با انواع مختلف (عدد صحیح، عدد اعشاری، رشته) بساز. بعد برای هرکدوم، نوعش رو با تابع __INLINE_CODE_START__type()__INLINE_CODE_END__ پرینت کن تا ببینی پایتون درست تشخیص میده یا نه! انتظار می‌رود که خروجی شامل __INLINE_CODE_START__<class 'int'>__INLINE_CODE_END__, __INLINE_CODE_START__<class 'str'>__INLINE_CODE_END__, __INLINE_CODE_START__<class 'float'>__INLINE_CODE_END__ باشد.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    _output_str = "\\n".join(_captured_user_output)

    _expected_types = {"<class 'int'>", "<class 'str'>", "<class 'float'>"}
    _found_types = set()
    for t in _expected_types:
        if t in _output_str:
            _found_types.add(t)

    if len(_found_types) < 3:
        _test_message = f"همه انواع داده مورد انتظار یافت نشدند. یافت شده: {_found_types}"
    else:
        _test_status = "TEST_PASSED"
        _test_message = "تبریک! کد شما درست است!"
        
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "<class 'int'>\n<class 'str'>\n<class 'float'>",
                hint: "متغیرهایی با مقادیر 10 (__INLINE_CODE_START__int__INLINE_CODE_END__)، 'پایتون' (__INLINE_CODE_START__str__INLINE_CODE_END__)، و 3.14 (__INLINE_CODE_START__float__INLINE_CODE_END__) بساز و برای هرکدام __INLINE_CODE_START__type()__INLINE_CODE_END__ را پرینت کن."
            }
        ]
    },
    {
        title: "۲. انواع داده پیشرفته",
        items: [
            {
                type: "lesson",
                title: "اعداد و ریاضیات: پایتون، ماشین‌حساب تو!",
                content: "کی فکرشو می‌کرد برنامه‌نویسی انقدر شبیه ریاضی باشه، ولی خیلی باحال‌تر؟ پایتون یه ماشین حساب فوق‌العاده قویه! می‌تونی باهاش جمع __INLINE_CODE_START__(+)__INLINE_CODE_END__، تفریق __INLINE_CODE_START__(-)__INLINE_CODE_END__، ضرب __INLINE_CODE_START__(*)__INLINE_CODE_END__ و تقسیم __INLINE_CODE_START__(/)__INLINE_CODE_END__ انجام بدی. دیگه لازم نیست برای حساب کتابات به مغزت فشار بیاری. بذار پایتون کار سخت رو برات انجام بده. چندتا عدد رو با هم حساب کن و نتیجه رو __INLINE_CODE_START__print__INLINE_CODE_END__ کن ببین چی میشه! 👇",
                initialCode: 'x = 10\ny = 5\nprint(x + y)\nprint(x * 2)\nprint(x / y)',
                hint: "تو توی کار با اعداد فوق‌العاده‌ای! پایتون خیلی باهوشه و می‌تونه همه جور عملیات ریاضی انجام بده. سعی کن از __INLINE_CODE_START__+__INLINE_CODE_END__، __INLINE_CODE_START__-__INLINE_CODE_END__، __INLINE_CODE_START__*__INLINE_CODE_END__ یا __INLINE_CODE_START__/__INLINE_CODE_END__ با اعدادت استفاده کنی و ببینی وقتی جواب‌ها رو __INLINE_CODE_START__print__INLINE_CODE_END__ می‌کنی چی میشه. مثل اینه که یه ماشین حساب فوق‌العاده داری! 💯"
            },
            {
                type: "quiz",
                title: "آزمون: اعداد و ریاضیات",
                description: "چند سوال ریاضی با پایتون!",
                questions: [
                    {
                        question: "اگر __INLINE_CODE_START__result = 10 * 3 / 2__INLINE_CODE_END__ باشه، __INLINE_CODE_START__result__INLINE_CODE_END__ چه عددی رو ذخیره می‌کنه؟",
                        options: ["15.0", "15", "30"],
                        correctAnswerIndex: 0
                    }
                ],
                hint: "نتیجه تقسیم همیشه از نوع __INLINE_CODE_START__float__INLINE_CODE_END__ (اعشاری) است، حتی اگر عدد صحیح باشد."
            },
            {
                type: "practical",
                title: "تمرین: حساب و کتاب جالب!",
                description: "یک متغیر __INLINE_CODE_START__apples = 5__INLINE_CODE_END__ و __INLINE_CODE_START__oranges = 3__INLINE_CODE_END__ بساز. بعدش، تعداد کل میوه‌ها رو حساب کن و پرینت کن. حالا اگه قیمت هر سیب 2 و هر پرتقال 3 باشه، کل مبلغ خرید رو هم حساب و پرینت کن. خروجی باید دو خط باشد، یکی برای مجموع میوه‌ها و دیگری برای کل هزینه.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    if 'apples' not in _user_scope or _user_scope['apples'] != 5:
        _test_message = "متغیر 'apples' با مقدار صحیح تعریف نشده است."
    elif 'oranges' not in _user_scope or _user_scope['oranges'] != 3:
        _test_message = "متغیر 'oranges' با مقدار صحیح تعریف نشده است."
    elif len(_captured_user_output) < 2:
        _test_message = "حداقل دو خط خروجی مورد انتظار است."
    else:
        _total_fruits = 5 + 3
        _total_cost = (5 * 2) + (3 * 3)
        # Check if the captured output contains the correct calculated values
        output_contains_fruits = any(str(_total_fruits) in line for line in _captured_user_output)
        output_contains_cost = any(str(_total_cost) in line for line in _captured_user_output)

        if not output_contains_fruits:
            _test_message = f"مجموع میوه‌ها ({_total_fruits}) در خروجی یافت نشد."
        elif not output_contains_cost:
            _test_message = f"مجموع هزینه خرید ({_total_cost}) در خروجی یافت نشد."
        else:
            _test_status = "TEST_PASSED"
            _test_message = "تبریک! کد شما درست است!"
            
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "8\n19",
                hint: "برای جمع از __INLINE_CODE_START__+__INLINE_CODE_END__ و برای ضرب از __INLINE_CODE_START__*__INLINE_CODE_END__ استفاده کن. برای پرینت کردن نتیجه هر حساب، یکبار __INLINE_CODE_START__print()__INLINE_CODE_END__ را صدا بزن."
            },
            {
                type: "lesson",
                title: "رشته‌ها: کلمات بازیگوش",
                content: "وقتشه با «رشته‌ها» یا همون متن‌ها کار کنیم! رشته‌ها فقط یه سری کلمه کنار هم نیستن، کلی کارای باحال می‌شه باهاشون کرد. مثلاً می‌تونی دو تا رشته رو با علامت __INLINE_CODE_START__+__INLINE_CODE_END__ به هم بچسبونی و یه جمله‌ی جدید بسازی! به این کار میگن 'الحاق' (Concatenation). کنجکاوی بدونی یه رشته چندتا حرف داره؟ تابع __INLINE_CODE_START__len()__INLINE_CODE_END__ مثل یه متر عمل می‌کنه و طولش رو بهت میگه.📏",
                initialCode: 'first_name = "علی"\nlast_name = "رضایی"\nfull_name = first_name + " " + last_name\nprint(full_name)\nprint(len(full_name))',
                hint: "برای چسباندن رشته‌ها به هم، فقط از علامت __INLINE_CODE_START__+__INLINE_CODE_END__ بین آن‌ها استفاده کن. یادت نره اگه لازم شد، یک فاصله __INLINE_CODE_START__\" \"__INLINE_CODE_END__ بین اسم‌ها اضافه کنی! تابع __INLINE_CODE_START__len()__INLINE_CODE_END__ هم برای شمردن کاراکترها به دردت می‌خوره. 🌟"
            },
            {
                type: "quiz",
                title: "آزمون: رشته‌ها",
                description: "دانشت رو درباره رشته‌ها بسنج!",
                questions: [
                    {
                        question: "اگر __INLINE_CODE_START__greeting = \"سلام\"__INLINE_CODE_END__ و __INLINE_CODE_START__name = \"دنیا\"__INLINE_CODE_END__ باشه، خروجی __INLINE_CODE_START__print(greeting + name)__INLINE_CODE_END__ چی نشون میده؟",
                        options: ["سلام دنیا", "سلامدنیا", "ارور"],
                        correctAnswerIndex: 1
                    }
                ],
                hint: "علامت __INLINE_CODE_START__+__INLINE_CODE_END__ بین رشته‌ها، آن‌ها را بدون فاصله به هم می‌چسباند."
            },
            {
                type: "practical",
                title: "تمرین: ساخت جمله باحال!",
                description: "دو تا متغیر بساز:\n__BLOCK_CODE_START__word1 = \"برنامه\"\nword2 = \"نویسی\"__BLOCK_CODE_END__\nحالا با استفاده از عملگر __INLINE_CODE_START__+__INLINE_CODE_END__ و اضافه کردن یک فاصله __INLINE_CODE_START__\" \"__INLINE_CODE_END__، این دو کلمه رو به هم بچسبون تا جمله 'برنامه نویسی' ساخته بشه و اون رو پرینت کن. بعدش با __INLINE_CODE_START__len()__INLINE_CODE_END__، طول جمله نهایی رو هم پرینت کن. خروجی باید دو خط باشد، یکی 'برنامه نویسی' و دیگری طول آن.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    _expected_phrase = "برنامه نویسی"
    if len(_captured_user_output) < 2:
        _test_message = "حداقل دو خط خروجی مورد انتظار است."
    elif _captured_user_output[0] != _expected_phrase:
        _test_message = f"انتظار '{_expected_phrase}' در خط اول بود، یافت شده: '{_captured_user_output[0]}'"
    elif not str(_captured_user_output[1]).isdigit() or int(_captured_user_output[1]) != len(_expected_phrase):
        _test_message = f"انتظار طول صحیح ({len(_expected_phrase)}) در خط دوم بود، یافت شده: '{_captured_user_output[1]}'"
    else:
        _test_status = "TEST_PASSED"
        _test_message = "تبریک! کد شما درست است!"
        
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "برنامه نویسی\n12",
                hint: "برای چسباندن کلمات و فاصله به هم از:\n__BLOCK_CODE_START__word1 + \" \" + word2__BLOCK_CODE_END__\nاستفاده کن. برای شمردن طول، از:\n__BLOCK_CODE_START__len(جمله_کامل)__BLOCK_CODE_END__\nاستفاده کن. 🌟"
            },
            {
                type: "lesson",
                title: "لیست‌ها: سبد خرید جادویی",
                content: "به دنیای لیست‌ها خوش اومدی! لیست‌ها مثل یه سبد خرید بزرگ می‌مونن که می‌تونی کلی چیزای مختلف رو توش بذاری، مثلاً اسم دوستات، عددها، یا حتی لیست‌های دیگه! برای ساختن یه لیست، فقط کافیه آیتم‌هات رو بین کروشه __INLINE_CODE_START__[ ]__INLINE_CODE_END__ بذاری و با کاما جدا کنی. مثلاً:\n__BLOCK_CODE_START__my_fruits = ['سیب', 'موز', 'پرتقال']__BLOCK_CODE_END__\n\nحالا چطور به آیتم‌ها دسترسی پیدا کنیم؟ لیست‌ها شماره دارن، از 0 شروع می‌شن! یعنی اولین آیتم، شماره‌اش 0 هست. پس برای دیدن 'سیب'، می‌نویسیم __INLINE_CODE_START__my_fruits[0]__INLINE_CODE_END__. می‌خوای چیزی به سبدت اضافه کنی؟ با __INLINE_CODE_START__append()__INLINE_CODE_END__ این کار راحت انجام میشه! مثلاً:\n__BLOCK_CODE_START__my_fruits.append('انگور')__BLOCK_CODE_END__",
                initialCode: "my_fruits = ['سیب', 'موز', 'پرتقال']\nprint(my_fruits[0])\nmy_fruits.append('کیوی')\nprint(my_fruits)",
                hint: "یادت باشه که لیست‌ها از صفر شماره‌گذاری میشن! __INLINE_CODE_START__my_list[0]__INLINE_CODE_END__ اولین عنصر رو میده. با __INLINE_CODE_START__append()__INLINE_CODE_END__ هم می‌تونی آیتم اضافه کنی."
            },
            {
                type: "quiz",
                title: "آزمون: لیست‌ها",
                description: "دانشت رو درباره لیست‌ها محک بزن!",
                questions: [
                    {
                        question: "اگر یه لیست داشته باشیم __INLINE_CODE_START__numbers = [10, 20, 30]__INLINE_CODE_END__، مقدار __INLINE_CODE_START__numbers[1]__INLINE_CODE_END__ چی میشه؟",
                        options: ["10", "20", "30"],
                        correctAnswerIndex: 1
                    }
                ],
                hint: "این یک سوال درباره ایندکس (شماره) عناصر لیست است. پایتون از 0 شروع می‌کند."
            },
            {
                type: "practical",
                title: "تمرین: سبد خرید جادویی!",
                description: "توی ویرایشگر کد، یه لیست به اسم __INLINE_CODE_START__my_shopping_list__INLINE_CODE_END__ بساز و ۳ تا از چیزایی که دوست داری بخری رو توش بذار. بعد یه چیز جدید با __INLINE_CODE_START__append()__INLINE_CODE_END__ بهش اضافه کن. در نهایت، کل لیست رو پرینت کن و بعدش آیتم دوم لیستت (یادت نره شماره‌اش چنده!) رو هم پرینت کن.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    _shopping_list = _user_scope.get('my_shopping_list')
    
    if not isinstance(_shopping_list, list):
        _test_message = "متغیر 'my_shopping_list' به درستی به عنوان یک لیست تعریف نشده است."
    elif len(_shopping_list) < 4: # Initial 3 + 1 appended
        _test_message = "به نظر می‌رسد لیست به اندازه کافی آیتم ندارد (حداقل 4 آیتم)."
    elif len(_captured_user_output) < 2:
        _test_message = "حداقل دو خط خروجی مورد انتظار است (یک لیست کامل، یک آیتم)."
    elif _captured_user_output[0] != str(_shopping_list):
        _test_message = "لیست کامل در خط اول چاپ نشده است."
    elif _captured_user_output[1] != str(_shopping_list[1]):
        _test_message = "آیتم دوم لیست به درستی در خط دوم چاپ نشده است."
    else:
        _test_status = "TEST_PASSED"
        _test_message = "تبریک! کد شما درست است!"
        
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "['نان', 'شیر', 'پنیر', 'کره']\nشیر",
                hint: "برای ساخت لیست از کروشه __INLINE_CODE_START__[]__INLINE_CODE_END__ استفاده کن. برای دسترسی به آیتم دوم، از ایندکس 1 استفاده کن:\n__BLOCK_CODE_START__my_list[1]__BLOCK_CODE_END__"
            },
            {
                type: "lesson",
                title: "تاپل‌ها و دیکشنری‌ها: جفت‌های محرمانه و کمد مرتب",
                content: "بیا دوتا ساختار داده باحال دیگه رو بشناسیم:\n\n1.  __INLINE_CODE_START__تاپل‌ها (Tuples - tuple)__INLINE_CODE_END__: اینا هم مثل لیست‌ها هستن، اما یه فرق بزرگ دارن: وقتی یه تاپل رو ساختی، دیگه نمی‌تونی تغییرش بدی! برای ساختن تاپل از پرانتز __INLINE_CODE_START__()__INLINE_CODE_END__ استفاده می‌کنیم. مثلاً:\n__BLOCK_CODE_START__coordinates = (10, 20)__BLOCK_CODE_END__\n\n2.  __INLINE_CODE_START__دیکشنری‌ها (Dictionaries - dict)__INLINE_CODE_END__: اینا مثل یه کمد با کلی کشوی برچسب‌دار می‌مونن. هر کشو یه 'کلید' (Key) داره و توش یه 'مقدار' (Value) هست. به جای شماره (مثل لیست)، با کلیدها به مقدارها دسترسی پیدا می‌کنی. برای ساختن دیکشنری از آکولاد __INLINE_CODE_START___{}__INLINE_CODE_END__ استفاده می‌کنیم. مثلاً:\n__BLOCK_CODE_START__person = {'name': 'سارا', 'age': 16}__BLOCK_CODE_END__",
                initialCode: "my_tuple = (1, 'hello', 3.14)\nmy_dict = {'name': 'کوروش', 'age': 17}\n\nprint(my_tuple[1])\nprint(my_dict['name'])",
                hint: "تاپل‌ها ثابتن (Immutable) یعنی عوض نمیشن، ولی دیکشنری‌ها برای ذخیره اطلاعات به صورت کلید-مقدار عالی هستن. مقدار داخل دیکشنری رو با این روش پیدا کن:\n__BLOCK_CODE_START__my_dict['کلید']__BLOCK_CODE_END__"
            },
            {
                type: "quiz",
                title: "آزمون: تاپل‌ها و دیکشنری‌ها",
                description: "دانشت رو درباره تاپل‌ها و دیکشنری‌ها بسنج!",
                questions: [
                    {
                        question: "فرق اصلی لیست و تاپل چیه؟",
                        options: [
                            "لیست‌ها با __INLINE_CODE_START__()__INLINE_CODE_END__ و تاپل‌ها با __INLINE_CODE_START__[]__INLINE_CODE_END__ ساخته میشن.",
                            "لیست‌ها قابل تغییرن ولی تاپل‌ها نه.",
                            "لیست‌ها فقط عدد دارن ولی تاپل‌ها هرچیزی."
                        ],
                        correctAnswerIndex: 1
                    }
                ],
                hint: "به کلمه 'تغییرناپذیری' فکر کن."
            },
            {
                type: "practical",
                title: "تمرین: پروفایل دوستانه!",
                description: "یه دیکشنری به اسم __INLINE_CODE_START__friend_profile__INLINE_CODE_END__ بساز. کلیدهای اون 'نام'، 'سن' و 'شهر' باشن و مقادیرشون رو خودت انتخاب کن. بعد، نام دوستت رو از دیکشنری پرینت کن. خروجی باید فقط نام دوستت باشد.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    _friend_profile = _user_scope.get('friend_profile')

    if not isinstance(_friend_profile, dict):
        _test_message = "متغیر 'friend_profile' به درستی به عنوان یک دیکشنری تعریف نشده است."
    elif not all(k in _friend_profile for k in ['نام', 'سن', 'شهر']):
        _test_message = "دیکشنری باید شامل کلیدهای 'نام', 'سن' و 'شهر' باشد."
    elif len(_captured_user_output) == 0:
        _test_message = "هیچ خروجی ای یافت نشد."
    elif _captured_user_output[0] != _friend_profile.get('نام', 'NOT_FOUND'):
        _test_message = "نام دوستت به درستی چاپ نشده است."
    else:
        _test_status = "TEST_PASSED"
        _test_message = "تبریک! کد شما درست است!"
        
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "سارا",
                hint: "برای ساخت دیکشنری از آکولاد __INLINE_CODE_START___{}__INLINE_CODE_END__ استفاده کن و برای دسترسی به نام از:\n__BLOCK_CODE_START__friend_profile['نام']__BLOCK_CODE_END__\nاستفاده کن."
            }
        ]
    },
    {
        title: "۳. کنترل جریان: مسیرهای برنامه‌نویسی",
        items: [
            {
                type: "lesson",
                title: "شرط‌ها: اگر این بود، اون کار رو بکن!",
                content: "تصور کن داری یه بازی می‌سازی. اگه بازیکن سکه جمع کرد، امتیاز بگیره. اگه جونش کم بود، یه معجون بهش بده. این 'اگر' و 'اگه نه'ها همون شرط‌ها هستن! تو پایتون با __INLINE_CODE_START__if__INLINE_CODE_END__، __INLINE_CODE_START__elif__INLINE_CODE_END__ (یعنی 'اگه نه، اگه این بود') و __INLINE_CODE_START__else__INLINE_CODE_END__ (یعنی 'اگه هیچ‌کدوم از بالا نبود') کار می‌کنیم. 💪\n\nبرای مقایسه چیزها هم از اینا استفاده می‌کنیم: __INLINE_CODE_START__==__INLINE_CODE_END__ (برابری)، __INLINE_CODE_START__!=__INLINE_CODE_END__ (نابرابری)، __INLINE_CODE_START__<__INLINE_CODE_END__ (کوچکتر)، __INLINE_CODE_START__>__INLINE_CODE_END__ (بزرگتر)، __INLINE_CODE_START__<=__INLINE_CODE_END__ (کوچکتر یا مساوی)، __INLINE_CODE_START__>=__INLINE_CODE_END__ (بزرگتر یا مساوی). یادت باشه بعد از شرط حتماً دو نقطه __INLINE_CODE_START__:**__INLINE_CODE_END__ و بعدش یه تو رفتگی (indentation) بذاری! 🧐",
                initialCode: "score = 80\n\nif score >= 70:\n    print(\"قبول شدی!\")\nelse:\n    print(\"متاسفم، باید بیشتر تلاش کنی.\")",
                hint: "شرط‌ها به برنامه‌ات اجازه میدن تصمیم بگیره! یادت نره بعد از __INLINE_CODE_START__if__INLINE_CODE_END__، __INLINE_CODE_START__elif__INLINE_CODE_END__ و __INLINE_CODE_START__else__INLINE_CODE_END__ علامت دو نقطه __INLINE_CODE_START__:**__INLINE_CODE_END__ رو بذاری و خط بعدی رو تو رفتگی بدی. 💡"
            },
            {
                type: "quiz",
                title: "آزمون: شرط‌ها",
                description: "دانشت رو درباره شرط‌ها بسنج!",
                questions: [
                    {
                        question: "اگر __INLINE_CODE_START__temperature = 25__INLINE_CODE_END__ باشه، کد زیر چی پرینت می‌کنه؟\n__BLOCK_CODE_START__if temperature > 30:\n    print(\"خیلی گرمه\")\nelif temperature > 20:\n    print(\"هوا خوبه\")\nelse:\n    print(\"سرده\")__BLOCK_CODE_END__",
                        options: ["خیلی گرمه", "هوا خوبه", "سرده"],
                        correctAnswerIndex: 1
                    }
                ],
                hint: "به ترتیب شرط‌ها و محدوده‌های آن‌ها دقت کن."
            },
            {
                type: "practical",
                title: "تمرین: وضعیت هوا!",
                description: "یک متغیر __INLINE_CODE_START__weather = \"بارانی\"__INLINE_CODE_END__ بساز. با استفاده از __INLINE_CODE_START__if/elif/else__INLINE_CODE_END__، اگر هوا 'آفتابی' بود بگو 'بریم بیرون!'، اگر 'بارانی' بود بگو 'چتر بردار!' و در غیر این صورت بگو 'نمیدونم هوا چطوره!'. کد رو جوری تغییر بده تا برای هوای 'بارانی' پیام درست رو نشون بده. خروجی باید 'چتر بردار!' باشد.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    _weather_var = _user_scope.get('weather')
    _expected_output = "چتر بردار!"

    if _weather_var != "بارانی":
        _test_message = "متغیر 'weather' با مقدار 'بارانی' تعریف نشده است یا تغییر کرده است."
    elif len(_captured_user_output) == 0:
        _test_message = "هیچ خروجی ای یافت نشد."
    elif _captured_user_output[0] != _expected_output:
        _test_message = f"انتظار '{_expected_output}' بود، یافت شده: '{_captured_user_output[0]}'"
    else:
        _test_status = "TEST_PASSED"
        _test_message = "تبریک! کد شما درست است!"
        
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "چتر بردار!",
                hint: "از ساختار __INLINE_CODE_START__if ... elif ... else__INLINE_CODE_END__ استفاده کن. شرط مناسب این است:\n__BLOCK_CODE_START__weather == \"بارانی\"__BLOCK_CODE_END__"
            },
            {
                type: "lesson",
                title: "حلقه‌ی For: تکرار با حال!",
                content: "بعضی وقتا لازمه یه کار رو بارها و بارها انجام بدیم. مثلاً اسم هر کدوم از دوستات رو پرینت کنی، یا از 1 تا 10 بشمری. اینجا حلقه‌ها میان کمکت! حلقه‌ی __INLINE_CODE_START__for__INLINE_CODE_END__ مثل یه ربات منظمه که یه لیست از کارها رو یکی‌یکی انجام میده. می‌تونی روی یه لیست، یه رشته، یا حتی یه محدوده‌ی عددی (با تابع __INLINE_CODE_START__range()__INLINE_CODE_END__) حلقه بزنی. تابع __INLINE_CODE_START__range(5)__INLINE_CODE_END__ یعنی از 0 تا 4 بشمار (یعنی 5 بار)!",
                initialCode: "fruits = ['سیب', 'موز', 'پرتقال']\n\nfor fruit in fruits:\n    print(f'من عاشق {fruit} هستم!')\n\nfor i in range(3):\n    print(f'شمارنده: {i}')",
                hint: "__INLINE_CODE_START__for__INLINE_CODE_END__ یه راه عالی برای تکرار یه کار برای هر آیتم توی یه لیسته. __INLINE_CODE_START__range(x)__INLINE_CODE_END__ از صفر تا __INLINE_CODE_START__x-1__INLINE_CODE_END__ میشماره. 😜"
            },
            {
                type: "quiz",
                title: "آزمون: حلقه‌ی For",
                description: "دانشت رو درباره حلقه‌ی __INLINE_CODE_START__for__INLINE_CODE_END__ بسنج!",
                questions: [
                    {
                        question: "کد زیر چند بار 'سلام' رو پرینت می‌کنه؟\n__BLOCK_CODE_START__for i in range(4):\n    print(\"سلام\")__BLOCK_CODE_END__",
                        options: ["3 بار", "4 بار", "5 بار"],
                        correctAnswerIndex: 1
                    }
                ],
                hint: "تابع __INLINE_CODE_START__range(n)__INLINE_CODE_END__ از 0 تا __INLINE_CODE_START__n-1__INLINE_CODE_END__ می‌شمارد."
            },
            {
                type: "practical",
                title: "تمرین: شمارش و لیست‌ها!",
                description: "1. با یک حلقه‌ی __INLINE_CODE_START__for__INLINE_CODE_END__ و تابع __INLINE_CODE_START__range()__INLINE_CODE_END__, اعداد از 1 تا 3 رو پرینت کن.\n2. یک لیست از میوه‌های مورد علاقه‌ات بساز. با یه حلقه‌ی __INLINE_CODE_START__for__INLINE_CODE_END__، اسم هر میوه رو یکی‌یکی پرینت کن. \nخروجی شما باید شامل اعداد 1، 2، 3 و سپس اسامی میوه‌ها در خطوط جداگانه باشد.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, {}) # Execute in a clean scope
    
    _expected_numbers = ['1', '2', '3']
    if len(_captured_user_output) < 3:
        _test_message = "حداقل سه خط خروجی برای شمارش مورد انتظار است."
    else:
        _numbers_output = _captured_user_output[:3]
        _numbers_correct = True
        for i in range(3):
            if _numbers_output[i] != _expected_numbers[i]:
                _numbers_correct = False
                _test_message = f"انتظار '{_expected_numbers[i]}' بود در خط {i+1} (شمارش), یافت شده: '{_numbers_output[i]}'"
                break
        
        if _numbers_correct:
            if len(_captured_user_output) < 6: # At least 3 numbers + at least 3 fruits.
                _test_message = "خروجی کافی برای میوه‌ها یافت نشد (حداقل 3 میوه)."
            else:
                _fruits_output = _captured_user_output[3:]
                # Check for at least three non-digit strings, implies fruits.
                _non_digit_strings = [o for o in _fruits_output if not o.isdigit()]
                if len(_non_digit_strings) < 3:
                    _test_message = "به نظر نمی‌رسد لیست میوه‌ها به درستی چاپ شده باشد (حداقل 3 کلمه غیر عددی)."
                else:
                    _test_status = "TEST_PASSED"
                    _test_message = "تبریک! کد شما درست است!"
            
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "1\n2\n3\nسیب\nموز\nپرتقال",
                hint: "برای شمارش از:\n__BLOCK_CODE_START__for i in range(1, 4): print(i)__BLOCK_CODE_END__\nاستفاده کن. برای میوه‌ها، ابتدا لیست بساز و سپس با:\n__BLOCK_CODE_START__for fruit in my_fruits: print(fruit)__BLOCK_CODE_END__\nآن را چاپ کن."
            },
            {
                type: "lesson",
                title: "حلقه‌ی While: تا وقتی که...",
                content: "حلقه‌ی __INLINE_CODE_START__while__INLINE_CODE_END__ هم مثل __INLINE_CODE_START__for__INLINE_CODE_END__ برای تکراره، اما یه فرق بزرگ داره! __INLINE_CODE_START__while__INLINE_CODE_END__ تا وقتی که یه شرط خاص درست باشه، به کارش ادامه میده. مثل اینکه بگی 'تا وقتی که گرسنه‌ای، غذا بخور!'. 🍔\n\nخیلی مواظب باش! اگه شرط حلقه __INLINE_CODE_START__while__INLINE_CODE_END__ هیچ‌وقت غلط نشه، برنامه‌ات تا ابد تکرار میشه و بهش میگن 'حلقه‌ی بی‌نهایت' (Infinite Loop)! همیشه مطمئن شو که یه راهی برای تموم شدن حلقه وجود داره (مثلاً با تغییر دادن یه متغیر). 🚦",
                initialCode: "count = 0\nwhile count < 5:\n    print(f'شمارش: {count}')\n    count += 1 # یعنی count = count + 1\nprint('پایان شمارش!')",
                hint: "__INLINE_CODE_START__while__INLINE_CODE_END__ عالیه برای وقتی که نمیدونی چند بار باید یه کار رو تکرار کنی، فقط میدونی 'تا کی' باید تکرار بشه. حتماً مطمئن شو که شرط حلقه بالاخره غلط میشه! 😅"
            },
            {
                type: "quiz",
                title: "آزمون: حلقه‌ی While",
                description: "دانشت رو درباره حلقه‌ی __INLINE_CODE_START__while__INLINE_CODE_END__ بسنج!",
                questions: [
                    {
                        question: "کد زیر چه عددی رو پرینت می‌کنه و حلقه چند بار اجرا میشه؟\n__BLOCK_CODE_START__x = 0\nwhile x < 2:\n    print(x)\n    x = x + 1__BLOCK_CODE_END__",
                        options: ["0، 1 و 2 بار اجرا", "0، 1 و 3 بار اجرا", "0، 1 و 2 بار اجرا (گزینه تکراری برای تاکید)"],
                        correctAnswerIndex: 2
                    }
                ],
                hint: "شرط __INLINE_CODE_START__x < 2__INLINE_CODE_END__ را در هر مرحله بررسی کن."
            },
            {
                type: "practical",
                title: "تمرین: شمارش معکوس موشکی!",
                description: "یک متغیر به اسم __INLINE_CODE_START__countdown = 5__INLINE_CODE_END__ بساز. با یه حلقه‌ی __INLINE_CODE_START__while__INLINE_CODE_END__، از 5 تا 1 رو پرینت کن و بعد از هر پرینت، __INLINE_CODE_START__countdown__INLINE_CODE_END__ رو یکی کم کن. وقتی به 0 رسید، پرینت کن 'پرتاب شد!'. خروجی باید شامل 5، 4، 3، 2، 1 و سپس 'پرتاب شد!' باشد.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, {}) # Execute in a clean scope
    
    _expected_sequence = ['5', '4', '3', '2', '1', 'پرتاب شد!']
    if len(_captured_user_output) != len(_expected_sequence):
        _test_message = f"تعداد خطوط خروجی صحیح نیست. انتظار {len(_expected_sequence)} خط بود، یافت شده: {len(_captured_user_output)}"
    else:
        for i in range(len(_expected_sequence)):
            if _captured_user_output[i] != _expected_sequence[i]:
                _test_message = f"انتظار '{_expected_sequence[i]}' در خط {i+1} بود، یافت شده: '{_captured_user_output[i]}'"
                break
        else: # If loop completed without break
            _test_status = "TEST_PASSED"
            _test_message = "تبریک! کد شما درست است!"
            
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "5\n4\n3\n2\n1\nپرتاب شد!",
                hint: "شرط حلقه __INLINE_CODE_START__while countdown > 0:__INLINE_CODE_END__ خواهد بود. داخل حلقه، از:\n__BLOCK_CODE_START__print(countdown)__BLOCK_CODE_END__\nو سپس از:\n__BLOCK_CODE_START__countdown -= 1__BLOCK_CODE_END__\nرا قرار بده."
            }
        ]
    },
    {
        title: "۴. توابع: قهرمانان کد",
        items: [
            {
                type: "lesson",
                title: "ساخت اولین تابع: دستورالعمل‌های خودت!",
                content: "تصور کن داری یه دستور پخت جدید یاد میگیری. به جای اینکه هر بار همه مراحل رو از اول بنویسی، می‌تونی اسم دستور پخت رو بگی و بقیه کارها رو انجام بدی. توابع هم دقیقاً همین کار رو تو برنامه‌نویسی انجام میدن! یک تابع، یه قسمت از کده که یه کار خاص رو انجام میده. با کلمه‌ی کلیدی __INLINE_CODE_START__def__INLINE_CODE_END__ یک تابع رو 'تعریف' (Define) می‌کنیم و هر وقت بخوایم ازش استفاده کنیم، 'صداش می‌زنیم' (Call). این کار باعث میشه کدهات تمیزتر و قابل استفاده‌تر بشن.",
                initialCode: "def greet():\n    print(\"سلام به همه!\")\n\ngreet() # اینجا تابع رو صدا میزنیم",
                hint: "یک تابع رو با __INLINE_CODE_START__def__INLINE_CODE_END__ تعریف کن، یه اسم براش بذار، پرانتز __INLINE_CODE_START__()__INLINE_CODE_END__ و دو نقطه __INLINE_CODE_START__:**__INLINE_CODE_END__ رو یادت نره. برای اینکه کار کنه، حتماً باید صداش بزنی! 🗣️"
            },
            {
                type: "quiz",
                title: "آزمون: ساخت اولین تابع",
                description: "دانشت رو درباره ساخت تابع بسنج!",
                questions: [
                    {
                        question: "کد زیر چی پرینت می‌کنه؟\n__BLOCK_CODE_START__def say_hello():\n    print(\"سلام!\")\nsay_hello()\nsay_hello()__BLOCK_CODE_END__",
                        options: ["سلام!", "سلام!\nسلام!", "ارور"],
                        correctAnswerIndex: 1
                    }
                ],
                hint: "تابع را هر چند بار که صدا بزنی، همان تعداد بار اجرا می‌شود."
            },
            {
                type: "practical",
                title: "تمرین: تابع خوش‌آمدگویی!",
                description: "یک تابع به اسم __INLINE_CODE_START__welcome_message()__INLINE_CODE_END__ بساز که وقتی صداش می‌زنی، پیغام 'به برنامه من خوش اومدی!' رو پرینت کنه. بعد، این تابع رو دو بار صدا بزن. خروجی باید شامل دو بار چاپ 'به برنامه من خوش اومدی!' باشد.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    _expected_message = "به برنامه من خوش اومدی!"
    _welcome_message_func = _user_scope.get('welcome_message')

    if not callable(_welcome_message_func):
        _test_message = "تابع 'welcome_message' تعریف نشده است یا قابل فراخوانی نیست."
    elif len(_captured_user_output) != 2:
        _test_message = f"انتظار 2 خط خروجی بود، یافت شده: {len(_captured_user_output)}"
    elif _captured_user_output[0] != _expected_message or _captured_user_output[1] != _expected_message:
        _test_message = f"انتظار '{_expected_message}' در هر دو خط خروجی بود. مطمئن شو که تابع را دو بار صدا زده‌ای."
    else:
        _test_status = "TEST_PASSED"
        _test_message = "تبریک! کد شما درست است!"
        
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "به برنامه من خوش اومدی!\nبه برنامه من خوش اومدی!",
                hint: "برای تعریف تابع از:\n__BLOCK_CODE_START__def welcome_message():__BLOCK_CODE_END__\nاستفاده کن. برای صدا زدن تابع، فقط اسمش رو بنویس:\n__BLOCK_CODE_START__welcome_message()__BLOCK_CODE_END__"
            },
            {
                type: "lesson",
                title: "ورودی و خروجی توابع: حرف بزن، جواب بگیر!",
                content: "توابع می‌تونن با دنیا ارتباط برقرار کنن! یعنی چی؟ می‌تونن یه چیزی به عنوان 'ورودی' (Input یا Argument) بگیرن و بعد از انجام کارشون، یه 'خروجی' (Output یا Return Value) به ما بدن. ورودی‌ها رو داخل پرانتز __INLINE_CODE_START__()__INLINE_CODE_END__ تعریف می‌کنیم. مثلاً:\n__BLOCK_CODE_START__def add(a, b):__BLOCK_CODE_END__\nبا کلمه‌ی کلیدی __INLINE_CODE_START__return__INLINE_CODE_END__ هم می‌تونیم چیزی رو به عنوان خروجی تابع برگردونیم. این خروجی رو می‌تونی توی یه متغیر ذخیره کنی یا مستقیماً پرینت کنی.",
                initialCode: "def add_numbers(num1, num2):\n    sum = num1 + num2\n    return sum\n\nmy_sum = add_numbers(5, 3)\nprint(f'مجموع: {my_sum}')",
                hint: "ورودی‌ها رو توی پرانتز به تابع میدیم، و با __INLINE_CODE_START__return__INLINE_CODE_END__ هم از تابع خروجی میگیریم. __INLINE_CODE_START__return__INLINE_CODE_END__ خیلی مهمه چون باعث میشه بتونی از نتیجه تابع در جای دیگه‌ی برنامه‌ات استفاده کنی! 🏆"
            },
            {
                type: "quiz",
                title: "آزمون: ورودی و خروجی توابع",
                description: "دانشت رو درباره ورودی و خروجی توابع بسنج!",
                questions: [
                    {
                        question: "کد زیر چی پرینت می‌کنه؟\n__BLOCK_CODE_START__def multiply(num1, num2):\n    return num1 * num2\n\nresult = multiply(3, 4)\nprint(result)__BLOCK_CODE_END__",
                        options: ["34", "7", "12"],
                        correctAnswerIndex: 2
                    }
                ],
                hint: "تابع __INLINE_CODE_START__multiply__INLINE_CODE_END__ دو عدد را در هم ضرب می‌کند و نتیجه را برمی‌گرداند. سپس این نتیجه چاپ می‌شود."
            },
            {
                type: "practical",
                title: "تمرین: تابع محاسبه سن!",
                description: "یک تابع به اسم __INLINE_CODE_START__calculate_age(birth_year, current_year)__INLINE_CODE_END__ بساز. این تابع باید سن رو با تفریق __INLINE_CODE_START__birth_year__INLINE_CODE_END__ از __INLINE_CODE_START__current_year__INLINE_CODE_END__ حساب کنه و اون رو __INLINE_CODE_START__return__INLINE_CODE_END__ کنه. بعد، تابع رو با سال تولد و سال جاری خودت صدا بزن و نتیجه رو پرینت کن. خروجی باید فقط سن شما باشد.",
                initialCode: '',
                testCode: `
import builtins

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs)

builtins.print = _mock_user_print

_test_status = "TEST_FAILED"
_test_message = ""
_user_scope = {}

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    exec(_user_code_to_run, _user_scope)
    
    _calculate_age_func = _user_scope.get('calculate_age')

    if not callable(_calculate_age_func):
        _test_message = "تابع 'calculate_age' تعریف نشده است."
    else:
        _age_test = None
        try:
            _age_test = _calculate_age_func(2000, 2024)
            if _age_test != 24:
                _test_message = f"تابع 'calculate_age' برای ورودی‌های 2000 و 2024، مقدار {_age_test} را برگرداند در حالی که 24 مورد انتظار بود."
            elif not _captured_user_output:
                _test_message = "هیچ خروجی ای یافت نشد."
            elif str(_age_test) not in _captured_user_output[0]:
                _test_message = "خروجی چاپ شده با سن محاسبه شده مطابقت ندارد."
            else:
                _test_status = "TEST_PASSED"
                _test_message = "تبریک! کد شما درست است!"
        except Exception as e:
            _test_message = f"تابع شما با خطا مواجه شد: {e}"
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
                `,
                expectedOutputExample: "17", // Example for a 17-year old
                hint: "داخل تابع از:\n__BLOCK_CODE_START__return current_year - birth_year__BLOCK_CODE_END__\nاستفاده کن. برای صدا زدن تابع، دو عدد به عنوان ورودی بهش بده:\n__BLOCK_CODE_START__calculate_age(سال_تولد, سال_جاری)__BLOCK_CODE_END__"
            }
        ]
    },
    {
        title: "۵. ورودی از کاربر: برنامه دوست داشتنی تو!",
        items: [
            {
                type: "lesson",
                title: "با input() صحبت کن!",
                content: "تا الان برنامه‌هامون فقط یه طرفه حرف می‌زدن، یعنی فقط به ما اطلاعات نشون می‌دادن. حالا وقتشه که برنامه‌ات رو 'تعاملی' (Interactive) کنیم! با تابع __INLINE_CODE_START__input()__INLINE_CODE_END__ می‌تونی از کاربر اطلاعات بگیری و برنامه‌ات رو جذاب‌تر کنی. وقتی __INLINE_CODE_START__input()__INLINE_CODE_END__ رو صدا می‌زنی، برنامه متوقف میشه و منتظر میمونه تا کاربر چیزی رو تایپ کنه و دکمه Enter رو بزنه. چیزی که کاربر وارد می‌کنه، همیشه به صورت 'رشته' (String) دریافت میشه، حتی اگه عدد باشه! پس اگه خواستی با عددها کار کنی، یادت نره با __INLINE_CODE_START__int()__INLINE_CODE_END__ یا __INLINE_CODE_START__float()__INLINE_CODE_END__ تبدیلشون کنی. 🔄",
                initialCode: "name = input(\"لطفاً اسمت رو وارد کن: \")\nprint(f'سلام، {name}!')\n\n# برای کار با عددها:\nnum_str = input(\"یک عدد وارد کن: \")\nnum = int(num_str)\nprint(f'دو برابر عددت میشه: {num * 2}')",
                hint: "تابع __INLINE_CODE_START__input()__INLINE_CODE_END__ همیشه متن (رشته) بهت میده. اگه می‌خوای باهاش حساب و کتاب کنی، باید تبدیلش کنی به عدد! __INLINE_CODE_START__int()__INLINE_CODE_END__ برای عدد صحیح و __INLINE_CODE_START__float()__INLINE_CODE_END__ برای اعشاری. 🤓"
            },
            {
                type: "quiz",
                title: "آزمون: تابع input()",
                description: "دانشت رو درباره تابع __INLINE_CODE_START__input()__INLINE_CODE_END__ بسنج!",
                questions: [
                    {
                        question: "اگر کاربر عدد 10 را وارد کند، نوع متغیر __INLINE_CODE_START__data__INLINE_CODE_END__ در کد زیر چیست؟\n__BLOCK_CODE_START__data = input(\"یک عدد وارد کنید: \")__BLOCK_CODE_END__",
                        options: ["int", "str", "float"],
                        correctAnswerIndex: 1
                    }
                ],
                hint: "__INLINE_CODE_START__input()__INLINE_CODE_END__ همیشه، بدون استثنا، رشته برمی‌گرداند."
            },
            {
                type: "practical",
                title: "تمرین: ماشین حساب سلام و احوال پرسی!",
                description: "1. از کاربر بخواه که اسمش رو وارد کنه و بعد یک پیام خوش‌آمدگویی شخصی‌سازی شده پرینت کن. مثلاً: 'سلام، [اسم]! خوش اومدی!'\n2. از کاربر بخواه که دو عدد وارد کنه. هر دو عدد رو به نوع عددی مناسب تبدیل کن (یادت نره __INLINE_CODE_START__input()__INLINE_CODE_END__ رشته برمی‌گردونه!)، بعد جمع اون دو عدد رو حساب کن و پرینت کن. \nبرای تست این تمرین، باید در کنسول، نام 'علی' را برای سوال اول و سپس '5' و '10' را برای سوال دوم وارد کنید. خروجی نهایی باید 'سلام، علی! خوش اومدی!' و سپس '15' باشد.",
                initialCode: '',
                testCode: `
import builtins
import io

_original_print = builtins.print
_original_input = builtins.input

_captured_user_output = []
def _mock_user_print(*args, **kwargs):
    _captured_user_output.append(' '.join(map(str, args)))
    _original_print(*args, **kwargs) # Also print to actual console

_mock_inputs = ['علی', '5', '10']
_input_call_count = 0

def _mock_input(prompt=''):
    global _input_call_count
    _original_print(prompt, end='') # Simulate prompt being printed to the actual console
    if _input_call_count < len(_mock_inputs):
        value = _mock_inputs[_input_call_count]
        _input_call_count += 1
        return value
    raise EOFError("No more input available for mock_input.")

builtins.print = _mock_user_print
builtins.input = _mock_input

_test_status = "TEST_FAILED"
_test_message = ""

try:
    _user_code_to_run = """
\x7buser_code_placeholder\x7d
"""
    _user_scope = {}
    exec(_user_code_to_run, _user_scope)
    
    _expected_outputs = ["سلام، علی! خوش اومدی!", "15"]
    
    # Check captured outputs which include both user prints and mock input prompts
    # This test is more robust by checking content rather than exact line counts
    output_str = "\\n".join(_captured_user_output)

    if _expected_outputs[0] not in output_str:
        _test_message = f"پیام خوش‌آمدگویی صحیح نیست. انتظار حداقل شامل '{_expected_outputs[0]}' بود."
    elif _expected_outputs[1] not in output_str:
        _test_message = f"جمع اعداد صحیح نیست. انتظار حداقل شامل '{_expected_outputs[1]}' بود."
    else:
        _test_status = "TEST_PASSED"
        _test_message = "تبریک! کد شما درست است!"
            
except Exception as e:
    _test_message = f"خطایی در اجرای کد شما رخ داد: {e}"
finally:
    builtins.print = _original_print
    builtins.input = _original_input
    _original_print(f"{_test_status}: {_test_message}")
}
                `,
                expectedOutputExample: "سلام، علی! خوش اومدی!\n15",
                hint: "برای گرفتن اسم، از:\n__BLOCK_CODE_START__name = input(\"لطفاً اسمت رو وارد کن: \")__BLOCK_CODE_END__\nاستفاده کن. برای گرفتن دو عدد، دو بار __INLINE_CODE_START__input()__INLINE_CODE_END__ بگیر و با __INLINE_CODE_START__int()__INLINE_CODE_END__ تبدیلشون کن، بعد جمع کن."
            }
        ]
    }
];
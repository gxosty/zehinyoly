"""Seed default courses into the database.

Usage: uv run python seed.py
"""

from datetime import datetime, timezone

from app.database import SessionLocal, engine, Base
from app.models import Course

Base.metadata.create_all(bind=engine)

now = datetime.now(timezone.utc)

default_courses = [
    {
        "title": {"en": "English", "ru": "Английский язык", "tk": "Iňlis dili"},
        "description": {
            "en": "Comprehensive English language course covering grammar, vocabulary, speaking, listening, reading, and writing skills for all proficiency levels.",
            "ru": "Комплексный курс английского языка, охватывающий грамматику, лексику, разговорную речь, аудирование, чтение и письмо для всех уровней подготовки.",
            "tk": "Iňlis diliniň grammatikasyny, söz baýlygyny, gürleýiş, diňleýiş, okamak we ýazmak endiklerini öz içine alýan giňişleýin kurs.",
        },
        "target_audience": {"en": "All Ages", "ru": "Все возрасты", "tk": "Ähli ýaşlar"},
        "icon_name": "Languages",
    },
    {
        "title": {"en": "Russian", "ru": "Русский язык", "tk": "Rus dili"},
        "description": {
            "en": "Learn Russian from beginner to advanced level. Focus on conversational skills, grammar, and cultural understanding.",
            "ru": "Изучайте русский язык с нуля до продвинутого уровня. Упор на разговорные навыки, грамматику и понимание культуры.",
            "tk": "Rus dilini başlangyçdan ýokary derejä çenli öwreniň. Gürleýiş endiklerine, grammatika we medeni düşünje üns berilýär.",
        },
        "target_audience": {"en": "All Ages", "ru": "Все возрасты", "tk": "Ähli ýaşlar"},
        "icon_name": "Languages",
    },
    {
        "title": {"en": "German", "ru": "Немецкий язык", "tk": "Nemes dili"},
        "description": {
            "en": "German language course designed to develop reading, writing, speaking, and listening comprehension skills.",
            "ru": "Курс немецкого языка, направленный на развитие навыков чтения, письма, разговорной речи и понимания на слух.",
            "tk": "Nemes diliniň okamak, ýazmak, gürlemek we diňleýiş düşünje endiklerini ösdürmek üçin döredilen kurs.",
        },
        "target_audience": {"en": "All Ages", "ru": "Все возрасты", "tk": "Ähli ýaşlar"},
        "icon_name": "Languages",
    },
    {
        "title": {"en": "Chinese", "ru": "Китайский язык", "tk": "Hytaý dili"},
        "description": {
            "en": "Mandarin Chinese course covering tones, characters, grammar, and practical conversation for everyday use.",
            "ru": "Курс китайского языка (мандарин), охватывающий тоны, иероглифы, грамматику и практическое общение для повседневного использования.",
            "tk": "Hytaý diliniň (mandarin) äheňlerini, nyşanlaryny, grammatikasyny we gündelik ulanmak üçin amaly söhbetdeşligi öz içine alýan kurs.",
        },
        "target_audience": {"en": "All Ages", "ru": "Все возрасты", "tk": "Ähli ýaşlar"},
        "icon_name": "Languages",
    },
    {
        "title": {"en": "Korean", "ru": "Корейский язык", "tk": "Koreý dili"},
        "description": {
            "en": "Korean language program teaching Hangul, grammar, vocabulary, and conversational skills for real-world communication.",
            "ru": "Программа корейского языка, обучающая хангылю, грамматике, лексике и разговорным навыкам для реального общения.",
            "tk": "Koreý diliniň Hangul, grammatika, söz baýlygy we hakyky gürleşmek üçin söhbetdeşlik endiklerini öwredýän programmasy.",
        },
        "target_audience": {"en": "All Ages", "ru": "Все возрасты", "tk": "Ähli ýaşlar"},
        "icon_name": "Languages",
    },
    {
        "title": {"en": "Mathematics", "ru": "Математика", "tk": "Matematika"},
        "description": {
            "en": "Structured math program from basic arithmetic to advanced topics including algebra, geometry, and trigonometry.",
            "ru": "Структурированная программа по математике от основ арифметики до продвинутых тем, включая алгебру, геометрию и тригонометрию.",
            "tk": "Arifmetikadan başlap algebra, geometriýa we trigonometriýa ýaly ösen temalara çenli matematika programmasy.",
        },
        "target_audience": {"en": "Young", "ru": "Дети", "tk": "Ýaşlar"},
        "icon_name": "Brain",
    },
    {
        "title": {"en": "Chemistry", "ru": "Химия", "tk": "Himiýa"},
        "description": {
            "en": "Explore the world of chemistry through engaging lessons on elements, compounds, reactions, and laboratory practices.",
            "ru": "Изучайте мир химии через увлекательные уроки об элементах, соединениях, реакциях и лабораторных работах.",
            "tk": "Elementler, birleşmeler, reaksiýalar we laboratoriýa işleri barada gyzykly sapaklar arkaly himiýa dünýäsini açyň.",
        },
        "target_audience": {"en": "Young", "ru": "Дети", "tk": "Ýaşlar"},
        "icon_name": "FlaskConical",
    },
    {
        "title": {"en": "Biology", "ru": "Биология", "tk": "Biologiýa"},
        "description": {
            "en": "Study living organisms, cell biology, genetics, ecology, and human anatomy in an interactive learning environment.",
            "ru": "Изучайте живые организмы, клеточную биологию, генетику, экологию и анатомию человека в интерактивной среде.",
            "tk": "Janly organizmleri, öýjük biologiýasyny, genetikany, ekologiýany we adam anatomiýasyny interaktiw okuw gurşawynda öwreniň.",
        },
        "target_audience": {"en": "Young", "ru": "Дети", "tk": "Ýaşlar"},
        "icon_name": "Leaf",
    },
    {
        "title": {"en": "Mental Arithmetic", "ru": "Ментальная арифметика", "tk": "Akyl arifmetikasy"},
        "description": {
            "en": "Develop lightning-fast calculation skills using abacus-based mental math techniques. Improves concentration and memory.",
            "ru": "Развивайте молниеносные навыки счёта с помощью абакуса и ментальной математики. Улучшает концентрацию и память.",
            "tk": "Abakus esasly akyl matematika usullary bilen çalt hasaplamak endiklerini ösdüriň. Ünsüňizi we ýadyňyzy gowulandyryň.",
        },
        "target_audience": {"en": "Young", "ru": "Дети", "tk": "Ýaşlar"},
        "icon_name": "Brain",
    },
]

db = SessionLocal()
try:
    existing = db.query(Course).count()
    if existing > 0:
        print(f"Database already has {existing} courses. Skipping seed.")
    else:
        for i, data in enumerate(default_courses):
            data["created_at"] = now.replace(minute=now.minute - (len(default_courses) - i))
            db.add(Course(**data))
        db.commit()
        print(f"Seeded {len(default_courses)} courses successfully.")
finally:
    db.close()

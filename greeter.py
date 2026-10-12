def ask_required_name_part(prompt: str) -> str:
    while True:
        value = input(prompt).strip()
        if value:
            return value
        print("Поле не может быть пустым.")


def main() -> None:
    # ФИО
    a: str = ask_required_name_part("Введите вашу фамилию: ")
    b: str = ask_required_name_part("Введите ваше имя: ")
    c: str = ask_required_name_part("Введите ваше отчество: ")

    # Вывод приветствия
    print(f"\nЗдравствуйте, {a} {b} {c}!")

    # Информация о среде разработки
    print("\n--- Информация о среде разработки ---")
    print("ОС: Windows 11")
    print("Инструменты: Используются рекомендованные Miniconda и VSCode.")


main()

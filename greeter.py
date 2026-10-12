import platform


def ask_required_name_part(prompt: str) -> str:
    while True:
        value = input(prompt).strip()
        if value:
            return value
        print("Поле не может быть пустым.")


def build_greeting(last_name: str, first_name: str, patronymic: str = "") -> str:
    full_name = " ".join(part for part in (last_name, first_name, patronymic) if part)
    return f"Здравствуйте, {full_name}!"


def show_environment_info() -> None:
    print("\n--- Информация о среде разработки ---")
    print(f"ОС: {platform.system()}")
    print(f"Версия Python: {platform.python_version()}")
    print("Инструменты: Используются рекомендованные Miniconda и VSCode.")


def main() -> None:
    # ФИО
    a: str = ask_required_name_part("Введите вашу фамилию: ")
    b: str = ask_required_name_part("Введите ваше имя: ")
    c: str = input("Введите ваше отчество (если есть): ").strip()

    # Вывод приветствия
    print(f"\n{build_greeting(a, b, c)}")

    show_environment_info()


main()

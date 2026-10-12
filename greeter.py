import platform


def ask_required_name_part(prompt: str) -> str:
    while True:
        value = input(prompt).strip()
        if value:
            return value
        print("Поле не может быть пустым.")


def build_greeting(last_name: str, first_name: str, patronymic: str) -> str:
    return f"Здравствуйте, {last_name} {first_name} {patronymic}!"


def show_environment_info() -> None:
    print("\n--- Информация о среде разработки ---")
    print(f"ОС: {platform.system()}")
    print("Инструменты: Используются рекомендованные Miniconda и VSCode.")


def main() -> None:
    # ФИО
    a: str = ask_required_name_part("Введите вашу фамилию: ")
    b: str = ask_required_name_part("Введите ваше имя: ")
    c: str = ask_required_name_part("Введите ваше отчество: ")

    # Вывод приветствия
    print(f"\n{build_greeting(a, b, c)}")

    show_environment_info()


main()

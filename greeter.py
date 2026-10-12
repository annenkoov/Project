import platform


def ask_required_name_part(prompt: str) -> str:
    """Запрашивает непустую часть имени."""
    while True:
        value = input(prompt).strip()
        if value:
            return value
        print("Поле не может быть пустым.")


def build_greeting(last_name: str, first_name: str, patronymic: str = "") -> str:
    """Собирает приветствие, не добавляя лишний пробел для пустого отчества."""
    full_name = " ".join(part for part in (last_name, first_name, patronymic) if part)
    return f"Здравствуйте, {full_name}!"


def show_environment_info() -> None:
    """Показывает сведения о системе и версии Python."""
    print("\n--- Информация о среде разработки ---")
    print(f"ОС: {platform.system()}")
    print(f"Версия Python: {platform.python_version()}")
    print("Инструменты: Используются рекомендованные Miniconda и VSCode.")


def main() -> None:
    """Запускает диалог с пользователем."""
    # ФИО
    a: str = ask_required_name_part("Введите вашу фамилию: ")
    b: str = ask_required_name_part("Введите ваше имя: ")
    c: str = input("Введите ваше отчество (если есть): ").strip()

    # Вывод приветствия
    print(f"\n{build_greeting(a, b, c)}")

    show_environment_info()


if __name__ == "__main__":
    main()

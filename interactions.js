(function (root) {
  const diagnoses = {
    draft: 'Драфт был настолько загадочным, что даже соперники не поняли, кто у вас керри. Ярослав понял последним.',
    support: 'Саппорт пропал с карты. Ярослав тоже — но это, конечно, была тактическая ротация.',
    ping: 'Пинг был такой, будто курьер везёт пакет из Владивостока. Ярослав дождался — и забыл, зачем нажимал.',
  };

  const excuses = [
    'Ярослав сыграл без звука: не услышал, как команда просит его отойти от Рошана.',
    'Это был стратегический фидбек соперникам: Ярослав показал, где он будет умирать.',
    'Курьер доставил предметы. Фарм — по адресу не нашёл.',
    'Я не фидил, я тестировал, насколько быстро команда теряет веру.',
    'Ярослав берег ульт, команда — терпение. Получилось 0:2.',
    'Кнопка атаки сработала; план атаки не загрузился.',
    'Мини-карта была открыта. Ярослав смотрел в неё с уважением, но без выводов.',
    'Враг купил детектор на варды. Ярослав купил надежду. Надежда не раскрылась.',
  ];

  function createExcusePicker(lines, random) {
    const list = Array.isArray(lines) ? lines.filter((line) => typeof line === 'string' && line.length) : [];
    const getRandom = typeof random === 'function' ? random : Math.random;
    let previous = -1;

    return function nextExcuse() {
      if (!list.length) return '';
      if (list.length === 1) return list[0];

      const sample = Number(getRandom());
      const safeSample = Number.isFinite(sample) ? Math.min(Math.max(sample, 0), 0.999999999) : 0;
      let index = Math.floor(safeSample * list.length);
      if (index === previous) index = (index + 1) % list.length;
      previous = index;
      return list[index];
    };
  }

  function diagnoseMatch(situation) {
    return diagnoses[situation] || 'Выбирай версию — Ярослав уже подготовил три.';
  }

  function getConfidenceCaption(value) {
    const confidence = Math.min(100, Math.max(0, Number(value) || 0));
    if (confidence < 25) return 'Уверенность ушла за вардом и не вернулась.';
    if (confidence < 60) return 'План есть. Он секретный даже для Ярослава.';
    if (confidence < 85) return 'Следующая катка точно всё исправит. Источник: Ярослав.';
    return 'GG ez. (Сказал Ярослав до начала матча.)';
  }

  const api = { createExcusePicker, diagnoseMatch, getConfidenceCaption };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.YaroslavInteractions = api;

  if (!root.document) return;

  const document = root.document;
  const excusePicker = createExcusePicker(excuses);
  const excuseButton = document.getElementById('excuse-button');
  const excuseOutput = document.getElementById('excuse-output');
  if (excuseButton && excuseOutput) {
    excuseButton.addEventListener('click', function () {
      excuseOutput.textContent = excusePicker();
    });
  }

  const diagnosisOutput = document.getElementById('diagnosis-result');
  document.querySelectorAll('[data-diagnosis]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-diagnosis]').forEach(function (option) {
        option.setAttribute('aria-pressed', String(option === button));
      });
      if (diagnosisOutput) diagnosisOutput.textContent = diagnoseMatch(button.dataset.diagnosis);
    });
  });

  const slider = document.getElementById('confidence-slider');
  const confidenceValue = document.getElementById('confidence-value');
  const confidenceCaption = document.getElementById('confidence-caption');
  if (slider) {
    slider.addEventListener('input', function () {
      if (confidenceValue) confidenceValue.textContent = slider.value + '%';
      if (confidenceCaption) confidenceCaption.textContent = getConfidenceCaption(slider.value);
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);

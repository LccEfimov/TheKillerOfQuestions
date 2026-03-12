# CODEX_MASTER_TASK.md

## 1. Роль, контекст и жёсткая цель

Ты работаешь **внутри уже существующего GitHub-репозитория `LccEfimov/TheKillerOfQuestions`**.
Твоя задача — **за один полноценный проход создать production-ready monorepo**, а не набор разрозненных заготовок.

Нужно получить **целостную интеллектуально-аналитическую систему** со следующими свойствами:
- сильный визуальный SPA-интерфейс;
- объяснимая аналитика по текстовым входам;
- backend-ядро с нормализованным JSON API;
- нативный C++ слой для безопасной диагностики, crypto/io helper-функций и runtime capability model;
- защищённый режим обработки и экспорта;
- тесты, документация, примеры, скрипты сборки и запуска;
- готовность к дальнейшему росту в сторону Telegram Web App, мультимодальности, enterprise-отчётов и premium secure-features.

Это должен быть **не учебный пример и не пустой каркас**, а реально запускаемый и расширяемый монорепозиторий.

---

## 2. Непереговорные ограничения

1. **Не создавай новый репозиторий** и не выноси проект за пределы текущего.
2. **Не ломай unrelated-файлы** вне области создаваемого модуля.
3. Разрешён только **легальный и безопасный функционал** внутри границ приложения и репозитория.
4. **Строго запрещено** добавлять:
   - вредоносный код;
   - root bypass;
   - sandbox bypass;
   - доступ к чужой памяти;
   - hidden surveillance;
   - эксплуатацию чужих процессов;
   - нелегальное управление устройством;
   - чтение системных секретов или private data других приложений.
5. Если какая-либо возможность **невозможна или не гарантируема** в текущей среде, это надо:
   - не симулировать ложными обещаниями;
   - честно зафиксировать в `FINAL_IMPLEMENTATION_REPORT.md`;
   - дать безопасный fallback.
6. Нельзя оставлять **пустые заглушки без пояснения**.
7. Любая незавершённость должна сопровождаться:
   - причиной;
   - текущим статусом;
   - ближайшим безопасным путём завершения.

---

## 3. Итоговый ожидаемый результат

В репозитории должен появиться **полноценный монорепозиторий** со следующей структурой **как минимум**:

```text
TheKillerOfQuestions/
  frontend-spa/
    package.json
    index.html
    src/
      main.tsx
      App.tsx
      api.ts
      security.ts
      styles.css
      components/
      hooks/
      lib/
      scenes/
      charts/

  brain-service/
    package.json
    src/
      index.mjs
      analysis.mjs
      ai.mjs
      modules/
        parsers/
        scoring/
        risks/
        narrative/
        exporters/
      schemas/
      prompts/

  native-guard/
    CMakeLists.txt
    src/
      main.cpp
      platform/
      crypto/
      io/
      telemetry/

  docs/
    architecture/
      system-overview.md
      data-flow.md
      threat-model.md
    modding/
      module-contracts.md
      extension-guide.md
      roadmap.md
    research/
      formulas.md
      scenario-model.md
      visualization-model.md
    operations/
      build.md
      deploy.md
      android-notes.md

  examples/
    messages/
    reports/
    encrypted/
    stego/

  scripts/
    bootstrap_repo.sh
    build_all.sh
    dev_all.sh
    export_secure.sh

  tests/
    frontend/
    backend/
    native/
    integration/

  .gitignore
  README.md
```

### 3.1 Разрешённые дополнительные файлы верхнего уровня
Если это улучшает рабочее состояние монорепозитория, **разрешено и рекомендуется** добавить:
- root `package.json` с npm workspaces;
- `.editorconfig`;
- `.gitattributes`;
- `.env.example`;
- `FINAL_IMPLEMENTATION_REPORT.md`;
- `scripts/test_all.sh`;
- `scripts/clean_all.sh`;
- `LICENSE` при необходимости;
- CI workflow, если уместно.

Структуру выше считать **минимальным обязательным ядром**, а не жёстким запретом на вспомогательные файлы.

---

## 4. Главная продуктовая идея

Система должна принимать входную информацию, проводить аналитическую обработку, строить сценарную модель, вычислять вероятности и риски, показывать объяснимую визуализацию факторов и выдавать конечный исследовательский результат в виде сильного интерфейса и экспортируемого отчёта.

Это не CRUD, не чат-обвязка и не набор виджетов. Это **исследовательская аналитическая операционная поверхность**.

Ключевое ощущение продукта:
- аналитическая лаборатория;
- цифровой cockpit;
- дорогой технологичный инструмент;
- визуально сильная, но не хаотичная система.

---

## 5. Как Codex должен работать

Выполняй задачу строго по шагам:

1. Изучи текущую структуру каталога репозитория.
2. Определи, какие файлы уже существуют и что нужно сохранить.
3. Создай каталог монорепозитория и внутреннюю структуру.
4. Реализуй frontend.
5. Реализуй backend.
6. Реализуй native layer.
7. Реализуй документацию.
8. Реализуй примеры.
9. Реализуй scripts.
10. Реализуй tests.
11. Выполни сборки и тесты.
12. Исправь всё, что можно исправить в текущей среде.
13. Сохрани `FINAL_IMPLEMENTATION_REPORT.md`.

Запрещено заканчивать задачу на стадии «каркас создан». Завершение считается только при наличии **рабочих сборок, тестов, docs и отчёта**.

---

## 6. Архитектурная модель системы

Система должна быть разделена на четыре уровня:

### 6.1 Frontend SPA
Назначение:
- ввод данных;
- управление анализом;
- визуализация факторов, рисков, гипотез, evidence chain, timeline, comparison, pipeline и scene graph;
- управление protected mode;
- запуск безопасного экспорта;
- чтение итоговых narrative/report данных.

Стек:
- React;
- TypeScript;
- Vite.

### 6.2 Brain Service
Назначение:
- парсинг входа;
- feature extraction;
- scoring;
- risk evaluation;
- narrative generation;
- protected export metadata generation;
- выдача унифицированного API для frontend;
- интеграция с native-guard.

Стек:
- Node.js;
- Express;
- ESM (`.mjs`).

### 6.3 Native Guard
Назначение:
- безопасная диагностика платформы;
- path safety checks;
- hashing / crypto helpers;
- controlled file IO only inside allowed paths;
- runtime capability model;
- native JSON diagnostics for backend.

Стек:
- C++17;
- CMake.

### 6.4 Docs / Research / Operations Layer
Назначение:
- сделать проект объяснимым, расширяемым и пригодным для дальнейшей команды, продаж, демонстраций и монетизации.

---

## 7. Обязательная реализация frontend-spa

### 7.1 Общие требования
Frontend должен быть:
- тёмным;
- чисто структурированным;
- с сильной типографикой;
- с умеренной анимацией;
- адаптивным;
- пригодным для desktop и mobile browser;
- читаемым при длинных аналитических выводах.

### 7.2 Обязательные зоны интерфейса
На главном экране должны быть реализованы:
- hero / system summary;
- input panel;
- mode controls;
- protected mode toggle;
- stats cards;
- hypothesis probability chart;
- risk radar;
- evidence registry;
- pipeline steps;
- timeline;
- comparison table;
- conclusion / narrative section;
- scene / graph section;
- export controls;
- diagnostics summary.

### 7.3 Обязательные frontend-файлы и их роль

#### `src/main.tsx`
- инициализация приложения;
- подключение глобальных стилей;
- mount React tree.

#### `src/App.tsx`
- главный orchestration component;
- состояние формы;
- состояние protected mode;
- вызовы API;
- агрегация sections и data widgets.

#### `src/api.ts`
- типизированный API client;
- методы минимум:
  - `analyzeText(payload)`;
  - `getHealth()`;
  - `getNativeSummary()`;
  - `exportProtected(payload)`.
- обработка сетевых ошибок;
- нормализация server payload.

#### `src/security.ts`
Реализовать:
- AES-256-GCM encryption через Web Crypto API;
- PBKDF2-SHA-256 key derivation;
- random salt/iv generation;
- export container serializer;
- optional LSB stego utility abstraction;
- формирование protection metadata.

#### `src/styles.css`
- design tokens;
- dark theme;
- grid/background glow;
- карточки;
- readable typography;
- responsive behavior.

#### `src/components/`
Создать не менее следующих компонентов:
- `HeroPanel`;
- `InputPanel`;
- `ModeSwitches`;
- `StatsGrid`;
- `HypothesisChart`;
- `RiskRadar`;
- `EvidenceRegistry`;
- `PipelineView`;
- `TimelineView`;
- `ComparisonTable`;
- `ConclusionPanel`;
- `DiagnosticsPanel`;
- `ExportPanel`;
- `ErrorBanner`;
- `LoadingOverlay`.

#### `src/hooks/`
Минимум:
- `useAnalysisForm`;
- `useProtectedMode`;
- `useResponsiveState`;
- `useAsyncTask`.

#### `src/lib/`
Минимум:
- formatters;
- constants;
- validators;
- chart adapters;
- scene mappers.

#### `src/scenes/`
Реализовать сцену или 3D/graph representation:
- либо `react-force-graph`;
- либо `three.js`/`@react-three/fiber`;
- допустим graceful fallback до 2D graph, если полноценный 3D недоступен в текущей среде.

#### `src/charts/`
Реализовать адаптеры и конфиги для:
- bar chart;
- radar chart;
- timeline visualization;
- comparison chart.

### 7.4 Frontend quality bar
Код frontend должен быть:
- модульным;
- типизированным;
- без магических констант без комментариев;
- с понятными props и domain types;
- с graceful error states;
- без ложных loading behaviors.

---

## 8. Обязательная реализация brain-service

### 8.1 Основной принцип
Brain service должен работать **из коробки без внешнего AI API**, используя локальный explainable analysis pipeline.

Допустимо добавить optional provider adapters для внешнего LLM/API, но:
- без ключа система всё равно должна запускаться;
- базовый анализ обязан работать локально;
- наличие внешнего API должно быть опционально через `.env`.

### 8.2 Структура и роли файлов

#### `src/index.mjs`
- entrypoint Express app;
- middlewares;
- health endpoint;
- analyze endpoint;
- diagnostics endpoint;
- secure export endpoint;
- error handling;
- env reading.

#### `src/analysis.mjs`
- high-level orchestration of full analysis pipeline;
- принимает raw input;
- вызывает parsing, scoring, risks, narrative, native summary;
- возвращает унифицированный domain result.

#### `src/ai.mjs`
- локальный explainable reasoning layer;
- optional external model adapter abstraction;
- prompt templates loader;
- deterministic fallback summarizer/narrator.

#### `src/modules/parsers/`
Реализовать:
- input normalization;
- text segmentation;
- token/phrase heuristics;
- evidence fragment extraction;
- optional JSON/text file parsing.

#### `src/modules/scoring/`
Реализовать:
- feature vector construction;
- weighted hypothesis scoring;
- softmax;
- comparative ratios;
- counterfactual feature contribution.

#### `src/modules/risks/`
Реализовать:
- composite risk indices;
- uncertainty score;
- explanation of risk factors;
- normalization utilities.

#### `src/modules/narrative/`
Реализовать:
- final conclusion builder;
- evidence-backed narrative;
- step-by-step pipeline explanation;
- scenario summaries;
- recommendation / caveat notes.

#### `src/modules/exporters/`
Реализовать:
- secure container metadata builder;
- report JSON exporter;
- HTML report exporter;
- markdown report exporter;
- encrypted export descriptor generator.

#### `src/schemas/`
Реализовать схемы входов и выходов:
- request schema;
- response schema;
- protection metadata schema;
- diagnostics schema;
- report/export schema.

#### `src/prompts/`
Хранить:
- narrative templates;
- explanation templates;
- optional LLM prompt files;
- fallback templates.

### 8.3 Обязательная domain-модель
Нужно реализовать минимум три базовые гипотезы:
- `H1`: разные люди / разные контексты аккаунтов;
- `H2`: потеря контекста из-за усталости / перегрузки;
- `H3`: небрежность / безразличие / непрофессиональное поведение.

Допускается расширение списка гипотез, но эти три обязательны.

### 8.4 Обязательная математическая логика
Реализовать и документировать:
- `S_j = b_j + Σ(w_jk * x_k)`;
- `P(H_j|X) = exp(S_j) / Σ exp(S_i)`;
- `Risk = sigmoid(a + Σ(c_k * x_k))`;
- `Δ_kj = P_base(H_j) - P_without_k(H_j)`.

Нужно обеспечить:
- детерминированность на одних и тех же входах;
- объяснимость;
- отсутствие скрытых “магических” пересчётов без описания.

### 8.5 Обязательные признаки
Минимум реализовать признаки:
- `identity_bridge`;
- `multi_actor`;
- `memory_load`;
- `negligence_signal`;
- `anti_negligence`;
- `evidence_chain`;
- `uncertainty`.

Для каждого признака нужно:
- описание;
- формула или heuristic derivation;
- диапазон нормализации;
- влияние на гипотезы;
- пример интерпретации.

### 8.6 Обязательные API endpoints
Минимально реализовать:
- `GET /health`
- `POST /api/analyze`
- `GET /api/native-summary`
- `POST /api/export/secure`
- `GET /api/examples/:id` или эквивалентный endpoint для демонстрационных файлов

### 8.7 Обязательный формат server response
Ответ `/api/analyze` должен содержать как минимум:
- `hero`
- `stats`
- `scenarioBars`
- `riskRadar`
- `comparison`
- `evidence`
- `timeline`
- `pipeline`
- `scene`
- `conclusion`
- `protection`
- `native`
- `report`

---

## 9. Обязательная реализация native-guard

### 9.1 Общий смысл
Native-guard — это **не offensive layer**, а безопасный bridge/runtime layer.
Он нужен для:
- платформенной диагностики;
- path safety;
- controlled IO;
- hashing/crypto helpers;
- capability discovery;
- подготовки JSON summary для backend.

### 9.2 Структура

#### `CMakeLists.txt`
- сборка бинаря или библиотеки;
- C++17;
- debug/release support;
- понятный output path.

#### `src/main.cpp`
- CLI smoke entry;
- выдача JSON summary;
- запуск self-check;
- обработка аргументов.

#### `src/platform/`
Реализовать platform abstraction и **мегакласс** безопасного capability layer, например:
- `SafeAndroidCapabilityController`;
- или `DeviceRuntimeCapabilityController`.

Этот класс должен включать методы минимум для:
- platform identification;
- CPU thread count;
- ABI / architecture summary;
- cwd / allowed root detection;
- storage availability summary;
- temp/report/cache directories;
- allowed path verification;
- file accessibility checks inside allowed tree;
- runtime clock / uptime helpers;
- environment summary;
- feature availability matrix;
- JSON export of capabilities;
- safe diagnostics;
- bridge-friendly status codes.

Разрешено добавить и другие безопасные методы, если они:
- документированы;
- не нарушают sandbox;
- не требуют root;
- не обращаются к чужим процессам.

### 9.3 `src/crypto/`
Реализовать:
- hashing helpers;
- file digest;
- integrity summary;
- crypto utility wrappers, пригодные для diagnostics/export metadata.

### 9.4 `src/io/`
Реализовать:
- safe read/write only in allowed directories;
- directory walk limited by root;
- path normalization;
- path rejection logic;
- export helpers;
- report artifact write helpers.

### 9.5 `src/telemetry/`
Реализовать:
- безопасную, локальную, неинвазивную телеметрию;
- performance timing;
- execution metrics;
- diagnostic event summaries;
- без скрытого сбора private/user data.

### 9.6 Жёсткие запреты для native-слоя
Строго запрещено:
- ptrace;
- process injection;
- чтение чужой памяти;
- hooks in other apps;
- foreground service abuse;
- попытки обхода Android sandbox;
- root escalation;
- обход системных ограничений.

### 9.7 Обязательная эксплуатационная документация для мегакласса
Создай подробную инструкцию по эксплуатации native capability-класса. Она должна описывать:
- назначение класса;
- список методов;
- параметры и возвращаемые типы;
- допустимые сценарии применения;
- ошибки и ограничения;
- поведение на Android/Termux/Desktop;
- примеры вызова;
- требования безопасности.

Эта документация должна быть отражена минимум в:
- `docs/operations/android-notes.md`
- и/или отдельном разделе `docs/modding/extension-guide.md`

---

## 10. Protected mode и secure export

### 10.1 Что обязательно реализовать
Protected mode должен включать:
- явный toggle на frontend;
- явное предупреждение пользователю о режиме;
- клиентскую подготовку защищённого контейнера;
- AES-256-GCM;
- PBKDF2-SHA-256;
- salt + IV;
- export metadata;
- отсутствие хранения plaintext на backend при включённом режиме;
- описанный формат контейнера.

### 10.2 Формат защищённого контейнера
Создай документированный формат, например:
- `.lccsec.json`

Контейнер должен содержать как минимум:
- version;
- algorithm;
- kdf;
- salt;
- iv;
- ciphertext;
- aad / metadata;
- payload type;
- export timestamp;
- integrity fields.

### 10.3 LSB stego
Допускается **опциональный** режим LSB-стеганографии в PNG как premium/experimental capability.
Если он не может быть полностью завершён в текущей среде, нужно:
- оформить интерфейс и описание формата;
- честно указать статус в отчёте;
- не выдавать incomplete mock за production-ready feature.

---

## 11. Документация, которую обязательно создать

### 11.1 `README.md`
Должен содержать:
- что это за проект;
- ключевые возможности;
- архитектуру в 1–2 блоках;
- быстрый старт;
- dev запуск;
- production build;
- запуск backend/frontend/native;
- protected mode;
- examples;
- ограничения;
- roadmap summary.

### 11.2 `docs/architecture/system-overview.md`
- слои системы;
- ключевые модули;
- интерфейсы между ними;
- архитектурная диаграмма в markdown.

### 11.3 `docs/architecture/data-flow.md`
- путь данных от input до report/export;
- protected mode branch;
- native diagnostics flow.

### 11.4 `docs/architecture/threat-model.md`
- активы;
- угрозы;
- trust boundaries;
- ограничения;
- what is explicitly out-of-scope.

### 11.5 `docs/modding/module-contracts.md`
- contracts frontend ↔ backend ↔ native;
- request/response schemas;
- extension points;
- conventions for new modules.

### 11.6 `docs/modding/extension-guide.md`
- как добавлять признаки;
- как добавлять гипотезы;
- как добавлять exporters;
- как расширять native guard;
- как безопасно добавлять AI providers.

### 11.7 `docs/modding/roadmap.md`
- ближайшие шаги развития;
- Telegram Web App;
- multimodal path;
- team features;
- enterprise reporting.

### 11.8 `docs/research/formulas.md`
- формулы;
- обозначения;
- объяснение коэффициентов;
- ограничения модели.

### 11.9 `docs/research/scenario-model.md`
- гипотезы;
- признаки;
- причинно-следственные связи;
- interpretation rules.

### 11.10 `docs/research/visualization-model.md`
- какие блоки UI отображают какие сущности;
- какие charts на чём основаны;
- как scene graph связан с evidence/scenarios.

### 11.11 `docs/operations/build.md`
- установка зависимостей;
- build steps;
- workspace команды;
- troubleshooting.

### 11.12 `docs/operations/deploy.md`
- локальный запуск;
- production deployment ideas;
- env variables;
- backend/frontend integration notes.

### 11.13 `docs/operations/android-notes.md`
- Termux notes;
- Android limitations;
- native capability controller usage;
- что возможно, а что нельзя обещать на Android.

---

## 12. Примеры, которые обязательно создать

### 12.1 `examples/messages/`
Создай минимум 3 входных примера:
- короткий кейс;
- средний кейс;
- длинный кейс.

### 12.2 `examples/reports/`
Создай минимум 3 примерных отчёта:
- markdown;
- JSON;
- HTML или аналогичный визуализируемый вид.

### 12.3 `examples/encrypted/`
Создай:
- минимум 1 описание формата защищённого контейнера;
- минимум 1 example payload description;
- минимум 1 пояснение protected export flow.

### 12.4 `examples/stego/`
Создай:
- описание контейнерного формата или PNG embedding format;
- ограничения;
- статус готовности;
- инструкцию безопасного использования.

---

## 13. Скрипты, которые обязательно создать

### 13.1 `scripts/bootstrap_repo.sh`
Должен:
- подготовить root workspace;
- установить npm dependencies;
- попытаться собрать native guard;
- проверить наличие нужных директорий;
- вывести понятные next steps.

### 13.2 `scripts/build_all.sh`
Должен:
- собирать frontend;
- проверять backend;
- собирать native;
- завершаться ошибкой при critical failure.

### 13.3 `scripts/dev_all.sh`
Должен:
- запускать backend и frontend dev-mode;
- выводить адреса и порядок запуска;
- корректно обрабатывать termination.

### 13.4 `scripts/export_secure.sh`
Должен:
- демонстрировать secure export pipeline;
- принимать входной файл или payload;
- использовать задокументированный контейнерный формат;
- не заявлять ложных security guarantees.

### 13.5 Дополнительно создать `scripts/test_all.sh`
Хотя его нет в минимальном дереве пользователя, он **обязателен**.
Он должен:
- запускать frontend tests;
- запускать backend tests;
- запускать native smoke/tests;
- запускать integration tests;
- завершаться ненулевым кодом при любой неудаче.

---

## 14. Тесты, которые обязательно создать

### 14.1 Frontend tests
Проверить минимум:
- рендер ключевых секций;
- API integration layer;
- protected mode toggle;
- form validation;
- error states;
- responsive behavior.

### 14.2 Backend tests
Проверить минимум:
- input validation;
- feature extraction;
- scoring correctness;
- softmax normalization;
- risk formulas;
- API response structure;
- protected metadata.

### 14.3 Native tests
Проверить минимум:
- сборку;
- smoke execution;
- JSON output;
- allowed path enforcement;
- safe diagnostics behavior.

### 14.4 Integration tests
Проверить минимум:
- frontend → backend;
- backend → native;
- full analysis run;
- protected export flow;
- example fixtures.

### 14.5 Test artifacts
Если возможно, сохраняй артефакты в отдельный служебный каталог.
Если среда ограничена, минимум сохрани текстовый сводный статус в `FINAL_IMPLEMENTATION_REPORT.md`.

---

## 15. Качество кода

Код должен быть:
- модульным;
- читаемым;
- типизированным там, где применимо;
- без опасных side effects;
- с короткими функциями и чистыми интерфейсами;
- с предсказуемыми именами;
- с защитой от invalid input;
- с понятной обработкой ошибок;
- пригодным для дальнейшей командной разработки.

Предпочитать:
- маленькие файлы вместо монолитов;
- явные domain contracts;
- централизованные type/schema definitions;
- минимально необходимую сложность;
- deterministic behavior для ключевых аналитических функций.

---

## 16. UX и визуальная философия

Интерфейс должен производить впечатление:
- серьёзного аналитического инструмента;
- исследовательской станции;
- неординарного премиального продукта.

Обязательно обеспечить:
- dark analytical theme;
- визуальную глубину;
- стеклянные панели / glow / grid;
- сильную иерархию;
- аккуратные переходы;
- удобство чтения длинных блоков narrative/report.

Не допускается:
- визуальный хаос;
- ощущение шаблонного CRUD;
- случайные палитры;
- бессмысленная анимация.

---

## 17. Монетизация и продуктовый вектор

В документации и README обязательно отразить:

### 17.1 Где система применима
- аналитические исследования;
- сравнение сценариев;
- объяснимые decision-support интерфейсы;
- экспертные и демонстрационные продукты;
- образовательные use-cases;
- B2B dashboards;
- protected document handling.

### 17.2 Способы монетизации
- SaaS subscription;
- freemium;
- premium protected export;
- white-label analytics;
- enterprise reporting;
- API access tiers;
- consulting/custom configuration;
- branded workspaces.

### 17.3 Динамика развития
Отразить roadmap в следующей последовательности:
1. сильное ядро;
2. polished UX;
3. Telegram Web App integration;
4. protected export as premium value;
5. multimodal extensions: voice / CV / video;
6. enterprise collaboration and reporting.

---

## 18. Что считать завершением задачи

Задача считается завершённой только если:
- создана вся структура;
- код присутствует и не состоит из бессодержательных stub-файлов;
- frontend запускается;
- backend запускается;
- native module собирается или честно documented как partially constrained with build notes;
- docs созданы;
- examples созданы;
- scripts созданы;
- tests созданы;
- test/build checks прогнаны настолько полно, насколько позволяет среда;
- protected mode реализован;
- итоговый отчёт создан.

---

## 19. Обязательный финальный отчёт

После завершения создай файл:

`FINAL_IMPLEMENTATION_REPORT.md`

Он должен содержать:
- краткое описание реализованного решения;
- список ключевых созданных файлов и каталогов;
- список выполненных команд сборки;
- список выполненных тестов;
- результаты тестов;
- известные ограничения;
- что готово к запуску;
- что требует внешнего API ключа;
- как запускать desktop version;
- как запускать dev mode;
- как запускать через Termux;
- какие части являются experimental;
- какие части готовы к product iteration.

---

## 20. Практические указания по реализации

1. Сначала делай **рабочий контур**, потом улучшай.
2. Любой optional LLM / AI provider делай **через fallback**.
3. Любую неготовую тяжёлую мультимодальность выноси в roadmap, а не ломай ею базовое ядро.
4. Native layer делай **безопасным, честным и документированным**.
5. Фронтенд делай **визуально сильным, но не тяжёлым до неработоспособности**.
6. Любые build errors исправляй до разумного предела текущей среды.
7. Ничего не маскируй фразами «implemented» без фактической реализации.

---

## 21. Команды, которые желательно проверить в конце

Если среда позволяет, проверь как минимум:

```bash
# root / workspace bootstrap
bash scripts/bootstrap_repo.sh

# frontend
cd frontend-spa && npm install && npm run build

# backend
cd ../brain-service && npm install && npm test

# native
cd ../native-guard && cmake -S . -B build && cmake --build build

# all
cd .. && bash scripts/build_all.sh
bash scripts/test_all.sh
```

Если часть команд не может быть исполнена из-за ограничений среды, это нужно явно записать в итоговый отчёт.

---

## 22. Прямое финальное поручение Codex

Создай **полноценный, расширяемый, протестированный и документированный monorepo** внутри репозитория `LccEfimov/TheKillerOfQuestions` согласно этой инструкции.

Не останавливайся на голом scaffold.
Не оставляй бессодержательных заглушек.
Не создавай небезопасный Android/offensive code.
Сделай рабочее ядро, которое можно запускать, развивать, показывать и монетизировать.

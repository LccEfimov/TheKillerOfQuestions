# CODEX_MASTER_TASK.md

## 1. Контекст и цель

Ты работаешь **внутри уже существующего модуля текущего репозитория**. Название удалённого GitHub-репозитория может отличаться от локального каталога — это не важно. Важно следующее:

- **не создавать новый репозиторий**;
- **не выносить проект наружу**;
- **не ломать unrelated-файлы вне текущего модуля**;
- **реализовать production-ready monorepo-модуль** как целостную систему.

Главная цель: создать модульную интеллектуальную аналитическую систему с визуально сильным SPA-интерфейсом, вычислительным brain-service, безопасным native-слоем, набором документации, примерами, тестами и скриптами запуска.

Система должна соответствовать исходной концепции:

- сильный исследовательский интерфейс;
- объяснимая аналитика;
- вероятностная сценарная модель;
- защищённый клиентский экспорт;
- нативный bridge-layer без выхода за пределы sandbox;
- готовность к дальнейшему росту в сторону Telegram Web App, мультимодальности и enterprise-функций.

---

## 2. Что именно нужно построить

Нужно создать **один законченный модуль** со следующими подсистемами.

### 2.1 Frontend SPA
Стек:
- React
- TypeScript
- Vite

Назначение:
- ввод и загрузка текстовых материалов;
- запуск анализа;
- визуализация факторов, гипотез, рисков и промежуточных шагов вычисления;
- отображение evidence registry, timeline, comparison table, pipeline, 3D graph/scene;
- защищённый экспорт клиентских материалов;
- тёмный аналитический интерфейс высокого качества.

### 2.2 Brain Service
Базовый стек:
- Node.js
- Express

Допустимое расширение:
- Python workers или Python adapters как опциональный слой для последующего роста,
  но **первый полностью запускаемый контур** должен быть работоспособен из коробки на Node.js/Express.

Назначение:
- анализ входного текста;
- выделение признаков;
- расчёт гипотез и рисков;
- построение объяснений;
- формирование унифицированного JSON API;
- подготовка данных для charts, timeline, comparison tables, 3D payload;
- интеграция с native-guard.

### 2.3 Native Guard
Стек:
- C++17
- CMake

Назначение:
- безопасная сводка по платформе и окружению;
- проверка разрешённых путей;
- хеширование файлов внутри разрешённого дерева проекта;
- безопасная телеметрия в рамках собственного приложения;
- подготовка служебной JSON-сводки для backend;
- формирование capability-модели устройства и окружения;
- никаких действий за пределами sandbox.

### 2.4 Docs / Research / Modding Layer
Нужно создать и заполнить документацию:
- архитектура;
- data flow;
- формулы;
- сценарная модель;
- threat model;
- инструкции по расширению;
- roadmap;
- monetization notes;
- инструкции сборки, запуска и Termux-использования.

---

## 3. Главный продуктовый смысл

Система должна:

> принимать входную текстовую информацию, выполнять её аналитическую обработку, вычислять вероятностные сценарии, строить объяснимую визуализацию факторов и выдавать конечный исследовательский результат в форме удобного, красивого и практически применимого аналитического интерфейса.

Это **не CRUD и не простой чат**. Это исследовательская аналитическая среда.

---

## 4. Продуктовые свойства

Система обязана быть:

- модульной;
- расширяемой;
- документированной;
- тестируемой;
- безопасной;
- визуально сильной;
- пригодной для desktop browser и mobile-friendly web;
- пригодной к дальнейшей упаковке в Android через WebView / TWA / Capacitor;
- пригодной для дальнейшей интеграции с Telegram Web App.

Ключевое визуальное впечатление:

- аналитическая лаборатория;
- цифровой cockpit;
- дорогой технологичный инструмент;
- не кричащий, но выразительный исследовательский UI.

---

## 5. Обязательная функциональность

### 5.1 Входные данные
Поддержать:
- ручной ввод текста;
- вставку больших текстовых блоков;
- загрузку `.txt`, `.md`, `.json` как минимум;
- базовую нормализацию текста;
- отображение исходного материала в интерфейсе;
- отображение ограничений анализа.

### 5.2 Анализ и извлечение признаков
Реализовать:
- semantic feature extraction;
- factor detection;
- evidence chain extraction;
- нормализацию признаков в `[0..1]`.

Минимальный обязательный набор признаков:
- `identity_bridge`
- `multi_actor`
- `memory_load`
- `negligence_signal`
- `anti_negligence`
- `evidence_chain`
- `uncertainty`

Нужно дать:
- объяснение каждого признака;
- вклад признака в гипотезы;
- evidence fragments в отчёте.

### 5.3 Сценарная модель
Обязательные гипотезы:
- `H1` — разные люди / разные контексты аккаунтов;
- `H2` — потеря контекста из-за усталости / перегрузки;
- `H3` — небрежность / безразличие / непрофессиональное поведение.

Допускается расширение, но эти три обязательны.

### 5.4 Математическая модель
Нужно реализовать:
- линейную взвешенную оценку гипотез;
- softmax;
- контрфактический вклад признаков;
- композитный риск-индекс;
- сравнительные соотношения между гипотезами.

Минимальные формулы:

- `S_j = b_j + Σ(w_jk * x_k)`
- `P(H_j|X) = exp(S_j) / Σ exp(S_i)`
- `Risk = sigmoid(a + Σ(c_k * x_k))`
- `Δ_kj = P_base(H_j) - P_without_k(H_j)`

### 5.5 Визуализация
Обязательные элементы:
- hero section;
- stats cards;
- bar chart;
- radar chart;
- timeline;
- evidence registry;
- computational pipeline;
- comparison table;
- conclusion section;
- 3D scene or 3D graph;
- responsive layout;
- качественный dark analytical style.

### 5.6 Protected mode
Реализовать клиентский режим защиты:
- переключатель protected mode перед отправкой;
- явное информирование пользователя о режиме обработки;
- AES-256-GCM для шифрования полезных материалов и отчётов;
- PBKDF2-SHA-256 для derivation ключа;
- экспорт в `.lccsec.json` или аналогичный документированный контейнер;
- опциональную LSB-стеганографию в PNG;
- отсутствие server-side хранения plaintext при включённом protected mode;
- protection metadata в ответе backend.

### 5.7 API-ответ
Backend обязан отдавать JSON, содержащий как минимум:
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

### 5.8 Native Guard scope
Разрешено:
- платформа, ABI, CPU threads, cwd;
- свободное место;
- список разрешённых capability-флагов;
- проверка разрешённых путей;
- хеширование файлов внутри project tree;
- безопасная сводка по окружению;
- ограниченное сканирование разрешённого дерева проекта;
- сбор сведений о доступности ресурсов **только в рамках явно выданных разрешений и sandbox**.

Строго запрещено:
- доступ к чужим процессам;
- доступ к чужой памяти;
- инъекции;
- privilege escalation;
- root bypass;
- обход sandbox;
- управление чужими activity / service / process;
- чтение системных секретов;
- скрытое наблюдение;
- выполнение вредоносных действий.

---

## 6. Безопасная замена идеи «мегакласса» для Android

Запрос на класс, который «перешагивает все ограничения смартфона», **не должен реализовываться**. Вместо этого нужно реализовать **легальный capability-controller**, который даёт максимум допустимой функциональности **в пределах Android sandbox и разрешений приложения**.

### 6.1 Обязательный нативный класс
Создать и задокументировать класс:

- `SafeAndroidCapabilityController`

Допустимо дополнительное имя-обёртка:
- `DeviceRuntimeBridge`
- `NativeGuardFacade`

### 6.2 Назначение класса
Класс должен быть единым центром безопасного доступа к:
- сведениям о платформе;
- допустимым системным вызовам;
- доступным устройственным возможностям;
- файловым операциям внутри sandbox;
- хешированию;
- диагностике окружения;
- capability discovery;
- ограниченным performance helpers;
- безопасному сериализованному JSON output.

### 6.3 Обязательные группы методов

#### A. Platform / runtime info
- `getPlatformInfo()`
- `getOsName()`
- `getOsVersion()`
- `getApiLevel()`
- `getAbiList()`
- `getCpuThreadCount()`
- `getMemorySummary()`
- `getStorageSummary()`
- `getWorkingDirectory()`
- `getBuildFingerprintSafe()` — только если это допустимо и не раскрывает чувствительные данные

#### B. Capability discovery
- `listCapabilities()`
- `isCapabilityAvailable(name)`
- `isPermissionGranted(name)`
- `describeUnavailableCapability(name)`
- `exportCapabilityMatrixJson()`

#### C. Safe file / storage operations
- `normalizeProjectPath(path)`
- `isPathAllowed(path)`
- `listAllowedFiles(root, depthLimit)`
- `hashFileSha256(path)`
- `hashFileFnv1a(path)`
- `hashDirectoryManifest(root)`
- `readTextFileAllowed(path, maxBytes)`
- `writeTextFileAllowed(path, content)`
- `exportJsonAllowed(path, json)`

#### D. Diagnostics / telemetry
- `collectRuntimeSummary()`
- `collectThermalHintIfAvailable()`
- `collectBatteryHintIfAvailable()`
- `collectAppScopedTelemetry()`
- `collectPerformanceHints()`
- `collectFilesystemSummary()`

#### E. Resource availability discovery
- `hasCameraAccess()`
- `hasMicrophoneAccess()`
- `hasBiometricCapability()`
- `hasSensorAccess()`
- `hasNetworkCapability()`
- `hasOpenGLESupport()`
- `hasVulkanSupportIfAvailable()`

#### F. Safe crypto / integrity helpers
- `computeSha256(data)`
- `computeFileDigest(path)`
- `verifyManifest(manifest)`
- `generateIntegrityReport()`

#### G. Output / bridge layer
- `toJson()`
- `toCompactJson()`
- `writeJsonReport(path)`
- `printHumanReadableSummary()`

### 6.4 Требования к реализации класса
- модульная реализация по подпапкам `platform/`, `fs/`, `hashing/`, `output/`, `safe_restrictions/`;
- чёткие заголовочные файлы;
- документированные контракты;
- graceful fallback на не поддерживаемых возможностях;
- отсутствие hidden API abuse;
- отсутствие попыток обойти Android security model;
- возврат честного статуса `available / unavailable / denied / unsupported`.

### 6.5 Документация по эксплуатации класса
Обязательно создать документ в docs, например:
- `docs/architecture/safe-android-capability-controller.md`

В нём описать:
- назначение;
- область применения;
- границы допустимого;
- список методов;
- примеры вызова;
- форматы JSON-ответов;
- ожидаемое поведение в desktop Linux/macOS/Windows и в Android/Termux;
- какие возможности требуют permission, JNI bridge или host-shell;
- какие методы могут вернуть `unsupported`;
- почему класс **не** является инструментом обхода системных ограничений.

---

## 7. Архитектура кода

### 7.1 Frontend
Минимальная структура:

```text
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
    charts/
    scenes/
    lib/
    types/
```

### 7.2 Backend
Минимальная структура:

```text
brain-service/
  package.json
  src/
    index.mjs
    routes/
    analysis/
    narrative/
    schemas/
    native/
    utils/
    exporters/
```

### 7.3 Native
Минимальная структура:

```text
native-guard/
  CMakeLists.txt
  src/
    main.cpp
    platform/
    fs/
    hashing/
    output/
    safe_restrictions/
```

### 7.4 Документация и тесты

```text
docs/
  architecture/
  modding/
  research/
  operations/
  monetization/
  roadmap/

examples/
  messages/
  reports/
  encrypted/
  stego/

scripts/
  bootstrap_termux.sh
  build_all.sh
  test_all.sh
  dev_all.sh

tests/
  frontend/
  backend/
  native/
  integration/
```

---

## 8. Обязательные документы

Создать и заполнить:

- `README.md`
- `docs/architecture/system-overview.md`
- `docs/architecture/data-flow.md`
- `docs/architecture/threat-model.md`
- `docs/architecture/safe-android-capability-controller.md`
- `docs/modding/module-contracts.md`
- `docs/modding/extension-guide.md`
- `docs/modding/roadmap.md`
- `docs/research/formulas.md`
- `docs/research/scenario-model.md`
- `docs/research/visualization-model.md`
- `docs/operations/build.md`
- `docs/operations/deploy.md`
- `docs/operations/android-notes.md`
- `docs/monetization/business-model.md`
- `docs/roadmap/future-evolution.md`
- `FINAL_IMPLEMENTATION_REPORT.md`

---

## 9. Раздел о применении системы

В документации обязательно описать:

### 9.1 Где система применима
- анализ текстовой информации;
- исследовательские разборы;
- comparison-driven analysis;
- демонстрационные аналитические интерфейсы;
- защищённый экспорт;
- экспертные и образовательные use-cases;
- консультационные и B2B сценарии.

### 9.2 Монетизация
Описать:
- SaaS subscription;
- freemium;
- protected export as premium feature;
- white-label analytical interface;
- corporate licensing;
- custom research dashboards;
- consulting / implementation services;
- API access tiers;
- future media/video bundle;
- Telegram growth funnel.

### 9.3 Направления развития
Описать:
- новые feature extractors;
- новые сценарные режимы;
- voice control;
- CV / image inputs;
- video as separate subsystem;
- collaborative sessions;
- enterprise reporting;
- PDF / DOCX / HTML bundle export;
- локальный offline-mode;
- Android packaging path;
- Telegram Web App как канал распространения, а не как замена основного UI.

---

## 10. Требования к тестированию

### 10.1 Frontend
Проверить:
- smoke UI start;
- рендер hero/stats/charts/conclusion;
- API integration;
- protected mode UI;
- form validation;
- responsive layout.

### 10.2 Backend
Проверить:
- feature extraction;
- scoring;
- softmax;
- risk formulas;
- API responses;
- invalid input handling;
- protection metadata.

### 10.3 Native
Проверить:
- сборку;
- smoke run;
- JSON output;
- safe restrictions;
- allowed path checks;
- safe capability reporting.

### 10.4 Integration
Проверить:
- frontend → backend;
- backend → native;
- end-to-end analysis;
- end-to-end protected export;
- examples loading.

### 10.5 Scripts
Нужно создать `scripts/test_all.sh`, который:
- выполняет все доступные тесты;
- завершает выполнение ненулевым кодом при любой критической неудаче;
- складывает итоговый статус в отчётную папку или файл.

---

## 11. Termux-совместимость

Подготовить и использовать `scripts/bootstrap_termux.sh`.

Требования:
- только rootless действия;
- работа в рамках Termux;
- установка базовых пакетов;
- подготовка npm dependencies;
- подготовка C/C++ toolchain;
- попытка сборки native-guard;
- понятная инструкция следующего шага;
- честное описание ограничений Android/WebView/3D/JNI.

Минимальные пакеты:
- git
- nodejs
- clang
- cmake
- make
- python
- pkg-config

---

## 12. Порядок работы Codex

Выполняй строго последовательно:

1. изучи текущую структуру модуля;
2. не трогай unrelated-файлы;
3. создай каркас каталогов;
4. реализуй frontend;
5. реализуй backend;
6. реализуй native-guard;
7. реализуй safe capability-controller;
8. реализуй protected mode;
9. напиши docs;
10. добавь examples;
11. добавь tests;
12. добавь scripts;
13. запусти доступные сборки и тесты;
14. исправь обнаруженные проблемы;
15. создай `FINAL_IMPLEMENTATION_REPORT.md`.

---

## 13. Что считать завершением задачи

Задача завершена только если:
- создан весь каталог системы;
- весь ключевой код присутствует;
- docs заполнены содержательно;
- frontend стартует;
- backend стартует;
- native модуль собирается;
- tests запускаются;
- examples присутствуют;
- protected mode реализован;
- визуализация реализована;
- safe Android capability-controller реализован и задокументирован;
- итоговый статус и ограничения сохранены в финальном отчёте.

---

## 14. Обязательный финальный отчёт

После выполнения создать файл:
- `<ROOT_MODULE_DIR>/FINAL_IMPLEMENTATION_REPORT.md`

В нём указать:
- краткое описание решения;
- список созданных файлов;
- список выполненных тестов;
- результаты тестов;
- известные ограничения;
- что готово к запуску;
- что требует внешнего API key;
- как запускать на desktop;
- как запускать через Termux;
- как запускать в dev-режиме;
- как собирать production version.

---

## 15. Жёсткие ограничения безопасности

Строго запрещено создавать:
- вредоносное ПО;
- код обхода системной защиты;
- root bypass;
- cross-app memory access;
- process injection;
- скрытое наблюдение;
- нелегальное управление устройством;
- код, выходящий за границы sandbox без легального permission-based path.

Разрешён только:
- легальный;
- документированный;
- безопасный;
- permission-aware функционал внутри границ приложения и репозитория.

---

## 16. Требования к качеству кода

Предпочитать:
- короткие модули;
- чистые интерфейсы;
- предсказуемые типы;
- понятные имена;
- отсутствие опасных side-effects;
- defensive error handling;
- хорошую DX;
- честные fallbacks;
- отсутствие пустых заглушек без пояснения.

Если что-то невозможно реализовать полностью в текущей среде, это нужно:
- явно зафиксировать;
- не маскировать;
- описать причину;
- указать безопасный путь дальнейшей доработки.

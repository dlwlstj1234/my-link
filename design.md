---
name: 토스
slug: toss
category: finance
last_updated: "2026-09-24"
created_at: "2026-05-11"
lang: ko
logo: https://getdesign.kr/logos/toss.png
colors:
  fill-brand: "{colors.blue-500}"
  fill-primary: "{colors.grey-900}"
  fill-secondary: "{colors.grey-100}"
  fill-weak: "{colors.grey-50}"
  fill-danger: "{colors.red-500}"
  fill-success: "{colors.green-500}"
  fill-warning: "{colors.orange-500}"
  text-primary: "{colors.grey-900}"
  text-secondary: "{colors.grey-700}"
  text-tertiary: "{colors.fg-tertiary}"
  text-placeholder: "{colors.fg-quaternary}"
  text-alt: "{colors.white}"
  text-brand: "{colors.blue-500}"
  text-danger: "{colors.red-500}"
  border-primary: "{colors.blue-500}"   # focused input
  border-secondary: "{colors.grey-200}"   # default divider
  border-strong: "{colors.grey-400}"
  border-subtle: "{colors.line-subtle}"
  overlay-scrim: "{colors.bg-overlay}"
  overlay-press: "{colors.press-overlay}"
  tds-fg-primary: "{colors.text-primary}"   # grey-900
  tds-fg-secondary: "{colors.text-secondary}"   # grey-700
  tds-fg-tertiary: "{colors.fg-tertiary}"   # navy-900 @ 58%
  tds-fg-quaternary: "{colors.fg-quaternary}"   # navy-900 @ 28%
  tds-fg-disabled: "{colors.grey-400}"
  tds-fg-inverse: "{colors.text-alt}"   # white
  tds-fg-brand: "{colors.text-brand}"
  tds-fg-danger: "{colors.text-danger}"
  tds-fg-success: "{colors.green-500}"
  tds-bg-primary: "{colors.white}"
  tds-bg-secondary: "{colors.fill-secondary}"   # grey-100
  tds-bg-tertiary: "{colors.grey-200}"
  tds-bg-elevated: "{colors.white}"
  tds-bg-overlay: "{colors.overlay-scrim}"
  tds-bg-brand: "{colors.fill-brand}"
  tds-bg-brand-weak: "{colors.blue-50}"
  tds-bg-danger: "{colors.fill-danger}"
  tds-line-default: "{colors.border-secondary}"   # grey-200
  tds-line-subtle: "{colors.border-subtle}"
  tds-line-strong: "{colors.border-strong}"   # grey-400
  tds-press-overlay: "{colors.overlay-press}"   # 검정 26%
  ## Brand
  primary: "{colors.blue-500}"   # 명세의 대표색 역할 — TDS 의 fill-primary·text-primary(grey-900)와 다른 축
  blue-500: oklch(0.620 0.191 258)   # #3182F6 — TDS 발행값 blue500, 카노니컬 Toss Blue, 화면당 하나의 primary CTA
  blue-600: oklch(0.522 0.176 257)   # pressed-blue 단계 — 번들 고유값, TDS blue600과 다른 색: 명도가 blue700과 blue800 사이이고 가장 가까운 blue700과도 ΔE 0.023
  blue-700: oklch(0.476 0.174 259)   # pressed gradient stop — 번들 고유값, TDS blue700과 다른 색: 가장 가까운 발행 step은 blue800(ΔE 0.012)
  blue-50: oklch(0.959 0.020 250)   # #E8F3FF — TDS 발행값 blue50, brand-weak background
  ## Greyscale
  grey-900: oklch(0.237 0.020 258)   # #191F28 — TDS 발행값 grey900, primary text, never pure black
  grey-800: oklch(0.357 0.028 257)   # #333D4B — TDS 발행값 grey800
  grey-700: oklch(0.460 0.028 256)   # #4E5968 — TDS 발행값 grey700, secondary text
  grey-600: oklch(0.562 0.025 254)   # #6B7684 — TDS 발행값 grey600
  grey-500: oklch(0.666 0.021 253)   # #8B95A1 — TDS 발행값 grey500
  grey-400: oklch(0.779 0.016 251)   # #B0B8C1 — TDS 발행값 grey400, disabled text, strong line
  grey-300: oklch(0.874 0.009 248)   # #D1D6DB — TDS 발행값 grey300
  grey-200: oklch(0.930 0.005 248)   # #E5E8EB — TDS 발행값 grey200, default divider/border
  grey-150: oklch(0.918 0.007 247)   # 번들 고유 step — TDS에는 150이 없다. grey-200을 발행값으로 옮긴 뒤로 grey-200보다 어둡다(명도 역전)
  grey-100: oklch(0.966 0.003 248)   # #F2F4F6 — TDS 발행값 grey100, secondary surface
  grey-50: oklch(0.985 0.002 248)   # #F9FAFB — TDS 발행값 grey50
  white: oklch(1.000 0.000 0)
  ## Toss yellow & orange
  yellow-500: oklch(0.850 0.154 82)   # #FFC342 — TDS 발행값 yellow500, illustration / emoji body
  yellow-400: oklch(0.893 0.123 85)   # 번들 고유값, TDS yellow400과 다른 색: 번들 yellow-300과 거의 같고 가장 가까운 발행 step은 yellow300(ΔE 0.019)
  yellow-300: oklch(0.906 0.126 91)   # #FFDD78 — TDS 발행값 yellow300
  yellow-600: oklch(0.840 0.171 87)   # 번들 고유값, TDS yellow600과 다른 색: 가장 가까운 발행 step은 yellow500(ΔE 0.024)
  yellow-700: oklch(0.872 0.169 87)   # 번들 고유값, TDS yellow700과 다른 색: yellow-600보다 밝아 발행 순서와 반대이고 가장 가까운 발행 step은 yellow400(ΔE 0.025)
  orange-500: oklch(0.748 0.183 56)   # semantic warning — 번들 고유값, TDS orange500과 다른 색: 가장 가까운 발행 step은 orange600(ΔE 0.011)
  orange-400: oklch(0.828 0.108 52)   # 번들 고유값, TDS orange400과 다른 색: 같은 명도대 발행 step보다 채도가 낮고 가장 가까운 orange300과도 ΔE 0.065
  orange-300: oklch(0.870 0.078 51)   # 번들 고유값, TDS orange300과 다른 색: 가장 가까운 발행 step은 orange200(ΔE 0.054)
  ## Semantic palette
  red-500: oklch(0.641 0.208 21)   # #F04452 — TDS 발행값 red500, error / danger
  red-600: oklch(0.626 0.216 22)   # 번들 고유값, TDS red600과 다른 색: 번들 red-500과 거의 같은 색이라 가장 가까운 발행 step은 red500(ΔE 0.017)
  green-500: oklch(0.493 0.143 154)   # success — 번들 고유값, TDS green500과 다른 색: 명도 0.49로 발행 green500(0.67)보다 훨씬 어둡고 가장 가까운 발행 step은 green900(ΔE 0.028)
  navy-900: oklch(0.155 0.060 261)   # text-shadow base, source of overlay rgba
  ## Illustration warms
  brown-900: oklch(0.359 0.083 39)
  brown-700: oklch(0.444 0.062 30)
  brown-500: oklch(0.535 0.073 39)
  brown-400: oklch(0.659 0.097 41)
  ## Semantic alpha tokens
  fg-tertiary: oklch(0.155 0.060 261 / 0.58)   # 흐린 본문 텍스트
  fg-quaternary: oklch(0.155 0.060 261 / 0.28)   # placeholder
  line-subtle: oklch(0.000 0.000 0 / 0.08)   # 그레이 배경 위 카드 보더
  bg-overlay: oklch(0.000 0.000 0 / 0.56)   # bottom-sheet scrim
  press-overlay: oklch(0.000 0.000 0 / 0.26)   # 보편 pressed-state tint
  ## Dark palette (TDS adaptive)
  dark-blue-500: oklch(0.630 0.192 258)   # #3485FA — TDS 발행값 blue500 (colors.dark.css)
  dark-blue-50: oklch(0.300 0.062 267)   # #202C4D — TDS 발행값 blue50 (colors.dark.css)
  dark-grey-900: oklch(1.000 0.000 0)   # #FFFFFF — TDS 발행값 grey900 (colors.dark.css), 다크 primary text
  dark-grey-800: oklch(0.919 0.001 286)   # #E4E4E5 — TDS 발행값 grey800 (colors.dark.css)
  dark-grey-700: oklch(0.818 0.004 286)   # #C3C3C6 — TDS 발행값 grey700 (colors.dark.css), 다크 secondary text
  dark-grey-600: oklch(0.701 0.009 286)   # #9E9EA4 — TDS 발행값 grey600 (colors.dark.css)
  dark-grey-500: oklch(0.596 0.014 286)   # #7E7E87 — TDS 발행값 grey500 (colors.dark.css)
  dark-grey-400: oklch(0.500 0.017 286)   # #62626D — TDS 발행값 grey400 (colors.dark.css)
  dark-grey-300: oklch(0.425 0.020 286)   # #4D4D59 — TDS 발행값 grey300 (colors.dark.css)
  dark-grey-200: oklch(0.361 0.019 285)   # #3C3C47 — TDS 발행값 grey200 (colors.dark.css)
  dark-grey-100: oklch(0.297 0.016 285)   # #2C2C35 — TDS 발행값 grey100 (colors.dark.css)
  dark-grey-50: oklch(0.247 0.013 285)   # #202027 — TDS 발행값 grey50 (colors.dark.css)
  dark-yellow-500: oklch(0.816 0.158 74)   # #FFB134 — TDS 발행값 yellow500 (colors.dark.css)
  dark-yellow-300: oklch(0.724 0.159 62)   # #EB8B1E — TDS 발행값 yellow300 (colors.dark.css)
  dark-red-500: oklch(0.639 0.209 21)   # #F04251 — TDS 발행값 red500 (colors.dark.css)
typography:
  display-1:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.005em
  display-2:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: -0.020em
  h1:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.020em
  h2:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.020em
  h3:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.015em
  h4:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: -0.015em
  title-1:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: -0.010em
  title-2:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: -0.010em
  body-1:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.005em
  body-2:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.005em
  body-3:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0em
  label-l:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 17px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.005em
  label-m:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.005em
  label-s:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0em
  caption:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.40
    letterSpacing: 0em
  caption-s:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.40
    letterSpacing: 0em
spacing:
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 20px
  space-6: 24px
  space-7: 28px
  space-8: 32px
  space-10: 40px
  space-12: 48px
  space-16: 64px
  space-20: 80px
rounded:
  radius-xs: 4px   # small badges
  radius-s: 8px   # inline tags
  radius-m: 12px   # text inputs
  radius-l: 14px   # L button (48px)
  radius-xl: 16px   # XL button (56px), cards
  radius-2xl: 20px   # sheets, dialogs
  radius-3xl: 24px   # big cards / sections
  radius-4xl: 32px   # hero blocks
  radius-full: 999px   # chips, pills, capsules
elevation:
  shadow-1: 0 1px 2px oklch(0.155 0.060 261 / 0.04), 0 1px 1px oklch(0.155 0.060 261 / 0.04)   # menu
  shadow-2: 0 4px 12px oklch(0.155 0.060 261 / 0.06), 0 1px 2px oklch(0.155 0.060 261 / 0.04)   # tooltip
  shadow-3: 0 12px 32px oklch(0.155 0.060 261 / 0.10), 0 2px 6px oklch(0.155 0.060 261 / 0.06)   # dialog
  shadow-toast: 0 8px 24px oklch(0.155 0.060 261 / 0.16)   # toast
opacity:
  disabled-opacity: 0.30   # 컴포넌트 전체 노드에 적용
  tds-disabled-opacity: 0.30
fonts:
  font-family-emoji: "Tossface"
---

# 토스 (Toss) — design.md

> 비바리퍼블리카가 운영하는 한국 최대 핀테크 슈퍼앱. 송금·결제·은행·증권·보험·세금·부동산·자동차 관리 등 금융 전반을 단일 모바일 셸로 묶고, "Apps in Toss" 미니앱 플랫폼까지 같은 디자인 시스템 위에 얹는다 [src:2]. 본 문서는 Toss Design System 핸드오프 번들(`TDS_Mobile_for_Apps_in_Toss_(2602-3-2).fig` export → `toss-design-system/{README, chats/chat1, project/{README, SKILL, colors_and_type.css, preview/ 41 cards, ui_kits/mobile/{Components.jsx, Screens.jsx, Send-Money Flow.html, ios-frame.jsx}, assets/toss-logo.png}}`)을 1차 출처로 합성한 결과이며, 공개된 toss.tech 보고서 [src:1]와 toss.im 미니앱 가이드, TDS Mobile docs를 보조 출처로 사용했다.

## Brand & Style

토스는 자신을 **"은행에 다니는 유능한 친구"** 로 포지셔닝한다 — 조용히 일을 처리하고, 사용자의 시간을 낭비시키지 않는다는 어조다. 슬로건과 카피 곳곳에 "투자, 모두가 할 수 있도록", "수수료 걱정 없이"와 같이 진입 장벽을 제거하는 메시지가 반복되며, "토스가 알아서"라는 위임형 표현이 사용자 부담을 줄이는 톤으로 일관된다 [src:11]. 이는 단순한 마케팅 카피가 아니라 인터페이스 전반의 의사결정 기준이다 — 정보 밀도보다 가독성과 행동 유도를 우선하고, "한번에 볼 수 있어요" 같은 통합 뷰 패턴이 반복되는 이유다 [src:11].

대상 사용자는 일반 소비자 전 연령대이지만, 디자인 시스템(TDS) 자체는 약 **2,000명 규모의 메이커**가 단일 시스템 위에서 일한다는 전제로 설계되었다 [src:2]. 일관성과 확장성은 디자인 가이드라인 차원이 아니라 인프라 차원에서 다뤄지며, 컴포넌트는 "**레고 블록**"으로 비유된다 [src:2]. 새 컴포넌트 결정은 디자이너 직관이 아니라 A/B 테스트 결과로 검증된다 — 예를 들어 Menu 컴포넌트는 10일간의 A/B 테스트에서 Android item-click rate가 10% 더 높게 나온 뒤에야 정식 채택되었다 [src:4]. Apps-in-Toss 미니앱 플랫폼은 제3자 미니앱을 토스 셸 안에서 돌리되 토스와의 경계를 흐리지 못하게 한다 — 탭바가 필요하면 토스가 제공하는 플로팅 탭바를 써야 하고, 토스 메인 화면의 기본 하단 탭과 형태가 겹치는 탭바는 사용자가 현재 위치를 헷갈린다는 이유로 허용하지 않으며, 브랜드 로고·이름·컬러를 노출해 "사용자가 토스와 앱인토스를 혼동하지 않도록" 하라고 요구한다 [src:6].

전체 무드는 **차갑고 절제된, 거의 무채색에 가까운 화이트 캔버스 + 선명한 토스 블루 단일 강조색**으로 요약된다. 깊은 한기 어린 cool-blue 중성색(`grey-900`부터 `grey-100`까지)이 표면 전체를 차지하고, 채도가 높은 브랜드 블루(`blue-500`)는 화면당 하나의 가장 중요한 액션에만 예약된다. 모서리는 **공격적으로 둥글지만 결코 귀엽지 않다** — 버튼·카드·hero 블록에 16~32px 라운드, chips·primary CTA에 999px full pill을 쓰며, iOS류 squircle/blob 라운드는 `Templates/Squircle` 전용 페이지를 제외하면 명시적으로 회피된다. 배경은 평면이 기본이며, 그라디언트는 (1) bottom CTA 위쪽 `white → transparent` 보호 그라디언트, (2) 로딩 버튼 내부의 미세한 pressed-blue radial glow, (3) yellow→orange 일러스트 그라디언트 — 세 가지 문서화된 예외만 허용된다. 텍스처·노이즈·전면 사진은 chrome에 사용되지 않는다.

Voice는 **해요체(대화형 존댓말) + 위임형 + 일상어**로 요약된다 [src:10]. 종결어미 `-요`로 통일되며 격식체(~니다/~합니다)도, 방송 헤드라인의 단정형 `-다`도 사용하지 않는다 — 한 문장은 목적을 말하고, 다음 한 문장은 *언제 쓰는지*를 말하는 패턴이 표준이다. 토스가 잘못해 발생한 에러 화면에서조차 격식체가 아닌 해요체를 유지하며, 반복되는 시스템 상황은 Figma preset과 개발자 에러 메시지 라이브러리로 템플릿화되어 좋은 카피가 기본 선택지가 되도록 운영된다 [src:10]. 본 카탈로그 메타 문서는 토스 자체 카피와 달리 `~다` 평서체로 기술하며, 토스의 해요체 정책은 product surface 카피에 한해 적용되는 규칙임을 분리해 둔다.

## Colors

> **팔레트 정정(2026-09-24).** 토스는 색 토큰을 발행한다 — npm `@toss/tds-colors` 0.1.0이 `colors.light.css`·`colors.dark.css`로 팔레트 hex를 싣고, TDS Mobile Colors 문서가 라이트 팔레트를 같은 이름·값으로 보여 준다 [src:12][src:13]. 이 절이 전에 적었던 "토큰 패키지도 값 표도 공개되지 않았다"는 틀렸다. base 팔레트에서 발행본에 같은 이름의 step이 있는 25개를 대조하되, 값을 고치기 전에 이름이 같은 색을 가리키는지부터 판정했다 — 번들 값에서 **가장 가까운 발행 step이 같은 이름의 step일 때만** 대응한다고 보았다. 대응하는 15개(`blue-500`·`blue-50`, `grey-50`~`grey-900` 10개, `yellow-300`·`yellow-500`, `red-500`)는 발행값으로 바꾸고 토큰 줄에 hex를 병기했다. 그중 `blue-500`은 번들값이 ΔE 0.020 어긋나 있었고, 미니앱 가이드의 `brand.primaryColor` 입력 예시도 발행값과 같은 hex다 [src:6]. 나머지 10개(`blue-600`·`blue-700`, `yellow-400`·`yellow-600`·`yellow-700`, `orange-300`·`orange-400`·`orange-500`, `red-600`, `green-500`)는 번들이 같은 이름을 다른 색에 붙인 경우라 값을 그대로 두고, 각 토큰 줄에 가장 가까운 발행 step을 적었다 — 번들 `yellow-700`은 `yellow-600`보다 밝고, `green-500`은 발행 `green500`보다 `green900`에 가깝다. 가장 가까운 step도 10개 모두 허용 오차(ΔE 0.01) 밖이라 이름을 그 step으로 옮기지도 않았다. 다크 값은 대응하는 15개만 `colors.dark.css`에서 `dark-` 토큰으로 옮겼다.

TDS 컬러 시스템은 **4계층 구조**로 운영된다 [src:3]:

1. **Target** — 토큰이 칠해지는 표면. `fill`, `text`, `border`.
2. **Role** — 의미 역할. `brand`, `neutral`, `primary`, `secondary`, `weak`, `alt`.
3. **Variant** — 강도 변형. `weak`, `alt`.
4. **Level** — 토큰의 추상화 단계. `base`(원시 팔레트) → `semantic`(역할 alias) → `component`(컴포넌트 전용 alias).

토스는 2025년 production 토큰을 HSL에서 OKLCH로 마이그레이션한다고 공식 발표했으며, 같은 numeric scale(50, 100, …, 900)이 모든 hue에서 동등한 perceived brightness를 갖도록 OKLCH 균질화를 도입한다 [src:3]. 핸드오프 번들 자체는 light 모드 카노니컬 hex 값으로 ship되며, 원본 hex는 `colors_and_type.css`에 정의되어 있다. 본 문서는 그중 TDS 발행 step과 이름이 대응하는 값을 발행값으로 바꾸고(위 감사 메모), 모든 값을 catalog 규약에 따라 OKLCH로 변환해 표기한다.

### Brand

카노니컬 앵커 `blue-500`과 brand-weak 배경 `blue-50`은 TDS가 발행하는 `blue500`·`blue50` 값을 따른다 [src:12][src:13]. pressed 단계 `blue-600`·`blue-700`은 번들 `colors_and_type.css`의 값이고, TDS의 같은 이름 step보다 한 단계쯤 어두워 같은 색이 아니다. 미니앱 UI/UX 가이드가 `brand.primaryColor` 입력 예시로 드는 hex도 같은 값이다 [src:6].

### Greyscale (cool-blue tinted neutrals)

`grey-50`~`grey-900` 10단계는 TDS 발행값이다 [src:12][src:13]. `grey-150`은 TDS에 없는 번들 고유 step이라 번들값을 두었고, 그 결과 발행값으로 옮긴 `grey-200`보다 약간 어둡다. 두 이웃 사이로 보간하면 번들에도 발행본에도 없는 값을 지어내게 되어 역전을 그대로 기록한다 — 프리뷰의 다크 `grey-150`만 보간한 것은 그 값이 애초에 md 토큰이 아닌 프리뷰 파생값이기 때문이다. `grey-900`은 순수 검정이 아니라 미세하게 차가운 navy 톤이며, `grey-100`은 거의 인지되지 않는 cool 그레이로 화면 보조 표면으로 사용된다.

### Toss yellow & orange (illustration warms)

`yellow-300`·`yellow-500`은 TDS 발행값이고 [src:12][src:13], 나머지 yellow·orange step은 번들 `colors_and_type.css`의 값이다 — TDS의 같은 이름 step과 다른 색이라 토큰 줄마다 가장 가까운 발행 step을 적어 두었다. Toss yellow는 표면 색이 아니라 일러스트/이모지 자산의 face 색이며, orange는 시맨틱 warning에 한정된다.

### Semantic palette

`red-500`은 TDS 발행값이다 [src:12][src:13]. `red-600`·`green-500`·`navy-900`은 번들 `colors_and_type.css`의 값이다. `red-600`은 번들에서 `red-500`과 거의 같은 색이고, 시맨틱 success인 `green-500`은 발행 `green500`보다 훨씬 어두워 같은 색이 아니다.

### Illustration warms (brown facial features)

원본 hex는 `colors_and_type.css`에 정의되어 있으며, 본 문서는 OKLCH로 변환해 표기한다. brown 패밀리는 yellow-faced 일러스트 자산의 facial feature 색이며 UI 표면에는 사용되지 않는다.

### Semantic alpha tokens

원본 정의는 `colors_and_type.css`의 RGBA 토큰이며, 본 문서는 OKLCH alpha 표기로 변환한다. navy-900을 베이스로 한 투명도 계열은 본문 보조 텍스트·헤어라인·스크림에 사용된다.

### Dark palette (TDS adaptive)

`@toss/tds-colors`는 다크 팔레트를 **같은 이름**으로 발행한다 — `colors.dark.css`의 `grey900`은 흰색이고 `grey50`은 가장 어두운 회색이라, 이름이 역할(텍스트·표면)을 따르고 명도는 테마에 맞춰 뒤집힌다 [src:12]. 본 문서는 라이트에서 이름이 대응한다고 판정한 15개만 `dark-` 접두로 옮겼다. 다크 grey는 라이트 grey(색상각 248~258)와 달리 색상각 285~286에 채도 0.02 이하인, 무채색에 가까운 중성색이다.

### Semantic alias

product-facing 색은 시맨틱·컴포넌트 토큰으로 호출하고 base 팔레트는 새 role을 만들 때만 직접 참조한다 [src:3].

새 번들(`HI3LORQulbJJqdr-BrZGMQ`)의 `colors_and_type.css`는 같은 카노니컬 값에 매핑되는 **4-카테고리 정식 변수명**(`--tds-fg-*` / `--tds-bg-*` / `--tds-line-*` / `--tds-press-overlay` / `--tds-disabled-opacity`)을 함께 export한다 — 위 단축 alias가 catalog 문서 관행이라면, 아래 매핑은 prototype에 그대로 inline할 수 있는 CSS custom property 이름이다.

색 대비 자동 보정 — 미니앱이 자체 brand 컬러를 등록할 때, 등록된 색이 색 대비 기준을 충족하지 못하면 원래 색을 최대한 유지하는 선에서 자동 보정된다 [src:6]. 토큰 빌드는 Token Studio(Figma 플러그인) → GitHub PR → 플랫폼별 코드 자동 생성 파이프라인을 거친다 [src:3].

## Typography

본문/UI 서체는 **Toss Product Sans (TPS)**다 [src:8]. 토스가 산돌(2020)과 공동 제작한 자체 서체이며, iOS의 SF, Windows의 맑은 고딕, Android 기본 서체로 플랫폼별 파편화되어 있던 토스 화면을 단일 서체로 통합하기 위해 만들어졌다 [src:8]. 한글 자형은 산돌의 고딕 Neo1을 기반으로 미세 조정되었고, 라틴·문장부호·기타 글리프는 한글 디자인에 맞춰 새로 그려졌다 [src:8]. 디자인 3대 기준은 (1) **밸런스** — 라틴/숫자가 통상 본문 서체보다 크게 그려져 한글과 시각적으로 화합한다, (2) **금융 맥락** — 특수문자(%, comma, 화살표)는 텍스트가 아니라 UI 요소로 재설계되었다, (3) **중립 형태** — "글자 대신 글이, 형태 대신 내용이 보일 수 있도록" 콘텐츠를 가리지 않는 형태를 지향한다 [src:8].

TPS는 자체 라이선스가 적용되어 외부 재배포가 불가능하다. 핸드오프 번들과 토스의 외부 권장 사항은 **Pretendard**를 가장 가까운 무료 한+영 neogrotesque 대체 서체로 명시한다 — 메트릭·한글 자형·tabular figure가 TPS와 거의 1:1로 일치한다. 번들의 폰트 스택:

### Type ramp (모든 값 `colors_and_type.css`에서 직접 추출)

display 웨이트는 Bold 700에 tight -1.5%~-2% 트래킹으로 무게감을 잡고, 본문은 15px Regular + 1.5 line-height — 한글 가독성을 위해 1.5가 표준이다. 버튼은 XL/L에서 Bold 700 17px, M/S에서 Semibold 15~13px을 쓴다 — "토스 버튼은 장식이 아니라 문장처럼 읽힌다". 카드 타이틀은 `title-1`(18/600), 카드 본문은 `body-2`(15/400)다.

### 숫자/기호 처리

TPS는 variable·fixed-width 두 폭을 모두 제공하며, 실시간 금융 데이터(주가·환율·잔액)는 tabular figure로, 강조 시 proportional figure를 사용한다 [src:8]:

`tabular-nums`는 실시간 금융 데이터에, `proportional-nums`는 강조 시 — 한국 핀테크 앱에서 보기 드문 본격적 숫자 타이포 분리다 [src:8]. 글자 수는 초기 2,350자에서 한글 완성형 전체 11,172자로 확장되어 인앱 타이핑·메시징을 지원한다 [src:8].

### Tossface (이모지 서체)

`{fonts.font-family-emoji}`는 Unicode v14.0 전체 셋을 커버하는 자체 이모지 폰트로, TTF/OTF/WOFF/WOFF2로 제공되며 "단순한 형태와 최소한의 묘사"를 지향한다 [src:7]. 작은 사이즈에서도 의미가 분명히 읽히도록 설계되었다.

숫자 표기는 `font-feature-settings`로 가른다 — 표·금액에는 고정폭, 산문에는 비례폭이다:

- `font-feature-numeric-tabular`: "tabular-nums"
- `font-feature-numeric-proportional`: "proportional-nums"

## Spacing

베이스 단위는 4px이며, 토큰 사다리는 4~80px 12단계로 정의된다:

작은 영역(4~32)에서는 모든 4의 배수 단계를 갖고 있으며, 큰 영역(40 이상)은 섹션 구분을 위한 generous한 간격으로 운영된다. 시스템 룰 오브 섬: **24px** 화면 outer padding, **16px** list-row 간 간격, **8px** 밀접 결합 요소(label + input) 사이.

## Rounded

라운드 토큰은 4~32px 8단계 + `full`(999px) 한 단계로 정의되며, 토스 시스템은 "**프로덕션에서 가장 둥근 모바일 시스템 중 하나**"로 분류된다:

버튼 라운드는 사이즈에 따라 스케일된다 — XL 16 / L 14 / M 12 / S 10, `buttons.html` preview로 확인된다. iOS류 squircle/blob 라운드는 `Templates/Squircle` 전용 페이지를 제외하면 사용되지 않는다.

## Elevation & Depth

토스는 평면이 기본이며 그림자는 floating/modal 표면에서만 등장한다. shadow offset과 blur 값은 `colors_and_type.css`에서 직접 인용되며, 색은 모두 navy-900 베이스의 낮은 알파(0.04~0.16)로 통일된다.

bottom-sheet shadow는 README에 명시된 컨벤션이지만 토큰은 아니다 — `0 -2px 12px oklch(0.155 0.060 261 / 0.06)`. inner-shadow 시스템은 없으며, pressed state는 `{colors.press-overlay}`(검정 26% overlay)를 resting fill 위에 얹는 방식으로 구현된다 — 그림자가 아니라 overlay다.

### Motion

```text
ease:     cubic-bezier(0.22, 0.61, 0.36, 1)   # 기본 ease-out-expo
ease-out: cubic-bezier(0.16, 1,    0.3,  1)   # 더 snappy, sheet 진입
dur-fast: 120                                  # button press
dur-base: 200                                  # toggle, hover
dur-slow: 320                                  # sheet, dialog
```

"바운스 오버슈트 없음, 320ms 초과 fade 없음, parallax 없음, skeleton shimmer 없음 — 토스는 3-dot loader를 대신 쓴다". 모든 모션은 위 5개 토큰 안에서 운용된다.

## Shapes

기하학은 **공격적 라운드 + 평면 표면 + 헤어라인 보더**로 요약된다. 차분한 화이트 캔버스 위에 16~32px 라운드 카드/버튼을 얹고, chips와 primary CTA에는 999px full pill을 적용한다. 강조는 색(토스 블루)과 위계로 표현하며 장식은 절제된다.

기본 보더는 **1px `{colors.grey-200}` 헤어라인**이며, focused input은 1.5px `{colors.border-primary}` (blue-500) 보더로 한 단계 강해진다. 2px 장식용 보더는 사용되지 않고, 컬러 left-rail accent 카드도 사용되지 않는다. 배경은 평면이 기본이며 그라디언트는 세 가지 문서화된 예외(bottom CTA 위쪽 보호 그라디언트, 로딩 버튼 radial glow, yellow→orange 일러스트 그라디언트)에만 허용된다.

## Components

- **button**: XL (56px, radius 16), L (48px, radius 14), M (40px, radius 12), S (32px, radius 10)
- **button-primary**: fill `#3182F6` (blue-500), text `#FFFFFF`
- **button-secondary**: fill `#F2F4F6` (grey-100), text `#191F28` (grey-900)
- **bottom-cta**: 56px height, full width fixed at bottom with white-to-transparent protection gradient
- **list-row**: 44px avatar / icon (radius 14), title / subtitle stack, right action or chevron
- **chip / badge**: 34px full pill chip (bg `#E8F3FF`, text `#3182F6`), 22px badge (radius 6px)
- **toast**: fill `#191F28` (grey-900), text white, radius 14px, green-500 20px check icon
- **card / section**: flat white `#FFFFFF`, radius 20~24px (`radius-2xl` / `radius-3xl`), 1px `#E5E8EB` or subtle divider, resting on `#F2F4F6` / `#F9FAFB` background.

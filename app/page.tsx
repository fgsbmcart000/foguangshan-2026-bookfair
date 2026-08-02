"use client";

import { useState } from "react";

const navigation = [
  ["關於書展", "about"],
  ["活動亮點", "highlights"],
  ["每日行程", "schedule"],
  ["線上書展", "online"],
  ["教育推廣", "education"],
  ["攤位一覽", "booths"],
  ["參觀資訊", "visit"],
] as const;

const highlights = [
  {
    number: "01",
    title: "吉祥好好看",
    subtitle: "賞吉祥",
    color: "blue",
    text: "從主題書展、洪易戶外雕塑展、行動書車、藝文特展到名家講座與千人抄經，在閱讀與美感體驗中，感受文化、祝福與生命關懷。",
    tags: ["書展", "戶外雕塑展", "名家講座", "千人抄經"],
  },
  {
    number: "02",
    title: "吉祥好好吃",
    subtitle: "品吉祥",
    color: "green",
    text: "響應世界純素月，集結蔬食博覽會、綠色飲食、千人茶禪與千人素食 Buffet，從一餐蔬食開始，實踐健康、慈悲與低碳生活。",
    tags: ["蔬食博覽會", "綠色飲食", "千人茶禪", "千人素食宴"],
  },
  {
    number: "03",
    title: "吉祥好好玩",
    subtitle: "樂吉祥",
    color: "orange",
    text: "戲曲《九色鹿》、故事屋、龍火車與馬車、三好兒童體驗館及環教列車，讓親子在互動中共學、共遊，留下充滿歡笑的吉祥記憶。",
    tags: ["九色鹿", "故事屋", "龍火車與馬車", "環教列車"],
  },
];

const schedule = [
  {
    date: "11/7",
    day: "六",
    items: [
      ["09:00", "書展、蔬食博覽會正式開展", "風雨長廊"],
      ["10:30", "開幕式", "本館大覺堂"],
      ["16:00", "千人茶禪", "菩提廣場"],
      ["17:30", "千人素食 Buffet", "菩提廣場"],
    ],
  },
  {
    date: "11/8",
    day: "日",
    items: [
      ["09:00", "吉祥動物派對・全館活動", "佛陀紀念館"],
      ["11:00", "龍火車與馬車", "成佛大道"],
      ["14:00", "名家講座", "禮敬大廳五觀堂"],
    ],
  },
  {
    date: "11/9",
    day: "一",
    items: [
      ["09:30", "龍火車與馬車", "成佛大道"],
      ["10:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["13:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["14:00", "名家講座", "禮敬大廳五觀堂"],
    ],
  },
  {
    date: "11/10",
    day: "二",
    items: [
      ["09:30", "龍火車與馬車", "成佛大道"],
      ["10:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["13:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["14:00", "名家講座", "禮敬大廳五觀堂"],
    ],
  },
  {
    date: "11/11",
    day: "三",
    items: [
      ["09:30", "龍火車與馬車", "成佛大道"],
      ["10:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["13:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["14:00", "名家講座", "禮敬大廳五觀堂"],
    ],
  },
  {
    date: "11/12",
    day: "四",
    items: [
      ["09:30", "龍火車與馬車", "成佛大道"],
      ["10:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["13:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["14:00", "名家講座", "禮敬大廳五觀堂"],
    ],
  },
  {
    date: "11/13",
    day: "五",
    items: [
      ["09:30", "龍火車與馬車", "成佛大道"],
      ["10:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["13:30", "戲曲好好玩《九色鹿》", "本館大覺堂"],
      ["18:00", "書展暨蔬食博覽會圓滿", "佛陀紀念館"],
    ],
  },
];

const onlineCategories = [
  ["環境教育", "與自然共生的閱讀選書"],
  ["養生健康", "照顧身心的生活提案"],
  ["品德生命", "陪伴孩子成長的好故事"],
  ["心靈成長", "在字裡行間安住自己"],
  ["外文精選", "打開世界視野的閱讀"],
];

const activityOverview = [
  ["好好看", "書展", "精選環境教育、養生健康、品德生命、心靈成長與外文讀物，透過多元主題選書，讓親子以閱讀拓展視野、培養思考與良好品格。", "11/7（六）–11/13（五）", "09:00–18:00", "風雨長廊"],
  ["好好看", "雲水書坊－行動圖書館", "全台雲水書車回到佛館大會師，把優良好書送進偏鄉。會飛的書車象徵孩子藉由閱讀與知識，獲得展翅飛翔的力量。", "11/7（六）–11/13（五）", "09:00–18:00", "成佛大道"],
  ["好好看", "文化深耕・書香生活・閱讀閱有趣", "延續星雲大師愛讀書的精神，透過公益閱讀與圖書推廣關懷偏鄉弱勢孩童，鼓勵孩子養成閱讀習慣、走進廣闊知識世界。", "11/7（六）", "配合開幕式", "本館大覺堂"],
  ["好好看", "洪易戶外雕塑展", "台灣藝術家洪易以飽滿色彩、奔放造形與吉祥圖騰創作動物雕塑，將傳統文化轉化為歡樂、當代且適合親子共賞的戶外藝術風景。", "11/7（六）–11/13（五）", "09:00–18:00", "萬人照相台及館內戶外草地"],
  ["好好看", "走進有熊國", "從台灣黑熊保育出發，透過情境展示與互動學習認識熊類生態、人熊衝突預防及安全應對，培養尊重生命、與野生動物共存的觀念。", "11/7（六）–11/13（五）", "09:00–18:00", "禮敬大廳二樓迴廊"],
  ["好好看", "鈷藍猶珍－震旦典藏元青花特展", "走進幽藍與純白交織的瓷器世界，欣賞元代青花的工藝、紋飾與文化交流軌跡，感受凝結於瓷土之上的歷史篇章。", "11/7（六）–11/13（五）", "09:00–18:00", "本館二樓第一展廳"],
  ["好好看", "菩提心起－國立歷史博物館典藏佛像特展", "精選不同時代、材質與造形的典藏佛像，呈現佛教藝術在歷史流轉中的多元樣貌，引領觀眾於靜觀中體會莊嚴氣韻與文化內涵。", "11/7（六）–11/13（五）", "09:00–18:00", "本館二樓第二展廳"],
  ["好好看", "海洋未來式巡迴特展", "以海洋科學、環境變遷與永續行動為主軸，邀請觀眾從理解海洋開始，思考人類與藍色星球的關係，回應淨零與永續發展課題。", "11/7（六）–11/13（五）", "09:00–18:00", "本館二樓第三展廳"],
  ["好好看", "名家講座", "邀請醫療健康、野生動物保育、博物館研究與媒體文化等領域專家分享，以深入淺出的專題與現場交流，帶來跨領域新知。", "11/8（日）–11/12（四）", "14:00–15:30", "禮敬大廳五觀堂"],
  ["好好看", "千人抄經", "在專注寧靜的抄寫中安定身心、沉澱思緒，從一筆一畫覺察內在，體會心保與環保相互呼應的生活修持。", "11/7（六）–11/13（五）", "10:00–17:00", "大佛平台抄經堂"],
  ["好好吃", "蔬食博覽會", "集結台灣在地特色食品、蔬果、農產加工品、茶藝、生活選物與保健商品，從試吃與選購中體驗美味、健康的蔬福生活。", "11/7（六）–11/13（五）", "09:00–18:00", "風雨長廊"],
  ["好好吃", "綠色飲食", "全館滴水坊供應蔬食，優先運用在地食材，從一餐開始實踐低碳、健康與護生理念，讓友善地球成為可持續的日常選擇。", "11/7（六）–11/13（五）", "依各滴水坊用餐時間", "各滴水坊"],
  ["好好吃", "千人茶禪", "由小茶師以恭敬專注之心奉茶、奉茶點與茶飯禪，帶領大眾在品茗與儀式中慢下來，體悟「禪即生活、生活即禪」。", "11/7（六）", "16:00–17:30", "菩提廣場"],
  ["好好吃", "千人素食 Buffet", "響應世界純素月，以低碳飲食、在地農產及多元蔬食料理打造千人共享的綠色盛宴，從豐富滋味感受蔬食的創意與可能。", "11/7（六）", "17:30–18:30", "菩提廣場"],
  ["好好玩", "戲曲好好玩《九色鹿》", "台北新劇團以經典寓言演繹誠信與善良，結合戲曲身段、音樂、角色互動與兒童參與，讓孩子在歡笑中親近傳統戲曲。", "11/9（一）–11/13（五）", "10:30、13:30（各30分鐘）", "本館大覺堂"],
  ["好好玩", "三好兒童體驗館", "跟隨小沙彌「歡喜」體驗三好轉盤、3D 劇院與多媒體互動，在遊戲中認識「做好事、說好話、存好心」，把三好帶回生活。", "11/7（六）–11/13（五）", "09:00–18:00", "二眾塔"],
  ["好好玩", "大樹下的故事屋", "由校長與老師為孩子說故事，結合生態解說、綠色消費、資源回收與親子環保手作，從故事與實作種下善念和環保種子。", "11/7（六）–11/13（五）", "09:00–16:00", "犀牛區"],
  ["好好玩", "佛光環教列車", "串連環保行動、生命尊重、植物生態與蔬食推廣四大環教主題，透過關卡體驗把「心的環保」轉化為惜水、惜物與護生行動。", "11/7（六）–11/13（五）", "09:00–17:00", "二眾塔、四給塔、七誡塔"],
  ["好好玩", "佛教植物園區", "走進全台首座佛教植物園區，從經典故事、植物知識與自然觀察認識佛教植物，感受綠色博物館的生命力與生態之美。", "11/7（六）–11/13（五）", "09:00–18:00", "佛教植物園區"],
  ["好好玩", "龍火車與馬車", "搭乘龍火車穿梭成佛大道，或體驗歐式馬車的悠閒步調，與家人從不同角度欣賞佛館景致，重溫充滿童趣的遊園時光。", "11/8（日）–11/13（五）", "假日11:00–17:00／平日09:30–15:30", "成佛大道"],
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <a className="skip-link" href="#content">跳至主要內容</a>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="回到首頁">
          <span className="brand-mark">吉</span>
          <span>
            <strong>佛光山 2026 書展暨蔬食博覽會</strong>
            <small>吉祥動物派對</small>
          </span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="開啟網站選單"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="主要選單">
          {navigation.map(([label, id]) => (
            <a href={`#${id}`} key={id} onClick={closeMenu}>{label}</a>
          ))}
        </nav>
      </header>

      <section className="hero" id="top" aria-label="活動主視覺">
        <picture>
          <source media="(max-width: 640px)" srcSet="/assets/hero-vertical.jpg" />
          <img
            src="/assets/hero-horizontal.jpg"
            alt="佛光山2026年書展暨蔬食博覽會，吉祥動物派對，11月7日至13日於佛光山佛陀紀念館舉行"
          />
        </picture>
        <a className="hero-scroll" href="#about">
          <span>向下探索</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <div id="content">
        <section className="section about-section" id="about">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">About the fair</p>
              <h1>關於書展</h1>
            </div>
            <p className="lead">
              從閱讀延伸至蔬食探索，打造一場融合互動參與、沉浸體驗、文化藝術與環境教育的全感官生活之旅。
            </p>
          </div>

          <div className="about-grid">
            <article className="story-card">
              <span className="paint-dot dot-yellow" />
              <span className="paint-dot dot-blue" />
              <p>
                佛光山長年秉持「以教育培養人才、以文化弘揚佛法」的宗旨，以「三好」與「四給」為核心價值，自 2013 年起舉辦書展暨蔬食博覽會，持續關懷偏鄉、推動人文教育與蔬食文化。
              </p>
              <p>
                2026 年以「吉祥動物派對」為主題，透過台灣藝術家洪易充滿生命力的吉祥動物，傳遞和諧共生、圓滿祝福與美好生活的想像。
              </p>
            </article>
            <div className="info-stack">
              <div className="info-card teal-card">
                <span className="info-icon" aria-hidden="true">日</span>
                <div><small>活動日期</small><strong>2026.11.07 — 11.13</strong></div>
              </div>
              <div className="info-card cream-card">
                <span className="info-icon" aria-hidden="true">時</span>
                <div><small>開放時間</small><strong>平日 09:00–18:00<br />假日 09:00–19:00</strong></div>
              </div>
              <div className="info-card yellow-card">
                <span className="info-icon" aria-hidden="true">地</span>
                <div><small>活動地點</small><strong>佛光山佛陀紀念館</strong></div>
              </div>
              <div className="free-badge"><span>FREE</span> 免費參觀</div>
            </div>
          </div>
        </section>

        <section className="section highlight-section" id="highlights">
          <div className="section-heading centered">
            <p className="eyebrow">Auspicious animal festival</p>
            <h2>三大活動亮點</h2>
            <p>吉祥好好看・吉祥好好吃・吉祥好好玩</p>
          </div>
          <div className="highlight-grid">
            {highlights.map((item) => (
              <article className={`highlight-card ${item.color}`} key={item.title}>
                <span className="highlight-number">{item.number}</span>
                <div className="animal-symbol" aria-hidden="true">
                  {item.number === "01" ? "◉" : item.number === "02" ? "❀" : "✦"}
                </div>
                <small>{item.subtitle}</small>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="tag-list">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section overview-section" aria-labelledby="overview-title">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Program overview</p>
              <h2 id="overview-title">活動一覽表</h2>
            </div>
            <p className="lead">依企劃書彙整主要活動日期、時間及場地，出發前可快速查找想參加的活動。</p>
          </div>
          <div className="overview-table-wrap" tabIndex={0} aria-label="活動一覽表，可左右捲動">
            <table className="overview-table">
              <thead>
                <tr><th>主題</th><th>活動名稱與內容</th><th>日期</th><th>時間</th><th>地點</th></tr>
              </thead>
              <tbody>
                {activityOverview.map(([theme, title, description, date, time, place]) => (
                  <tr key={title}>
                    <td><span className={`theme-pill ${theme}`}>{theme}</span></td>
                    <th scope="row"><strong>{title}</strong><small>{description}</small></th>
                    <td>{date}</td>
                    <td>{time}</td>
                    <td>{place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="overview-note">※ 活動內容、場次與地點如有調整，以主辦單位最新公告為準。</p>
        </section>

        <section className="section schedule-section" id="schedule">
          <div className="section-heading centered light-heading">
            <p className="eyebrow">Daily program</p>
            <h2>每日行程</h2>
            <p>選擇日期，快速掌握當天重點活動</p>
          </div>
          <div className="date-tabs" role="tablist" aria-label="活動日期">
            {schedule.map((day, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeDay === index}
                className={activeDay === index ? "active" : ""}
                key={day.date}
                onClick={() => setActiveDay(index)}
              >
                <strong>{day.date}</strong><span>週{day.day}</span>
              </button>
            ))}
          </div>
          <div className="timeline" role="tabpanel">
            <div className="timeline-date">
              <small>2026 NOV.</small>
              <strong>{schedule[activeDay].date.split("/")[1]}</strong>
              <span>星期{schedule[activeDay].day}</span>
            </div>
            <div className="timeline-items">
              {schedule[activeDay].items.map(([time, title, place]) => (
                <div className="timeline-row" key={`${time}-${title}`}>
                  <time>{time}</time>
                  <span className="timeline-dot" />
                  <div><strong>{title}</strong><small>⌖ {place}</small></div>
                </div>
              ))}
              <p className="schedule-note">※ 完整場次與講者資訊將依主辦單位最新公告更新。</p>
            </div>
          </div>
        </section>

        <section className="section online-section" id="online">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Online book fair</p>
              <h2>線上書展</h2>
            </div>
            <p className="lead">讓好書不受距離限制。2026 主題選書與參展出版社書單將陸續上線。</p>
          </div>
          <div className="online-shell">
            <div className="coming-soon">
              <span className="book-lines" aria-hidden="true">冊</span>
              <p>2026 線上書展</p>
              <h3>精選書單・即將上線</h3>
              <span>敬請期待</span>
            </div>
            <div className="category-list">
              {onlineCategories.map(([title, text], index) => (
                <div className="category-row" key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{title}</strong><small>{text}</small></div>
                  <i aria-hidden="true">↗</i>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section education-section" id="education">
          <div className="education-layout">
            <div className="education-copy">
              <p className="eyebrow">Education outreach</p>
              <h2>教育推廣</h2>
              <p>
                結合校外教學與十二年國教核心素養，從語文、品德、生活、健康到環境教育，讓學生在互動中學習、在體驗中感悟，實踐「三好四給」。
              </p>
              <div className="education-tags">
                <span>品德教育</span><span>環境教育</span><span>閱讀教育</span><span>健康促進</span><span>多元文化</span>
              </div>
              <button className="outline-button" type="button" disabled>校外教學報名・即將開放</button>
            </div>
            <div className="education-cards">
              <article><span>01</span><h3>主題闖關</h3><p>以吉祥動物與三好四給為線索，在任務中建立品德與社會參與。</p></article>
              <article><span>02</span><h3>生命教育</h3><p>從故事、生態與動物共生議題，學習尊重生命、珍惜資源。</p></article>
              <article><span>03</span><h3>環教體驗</h3><p>串連環保行動、植物生態與蔬食推廣，讓永續落實於日常。</p></article>
              <article><span>04</span><h3>閱讀推廣</h3><p>透過主題選書、故事屋與行動書車，讓閱讀成為探索世界的起點。</p></article>
            </div>
          </div>
        </section>

        <section className="section booth-section" id="booths">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Exhibitor directory</p>
              <h2>攤位一覽</h2>
            </div>
            <p className="lead">書展、蔬食與友善生活品牌齊聚風雨長廊，完整名單與攤位圖將於核定後公布。</p>
          </div>
          <div className="booth-board">
            <div className="booth-categories">
              <article><span>BOOK</span><strong>主題書展</strong><small>出版・閱讀・文化</small></article>
              <article><span>VEGGIE</span><strong>蔬食好味</strong><small>餐飲・食品・茶飲</small></article>
              <article><span>LOCAL</span><strong>在地好物</strong><small>農產・加工・伴手禮</small></article>
              <article><span>LIFE</span><strong>綠色生活</strong><small>健康・環保・質感選物</small></article>
            </div>
            <div className="booth-status"><span>名單整理中</span><strong>完整攤位圖即將公開</strong><p>主辦單位將於參展商與位置確認後更新此頁。</p></div>
          </div>
        </section>

        <section className="section visit-section" id="visit">
          <div className="section-heading centered">
            <p className="eyebrow">Plan your visit</p>
            <h2>參觀資訊</h2>
            <p>免費入場，邀請全家一起來佛館讀好書、食好蔬、賞吉祥</p>
          </div>
          <div className="visit-grid">
            <article className="venue-card">
              <div className="map-pattern" aria-hidden="true"><span>佛</span></div>
              <div>
                <small>活動地點</small>
                <h3>佛光山佛陀紀念館</h3>
                <p>高雄市大樹區統嶺路 1 號</p>
                <a href="https://maps.google.com/?q=佛光山佛陀紀念館" target="_blank" rel="noreferrer">開啟 Google 地圖 ↗</a>
              </div>
            </article>
            <div className="travel-cards">
              <article><span>車</span><div><h3>自行開車</h3><p>國道 10 號「旗山大樹交流道」下，接省道 29 號右轉前往佛光山佛陀紀念館。</p></div></article>
              <article><span>時</span><div><h3>開放時間</h3><p>週一至週五 09:00–18:00<br />週六至週日 09:00–19:00</p></div></article>
              <article><span>禮</span><div><h3>開幕典禮</h3><p>11 月 7 日（六）10:30<br />佛陀紀念館本館大覺堂</p></div></article>
            </div>
          </div>
          <div className="notice-bar"><strong>參觀提醒</strong><span>戶外活動建議準備防曬、防雨用品與環保水瓶；最新交通及活動異動以主辦單位公告為準。</span></div>
        </section>
      </div>

      <footer>
        <div className="footer-title"><span>吉</span><div><strong>佛光山 2026 年書展暨蔬食博覽會</strong><small>Fo Guang Shan 2026 Book Fair and Vegetarian Expo</small></div></div>
        <div className="footer-orgs"><p>指導單位｜教育部</p><p>主辦單位｜環境部、高雄市政府、財團法人人間文教基金會</p></div>
        <p className="copyright">© 2026 Fo Guang Shan Book Fair & Vegetarian Expo</p>
      </footer>
    </main>
  );
}

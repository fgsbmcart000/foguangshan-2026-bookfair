"use client";

import { useEffect, useRef, useState } from "react";

const navigation = [
  ["關於書展", "about"],
  ["活動亮點", "highlights"],
  ["每日活動表", "schedule"],
  ["教育推廣", "education"],
  ["線上書展", "online"],
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

const bookShowcase = [
  ["與自然一起閱讀", "環境教育", "從日常觀察認識土地、生態與萬物共生。"],
  ["小小生態觀察家", "環境教育", "陪孩子發現植物、昆蟲與四季變化。"],
  ["海洋的未來式", "環境教育", "理解海洋環境，從閱讀開始守護藍色星球。"],
  ["低碳生活練習", "環境教育", "把惜物、減塑與節能化為每日行動。"],
  ["一日好食光", "養生健康", "從均衡飲食與規律生活照顧自己。"],
  ["身心安住的日常", "養生健康", "在忙碌生活中找回呼吸與安定。"],
  ["四季養生提案", "養生健康", "跟著節氣調整飲食、作息與身體感受。"],
  ["樂活蔬食餐桌", "養生健康", "用豐富植物食材創造健康美味。"],
  ["做好事的力量", "品德生命", "從小小善行開始，為身邊帶來溫暖。"],
  ["說好話的練習", "品德生命", "學習傾聽、表達與真誠溝通。"],
  ["存好心的故事", "品德生命", "用善念理解自己，也關懷他人。"],
  ["勇敢與善良", "品德生命", "陪伴孩子面對選擇、責任與成長。"],
  ["親子共讀時光", "品德生命", "在故事與對話中累積家庭記憶。"],
  ["和情緒做朋友", "品德生命", "認識感受，練習溫柔地照顧內心。"],
  ["生命中的好故事", "品德生命", "從真實故事體會珍惜、感恩與希望。"],
  ["成長路上的光", "品德生命", "在挫折與改變中發現自己的力量。"],
  ["靜心閱讀課", "心靈成長", "以閱讀沉澱思緒，重新看見內在。"],
  ["日常裡的禪意", "心靈成長", "在吃飯、行走與工作中練習專注。"],
  ["慈悲的力量", "心靈成長", "從理解與包容出發，建立溫柔關係。"],
  ["書寫自己的心", "心靈成長", "透過閱讀與書寫整理生命經驗。"],
  ["世界故事選讀", "外文精選", "從不同文化的故事打開國際視野。"],
  ["雙語自然探索", "外文精選", "用雙語閱讀認識動物與自然環境。"],
  ["文化旅行讀本", "外文精選", "在文字與圖像中走訪多元世界。"],
  ["外文圖畫書精選", "外文精選", "以優美圖像陪伴孩子跨語言閱讀。"],
] as const;

const boothShowcase = [
  ["植感漢堡", "西式蔬食", "植物排、鮮蔬與特製醬料組成的飽足人氣餐點。"],
  ["酥香蔬食小點", "台式點心", "外酥內嫩的經典小吃，適合全家一起分享。"],
  ["香麻蔬食燙", "暖心料理", "多種蔬菜、豆製品與菇類自由搭配。"],
  ["手作蔬食水餃", "麵食點心", "新鮮時蔬入餡，呈現清甜扎實口感。"],
  ["古早味拌麵", "台式麵食", "香氣濃郁的拌醬與彈牙麵條簡單耐吃。"],
  ["椰香蔬食咖哩", "異國料理", "溫潤香料與根莖蔬菜熬煮出豐富層次。"],
  ["五穀能量飯糰", "輕食料理", "穀物、蔬菜與植物蛋白的便利組合。"],
  ["彩蔬薄餅披薩", "西式蔬食", "薄脆餅皮搭配繽紛蔬菜與香草。"],
  ["元氣蔬食便當", "健康餐盒", "兼顧蛋白質、蔬菜與全穀的均衡餐盒。"],
  ["植物肉串燒", "創意料理", "醬香炙烤風味，展現植物料理新口感。"],
  ["香煎蘿蔔糕", "台式點心", "外層微酥、內裡柔軟的熟悉好滋味。"],
  ["鮮蔬手作春捲", "輕食料理", "以當季蔬菜包入清爽口感與自然甜味。"],
  ["濃醇豆乳飲", "植物飲品", "豆香溫潤，適合搭配各式蔬食餐點。"],
  ["繽紛鮮果飲", "天然飲品", "以新鮮水果調和出清爽自然風味。"],
  ["台灣好茶", "茶飲", "精選茶葉沖泡，感受甘醇回韻與土地香氣。"],
  ["植感咖啡", "咖啡飲品", "咖啡搭配植物奶，呈現柔和滑順口感。"],
  ["古早味豆花", "傳統甜品", "細緻豆花搭配配料，清爽而不甜膩。"],
  ["季節水果冰品", "清涼甜品", "用當季水果帶來自然酸甜與沁涼口感。"],
  ["純植物甜點", "烘焙甜品", "不使用蛋奶也能呈現細膩香甜風味。"],
  ["手作蔬食烘焙", "烘焙點心", "麵包與小點以單純食材展現溫暖香氣。"],
  ["原味堅果小舖", "健康零食", "保留堅果原味與營養，方便隨身補充。"],
  ["自然果乾", "在地好物", "低度加工保留水果風味與自然甜香。"],
  ["友善在地農產", "產地直送", "從產地認識當季蔬果與支持友善耕作。"],
  ["蔬食特色伴手禮", "精選好物", "將健康、環保與地方風味一起帶回家。"],
] as const;

const catalogAnimals = [
  "/assets/animal-icons/owl.png",
  "/assets/animal-icons/bear.png",
  "/assets/animal-icons/deer.png",
  "/assets/animal-icons/turtle.png",
  "/assets/animal-icons/rabbit.png",
  "/assets/animal-icons/whale.png",
  "/assets/animal-icons/rhino.png",
  "/assets/animal-icons/giraffe.png",
] as const;

const bookPlaceholderImages = [
  "/assets/catalog/_templates/book-01.jpg",
  "/assets/catalog/_templates/book-02.jpg",
  "/assets/catalog/_templates/book-03.jpg",
  "/assets/catalog/_templates/book-04.jpg",
] as const;

const foodPlaceholderImages = [
  "/assets/catalog/_templates/food-01.jpg",
  "/assets/catalog/_templates/food-02.jpg",
  "/assets/catalog/_templates/food-03.jpg",
  "/assets/catalog/_templates/food-04.jpg",
] as const;

const itemNumber = (index: number) => String(index + 1).padStart(2, "0");
const bookCoverAsset = (bookIndex: number) => `/assets/catalog/books/book-${itemNumber(bookIndex)}-cover.jpg`;
const bookPageAsset = (bookIndex: number, pageIndex: number) => pageIndex === 0
  ? bookCoverAsset(bookIndex)
  : `/assets/catalog/books/book-${itemNumber(bookIndex)}-page-${itemNumber(pageIndex)}.jpg`;
const foodCoverAsset = (foodIndex: number) => `/assets/catalog/food/booth-${itemNumber(foodIndex)}-cover.jpg`;
const foodPhotoAsset = (foodIndex: number, photoIndex: number) => photoIndex === 0
  ? foodCoverAsset(foodIndex)
  : `/assets/catalog/food/booth-${itemNumber(foodIndex)}-photo-${itemNumber(photoIndex)}.jpg`;

const BOOK_DETAIL_PAGE_COUNT = 10;
const FOOD_PHOTO_COUNT = 4;

const activityOverview = [
  ["好好看", "書展", "內容涵蓋環境教育、養生、品德、心靈成長、外文類，從閱讀的力量療癒心靈、培養世界觀、增進自信、強化思考。透過閱讀的共同話題，讓親子間的互動更緊密，讓孩子從小養成良好的閱讀習慣，進而潛移默化成為有品德的人。", "11/7（六）–11/13（五）", "09:00–18:00", "風雨長廊"],
  ["好好看", "文化深耕 書香生活 閱讀閱有趣", "佛光山慈悲社會福利基金會效法愛讀書的星雲大師，連續推動「文化深耕 書香生活 閱讀閱有趣」活動。於書展期間，每年都有來自偏鄉的千位弱勢孩童受惠，期望透過全民閱讀風氣，帶動孩童習慣閱讀，翱翔在廣闊的知識海裡。", "11/7（六）", "配合書展開幕式", "大覺堂"],
  ["好好看", "雲水書坊－行動圖書館", "星雲大師讓「雲水書坊－行動圖書館」從想像變成真實，以願力慈光照耀偏鄉孩子，讓他們藉著閱讀的光明邁向未來。會飛的書車象徵人們只要有願力，就能飛翔；只要經過「改裝」讀了書、明了理，就能獲得心靈的自由。", "11/7（六）–11/13（五）", "09:00–18:00", "成佛大道"],
  ["好好看", "三羊和順－洪易藝術創作特展", "延續洪易繽紛鮮明的創作風格與富含文化寓意的藝術語彙，作品色彩飽滿、造形奔放，融合民間美學、吉祥象徵與生活感知。觀眾可近距離感受藝術家如何將傳統文化轉化為充滿時代感的視覺表現，體會圓滿、祝福與共融的美好意象。", "11/7（六）–11/13（五）", "09:00–18:00", "萬人照相台及館內戶外草地"],
  ["好好看", "佛光山宗史館常設展－佛光山開山祖師星雲大師", "依企劃書活動項目規劃為常設展更新內容，帶領觀眾透過展陳脈絡認識佛光山的人文精神、教育理念與弘法歷程。詳細展品、動線與展覽說明，可待主辦單位提供正式資料後補入。", "11/7（六）–11/13（五）", "依現場公告", "佛光山宗史館"],
  ["好好看", "國立海洋科學博物館：海洋未來式巡迴特展", "海洋孕育生命，也承受人類活動與氣候變遷帶來的壓力。「海洋未來式」以海洋為核心、以未來為視角，聚焦地球氣候觀測、海洋生物多樣性、海洋能源未來應用，以及淨零碳排與綠生活實踐，啟發觀眾重新想像永續共生的未來。", "11/7（六）–11/13（五）", "09:00–18:00", "本館二樓佛光藝廊"],
  ["好好看", "菩提心起－國立歷史博物館典藏佛像特展", "佛教造像凝聚宗教精神、藝術表現與時代風貌。本展精選國立歷史博物館典藏佛像作品，透過不同時代、材質與造形語彙，呈現佛教藝術在歷史流轉中的多元樣貌，讓觀者於靜觀凝視之間感受莊嚴氣韻與審美意境。", "11/7（六）–11/13（五）", "09:00–18:00", "本館二樓第二展廳"],
  ["好好看", "佛教海線絲綢之路－新媒體藝術特展", "依企劃書活動項目規劃為佛教藝術特展，從海線絲綢之路的文化交流視角，呈現佛教藝術、信仰傳播與生活美學的流動關係。詳細展件與策展內容，可待正式資料確認後補入。", "11/7（六）–11/13（五）", "依現場公告", "本館展廳"],
  ["好好看", "鈷藍猶珍－震旦典藏元青花瓷特展", "青花，是白瓷與鈷藍的相遇，是火焰與時間共同淬鍊的藝術傑作。元代青花瓷以磅礴氣勢、精緻紋飾與深邃藍白色調，在陶瓷史上樹立美學高峰；展品涵蓋梅瓶、大罐、玉壺春瓶等器型，邀請觀眾感受七百年前的偉大時代。", "11/7（六）–11/13（五）", "09:00–18:00", "本館二樓第一展廳"],
  ["好好看", "千人抄經", "抄經，可說是心保的良方。在專注寧靜的抄寫中，心神專一、氣息平和，能讓心靈安定，祥和人我關係，進而愛護生活環境與大地。願大家在抄經與十修歌的體驗中，覺察身心寧靜，種下善根，以善念護持生活與大地。", "11/7（六）–11/13（五）", "10:00–17:00", "大佛平台抄經堂"],
  ["好好看", "名家講座", "六場名家講座，涵蓋健康保健、佛教藝術、藍染工藝、食農教育、黑熊保育與自然生態。各場講題、講者、地點及報名資訊詳見海報。", "11/8（日）–11/13（五）", "14:00–15:30", "一教塔、禮敬大廳五觀堂（依場次）"],
  ["好好吃", "蔬食博覽會", "現場規劃台灣在地特色食品、在地蔬果、農特產加工品、茶藝、精緻生活用品、保健商品等項目，讓民眾體驗「蔬福生活」。", "11/7（六）–11/13（五）", "09:00–18:00", "風雨長廊"],
  ["好好吃", "在地小農市集", "依企劃書活動項目規劃在地小農市集，串連友善農產、在地食材與綠色生活選物，讓參觀民眾從產地風味認識土地，也支持低碳、安心、可持續的日常飲食。詳細攤位名單可待正式招商資料後補入。", "11/7（六）–11/13（五）", "09:00–18:00", "風雨長廊"],
  ["好好吃", "綠色飲食", "全館滴水坊全面供應素食，優先選用在地食材，推動綠色低碳飲食，落實健康環保理念，長養慈悲護生之心，積極宣導飲食生活轉型，帶動綠色生活風氣，響應蔬食愛地球，促進全球健康與福祉。", "11/7（六）–11/13（五）", "依各滴水坊用餐時間", "各滴水坊"],
  ["好好吃", "千人茶禪", "以茶會友的「千人茶禪」活動共分三輪：奉茶、奉茶點與茶飯禪。小茶師們以專注恭敬之心泡茶供眾，引導大眾在奉茶與品茗中體悟茶與禪皆源自生活；千人茶禪不僅是品茗，更是一次身心合一的修持。", "11/7（六）", "16:00–17:30", "菩提廣場"],
  ["好好玩", "大會主題場館 線上VS線下", "今年大會主題場館，擴大書展的數位化，讓好書不設限。透過線上與線下整合，串連書展、蔬食文化、戶外雕塑、藝術展覽、環境教育及三好等主軸，讓各年齡層觀眾皆能參與、共感、共享。", "11/7（六）–11/13（五）", "網站全日開放", "數位主題網站"],
  ["好好玩", "台北新劇團之戲曲好好玩《九色鹿》", "台北新劇團以經典故事〈九色鹿〉為主題，透過生動有趣的戲曲表演，帶領兒童走進誠信與善良的寓言世界。演出結合戲曲身段、音樂與角色互動，讓孩子在欣賞表演的同時，自然理解誠實守信的重要價值。", "11/9（一）–11/13（五）", "平日10:30–11:00、13:30–14:00，共8場", "本館大覺堂"],
  ["好好玩", "走進有熊國－臺灣國家公園黑熊保育特展教育推廣活動", "由三大國家公園管理處聯合主辦，攜手農業部生物多樣性研究所與台灣黑熊保育協會共同呈現。展出涵蓋臺灣黑熊生態知識、最新研究成果、黑熊與原住民族文化連結及保育成果，並設互動教具區、視聽區與印章體驗區。", "11/7（六）–11/13（五）", "09:00–18:00", "禮敬大廳二樓迴廊"],
  ["好好玩", "粘碧華刺繡工藝研習教育推廣", "依企劃書活動項目規劃刺繡工藝研習教育推廣，透過手作體驗與工藝導覽，引導民眾認識刺繡藝術的細緻技法、文化記憶與美感養成。詳細課程場次、報名方式與作品主題可待正式資料後補入。", "11/7（六）–11/13（五）", "依現場公告", "依現場公告"],
  ["好好玩", "三好兒童體驗館", "專為兒童設計的「三好兒童館」，以星雲大師提倡的三好運動「做好事、說好話、存好心」為中心思想。跟隨人間衛視卡通主角小沙彌「歡喜」，在三好轉盤、3D電影「三好劇院」和多媒體感應互動「三好學園」中體驗三好內涵。", "11/7（六）–11/13（五）", "09:00–18:00", "二眾塔"],
  ["好好玩", "大樹下故事屋", "佛陀紀念館邀請各國中小校長、老師在犀牛區為孩子說故事，透過故事啟發心靈，引導孩子種下三好的品格種子。活動結合生態解說、綠色消費、資源回收教育與親子環保手作 DIY，讓孩子從做中學、玩中悟。", "11/7（六）–11/13（五）", "09:00–16:00", "犀牛區"],
  ["好好玩", "龍火車與馬車", "佛光山2026年書展暨蔬食博覽會僅有7天，邀請民眾把握機會體驗乘坐歐式馬車，漫步於佛館菩提廣場，感受悠然閒適的氛圍；也可搭乘龍火車行駛在成佛大道上，與家人一同回味快樂童年時光。", "11/7（六）–11/13（五）", "龍火車：11/7–11/8 10:00–16:00、11/9–11/13 09:00–15:00；馬車：11/9–11/10 09:30–16:00", "成佛大道"],
  ["好好玩", "佛光環教列車", "佛陀紀念館環境教育長期透過環保行動、生命尊重、植物生態、蔬食推廣四大教案，引領大眾反思人與自然的關係。期盼啟發每位參與者從「心的環保」化為「身的行動」，落實惜水、惜物、護生的永續承諾。", "11/7（六）–11/13（五）", "09:00–17:00", "二眾塔、四給塔、七誡塔"],
  ["好好玩", "佛教植物園區", "在館內佛教植物園區，結合植物觀察、生命教育與佛教文化，引導參觀者從自然中理解護生、惜物與永續共存的精神。", "11/7（六）–11/13（五）", "09:00–18:00", "佛教植物園區"],
] as const;

const activityThemes = [
  ["好好看", "閱讀・文化・藝術", "從好書、講座到典藏展覽，展開一場跨越閱讀、藝術與生命關懷的文化旅程。", "/assets/animal-icons/owl.png"],
  ["好好吃", "蔬食・健康・永續", "用蔬食、茶禪與在地食材連結健康生活，從日常飲食實踐慈悲與環境永續。", "/assets/animal-icons/turtle.png"],
  ["好好玩", "親子・體驗・共學", "以戲曲、故事、生態與遊園體驗陪伴親子，在互動參與中創造共同學習的吉祥記憶。", "/assets/animal-icons/rabbit.png"],
] as const;

const activityFilters = ["全部", "好好看", "好好吃", "好好玩"] as const;

// 活動一覽表採獨立檔名；取得正式海報後可直接以同檔名覆蓋，不必修改程式。
const activityPhotoByTitle: Record<string, string> = {
  "書展": "/assets/activity-posters/activity-01-book-fair.jpg",
  "文化深耕 書香生活 閱讀閱有趣": "/assets/activity-posters/activity-02-reading-outreach.jpg",
  "雲水書坊－行動圖書館": "/assets/activity-posters/activity-03-mobile-library.jpg",
  "三羊和順－洪易藝術創作特展": "/assets/activity-posters/activity-04-outdoor-sculpture.jpg",
  "佛光山宗史館常設展－佛光山開山祖師星雲大師": "/assets/activity-posters/activity-05-history-museum.jpg",
  "國立海洋科學博物館：海洋未來式巡迴特展": "/assets/activity-posters/activity-06-ocean-future.jpg",
  "菩提心起－國立歷史博物館典藏佛像特展": "/assets/activity-posters/activity-07-buddhist-sculpture.jpg",
  "佛教海線絲綢之路－新媒體藝術特展": "/assets/activity-posters/activity-08-maritime-silk-road.jpg",
  "鈷藍猶珍－震旦典藏元青花瓷特展": "/assets/activity-posters/activity-09-blue-white-porcelain.jpg",
  "千人抄經": "/assets/activity-posters/activity-11-sutra-copying.jpg",
  "蔬食博覽會": "/assets/activity-posters/activity-12-vegetarian-expo.jpg",
  "在地小農市集": "/assets/activity-posters/activity-13-farmers-market.jpg",
  "綠色飲食": "/assets/activity-posters/activity-14-green-dining.jpg",
  "千人茶禪": "/assets/activity-posters/activity-15-tea-meditation.jpg",
  "大會主題場館 線上VS線下": "/assets/activity-posters/activity-16-online-book-fair.jpg",
  "台北新劇團之戲曲好好玩《九色鹿》": "/assets/activity-posters/activity-17-nine-colored-deer.jpg",
  "走進有熊國－臺灣國家公園黑熊保育特展教育推廣活動": "/assets/activity-posters/activity-18-black-bear-conservation.jpg",
  "粘碧華刺繡工藝研習教育推廣": "/assets/activity-posters/activity-19-embroidery-workshop.jpg",
  "三好兒童體驗館": "/assets/activity-posters/activity-20-childrens-center.jpg",
  "大樹下故事屋": "/assets/activity-posters/activity-21-story-house.jpg",
  "龍火車與馬車": "/assets/activity-posters/activity-22-train-carriage.jpg",
  "佛光環教列車": "/assets/activity-posters/activity-23-environment-train.jpg",
  "佛教植物園區": "/assets/activity-posters/activity-24-botanical-garden.jpg",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [activeBook, setActiveBook] = useState<number | null>(null);
  const [activeBookPage, setActiveBookPage] = useState(0);
  const [activeFood, setActiveFood] = useState<number | null>(null);
  const [activeFoodPhoto, setActiveFoodPhoto] = useState(0);
  const [activityQuery, setActivityQuery] = useState("");
  const [activityFilter, setActivityFilter] = useState<(typeof activityFilters)[number]>("全部");
  const [savedActivities, setSavedActivities] = useState<string[]>([]);
  const [itineraryReady, setItineraryReady] = useState(false);
  const foodTouchStartX = useRef<number | null>(null);

  const closeMenu = () => setMenuOpen(false);
  const closeBook = () => setActiveBook(null);
  const openBook = (index: number) => {
    setActiveBook(index);
    setActiveBookPage(0);
  };
  const closeFood = () => setActiveFood(null);
  const openFood = (index: number) => {
    setActiveFood(index);
    setActiveFoodPhoto(0);
  };
  const showPreviousFoodPhoto = () => setActiveFoodPhoto((photo) => (photo + FOOD_PHOTO_COUNT - 1) % FOOD_PHOTO_COUNT);
  const showNextFoodPhoto = () => setActiveFoodPhoto((photo) => (photo + 1) % FOOD_PHOTO_COUNT);

  const toggleSavedActivity = (title: string) => {
    setSavedActivities((current) => current.includes(title)
      ? current.filter((item) => item !== title)
      : [...current, title]);
  };

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("bookfair-2026-itinerary");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setSavedActivities(parsed.filter((item): item is string => typeof item === "string"));
      }
    } catch {
      // 瀏覽器停用儲存功能時，行程仍可在本次瀏覽期間使用。
    } finally {
      setItineraryReady(true);
    }
  }, []);

  useEffect(() => {
    if (!itineraryReady) return;
    try {
      window.localStorage.setItem("bookfair-2026-itinerary", JSON.stringify(savedActivities));
    } catch {
      // 儲存空間不可用時不影響主要活動查詢功能。
    }
  }, [itineraryReady, savedActivities]);

  useEffect(() => {
    if (activeBook === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBook();
      if (event.key === "ArrowLeft") setActiveBookPage((page) => (page + BOOK_DETAIL_PAGE_COUNT - 1) % BOOK_DETAIL_PAGE_COUNT);
      if (event.key === "ArrowRight") setActiveBookPage((page) => (page + 1) % BOOK_DETAIL_PAGE_COUNT);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeBook]);

  useEffect(() => {
    if (activeFood === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFood();
      if (event.key === "ArrowLeft") showPreviousFoodPhoto();
      if (event.key === "ArrowRight") showNextFoodPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeFood]);

  const activeBookData = activeBook === null ? null : bookShowcase[activeBook];
  const activeFoodData = activeFood === null ? null : boothShowcase[activeFood];
  const activeFoodPhotos = activeFood === null ? [] : Array.from(
    { length: FOOD_PHOTO_COUNT },
    (_, photoIndex) => foodPhotoAsset(activeFood, photoIndex),
  );
  const normalizedActivityQuery = activityQuery.trim().toLowerCase();
  const filteredActivities = activityOverview.filter(([theme, title, description, date, time, place]) => {
    const matchesFilter = activityFilter === "全部" || theme === activityFilter;
    const matchesQuery = !normalizedActivityQuery || [title, description, date, time, place]
      .some((value) => value.toLowerCase().includes(normalizedActivityQuery));
    return matchesFilter && matchesQuery;
  });
  const savedActivityDetails = savedActivities
    .map((savedTitle) => activityOverview.find(([, title]) => title === savedTitle))
    .filter((activity): activity is (typeof activityOverview)[number] => Boolean(activity));
  const bookDetailPages = activeBookData ? [
    ["BOOK COVER", activeBookData[0], activeBookData[1]],
    ["選書簡介", "這本書談什麼？", activeBookData[2]],
    ["閱讀亮點", "從主題走進生活", `以「${activeBookData[1]}」為閱讀核心，從故事、知識與生活經驗建立連結。`],
    ["核心主題", activeBookData[1], "透過清楚易讀的內容，引導讀者觀察、思考，並把閱讀所得帶回日常。"],
    ["適讀對象", "推薦給這樣的你", "適合親子共讀、學生延伸學習，以及關注生活、文化與生命議題的讀者。"],
    ["內容架構", "十頁圖文，循序認識一本書", "介紹頁可以依序安排封面、選書理由、內容摘要、閱讀亮點、核心主題、適讀對象、章節導讀、延伸閱讀、出版資訊與行動邀請。"],
    ["延伸閱讀", "讀完之後，繼續探索", "可搭配書展講座、主題展覽與教育體驗，從一本書延伸至更完整的學習旅程。"],
    ["長篇介紹示意", "可容納 300–500 字的文字說明", `《${activeBookData[0]}》以「${activeBookData[1]}」為主要方向，透過清楚易讀的文字、具體生活情境與循序漸進的閱讀安排，協助讀者從認識主題開始，逐步連結自身經驗，並延伸至家庭、校園與社會環境中的實際行動。本頁特別設計為長篇內容版型，可放置約三百至五百字的選書說明、作者介紹、章節摘要、策展觀點或閱讀指南；當文字超過畫面可見範圍時，內容區會自動提供捲動，不會壓縮標題、頁碼或 700 × 700 方形構圖。正式資料上線後，也可以加入段落分隔、重點語句與閱讀提示，讓讀者在點開書籍時，不只看到封面與簡短文案，還能完整理解本書特色、推薦理由、適讀對象及可延伸參與的書展活動。`],
    ["書籍資料", "作者・出版社・ISBN", "正式作者、出版社、出版日期、書籍識別資訊、語言與裝訂方式，將於主辦單位確認書單後補充。"],
    ["2026 線上書展", "完整書訊即將上線", "本頁為 700 × 700 方形圖文版型示意，正式封面、十頁內頁與選書資訊確認後可逐頁替換。"],
  ] as const : [];

  return (
    <main>
      <a className="skip-link" href="#content">跳至主要內容</a>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="回到首頁">
          <img
            className="brand-animal"
            src="/assets/brand-reading-group-transparent.png"
            alt="貓頭鷹、台灣黑熊、女孩與烏龜一起閱讀"
          />
          <span>
            <strong>佛光山 2026 書展暨蔬食博覽會</strong>
            <small className="brand-en">Fo Guang Shan 2026 Book Fair and Vegetarian Expo</small>
            <small className="brand-theme">
              吉祥動物派對 <span lang="en">Auspicious Animal Festival</span>
            </small>
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
              <p className="eyebrow">Theme &amp; origin</p>
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
              <h3>活動主題</h3>
              <p className="about-theme-title">
                佛光山2026年書展暨蔬食博覽會─「吉祥動物派對」
                <span lang="en">Fo Guang Shan 2026 Book Fair and Vegetarian Expo — Auspicious Animal Festival</span>
              </p>
              <h3>活動緣起</h3>
              <p>
                佛光山長年秉持「以教育培養人才、以文化弘揚佛法」的宗旨，以「三好」與「四給」為核心價值，自2013年起舉辦書展暨蔬食博覽會，以「永遠從關懷出發」，關懷偏鄉並持續推動人文教育與蔬食文化。
              </p>
              <p>
                佛光山2026年書展暨蔬食博覽會從今年馬年祝福語「和諧共生，馬到成功」出發，本次邀請藝術家洪易舉行戶外雕塑展，在佛陀紀念館戶外草地展示多種動物造型作品，具有繽紛色彩和圓潤奔放造型，打造一場「吉祥動物派對」，民眾置身其中，期待指向「如何在差異中找到連結，並在遊戲中重構理解。」如同「多元共生」與「包容理解」的現代和諧寓言。
              </p>
              <p>
                洪易擅長以當代雕塑形式融合民間美學、吉祥圖騰與生活感知，展現濃厚的東方文化意象與親近大眾的藝術魅力。並以擬人化的形式轉譯來傳遞「萬物有情、眾生平等」的信念。吉祥圖騰，是人們把對美好生活的期待，轉化成看得見的圖像。像是平安、富貴、長壽、圓滿，都不直接寫出來，而是用動物圖騰圖案作為象徵，讓圖像本身成為一種祝福，是傳統文化中承載祝福意涵的象徵性圖像，常藉由諧音、比喻、象徵或傳說典故，寄託人們對福祉、平安、長壽與和諧的嚮往。作品不僅展現人與人、人與自然、傳統與當代之間相互輝映的和諧關係，也傳遞圓滿、祝福與共融的美好意象。使大眾感受藝術在空間中所營造的歡愉氛圍與和諧美感。
              </p>
              <p>
                今年特別設置數位主題場館，擴大書展的數位化，讓好書不設限，結合線上與線下的書展、蔬食文化、戶外雕塑、藝術展覽、環境教育及三好等六大主軸，推動大眾從閱讀與參訪中激發思辨能力，透過實際參與和體驗，打造一個讓各年齡層觀眾皆能參與、共感、共享的多元平台，實踐和諧共生、歡喜精進的生活態度。
              </p>
              <p>
                此外，11月為全球響應的「世界素食月」（World Vegan Month），每年書展暨蔬食博覽會都持續結合這項世界倡議，呼應佛光山長年推動的人文教育與蔬食文化，從「閱讀」、「素食」、「綠生活」三大面向，引導大眾實踐健康、慈悲與環保的生活方式，進一步展現對社會與地球的關懷。
              </p>
            </article>
            <div className="info-stack">
              <div className="info-card teal-card">
                <img className="info-animal" src="/assets/animal-icons/deer.png" alt="" />
                <div><small>活動日期／開幕式</small><strong>2026.11.07(六) — 11.13(五)<br />開幕式 11.07(六) 10:30<br />地點：本館大覺堂</strong></div>
              </div>
              <div className="info-card cream-card">
                <img className="info-animal" src="/assets/animal-icons/turtle.png" alt="" />
                <div><small>開放時間</small><strong>平日 09:00–18:00<br />假日 09:00–19:00</strong></div>
              </div>
              <div className="info-card yellow-card">
                <img className="info-animal" src="/assets/animal-icons/whale.png" alt="" />
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
                <img className="highlight-animal" src={item.number === "01" ? "/assets/animal-icons/owl.png" : item.number === "02" ? "/assets/animal-icons/turtle.png" : "/assets/animal-icons/rabbit.png"} alt="" />
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
            <p className="lead">依企劃書彙整主要活動內容、日期、時間及場地，並以圖文卡片呈現；後續活動照片可直接置入各卡片上方。</p>
          </div>
          <div className="activity-groups">
            {activityThemes.map(([theme, subtitle, introduction, fallbackImage]) => {
              const activities = activityOverview.filter(([activityTheme]) => activityTheme === theme);

              return (
                <section className={`activity-group theme-${theme}`} key={theme} aria-labelledby={`theme-${theme}`}>
                  <div className="activity-group-heading">
                    <img src={fallbackImage} alt="" />
                    <div>
                      <p>{subtitle}</p>
                      <h3 id={`theme-${theme}`}>吉祥{theme}</h3>
                      <span>{introduction}</span>
                    </div>
                    {theme === "好好吃" && <strong>{activities.length} 項活動</strong>}
                  </div>

                  <div className="activity-card-grid">
                    {activities.map(([, title, description, date, time, place], index) => {
                      const photo = activityPhotoByTitle[title];
                      const animalFallbacks = [fallbackImage, "/assets/animal-icons/bear.png", "/assets/animal-icons/deer.png", "/assets/animal-icons/whale.png", "/assets/animal-icons/rhino.png", "/assets/animal-icons/giraffe.png"];

                      if (title === "名家講座") {
                        return (
                          <article className="activity-card lecture-card" id="lecture" key={title} aria-labelledby="lecture-title">
                            <div className="activity-card-body">
                              <span className={"theme-pill " + theme}>{theme}</span>
                              <h4 id="lecture-title">{title}{" "}<a className="activity-registration-link" href="https://docs.google.com/forms/d/e/1FAIpQLScfDWD1I8NE7Ngs-WUogfWZnurtUvn_0dYXnzvABAkXLI1xXg/viewform" target="_blank" rel="noopener noreferrer" aria-label="名家講座報名連結（另開分頁）">報名連結</a></h4>
                              <p>{description}</p>
                              <dl className="activity-meta">
                                <div><dt>日期</dt><dd>{date}</dd></div>
                                <div><dt>時間</dt><dd>{time}</dd></div>
                                <div><dt>地點</dt><dd>{place}</dd></div>
                              </dl>
                            </div>
                            <div className="lecture-poster-grid">
                              <img src="/assets/activity-posters/lecture-1108-1110.jpeg" alt="11月8日至10日名家講座：周文毅博士、蔡耀慶博士、王一帆老師；時間14:00–15:30，場地與報名QR碼詳見海報" width="800" height="1000" />
                              <img src="/assets/activity-posters/lecture-1111-1113.jpeg" alt="11月11日至13日名家講座：霍柏任老師、黃美秀教授、舒夢蘭導演；時間14:00–15:30，場地與報名QR碼詳見海報" width="800" height="1000" />
                            </div>
                          </article>
                        );
                      }

                      return (
                        <article className="activity-card" key={title}>
                          <div className={`activity-media ${photo ? "has-photo" : "is-placeholder"}`}>
                            <img src={photo || animalFallbacks[index % animalFallbacks.length]} alt={photo ? `${title}活動照片` : ""} />
                            {!photo && <span>活動影像可更新</span>}
                          </div>
                          <div className="activity-card-body">
                            <span className={`theme-pill ${theme}`}>{theme}</span>
                            <h4>{title}{title === "台北新劇團之戲曲好好玩《九色鹿》" && <>{" "}<a className="activity-registration-link" href="http://lnago.com/ADR15" target="_blank" rel="noopener noreferrer" aria-label="九色鹿報名連結（另開分頁）">報名連結</a></>}</h4>
                            <p>{description}</p>
                            <dl className="activity-meta">
                              <div><dt>日期</dt><dd>{date}</dd></div>
                              <div><dt>時間</dt><dd>{time}</dd></div>
                              <div><dt>地點</dt><dd>{place}</dd></div>
                            </dl>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
          <p className="overview-note">※ 活動內容、場次與地點如有調整，以主辦單位最新公告為準。</p>
        </section>

        <section className="section schedule-section" id="schedule">
          <div className="section-heading centered light-heading">
            <p className="eyebrow">Daily program</p>
            <h2>每日活動表</h2>
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

        <section className="section visitor-tools-section" id="visitor-tools" aria-labelledby="visitor-tools-title">
          <div className="visitor-tools-heading">
            <div>
              <p className="eyebrow">Plan your festival day</p>
              <h2 id="visitor-tools-title">參觀小幫手</h2>
              <p>搜尋想參加的活動，加入自己的參觀行程；不需要登入，行程會保留在目前使用的裝置中。</p>
            </div>
            <img src="/assets/animal-icons/rabbit.png" alt="" />
          </div>

          <div className="visitor-tools-layout">
            <section className="activity-finder" aria-labelledby="activity-finder-title">
              <div className="tool-panel-heading">
                <div><small>ACTIVITY FINDER</small><h3 id="activity-finder-title">尋找活動</h3></div>
                <strong aria-live="polite">找到 {filteredActivities.length} 項</strong>
              </div>
              <label className="activity-search">
                <span>搜尋活動</span>
                <input
                  type="search"
                  value={activityQuery}
                  onChange={(event) => setActivityQuery(event.target.value)}
                  placeholder="輸入活動、地點或關鍵字"
                />
              </label>
              <div className="activity-filter-buttons" aria-label="活動分類篩選">
                {activityFilters.map((filter) => (
                  <button
                    type="button"
                    className={activityFilter === filter ? "active" : ""}
                    aria-pressed={activityFilter === filter}
                    onClick={() => setActivityFilter(filter)}
                    key={filter}
                  >{filter}</button>
                ))}
              </div>

              <div className="activity-search-results" aria-live="polite">
                {filteredActivities.length > 0 ? filteredActivities.map(([theme, title, , date, time, place]) => {
                  const isSaved = savedActivities.includes(title);
                  return (
                    <article className="activity-search-item" key={title}>
                      <div>
                        <span className={`finder-theme theme-${theme}`}>{theme}</span>
                        <h4>{title}</h4>
                        <p>{date}・{time}</p>
                        <small>{place}</small>
                      </div>
                      <button
                        type="button"
                        className={isSaved ? "saved" : ""}
                        aria-pressed={isSaved}
                        onClick={() => toggleSavedActivity(title)}
                      >{isSaved ? "已加入行程" : "加入我的行程"}</button>
                    </article>
                  );
                }) : (
                  <div className="activity-search-empty">
                    <strong>目前找不到符合條件的活動</strong>
                    <p>可以縮短關鍵字，或切換回「全部」再試一次。</p>
                  </div>
                )}
              </div>
            </section>

            <aside className="my-itinerary" aria-labelledby="my-itinerary-title">
              <div className="tool-panel-heading">
                <div><small>MY ITINERARY</small><h3 id="my-itinerary-title">我的行程</h3></div>
                <strong>{savedActivityDetails.length} 項</strong>
              </div>
              {savedActivityDetails.length > 0 ? (
                <>
                  <div className="saved-activity-list">
                    {savedActivityDetails.map(([, title, , date, time, place], index) => (
                      <article key={title}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div><h4>{title}</h4><p>{date}・{time}</p><small>{place}</small></div>
                        <button type="button" onClick={() => toggleSavedActivity(title)} aria-label={`從我的行程移除${title}`}>移除</button>
                      </article>
                    ))}
                  </div>
                  <div className="itinerary-actions">
                    <a href="#schedule">查看每日活動表</a>
                    <button type="button" onClick={() => setSavedActivities([])}>清除全部</button>
                  </div>
                </>
              ) : (
                <div className="itinerary-empty">
                  <img src="/assets/animal-icons/owl.png" alt="" />
                  <strong>行程還是空的</strong>
                  <p>從左側挑選活動，按下「加入我的行程」就能開始安排。</p>
                </div>
              )}
              <p className="itinerary-storage-note">行程只儲存在此裝置，不會上傳個人資料。</p>
            </aside>
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

        <section className="section online-section" id="online">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Online book fair</p>
              <h2>線上書展</h2>
            </div>
            <p className="lead">以線上書店方式展示 24 本主題選書，不標示價格，讓讀者專注探索每本書的內容與閱讀價值。</p>
          </div>
          <div className="catalog-intro">
            <strong>24 本主題選書</strong>
            <span>以下書名、封面與介紹為版型示意，正式書單確認後可逐本替換。</span>
          </div>
          <div className="book-grid" aria-label="線上書展24本主題選書">
            {bookShowcase.map(([title, category, description], index) => (
              <button className="book-card" type="button" key={title} onClick={() => openBook(index)} aria-label={`開啟《${title}》10頁圖文介紹`}>
                <div className="book-cover">
                  <span>示意選書 {String(index + 1).padStart(2, "0")}</span>
                  <img src={bookCoverAsset(index)} alt={`《${title}》示意封面`} width="700" height="700" />
                  <small>700 × 700<br />BOOK FAIR</small>
                </div>
                <div className="book-card-copy">
                  <span>{category}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <strong>點選查看 10 頁介紹 →</strong>
                </div>
              </button>
            ))}
          </div>

          {activeBookData && (
            <div className="book-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeBook()}>
              <section className="book-modal" role="dialog" aria-modal="true" aria-labelledby="book-modal-title">
                <div className="book-modal-header">
                  <div>
                    <small>ONLINE BOOK FAIR・700 × 700 方形圖文</small>
                    <h3 id="book-modal-title">{activeBookData[0]}</h3>
                  </div>
                  <button type="button" className="book-modal-close" onClick={closeBook} aria-label="關閉書籍介紹">×</button>
                </div>

                <div className="book-detail-stage">
                  <button type="button" className="book-page-arrow previous" onClick={() => setActiveBookPage((page) => (page + BOOK_DETAIL_PAGE_COUNT - 1) % BOOK_DETAIL_PAGE_COUNT)} aria-label="上一頁">‹</button>
                  <div className={`book-detail-page page-${activeBookPage + 1} ${activeBookPage > 0 && activeBookPage < 9 ? "text-focused" : ""}`}>
                    <span className="book-detail-number">{String(activeBookPage + 1).padStart(2, "0")}</span>
                    <img
                      src={bookPageAsset(activeBook!, activeBookPage)}
                      alt={`《${activeBookData[0]}》第 ${activeBookPage + 1} 頁示意圖`}
                      width="700"
                      height="700"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = bookPlaceholderImages[(activeBook! + activeBookPage) % bookPlaceholderImages.length];
                      }}
                    />
                    <div className="book-detail-copy">
                      <small>{bookDetailPages[activeBookPage][0]}</small>
                      <h4>{bookDetailPages[activeBookPage][1]}</h4>
                      <p>{bookDetailPages[activeBookPage][2]}</p>
                    </div>
                    <strong>{activeBookPage + 1} / {BOOK_DETAIL_PAGE_COUNT}</strong>
                  </div>
                  <button type="button" className="book-page-arrow next" onClick={() => setActiveBookPage((page) => (page + 1) % BOOK_DETAIL_PAGE_COUNT)} aria-label="下一頁">›</button>
                </div>

                <div className="book-page-thumbnails" aria-label="介紹頁面選擇">
                  {bookDetailPages.map(([label], index) => (
                    <button type="button" className={activeBookPage === index ? "active" : ""} onClick={() => setActiveBookPage(index)} key={label} aria-label={`第${index + 1}頁：${label}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span><small>{label}</small>
                    </button>
                  ))}
                </div>
                <p className="book-modal-note">使用左右方向鍵切換頁面，按 Esc 關閉；長篇頁可放置 300–500 字並支援內容捲動。</p>
              </section>
            </div>
          )}
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

          <section className="booth-map-section" aria-labelledby="booth-map-title">
            <div className="subsection-heading">
              <div><small>SIMULATED FLOOR PLAN</small><h3 id="booth-map-title">模擬攤位配置表</h3></div>
              <p>以 24 個蔬食攤位模擬風雨長廊動線，正式攤號與位置確認後可直接更新。</p>
            </div>
            <div className="booth-map" aria-label="24個蔬食攤位模擬配置">
              <div className="booth-map-row">
                {boothShowcase.slice(0, 12).map(([dish], index) => (
                  <div className="booth-cell" key={dish}><strong>V{String(index + 1).padStart(2, "0")}</strong><span>{dish}</span></div>
                ))}
              </div>
              <div className="main-aisle"><span>入口</span><strong>風雨長廊・主要參觀動線</strong><span>出口</span></div>
              <div className="booth-map-row">
                {boothShowcase.slice(12).map(([dish], index) => (
                  <div className="booth-cell" key={dish}><strong>V{String(index + 13).padStart(2, "0")}</strong><span>{dish}</span></div>
                ))}
              </div>
            </div>
            <p className="overview-note">※ 此圖為版面與動線模擬，不代表正式攤位位置。</p>
          </section>

          <section className="food-showcase" aria-labelledby="food-showcase-title">
            <div className="subsection-heading">
              <div><small>VEGGIE FOOD PICKS</small><h3 id="food-showcase-title">24 家蔬食攤位・推薦美食</h3></div>
              <p>以線上商店卡片方式呈現攤位招牌料理，不顯示價格；正式攤商名單與餐點照片可逐項替換。</p>
            </div>
            <div className="food-grid" aria-label="24家蔬食攤位推薦美食">
              {boothShowcase.map(([dish, category, description], index) => (
                <button className="food-card" type="button" key={dish} onClick={() => openFood(index)} aria-label={`查看${dish}四張餐點照片`}>
                  <div className="food-card-media">
                    <span>V{String(index + 1).padStart(2, "0")}</span>
                    <img src={foodCoverAsset(index)} alt={`${dish}示意餐點照片`} width="700" height="700" />
                    <small>700 × 700 圖片</small>
                  </div>
                  <div className="food-card-copy">
                    <span>示意攤位 {String(index + 1).padStart(2, "0")}・{category}</span>
                    <h4>{dish}</h4>
                    <p>{description}</p>
                    <strong>點選查看 4 張照片 →</strong>
                  </div>
                </button>
              ))}
            </div>

            {activeFoodData && (
              <div className="food-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeFood()}>
                <section className="food-modal" role="dialog" aria-modal="true" aria-labelledby="food-modal-title">
                  <div className="food-modal-header">
                    <div>
                      <small>VEGGIE FOOD GALLERY・700 × 700</small>
                      <h3 id="food-modal-title">{activeFoodData[0]}</h3>
                      <p>{activeFoodData[1]}・示意攤位 {String(activeFood! + 1).padStart(2, "0")}</p>
                    </div>
                    <button type="button" className="food-modal-close" onClick={closeFood} aria-label="關閉餐點照片">×</button>
                  </div>

                  <div
                    className="food-gallery-stage"
                    onTouchStart={(event) => { foodTouchStartX.current = event.touches[0].clientX; }}
                    onTouchEnd={(event) => {
                      if (foodTouchStartX.current === null) return;
                      const distance = event.changedTouches[0].clientX - foodTouchStartX.current;
                      if (Math.abs(distance) > 45) distance > 0 ? showPreviousFoodPhoto() : showNextFoodPhoto();
                      foodTouchStartX.current = null;
                    }}
                  >
                    <button type="button" className="food-gallery-arrow previous" onClick={showPreviousFoodPhoto} aria-label="上一張照片">‹</button>
                    <div className="food-gallery-photo">
                      <img
                        src={activeFoodPhotos[activeFoodPhoto]}
                        alt={`${activeFoodData[0]}餐點照片 ${activeFoodPhoto + 1}`}
                        width="700"
                        height="700"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = foodPlaceholderImages[(activeFood! + activeFoodPhoto) % foodPlaceholderImages.length];
                        }}
                      />
                      <span>{activeFoodPhoto + 1} / {FOOD_PHOTO_COUNT}</span>
                      <small>正式 700 × 700 照片待更新</small>
                    </div>
                    <button type="button" className="food-gallery-arrow next" onClick={showNextFoodPhoto} aria-label="下一張照片">›</button>
                  </div>

                  <div className="food-gallery-thumbnails" aria-label="餐點照片選擇">
                    {activeFoodPhotos.map((photo, index) => (
                      <button type="button" className={activeFoodPhoto === index ? "active" : ""} onClick={() => setActiveFoodPhoto(index)} key={`${photo}-${index}`} aria-label={`查看第${index + 1}張照片`}>
                        <img
                          src={photo}
                          alt=""
                          width="700"
                          height="700"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = foodPlaceholderImages[(activeFood! + index) % foodPlaceholderImages.length];
                          }}
                        />
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </button>
                    ))}
                  </div>
                  <p className="food-modal-note">可使用左右方向鍵、畫面按鈕或在手機上左右滑動切換照片。</p>
                </section>
              </div>
            )}
          </section>
        </section>

        <section className="section visit-section" id="visit">
          <div className="section-heading centered">
            <p className="eyebrow">Plan your visit</p>
            <h2>參觀資訊</h2>
            <p>免費入場，邀請全家一起來佛館讀好書、食好蔬、賞吉祥</p>
          </div>
          <div className="visit-grid">
            <article className="venue-card">
              <div className="map-pattern" aria-hidden="true"><img src="/assets/animal-icons/giraffe.png" alt="" /></div>
              <div>
                <small>活動地點</small>
                <h3>佛光山佛陀紀念館</h3>
                <p>高雄市大樹區統嶺路 1 號</p>
                <a href="https://maps.google.com/?q=佛光山佛陀紀念館" target="_blank" rel="noreferrer">開啟 Google 地圖 ↗</a>
              </div>
            </article>
            <div className="travel-cards">
              <article><img src="/assets/animal-icons/rhino.png" alt="" /><div><h3>自行開車</h3><p>國道 10 號「旗山大樹交流道」下，接省道 29 號右轉前往佛光山佛陀紀念館。</p></div></article>
              <article><img src="/assets/animal-icons/turtle.png" alt="" /><div><h3>開放時間</h3><p>週一至週五 09:00–18:00<br />週六至週日 09:00–19:00</p></div></article>
              <article><img src="/assets/animal-icons/rabbit.png" alt="" /><div><h3>開幕典禮</h3><p>11 月 7 日（六）10:30<br />佛陀紀念館本館大覺堂</p></div></article>
            </div>
          </div>
          <div className="notice-bar"><strong>參觀提醒</strong><span>戶外活動建議準備防曬、防雨用品與環保水瓶；最新交通及活動異動以主辦單位公告為準。</span></div>
        </section>

      </div>

      <footer>
        <div className="footer-title"><img className="footer-animal" src="/assets/animal-icons/bear.png" alt="" /><div><strong>佛光山 2026 年書展暨蔬食博覽會</strong><small>Fo Guang Shan 2026 Book Fair and Vegetarian Expo</small></div></div>
        <div className="footer-orgs" aria-label="活動指導、主辦及協辦單位">
          <div className="footer-org-row"><strong>指導單位</strong><p>教育部</p></div>
          <div className="footer-org-row"><strong>主辦單位</strong><p>環境部、高雄市政府、財團法人人間文教基金會</p></div>
          <div className="footer-org-row"><strong>協辦單位</strong><p>國家圖書館、高雄市政府教育局、高雄市政府農業局、高雄市政府觀光局、高雄市政府環保局、臺南市政府教育局、屏東縣政府教育處、財團法人佛光山文教基金會、財團法人佛光山慈悲社會福利基金會、香雲國際股份有限公司、滴水坊股份有限公司、人間衛視、人間福報社</p></div>
        </div>
        <p className="copyright">© 2026 Fo Guang Shan Book Fair & Vegetarian Expo</p>
      </footer>
    </main>
  );
}

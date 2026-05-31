<script setup>
import { ref, computed } from 'vue'

const isFinished = ref(false)

const isStarted = ref(false)

const STORAGE_KEY = 'bingo_kanji_state'

const bgm = new Audio('/MegatronBGM.mp3')

bgm.loop = true

bgm.volume = 0.3

const isMuted = ref(false)

function toggleBgm() {
  isMuted.value = !isMuted.value
  bgm.muted = isMuted.value
}

const selectedCell = ref(null)

const form = ref({
  className: '',
  number: '',
  answer: ''
})

const words = [
  '名前を聞く',
  '出身地を聞く',
  '学科を聞く',
  '趣味を聞く',
  '特技を聞く',
  '好きな食べ物を聞く',
  '好きな飲み物を聞く',
  '好きなお菓子を聞く',
  '好きなアイスを聞く',
  '好きなラーメンを聞く',

  '好きな音楽を聞く',
  '好きなアーティストを聞く',
  '好きな曲を聞く',
  '好きなゲームを聞く',
  '好きなアニメを聞く',
  '好きな漫画を聞く',
  '好きな映画を聞く',
  '好きなドラマを聞く',
  '好きなYouTuberを聞く',
  'よく使うアプリを聞く',

  '好きなスポーツを聞く',
  '好きなスポーツチームを聞く',
  '好きな選手を聞く',
  '好きな色を聞く',
  '好きな季節を聞く',
  '好きな動物を聞く',
  '好きなキャラクターを聞く',
  '好きな国を聞く',
  '好きな場所を聞く',
  '好きな乗り物を聞く',

  '好きなカフェを聞く',
  '好きなブランドを聞く',
  '好きなファッションを聞く',
  '好きな給食メニューを聞く',
  '好きなコンビニ商品を聞く',
  '好きなテレビ番組を聞く',
  '好きな本を聞く',
  '好きな科目を聞く',
  '苦手な科目を聞く',
  '得意科目を聞く',

  '高校時代の部活を聞く',
  '高校時代に頑張ったことを聞く',
  '高校の思い出を聞く',
  '文化祭の思い出を聞く',
  '体育祭の思い出を聞く',
  '修学旅行の思い出を聞く',
  '高校で好きだった授業を聞く',
  '高校で好きだった先生を聞く',
  '高校時代の通学手段を聞く',
  '高校時代の昼休みの過ごし方を聞く',

  '大学を選んだ理由を聞く',
  'この学科を選んだ理由を聞く',
  '大学で楽しみなことを聞く',
  '大学で頑張りたいことを聞く',
  '将来の夢を聞く',
  '将来就きたい職業を聞く',
  '取りたい資格を聞く',
  '入りたいサークルを聞く',
  '挑戦したいことを聞く',
  '行ってみたい国を聞く',

  '旅行したい場所を聞く',
  '将来住みたい場所を聞く',
  '卒業までの目標を聞く',
  '今年の目標を聞く',
  '休日の過ごし方を聞く',
  '最近ハマっていることを聞く',
  '最近見た映画を聞く',
  '最近読んだ本を聞く',
  '最近よく聴く曲を聞く',
  '最近やっているゲームを聞く',

  '通学時間を聞く',
  '住んでいる地域を聞く',
  '誕生日の月を聞く',
  '星座を聞く',
  '朝食でよく食べるものを聞く',
  '昨日の夕食を聞く',
  '何時に寝たか聞く',
  '朝型か夜型か聞く理由を聞く',
  '一番よく使うSNSを聞く',
  'スマホの待ち受けについて聞く',

  'おすすめの店を聞く',
  'おすすめの学食メニューを聞く',
  'おすすめのアニメを聞く',
  'おすすめの漫画を聞く',
  'おすすめの映画を聞く',
  'おすすめのゲームを聞く',
  'おすすめの音楽を聞く',
  'おすすめのアプリを聞く',
  'おすすめの旅行先を聞く',
  'おすすめのラーメン屋を聞く',

  '子どもの頃の夢を聞く',
  '今欲しいものを聞く',
  '今行きたい場所を聞く',
  '今一番楽しみにしていることを聞く',
  '自慢できることを聞く',
  '無人島に持っていくものを聞く',
  'ストレス解消法を聞く',
  '好きな言葉を聞く',
  '今日の感想を聞く',
  '仲良くなるために聞いてほしいことを聞く'
]

const cells = ref([])

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function initializeBoard() {
  const shuffled = shuffle(words).slice(0, 24)

  const board = []

  let wordIndex = 0

  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      board.push({
        text: 'FREE',
        checked: true
      })
    } else {
      board.push({
        text: shuffled[wordIndex],
        checked: false
      })
      wordIndex++
    }
  }

  cells.value = board
}

function toggleCell(index) {
  if (index === 12) return

  selectedCell.value = index

  const cell = cells.value[index]

  form.value = {
    className: cell.partnerClass || '',
    number: cell.partnerNumber || '',
    answer: cell.answer || ''
  }
}

function saveCell() {
  const cell = cells.value[selectedCell.value]

  cell.checked = true
  cell.partnerClass = form.value.className
  cell.partnerNumber = form.value.number
  cell.answer = form.value.answer

  selectedCell.value = null
}



const bingoCount = computed(() => {
  let count = 0

  const lines = []

  for (let row = 0; row < 5; row++) {
    lines.push([
      row * 5,
      row * 5 + 1,
      row * 5 + 2,
      row * 5 + 3,
      row * 5 + 4
    ])
  }

  for (let col = 0; col < 5; col++) {
    lines.push([
      col,
      col + 5,
      col + 10,
      col + 15,
      col + 20
    ])
  }

  lines.push([0, 6, 12, 18, 24])
  lines.push([4, 8, 12, 16, 20])

  lines.forEach(line => {
    const bingo = line.every(
      index => cells.value[index]?.checked
    )

    if (bingo) count++
  })

  return count
})

const checkedCount = computed(() =>
  cells.value.filter(cell => cell.checked).length
)

const title = computed(() => {

  if (checkedCount.value >= 25)
    return '👑 伝説のコミュニケーター'

  if (checkedCount.value >= 20)
    return '🏆 友達作りマスター'

  if (checkedCount.value >= 15)
    return '⭐ コミュ力上級者'

  if (checkedCount.value >= 10)
    return '😊 フレンドメーカー'

  if (checkedCount.value >= 5)
    return '🌱 交流チャレンジャー'

  return '🎓 入学したて'
})

const talkedPeople = computed(() =>
  cells.value.filter(
    cell =>
      cell.partnerClass ||
      cell.partnerNumber
  )
)


const canShowResult = computed(() => bingoCount.value > 0)

initializeBoard()
</script>

<template>
  <div
  v-if="!isStarted"
  class="start-screen"
>
  <h1 class="start-title">
    入学式仲良しビンゴ
  </h1>

  <p class="start-text">
    たくさんの人と話して
    ビンゴを完成させよう！
  </p>

 <button
  class="start-btn"
  @click="
    isStarted = true;
    bgm.play();
  "
>
  スタート
</button>

</div>

<div
  v-else-if="!isFinished"
  class="container"
>

    <h1>入学式ビンゴ</h1>

   <div class="top-bar">

  <div class="score">
    ビンゴ数: {{ bingoCount }}
  </div>

  <button
  class="music-btn"
  @click="toggleBgm"
>
  {{ isMuted ? '🔇' : '🎵' }}
</button>

  <button
    class="reset-btn"
    @click="initializeBoard"
  >
    🔄 リセット
  </button>

<button
  class="result-btn"
  :disabled="!canShowResult"
  :class="{ disabled: !canShowResult }"
  @click="canShowResult ? (isFinished = true) : null"
>
  🏆 結果を見る
</button>

</div>

    <div class="board">
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="cell"
        :class="{ checked: cell.checked }"
        @click="toggleCell(index)"
      >
        {{ cell.text }}
      </div>
    </div>

  </div>

 <div v-else class="result">

  <h1 class="clear-animation">
    🎉 ビンゴ達成！ 🎉
  </h1>

  <div class="result-card">

    <h2>{{ title }}</h2>

    <p>達成マス数: {{ checkedCount }}/25</p>

    <p>獲得ビンゴ数: {{ bingoCount }}</p>

  </div>

<div class="history-card">

  <h3>話した人一覧</h3>

<div
  v-for="(person, index) in talkedPeople"
  :key="index"
  class="history-item"
>
  <strong>
    {{ person.partnerClass }}組
    {{ person.partnerNumber }}番
  </strong>

  <p class="question">
    {{ person.text }}
  </p>

  <p class="answer">
    {{ person.answer }}
  </p>
</div>

</div>

<div class="result-buttons">

  <button
    @click="isFinished = false"
  >
    🔙 戻る
  </button>

  <button
   @click="
  initializeBoard();
  isFinished = false;
  isStarted = false;
"
  >
    🔄 もう一度遊ぶ
  </button>

</div>

</div>

<div
  v-if="selectedCell !== null"
  class="modal"
>

  <div class="modal-content">

    <h2>
      {{ cells[selectedCell].text }}
    </h2>

    <input
      v-model="form.className"
      placeholder="相手の組"
    >

    <input
      v-model="form.number"
      placeholder="相手の番号"
    >

    <textarea
      v-model="form.answer"
      placeholder="相手の回答"
    ></textarea>

    <button @click="saveCell">
      記録する
    </button>

  </div>

</div>

</template>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

background:
linear-gradient(
  180deg,
  #fff8dc,
  #ffe4b5,
  #ffd1dc
);

  padding: 30px;
}

.board {
  display: grid;

  grid-template-columns:
    repeat(5, 120px);

  gap: 10px;

  justify-content: center;
}

.cell {
  border-radius: 16px;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px;
  text-align: center;

  cursor: pointer;

  background: #fffdf5;

  font-size: 14px;
  font-weight: bold;

  user-select: none;

  border-radius: 24px;


}

.checked {
  background:
    linear-gradient(
      180deg,
      #ffb347,
      #ff7f50
    );

  color: white;

  transform: scale(.95);
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

.cell {
  transition: 0.2s;
}

.cell:hover {
  transform:
    scale(1.08)
    rotate(-2deg);
}

.container {
  width: 100vw;
  min-height: 100vh;

  background:
    linear-gradient(
      135deg,
      #667eea,
      #764ba2
    );

  padding: 30px;
}

h1 {
  font-size: 4rem;

  color: white;

  font-weight: 800;

  margin-bottom: 30px;

  text-shadow:
    0 6px 20px rgba(0,0,0,.25);
}

h1 {
  font-size: 3rem;
  color: white;
}

.cell {
  box-shadow:
    0 4px 12px rgba(0,0,0,.15);
}

.score {
  display: inline-block;

  background: white;

  padding: 12px 24px;

  border-radius: 999px;

  font-weight: bold;

  margin-bottom: 20px;
}

.result {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;

  background:
    linear-gradient(
      180deg,
      #fff8dc,
      #ffe4b5,
      #ffd1dc
    );
}

.result-card {
  background: white;

  border-radius: 30px;

  padding: 30px;

  box-shadow:
    0 10px 30px rgba(0,0,0,.15);

  color: #444;
}

.clear-animation {
  animation: pop 0.8s ease;
}

@keyframes pop {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.clear-animation {
  animation: pop 0.8s ease;

  font-size: 4rem;

  color: #ffffff;

  text-shadow:
    4px 4px 0 #ffb347,
    8px 8px 15px rgba(0,0,0,.2);
}

.top-bar {
  display: flex;

  gap: 15px;

  align-items: center;

  margin-bottom: 30px;

  flex-wrap: wrap;

  justify-content: center;
}

.reset-btn,
.result-btn {
  border: none;

  border-radius: 15px;

  padding: 12px 24px;

  font-size: 16px;

  font-weight: bold;

  cursor: pointer;

  transition: 0.2s;
}

.reset-btn:hover,
.result-btn:hover {
  transform: translateY(-3px);
}

.reset-btn {
  background: white;
}

.result-btn {
  background: gold;
}

.modal {
  position: fixed;
  inset: 0;

  background: rgba(0,0,0,.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;

  padding: 30px;

  border-radius: 20px;

  width: 400px;

  display: flex;
  flex-direction: column;

  gap: 15px;
}

.modal-content input,
.modal-content textarea {
  padding: 10px;
}

.result-btn.disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  opacity: 0.6;
}

.result-buttons {
  display: flex;
  gap: 15px;
}

.history-card {
  background: white;

  color: black;

  padding: 20px;

  border-radius: 20px;

  width: 400px;

  max-height: 300px;

  overflow-y: auto;
}

.history-item {
  padding: 8px;

  border-bottom:
    1px solid #ddd;
}

.question {
  font-weight: bold;
  margin: 8px 0 4px;
}

.answer {
  background: #f5f5f5;
  padding: 8px;
  border-radius: 8px;
  margin: 0;
}

.start-screen {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background:
    linear-gradient(
      180deg,
      #fff8dc,
      #ffe4b5,
      #ffd1dc
    );
}

.start-title {
  font-size: 5rem;

  color: #ff7f50;

  text-shadow:
    4px 4px 0 white,
    8px 8px 12px rgba(0,0,0,.15);

  margin-bottom: 20px;

  text-align: center;
}

.start-text {
  font-size: 1.3rem;

  margin-bottom: 40px;

  text-align: center;
}

.start-btn {
  border: none;

  border-radius: 999px;

  padding: 20px 70px;

  font-size: 1.8rem;

  font-weight: bold;

  color: white;

  background:
    linear-gradient(
      180deg,
      #ffb347,
      #ff7f50
    );

  box-shadow:
    0 8px 0 #e36d3c,
    0 12px 25px rgba(0,0,0,.15);

  cursor: pointer;

  transition: .2s;
}

.start-btn:hover {
  transform: scale(1.08);
}

.start-btn:active {
  transform: translateY(6px);
  box-shadow:
    0 2px 0 #e36d3c;
}

.music-btn {
  width: 60px;
  height: 60px;

  border: none;
  border-radius: 50%;

  font-size: 24px;

  cursor: pointer;

  background: white;

  box-shadow:
    0 4px 12px rgba(0,0,0,.15);
}

</style>
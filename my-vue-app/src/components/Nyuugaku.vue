<script setup>
import { ref, computed } from 'vue'

const isFinished = ref(false)

const words = [
  '隣の人に名前を聞く',
  '出身地を聞く',
  '趣味を聞く',
  '好きな食べ物を聞く',
  '好きな飲み物を聞く',
  '好きな音楽を聞く',
  '好きなアーティストを聞く',
  '好きなゲームを聞く',
  '好きなアニメを聞く',
  '好きな漫画を聞く',
  '好きな映画を聞く',
  '好きなスポーツを聞く',
  '好きな色を聞く',
  '好きな季節を聞く',
  '好きな動物を聞く',
  '好きな国を聞く',
  '好きな場所を聞く',
  '好きなキャラクターを聞く',
  '好きなラーメンを聞く',
  '好きなアイスを聞く',

  '高校時代の部活を聞く',
  '高校の思い出を聞く',
  '文化祭の思い出を聞く',
  '体育祭の思い出を聞く',
  '修学旅行の思い出を聞く',
  '将来の夢を聞く',
  '大学生活の目標を聞く',
  'やってみたいことを聞く',
  '入りたいサークルを聞く',
  '取得したい資格を聞く',

  '通学時間を聞く',
  '住んでいる地域を聞く',
  '一人暮らしか聞く',
  '朝型か夜型か聞く',
  '兄弟姉妹がいるか聞く',
  'ペットを飼っているか聞く',
  'アルバイト経験を聞く',
  '休日の過ごし方を聞く',
  '入学式後の予定を聞く',
  '今日の感想を聞く',

  'おすすめの学食を聞く',
  'おすすめの店を聞く',
  'おすすめアニメを聞く',
  'おすすめ漫画を聞く',
  'おすすめ映画を聞く',
  'おすすめゲームを聞く',
  'おすすめ音楽を聞く',
  'おすすめアプリを聞く',
  'おすすめYouTuberを聞く',
  'おすすめの旅行先を聞く',

  '好きな教科を聞く',
  '苦手な教科を聞く',
  '得意科目を聞く',
  '授業の取り方を相談する',
  '履修について話す',
  'サークルの話をする',
  '学科を聞く',
  '大学で楽しみなことを聞く',
  '不安なことを聞く',
  '頑張りたいことを聞く',

  'LINEを交換する',
  'Instagramを交換する',
  '連絡先を交換する',
  '写真を一緒に撮る',
  'スマホの待ち受けを見せてもらう',
  '好きなアプリを聞く',
  '使っているスマホを聞く',
  'スマホの機種を聞く',
  'SNSを使っているか聞く',
  'よく見る動画を聞く',

  '共通の趣味を見つける',
  '共通の好きな食べ物を見つける',
  '共通の好きな音楽を見つける',
  '共通の好きなアニメを見つける',
  '共通の好きなゲームを見つける',
  '共通の好きな映画を見つける',
  '共通の出身地を見つける',
  '共通の目標を見つける',
  '共通の好きなスポーツを見つける',
  '共通の休日の過ごし方を見つける',

  '5分以上会話する',
  '10分以上会話する',
  '相手から質問を1つ受ける',
  '相手に質問を3つする',
  '相手の名前を覚える',
  '相手に自分の名前を覚えてもらう',
  '笑顔を引き出す',
  '相手を褒める',
  '相手に褒めてもらう',
  '次に会ったら話そうと約束する',

  '昼食の話をする',
  '好きな給食メニューを聞く',
  '旅行したい場所を聞く',
  '将来住みたい場所を聞く',
  '好きなファッションを聞く',
  '好きなブランドを聞く',
  '好きなカフェを聞く',
  '好きな乗り物を聞く',
  '誕生日の月を聞く',
  '星座を聞く'
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

  cells.value[index].checked =
    !cells.value[index].checked
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

initializeBoard()
</script>

<template>
  <div v-if="!isFinished" class="container">

    <h1>入学式ビンゴ</h1>

   <div class="top-bar">

  <div class="score">
    ビンゴ数: {{ bingoCount }}
  </div>

  <button
    class="reset-btn"
    @click="initializeBoard"
  >
    🔄 リセット
  </button>

  <button
    class="result-btn"
    @click="isFinished = true"
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

 <button
  @click="
    initializeBoard();
    isFinished = false;
  "
>
  もう一度遊ぶ
</button>

</div>


</template>

<style scoped>
.container {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background:
    linear-gradient(
      135deg,
      #667eea,
      #764ba2
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

  background: white;

  font-size: 14px;
  font-weight: bold;

  user-select: none;


}

.checked {
  background: linear-gradient(
    135deg,
    #4facfe,
    #00f2fe
  );

  color: white;

  transform: scale(0.95);
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
  transform: scale(1.05);
}

.container {
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
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background:
    linear-gradient(
      135deg,
      #1e3c72,
      #2a5298
    );

  color: white;
}

.result-card {
  background: white;

  color: black;

  padding: 30px;

  border-radius: 20px;

  margin: 20px;

  min-width: 300px;

  box-shadow:
    0 10px 30px rgba(0,0,0,.3);
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

  text-shadow:
    0 0 10px #fff,
    0 0 20px #fff,
    0 0 30px gold;

  font-size: 4rem;
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

</style>
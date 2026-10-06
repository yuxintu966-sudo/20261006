// 儲存五道 p5.js 基礎指令選擇題。
const questions = [
  {
    // 儲存第一題題目。
    question: "哪一個函式可以建立 p5.js 畫布？",

    // 儲存第一題的四個選項。
    options: ["drawCanvas()", "createCanvas()", "makeCanvas()", "canvasSize()"],

    // 儲存正確答案的索引值。
    answer: 1
  },
  {
    // 儲存第二題題目。
    question: "哪一個函式通常只會在程式開始時執行一次？",

    // 儲存第二題的四個選項。
    options: ["start()", "begin()", "setup()", "init()"],

    // 儲存正確答案的索引值。
    answer: 2
  },
  {
    // 儲存第三題題目。
    question: "哪一個函式會持續重複執行，用來製作動畫？",

    // 儲存第三題的四個選項。
    options: ["repeat()", "draw()", "looping()", "animate()"],

    // 儲存正確答案的索引值。
    answer: 1
  },
  {
    // 儲存第四題題目。
    question: "哪一個函式可以設定畫布的背景顏色？",

    // 儲存第四題的四個選項。
    options: ["background()", "canvasColor()", "fillBackground()", "colorCanvas()"],

    // 儲存正確答案的索引值。
    answer: 0
  },
  {
    // 儲存第五題題目。
    question: "哪一個函式可以繪製橢圓形？",

    // 儲存第五題的四個選項。
    options: ["circle()", "oval()", "ellipse()", "roundShape()"],

    // 儲存正確答案的索引值。
    answer: 2
  }
];

// 儲存目前題目的編號。
let currentQuestion = 0;

// 儲存答對的題數。
let correctCount = 0;

// 儲存使用者是否已經回答目前題目。
let answered = false;

// 儲存使用者選擇的選項編號。
let selectedOption = -1;

// 儲存選項按鈕的位置。
let optionBoxes = [];

// 儲存下一題按鈕的位置。
let nextButton = null;

// 儲存重新作答按鈕的位置。
let restartButton = null;

// 設定畫布。
function setup() {
  // 建立符合瀏覽器視窗大小的畫布。
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平與垂直置中。
  textAlign(CENTER, CENTER);

  // 設定矩形使用左上角作為定位點。
  rectMode(CORNER);

  // 啟用抗鋸齒。
  smooth();

  // 設定觸控裝置不因觸控而捲動頁面。
  document.body.style.touchAction = "none";
}

// 每一幀重新繪製畫面。
function draw() {
  // 設定整體背景顏色。
  background("#f7f3f9");

  // 若已經完成所有題目，就顯示結果畫面。
  if (currentQuestion >= questions.length) {
    drawResultScreen();
  } else {
    // 否則顯示測驗畫面。
    drawQuizScreen();
  }
}

// 繪製測驗畫面。
function drawQuizScreen() {
  // 取得目前題目。
  const current = questions[currentQuestion];

  // 設定左右邊界，避免內容貼近螢幕邊緣。
  const sidePadding = constrain(width * 0.05, 18, 48);

  // 設定主要內容區域寬度。
  const contentWidth = min(width - sidePadding * 2, 900);

  // 計算主要內容區域的水平位置。
  const contentX = (width - contentWidth) / 2;

  // 根據螢幕寬度設定標題大小。
  const titleSize = constrain(width * 0.075, 24, 38);

  // 根據螢幕寬度設定一般文字大小。
  const normalTextSize = constrain(width * 0.045, 16, 24);

  // 設定頁面上方標題高度。
  const titleY = constrain(height * 0.07, 32, 58);

  // 設定題數文字位置。
  const progressY = titleY + titleSize * 1.35;

  // 設定題目卡片的上方位置。
  const questionY = progressY + 34;

  // 設定題目卡片高度。
  const questionHeight = constrain(height * 0.15, 105, 150);

  // 顯示測驗標題。
  fill("#3d3142");
  noStroke();
  textStyle(BOLD);
  textSize(titleSize);
  text("p5.js 指令測驗", width / 2, titleY);

  // 顯示目前題數。
  fill("#80658a");
  textStyle(NORMAL);
  textSize(constrain(width * 0.042, 15, 20));
  text(
    `第 ${currentQuestion + 1} 題／共 ${questions.length} 題`,
    width / 2,
    progressY
  );

  // 繪製題目卡片。
  fill("#ffffff");
  stroke("#d8cadd");
  strokeWeight(2);
  rect(contentX, questionY, contentWidth, questionHeight, 18);

  // 顯示題目文字。
  fill("#3d3142");
  noStroke();
  textStyle(BOLD);
  textSize(normalTextSize);
  text(
    current.question,
    contentX + 20,
    questionY + 15,
    contentWidth - 40,
    questionHeight - 30
  );

  // 清除上一幀的選項資料。
  optionBoxes = [];

  // 設定選項間距。
  const gap = constrain(width * 0.025, 10, 18);

  // 寬螢幕使用兩欄，窄螢幕使用一欄。
  const columns = width >= 680 ? 2 : 1;

  // 計算選項按鈕寬度。
  const optionWidth =
    columns === 2
      ? (contentWidth - gap) / 2
      : contentWidth;

  // 設定選項按鈕高度。
  const optionHeight = constrain(height * 0.09, 58, 78);

  // 設定選項區域起始位置。
  const optionsStartY = questionY + questionHeight + gap * 1.5;

  // 逐一繪製四個選項。
  for (let i = 0; i < current.options.length; i++) {
    // 計算選項所在欄位。
    const column = columns === 2 ? i % 2 : 0;

    // 計算選項所在列數。
    const row = columns === 2 ? floor(i / 2) : i;

    // 計算選項水平位置。
    const x = contentX + column * (optionWidth + gap);

    // 計算選項垂直位置。
    const y = optionsStartY + row * (optionHeight + gap);

    // 儲存選項位置，供點擊判斷使用。
    optionBoxes.push({
      x: x,
      y: y,
      w: optionWidth,
      h: optionHeight
    });

    // 預設選項背景色。
    let optionColor = "#ffffff";

    // 作答後將正確答案標示為指定的紫色。
    if (answered && i === current.answer) {
      optionColor = "#cdb4db";
    }

    // 答錯時將使用者選錯的選項標示為淡紅色。
    if (
      answered &&
      selectedOption === i &&
      selectedOption !== current.answer
    ) {
      optionColor = "#f3c4c4";
    }

    // 尚未作答且滑鼠移入時，顯示互動顏色。
    if (
      !answered &&
      isInside(mouseX, mouseY, x, y, optionWidth, optionHeight)
    ) {
      optionColor = "#eee4f1";
    }

    // 繪製選項按鈕。
    fill(optionColor);
    stroke("#d8cadd");
    strokeWeight(2);
    rect(x, y, optionWidth, optionHeight, 14);

    // 計算選項文字大小。
    const optionTextSize = constrain(width * 0.042, 15, 21);

    // 顯示選項內容。
    fill("#3d3142");
    noStroke();
    textStyle(NORMAL);
    textSize(optionTextSize);
    text(
      `${String.fromCharCode(65 + i)}. ${current.options[i]}`,
      x + 12,
      y + 10,
      optionWidth - 24,
      optionHeight - 20
    );
  }

  // 尚未作答時，不顯示下一題按鈕。
  if (!answered) {
    nextButton = null;
    return;
  }

  // 計算下一題按鈕的寬度。
  const buttonWidth = min(contentWidth, 280);

  // 設定下一題按鈕高度。
  const buttonHeight = constrain(height * 0.07, 52, 62);

  // 計算按鈕水平位置。
  const buttonX = width / 2 - buttonWidth / 2;

  // 計算選項區域的總高度。
  const optionRows = columns === 2 ? 2 : 4;

  // 計算下一題按鈕垂直位置。
  const buttonY =
    optionsStartY +
    optionRows * optionHeight +
    (optionRows - 1) * gap +
    gap * 1.8;

  // 儲存下一題按鈕位置。
  nextButton = {
    x: buttonX,
    y: buttonY,
    w: buttonWidth,
    h: buttonHeight
  };

  // 判斷滑鼠是否位於下一題按鈕內。
  const hoveringNext = isInside(
    mouseX,
    mouseY,
    buttonX,
    buttonY,
    buttonWidth,
    buttonHeight
  );

  // 根據滑鼠位置設定下一題按鈕顏色。
  fill(hoveringNext ? "#73557d" : "#80658a");
  noStroke();
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 14);

  // 顯示下一題按鈕文字。
  fill("#ffffff");
  textStyle(BOLD);
  textSize(constrain(width * 0.045, 17, 21));
  text(
    currentQuestion === questions.length - 1 ? "查看結果" : "下一題",
    width / 2,
    buttonY + buttonHeight / 2
  );

  // 顯示作答結果提示。
  fill("#80658a");
  textStyle(NORMAL);
  textSize(constrain(width * 0.038, 14, 17));
  text(
    selectedOption === current.answer
      ? "答對了！"
      : "答錯了，正確答案已標示。",
    width / 2,
    buttonY + buttonHeight + 25
  );
}

// 繪製結果畫面。
function drawResultScreen() {
  // 設定結果卡片左右內距。
  const sidePadding = constrain(width * 0.06, 20, 50);

  // 設定結果卡片寬度。
  const resultWidth = min(width - sidePadding * 2, 650);

  // 設定結果卡片高度。
  const resultHeight = min(height * 0.72, 370);

  // 計算結果卡片水平位置。
  const resultX = width / 2 - resultWidth / 2;

  // 計算結果卡片垂直位置。
  const resultY = height / 2 - resultHeight / 2;

  // 繪製結果卡片。
  fill("#ffffff");
  stroke("#d8cadd");
  strokeWeight(2);
  rect(resultX, resultY, resultWidth, resultHeight, 22);

  // 顯示完成標題。
  fill("#3d3142");
  noStroke();
  textStyle(BOLD);
  textSize(constrain(width * 0.075, 27, 38));
  text("測驗完成！", width / 2, resultY + resultHeight * 0.2);

  // 顯示答對題數。
  fill("#80658a");
  textSize(constrain(width * 0.06, 22, 31));
  text(
    `你答對了 ${correctCount}／${questions.length} 題`,
    width / 2,
    resultY + resultHeight * 0.42
  );

  // 顯示鼓勵文字。
  fill("#3d3142");
  textStyle(NORMAL);
  textSize(constrain(width * 0.04, 15, 20));
  text(
    correctCount === questions.length
      ? "太棒了！你已經熟悉 p5.js 基礎指令。"
      : "繼續練習，你會越來越熟悉 p5.js！",
    width / 2,
    resultY + resultHeight * 0.59,
    resultWidth - 45,
    60
  );

  // 設定重新作答按鈕寬度。
  const buttonWidth = min(resultWidth - 50, 260);

  // 設定重新作答按鈕高度。
  const buttonHeight = 56;

  // 計算重新作答按鈕水平位置。
  const buttonX = width / 2 - buttonWidth / 2;

  // 計算重新作答按鈕垂直位置。
  const buttonY = resultY + resultHeight - buttonHeight - 25;

  // 儲存重新作答按鈕位置。
  restartButton = {
    x: buttonX,
    y: buttonY,
    w: buttonWidth,
    h: buttonHeight
  };

  // 判斷滑鼠是否移到重新作答按鈕上。
  const hoveringRestart = isInside(
    mouseX,
    mouseY,
    buttonX,
    buttonY,
    buttonWidth,
    buttonHeight
  );

  // 根據滑鼠位置設定按鈕顏色。
  fill(hoveringRestart ? "#73557d" : "#80658a");
  noStroke();
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 14);

  // 顯示重新作答按鈕文字。
  fill("#ffffff");
  textStyle(BOLD);
  textSize(constrain(width * 0.043, 17, 20));
  text("重新作答", width / 2, buttonY + buttonHeight / 2);
}

// 處理滑鼠點擊事件。
function mousePressed() {
  // 如果所有題目已完成，就處理重新作答。
  if (currentQuestion >= questions.length) {
    // 確認重新作答按鈕存在且被點擊。
    if (
      restartButton &&
      isInside(
        mouseX,
        mouseY,
        restartButton.x,
        restartButton.y,
        restartButton.w,
        restartButton.h
      )
    ) {
      // 將目前題目重設為第一題。
      currentQuestion = 0;

      // 將答對題數歸零。
      correctCount = 0;

      // 將作答狀態重設為未作答。
      answered = false;

      // 清除選項選擇紀錄。
      selectedOption = -1;
    }

    // 結束結果畫面的點擊處理。
    return;
  }

  // 如果尚未作答，就檢查使用者是否點擊選項。
  if (!answered) {
    // 逐一檢查所有選項。
    for (let i = 0; i < optionBoxes.length; i++) {
      // 取得目前選項的區域資料。
      const box = optionBoxes[i];

      // 判斷滑鼠是否點擊目前選項。
      if (isInside(mouseX, mouseY, box.x, box.y, box.w, box.h)) {
        // 記錄使用者所選的選項。
        selectedOption = i;

        // 設定目前題目為已作答。
        answered = true;

        // 如果答案正確，就增加答對題數。
        if (selectedOption === questions[currentQuestion].answer) {
          correctCount++;
        }

        // 完成選項判斷後結束函式。
        return;
      }
    }
  }

  // 如果已經作答，就檢查下一題按鈕。
  if (
    answered &&
    nextButton &&
    isInside(
      mouseX,
      mouseY,
      nextButton.x,
      nextButton.y,
      nextButton.w,
      nextButton.h
    )
  ) {
    // 切換到下一題。
    currentQuestion++;

    // 將下一題設為尚未作答。
    answered = false;

    // 清除上一題的選項紀錄。
    selectedOption = -1;
  }
}

// 處理觸控點擊事件。
function touchStarted() {
  // 使用 p5.js 的滑鼠座標處理觸控位置。
  mousePressed();

  // 阻止瀏覽器執行預設觸控行為。
  return false;
}

// 判斷指定座標是否位於矩形範圍內。
function isInside(px, py, x, y, w, h) {
  // 回傳座標是否位於矩形內。
  return px >= x && px <= x + w && py >= y && py <= y + h;
}

// 當視窗尺寸改變時重新調整畫布。
function windowResized() {
  // 將畫布調整為最新的瀏覽器視窗大小。
  resizeCanvas(windowWidth, windowHeight);

  // 讓觸控裝置重新套用不可捲動設定。
  document.body.style.touchAction = "none";
}
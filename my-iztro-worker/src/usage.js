// usage.js

export const usageHtml = `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>API 使用說明</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
    h1 { color: #333; }
    p { margin: 10px 0; }
    code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
    a { color: #1a0dab; text-decoration: none; }
    a:hover { text-decoration: underline; }
    form { margin-top: 20px; }
    label { display: block; margin-top: 10px; }
    input, select { width: 100%; padding: 8px; margin-top: 5px; }
    input[type="submit"] { margin-top: 20px; padding: 10px 15px; background-color: #4CAF50; color: white; border: none; cursor: pointer; }
    input[type="submit"]:hover { background-color: #45a049; }
  </style>
</head>
<body>
  <h1>API 使用說明</h1>
  <p>請使用以下查詢參數調用 API：</p>
  <ul>
    <li><code>date</code>：生日，格式為 <code>YYYY-MM-DD</code>（例如：<code>2000-08-16</code>）。</li>
    <li><code>time</code>：出生時間，範圍 <code>0</code> 到 <code>11</code>，並對應兩小時的時段。</li>
    <li><code>gender</code>：性別，使用中文字符 <code>男</code> 或 <code>女</code>。</li>
    <li><code>isSolar</code>：是否為陽曆生日，使用 <code>true</code> 或 <code>false</code>。</li>
    <li><code>lang</code>（可選）：語言，預設為 <code>zh-TW</code>。</li>
  </ul>
  <p>示例調用：</p>
  <p><code>https://your-worker-url/?date=2000-08-16&time=2&gender=男&isSolar=true&lang=zh-TW</code></p>
  <p>更多詳細資訊，請參考：<a href="https://github.com/SylarLong/iztro/blob/main/README-zh_TW.md" target="_blank">GitHub README</a></p>

  <h2>API 測試表單</h2>
  <form id="apiTestForm">
    <label>生日：</label>
    <div style="display: flex; gap: 10px;">
      <input type="number" id="year" name="year" placeholder="年 YYYY" min="1900" max="2100" required>
      <input type="number" id="month" name="month" placeholder="月 MM" min="1" max="12" required>
      <input type="number" id="day" name="day" placeholder="日 DD" min="1" max="31" required>
    </div>

    <label for="time">出生時間：</label>
    <select id="time" name="time" required>
      <option value="">請選擇</option>
      <option value="0">0 (午夜 11 點到凌晨 1 點)</option>
      <option value="1">1 (凌晨 1 點到 3 點)</option>
      <option value="2">2 (凌晨 3 點到 5 點)</option>
      <option value="3">3 (凌晨 5 點到 7 點)</option>
      <option value="4">4 (上午 7 點到 9 點)</option>
      <option value="5">5 (上午 9 點到 11 點)</option>
      <option value="6">6 (上午 11 點到下午 1 點)</option>
      <option value="7">7 (下午 1 點到 3 點)</option>
      <option value="8">8 (下午 3 點到 5 點)</option>
      <option value="9">9 (下午 5 點到 7 點)</option>
      <option value="10">10 (晚上 7 點到 9 點)</option>
      <option value="11">11 (晚上 9 點到午夜 11 點)</option>
    </select>

    <label for="gender">性別：</label>
    <select id="gender" name="gender" required>
      <option value="男">男</option>
      <option value="女">女</option>
    </select>

    <label for="isSolar">是否為陽曆生日：</label>
    <select id="isSolar" name="isSolar" required>
      <option value="true">是</option>
      <option value="false">否</option>
    </select>

    <label for="lang">語言：</label>
    <input type="text" id="lang" name="lang" value="zh-TW" required>

    <input type="submit" value="提交">
  </form>

  <script>
    // 自動跳轉到下一個輸入框
    document.querySelectorAll("#year, #month, #day").forEach(input => {
      input.addEventListener("input", (event) => {
        if (event.target.value.length === event.target.maxLength) {
          let nextInput = event.target.nextElementSibling;
          if (nextInput) nextInput.focus();
        }
      });
    });

    document.getElementById('apiTestForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      // 取得生日並格式化
      const year = document.getElementById("year").value;
      const month = document.getElementById("month").value.padStart(2, '0');
      const day = document.getElementById("day").value.padStart(2, '0');
      const date = \`\${year}-\${month}-\${day}\`;

      // 取得其他表單值
      const time = document.getElementById("time").value;
      const gender = document.getElementById("gender").value;
      const isSolar = document.getElementById("isSolar").value;
      const lang = document.getElementById("lang").value;

      if (!year || !month || !day || !time || !gender || !isSolar || !lang) {
        alert("請填寫所有必填欄位！");
        return;
      }

      // 建立 API 查詢字串
      const params = new URLSearchParams({ date, time, gender, isSolar, lang }).toString();
      const apiUrl = \`/?\${params}\`;

      // 開啟新分頁
      window.open(apiUrl, '_blank');
    });
  </script>
</body>
</html>
`;

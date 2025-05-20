# My Iztro Worker

## 專案目的

本專案旨在將 [Iztro](https://github.com/SylarLong/iztro) 函式庫整合至 Cloudflare Workers，提供一個基於 API 的服務，使用者可以透過 HTTP 請求獲取與生日、出生時間、性別等相關的紫微斗數資訊。 [DEMO 請點我](my-iztro-worker.crazyjerry.workers.dev)

## 功能

- **API 服務**：接受包含生日、出生時間、性別等參數的 HTTP GET 請求，返回相應的紫微斗數資訊。
- **使用說明頁面**：當請求缺少必要參數時，返回一個包含 API 使用說明和測試表單的 HTML 頁面，方便使用者瞭解如何使用該 API。
- **速率限制**：為了防止濫用，對每個客戶端 IP 設置了每分鐘最多 10 次請求的限制。

## 部署方法

請確保已安裝 [Node.js](https://nodejs.org/) 和 npm。

1. **克隆儲存庫**：

   ```bash
   git clone https://github.com/your-username/my-iztro-worker.git
   cd my-iztro-worker
   ```

2. **安裝相依套件**：

   ```bash
   npm install
   ```

3. **配置 Wrangler**：

   確保您已在專案根目錄下的 `wrangler.json` 文件中正確配置了 Cloudflare Workers 的相關資訊，包括 `name`、`main`、`compatibility_date` 等字段。

4. **部署到 Cloudflare Workers**：

   ```bash
   npx wrangler deploy
   ```

   部署成功後，您將獲得一個唯一的 Workers URL，可用於存取您的 API 服務。

## 開發方法

1. **開發環境設置**：

   在開始開發之前，確保已安裝所有必要的相依套件：

   ```bash
   npm install
   ```

2. **本機開發和測試**：

   開發操作步驟請詳閱[官方網站的文件](https://developers.cloudflare.com/workers/get-started/guide/)。本專案使用 Wrangler 的本機開發功能，可以在本機測試您的 Worker：

   ```bash
   npx wrangler dev
   ```

   此命令將在本機啓動一個開發伺服器，您可以透過 `http://localhost:XXXX` 存取您的 Worker。

3. **程式碼結構**：

   - `src/index.js`：主入口文件，包含 Worker 的核心邏輯。
   - `src/usage.js`：包含用於在缺少查詢參數時返回的 HTML 使用說明。

4. **速率限制配置**：

   在 `wrangler.json` 中，速率限制透過 `unsafe.bindings` 配置：

   ```json
   {
     "unsafe": {
       "bindings": [
         {
           "name": "MY_RATE_LIMITER",
           "type": "ratelimit",
           "namespace_id": "1001",
           "simple": {
             "limit": 10,
             "period": 60
           }
         }
       ]
     }
   }
   ```

   請確保將 `namespace_id` 替換為您在 Cloudflare 上創建的速率限制命名空間的實際 ID。

5. **部署**：

   在完成開發和測試後，可以使用以下命令將您的 Worker 部署到 Cloudflare：

   ```bash
   npx wrangler deploy
   ```

   這將更新您在 Cloudflare 上的 Worker，使更改生效。

## 參考

本專案使用了 [Iztro](https://github.com/SylarLong/iztro) 函式庫，更多詳細資訊請參考其 [README-zh_TW.md](https://github.com/SylarLong/iztro/blob/main/README-zh_TW.md)。

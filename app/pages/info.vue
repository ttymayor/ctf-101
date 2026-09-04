<script setup lang="ts">
useHead({
  title: "社群與迎新資訊 - 駭客社",
});
</script>

<template>
  <TerminalSession class="min-h-[506px]">
    <CommandLine>cat ./info</CommandLine>

    <TerminalOutput>
      <TerminalCallout>
        <h1 class="text-2xl font-black text-white tracking-tight">社群與迎新資訊</h1>
        <p>
          對資訊安全、駭客攻防感興趣嗎？<br />
          歡迎追蹤東海大學駭客社社群，或直接填表報名迎新社課！
        </p>
        <ol>
          <li>社課時間：預計週四 19:00 ~ 21:00</li>
          <li>社課地點：請關注 IG 發文或 Discord 即時公告</li>
        </ol>
      </TerminalCallout>
    </TerminalOutput>

    <CommandLine>ls -la ./links</CommandLine>

    <TerminalOutput>
      <SocialLink />

      <!-- 迎新報名表單與返回按鈕 -->
      <div class="w-full flex flex-col gap-2">
        <UButton
          to="/"
          size="lg"
          block
          variant="outline"
          class="w-full border-neutral-700 hover:bg-neutral-800 text-white font-bold text-sm rounded-xs transition-transform active:scale-95 cursor-pointer justify-center"
        >
          回到首頁
        </UButton>
      </div>
    </TerminalOutput>
  </TerminalSession>
</template>

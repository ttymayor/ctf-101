export default defineNuxtRouteMiddleware((to) => {
  const stageRequirements: Record<string, number> = {
    "/intro": 0,
    "/1": 1,
    "/2": 2,
    "/3": 3,
    "/finish": 4,
  };

  const requiredStage = stageRequirements[to.path];
  // 若非關卡頁面（如首頁 /），直接放行
  if (requiredStage === undefined) {
    return;
  }

  const { progress } = useStageProgress();
  const currentProgress = progress.value ?? 0;

  // 如果使用者試圖跳關（要求的關卡 > 目前已解鎖的最高進度）
  if (requiredStage > currentProgress) {
    // 重定向至使用者當前已解鎖的最高關卡
    const stageRoutes = ["/intro", "/1", "/2", "/3", "/finish"];
    const fallbackRoute =
      stageRoutes[Math.min(currentProgress, stageRoutes.length - 1)] ?? "/intro";

    return navigateTo(fallbackRoute);
  }
});

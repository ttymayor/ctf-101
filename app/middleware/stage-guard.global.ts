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

  // 只要被發現跨題 / 跳關（目標關卡要求的進度 > 目前已解鎖的最高進度）
  // 涵蓋所有跨題行為：0 -> 1/2/3/finish, 1 -> 2/3/finish, 2 -> 3/finish, 3 -> finish
  if (requiredStage > currentProgress) {
    const stageRoutes = ["/intro", "/1", "/2", "/3", "/finish"];
    const fallbackRoute =
      stageRoutes[Math.min(currentProgress, stageRoutes.length - 1)] ?? "/intro";

    if (import.meta.client) {
      const toast = useToast();
      toast.add({
        title: "難道你會越權訪問（BAC, Broken Access Control）🤯",
        color: "error",
        icon: "i-lucide-shield-alert",
        duration: 4000,
      });
    } else {
      const bacCookie = useCookie("thuctf_bac", {
        path: "/",
        maxAge: 5,
        sameSite: "lax",
      });
      bacCookie.value = "1";
    }

    return navigateTo(fallbackRoute);
  }
});

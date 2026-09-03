export const useStageProgress = () => {
  const progress = useCookie<number>("thuctf_stage", {
    default: () => 0,
    maxAge: 60 * 60 * 24 * 7, // 保存一週
    sameSite: "lax",
  });

  const unlockStage = (stage: number) => {
    progress.value = Math.max(progress.value ?? 0, stage);
  };

  const resetProgress = () => {
    progress.value = 0;
  };

  return {
    progress,
    unlockStage,
    resetProgress,
  };
};

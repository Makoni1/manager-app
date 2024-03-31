export const useAnimationConfig = () => {
  const routeVariants = {
    initial: {
      opacity: 0, // Начальное состояние - элемент невидим
    },
    final: {
      opacity: 1, // Конечное состояние - элемент видим
      transition: {
        type: "tween", // Используйте "tween" для плавного появления
        duration: 0.5, // Длительность анимации (по желанию)
      },
    },
  };


  const childVariants = {
    initial: {
      opacity: 0,
      y: "50px",
    },
    final: {
      opacity: 1,
      y: "0px",
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };
  return { routeVariants, childVariants }
}
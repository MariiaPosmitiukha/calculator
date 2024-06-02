<template lang="pug">
header
  .d-flex.justify-content-between.p-3.align-items-center
    .d-flex
      img.img-fluid(
        src="/src/assets/img/logo.png",
        width="100",
        height="100",
        alt="logo"
      )
      .ps-4
        h1 Калькулятор
        h2 протяжки футляру
    button.btn.btn-secondary(
      type="button",
      data-bs-toggle="offcanvas",
      data-bs-target="#offcanvasScrolling",
      aria-controls="offcanvasScrolling"
    ) 
      |
      i.bi.bi-clock-history
      span.ms-1 Історія
</template>


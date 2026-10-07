const lensVariables = {
  init: function () {
    this.selectOptions("type");
    this.selectOptions("brand");
    this.setSelectOptionARValue("variant-value", 27);

    this.lensOptions();
    this.closeLensModal();
    this.modalActions();

    modalLens.init();
  },

  // ==========================================
  // OPÇÕES:
  // ADICIONAR LENTES / APENAS ARMAÇÃO
  // ==========================================

  lensOptions: function () {
    const buttons = document.querySelectorAll(".lens-option");

    const modalOverlay = document.querySelector(".overlay-variant-lens");

    if (!buttons.length) {
      return;
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const option = button.dataset.lensOption;

        // ========================================
        // ADICIONAR LENTES
        // ========================================

        if (option === "with-lens") {
          // Se já está selecionado
          // apenas reabre o modal
          if (button.classList.contains("selected")) {
            if (modalOverlay) {
              modalOverlay.classList.add("modal-opened");
            }

            console.log("Modal de lentes reaberto");

            return;
          }

          // Remove seleção dos outros
          buttons.forEach((item) => {
            item.classList.remove("selected");
          });

          // Seleciona adicionar lentes
          button.classList.add("selected");

          // Abre modal
          if (modalOverlay) {
            modalOverlay.classList.add("modal-opened");
          }

          console.log("Adicionar lentes selecionado");

          return;
        }

        // ========================================
        // COMPRAR APENAS ARMAÇÃO
        // ========================================

        if (option === "frame-only") {
          // Remove seleção dos outros
          buttons.forEach((item) => {
            item.classList.remove("selected");
          });

          // Seleciona apenas armação
          button.classList.add("selected");

          // Fecha modal
          if (modalOverlay) {
            modalOverlay.classList.remove("modal-opened");
          }

          // Limpa todas as lentes
          this.clearAllLens();

          console.log("Comprar apenas armação selecionado");
        }
      });
    });
  },

  // ==========================================
  // FECHAR MODAL
  // ==========================================

  closeLensModal: function () {
    const modalOverlay = document.querySelector(".overlay-variant-lens");

    const closeModal = document.querySelector(".close-modal-variant-lens");

    if (!modalOverlay || !closeModal) {
      return;
    }

    closeModal.addEventListener("click", () => {
      /*
       * IMPORTANTE:
       *
       * Aqui NÃO alteramos o botão selecionado.
       *
       * Se "Adicionar lentes" estiver selecionado,
       * ele continuará selecionado.
       *
       * Também NÃO limpamos os inputs da Tray.
       */

      modalOverlay.classList.remove("modal-opened");

      console.log("Modal de lentes fechado");
    });
  },
  modalActions: function () {
    const modalOverlay = document.querySelector(".overlay-variant-lens");

    const clearButton = document.querySelector(".button-clear-lens");

    const continueButton = document.querySelector(".button-continue-lens");

    if (!modalOverlay) return;

    // LIMPAR
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        this.clearAllLens();

        console.log("Configuração de lentes limpa");
      });
    }

    // CONTINUAR
    if (continueButton) {
      continueButton.addEventListener("click", () => {
        modalOverlay.classList.remove("modal-opened");

        console.log("Configuração de lentes confirmada");
      });
    }
  },

  // ==========================================
  // LIMPAR TODAS AS LENTES
  // ==========================================

  clearAllLens: function () {
    // Tipo
    this.resetSelected("type");

    // Marca
    this.resetSelected("brand");

    // AR
    this.resetSelected("variant-value");

    // ========================================
    // INPUTS DA TRAY
    // ========================================

    this.clearInput(23);
    this.clearInput(25);
    this.clearInput(27);
    this.clearInput(17);

    // ========================================
    // FECHAR AR
    // ========================================

    document.querySelectorAll(".ar-lens").forEach((details) => {
      details.open = false;
    });

    // ========================================
    // LIMPAR UPLOAD
    // ========================================

    if (typeof window.clearLensUpload === "function") {
      window.clearLensUpload();
    }

    console.log("Todas as opções de lentes foram limpas");
  },

  // ==========================================
  // LIMPAR TIPO
  // ==========================================

  clearTypeLens: function () {
    this.resetSelected("type");

    this.clearInput(23);

    this.clearBrandLens();

    console.log("Tipo de lente limpo");
  },

  // ==========================================
  // LIMPAR MARCA
  // ==========================================

  clearBrandLens: function () {
    this.resetSelected("brand");

    this.clearInput(25);

    this.clearARLens();

    console.log("Marca da lente limpa");
  },

  // ==========================================
  // LIMPAR AR
  // ==========================================

  clearARLens: function () {
    this.resetSelected("variant-value");

    this.clearInput(27);

    document.querySelectorAll(".ar-lens").forEach((details) => {
      details.open = false;
    });

    console.log("AR limpo");
  },

  // ==========================================
  // LIMPAR INPUT DA TRAY
  // ==========================================

  clearInput: function (inputID) {
    const input = document.querySelector(`#infoAdicional_${inputID}`);

    if (!input) {
      return;
    }

    input.value = "";

    input.dispatchEvent(
      new Event("input", {
        bubbles: true,
      }),
    );

    input.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );
  },

  // ==========================================
  // TIPO / MARCA
  // ==========================================

  selectOptions: function (dataName) {
    const optionLens = document.querySelectorAll(`li[data-${dataName}]`);

    optionLens.forEach((option) => {
      option.addEventListener("click", (e) => {
        const currentOption = e.currentTarget;

        const alreadySelected = currentOption.classList.contains("selected");

        // ====================================
        // DESMARCAR
        // ====================================

        if (alreadySelected) {
          currentOption.classList.remove("selected");

          if (dataName === "type") {
            this.clearTypeLens();
          }

          if (dataName === "brand") {
            this.clearBrandLens();
          }

          return;
        }

        // ====================================
        // SELECIONAR
        // ====================================

        this.resetSelected(dataName);

        currentOption.classList.add("selected");

        // ====================================
        // TIPO DE LENTE
        // ====================================

        if (dataName === "type") {
          const input = document.querySelector("#infoAdicional_23");

          if (input) {
            input.value = currentOption.dataset.type;

            input.dispatchEvent(
              new Event("input", {
                bubbles: true,
              }),
            );

            input.dispatchEvent(
              new Event("change", {
                bubbles: true,
              }),
            );

            console.log("Tipo selecionado:", input.value);
          }
        }

        // ====================================
        // MARCA DA LENTE
        // ====================================

        if (dataName === "brand") {
          const input = document.querySelector("#infoAdicional_25");

          if (input) {
            input.value = currentOption.dataset.brand;

            input.dispatchEvent(
              new Event("input", {
                bubbles: true,
              }),
            );

            input.dispatchEvent(
              new Event("change", {
                bubbles: true,
              }),
            );

            console.log("Marca selecionada:", input.value);
          }

          // Limpa AR anterior
          this.clearARLens();

          // Marca selecionada
          const brand = currentOption.dataset.brand;

          // Procura AR correspondente
          const arDetails = document.querySelector(
            `details.ar-lens[data-brand="${brand}"]`,
          );

          if (arDetails) {
            arDetails.open = true;

            console.log("AR aberto para a marca:", brand);
          } else {
            console.warn("Nenhum AR encontrado para:", brand);
          }
        }
      });
    });
  },

  // ==========================================
  // ANTIRREFLEXO
  // ==========================================

  setSelectOptionARValue: function (dataName, inputID) {
    const optionsARLens = document.querySelectorAll(`li[data-${dataName}]`);

    optionsARLens.forEach((optionAR) => {
      optionAR.addEventListener("click", (e) => {
        const currentOption = e.currentTarget;

        const select = document.querySelector(`#infoAdicional_${inputID}`);

        if (!select) {
          return;
        }

        // ====================================
        // DESMARCAR AR
        // ====================================

        if (currentOption.classList.contains("selected")) {
          currentOption.classList.remove("selected");

          select.value = "";

          select.dispatchEvent(
            new Event("input", {
              bubbles: true,
            }),
          );

          select.dispatchEvent(
            new Event("change", {
              bubbles: true,
            }),
          );

          console.log("AR desmarcado");

          return;
        }

        // ====================================
        // SELECIONAR AR
        // ====================================

        this.resetSelected("variant-value");

        currentOption.classList.add("selected");

        const valueSelected = currentOption.dataset[this.toCamelCase(dataName)];

        select.value = valueSelected;

        select.dispatchEvent(
          new Event("input", {
            bubbles: true,
          }),
        );

        select.dispatchEvent(
          new Event("change", {
            bubbles: true,
          }),
        );

        console.log("AR selecionado:", valueSelected);
      });
    });
  },

  // ==========================================
  // RESETAR SELEÇÃO
  // ==========================================

  resetSelected: function (dataName) {
    const optionLens = document.querySelectorAll(`li[data-${dataName}]`);

    optionLens.forEach((element) => {
      element.classList.remove("selected");
    });
  },

  // ==========================================
  // CAMEL CASE
  // ==========================================

  toCamelCase: function (str) {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
      .replace(/^(.)/, (c) => c.toLowerCase());
  },
};

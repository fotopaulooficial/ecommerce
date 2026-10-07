
const lensVariables = {

  init: function () {

    this.selectOptions("type");
  this.selectOptions("brand");

  this.setSelectOptionARValue("variant-value", 27);

  this.toggleLens();

  modalLens.init();
  },

  // ==========================================
  // ABRIR / FECHAR LENTES DE GRAU
  // ==========================================

  toggleLens: function () {

    const lensDetails = document.querySelector(
      ".container-variant-lens .lens"
    );

    if (!lensDetails) {
      return;
    }

    lensDetails.addEventListener("toggle", () => {

      if (!lensDetails.open) {

        console.log("Lentes de grau desativadas");

        this.clearAllLens();
      }
    });
  },

  // ==========================================
  // LIMPAR TUDO
  // ==========================================

  clearAllLens: function () {

    this.resetSelected("type");
    this.resetSelected("brand");
    this.resetSelected("variant-value");

    this.clearInput(23);
    this.clearInput(25);
    this.clearInput(27);

    document
      .querySelectorAll(".ar-lens")
      .forEach((details) => {
        details.open = false;
      });

    if (typeof window.clearLensUpload === "function") {
      window.clearLensUpload();
    }

    console.log("Todas as opções foram limpas");
  },

  // ==========================================
  // LIMPAR TIPO
  // ==========================================

  clearTypeLens: function () {

    this.resetSelected("type");

    this.clearInput(23);

    // Se não existe tipo, não faz sentido
    // manter marca e AR
    this.clearBrandLens();

    console.log("Tipo limpo");
  },

  // ==========================================
  // LIMPAR MARCA
  // ==========================================

  clearBrandLens: function () {

    this.resetSelected("brand");

    this.clearInput(25);

    // Se não existe marca, não faz sentido
    // manter AR
    this.clearARLens();

    console.log("Marca limpa");
  },

  // ==========================================
  // LIMPAR AR
  // ==========================================

  clearARLens: function () {

    this.resetSelected("variant-value");

    this.clearInput(27);

    document
      .querySelectorAll(".ar-lens")
      .forEach((details) => {
        details.open = false;
      });

    console.log("AR limpo");
  },

  // ==========================================
  // LIMPAR INPUT DA TRAY
  // ==========================================

  clearInput: function (inputID) {

    const input = document.querySelector(
      `#infoAdicional_${inputID}`
    );

    if (!input) {
      return;
    }

    input.value = "";

    input.dispatchEvent(
      new Event("input", {
        bubbles: true
      })
    );

    input.dispatchEvent(
      new Event("change", {
        bubbles: true
      })
    );
  },

  // ==========================================
  // TIPO / MARCA
  // ==========================================

  

  // ==========================================
  // MARCA → ABRIR AR CORRESPONDENTE
  // ==========================================

  

  // ==========================================
  // ANTIRREFLEXO
  // ==========================================

  setSelectOptionARValue: function (dataName, inputID) {

    const optionsARLens = document.querySelectorAll(
      `li[data-${dataName}]`
    );

    optionsARLens.forEach((optionAR) => {

      optionAR.addEventListener("click", (e) => {

        const currentOption = e.currentTarget;

        const select = document.querySelector(
          `#infoAdicional_${inputID}`
        );

        if (!select) {
          return;
        }

        // ======================================
        // DESMARCAR AR
        // ======================================

        if (
          currentOption.classList.contains("selected")
        ) {

          currentOption.classList.remove("selected");

          select.value = "";

          select.dispatchEvent(
            new Event("input", {
              bubbles: true
            })
          );

          select.dispatchEvent(
            new Event("change", {
              bubbles: true
            })
          );

          console.log("AR desmarcado");

          return;
        }

        // ======================================
        // SELECIONAR AR
        // ======================================

        this.resetSelected("variant-value");

        currentOption.classList.add("selected");

        const valueSelected =
          currentOption.dataset[
            this.toCamelCase(dataName)
          ];

        select.value = valueSelected;

        select.dispatchEvent(
          new Event("input", {
            bubbles: true
          })
        );

        select.dispatchEvent(
          new Event("change", {
            bubbles: true
          })
        );

        console.log(
          "AR selecionado:",
          valueSelected
        );
      });
    });
  },

  // ==========================================
  // SELECIONAR / DESSELECIONAR TIPO E MARCA
  // ==========================================

  selectOptions: function (dataName) {

    const optionLens = document.querySelectorAll(
      `li[data-${dataName}]`
    );
  
    optionLens.forEach((option) => {
  
      option.addEventListener("click", (e) => {
  
        const currentOption = e.currentTarget;
  
        const alreadySelected =
          currentOption.classList.contains("selected");
  
        // ======================================
        // DESMARCAR
        // ======================================
  
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
  
        // ======================================
        // SELECIONAR
        // ======================================
  
        this.resetSelected(dataName);
  
        currentOption.classList.add("selected");
  
  
        // ======================================
        // TIPO DE LENTE
        // ======================================
  
        if (dataName === "type") {
  
          const input = document.querySelector(
            "#infoAdicional_23"
          );
  
          if (input) {
  
            input.value = currentOption.dataset.type;
  
            input.dispatchEvent(
              new Event("input", {
                bubbles: true
              })
            );
  
            input.dispatchEvent(
              new Event("change", {
                bubbles: true
              })
            );
  
            console.log(
              "Tipo selecionado:",
              input.value
            );
          }
        }
  
  
        // ======================================
        // MARCA DA LENTE
        // ======================================
  
        if (dataName === "brand") {
  
          const input = document.querySelector(
            "#infoAdicional_25"
          );
  
          if (input) {
  
            input.value = currentOption.dataset.brand;
  
            input.dispatchEvent(
              new Event("input", {
                bubbles: true
              })
            );
  
            input.dispatchEvent(
              new Event("change", {
                bubbles: true
              })
            );
  
            console.log(
              "Marca selecionada:",
              input.value
            );
          }
  
  
          // Limpa o AR anterior
          this.clearARLens();
  
  
          // Pega a marca selecionada
          const brand = currentOption.dataset.brand;
  
  
          // Procura o AR correspondente
          const arDetails = document.querySelector(
            `details.ar-lens[data-brand="${brand}"]`
          );
  
  
          if (arDetails) {
  
            arDetails.open = true;
  
            console.log(
              "AR aberto para a marca:",
              brand
            );
  
          } else {
  
            console.warn(
              "Nenhum AR encontrado para:",
              brand
            );
          }
        }
  
      });
  
    });
  
  },

  // ==========================================
  // RESETAR SELEÇÃO
  // ==========================================

  resetSelected: function (dataName) {

    const optionLens = document.querySelectorAll(
      `li[data-${dataName}]`
    );

    optionLens.forEach((element) => {

      element.classList.remove("selected");
    });
  },

  // ==========================================
  // CAMEL CASE
  // ==========================================

  toCamelCase: function (str) {

    return str
      .replace(/[-_\s]+(.)?/g, (_, c) =>
        c ? c.toUpperCase() : ""
      )
      .replace(/^(.)/, c =>
        c.toLowerCase()
      );
  }

};


const modalLens = {

  init: function () {

    this.toggleModal();
    this.closeModal();
  },

  toggleModal: function () {

    const modalOverlay = document.querySelector(
      ".overlay-variant-lens"
    );

    document
      .querySelectorAll(
        ".options-brand-lens li .info"
      )
      .forEach((button) => {

        button.addEventListener("click", (e) => {

          modalOverlay.classList.add(
            "modal-opened"
          );

          const modalLen =
            e.currentTarget.getAttribute("id");

          this.setInfoModel(modalLen);
        });
      });
  },

  closeModal: function () {

    const button = document.querySelector(
      ".close-modal-variant-lens"
    );

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {

      const modal = document.querySelector(
        ".modal-opened"
      );

      if (modal) {
        modal.classList.remove(
          "modal-opened"
        );
      }
    });
  },

  setInfoModel: function (modalLen) {

    const lens = infoLens.find(
      (item) => item.model === modalLen
    );

    if (!lens) {
      return;
    }

    document.querySelector(
      ".title-len-option"
    ).textContent = lens.name;
  }

};

